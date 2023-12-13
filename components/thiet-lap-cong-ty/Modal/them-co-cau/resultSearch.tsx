import React, { useEffect, useState, useContext } from "react";
import { Input, Image, Typography, Table, Select } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import type { TableRowSelection } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import SelectUser from "../them-co-cau/chon-thanh-vien";
import { ContentTabs2Context } from "./contentTab";
import Cookies from "js-cookie";
import { getCompIdCS } from "@/pages/api/BaseApi";
interface DataType {
    key?: string;
    name?: string;
    position?: string;
}

export default function ResultSearch() {
    const [result, setResult] = useState(false);
    const [openModalSelectUser, setOpenModalSelectUser] = useState(false);
    const handleCloseModalSelect = () => {
        setOpenModalSelectUser(false);
    };
    const [dataUse, setDataUse] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const dataSend = useContext(ContentTabs2Context);
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
            const data = await fetcher();
            const item = data?.data?.data?.data?.map((item) => ({
                label: item.positionName,
                value: item?.id,
                key: item?.id,
            }));
            setItems(item);
        };
        unFollow();
    }, []);
    const columns: ColumnsType<DataType> = [
        {
            title: "",
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
                        src={
                            user?.ep_image !== null
                                ? user?.ep_image
                                : "/avt_365.png"
                        }
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
        {
            title: "Vị trí",
            dataIndex: "",
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
    ];
    const [valueSelect, setValueSelect] = useState<{
        ep_id?: string;
        position_id?: string;
    }>({});
    const handleSelect = (e) => {
        setValueSelect({
            ep_id: rowSelect,
            position_id: e,
        });
    };

    const [rowSelect, setRowSelect] = useState("");
    const onChange = (e) => {
        const newValue = e.target.value;
        const filteredData = dataUse.filter((data) => {
            return data.ep_name.toLowerCase().includes(newValue.toLowerCase());
        });
        setDataTable(filteredData);
    };

    const rowSelection: TableRowSelection<DataType> = {
        onSelect: (record: any, selected, selectedRows) => {
            if (valueSelect?.ep_id === record?.ep_id) {
                dataSend.setPositionUser((prev) => [...prev, valueSelect]);
            }
            dataSend.setUserSelect(selectedRows);
        },
    };
    return (
        <div>
            <div>
                <Text>Thành viên ({dataSend.useSelect.length})</Text>
            </div>
            <Input
                size="large"
                suffix={
                    <div
                        onClick={() => setOpenModalSelectUser(true)}
                        className="flex flex-align-center cursor-pointer"
                    >
                        <Image
                            src="/thiet_lap_cong_ty/user.svg"
                            alt="xxx"
                            preview={false}
                        />
                        <Text
                            className="ml-4"
                            style={{
                                color: "#4C5BD4",
                            }}
                        >
                            Chọn
                        </Text>
                    </div>
                }
                prefix={<SearchOutlined rev={"xxx"} />}
                onFocus={() => setResult(true)}
                onChange={onChange}
                placeholder="Tìm kiếm theo tên hoặc email"
            />
            <SelectUser
                open={openModalSelectUser}
                close={handleCloseModalSelect}
            />
            {result && (
                <div
                    style={{
                        borderRadius: " 6px",
                        border: "1px solid rgba(76, 91, 212, 0.43)",
                        maxHeight: "200px",
                        overflow: "auto",
                    }}
                    className="mt-6 p-2"
                >
                    <Table
                        bordered={false}
                        showHeader={false}
                        rowSelection={{ ...rowSelection }}
                        pagination={false}
                        columns={columns}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    setRowSelect(record.ep_id);
                                },
                            };
                        }}
                        dataSource={dataTable}
                    />
                </div>
            )}
        </div>
    );
}
