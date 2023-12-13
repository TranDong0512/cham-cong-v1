import { Button, Image, Modal, Typography } from "antd";

import { useDispatch } from "react-redux";

import { openModalAddCoCau } from "../../reducer/reducer";
const { Text } = Typography;
export default function Alert({ open, onClose }) {
  const dispatch = useDispatch();
  return (
    <Modal
      open={open}
      wrapClassName="CustomerModal"
      closeIcon={false}
      footer={false}
      onCancel={onClose}
    >
      <div className="p-24 text-align-center">
        <div>
          <Image
            src="/tlct/images.png"
            alt="xxx"
            preview={false}
            width={80}
            height={80}
          />
        </div>

        <div className="mt-16">
          <Text
            style={{
              fontSize: "18px",
              color: "red",
            }}
          >
            Hiện tại bạn chưa có thiết lập cơ cấu công ty.
          </Text>
        </div>
        <div className="mt-16">
          <Text
            style={{
              fontSize: "16px",
            }}
          >
            Bạn cần thiết lập tổ chức cao nhất cho công ty mình.
          </Text>
        </div>
        <div className="flex mt-24 flex-center">
          <Button className="min-w-120 mx-10" size="large" onClick={onClose}>
            Hủy
          </Button>
          <Button
            className="min-w-120 mx-10"
            type="primary"
            size="large"
            htmlType="submit"
            onClick={() => {
              dispatch(openModalAddCoCau(true));
            }}
          >
            Thiết lập
          </Button>
        </div>
      </div>
    </Modal>
  );
}
