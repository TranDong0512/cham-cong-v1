import React, { useState, useContext, useEffect } from "react";
import { Button, Input, Modal, Typography, Pagination } from "antd";
import { Form, Select, Row, Col, Table } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import { SearchOutlined, SmallDashOutlined } from "@ant-design/icons";
import Constant from "../constant/constant";
import type { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { useDispatch } from "react-redux";
import { setArr, update } from "@/redux/reducer/thiet_lap_cong_ty";
import Cookies from "js-cookie";
import { getCompIdCS } from "@/pages/api/BaseApi";

interface DataType {
    key?: React.Key;
    name?: string;
    id?: number;
}
interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    record: Item;
    index: number;
    children: React.ReactNode;
}

export default function SelectUser({ close, open }) {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [listPosition, setListPosition] = useState([]);
    const isEditing = (record: Item) => record.key === editingKey;
    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue(record);
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };
    const isLoad = useSelector((state: RootState) => state.setup.update);

    const save = async (key: React.Key) => {
        try {
            const newData = [...dataTable];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                const listUsersPositions = {
                    listUsersPositions: [item],
                };
                const fetcher = async () => {
                    return await instance.post(
                        Constant.positions_createUsersPositions,
                        listUsersPositions
                    );
                };
                const result = await fetcher();
                if (result?.data?.data?.result) {
                    alert("Thêm mới vị trí thành công");
                    setEditingKey("");
                    dispatch(update(!isLoad));
                }
            }
        } catch (err) {
            alert("Error: " + err?.response?.data?.error?.message);
        }
    };
    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        record,
        index,
        children,
        ...restProps
    }) => {
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item name={dataIndex} style={{ margin: 0 }}>
                        <Select
                            options={items}
                            style={{
                                width: "100%",
                            }}
                            onSelect={handleSelect}
                        />
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    const [dataUse, setDataUse] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [rowSelect, setRowSelect] = useState("");
    const [valueSelect, setValueSelect] = useState<{
        ep_id?: string;
        position_id?: string;
    }>({});
    const arr = useSelector((state: RootState) => state.setup.arr);

    const [select, setSelect] = useState(1);
    const handleSelect = (e) => {
        setValueSelect({
            ep_id: rowSelect,
            position_id: e,
        });
    };
    const dispatch = useDispatch();
    const rowSelection = {
        onSelect: (record: any, selected, selectedRows) => {
            const isOk = arr.filter((data) => data.ep_id === record?.ep_id);

            if (isOk.length === 0 && selected) {
                const newList = [...arr, valueSelect];
                dispatch(setArr(newList));
            }
            if (isOk.length > 0 && !selected) {
                const newList = arr.filter(
                    (item) => item.ep_id !== record.ep_id
                );
                dispatch(setArr(newList));
            }
            if (isOk.length === 0 && !selected && selectedRows.length === 0) {
                dispatch(setArr([]));
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            // dataSend.setUserSelect(selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            name: record.name,
        }),
    };
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetcher = async () => {
            return await instance.post(Constant.managerUser_list);
        };
        const unFollow = async () => {
            try {
                const data = await fetcher();
                setDataUse(
                    data?.data?.data?.items?.map((item) => ({
                        ep_name: item.ep_name,
                        ep_image: item.ep_image,
                        ep_id: item.ep_id,
                        position_id: item.position_id,
                        ep_phone: item.ep_phone,
                        key: item.ep_id,
                    }))
                );
                setDataTable(
                    data?.data?.data?.items?.map((item) => ({
                        ep_name: item.ep_name,
                        ep_image: item.ep_image,
                        position_id: item.position_id,

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
            return await instance.post(Constant.positions_listAll, {
                com_id: com_id,
            });
        };
        const unFollow = async () => {
            try {
                const data = await fetcher();
                setListPosition(data?.data?.data?.data);

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
            listUsersPositions: arr,
        };
        try {
            const fetcher = async () => {
                return await instance.post(
                    Constant.positions_createUsersPositions,
                    listUsersPositions
                );
            };
            const result = await fetcher();
            if (result?.data?.data?.result) {
                alert("Thêm mới vị trí thành công");
            }
        } catch (err) {
            alert("Error: " + err?.response?.data?.error?.message);
        }
    };

    const columns: any = [
        {
            title: "Họ và tên (ID)",
            align: "center",

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
            align: "center",
            editable: true,
            width: "160px",
            dataIndex: "position_id",
            render: (data) => {
                const name = listPosition.filter(
                    (position) => position.id === Number(data)
                );
                return <div>{name[0]?.positionName}</div>;
            },
        },
        {
            title: "Phone",
            dataIndex: "ep_phone",
        },
        {
            dataIndex: "operation",
            align: "center",

            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <div className="flex">
                        <Button
                            type="primary"
                            onClick={() => save(record.key)}
                            className="cursor-pointer"
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => cancel()}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="cursor-pointer"
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Button>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                dataIndex: col.dataIndex,
                editing: isEditing(record),
            }),
        };
    });
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
    const handleSelectValueSearch = (e) => {
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
                            onSelect={handleSelectValueSearch}
                            style={{
                                width: "100%",
                            }}
                        />
                    </Col>
                </Row>
                <Table
                    rowSelection={{ ...rowSelection }}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    className="mt-16"
                    columns={mergedColumns}
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
                        Đã chọn: <>{arr?.length}</>
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
