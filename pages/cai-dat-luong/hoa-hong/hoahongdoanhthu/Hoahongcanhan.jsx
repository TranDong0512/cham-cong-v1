import React, { useState, useMemo, useEffect } from "react";
import styles from "../hoahongcanhan.module.css";
import {
  Table,
  Select,
  Modal,
  Button,
  Input,
  Form,
  Space,
  DatePicker,
  InputNumber,
  Row,
  Col,
} from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";
import axios from "axios";
import { domain } from "./AddTable";
import cookieCutter from "cookie-cutter";
import "react-datepicker/dist/react-datepicker.css";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
// import TextArea from "antd/es/input/TextArea";
const { TextArea } = Input;

function removeVietnameseTones(str) {
  if (str && str.trim() && str.trim() != "") {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|{|}|\||\\/g, " ");
    return str;
  } else {
    return "";
  }
}
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
const Hoahongcanhan = () => {
  const token = cookieCutter.get("token_base365");
  const cp = jwtDecode(Cookies.get("token_base365"))?.data?.com_id || 0;
  //* UseState phụ
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const [mucDoanhThu, setMucDoanhThu] = useState([]);
  const [mucDoanhThuSelected, setMucDoanhThuSelected] = useState();
  const [selectedEmp, setSelectedEmp] = useState();
  const [isInsert, setIsInsert] = useState(false);

  const YearData = [
    {
      value: dayjs().year() - 1,
      label: `${dayjs().year() - 1}`,
    },
    {
      value: dayjs().year(),
      label: `${dayjs().year()}`,
    },
    {
      value: dayjs().year() + 1,
      label: `${dayjs().year() + 1}`,
    },
  ];

  const MonthData = [
    {
      value: 1,
      label: "Tháng 1",
    },
    {
      value: 2,
      label: "Tháng 2",
    },
    {
      value: 3,
      label: "Tháng 3",
    },
    {
      value: 4,
      label: "Tháng 4",
    },
    {
      value: 5,
      label: "Tháng 5",
    },
    {
      value: 6,
      label: "Tháng 6",
    },
    {
      value: 7,
      label: "Tháng 7",
    },
    {
      value: 8,
      label: "Tháng 8",
    },
    {
      value: 9,
      label: "Tháng 9",
    },
    {
      value: 10,
      label: "Tháng 10",
    },
    {
      value: 11,
      label: "Tháng 11",
    },
    {
      value: 12,
      label: "Tháng 12",
    },
  ];

  //modalthêm mới
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsInsert(true);
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();

  // Initialize state for your fields
  const [moneyFields, setMoneyFields] = useState([]);
  const [dateFields, setDateFields] = useState([]);
  const [dateFieldsConverted, setDateFieldsConverted] = useState([]);
  const [note, setNote] = useState("");
  const [roTime, setRotime] = useState();
  const [reload, setReload] = useState(false);
  // console.log("roTime  AfterConverted", convertToUTC0(`${roTime}`));

  const handleModalCancer = () => {
    setMoneyFields([]);
    setDateFields([]);
    setDateFieldsConverted([]);
    setIsModalOpen(false);
  };

  const handleAddField = () => {
    setMoneyFields([...moneyFields, 0]);
    setDateFields([...dateFields, null]);
    setDateFieldsConverted([...dateFieldsConverted, null]);
  };

  const handleRemoveField = (index) => {
    const newMoneyFields = [...moneyFields];
    const newDateFields = [...dateFields];
    const newDateFieldsConverted = [...dateFieldsConverted];

    newMoneyFields.splice(index, 1);
    newDateFields.splice(index, 1);
    newDateFieldsConverted.splice(index, 1);

    setMoneyFields(newMoneyFields);
    setDateFields(newDateFields);
    setDateFieldsConverted(newDateFieldsConverted);
  };

  const handleMoneyChange = (index, value) => {
    const moneyValue = parseFloat(value);

    if (!isNaN(moneyValue)) {
      const newMoneyFields = [...moneyFields];
      newMoneyFields[index] = moneyValue;
      setMoneyFields(newMoneyFields);
    }
  };

  const handleDateChange = (index, date) => {
    const newDateFields = [...dateFields];
    const newDateFieldsConverted = [...dateFieldsConverted];
    const tempDate = dayjs(date)?.format("YYYY-MM-DD");
    newDateFields[index] = tempDate;
    // Convert the selected date to a Unix timestamp (in seconds)
    newDateFieldsConverted[index] = tempDate ? tempDate : null;

    setDateFields(newDateFields);
    setDateFieldsConverted(newDateFieldsConverted);
  };

  //chỉnh sửa
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState(null)
  const [editTime, setEditTime] = useState(null)
  const [editMoney, setEditMoney] = useState(null)
  const [editNote, setEditNote] = useState(null)
  const showModalEditConfirm = (key) => {
    console.log('key', key)
    setIsModalOpen(true);
    setIsInsert(true);
    setEditingIndex(key?.ro_id);
    setEditName(key?.detail[0]?.userName);
    setEditTime(dayjs(key?.ro_time));
    setEditMoney(key?.ro_price);
    setEditNote(key?.ro_note);
  };

  // xóa---------------------------------------------------------------
  const showModalDeleteConfirm = (key) => {
    setSelectedTableIndex(key?.ro_id);
    setIsModalDeleteOpen(true);
  };
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      let response = await axios.post(
        `${domain}/api/tinhluong/congty/delete_rose`,
        {
          ro_id: selectedTableIndex,
          token,
        }
      );
      if (response.status === 200) {
        window.alert("Xóa thành công");
        setReload(!reload);
        handleDeleteCancel();
      }
    } catch (error) {}
  };
  //end xoa--------------------------------------------------------------
  const columns = [
    {
      title: "Mã số",
      render: (record) => (
        <div>
          <p className={styles.p_name}>{record.ro_id}</p>
        </div>
      ),
    },
    {
      title: "ID",
      render: (record) => (
        <div>
          <p className={styles.p_name}>{record.detail.idQLC}</p>
        </div>
      ),
    },
    {
      title: "Họ và tên",
      render: (record) => (
        <div>
          <p className={styles.p_name}>{`${record?.detail?.userName}`}</p>
        </div>
      ),
    },
    {
      title: "Chu kỳ",
      render: (record) => (
        <div>
          <p className={styles.p_time}>
            {String(record?.ro_time).split("T")[0]}
          </p>
        </div>
      ),
    },
    {
      title: "Loại hoa hồng",
      render: (record) => {
        if (record?.ro_id_lr == 2) {
          return (
            <div>
              <p className={styles.p_time}>Doanh thu</p>
            </div>
          );
        }
      },
    },
    {
      title: "Doanh thu",
      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_price}</p>
        </div>
      ),
    },
    {
      title: "Hoa hồng(%)",
      render: (record) => (
        <div>
          <p className={styles.p_time}>
            {record?.TinhluongThietLap?.tl_phan_tram?.$numberDecimal}%
          </p>
        </div>
      ),
    },
    {
      title: "Ghi chú",
      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_note}</p>
        </div>
      ),
    },
    {
      title: "Thời gian tạo",
      render: (record) => (
        <div>
          <p className={styles.p_name}>
            {moment(record.ro_time_created).format("DD-MM-YYYY HH:mm:A")}
          </p>
        </div>
      ),
    },
    {
      title: "",
      render: (record) => (
        <>
          {/* <button
            style={{ marginRight: "10px" }}
            className={styles.button_edit}
            onClick={() => {
              showModalEditConfirm(record);
            }}
          >
            <EditOutlined />
          </button> */}

          <button
            className={styles.button_edit}
            onClick={() => showModalDeleteConfirm(record)}
          >
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  //* function phụ
  const sum = moneyFields.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  function convertToUTC0(indochinaTimeStr) {
    // Create a Date object with the provided Indochina Time
    const indochinaTime = new Date(indochinaTimeStr);

    // Get the day, month, and year components
    const day = indochinaTime.getDate();
    const month = indochinaTime.getMonth();
    const year = indochinaTime.getFullYear();

    // Create a new Date object with the same date components but set the time to midnight (UTC+0)
    const utc0Time = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    // Convert the date to ISO 8601 format and return it
    const isoString = utc0Time.toISOString();

    return isoString;
  }

  //*UseEffect phụ

  useEffect(() => {
    const getThietLapCom = async () => {
      try {
        let res = await axios.post(
          `${domain}/api/tinhluong/congty/take_thiet_lap_com`,
          {
            tl_id_com: cp,
            token: token,
            tl_id_rose: 2,
          }
        );
        if (res && res.data) {
          setMucDoanhThu(res.data.listThietLap);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getThietLapCom();
  }, []);

  const [ro_id_user, setIDUser] = useState(null);
  const [param, setParam] = useState({
    month: moment().month() + 1,
    year: moment().year(),
    ro_id_user: ro_id_user,
  });
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  //*UseEffect chính
  useEffect(() => {
    const takeHHCaNhan = async () => {
      setLoading(true);
      const start = moment(year + "/" + month + "/" + "01");
      const start_date = start.format("YYYY/MM/DD");
      const end_date = start.endOf("month").format("YYYY/MM/DD");
      axios
        .post(`${domain}/api/tinhluong/congty/take_hoa_hong_dt_ca_nhan`, {
          token: token,
          ro_id_com: cp,
          start_date: start_date,
          end_date: end_date,
        })
        .then((res) => {
          setApiData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(true);
          console.log(
            "err ở API tinhluong/congty/take_hoa_hong_dt_ca_nhan",
            err
          );
        });
    };

    takeHHCaNhan();
  }, [param, reload]);

  const onFinish = (values) => {
    if (month && year) {
      setParam({
        month: month,
        year: year,
        ro_id_user: ro_id_user,
      });
    }
  };

  const [listEmp, setListEmp] = useState([]);
  useEffect(() => {
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
  }, []);

  const handleOk = (value) => {    
    if (isInsert) {
      axios
        .post(`${domain}/api/tinhluong/congty/insert_rose_dt_ca_nhan`, {
          ro_id_user: selectedEmp,
          ro_id_com: Number(cp),
          ro_id_lr: 2,
          ro_time: convertToUTC0(`${roTime}`),
          ro_note: note,
          ro_price: sum,
          dt_money: JSON.stringify(moneyFields),
          dt_time: JSON.stringify(dateFieldsConverted),
          token: token,
          ro_id_tl: mucDoanhThuSelected,
        })
        .then((res) => {
          alert("Thêm mới thành công");
          setIsModalOpen(false);
          setReload(!reload);
        })
        .catch((err) => {
          console.log("Err ở API tinhluong/congty/insert_rose_dt_ca_nhan", err);

          alert("Thêm hoa hồng thất bại");
        });
      setIsInsert(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>
              Danh sách nhân viên hưởng hoa hồng doanh thu
            </h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhân viên được gán hoa hồng
            </p>
          </div>
          <div>
            <div className={styles.modal_body}>
              <button className={styles.btn_add} onClick={showModal}>
                Thêm mới
              </button>
            </div>
          </div>
        </div>
        <div className={styles.select_time}>
          <Select
            className={styles.selection}
            style={{ width: "300px" }}
            showSearch
            size="large"
            allowClear
            placeholder="Tìm theo nhân viên"
            onChange={(v) => setIDUser(v)}
            optionFilterProp="label"
            options={[{ label: "Tất cả nhân viên", value: "all" }, ...listEmp]}
          />
          <Form.Item name={"month"} className={styles.formItem}>
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
          </Form.Item>
          <Form.Item name={"year"} className={styles.formItem}>
            <Select
              className={styles.selection}
              showSearch
              onChange={(v) => setYear(v)}
              size="large"
              defaultValue={{
                label: `Năm ${selectedYear}`,
                value: selectedYear,
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={YearData}
            />
          </Form.Item>
          <Form.Item name={"year"} className={styles.formItem}>
            <Button size="large" type="primary" onClick={onFinish}>
              <p> Thống kê</p>
            </Button>
          </Form.Item>
        </div>
        <div className={styles.table_content}>
          <Table
            loading={loading}
            columns={columns}
            scroll={{
              x: "max-content",
            }}
            dataSource={apiData}
            className={`table_add ${styles.table_add}`}
            pagination={{ position: ["bottomCenter"] }}
          />
        </div>
      </div>

      <div className="modal_delete">
        <Modal
          className={`modal_delete ${styles.modal_delete}`}
          open={isModalDeteleOpen}
          onCancel={handleDeleteCancel}
          footer={null}
        >
          <div
            className={styles.modal_delete_body}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Bạn chắc chắn muốn xóa ?
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingBottom: "12px",
            }}
          >
            <Button
              type="primary"
              onClick={handleDeleteCancel}
              className={`btn_cancer ${styles.btn_cancer}`}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmDelete}
              className={`btn_delete ${styles.btn_delete}`}
            >
              <p> Xóa</p>
            </Button>
          </div>
        </Modal>
      </div>

      {isModalOpen && (
        <div className="modalRecipe">
          <Modal
            className={`modal_edit ${styles.modal_edit}`}
            open={isModalOpen}
            width={700}
            onCancel={handleModalCancer}
            footer={null}
            title={
              <p style={{ padding: "10px" }}>
                {isInsert
                  ? "Sửa hoa hồng doanh thu"
                  : "Thêm mới hoa hồng doanh thu"}
              </p>
            }
          >

            <div style={{ padding: "20px" }}>
             <div className={styles.format}>
               <div className={styles.flex_top}>
                 <div className={styles.flex_input}>
                   <label className={styles.p_edit}>Họ và tên</label>
                   <Select
                     showSearch
                     placeholder="Chọn nhân viên"
                     optionFilterProp="children"
                     onChange={(value) => setSelectedEmp(value)}
                     filterOption={(input, option) =>
                       (option?.label ?? "")
                         .toLowerCase()
                         .includes(input.toLowerCase())
                     }
                     options={listEmp}
                   />
                 </div>
                 <div className={styles.flex_input}>
                   <label className={styles.p_edit}>
                     Chu kỳ(tháng) áp dụng hoa hồng doanh thu
                   </label>
 
                   <DatePicker
                     picker="month" 
                     onChange={(date) => setRotime(date)}
                     format="MM/YYYY"
                     placeholder="Chọn tháng"
                   />
                 </div>
               </div>
 
               <form onSubmit={onFinish} style={{ padding: "10px 0px" }}>
                 {moneyFields.map((field, index) => (
                   <div key={index} style={{ marginBottom: "20px" }}>
                     <div className={styles.flex_top}>
                       <div className={styles.flex_input}>
                         <label
                           className={styles.p_edit}
                           style={{ fontSize: "16px" }}
                         >
                           Doanh thu theo thời điểm
                         </label>
                         <input
                           type="number"
                           className={styles.input_ant}
                           placeholder="Doanh thu"
                           value={moneyFields[index]}
                           onChange={(e) =>
                             handleMoneyChange(index, e.target.value)
                           }
                         />
                        
                       </div>
                       <div className={styles.flex_input_ant}>
                         <DatePicker
                           className={`${styles.times_month} customDatePicker`}
                           selected={dateFields[index]}
                          
                           value={
                             dateFields[index]
                               ? dayjs(dateFields[index])
                               : undefined
                           }
                           onChange={(date) => handleDateChange(index, date)}
                         />
                       </div>
                       {moneyFields.length > 1 && (
                         <button
                           type="button"
                           style={{
                             marginTop: "10px",
                           }}
                           onClick={() => handleRemoveField(index)}
                           className={styles.remove1}
                         >
                           <CloseOutlined />
                         </button>
                       )}
                     </div>
                     <div></div>
                   </div>
                 ))}
                 <button
                   type="button"
                   onClick={handleAddField}
                   className={styles.add}
                   style={{ marginTop: "10px" }}
                 >
                   <p> Thêm doanh thu</p>
                 </button>
               </form>
 
               <div className={styles.flex_top}>
                 <div className={styles.flex_input}>
                   <label className={styles.p_edit}>Tổng doanh thu *</label>
 
                   <Input value={sum} disabled />
                 </div>
                 <div className={styles.flex_input} style={{maxWidth:325}}>
                   <label className={styles.p_edit}>Mức doanh thu *</label>
                   <Select
                     className={styles.seclected}
                     placeholder=""
                     defaultValue="Chọn doanh thu"
                     optionFilterProp="children"
                     value={mucDoanhThuSelected}
                     onChange={(e) => setMucDoanhThuSelected(e)}
                     filterOption={(input, option) =>
                       (option?.label ?? "")
                         .toLowerCase()
                         .includes(input.toLowerCase())
                     }
                   >
                     {mucDoanhThu.map((item) => (
                       <Option value={item?.tl_id}>{item?.tl_name}</Option>
                     ))}
                   </Select>
                 </div>
               </div>
 
               <label className={styles.p_edit}>Ghi chú</label>
               <textarea
                 rows={3}
                 className={styles.textarea}
                 placeholder="Thêm ghi chú"
                 value={note}
                 onChange={(e) => {
                   setNote(e.target.value);
                 }}
               />
 
               <Button
                 className={`btn_recipe ${styles.btn_recipe}`}
                 type="primary"
                 onClick={handleOk}
               >
                 <p> Thêm hoa hồng</p>
               </Button>
             </div>
           </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Hoahongcanhan;
