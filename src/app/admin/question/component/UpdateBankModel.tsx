import { message, Modal } from "antd";
import { Form, Select } from "antd";
import { updateQuestionUsingPost } from "@/api/questionController";
import {
  addQuestionBankQuestionUsingPost,
  listQuestionBankByQuestionUsingPost,
  removeQuestionBankQuestionUsingDelete,
} from "@/api/questionBankQuestionController";
import useForm from "antd/es/form/hooks/useForm";
import { useEffect, useState } from "react";
import { listQuestionBankByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}

const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
  const hide = message.loading("正在添加");
  try {
    await updateQuestionUsingPost(fields);
    hide();
    message.success("更新成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("更新失败，" + error.message);
    return false;
  }
};
export const UpdateBankModal = ({ questionId, visible, onCancel }: Props) => {
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] =
    useState<API.QuestionBankVO[]>();
  // 获取当前所属题库列表
  const getCurrentBankList = async () => {
    const res = await listQuestionBankByQuestionUsingPost({
      questionId: questionId,
    });
    console.log(res.data);
    if (res.data) {
      // @ts-ignore
      const list = (res.data ?? []).map((item) => item.id);
      console.log(list);
      form.setFieldValue("questionBankIds", list);
    } else {
      message.error("获取题库失败");
    }
  };
  const getQuestionBankList = async () => {
    const pageSize = 200;
    const res = await listQuestionBankByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    if (res.data) {
      // @ts-ignore
      setQuestionBankList(res.data?.records ?? []);
    } else {
      message.error("获取题库失败");
    }
  };
  useEffect(() => {
    getQuestionBankList();
  }, []);
  useEffect(() => {
    if (questionId) {
      getCurrentBankList();
    }
  }, [questionId]);
  return (
    <Modal
      destroyOnClose
      title={"更新"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }}>
        <Form.Item label="所属题库" name="questionBankIds">
          <Select
            options={questionBankList?.map((item) => {
              return {
                label: item.title,
                value: item.id,
              };
            })}
            mode="multiple"
            style={{ width: "100%" }}
            onSelect={async (value) => {
              const res = await addQuestionBankQuestionUsingPost({
                questionBankId: value,
                questionId: questionId,
              });
              // @ts-ignore
              if (res.code === 0) {
                message.success("添加成功");
              } else {
                message.error("添加失败");
              }
            }}
            onDeselect={async (value) => {
              const res = await removeQuestionBankQuestionUsingDelete({
                questionBankId: value,
                questionId: questionId,
              });
              // @ts-ignore
              if (res.code === 0) {
                message.success("删除成功");
              } else {
                message.error("删除失败");
              }

            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
