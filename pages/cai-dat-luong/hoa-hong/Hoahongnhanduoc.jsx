import React, { useEffect, useState } from "react";
import styles from "./Hoahongnhanduoc.module.css";
import { DatePicker, Table, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import * as XLSX from "xlsx";
import { POST_TL, getCompIdCS } from "../../api/BaseApi";
import moment from "moment/moment";
import _ from "lodash";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;

const Hoahongnhanduoc = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const monthFormat = "MM";
  const yearFormat = "YYYY";
  const formatMoney = (val) => new Intl.NumberFormat().format(val) + " VNĐ";
  const columns = [
    {
      title: "Họ và tên",
      render: (record) => (
        <p>
          {record?.detail?.idQLC} - {record?.detail?.userName}
        </p>
      ),
    },
    {
      title: "Hoa hồng tiền",
      render: (record) => {
        let total = 0;
        const listHHTien = record?.data?.["1"];
        listHHTien?.forEach((item) => (total += item?.ro_price));
        return <p>{formatMoney(total)} </p>;
      },
    },
    {
      title: "Hoa hồng doanh thu",
      render: (record) => {
        let total = 0;
        const listHHDT = record?.data?.["2"];
        listHHDT?.forEach((item) => (total += item?.ro_price));
        return <p>{formatMoney(total)} </p>;
      },
    },
    {
      title: "Hoa hồng lợi nhuận",
      render: (record) => {
        let total = 0;
        const listHHDT = record?.data?.["3"];
        listHHDT?.forEach((item) => (total += item?.ro_price));
        return <p>{formatMoney(total)} </p>;
      },
    },
    {
      title: "Hoa hồng lệ phí vị trí",
      render: (record) => {
        let total = 0;
        const listHHDT = record?.data?.["4"];
        listHHDT?.forEach((item) => (total += item?.ro_price));
        return <p>{formatMoney(total)} </p>;
      },
    },
    {
      title: "Hoa hồng kế hoạch",
      render: (record) => {
        let total = 0;
        const listHHDT = record?.data?.["5"];
        listHHDT?.forEach((item) => (total += item?.ro_price));
        return <p>{formatMoney(total)} </p>;
      },
    },
    {
      title: "Tổng hoa hồng",
      render: (record) => {
        let total = 0;
        const listHHKH = record?.data?.["5"];
        const listHHVT = record?.data?.["4"];
        const listHHLN = record?.data?.["3"];
        const listHHDT = record?.data?.["2"];
        const listHHTien = record?.data?.["1"];

        listHHKH?.forEach((item) => (total += item?.ro_price));
        listHHVT?.forEach((item) => (total += item?.ro_price));
        listHHLN?.forEach((item) => (total += item?.ro_price));
        listHHDT?.forEach((item) => (total += item?.ro_price));
        listHHTien?.forEach((item) => (total += item?.ro_price));

        return <p>{formatMoney(total)} </p>;
      },
    },
  ];

  const handleExportExcel = ({ data }) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dataArr);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoa hồng nhận được");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = "hoa_hong.xlsx";
    link.click();
  };

  const [data, setData] = useState([]);
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());
  const [listEmp, setListEmp] = useState([]);
  const [initData, setInitData] = useState();
  const [param, setParam] = useState({
    month: moment().month() + 1,
    year: moment().year(),
  });

  useEffect(() => {
    const getAll = async () => {
      setLoading(true);
      const curMonth = param?.month;
      const curYear = param?.year;
      const startOfMonth = moment(curYear + "/" + curMonth + "/" + "01").format(
        "YYYY/MM/DD"
      );
      const endOfMonth = moment(startOfMonth)
        .endOf("month")
        .format("YYYY/MM/DD");
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/lay_tien_ca_nhan", {
        ro_id_com: com_id,
        start_date: startOfMonth,
        end_date: endOfMonth,
      });

      if (res?.data === true) {
        const rUSer = res?.rose_user;
        const finalData = [];
        const temp = [];

        rUSer?.forEach((item) => {
          item?.detail?.forEach((d) => {
            temp.push({
              ...item,
              detail: d,
              TinhluongThietLap: item?.TinhluongThietLap?.[0],
            });
          });
        });

        const gr = _.groupBy(temp, (item) => item?.ro_id_user);
        let tempEmp = [];
        Object.keys(gr).forEach((key) => {
          const data = gr[key];
          tempEmp.push({
            label: data[0]?.detail?.idQLC + " - " + data[0]?.detail?.userName,
            value: data[0]?.detail?.idQLC,
          });

          const gr_by_type = _.groupBy(
            data,
            (item) => item?.TinhluongThietLap?.tl_id_rose
          );

          finalData.push({
            data: gr_by_type,
            detail: data?.[0]?.detail,
          });
        });
        setData(finalData);
        setInitData(finalData);
        setListEmp(tempEmp);
        setLoading(false);
      }
    };

    getAll();
  }, [param]);

  const onFinish = () => {
    if (month && year) {
      setParam({
        month: month,
        year: year,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Danh sách nhân viên & hoa hồng</h3>
          <p className={styles.p_style}>
            Quản lý theo dõi nhân viên được gán hoa hồng
          </p>
        </div>
        <div className={styles.select_time}>
          <Select
            placeholder="Chọn tháng"
            size="large"
            options={_.range(1, 13).map((item) => ({
              label: `Tháng ${item}`,
              value: item,
            }))}
            style={{ width: "200px" }}
            value={month}
            onChange={(v) => setMonth(v)}
          />
          <div>
            <Select
              placeholder="Chọn năm"
              size="large"
              options={_.range(2021, 2026).map((item) => ({
                label: `Năm ${item}`,
                value: item,
              }))}
              style={{ width: "200px" }}
              value={year}
              onChange={(v) => setYear(v)}
            />
          </div>
          <div>
            <SearchOutlined className={styles["search-icon"]} />
            <Select
              style={{ width: "300px" }}
              showSearch
              size="large"
              placeholder=""
              defaultValue="Tất cả nhân viên"
              optionFilterProp="children"
              onChange={(val) => {
                setData(
                  val === "all"
                    ? initData
                    : initData?.filter((item) => item?.detail?.idQLC === val)
                );
              }}
              options={[
                { value: "all", label: "Tất cả nhân viên" },
                ...listEmp,
              ]}
            />
          </div>
          <div>
            <button onClick={onFinish} className={styles.button} >
              Thống kê
            </button>
          </div>
        </div>
        <div className={styles.table_content}>
          <Table
            loading={loading}
            className={`table_add ${styles.table_add}`}
            scroll={{
              x: 1000,
            }}
            pagination={{ pageSize: 20 }}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
      {/* <div className={styles.content_bot}>
        <div>
          <button className={styles.export} onClick={handleExportExcel}>
            Xuất file thống kê
          </button>
        </div> */}
      {/* <div className={styles.video}>
          <iframe
            className='video_hd'
            style={{ borderRadius: 15 }}
            width='100%'
            height={430}
            src='https://www.youtube.com/embed/7LHuvsxo764'
            title='YouTube video player'
            frameBorder={0}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen=''
          />
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Hoahongnhanduoc;
