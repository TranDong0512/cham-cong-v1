import React, { useEffect, useState, useContext } from "react";
import { Input, Image, Typography, Table, Select, Form, Button } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import type { TableRowSelection } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import SelectUser from "../../../Modal/chon-thanh-vien";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { setArr, update } from "@/redux/reducer/thiet_lap_cong_ty";
import Constant from "@/components/thiet-lap-cong-ty/constant/constant";
import Cookies from "js-cookie";
import { getCompIdCS } from "@/pages/api/BaseApi";
interface DataType {
    key?: string;
    name?: string;
    position?: string;
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

export default function ResultSearch({ result, setResult }) {
    const isLoad = useSelector((state: RootState) => state.setup.update);
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
    const columns: any = [
        {
            dataIndex: "",
            align: "center",
            key: "name",
            width: "220px",
            render: (user) => (
                <div
                    style={{
                        gap: "10px",
                    }}
                    className="flex flex-align-center"
                >
                    <div className="h-30px w-30px">
                        <Image
                            preview={false}
                            width={30}
                            height={30}
                            src={
                                user?.ep_image !== null && user.ep_image !== ""
                                    ? // Cần fix
                                      user?.ep_image
                                    : "/avt_365.png"
                            }
                            style={{
                                borderRadius: "50%",
                            }}
                        />
                    </div>

                    <div className="flex flex-wrap">
                        <div>
                            <Text
                                style={{
                                    color: "#4C5BD4",
                                }}
                            >
                                {user?.ep_name}
                            </Text>
                        </div>
                        <div className="ml-8">
                            (
                            <Text
                                style={{
                                    color: "#1677ff",
                                }}
                            >
                                {user?.ep_id}
                            </Text>
                            )
                        </div>
                        <div className="ml-8">
                            <Text
                                style={{
                                    color: "#474747",
                                }}
                            >
                                {user?.ep_phone}
                            </Text>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            align: "center",
            dataIndex: "position_id",
            editable: true,
            render: (data) => {
                const name = listPosition.filter(
                    (position) => position.id === Number(data)
                );
                return <div>{name[0]?.positionName}</div>;
            },
        },
        // {
        //     dataIndex: "operation",
        //     align: "center",

        //     render: (_: any, record: Item) => {
        //         const editable = isEditing(record);
        //         return editable ? (
        //             <div className="flex">
        //                 <Button
        //                     type="primary"
        //                     onClick={() => save(record.key)}
        //                     className="cursor-pointer"
        //                     style={{ marginRight: 8 }}
        //                 >
        //                     Save
        //                 </Button>
        //                 <Button
        //                     onClick={() => cancel()}
        //                     className="cursor-pointer"
        //                 >
        //                     Cancel
        //                 </Button>
        //             </div>
        //         ) : (
        //             <Button
        //                 className="cursor-pointer"
        //                 onClick={() => edit(record)}
        //             >
        //                 Edit
        //             </Button>
        //         );
        //     },
        // },
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
    const [openModalSelectUser, setOpenModalSelectUser] = useState(false);
    const handleCloseModalSelect = () => {
        setOpenModalSelectUser(false);
    };
    const [dataUse, setDataUse] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const arr = useSelector((state: RootState) => state.setup.arr);
    const [rowSelect, setRowSelect] = useState("");
    useEffect(() => {
        const fetcher = async () => {
            return await instance.post(Constant.managerUser_list);
        };
        const unFollow = async () => {
            try {
                const data = await fetcher();
                const option = data?.data?.data?.items?.map((item) => ({
                    ep_name: item.ep_name,
                    ep_image: item.ep_image,
                    position_id: item.position_id,
                    ep_id: item.ep_id,
                    ep_phone: item.ep_phone,
                    key: item.ep_id,
                }));
                setDataUse(option);
                setDataTable(option);
            } catch (err) {
                alert("Error: " + err?.response?.data?.error?.message);
            }
        };
        unFollow();
    }, [isLoad]);
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
    }, [isLoad]);

    const [valueSelect, setValueSelect] = useState<{
        ep_id?: string;
        position_id?: string;
    }>({});
    const handleSelect = (e) => {
        const item = arr.filter((item) => item.ep_id === rowSelect);
        console.log(rowSelect);
        console.log(item);
        setValueSelect({
            ep_id: rowSelect,
            position_id: e,
        });
    };

    const onChange = (e) => {
        const newValue = e.target.value;
        const filteredData = dataUse.filter((data) => {
            return data.ep_name.toLowerCase().includes(newValue.toLowerCase());
        });
        setDataTable(filteredData);
    };

    const rowSelection: TableRowSelection<DataType> = {
        onSelect: (record: any, selected, selectedRows) => {
            const isOk = arr.filter((data) => data.ep_id === record?.ep_id);

            if (isOk.length === 0 && selected) {
                const newList = [...arr, record];
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
    };
    return (
        <div>
            <div>
                <Text>Thành viên ({arr?.length})</Text>
            </div>
            <Input
                size="large"
                // suffix={
                //     <div
                //         onClick={() => setOpenModalSelectUser(true)}
                //         className="flex flex-align-center cursor-pointer"
                //     >
                //         <Image
                //             src="/thiet_lap_cong_ty/user.svg"
                //             alt="xxx"
                //             preview={false}
                //         />
                //         <Text
                //             className="ml-4"
                //             style={{
                //                 color: "#4C5BD4",
                //             }}
                //         >
                //             Chọn
                //         </Text>
                //     </div>
                // }
                prefix={<SearchOutlined rev={"xxx"} />}
                onFocus={() => {
                    setResult(true);
                }}
                onChange={onChange}
                placeholder="Tìm kiếm theo tên hoặc email"
            />
            <SelectUser
                open={openModalSelectUser}
                close={handleCloseModalSelect}
            />
            {result ? (
                <div
                    style={{
                        borderRadius: " 6px",
                        border: "1px solid rgba(76, 91, 212, 0.43)",
                        maxHeight: "200px",
                        overflow: "auto",
                    }}
                    className="mt-6 p-2"
                >
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered={false}
                            pagination={false}
                            showHeader={false}
                            rowSelection={{ ...rowSelection }}
                            dataSource={dataTable}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        setRowSelect(record.ep_id);
                                    },
                                };
                            }}
                        />
                    </Form>
                    {/* <Table
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
          /> */}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
