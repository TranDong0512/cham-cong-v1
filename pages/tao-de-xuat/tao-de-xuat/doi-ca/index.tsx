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
} from "antd";
import { useState, useRef, useEffect } from "react";

import { GET, POST_VT, getInfoUser } from "@/pages/api/BaseApi";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface Menu {
    stt: React.Key;
    shift: String;
    dateFrom: String;
    dateTo: String;
    timeTo: String;
    timeFrom: String;
}

export default function DonXinDoiCa() {
    const [form] = Form.useForm();
    const router = useRouter();
    // const inputFileRef = useRef<any>(null)
    const inputFileRef = useRef<any>("");

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
    const [selectedFile, setSelectedFile] = useState<any>();
    const [showTable, setShowTable] = useState(false);
    const [dataSource, setDataSource] = useState<Menu[]>([]);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            //   console.log(file.name);
        }
    };

    const handleTypeOfProposedChange = (e) => {
        setTypeOfProposed(e);
        // console.log(e);
    };

    const handleShiftChange = (e) => {
        setShift(e);
        // console.log(e);
    };

    const handleReasionChange = (e) => {
        setReasion(e.target.value);
        // console.log(e.target.value);
    };

    const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
        // console.log(e.target.value);
    };

    const handleDateToChange = (e) => {
        setDateTo(e.target.value);
        // console.log(e.target.value);
    };

    const handleTimeFromChange = (e) => {
        setTimeFrom(e.target.value);
        // console.log(e.target.value);
    };

    const handleTimeToChange = (e) => {
        setTimeTo(e.target.value);

        // console.log(e.target.value);
    };

    const handleReviewerChange = (e) => {
        setReviewer(e);
        // console.log(e);
    };

    const handleFollowerChange = (e) => {
        setFollower(e);
        // console.log(e);
    };

    const handleTypeOfDateChange = (e) => {
        setTypeOfDate(e);
        // console.log(e);
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

    const handleSubmit = () => {
        form.validateFields().then((value) => {
            // console.log({
            //     ...value,
            //     id_user_duyet: value['id_user_duyet']?.join(","),
            //     id_user_theo_doi: value['id_user_theo_doi']?.join(","),
            //     ngay_can_doi: dayjs(value['ngay_can_doi']).unix(),
            //     ngay_muon_doi: dayjs(value['ngay_muon_doi']).unix(),
            // })
            const body = {
                ...value,
                id_user_duyet: value["id_user_duyet"]?.join(","),
                id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
                ngay_can_doi: dayjs(value["ngay_can_doi"]).unix(),
                ngay_muon_doi: dayjs(value["ngay_muon_doi"]).unix(),
            };

            const fd = new FormData();

            Object.keys(body)?.forEach((k) => {
                fd.append(k, body[k]);
            });

            if (fileData) {
                // console.log(fileData)

                fd.append("file_kem", fileData);
            }

            POST_VT("api/vanthu/dexuat/De_Xuat_Xin_Doi_Ca", fd).then((res) => {
                if (res?.result === true) {
                    alert("Tạo đề xuất đổi ca thành công!");
                    router.replace(router.asPath);
                }
            });
        });
    };

    useEffect(() => {
        // console.log(typeOfDate)
        // console.log(shift)
        // console.log(dateFrom)
        // console.log(dateTo)
        // console.log(timeTo)
        // console.log(timeFrom)
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
                    stt: "1",
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

    const [infoUser, setInfoUser] = useState<any>();
    const [listDuyet, setListDuyet] = useState<any>({});
    const [listEmp, setListEmp]: any = useState([]);
    const [listShift, setListShift]: any = useState([]);
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
                            onClick={() => router.back()}
                        ></Image>
                        <div className={styles.text}>Đơn xin đổi ca</div>
                    </div>
                    <Form
                        style={{ width: "100%" }}
                        form={form}
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
                                        size="large"
                                        onChange={handleNameProposedChange}
                                        placeholder="Nhập tên đề xuất"
                                        style={{ fontSize: "16px" }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem2}>
                                <span style={{ fontSize: "16px" }}>
                                    Họ và tên
                                </span>
                                <Form.Item name={"name"}>
                                    <Input
                                        className={`input_donXinNghiPhep`}
                                        size="large"
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
                                <Form.Item>
                                    <Input
                                        value={"Đơn xin đổi ca"}
                                        size="large"
                                        placeholder="Đơn xin đổi ca"
                                        style={{
                                            fontSize: "16px",
                                            color: "#717B7F",
                                            backgroundColor: "#EDF3FF",
                                        }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem15}></div>
                            <div className={styles.bodyItem4}>
                                <span style={{ fontSize: "16px" }}>
                                    Ngày đổi{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"ngay_can_doi"}>
                                    <Input
                                        size="large"
                                        placeholder="Chọn ngày"
                                        type="date"
                                        style={{ fontSize: "16px" }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem5}>
                                <span style={{ fontSize: "16px" }}>
                                    Chọn ca
                                </span>
                                <Form.Item name={"ca_can_doi"}>
                                    <Select
                                        optionFilterProp="label"
                                        size="large"
                                        placeholder="Chọn ca nghỉ"
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
                            <div className={styles.bodyItem6}>
                                <span style={{ fontSize: "16px" }}>
                                    Ngày cần đổi{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"ngay_muon_doi"}>
                                    <Input
                                        size="large"
                                        placeholder="Chọn ngày"
                                        type="date"
                                        style={{ fontSize: "16px" }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem7}>
                                <span style={{ fontSize: "16px" }}>
                                    Chọn ca
                                </span>
                                <Form.Item name={"ca_muon_doi"}>
                                    <Select
                                        size="large"
                                        placeholder="Chọn ca nghỉ"
                                        optionFilterProp="label"
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
                            <div className={styles.bodyItem8}>
                                <span style={{ fontSize: "16px" }}>
                                    Lý do xin đổi ca{" "}
                                </span>
                                <span
                                    style={{ fontSize: "16px", color: "red" }}
                                >
                                    *
                                </span>
                                <Form.Item name={"ly_do"}>
                                    <Input.TextArea
                                        size="large"
                                        className={styles.textArea}
                                        onChange={handleReasionChange}
                                        placeholder="Nhập lí do nghỉ"
                                        style={{
                                            fontSize: "16px",
                                            minHeight: "108px",
                                        }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem9}>
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
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ fontSize: "16px" }}
                                        optionFilterProp="label"
                                        placeholder="Người xét duyệt"
                                        onChange={handleReviewerChange}
                                        className={`select_donXinPhepNghi`}
                                        options={listDuyet?.listDuyet}
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
                            <div className={styles.bodyItem10}>
                                <Form.Item valuePropName="checked">
                                    <Checkbox
                                        style={{ fontSize: "16px" }}
                                        checked={isPlanChecked}
                                        onChange={handlePlanChange}
                                    >
                                        <span style={{ fontSize: "16px" }}>
                                            Ghim người xét duyệt
                                        </span>
                                    </Checkbox>
                                </Form.Item>
                            </div>
                            <div className={styles.bodyItem11}>
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
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ fontSize: "16px" }}
                                        optionFilterProp="label"
                                        placeholder="Người theo dõi"
                                        onChange={handleFollowerChange}
                                        className={`select_donXinPhepNghi`}
                                        options={listDuyet?.listTheoDoi}
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
                                <Form.Item valuePropName="checked">
                                    <Checkbox
                                        style={{ fontSize: "16px" }}
                                        checked={isUrgentChecked}
                                        onChange={handleUrgentChange}
                                    >
                                        <span style={{ fontSize: "16px" }}>
                                            Ghim người theo dõi
                                        </span>
                                    </Checkbox>
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
                                <Form.Item name={"fileKem"}>
                                    <Input
                                        size="large"
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
                    <Button className={styles.ButtonWhite}>
                        <p className={styles.txt}>Hủy</p>
                    </Button>
                    <Button
                        className={styles.Button}
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        <p className={styles.txt}>Tạo đề xuất</p>
                    </Button>
                </div>
            </div>
        </>
    );
}
