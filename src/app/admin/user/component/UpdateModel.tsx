import { message, Modal } from "antd";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { updateUserUsingPost } from "@/api/userController";

interface Props {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserUpdateRequest) => void;
  onCancel: () => void;
}

const handleUpdate = async (fields: API.UserUpdateRequest) => {
  const hide = message.loading("正在添加");
  try {
    await updateUserUsingPost(fields);
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
        onSubmit={async (values: API.UserUpdateRequest) => {
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
