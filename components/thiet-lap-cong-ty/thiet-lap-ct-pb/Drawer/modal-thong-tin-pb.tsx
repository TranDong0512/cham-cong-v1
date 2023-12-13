import React, { useEffect, useState } from "react";
import { Button, Image, Table, Typography, Descriptions, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ArrowLeftOutlined } from "@ant-design/icons";
import instance from "@/components/hooks/axios.config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { useDispatch } from "react-redux";
import {
    sendData,
    setOpenModalCompany,
    setOpenModalDepartments,
    setOpenModalUser,
    update,
} from "@/redux/reducer/thiet_lap_cong_ty";
import ModalAddNewUser from "../../Modal/them-nhan-vien";
const { Text } = Typography;
interface DataType {
    key?: React.Key;
    name?: string;
    level?: string;
}

export default function ThongTinPhongBan() {
    const dispatch = useDispatch();
    const updateData = useSelector((state: RootState) => state.setup.update);

    const columns: ColumnsType<DataType> = [
        {
            title: "Họ và tên",
            dataIndex: "userName",
            key: "name",
            align: "center",
            render: (data) => {
                return (
                    <div>
                        <Text
                            style={{
                                color: "#4C5BD4",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                dispatch(setOpenModalUser(true));
                                dispatch(setOpenModalDepartments(false));
                            }}
                        >
                            {data}
                        </Text>
                    </div>
                );
            },
        },
        {
            title: "Vị trí",
            dataIndex: "positionName",
            align: "center",
            key: "level",
        },
    ];
    const idDepartment: { id?: string; name?: string } = useSelector(
        (state: RootState) => state.setup.sendData
    );
    const [data, setData] = useState([]);
    useEffect(() => {
        const unFollow = async () => {
            let value = {
                organizeDetailId: idDepartment?.id,
            };
            const fetch = async () => {
                return await instance.post(
                    "api/qlc/organizeDetail/listUser",
                    value
                );
            };
            const data = await fetch();
            setData(data?.data?.data?.data);
        };
        unFollow();
    }, []);
    const [disabled, setDisabled] = useState(true);
    const [dataInput, setDataInput] = useState(idDepartment);
    const handleChange = (e) => {
        setDataInput(e.target.value);
    };
    const handleEnter = () => {
        setDisabled(true);
    };
    const [openModalAddNewUser, setOpenModalAddNewUser] = useState(false);
    const handleCloseModalAddNewUser = () => {
        setOpenModalAddNewUser(false);
    };
    const handleDelete = async () => {
        try {
            const fetcher = async () => {
                return await instance.post("api/qlc/organizeDetail/delete", {
                    id: idDepartment.id,
                });
            };
            const result = await fetcher();
            if (result?.statusText === "OK") {
                alert("Xóa thành công");
                dispatch(setOpenModalCompany(true));
                dispatch(setOpenModalDepartments(false));
                dispatch(update(!updateData));
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className="flex flex-space-between mb-16 flex-align-center">
                <div className="flex flex-align-center">
                    <ArrowLeftOutlined
                        rev={"xxx"}
                        onClick={() => {
                            dispatch(setOpenModalCompany(true));
                            dispatch(setOpenModalDepartments(false));
                        }}
                    />
                    <div className="ml-8 w-100">
                        <Input
                            bordered={false}
                            value={dataInput?.name}
                            disabled={disabled}
                            onChange={handleChange}
                            onPressEnter={handleEnter}
                            style={{
                                width: "100%",
                                padding: "0",
                                fontSize: "16px",
                            }}
                            suffix={
                                <div className="flex">
                                    <div className="ml-8 cursor-pointer">
                                        <Image
                                            src="/img/qlc_edit.png"
                                            alt="Tìm việc 365"
                                            onClick={() => setDisabled(false)}
                                            preview={false}
                                        />
                                    </div>
                                    <div className="ml-8 cursor-pointer">
                                        <Image
                                            src="/img/qlc_delete.png"
                                            alt="Tìm việc 365"
                                            preview={false}
                                            onClick={handleDelete}
                                        />
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
                <div className="cursor-pointer">
                    <Image
                        width={28}
                        src="/img/close_b5.png"
                        alt="Tìm việc 365"
                        preview={false}
                        onClick={() => {
                            dispatch(setOpenModalCompany(true));
                            dispatch(setOpenModalDepartments(false));
                        }}
                    />
                </div>
            </div>
            <div className="my-16 flex  flex-align-center flex-space-between">
                <div>
                    <Text>Đơn vị công tác:{idDepartment?.name}</Text>
                </div>
                <div>
                    <Text>Số lượng:{data?.length}</Text>
                </div>
            </div>
            <div
                style={{
                    border: "1px solid #ccc",
                }}
            >
                <div className="flex m-16 flex-align-center flex-space-between">
                    <div>DANH SÁCH NHÂN VIÊN</div>
                    <Button
                        className="flex flex-align-center"
                        icon={
                            <Image
                                preview={false}
                                src="/img/add_blue.png"
                                alt="Tìm việc 365"
                            />
                        }
                        size="large"
                        style={{
                            backgroundColor: "#E4E7FF",
                            color: "#4C5BD4",
                        }}
                        onClick={() => setOpenModalAddNewUser(true)}
                    >
                        Thêm nhân viên
                    </Button>
                </div>
                <ModalAddNewUser
                    open={openModalAddNewUser}
                    close={handleCloseModalAddNewUser}
                />
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 5,
                        }}
                        onRow={(record, rowIndex) => {
                            console.log(record);
                            return {
                                onClick: () => {
                                    dispatch(
                                        sendData({
                                            id: record?.ep_id,
                                            name: record?.userName,
                                        })
                                    );
                                },
                            };
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
