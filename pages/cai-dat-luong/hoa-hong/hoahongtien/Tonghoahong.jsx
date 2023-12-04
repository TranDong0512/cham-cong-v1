import React, { useEffect, useState } from "react";
import styles from "../hoahongcanhan.module.css";
import { DatePicker, Table, Select, Button } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";
import { POST_TL, getCompIdCS } from "../../../api/BaseApi";
import moment from "moment";
import Cookies from "js-cookie";
import axios from "axios";
import { domain } from "./AddTable";
import {
  MonthData,
  YearData,
} from "../../../../components/tinh-luong/components/small-component/Month_and_Year";
dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;

export const getEmps = async () => {
  try {
    const token = Cookies.get("token_base365");
    if (!token) return [];
    const com_id = Cookies.get("com_id");
    const res = await axios.post(
      `${domain}/api/qlc/employee/listEmpSimpleNoToken`,
      { com_id: com_id }
    );

    if (res?.status === 200) {
      return res?.data?.data?.list;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
const Tonghoahong = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month()+1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const monthFormat = "MM";
  const yearFormat = "YYYY";

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "incomeType",
      render: (_, record) => (
        <div>
          <p className={styles.p_name}>{record?.userName}</p>
          <p>{record?.ro_id}</p>
        </div>
      ),
    },
    {
      title: "Chu kỳ",
      dataIndex: "editTime",
      render: (_, record) => (
        <div>
          <p className={styles.p_time}>{`Tháng ${dayjs(record?.ro_time).format('MM/YYYY')}`}</p>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "editMoney",
      render: (_, record) => (
        <div>
           <p className={styles.p_red}>
            {record?.ro_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
          </p>
        </div>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [listEmp, setListEmp] = useState([]);
  const [ro_id_user, setIDUser] = useState(null)
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());
  const [param, setParam] = useState({
    month: moment().month() + 1,
    year: moment().year(),
    ro_id_user: ro_id_user
  });
  useEffect(() => {
    const getListRose = async () => {
      setLoading(true);
      const com_id = getCompIdCS();
      const start = moment(year + "/" + month + "/" + "01");
      const start_date = start.format("YYYY/MM/DD");
      const end_date = start.endOf("month").format("YYYY/MM/DD");
      const res = await POST_TL("api/tinhluong/congty/lay_tien_ca_nhan", {
        start_date: start_date,
        end_date: end_date,
        ro_id_com: com_id,
        ro_id_user: ro_id_user
      });
      if (res?.data && res?.data.length != 0) {
        const mergedData = {};
        res.rose_user.forEach((record) => {
          const ro_id = record.detail[0]?.idQLC;
          const ro_price = record.ro_price;
          const userName = record.detail[0]?.userName
          const ro_time = record.ro_time
          if (ro_id in mergedData) {
            mergedData[ro_id].ro_price += ro_price;
          } else {
            mergedData[ro_id] = { ro_id, ro_price, userName, ro_time};
          }
        })
        const result = Object.values(mergedData);
        setApiData(result);
      }
      setLoading(false);
    };
    getListRose();
  }, [param]);

  useEffect(() => {
    try {
      const getList = async () => {
        const list = await getEmps();
        setListEmp(
          list?.map((item) => ({
            label: `${item?.userName} - ${item?.idQLC}`,
            value: item?.idQLC,
          }))
        );
      };
  
      getList();
    } catch (error) {
      
    }
  }, []);

  const handleClick = () => {
    if (month && year) {
      setParam({
        month: month,
        year: year,
        ro_id_user: ro_id_user
      });
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>Tổng hoa hồng tiền</h3>
            <p className={styles.p_style}>
              Quản lý theo dõi tổng hoa hồng tiền
            </p>
          </div>
          <div>
            <div className={styles.modal_delete_body}></div>
          </div>
        </div>
        <div className={styles.select_time}>
          <div>
          <Select
              className={styles.selection}
              showSearch
              size="large"
              defaultValue={{
                label: `Tháng ${selectedMonth}`,
                value: selectedMonth,
              }}
              onChange={(v) => setMonth(v)}
              optionFilterProp="children"
              options={MonthData}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
            />
          </div>
          <div>
          <Select
              className={styles.selection}
              showSearch
              onChange={(v) => setYear(v)}
              size="large"
              defaultValue={{ label: `Năm ${selectedYear}`, value: selectedYear }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={YearData}
            />
          </div>
          <div style={{minWidth:250, width:'max-content'}}>
            <SearchOutlined className={styles["search-icon"]} />
            <Select
              showSearch
              style={{width:'100%'}}
              placeholder=""
              size='large'
              defaultValue="Nhập tên cần tìm"
              optionFilterProp="children"
              onChange={(v) => setIDUser(v)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listEmp}
            />
          </div>
          <div>
          <Button size="large" type="primary" onClick={handleClick}>
              <p> Thống kê</p>
            </Button>
          </div>
        </div>
        <div className={styles.table_content}>
          <Table
          loading= {loading}
            columns={columns}
            dataSource={apiData}
            scroll={{
              x: 'max-content',
            }}
            className={`table_add ${styles.table_add}`}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Tonghoahong;
