import { message, Modal } from "antd";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { updateQuestionUsingPost } from "@/api/questionController";

interface Props {
  oldData?: API.Question;
  visible: boolean;
  columns: ProColumns<API.Question>[];
  onSubmit: (values: API.QuestionUpdateRequest) => void;
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
export const UpdateModal = ({
  visible,
  oldData,
  columns,
  onSubmit,
  onCancel,
}: Props) => {
  if (!oldData) {
    return <></>;
  }
  // 表单转换
  let initValues = { ...oldData };
  if (oldData.tags) {
    initValues.tags = JSON.parse(oldData.tags) || [];
  }
  console.log(oldData);
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
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: initValues,
        }}
        onSubmit={async (values: API.QuestionUpdateRequest) => {
          if (!oldData?.id || !onSubmit) {
            return;
          }
          const success = await handleUpdate({
            ...values,
            id: oldData.id,
          });
          if (success) {
            onSubmit(values);
          }
        }}
      />
    </Modal>
  );
};
