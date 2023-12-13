import React from "react";
import { Modal, Typography, Tabs } from "antd";
const { Text } = Typography;
// import ContentTabs1 from "../contentTabs/contentTab1";

// import ContentTabs2 from "../thiet-lap-ct-pb/chi-tiet/modal/contentTab2";
import type { FormInstance } from "antd/es/form";
import { useDispatch } from "react-redux";
import { setArr, setOpenModal } from "@/redux/reducer/thiet_lap_cong_ty";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";

export default function ModalAddNewRank({ close, open }) {
    const formRef = React.useRef<FormInstance>(null);
    const dispatch = useDispatch();
    const openModal = useSelector((state: RootState) => state.setup.openModal);
    const handleClose = () => {
        formRef.current?.resetFields();
        dispatch(setArr([]));
        dispatch(setOpenModal(!openModal));
        close();
    };
    return (
        <Modal
            open={open}
            onCancel={handleClose}
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
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: "Tạo mới cấp tổ chức",
                            key: "1",
                            // children: (
                            //     <ContentTabs1 close={close} formRef={formRef} />
                            // ),
                        },
                        {
                            label: "Cấp tổ chức đã có",
                            key: "2",
                            // children: (
                            //     <ContentTabs2 close={close} formRef={formRef} />
                            // ),
                        },
                    ]}
                />
            </div>
        </Modal>
    );
}
