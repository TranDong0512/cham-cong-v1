import React, { useEffect, useState } from "react";
import { Image, Row, Col, Table, Typography, Input, Button } from "antd";

const { Text } = Typography;
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import ModalAddNewSF from "./them-pm";
import instance from "@/components/hooks/axios.config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import PopupDelete from "@/components/modal/Delete";
import { useDispatch } from "react-redux";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
interface DataType {
    key: string;
    app_name?: string;
}
export default function ContentTabs3({ idQLC, userName }) {
    const columns: ColumnsType<DataType> = [
        {
            title: "Tên phần mềm",
            dataIndex: "",
            key: "name",
            render: (data) => (
                <div className="flex flex-align-center">
                    <Image
                        alt="xxx"
                        preview={false}
                        width={52}
                        height={52}
                        src={data?.img === null ? data?.img : "/gh_ip/app.svg"}
                    />
                    <div className="ml-16">
                        <Text>{data?.app_name}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: "Hành động",
            dataIndex: "",
            key: "actions",
            width: "140px",
            align: "center",
            render: (data: any) => {
                console.log(data);
                return (
                    <div className="cursor-pointer">
                        <DeleteOutlined
                            onClick={() => setOpenModalDelete(true)}
                            rev={"xxx"}
                        />
                        <PopupDelete
                            open={openModalDelete}
                            close={handleCloseModal}
                            user={data.app_name}
                            company={userName}
                            onOK={() => deletePm(data?.app_id)}
                        />
                    </div>
                );
            },
        },
    ];
    const dispatch = useDispatch();

    const deletePm = async (data) => {
        try {
            const fetcher = async () => {
                return await instance.post("api/qlc/AppUsers/delete", {
                    ep_id: idQLC,
                    app_id: data,
                });
            };
            const result = await fetcher();
            if (result.statusText === "OK") {
                alert("Xoá thành công");
                dispatch(update(true));
                handleCloseModal();
            }
        } catch (err) {
            console.error(err);
        }
    };
    const [initialData, setInitialData] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const isUpdate = useSelector((state: RootState) => state.setup.update);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleCloseModal = () => {
        setOpenModalDelete(false);
    };
    useEffect(() => {
        const unFollow = async () => {
            const fetcher = async () => {
                return await instance.post("api/qlc/AppUsers/listAppOfUsers", {
                    ep_id: idQLC,
                });
            };
            const result = await fetcher();
            setInitialData(result?.data?.data?.data);
            setDataTable(result?.data?.data?.data);
        };
        unFollow();
    }, [isUpdate]);
    const onChange = (e) => {
        const newValue = e.target.value;
        const filteredData = initialData.filter((data) => {
            return data.app_name.toLowerCase().includes(newValue.toLowerCase());
        });
        setDataTable(filteredData);
    };
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const closeModalAdd = () => {
        setOpenModalAdd(false);
    };
    return (
        <div>
            <div className="my-16">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={16} md={16}>
                        <Input
                            style={{
                                width: "100%",
                            }}
                            size="large"
                            placeholder="Tìm phần mềm"
                            prefix={<SearchOutlined rev={"xxx"} />}
                            onChange={onChange}
                        />
                    </Col>
                    <Col xs={24} sm={8} md={8}>
                        <Button
                            className="flex flex-align-center w-100"
                            icon={
                                <Image
                                    preview={false}
                                    src="/img/add_blue.png"
                                    alt="Tìm việc 365"
                                />
                            }
                            size="large"
                            style={{
                                color: "#4C5BD4",
                            }}
                            onClick={() => setOpenModalAdd(true)}
                        >
                            Thêm phần mềm
                        </Button>
                    </Col>
                </Row>
            </div>
            <Table columns={columns} dataSource={dataTable} bordered />
            <ModalAddNewSF
                id={idQLC}
                open={openModalAdd}
                close={closeModalAdd}
            />
        </div>
    );
}
