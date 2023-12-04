import React, { useState, useEffect } from "react";
import styles from "../hoahongcanhan.module.css";
import { DatePicker, Table, Select, Modal, Button, Form } from "antd";
import dayjs from "dayjs";
import {
  MonthData,
  YearData,
} from "../../../../components/tinh-luong/components/small-component/Month_and_Year";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { domain } from "./AddTable";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { POST_TL, getCompIdCS } from "../../../api/BaseApi";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

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
  const [form] = Form.useForm();
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const router = useRouter();

  //modalthêm mới
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editTime, setEditTime] = useState(null);
  const [editMoney, setEditMoney] = useState("");
  const [editNote, setEditNote] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const showModal = () => {
    setIsEdit(false);
    setIsModalOpen(true);
  };
  const handleModalCancer = () => {
    setEditName("");
    setEditTime("");
    setEditMoney("");
    setEditNote("");
    setIsModalOpen(false);
  };
  const [editingIndex, setEditingIndex] = useState(null);

  //chỉnh sửa
  const showModalEditConfirm = (key) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setEditingIndex(key?.ro_id);
    setEditName(key?.detail[0]?.userName);
    setEditTime(dayjs(key?.ro_time));
    setEditMoney(key?.ro_price);
    setEditNote(key?.ro_note);
  };
  const [reload, setReload] = useState(false);
  const handleOk = async () => {
    const com_id = getCompIdCS();
    if (isEdit) {
      if (editName == undefined || editName == '' || !editName) {
        window.alert("Chọn nhân viên");
        return;
      }
      if (editTime == undefined) {
        window.alert("Chọn thời gian áp dụng");
        return;
      }
      if (editMoney == undefined || editMoney == '' || !editMoney) {
        window.alert("Nhập số tiền");
        return;
      }
      else {
        const res = await POST_TL("api/tinhluong/congty/edit_rose_chung", {
        ro_id: editingIndex,
        ro_note: editNote || "",
        ro_price: editMoney,
        ro_time: editTime,
      });

      if (res?.message === "success") {
        window.alert("Sửa thành công");
        setIsModalOpen(false);
        setEditingIndex(null);
        setEditName("");
        setEditTime(null);
        setEditMoney("");
        setEditNote("");
        setReload(!reload);
      }
      }
    } else {
      if (editName == undefined || editName == '' || !editName) {
        window.alert("Chọn nhân viên");
        return;
      }
      if (editTime == undefined) {
        window.alert("Chọn thời gian áp dụng");
        return;
      }
      if (editMoney == undefined || editMoney == '' || !editMoney) {
        window.alert("Nhập số tiền");
        return;
      } else {
        const res = await POST_TL("api/tinhluong/congty/insert_rose", {
          ro_id_user: editName,
          ro_id_com: com_id,
          ro_id_lr: 1,
          ro_time: editTime,
          ro_note: editNote || "",
          ro_price: editMoney,
        });

        if (res?.message === "success") {
          window.alert("Thêm mới thành công");
          setIsModalOpen(false);
          setEditingIndex(null);
          setEditName("");
          setEditTime(null);
          setEditMoney("");
          setEditNote("");
          setReload(!reload);
        }
      }
    }
  };

  // xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const showModalDeleteConfirm = (key) => {
    setSelectedTableIndex(key?.ro_id);
    setIsModalDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTableIndex !== null) {
      const res = await POST_TL("api/tinhluong/congty/delete_rose", {
        ro_id: selectedTableIndex,
      });

      if (res?.message === "success") {
        window.alert("Xóa thành công");
        setSelectedTableIndex(null);
        setIsModalDeleteOpen(false);
        setReload(!reload);
      } else {
        window.alert("Xóa thất bại");
      }
    }
  };
  const [ro_id_user, setIDUser] = useState(null)
  const [listEmp, setListEmp] = useState([]);
  const [param, setParam] = useState({
    month: moment().month() + 1,
    year: moment().year(),
    ro_id_user: ro_id_user
  });
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());
  const [loading, setLoading] = useState(false);

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

      if (res?.data) {
        setApiData(res?.rose_user);
      }
      setLoading(false);
    };
    getListRose();
  }, [reload, param]);

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
  const columns = [
    {
      title: "Họ và tên",
      render: (record) => (
        <div>
          <p className={styles.p_name}>{record?.detail?.[0]?.userName}</p>
          <p className={styles.p_id}>ID: {record?.detail?.[0]?.idQLC}</p>
        </div>
      ),
    },
    {
      title: "Thời gian",
      render: (record) => (
        <div>
          <p className={styles.p_time}>
            {new Date(`${record?.ro_time}`).toLocaleDateString("en-GB")}
          </p>
        </div>
      ),
    },
    {
      title: "Số tiền",
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.ro_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
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
      title: "Hành động",
      render: (record) => (
        <>
          <button
            className={styles.button_edit}
            onClick={() => showModalEditConfirm(record)}
            style={{ marginRight: "20px" }}
          >
            <EditOutlined />
          </button>
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

  const onFinish = () => {
    if (month && year) {
      setParam({
        month: month,
        year: year,
        ro_id_user: ro_id_user
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>Danh sách nhân viên & hoa hồng</h3>
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
              defaultValue={{ label: `Năm ${selectedYear}`, value: selectedYear }}
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
              x: 1000,
            }}
            dataSource={apiData}
            className="CustomerTable"
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
      <div className="modalRecipe">
        <Modal
          className={`modal_edit ${styles.modal_edit}`}
          title={
            <p style={{ padding: "10px" }}>
              {isEdit ? "Sửa hoa hồng tiền" : "Thêm mới hoa hồng tiền"}
            </p>
          }
          open={isModalOpen}
          onCancel={handleModalCancer}
          footer={null}
        >
          <div className={styles.modalRecipe_body} style={{ padding: "10px" }}>
            <div className={styles.format}>
              {!isEdit ? (
                <>
                  <label className={styles.p_edit}>
                    Họ và tên<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    className={styles.seclected}
                    placeholder="Chọn nhân viên"
                    showSearch
                    size="large"
                    value={editName}
                    optionFilterProp="children"
                    onChange={(value) => setEditName(value)}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={listEmp}
                  />
                </>
              ) : (
                <>
                  <label className={styles.p_edit}>
                    Họ và tên <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    className={styles.seclected}
                    placeholder="Chọn nhân viên"
                    showSearch
                    size="large"
                    disabled
                    optionFilterProp="children"
                    value={editName}
                    onChange={(value) => setEditName(value)}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={listEmp}
                  />
                </>
              )}

              <label className={styles.p_edit}>
                Thời gian áp dụng <span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                format={dateFormat}
                className={styles.times_month}
                value={editTime}
                onChange={(date) => setEditTime(date)}
              />

              <label className={styles.p_edit}>
                Nhập số tiền <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className={styles.input}
                placeholder="Nhập số tiền"
                value={editMoney}
                onChange={(e) => setEditMoney(e.target.value)}
              />

              <label className={styles.p_edit}>Ghi chú</label>
              <textarea
                rows={3}
                className={styles.textarea}
                placeholder="Thêm ghi chú"
                value={editNote}
                onChange={(e) => {
                  setEditNote(e.target.value);
                }}
              />

              {!isEdit ? (
                <Button
                  className={`btn_recipe ${styles.btn_recipe}`}
                  type="primary"
                  onClick={handleOk}
                >
                  <p> Thêm hoa hồng</p>
                </Button>
              ) : (
                <Button
                  className={`btn_recipe ${styles.btn_recipe}`}
                  type="primary"
                  onClick={handleOk}
                >
                  <p> Sửa hoa hồng</p>
                </Button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
  
};

export default Hoahongcanhan;
