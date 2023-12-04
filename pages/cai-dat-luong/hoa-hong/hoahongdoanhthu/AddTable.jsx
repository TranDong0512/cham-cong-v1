import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Card, Form, Input, InputNumber } from "antd";
import styles from "../index.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { POST_TL } from "../../../api/BaseApi";

export const domain = process.env.NEXT_PUBLIC_API;

const Revenue = () => {
  const token = Cookies.get("token_base365");
  const cp = jwtDecode(Cookies.get("token_base365"))?.data?.com_id || 0;
 
  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false);
  const showModalEmployeeConfirm = () => {
    setIsModalEmployeeOpen(true);
  };
  const hanleModalEmployeeCancer = () => {
    setIsModalEmployeeOpen(false);
  };
  const router = useRouter();
  const [isInsert, setIsInsert] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [form] = Form.useForm();
  const showModalInsert = () => {
    setIsInsert(true);
    setIsModalEditOpen(true);
  };
  const handleModalEditCancer = () => {
    setIsModalEditOpen(false);
    setItemSelect(null);
    form.setFieldValue();
  };

  //chỉnh sửa
  const [itemSelect, setItemSelect] = useState(null);
  const showModalEditConfirm = (record) => {
    setIsModalEditOpen(true);
    setItemSelect(record);
  };

  const handleOk = async (value) => {
    if (isInsert) {
      axios
        .post(`${domain}/api/tinhluong/congty/them_thiet_lap`, {
          tl_id_com: Number(cp),
          tl_id_rose: 2,
          tl_money_max: value.tl_money_max,
          tl_money_min: value.tl_money_min,
          tl_phan_tram: value.tl_phan_tram,
          tl_name: value.tl_name,
          tl_chiphi: 0,
          tl_hoahong: 0,
          tl_kpi_yes: 0,
          tl_kpi_no: 0,
          token: token,
        })
        .then((res) => {
          alert("Thêm mới thành công");
          setIsModalEditOpen(false);
          setReload(!reload);
        })
        .catch((err) => {
          alert("Thêm mới thất bại");
          console.log("Error ở API api/tinhluong/congty/them_thiet_lap", err);
        });
    } else {
      const res = await POST_TL(
        "api/tinhluong/congty/capnhat_thiet_lap_minmaxphantram",
        {
          tl_id: itemSelect?.tl_id,
          tl_money_max: value.tl_money_max,
          tl_money_min: value.tl_money_min,
          tl_phan_tram: value.tl_phan_tram,
          tl_name: value.tl_name,
        }
      );

      if (res?.message === "success") {
        alert("Sửa thành công");
        setIsModalEditOpen(false);
        setReload(!reload);
      } else {
        alert("Sửa thất bại");
      }
    }
  };

  // ...

  // xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const showModalDeleteConfirm = (key) => {
    setSelectedTableIndex(key);
    setIsModalDeleteOpen(true);
  };

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <p className={styles.employee_p}>Cài đặt hoa hồng doanh thu</p>
          </div>
          <div>
            <Button
              type="primary"
              className={styles.btn_employee}
              onClick={showModalInsert}
            >
              <p>Thêm mới</p>
            </Button>
          </div>
        </div>
      </>
    );
  };

  const columnsEmployee = [
    {
      title: "STT",
      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.stt}</p>
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.tl_name}</p>
        </div>
      ),
    },
    {
      title: "Doanh thu",
      render: (_, record) => (
        <div>
          <p className={styles.p_style}>
            {record?.tl_money_min > 0 ? (
              <span>
                {record?.tl_money_min
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </span>
            ) : (
              0
            )}
            -{" "}
            {record?.tl_money_max > 0 ? (
              <span>
                {record?.tl_money_max
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </span>
            ) : (
              0
            )}
            VND
          </p>
        </div>
      ),
    },
    {
      title: "Hoa Hồng (%)",
      align: "center",
      render: (record) => (
        <div>
          <p className={styles.p_style}>
            {record?.tl_phan_tram?.$numberDecimal}
          </p>
        </div>
      ),
    },
    {
      title: "",
      render: (record) => (
        <button
          className={styles.button_edit}
          onClick={() => showModalEditConfirm(record)}
        >
          <EditOutlined />
        </button>
      ),
    },
    {
      title: "",
      // dataIndex: 'delete',

      render: (record) => (
        <button
          className={styles.button_edit}
          onClick={() => showModalDeleteConfirm(record)}
        >
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  useEffect(() => {
    const getThietLapCom = async () => {
      axios
        .post(`${domain}/api/tinhluong/congty/take_thiet_lap_com`, {
          token: token,
          tl_id_com: cp,
        })
        .then((res) => {
          let mapData = res.data.listThietLap;
          const filteredData = mapData.filter((obj) => obj?.tl_id_rose === 2);
          const filteredDataWithStt = filteredData.map((obj, index) => {
            obj.stt = index + 1;
            return obj;
          });

          setApiData(filteredDataWithStt);
        })
        .catch((err) => {
          console.log(
            "Error ở API api/tinhluong/congty/take_thiet_lap_com",
            err
          );
        });
    };

    getThietLapCom();
  }, [reload]);

  const handleConfirmDelete = async () => {
    const res = await POST_TL("api/tinhluong/congty/delete_thiet_lap", {
      tl_id: selectedTableIndex?.tl_id,
    });

    if (res?.message === "success") {
      window.alert("Xóa thành công");
      setReload(!reload);
      setIsModalDeleteOpen(false);
    } else {
      window.alert("Xóa thất bại");
    }
  };

  return (
    <>
      <Card
        key=""
        title="Hoa hồng doanh thu"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <div>
          <div>
            <p className={styles.write}>
              <EditOutlined style={{ color: "#000" }} />
              Miêu tả
            </p>
            <p className={styles.p_card}>
              Hoa hồng doanh thu được tính là một tỷ lệ phần trăm nhất định
              trong tổng doanh thu do nhân viên bán hàng tạo ra.
            </p>
          </div>
          <div className={styles.button_flex}>
            <button
              className={styles.button_top}
              onClick={showModalEmployeeConfirm}
            >
              <SettingOutlined style={{ color: "#fff" }} />
            </button>
            <button
              className={styles.button_bottom}
              onClick={() =>
                router.push("/cai-dat-luong/hoa-hong/hoahongdoanhthu")
              }
            >
              Thêm
            </button>
          </div>
        </div>
      </Card>

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
              style={{backgroundColor:'transparent'}}
              onClick={handleDeleteCancel}
              className={`btn_cancer ${styles.btn_cancer} `}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className={`btn_delete ${styles.btn_delete}`}
            >
              <p> Xóa</p>
            </Button>
          </div>
        </Modal>
      </div>

      {isModalEditOpen && (
        <div className="modalRecipe">
          <Modal
            width={800}
            className={`modal_recipe ${styles.modal_recipe}`}
            open={isModalEditOpen}
            onCancel={handleModalEditCancer}
            footer={null}
          >
            <div
              className={styles.modalRecipe_body}
              style={{ padding: "20px" }}
            >
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                Chỉnh sửa hoa hồng doanh thu
              </p>
              <Form
                onFinish={handleOk}
                form={form}
                initialValues={{
                  ...itemSelect,
                  tl_phan_tram: itemSelect?.tl_phan_tram.$numberDecimal,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 500 }}>
                  Tên sản phẩm<span style={{ color: "red" }}>*</span>
                </div>

                <Form.Item
                  labelCol={{ span: 24 }}
                  name="tl_name"
                  rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
                >
                  <Input placeholder="Nhập tên sản phẩm" size="large"></Input>
                </Form.Item>
                <div style={{ fontSize: 16, fontWeight: 500 }}>
                  Doanh thu nhỏ nhất<span style={{ color: "red" }}>*</span>
                </div>

                <Form.Item
                  labelCol={{ span: 24 }}
                  name="tl_money_min"
                  rules={[
                    { required: true, message: "Nhập doanh thu nhỏ nhất!" },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Nhập doanh thu nhỏ nhất"
                    size="large"
                  ></InputNumber>
                </Form.Item>
                <div style={{ fontSize: 16, fontWeight: 500 }}>
                  Doanh thu cao nhất<span style={{ color: "red" }}>*</span>
                </div>

                <Form.Item
                  labelCol={{ span: 24 }}
                  name="tl_money_max"
                  rules={[
                    { required: true, message: "Nhập doanh thu cao nhất!" },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Nhập doanh thu cao nhất"
                    size="large"
                  ></InputNumber>
                </Form.Item>
                <div style={{ fontSize: 16, fontWeight: 500 }}>
                  Hoa hồng nhận được<span style={{ color: "red" }}>*</span>
                </div>

                <Form.Item labelCol={{ span: 24 }} name="tl_phan_tram">
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Nhập hoa hồng nhận được"
                    size="large"
                  ></InputNumber>
                </Form.Item>

                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    className={`btn_recipe ${styles.btn_recipe}`}
                    type="primary"
                    htmlType="submit"
                  >
                    <p> Lưu</p>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
      )}

      <div className="modal_employee">
        <Modal
          width={1200}
          className={`modal_employee ${styles.modal_employee}`}
          open={isModalEmployeeOpen}
          onCancel={hanleModalEmployeeCancer}
          footer={null}
        >
          <div className={styles.modal_add_body} style={{ padding: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <Title />
            </div>

            <div>
              <Table
                scroll={{
                  x: 1000,
                }}
                className={`table_add ${styles.table_add}`}
                columns={columnsEmployee}
                dataSource={apiData}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Revenue;
