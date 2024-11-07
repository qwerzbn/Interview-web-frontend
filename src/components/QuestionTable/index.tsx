"use client";
import {
  listQuestionVoByPageUsingPost,
  searchQuestionVoByPageUsingPost,
} from "@/api/questionController";
import { message, TablePaginationConfig } from "antd";
import React, { useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-table";
import TagList from "@/components/taglist";
import Link from "next/link";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import accessEnum from "@/access/accessEnum";

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 * @constructor
 */
export default function QuestionTable(props: Props) {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  const [init, setInit] = useState<boolean>(true);
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const actionRef = useRef<ActionType>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "题目",
      dataIndex: "title",
      render(_, record) {
        if (loginUser.userRole === accessEnum.NOT_LOGIN) {
          return <Link href="/user/login">{record.title}</Link>;
        } else {
          return <Link href={`/question/${record.id}`}>{record.title}</Link>;
        }
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => <TagList tagList={record.tagList} />,
    },
  ];

  return (
    <div className="question-table">
      <ProTable
        dataSource={questionList}
        actionRef={actionRef}
        columns={columns}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        // @ts-ignore
        request={async (params, sort, filter) => {
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";
          // 请求
          // @ts-ignore
          const { data, code } = await searchQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);
          // 更新结果
          // @ts-ignore
          const newTotal = Number(data.total) || 0;
          // @ts-ignore
          const newData = data.records || [];
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
      />
    </div>
  );
}
