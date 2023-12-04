import styles from "./index.module.css";
import Image from "next/image";
import {
    Button,
    Checkbox,
    Table,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Avatar,
} from "antd";
import { useState, useRef, useEffect, useContext } from "react";
import { ColumnsType } from "antd/es/table";
import { GET, POST_VT, getCompIdCS, getInfoUser } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { getPosition } from "@/utils/function";

interface Menu {
    stt: React.Key;
    shift: string;
    dateFrom: string;
    dateTo: string;
    timeTo: string;
    timeFrom: string;
}

export default function DonXinNghiPhep() {
    const [form] = Form.useForm();
    const inputFileRef = useRef<any>(null);

    const [stt, setStt] = useState(1);
    const [nameProposed, setNameProposed] = useState("");
    const [typeOfProposed, setTypeOfProposed] = useState("");
    const [shift, setShift] = useState("");
    const [nameStaff, setNameStaff] = useState("Vũ Văn Khá");
    const [isPlanChecked, setIsPlanChecked] = useState(false);
    const [isUrgentChecked, setIsUrgentChecked] = useState(false);
    const [typeOfDate, setTypeOfDate] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [reasion, setReasion] = useState("");
    const [reviewer, setReviewer] = useState([]);
    const [follower, setFollower] = useState([]);
    const [selectedFile, setSelectedFile] = useState<Blob>();
    const [showTable, setShowTable] = useState(false);
    const [dataSource, setDataSource] = useState<Menu[]>([]);
    const columns: ColumnsType<Menu> = [
        {
            title: "STT",
            dataIndex: "stt",
            align: "center",
            render: (text, record) => <div>{text}</div>,
            width: "13.75%",
        },
        {
            title: "Ca nghỉ",
            dataIndex: "shift",
            align: "center",
            render: (text, record) => (
                <div
                    style={{
                        margin: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ fontSize: "16px" }}>{text}</span>
                </div>
            ),
            width: "23%",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "dateFrom",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    <div>{text}</div>
                </div>
            ),
            align: "center",
            width: "23%",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "dateTo",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    <div>{text}</div>
                </div>
            ),
            align: "center",
            width: "23%",
        },
        {
            title: "Xóa",
            dataIndex: "stt",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    <div>
                        <Image
                            src="/delete-3.svg"
                            alt=""
                            height={18}
                            width={18}
                            onClick={() => handleDeleteRecord(text)}
                        ></Image>
                    </div>
                </div>
            ),
            align: "center",
            width: "12%",
        },
    ];
    const columns2: ColumnsType<Menu> = [
        {
            title: "STT",
            dataIndex: "stt",
            align: "center",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    {text}
                </div>
            ),
            width: "7%",
        },
        {
            title: "Ca nghỉ",
            dataIndex: "shift",
            align: "center",
            render: (text, record) => (
                <div
                    style={{
                        fontSize: "16px",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ fontSize: "16px" }}>{text}</span>
                </div>
            ),
            width: "20%",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "dateFrom",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    <div>{text}</div>
                </div>
            ),
            align: "center",
            width: "20%",
        },
        {
            title: "Thời gian bắt đầu",
            dataIndex: "timeFrom",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    <div>{text}</div>
                </div>
            ),
            align: "center",
            width: "20%",
        },
        {
            title: "Thời gian kết thúc",
            dataIndex: "timeTo",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    <div>{text}</div>
                </div>
            ),
            align: "center",
            width: "20%",
        },
        {
            title: "Xóa",
            dataIndex: "stt",
            render: (text, record) => (
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                    }}
                >
                    <div>
                        <Image
                            src="/delete-3.svg"
                            alt=""
                            height={18}
                            width={18}
                            onClick={() =>
                                handleDeleteRecord(record?.stt?.toString())
                            }
                        ></Image>
                    </div>
                </div>
            ),
            align: "center",
            width: "12%",
        },
    ];

    function updateSttAfterDelete() {
        setDataSource((prevDataSource) =>
            prevDataSource.map((menu, index) => ({
                ...menu,
                stt: (index + 1).toString(),
            }))
        );
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            //   console.log(file.name)
        }
    };

    const handleTypeOfProposedChange = (e) => {
        setTypeOfProposed(e);
        // console.log(e)
    };

    const handleDeleteRecord = (sttToDelete: string) => {
        setDataSource((prevDataSource) =>
            prevDataSource.filter((menu) => menu.stt !== sttToDelete)
        );

        updateSttAfterDelete();
    };

    const handleShiftChange = (e) => {
        setShift(e);
        // console.log(e)
    };

    const handleReasionChange = (e) => {
        setReasion(e.target.value);
        // console.log(e.target.value);
    };

    const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
        // console.log(e.target.value)
    };

    const handleDateToChange = (e) => {
        setDateTo(e.target.value);
        // console.log(e.target.value)
    };

    const handleTimeFromChange = (e) => {
        setTimeFrom(e.target.value);
        // console.log(e.target.value)
    };

    const handleTimeToChange = (e) => {
        setTimeTo(e.target.value);

        // console.log(e.target.value)
    };

    const handleReviewerChange = (e) => {
        setReviewer(e);
        // console.log(e)
    };

    const handleFollowerChange = (e) => {
        setFollower(e);
        // console.log(e)
    };

    const handleTypeOfDateChange = (e) => {
        setTypeOfDate(e);
        // console.log(e)
    };

    const handlePlanChange = (e) => {
        setIsPlanChecked(e.target.checked);
        setIsUrgentChecked(false);
    };

    const handleUrgentChange = (e) => {
        setIsUrgentChecked(e.target.checked);
        setIsPlanChecked(false);
    };

    const handleNameProposedChange = (e) => {
        setNameProposed(e.target.checked);
    };

    const [infoUser, setInfoUser] = useState<any>();
    const [listDuyet, setListDuyet] = useState<any>({});
    const [listEmp, setListEmp]: any = useState([]);
    const [listShift, setListShift]: any = useState([]);
    const [depLabel, setDepLabel]: any = useState<any>([]);
    const [fileData, setFileData] = useState<Blob>();

    useEffect(() => {
        const getListDuyet = async () => {
            const res = await POST_VT("api/vanthu/dexuat/showadd", {});

            if (res?.result) {
                setListDuyet({
                    listDuyet: res?.listUsersDuyet?.map((user) => ({
                        label: user?.userName,
                        value: user?.idQLC
                            ? `/${user?.idQLC}`
                            : "/nhanvien.png",
                        url: user?.avatarUser,
                    })),
                    listTheoDoi: res?.listUsersTheoDoi?.map((user) => ({
                        label: user?.userName,
                        value: user?.idQLC,
                        url: user?.avatarUser,
                    })),
                });
            }
        };

        getListDuyet();
        GET("api/qlc/shift/list").then((res) => {
            if (res?.result === true) {
                setListShift(
                    res?.items.map((item) => {
                        return {
                            value: `${item?.shift_id}`,
                            label: item?.shift_name,
                        };
                    })
                );
            }
        });

        setInfoUser(getInfoUser());
    }, []);

    useEffect(() => {
        if (infoUser?.idQLC) {
            form.setFieldValue("name", infoUser?.userName);
        }
    }, [infoUser]);

    useEffect(() => {
        // console.log( (!(typeOfDate !== "5") || (typeOfDate === "")) )
        if (!(typeOfDate !== "5") || typeOfDate === "") {
            if (shift !== "" && dateFrom !== "" && dateTo !== "") {
                const newMenu: Menu = {
                    stt: stt,
                    shift: shift,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    timeTo: timeTo,
                    timeFrom: timeFrom,
                };
                setDataSource((prevMenuData) => [...prevMenuData, newMenu]);
                setStt((prevSttCount) => prevSttCount + 1);
                setShowTable(true);
            }
        } else {
            if (
                shift !== "" &&
                dateFrom !== "" &&
                timeTo !== "" &&
                timeFrom !== ""
            ) {
                const newMenu: Menu = {
                    stt: stt,
                    shift: shift,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    timeTo: timeTo,
                    timeFrom: timeFrom,
                };

                setDataSource((prevMenuData) => [...prevMenuData, newMenu]);
                setStt((prevSttCount) => prevSttCount + 1);
                setShowTable(true);
            }
        }
    }, [timeTo, dateTo, shift, dateFrom, timeFrom]);
    const router = useRouter();

    const handleSubmit = () => {
        form.validateFields().then((value) => {
            let content = {};
            if (dataSource?.length > 0) {
                content = {
                    nghi_phep: dataSource?.map((row) => [
                        `${dayjs(row?.dateFrom).format(
                            "YYYY-MM-DDT00:00:00.000+00:00"
                        )}`,
                        `${dayjs(row?.dateTo).format(
                            "YYYY-MM-DDT00:00:00.000+00:00"
                        )}`,
                        value["shift_apply"],
                    ]),
                };
            } else {
                content = {
                    nghi_phep: [
                        [
                            `${dayjs(
                                value["date_apply_from"] +
                                    " " +
                                    value["date_apply_from_time"]
                            ).format("YYYY-MM-DDTHH:mm:ss.SSS+00:00")}`,
                            `${dayjs(
                                value["date_apply_from"] +
                                    " " +
                                    value["date_apply_to_time"]
                            ).format("YYYY-MM-DDTHH:mm:ss.SSS+00:00")}`,
                            value["shift_apply"],
                        ],
                    ],
                };
            }
            const body = {
                ...value,
                id_user_duyet: value["id_user_duyet"]?.join(","),
                id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
                noi_dung: JSON.stringify(content),
            };

            //noi_dung: {"nghi_phep": [["2021-12-04T00:00:00.000+00:00","2021-12-08T00:00:00.000+00:00","1"]]}

            //   console.log(dataSource);
            //   console.log(body);
            const fd = new FormData();

            Object.keys(body)?.forEach((k) => {
                fd.append(k, body[k]);
            });

            if (selectedFile) {
                fd.append("file_kem", selectedFile);
            }

            POST_VT("api/vanthu/dexuat/De_Xuat_Xin_Nghi", fd).then((res) => {
                alert("Tạo đề xuất xin nghỉ thành công!");
                router.replace(router.asPath);
            });
        });
    };

    const handlePrevious = () => {
        router.back();
    };

    return (
        <>
            <div style={{ width: "100%", justifyContent: "center" }}>
                <div className={`shadowForm ${styles.form}`}>
                    <div className={styles.header}>
                        <Image
                            src="/back-w.png"
                            alt=""
                            height={24}
                            width={24}
                            onClick={handlePrevious}
                        ></Image>
                        <div className={styles.text}>Đơn xin nghỉ phép</div>
                    </div>
                    <Form
                        form={form}
                        style={{ width: "100%" }}
                        initialValues={{ name: "Khas" }}
                        className="taoDeXuatForm"
                    >
                        <div className={styles.body}>
                            <div className={styles.bodyItem1}>
                                <span style={{ fontSize: "16px" }}>
                                    Tên đề xuất{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"name_dx"}>
                                    <Input
                                        onChange={handleNameProposedChange}
                                        placeholder="Nhập tên đề xuất"
                                        style={{ fontSize: "16px" }}
                                        size="large"
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem2}>
                                <span style={{ fontSize: "16px" }}>
                                    Họ và tên
                                </span>
                                <Form.Item name={"name"}>
                                    <Input
                                        size="large"
                                        className={`input_donXinNghiPhep`}
                                        placeholder={nameStaff}
                                        style={{
                                            fontSize: "16px",
                                            backgroundColor: "#EDF3FF",
                                        }}
                                        disabled
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem3}>
                                <span style={{ fontSize: "16px" }}>
                                    Loại đề xuất
                                </span>
                                <Form.Item name={"type_dx"}>
                                    <Input
                                        size="large"
                                        placeholder="Đơn xin nghỉ phép"
                                        style={{
                                            fontSize: "16px",
                                            color: "#717B7F",
                                            backgroundColor: "#EDF3FF",
                                        }}
                                        disabled
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem4}>
                                <div className={styles.checkboxRow}>
                                    <Form.Item
                                        valuePropName="checked"
                                        name={"loai_np_timeRemaining"}
                                    >
                                        <Checkbox
                                            style={{ fontSize: "16px" }}
                                            checked={isPlanChecked}
                                            onChange={handlePlanChange}
                                        >
                                            <span style={{ fontSize: "16px" }}>
                                                Đề xuất có kế hoạch{" "}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                    color: "red",
                                                }}
                                            >
                                                *
                                            </span>
                                        </Checkbox>
                                        <Checkbox
                                            style={{
                                                fontSize: "16px",
                                                marginLeft: "16px",
                                            }}
                                            checked={isUrgentChecked}
                                            onChange={handleUrgentChange}
                                        >
                                            <span style={{ fontSize: "16px" }}>
                                                Đề xuất đột xuất{" "}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                    color: "red",
                                                }}
                                            >
                                                *
                                            </span>
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.bodyItem5}>
                                <span style={{ fontSize: "16px" }}>Loại </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"type_day_off"}>
                                    <Select
                                        allowClear={false}
                                        placeholder="Chọn loại"
                                        style={{ fontSize: "16px" }}
                                        size="large"
                                        options={[
                                            {
                                                value: "1",
                                                label: "Chọn loại",
                                            },
                                            {
                                                value: "2",
                                                label: "1/4 ngày",
                                            },
                                            {
                                                value: "3",
                                                label: "1/2 ngày",
                                            },
                                            {
                                                value: "4",
                                                label: "3/4 ngày",
                                            },
                                            {
                                                value: "5",
                                                label: "Ngày",
                                            },
                                        ]}
                                        suffixIcon={
                                            <Image
                                                src="/suffixIcon_1.svg"
                                                alt=""
                                                width={14}
                                                height={14}
                                            />
                                        }
                                        onChange={handleTypeOfDateChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem6}>
                                <span style={{ fontSize: "16px" }}>
                                    Loại nghỉ phép{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name="loai_np">
                                    <Select
                                        allowClear={false}
                                        size="large"
                                        placeholder="Chọn loại"
                                        options={[
                                            {
                                                value: "1",
                                                label: "Có lương",
                                            },
                                            {
                                                value: "2",
                                                label: "Không lương",
                                            },
                                        ]}
                                        suffixIcon={
                                            <Image
                                                src="/suffixIcon_1.svg"
                                                alt=""
                                                width={14}
                                                height={14}
                                            />
                                        }
                                        style={{ fontSize: "16px" }}
                                        onChange={handleTypeOfProposedChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem7}>
                                <span style={{ fontSize: "16px" }}>
                                    Ngày bắt đầu nghỉ{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"date_apply_from"}>
                                    <Input
                                        placeholder="Chọn ngày"
                                        type="date"
                                        onChange={(e) => {
                                            form.setFieldValue(
                                                "month_from",
                                                e.target.value.substring(0, 7)
                                            );
                                            handleDateFromChange(e);
                                        }}
                                        style={{ fontSize: "16px" }}
                                        size="large"
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem8}>
                                <span style={{ fontSize: "16px" }}>
                                    Ngày kết thúc nghỉ{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"date_apply_to"}>
                                    {!(typeOfDate !== "5") ||
                                    typeOfDate === "" ? (
                                        <Input
                                            placeholder="Chọn ngày"
                                            type="date"
                                            onChange={(e) => {
                                                form.setFieldValue(
                                                    "month_to",
                                                    e.target.value.substring(
                                                        0,
                                                        7
                                                    )
                                                );
                                                handleDateToChange(e);
                                            }}
                                            style={{ fontSize: "16px" }}
                                            size="large"
                                        />
                                    ) : (
                                        <Input
                                            placeholder="Chọn ngày"
                                            type="date"
                                            onChange={(e) => {
                                                form.setFieldValue(
                                                    "month_to",
                                                    e.target.value.substring(
                                                        0,
                                                        7
                                                    )
                                                );
                                            }}
                                            style={{
                                                fontSize: "16px",
                                                color: "#717B7F",
                                                backgroundColor: "#EDF3FF",
                                            }}
                                            disabled
                                            size="large"
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem9}>
                                <span style={{ fontSize: "16px" }}>
                                    Ca nghỉ{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"shift_apply"}>
                                    <Select
                                        optionFilterProp="label"
                                        placeholder="Chọn ca nghỉ"
                                        size="large"
                                        options={listShift}
                                        suffixIcon={
                                            <Image
                                                src="/suffixIcon_1.svg"
                                                alt=""
                                                width={14}
                                                height={14}
                                            />
                                        }
                                        style={{ fontSize: "16px" }}
                                        onChange={handleShiftChange}
                                    />
                                </Form.Item>
                            </div>
                            <div
                                className={`${
                                    !(typeOfDate !== "5") || typeOfDate === ""
                                        ? styles.bodyItem15
                                        : styles.bodyItem14
                                }`}
                            >
                                <span style={{ fontSize: "16px" }}>
                                    Thời gian bắt đầu{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"date_apply_from_time"}>
                                    <Input
                                        placeholder="Chọn giờ"
                                        type="time"
                                        onBlur={(e) => {
                                            form.setFieldValue(
                                                "time_from",
                                                e.target.value.substring(0, 7)
                                            );
                                            handleTimeFromChange(e);
                                        }}
                                        // onChange={(e) => {
                                        //   form.setFieldValue(
                                        //     'time_from',
                                        //     e.target.value.substring(0, 7)
                                        //   )
                                        //   handleTimeFromChange(e)
                                        // }}
                                        style={{ fontSize: "16px" }}
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div
                                className={`${
                                    !(typeOfDate !== "5") || typeOfDate === ""
                                        ? styles.bodyItem15
                                        : styles.bodyItem14
                                }`}
                            >
                                <span style={{ fontSize: "16px" }}>
                                    Thời gian kết thúc{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"date_apply_to_time"}>
                                    <Input
                                        placeholder="Chọn giờ"
                                        type="time"
                                        onBlur={(e) => {
                                            form.setFieldValue(
                                                "time_to",
                                                e.target.value.substring(0, 7)
                                            );
                                            handleTimeToChange(e);
                                        }}
                                        // onChange={(e) => {
                                        //   form.setFieldValue(
                                        //     'time_to',
                                        //     e.target.value.substring(0, 7)
                                        //   )
                                        //   handleTimeToChange(e)
                                        // }}
                                        style={{ fontSize: "16px" }}
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem16}>
                                {showTable ? (
                                    !(typeOfDate !== "5") ||
                                    typeOfDate === "" ? (
                                        <Table
                                            columns={columns}
                                            pagination={false}
                                            dataSource={dataSource}
                                            scroll={{ x: "670px" }}
                                            bordered
                                            className={`${styles.bodyItem14} table_taoDeXuat`}
                                        />
                                    ) : (
                                        <Table
                                            columns={columns2}
                                            pagination={false}
                                            dataSource={dataSource}
                                            scroll={{ x: "670px" }}
                                            bordered
                                            className={`${styles.bodyItem14}`}
                                        />
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className={styles.bodyItem10}>
                                <span style={{ fontSize: "16px" }}>
                                    Lý do nghỉ{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"ly_do"}>
                                    <Input.TextArea
                                        className={styles.textArea}
                                        onChange={handleReasionChange}
                                        placeholder="Nhập lí do nghỉ"
                                        style={{ fontSize: "16px" }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem11}>
                                <span style={{ fontSize: "16px" }}>
                                    Người xét duyệt{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"id_user_duyet"}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ fontSize: "16px" }}
                                        optionFilterProp="name"
                                        placeholder="Người xét duyệt"
                                        onChange={handleReviewerChange}
                                        size="large"
                                        options={[
                                            ...(listDuyet.listDuyet
                                                ? listDuyet.listDuyet.map(
                                                      (item) => ({
                                                          label: (
                                                              <div
                                                                  style={{
                                                                      display:
                                                                          "flex",
                                                                      alignItems:
                                                                          "center",
                                                                  }}
                                                              >
                                                                  <Avatar
                                                                      src={
                                                                          item?.url
                                                                      }
                                                                  />
                                                                  <p
                                                                      style={{
                                                                          marginLeft:
                                                                              "10px",
                                                                      }}
                                                                  >
                                                                      {
                                                                          item?.label
                                                                      }
                                                                  </p>
                                                              </div>
                                                          ),
                                                          name: item?.label,
                                                          value: item?.value,
                                                      })
                                                  )
                                                : []),
                                        ]}
                                        suffixIcon={
                                            <Image
                                                src="/suffixIcon_1.svg"
                                                alt=""
                                                width={14}
                                                height={14}
                                            />
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem12}>
                                <span style={{ fontSize: "16px" }}>
                                    Người theo dõi{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"id_user_theo_doi"}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ fontSize: "16px" }}
                                        placeholder="Người theo dõi"
                                        optionFilterProp="name"
                                        onChange={handleFollowerChange}
                                        size="large"
                                        options={
                                            listDuyet &&
                                            listDuyet?.listTheoDoi?.map(
                                                (item) => ({
                                                    label: (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={item?.url}
                                                            />
                                                            <p
                                                                style={{
                                                                    marginLeft:
                                                                        "10px",
                                                                }}
                                                            >
                                                                {item?.label}
                                                            </p>
                                                        </div>
                                                    ),
                                                    name: item?.label,
                                                    value: item?.value,
                                                })
                                            )
                                        }
                                        suffixIcon={
                                            <Image
                                                src="/suffixIcon_1.svg"
                                                alt=""
                                                width={14}
                                                height={14}
                                            />
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem13}>
                                <span style={{ fontSize: "16px" }}>
                                    Tài liệu đính kèm{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"file_kem"}>
                                    <Input
                                        placeholder="Thêm tài liệu đính kèm"
                                        suffix={
                                            <Image
                                                src="/pon.png"
                                                alt=""
                                                width={14}
                                                height={14}
                                            />
                                        }
                                        onClick={() =>
                                            inputFileRef.current.click()
                                        }
                                        style={{ fontSize: "16px" }}
                                        size="large"
                                        value={selectedFile?.name}
                                        readOnly
                                    />
                                    <input
                                        type="file"
                                        onChange={handleFileInputChange}
                                        style={{ display: "none" }}
                                        ref={inputFileRef}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.ButtonWhite} htmlType="submit">
                        <p className={styles.txt}>Hủy</p>
                    </Button>
                    <Button className={styles.Button} onClick={handleSubmit}>
                        <p className={styles.txt}>Tạo đề xuất</p>
                    </Button>
                </div>
            </div>
        </>
    );
}
