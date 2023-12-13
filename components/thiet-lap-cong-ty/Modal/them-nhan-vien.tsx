import React, { useState, useContext, useEffect } from "react";
import { Button, Input, Modal, Typography, Image } from "antd";
import { Select, Row, Col, Table } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import { SearchOutlined } from "@ant-design/icons";

// import { ContentTabs2Context } from "../contentTabs/contentTab2";
import type { ColumnsType } from "antd/es/table";
import Cookies from "js-cookie";
import { getCompIdCS } from "@/pages/api/BaseApi";
interface DataType {
    key?: React.Key;
    name?: string;
    id?: number;
    position?: string;
    email?: string;
}

export default function ModalAddNewUser({ close, open }) {
    // const dataSend = useContext(ContentTabs2Context);
    const [dataUse, setDataUse] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [valueSelect, setValueSelect] = useState(1);
    const [idSelect, setIdSelect] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            let rowLength = selectedRows.length;
            setIdSelect(selectedRowKeys);

            // dataSend?.setUserSelect(rowLength);
        },

        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: (record: DataType) => ({
            name: record.name,
        }),
    };
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetcher = async () => {
            return await instance.post("api/qlc/managerUser/list");
        };
        const unFollow = async () => {
            try {
                const data = await fetcher();
                setDataUse(
                    data?.data?.data?.items?.map((item) => ({
                        ep_name: item.ep_name,
                        ep_image: item.ep_image,
                        ep_id: item.ep_id,
                        ep_phone: item.ep_phone,
                        key: item.ep_id,
                    }))
                );
                setDataTable(
                    data?.data?.data?.items?.map((item) => ({
                        ep_name: item.ep_name,
                        ep_image: item.ep_image,
                        ep_id: item.ep_id,
                        ep_phone: item.ep_phone,
                        key: item.ep_id,
                    }))
                );
            } catch (err) {
                alert("Error: " + err?.response?.data?.error?.message);
            }
        };
        unFollow();
    }, []);
    const com_id = getCompIdCS();
    useEffect(() => {
        const fetcher = async () => {
            return await instance.post("api/qlc/positions/listAll", {
                com_id: com_id,
            });
        };
        const unFollow = async () => {
            try {
                const data = await fetcher();
                const item = data?.data?.data?.data?.map((item) => ({
                    label: item.positionName,
                    value: item?.id,
                    key: item?.id,
                }));
                setItems(item);
            } catch (err) {
                alert("Error: " + err?.response?.data?.error?.message);
            }
        };
        unFollow();
    }, []);

    const columns: ColumnsType<DataType> = [
        {
            title: "Phòng",
            dataIndex: "",
            key: "name",
            render: (user) => (
                <div
                    style={{
                        gap: "10px",
                    }}
                    className="flex flex-align-center"
                >
                    <Image
                        preview={false}
                        width={30}
                        height={30}
                        src={user?.ep_image}
                        style={{
                            borderRadius: "50%",
                        }}
                    />
                    <div>
                        <div>
                            <Text
                                style={{
                                    color: "#4C5BD4",
                                }}
                            >
                                {user?.ep_name}
                            </Text>
                            <Text
                                className="ml-8"
                                style={{
                                    color: "#333",
                                }}
                            >
                                {user?.ep_id}
                            </Text>
                        </div>
                        <Text
                            style={{
                                color: "#474747",
                            }}
                        >
                            {user?.ep_phone}
                        </Text>
                    </div>
                </div>
            ),
        },
    ];
    const onChange = (e) => {
        const newValue = e.target.value;
        if (e === undefined) {
            setDataTable(dataUse);
        }
        let filteredData;
        if (valueSelect === 1) {
            filteredData = dataUse.filter((data) => {
                return data?.ep_name
                    .toLowerCase()
                    .includes(newValue.toLowerCase());
            });
        }
        if (valueSelect === 2) {
            const value = Number(newValue);
            if (!isNaN(value)) {
                filteredData = dataUse.filter((data) => {
                    return data?.ep_id === value;
                });
            } else {
                filteredData = [];
            }
        }
        if (valueSelect === 3) {
            filteredData = dataUse.filter((data) => {
                return data?.ep_phone?.includes(newValue);
            });
        }
        setDataTable(filteredData);
    };
    const handleClient = (e) => {
        setValueSelect(e);
    };
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
                <Text className="color-white font-size-16">Chọn nhân viên</Text>
            </div>
            <div className="p-16">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={16} md={16}>
                        <Input
                            size="large"
                            prefix={<SearchOutlined rev={"xxx"} />}
                            onChange={onChange}
                            placeholder="Tìm kiếm"
                        />
                    </Col>
                    <Col xs={24} sm={8} md={8}>
                        <Select
                            placeholder="Tùy chọn"
                            size="large"
                            defaultValue={[1]}
                            options={[
                                {
                                    key: "1",
                                    label: <Text>Tên nhân viên</Text>,
                                    value: 1,
                                },
                                {
                                    key: "2",
                                    label: <Text>ID nhân viên</Text>,
                                    value: 2,
                                },
                                {
                                    key: "3",
                                    label: <Text>SDT nhân viên</Text>,
                                    value: 3,
                                },
                            ]}
                            onSelect={handleClient}
                            style={{
                                width: "100%",
                            }}
                        />
                    </Col>
                </Row>
                <Table
                    rowSelection={{
                        ...rowSelection,
                    }}
                    className="mt-16"
                    columns={columns}
                    dataSource={dataTable}
                    scroll={{ x: 460 }}
                    pagination={{
                        pageSize: 5,
                    }}
                />
                <div
                    style={{
                        marginTop: "-32px",
                    }}
                >
                    {/* <Text>
                        Đã chọn: <>{dataSend?.useSelect}</>
                    </Text> */}
                </div>

                <div className="flex mt-16 flex-center">
                    <Button
                        className="min-w-120 mx-10"
                        size="large"
                        onClick={close}
                    >
                        Hủy
                    </Button>
                    <Button
                        className="min-w-120 mx-10"
                        type="primary"
                        size="large"
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
