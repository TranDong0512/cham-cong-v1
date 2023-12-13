import React, { useEffect, useState } from "react";
import { Button, Image, Table, Typography, Descriptions, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import {
    sendData,
    setOpenModalCompany,
    setOpenModalDepartments,
    update,
} from "@/redux/reducer/thiet_lap_cong_ty";
// import ModalAddNewPosition from "../../Modal/them-co-cau/them-co-cau";
import ModalAddNewPosition from "@/components/thiet-lap-cong-ty/Modal/them-co-cau/them-co-cau";
import instance from "@/components/hooks/axios.config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
const { Text } = Typography;
interface DataType {
    key: React.Key;
    name: string;
}
export default function ThongTinCongTy() {
    const dispatch = useDispatch();
    const updateData = useSelector((state: RootState) => state.setup.update);
    const data = useSelector((state: RootState) => state.setup.sendData);
    const close = useSelector((state: RootState) => state.setup.openDrawer);
    const columns: ColumnsType<DataType> = [
        {
            title: "Tên đơn vị",
            dataIndex: "name",
            key: "name",
            render: (data) => {
                return (
                    <div>
                        <Text
                            style={{
                                color: "#4C5BD4",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                dispatch(setOpenModalCompany(false));
                                dispatch(setOpenModalDepartments(true));
                            }}
                        >
                            {data}
                        </Text>
                    </div>
                );
            },
        },
        {
            title: "Cấp tổ chức",
            dataIndex: "level",
            align: "center",
            key: "level",
        },
    ];
    const [disabled, setDisabled] = useState(true);
    // const [dataInput, setDataInput] = useState(data.name);
    const [dataInput, setDataInput] = useState("data.name");
    console.log(data);
    const handleChange = (e) => {
        // setDataInput(e.target.value);
    };
    const handleEnter = () => {
        setDisabled(true);
    };
    const [openModalAddNewRank, setOpenModalAddNewRank] = useState(false);
    const handleCloseModalAddNewRank = () => {
        setOpenModalAddNewRank(false);
    };
    const [dataRes, setDataRes] = useState<any>([]);

    useEffect(() => {
        const unFollow = async () => {
            const fetch = async () => {
                return await instance.post("api/qlc/organizeDetail/listAll", {
                    settingOrganizeId: data,
                });
            };
            const dataRes = await fetch();
            console.log(dataRes);
            //  Chua dung, cho time fix bug
            // setDataRes(dataRes?.data?.data?.data?.children[0]);
        };
        unFollow();
    }, [data]);

    const handleDelete = async () => {
        try {
            const fetcher = async () => {
                return await instance.post("api/qlc/organizeDetail/delete", {
                    // id: data.id,
                });
            };
            const result = await fetcher();
            console.log(result);
            if (result?.statusText === "    OK") {
                alert("Xóa thành công");
                dispatch(update(!updateData));
                // close();
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className="flex flex-space-between mb-16 flex-align-center">
                <div className="flex flex-align-center">
                    <div>
                        <Input
                            bordered={false}
                            value={dataRes?.name}
                            disabled={disabled}
                            onChange={handleChange}
                            onPressEnter={handleEnter}
                            style={{
                                width: "fit-content",
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
                                            onClick={handleDelete}
                                            alt="Tìm việc 365"
                                            preview={false}
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
                        // onClick={close}
                    />
                </div>
            </div>
            {/* <div
                style={{
                    border: "1px solid #ccc",
                }}
            >
                <div
                    className="pt-16 px-16"
                    style={{
                        borderBottom: "1px solid #ccc",
                    }}
                >
                    <Descriptions
                        labelStyle={{
                            width: "160px",
                        }}
                        column={1}
                        items={data?.content?.map((item, index) => ({
                            key: index,
                            label: item.key,
                            children: item.value,
                        }))}
                    />
                </div>
                <div className="flex m-16 flex-align-center flex-space-between">
                    <div>DANH SÁCH ĐƠN VỊ TRỰC THUỘC</div>
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
                        onClick={() => setOpenModalAddNewRank(true)}
                    >
                        Thêm cơ cấu
                    </Button>
                </div>
                <ModalAddNewPosition
                    data={data?.settingOrganizeId}
                    open={openModalAddNewRank}
                    close={handleCloseModalAddNewRank}
                />
                <div>
                    <Table
                        columns={columns}
                        dataSource={dataRes?.children}
                        pagination={{
                            pageSize: 5,
                        }}
                        onRow={(record: any, rowIndex) => {
                            return {
                                onClick: () => {
                                    dispatch(
                                        sendData({
                                            id: record?.id,
                                            name: record?.name,
                                        })
                                    );
                                },
                            };
                        }}
                    />
                </div>
            </div> */}
        </div>
    );
}
