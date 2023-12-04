import { Button, Checkbox, Switch, Table, Select, Row, Col } from "antd";
import type { SelectProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styles from "./danh-sach-nhan-su-da-thiet-lap.module.css";
import Image from "next/image";
import { ModalThietLapBaoHiemNhanVien } from "./modal-thiet-lap/modal-thiet-lap";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { POST_TL } from "@/pages/api/BaseApi";
import dayjs from "dayjs";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const ConfirmModal = ({
  openFilterClick,
  setOpenFilterClick,
  key,
  setLoad,
}: {
  openFilterClick: boolean;
  setOpenFilterClick: any;
  key: any;
  setLoad: any;
}) => {
  const router = useRouter();
  const children = (
    <div style={{ padding: "20px 20px 0px 20px" }}>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p style={{ textAlign: "center" }}>
        Bạn có muốn xóa bảo hiểm của nhân sự này?
      </p>
    </div>
  );

  const onConfirm = async () => {
    console.log(key);
    const res = await POST_TL("api/tinhluong/congty/delete_nv_insrc", {
      cl_id: key?.cls_id,
    });

    if (res?.message === "success") {
      window.alert("Xóa bảo hiểm nhân viên thành công");
      setOpenFilterClick(false);
      setLoad(res);
    }
  };

  return ModalWrapper(
    openFilterClick,
    setOpenFilterClick,
    children,
    500,
    "",
    "Đồng ý",
    onConfirm,
    false,
    false
  );
};

export const DanhSachNhanSuDaThietLap = ({
  listDepLabel,
  listEmpLabel,
}: {
  listDepLabel: any;
  listEmpLabel: any;
}) => {
  const currentUrlQlc = process.env.NEXT_PUBLIC_API;
  const com_id = Cookies.get("com_id");
  const currentToken = Cookies.get("token_base365");
  const [month, setMonth] = useState<any>(dayjs().month() + 1);
  const [year, setYear] = useState(dayjs().year());
  const [staff, setStaff] = useState("");
  const [openFilterClick, setOpenFilterClick] = useState(false);
  const [openModalThietLap, setOpenModalThietLap] = useState(false);
  const [key, setKey] = useState<any>({});
  const [data, setData]: any[] = useState();
  const [isTK, setIsTK] = useState<any>(false);
  const [load, setLoad] = useState<any>(false);
  const columns: ColumnsType<any> = [
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>Họ và tên (ID)</span>
      ),
      align: "center",
      render: (url, record) => (
        <div>
          <Row>
            <Col>
              <Image
                src={"/anhnhanvien.png"}
                alt=""
                height={46}
                width={46}
                style={{ margin: "20px 10px 10px 10px" }}
              />
            </Col>
            <Col
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  color: "#4C5BD4",
                  fontSize: "16px",
                  maxWidth: "175px",
                  wordWrap: "break-word",
                  textAlign: "left",
                }}
              >
                {record?.name}
              </div>
              <div style={{ fontSize: "16px" }}>ID: {record?.idQLC} </div>
            </Col>
          </Row>
        </div>
      ),
      width: 300,
    },
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>
          Chính sách bảo hiểm
        </span>
      ),
      render: (text, record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>{record?.policy}</div>
        </div>
      ),
      align: "center",
      width: 266,
    },
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>Áp dụng từ ngày</span>
      ),
      render: (record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>
            {record?.cls_day
              ? moment(record?.cls_day)?.format("DD-MM-YYYY")
              : "Chua cap nhat"}
          </div>
        </div>
      ),
      align: "center",
      width: 163,
    },
    {
      title: <span style={{ fontSize: "16px", color: "#fff" }}>Đến ngày</span>,
      render: (record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>
            {" "}
            {record?.cls_day_end !== "1970-01-01T00:00:00.000Z"
              ? moment(record?.cls_day_end)?.format("DD-MM-YYYY")
              : "- -"}
          </div>
        </div>
      ),
      align: "center",
      width: 163,
    },
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>Tiền bảo hiểm</span>
      ),

      render: (record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>{record?.bh_money || 0}</div>
        </div>
      ),
      align: "center",
      width: 163,
    },
    {
      title: <span style={{ fontSize: "16px", color: "#fff" }}>Chức năng</span>,
      // dataIndex: 'key',
      render: (record) => (
        <div>
          <Image
            src={"/trash-2.svg"}
            alt=""
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setKey(record);
              setOpenFilterClick(true);
            }}
          ></Image>
        </div>
      ),
      align: "center",
      width: 119,
    },
  ];

  const selectMonth: SelectProps["options"] = [
    { value: 1, label: "Tháng 1" },
    { value: 2, label: "Tháng 2" },
    { value: 3, label: "Tháng 3" },
    { value: 4, label: "Tháng 4" },
    { value: 5, label: "Tháng 5" },
    { value: 6, label: "Tháng 6" },
    { value: 7, label: "Tháng 7" },
    { value: 8, label: "Tháng 8" },
    { value: 9, label: "Tháng 9" },
    { value: 10, label: "Tháng 10" },
    { value: 11, label: "Tháng 11" },
    { value: 12, label: "Tháng 12" },
  ];

  const selectYeah: SelectProps["options"] = [
    { value: dayjs().year() - 1, label: `Năm ${dayjs().year() - 1}` },
    { value: dayjs().year(), label: `Năm ${dayjs().year()}` },
    { value: dayjs().year() + 1, label: `Năm ${dayjs().year() + 1}` },
  ];
  const handleSetDate = (valueOld, value, type) => {
    if (type == "month") setMonth(value.value);
    if (type == "year") setYear(value.value);
    if (type == "epid") setStaff(value.value);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.post(
          `${currentUrlQlc}/api/tinhluong/congty/show_list_user_insrc`,
          {
            start_date: `${year}-${month}-01T00:00:00.000+00:00`,
            end_date: `${year}-${month}-${dayjs()
              .endOf("month")
              .format("DD")}T00:00:00.000+00:00`,
            cls_id_com: com_id,
            ep_id: staff,
            token: currentToken,
          }
        );
        if (response?.data.data == true) {
          setData(response?.data.list_us);
        }
        console.log("response", response);
      };
      fetchData();
    } catch (error) {}
  }, [isTK, load]);
  return (
    <>
      <div className={styles.title}>
        <div className={styles.content}>
          Danh sách nhân sự đã thiết lập bảo hiểm
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles.divMonth}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{
              width: "100%",
              pointerEvents: "visibleFill",
              fontSize: "16px",
            }}
            placeholder="Chọn tháng"
            onChange={(valueOld, value) =>
              handleSetDate(valueOld, value, "month")
            }
            options={selectMonth}
            className={styles.selectMonth}
          />
        </div>
        <div className={styles.divYeah}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{
              width: "100%",
              pointerEvents: "visibleFill",
              fontSize: "16px",
            }}
            placeholder="Chọn năm"
            onChange={(valueOld, value) =>
              handleSetDate(valueOld, value, "year")
            }
            options={selectYeah}
            className={styles.selectYeah}
          />
        </div>

        <div className={styles.divStaff}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{ pointerEvents: "visibleFill", fontSize: "16px" }}
            placeholder="Chọn nhân viên"
            showSearch
            onChange={(valueOld, value) =>
              handleSetDate(valueOld, value, "epid")
            }
            filterOption={(input, option) =>
              option?.label?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0 ||
              option?.labelNoVN?.toLowerCase()?.indexOf(input.toLowerCase()) >=
                0
            }
            options={[{ label: "Tat ca", value: "all" }, ...listEmpLabel]}
            className={styles.selectStaff}
          />
        </div>
        <div className={styles.divRevenue}>
          <Button
            className={`${styles.buttonRevenue}`}
            onClick={() => setIsTK(!isTK)}
          >
            <div style={{ fontSize: "16px" }}>Thống kê</div>
          </Button>
        </div>
      </div>

      <div className={styles.body}>
        <Table
          className={`table_phucloi table_dsBaoHiemDaThietLap`}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={data}
          scroll={{ x: "1160px" }}
        />
      </div>
      {ConfirmModal({ openFilterClick, setOpenFilterClick, key, setLoad })}
    </>
  );
};
