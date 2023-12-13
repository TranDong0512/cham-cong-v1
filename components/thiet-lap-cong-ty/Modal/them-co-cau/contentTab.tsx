import React, { createContext, use, useEffect, useState } from "react";
import { Button, Form, Input, Image, Typography, Select } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import type { FormInstance } from "antd/es/form";
import ResultSearch from "./resultSearch";
import { getCompIdCS } from "@/pages/api/BaseApi";
export const ContentTabs2Context = createContext<any>({});

export default function ContentTabs({ data, close }) {
    const handleSubmit = async (value) => {
        const valueSend = {
            ...value,
            level: level + 1,
            useSelect: useSelect,
            listOrganizeDetailId: listOrganizeDetailId,
        };
        const listUsersPositions = {
            listUsersPositions: positionUser,
        };
        const listUsers = {
            listUserIdNew: positionUser,
            level: level + 1,
            listOrganizeDetailId: listOrganizeDetailId,
        };
        try {
            const fetcher = async () => {
                return await instance.post(
                    "api/qlc/organizeDetail/create",
                    valueSend
                );
            };
            const fetcher2 = async () => {
                return await instance.post(
                    "api/qlc/positions/createUsersPositions",
                    listUsersPositions
                );
            };
            const fetcher3 = async () => {
                return await instance.post(
                    "api/qlc/organizeDetail/addListUser",
                    listUsers
                );
            };
            const result = await fetcher();
            const result2 = await fetcher2();
            const result3 = await fetcher3();

            if (
                result.statusText === "OK" &&
                result2.statusText === "OK" &&
                result3.statusText === "OK"
            ) {
                alert("Thêm mới cơ cấu thành công");
                close();
            } else {
                alert("Error: " + result.statusText);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const [showLine, setShowLie] = useState(true);

    const formRef = React.useRef<FormInstance>(null);
    const [useSelect, setUserSelect] = useState([]);
    const [dataSelect1, setDataSelect1] = useState([]);
    const [parentId, setParentId] = useState("");

    const handleCloseModal = () => {
        formRef.current?.resetFields();
        close();
    };
    const com_id = getCompIdCS();
    const [level, setLevel] = useState(0);
    const [listOrganizeDetailId, setListOrganizeDetailId] = useState([]);
    useEffect(() => {
        const unFollow = async () => {
            const fetcher = async () => {
                return await instance.post("qlc/settingOrganize/listAll", {
                    com_id: com_id,
                    parentId: data,
                });
            };
            const dataRes = await fetcher();
            setDataSelect1(dataRes?.data?.data?.data);
        };
        unFollow();
    }, []);
    const handleSelect1 = (e) => {
        const level: any = dataSelect1.filter((data) => {
            return data.id === Number(e);
        });
        setParentId(level[0]?.parentId);
        setLevel(level[0]?.level);
    };

    const [positionUser, setPositionUser] = useState([]);
    return (
        <ContentTabs2Context.Provider
            value={{ setUserSelect, useSelect, positionUser, setPositionUser }}
        >
            <Form
                onFinish={handleSubmit}
                ref={formRef}
                layout="vertical"
                size="small"
            >
                <Form.Item
                    required
                    rules={[{ required: true }]}
                    name="settingOrganizeId"
                >
                    <Select
                        placeholder="Chọn"
                        allowClear
                        showSearch
                        filterOption={(input, option: any) =>
                            (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                )
                        }
                        virtual={false}
                        onSelect={handleSelect1}
                        options={dataSelect1?.map((d, index) => ({
                            label: d?.organizeName,
                            value: d?.id,
                            key: d?.id,
                        }))}
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    required
                    label="Tên cấp tổ chức "
                    name="organizeDetailName"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập" size="large" />
                </Form.Item>

                <Form.List name="content">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}>
                                    <div className="flex mb-8 flex-space-between">
                                        <div>
                                            <Form.Item
                                                name={[name, "key"]}
                                                style={{
                                                    marginBottom: "-20px",
                                                }}
                                                rules={[{ required: true }]}
                                            >
                                                <Input
                                                    bordered={false}
                                                    placeholder="Thêm tiêu đề"
                                                    onChange={() =>
                                                        setShowLie(false)
                                                    }
                                                    style={{
                                                        borderBottom: showLine
                                                            ? "1px dashed #ccc"
                                                            : "none",
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div
                                            className="cursor-pointer flex"
                                            onClick={() => remove(name)}
                                        >
                                            <Text
                                                style={{
                                                    color: "#FF3333",
                                                }}
                                                className="mr-4"
                                            >
                                                Xóa
                                            </Text>
                                            <Image
                                                src="/thiet_lap_cong_ty/delete.svg"
                                                preview={false}
                                                alt="xxx"
                                            />
                                        </div>
                                    </div>
                                    <Form.Item
                                        rules={[{ required: true }]}
                                        name={[name, "value"]}
                                    >
                                        <Input
                                            placeholder="Nhập"
                                            size="large"
                                        />
                                    </Form.Item>
                                </div>
                            ))}
                            <div className="flex flex-end">
                                <div className="max-w-160">
                                    <Button
                                        icon={
                                            <Image
                                                src="/img/plus.png"
                                                alt="Tìm việc 365"
                                                preview={false}
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                            />
                                        }
                                        block
                                        size="large"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "white",
                                            backgroundColor: "#FF8642",
                                        }}
                                        onClick={() => add()}
                                    >
                                        Thêm thông tin
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </Form.List>

                <ResultSearch />

                <div className="flex mt-16 flex-center">
                    <Button
                        className="min-w-120 mx-10"
                        size="large"
                        onClick={handleCloseModal}
                    >
                        Hủy
                    </Button>
                    <Button
                        className="min-w-120 mx-10"
                        type="primary"
                        size="large"
                        htmlType="submit"
                    >
                        Thêm
                    </Button>
                </div>
            </Form>
        </ContentTabs2Context.Provider>
    );
}
