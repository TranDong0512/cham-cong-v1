import React, { useEffect, useState } from "react";
import { Button, Image, Table, Typography, Input, Tabs, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { useDispatch } from "react-redux";
import {
    sendData,
    setOpenModalCompany,
    setOpenModalDepartments,
    setOpenModalUser,
} from "@/redux/reducer/thiet_lap_cong_ty";

import { fromUnixTime, format } from "date-fns";
import ContentTabs1 from "./contentTabs1";
import ContentTabs3 from "./contentTabs3";
import styles from "./nv.module.scss";
import instance from "@/components/hooks/axios.config";
const { Text } = Typography;

function convertUnixTimestampToDateString(timestamp) {
    const date = fromUnixTime(timestamp);
    const formattedDate = format(date, "dd/MM/yyyy");
    return formattedDate;
}

export default function ThongTinNhanVien() {
    const dispatch = useDispatch();

    const idUser: { id?: string; name?: string } = useSelector(
        (state: RootState) => state.setup.sendData
    );
    const [disabled, setDisabled] = useState(true);
    const [dataInput, setDataInput] = useState(idUser);
    const handleChange = (e) => {
        setDataInput(e.target.value);
    };
    const handleEnter = () => {
        setDisabled(true);
    };

    const [user, setUser] = useState<any>({});
    useEffect(() => {
        const fetcher = async () => {
            return await instance.post("api/qlc/employee/info", {
                idQLC: idUser?.id,
            });
        };
        const unFollow = async () => {
            const data = await fetcher();
            setUser(data?.data?.data?.data);
        };
        unFollow();
    }, []);
    console.log(user.idQLC);
    const ttt = [
        {
            label: "Họ và tên",
            children: user.userName,
            key: user.userName,
        },
        {
            label: "Số điện thoại",
            children: user.phone ? user.phone : "Chưa cập nhập",
            key: user.phone,
        },
        {
            label: "Giới tính",
            children: user.inForPerson?.account?.gender === 0 ? " Nữ" : "Nam",
            key: user.userName,
        },
        {
            label: "Ngày sinh",
            children: user.birthday
                ? convertUnixTimestampToDateString(user.birthday)
                : "Chưa cập nhập",
            key: user.birthday,
        },
        {
            label: "Địa chỉ chi tiết",
            children: user.address,
            key: user.address,
        },
    ];
    const ttnv = [
        {
            label: "Đơn vị làm việc",
            children:
                user.inForPerson?.employee?.organizeDetailName === null
                    ? user.inForPerson?.employee?.organizeDetailName
                    : "Chưa cập nhập",
            key: user.inForPerson?.employee?.organizeDetailName,
        },
        {
            label: "Vị trí",
            children:
                user.inForPerson?.employee?.positionName === null
                    ? user.inForPerson?.employee?.positionName
                    : "Chưa cập nhập",
            key: user.inForPerson?.employee?.positionName,
        },
        {
            label: "Ngày bắt đầu làm việc",
            children: user.start_working_time
                ? convertUnixTimestampToDateString(user.start_working_time)
                : "Chưa cập nhập",
            key: user.userName,
        },
    ];
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "THÔNG TIN CHUNG",
            children: <ContentTabs1 data={ttt} />,
        },
        {
            key: "2",
            label: "THÔNG TIN NHÂN VIÊN",
            children: <ContentTabs1 data={ttnv} />,
        },
        {
            key: "3",
            label: "PHẦN MỀM ĐƯỢC TRUY CẬP",
            children: (
                <ContentTabs3 idQLC={user.idQLC} userName={user?.userName} />
            ),
        },
    ];
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.icon_left}>
                    <ArrowLeftOutlined
                        rev={"xxx"}
                        onClick={() => {
                            dispatch(setOpenModalCompany(false));
                            dispatch(setOpenModalDepartments(true));
                            dispatch(setOpenModalUser(false));
                        }}
                    />
                </div>

                <div className={styles.title}>
                    <div className={styles.img}>
                        <Image
                            alt="xxx"
                            preview={false}
                            width={80}
                            height={80}
                            src="/avt_acc.png"
                        />
                    </div>
                    <div className={styles.info}>
                        <Input
                            bordered={false}
                            value={user?.userName}
                            disabled={disabled}
                            onChange={handleChange}
                            onPressEnter={handleEnter}
                            style={{
                                width: "fit-content",
                                padding: "0",
                                fontSize: "16px",
                                color: "#000",
                            }}
                            suffix={
                                <Image
                                    src="/img/qlc_edit.png"
                                    alt="Tìm việc 365"
                                    onClick={() => setDisabled(false)}
                                    preview={false}
                                />
                            }
                        />
                        <div className="mt-4">
                            <Text
                                style={{
                                    color: "#4C5BD4",
                                }}
                            >
                                {user?.phoneTK}
                            </Text>
                        </div>
                        <div
                            style={{
                                backgroundColor: "#E1FFE4",
                            }}
                            className="mt-4 px-16 py-4"
                        >
                            <Text className="mr-8">
                                {" "}
                                {user.inForPerson?.employee?.positionName ===
                                null
                                    ? user.inForPerson?.employee?.positionName
                                    : "Chưa cập nhập"}
                            </Text>
                            <Image
                                preview={false}
                                alt="xxx"
                                src="/gh_ip/ten.svg"
                            />
                            <Text
                                className="ml-8"
                                style={{
                                    color: "#21A336",
                                }}
                            >
                                Đang làm việc
                            </Text>
                        </div>
                    </div>
                </div>
                <div className={styles.icon_right}>
                    <Image
                        width={28}
                        src="/img/close_b5.png"
                        alt="Tìm việc 365"
                        preview={false}
                        onClick={() => {
                            dispatch(setOpenModalCompany(true));
                            dispatch(setOpenModalDepartments(false));
                            dispatch(setOpenModalUser(false));
                        }}
                    />
                </div>
            </div>
            <Divider style={{ margin: " 10px 0 0 0" }} />
            <div className="my-10 flex  flex-align-center flex-space-between">
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    style={{
                        width: "100%",
                    }}
                />
            </div>
        </div>
    );
}
