"use client";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import { CreateModal } from "@/app/admin/question/component/CreateModal";
import { UpdateModal } from "@/app/admin/question/component/UpdateModel";
import {
  batchDeleteQuestionUsingDelete,
  deleteQuestionUsingPost,
  listQuestionByPageUsingPost,
} from "@/api/questionController";
import TagList from "@/components/taglist";
import MdEditor from "@/components/MdEditor";
import "./index.css";
import { UpdateBankModal } from "@/app/admin/question/component/UpdateBankModel";
import BatchAddQuestionsToBankModal from "@/app/admin/question/component/BatchAddModel";
import BatchRemoveQuestionsToBankModal from "@/app/admin/question/component/BatchRemoveModel";
// eslint-disable-next-line react/display-name
export default () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示更新所属题库的弹窗
  const [updateBankModalVisible, setUpdateBankModalVisible] =
    useState<boolean>(false);
  // 是否显示批量向题库添加题目弹窗
  const [
    batchAddQuestionsToBankModalVisible,
    setBatchAddQuestionsToBankModalVisible,
  ] = useState<boolean>(false);
  // 是否显示批量从题库移除题目弹窗
  const [
    batchRemoveQuestionsFromBankModalVisible,
    setBatchRemoveQuestionsFromBankModalVisible,
  ] = useState<boolean>(false);
  // 当前选中的题目 id 列表
  const [selectedQuestionIdList, setSelectedQuestionIdList] = useState<
    number[]
  >([]);

  const [currentRow, setCurrentRow] = useState<API.Question>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Question>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "所属题库",
      dataIndex: "questionBankId",
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "内容",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      width: 240,
      renderFormItem: (
        _,
        {
          type,
          defaultRender,
          // @ts-ignore
          formItemProps,
          // @ts-ignore
          fieldProps,
          ...rest
        },
        form,
      ) => {
        return (
          // value 和 onchange 会通过 form 自动注入。
          <MdEditor
            // 组件的配置
            {...fieldProps}
          />
        );
      },
    },

    {
      title: "答案",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
      width: 640,
      renderFormItem: (
        _,
        {
          type,
          defaultRender,
          // @ts-ignore
          formItemProps,
          // @ts-ignore
          fieldProps,
          ...rest
        },
        form,
      ) => {
        return (
          // value 和 onchange 会通过 form 自动注入。
          <MdEditor
            // 组件的配置
            {...fieldProps}
          />
        );
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <TagList tagList={tagList} />;
      },
    },

    {
      title: "创建用户",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
    },

    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "编辑时间",
      sorter: true,
      dataIndex: "editTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (text, record, _, action) => [
        <Button
          type="primary"
          key="editable"
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          修改
        </Button>,
        <Button
          type="primary"
          key="editable"
          onClick={() => {
            setCurrentRow(record);
            setUpdateBankModalVisible(true);
          }}
        >
          修改所属题库
        </Button>,
        <Button onClick={() => handleDelete(record)} key="delete">
          删除
        </Button>,
      ],
    },
  ];

  const handleDelete = async (row: API.Question) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteQuestionUsingPost({
        id: row.id as any,
      });
      hide();
      message.success("删除成功");
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };
  /**
   * 批量删除
   * @param questionIdList
   */
  const handleBatchDelete = async (questionIdList: number[]) => {
    const hide = message.loading("正在操作");
    try {
      await batchDeleteQuestionUsingDelete({
        questionId: questionIdList,
      });
      hide();
      message.success("操作成功");
      actionRef?.current?.reload();
    } catch (error: any) {
      hide();
      message.error("操作失败，" + error.message);
    }
  };

  return (
    <div className="QuestionAdmin">
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
      <UpdateBankModal
        visible={updateBankModalVisible}
        questionId={currentRow?.id}
        onCancel={() => {
          setCurrentRow(undefined);
          setUpdateBankModalVisible(false);
        }}
      />
      <BatchAddQuestionsToBankModal
        visible={batchAddQuestionsToBankModalVisible}
        questionIdList={selectedQuestionIdList}
        onSubmit={() => {
          setBatchAddQuestionsToBankModalVisible(false);
        }}
        onCancel={() => {
          setBatchAddQuestionsToBankModalVisible(false);
        }}
      />
      <BatchRemoveQuestionsToBankModal
        visible={batchRemoveQuestionsFromBankModalVisible}
        questionIdList={selectedQuestionIdList}
        onSubmit={() => {
          setBatchRemoveQuestionsFromBankModalVisible(false);
        }}
        onCancel={() => {
          setBatchRemoveQuestionsFromBankModalVisible(false);
        }}
      />

      <ProTable<API.Question>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];
          // @ts-ignore
          const { data, code } = await listQuestionByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);
          return {
            success: code === 0,
            // @ts-ignore
            data: data.records || [],
            // @ts-ignore
            total: Number(data.total) || 0,
          };
        }}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          return (
            <Space size={16}>
              <Button
                onClick={() => {
                  // 打开弹窗
                  setSelectedQuestionIdList(selectedRowKeys as number[]);
                  setBatchAddQuestionsToBankModalVisible(true);
                }}
              >
                批量向题库添加题目
              </Button>
              <Button
                onClick={() => {
                  // 打开弹窗
                  setSelectedQuestionIdList(selectedRowKeys as number[]);
                  setBatchRemoveQuestionsFromBankModalVisible(true);
                }}
              >
                批量从题库移除题目
              </Button>

              <Popconfirm
                title="确认删除"
                description="你确定要删除这些题目么？"
                onConfirm={() => {
                  // 批量删除题目
                  handleBatchDelete(selectedRowKeys as number[]);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>批量删除题目</Button>
              </Popconfirm>
            </Space>
          );
        }}
      />
    </div>
  );
};
