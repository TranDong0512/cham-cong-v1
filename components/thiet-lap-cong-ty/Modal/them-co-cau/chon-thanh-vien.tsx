import React, { useState, useContext, useEffect } from "react";
import { Button, Input, Modal, Typography, Pagination } from "antd";
import { Dropdown, Select, Row, Col, Table } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import { SearchOutlined, SmallDashOutlined } from "@ant-design/icons";

import { ContentTabs2Context } from "./contentTab";
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

export default function SelectUser({ close, open }) {
    const dataSend = useContext(ContentTabs2Context);
    const [dataUse, setDataUse] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [rowSelect, setRowSelect] = useState("");
    const [valueSelect, setValueSelect] = useState<{
        ep_id?: string;
        position_id?: string;
    }>({});
    const [select, setSelect] = useState(1);
    const handleSelect = (e) => {
        setValueSelect({
            ep_id: rowSelect,
            position_id: e,
        });
    };
    const rowSelection = {
        onSelect: (record: any, selected, selectedRows) => {
            if (valueSelect?.ep_id === record?.ep_id) {
                dataSend.setPositionUser((prev) => [...prev, valueSelect]);
            }
            dataSend.setUserSelect(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            dataSend.setUserSelect(selectedRows);
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
    const handleSubmit = async (value) => {
        const listUsersPositions = {
            listUsersPositions: dataSend.positionUser,
        };
        try {
            const fetcher = async () => {
                return await instance.post(
                    "api/qlc/positions/createUsersPositions",
                    listUsersPositions
                );
            };
            const result = await fetcher();

            if (result.statusText === "OK") {
                alert("Thêm mới vị trí thành công");
                close();
            } else {
                alert("Error: " + result.statusText);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Họ và tên (ID)",
            dataIndex: "",
            render: (value) => (
                <div>
                    <div>
                        <Text
                            style={{
                                color: "#4C5BD4",
                            }}
                        >
                            {value.ep_name}
                        </Text>
                    </div>
                    <div>{value.ep_id}</div>
                </div>
            ),
        },
        {
            title: "Vị trí",
            dataIndex: "position",
            render: () => (
                <div className="min-w-100 w-100 max-w-140">
                    <Select
                        options={items}
                        style={{
                            width: "100%",
                        }}
                        onSelect={handleSelect}
                    />
                </div>
            ),
        },
        {
            title: "Phone",
            dataIndex: "ep_phone",
        },
    ];
    const onChange = (e) => {
        const newValue = e.target.value;
        if (e === undefined) {
            setDataTable(dataUse);
        }
        let filteredData;
        if (select === 1) {
            filteredData = dataUse.filter((data) => {
                return data?.ep_name
                    .toLowerCase()
                    .includes(newValue.toLowerCase());
            });
        }
        if (select === 2) {
            const value = Number(newValue);
            if (!isNaN(value)) {
                filteredData = dataUse.filter((data) => {
                    return data?.ep_id === value;
                });
            } else {
                filteredData = [];
            }
        }
        if (select === 3) {
            filteredData = dataUse.filter((data) => {
                return data?.ep_phone?.includes(newValue);
            });
        }
        setDataTable(filteredData);
    };
    const handleClient = (e) => {
        setSelect(e);
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
                    rowSelection={{ ...rowSelection }}
                    className="mt-16"
                    columns={columns}
                    dataSource={dataTable}
                    scroll={{ x: 460 }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setRowSelect(record.ep_id);
                            },
                        };
                    }}
                    pagination={{
                        pageSize: 5,
                    }}
                />
                <div
                    style={{
                        marginTop: "-32px",
                    }}
                >
                    <Text>
                        Đã chọn: <>{dataSend?.useSelect.length}</>
                    </Text>
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
                        onClick={handleSubmit}
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
