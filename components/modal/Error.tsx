import React from "react";
import { Button, Image, Modal, Typography } from "antd";
const { Text } = Typography;
export default function ConfigError({ open, close }) {
    return (
        <Modal
            open={open}
            wrapClassName="CustomerModal"
            footer={false}
            onCancel={close}
        >
            <div className="flex flex-align-center flex-column p-30">
                <Image
                    width={80}
                    src="/gh_ip/success.svg"
                    preview={false}
                    alt="xxx"
                />
                <div className="mt-16 mb-16">
                    <Text
                        className="font-size-18"
                        style={{
                            color: "#474747",
                        }}
                    >
                        Xoá thất bại
                    </Text>
                </div>
                <div className="max-w-160 w-100">
                    <Button
                        style={{ backgroundColor: "#00CE2D", color: "#fff" }}
                        size="large"
                        block
                        onClick={close}
                    >
                        Đóng
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
