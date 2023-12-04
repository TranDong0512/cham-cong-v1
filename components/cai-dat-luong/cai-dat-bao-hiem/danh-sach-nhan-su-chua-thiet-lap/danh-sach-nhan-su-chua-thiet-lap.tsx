import { Button, Checkbox, Switch, Table, Select } from "antd";
import type { SelectProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import styles from "./danh-sach-nhan-su-chua-thiet-lap.module.css";
import Image from "next/image";
import { ModalThietLapBaoHiemNhanVien } from "./modal-thiet-lap/modal-thiet-lap";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import dayjs from "dayjs";
import { POST_SS_TL } from "@/pages/api/BaseApi";
import axios from "axios";
import Cookies from "js-cookie";

export const DanhSachNhanSuChuaThietLap = ({
  onChangeKey,
  listDepLabel,
  listEmpLabel,
}: {
  onChangeKey: (key: string) => void;
  listDepLabel: any;
  listEmpLabel: any;
}) => {
  console.log(1111);
  const com_id = Cookies.get("com_id");
  const currentToken = Cookies.get("token_base365");
  const [month, setMonth] = useState<any>(dayjs().month() + 1);
  const [year, setYear] = useState(dayjs().year());
  const [staff, setStaff] = useState("");
  const currentUrlQlc = process.env.NEXT_PUBLIC_API;
  const [openModalThietLap, setOpenModalThietLap] = useState(false);
  const [key, setKey] = useState<any>({});
  const [data, setData]: any[] = useState();
  const [isTK, setIsTK] = useState<any>(false);
  const handleSetDate = (valueOld, value, type) => {
    if (type == "month") setMonth(value.value);
    if (type == "year") setYear(value.value);
    if (type == "epid") setStaff(value.value);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.post(
          `${currentUrlQlc}/api/tinhluong/congty/show_list_user_noinsrc`,
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
          setData(response?.data.listUserFinal);
        }
      };
      fetchData();
    } catch (error) {}
  }, [isTK]);
  const columns: ColumnsType<any> = [
    {
      title: " ",
      align: "center",
      render: (record) => (
        <Image src={"/avt_365.png"} alt="" height={46} width={46} />
      ),
      width: 66,
    },
    {
      title: " ",
      render: (record) => (
        <div className={styles.td_danh_sach_nhan_su_chua_thiet_lap}>
          <div style={{ fontSize: "16px", color: "#4C5BD4" }}>
            {record?.userName}
          </div>
          <div style={{ fontSize: "16px" }}>ID: {record?.idQLC} </div>
          {/* <div style={{ fontSize: '16px' }}>{record.room}</div> */}
        </div>
      ),
      align: "left",
    },
    {
      title: " ",
      render: (record) => (
        <Button
          className={styles.btnThietLap}
          onClick={() => handleClickSetting(record)}
        >
          <Image src="/settings-01.svg" alt="" width={24} height={24}></Image>
          <div className={styles.btnThietLapText} style={{ fontSize: "16px" }}>
            Thiết lập
          </div>
        </Button>
      ),
      align: "center",
      width: 170,
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

  const handleClickSetting = (key: any) => {
    setKey(key);
    setOpenModalThietLap(true);
  };
  return (
    <>
      <div className={styles.title}>
        <div className={styles.content}>
          Danh sách nhân sự chưa thiết lập bảo hiểm
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles.divMonth}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{ width: "100%", pointerEvents: "visibleFill" }}
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
            style={{ width: "100%", pointerEvents: "visibleFill" }}
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
            style={{ pointerEvents: "visibleFill" }}
            placeholder="Chọn nhân viên"
            showSearch
            filterOption={(input, option) =>
              option?.label?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0 ||
              option?.labelNoVN?.toLowerCase()?.indexOf(input.toLowerCase()) >=
                0
            }
            onChange={(valueOld, value) =>
              handleSetDate(valueOld, value, "epid")
            }
            options={[{ label: "Tất cả", value: "all" }, ...listEmpLabel]}
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

      <div className={styles.bodyTable}>
        <Table
          className={`table_nhap_lai_khuon_mat table_nhan_su_chua_thiet_lap`}
          columns={columns}
          sticky={true}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={data}
        />
      </div>
      {ModalThietLapBaoHiemNhanVien(
        openModalThietLap,
        setOpenModalThietLap,
        key,
        onChangeKey
      )}
    </>
  );
};
