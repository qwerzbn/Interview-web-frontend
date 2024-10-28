import { message, Modal } from "antd";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { updateQuestionBankUsingPost } from "@/api/questionBankController";

interface Props {
  oldData?: API.QuestionBank;
  visible: boolean;
  columns: ProColumns<API.QuestionBank>[];
  onSubmit: (values: API.QuestionBankUpdateRequest) => void;
  onCancel: () => void;
}

const handleUpdate = async (fields: API.QuestionBankUpdateRequest) => {
  const hide = message.loading("正在添加");
  try {
    await updateQuestionBankUsingPost(fields);
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
          initialValues: oldData,
        }}
        onSubmit={async (values: API.QuestionBankUpdateRequest) => {
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