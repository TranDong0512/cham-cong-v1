import React from "react";
import { Modal, Typography, Tabs } from "antd";
const { Text } = Typography;
import ContentTabs from "./contentTab";
export default function ModalAddNewPosition({ data, close, open }) {
    return (
        <Modal
            open={open}
            onCancel={close}
            wrapClassName="CustomerModal"
            footer={false}
        >
            <div
                className="px-24 py-16"
                style={{
                    backgroundColor: "#4C5BD4",
                }}
            >
                <Text className="color-white font-size-16">
                    Thêm cơ cấu tổ chức
                </Text>
            </div>
            <div className="p-16">
                <ContentTabs data={data} close={close} />
            </div>
        </Modal>
    );
}
