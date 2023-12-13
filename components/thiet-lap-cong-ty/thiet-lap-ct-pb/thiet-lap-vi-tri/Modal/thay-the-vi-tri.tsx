import React from "react";
import { Button, Form, Input, Modal, Image, Typography, Select } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import { MinusCircleOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import { useDispatch } from "react-redux";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { toast } from "react-toastify";
export default function ThayTheViTri({ name, id, close, open }) {
    const dispatch = useDispatch();
    const isUpdate = useSelector((state: RootState) => state.setup.update);
    const handleSubmit = async (value) => {
        const valueSend = {
            ...value,
            id: id,
        };
        try {
            const fetcher = async () => {
                return await instance.post(
                    "api/qlc/positions/update",
                    valueSend
                );
            };
            const result = await fetcher();
            if (result?.data?.data?.result) {
                toast("Thay thế vị trí thành công");
                dispatch(update(!isUpdate));
                close();
            } else {
                console.log(result);
            }
        } catch (err) {
            toast.error(err?.response?.data?.error?.message);
        }
    };
    const formRef = React.useRef<FormInstance>(null);
    const onCancel = () => {
        close();
        formRef.current?.resetFields();
    };
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            wrapClassName="CustomerModal"
            footer={false}
        >
            <div
                className="px-24 py-16"
                style={{
                    backgroundColor: "#4C5BD4",
                }}
            >
                <Text className="color-white font-size-16">Thay thế</Text>
            </div>
            <Form
                labelAlign="left"
                layout="vertical"
                ref={formRef}
                onFinish={handleSubmit}
                size="small"
                className="px-16 py-24"
            >
                <Form.Item
                    label="Tên cấp"
                    required
                    name="positionName"
                    initialValue={name}
                    rules={[{ required: true }]}
                >
                    <Input type="text" placeholder="Nhập" size="large" />
                </Form.Item>

                <div className="flex mt-16 flex-center">
                    <Button
                        className="min-w-120 mx-10"
                        size="large"
                        onClick={onCancel}
                    >
                        Hủy
                    </Button>
                    <Button
                        className="min-w-120 mx-10 color-white"
                        type="primary"
                        size="large"
                        htmlType="submit"
                    >
                        <span className="color-white">Thay thế</span>
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
