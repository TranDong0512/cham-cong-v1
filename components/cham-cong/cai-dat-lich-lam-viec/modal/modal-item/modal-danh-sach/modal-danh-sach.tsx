import { Modal, Table, Row, Col, Card, Input, Select } from "antd";
import styles from "./modal-danh-sach.module.css";
import type { ColumnsType } from "antd/es/table";
import { XoaLich } from "../modal-xoa/modal-xoa";
import { useEffect, useState } from "react";
import { POST } from "@/pages/api/BaseApi";
import moment from "moment";
interface DataType {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  room: string;
  phone: string;
  email: string;
}

export function DanhSach(
  open: boolean,
  setOpen: Function,
  cySelected: any,
  listEmpInCy: any,
  setDataTotal: Function
) {
  const [xacNhan, setXacNhan] = useState(false);
  const [data, setData]: any = useState(listEmpInCy);
  const [selectedRow, setSelectedRow]: any = useState({});
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    setData(listEmpInCy);
  }, [listEmpInCy, open]);

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <p style={{ fontSize: "18px", textAlign: "center", color: "#fff" }}>
          Ảnh
        </p>
      ),
      dataIndex: "url",
      align: "center",
      width: "70px",
      render: (record) => (
        <img src={record} style={{ height: "46px", width: "46px" }} />
      ),
    },
    {
      title: (
        <p style={{ fontSize: "18px", textAlign: "center", color: "#fff" }}>
          Họ và tên
        </p>
      ),
      align: "left",
      render: (record) => (
        <div style={{ marginLeft: "10px" }}>
          <div style={{ color: "#4C5BD4", fontSize: "18px" }}>
            {record?.name}
          </div>
          <p>{record?.key}</p>
        </div>
      ),
    },
    {
      title: <p style={{ fontSize: "18px", color: "#fff" }}>Phòng ban</p>,
      align: "center",
      render: (record: any) => <p>{record.room}</p>,
    },
    {
      title: <p style={{ fontSize: "18px", color: "#fff" }}>Số điện thoại</p>,
      render: (record: any) => <p>{record.phone}</p>,
      align: "center",
    },
    {
      title: <p style={{ fontSize: "18px", color: "#fff" }}>Email</p>,
      render: (record: any) => <p>{record.email}</p>,
      align: "center",
    },
    {
      title: "",
      dataIndex: "delete",
      align: "center",
      width: "100px",
      render: (_, record: { key: React.Key }) => (
        <img
          src="/delete-icon.png"
          onClick={() => {
            setSelectedRow(record);
            setXacNhan(true);
          }}
        />
      ),
    },
  ];
  return (
    <Modal
      open={open}
      onCancel={() => {
        setSearchName("");
        setOpen(false);
      }}
      width={1000}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      style={{ color: "#474747" }}
    >
      <div className={styles.body}>
        <div className={styles.header} style={{ fontSize: "22px" }}>
          Lịch làm việc tháng {moment().month() + 1}
        </div>
        <div
          className={styles.headerTxt}
          style={{ marginTop: "5px", marginBottom: "20px" }}
        >
          Danh sách nhân viên
        </div>
        <div
          style={{ borderBottom: "1px solid #9F9F9F", marginBottom: "20px" }}
        >
          <Row>
            <Col
              lg={5}
              md={5}
              sm={4}
              xs={10}
              style={{
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid #4C5BD4",
              }}
            >
              <p className={styles.headerTxt} style={{ color: "#4c5bd4" }}>
                Nhân viên ({data?.length})
              </p>
            </Col>
          </Row>
        </div>
        <Row gutter={[20, 20]} style={{ marginBottom: "20px" }}>
          <Col span={12}>
            <Input
              value={searchName}
              size="large"
              style={{ width: "100%" }}
              placeholder="Nhập tên cần tìm"
              onChange={(e) => {
                setSearchName(e.target.value);
                setData(
                  e
                    ? listEmpInCy?.filter((item) =>
                        item?.name
                          ?.toLowerCase()
                          ?.includes(e?.target?.value?.toLowerCase())
                      )
                    : listEmpInCy
                );
              }}
            />
          </Col>
          {/* <Col span={12}>
            <Select
              size='large'
              style={{ width: '100%' }}
              placeholder='Tìm kiếm theo Phòng ban'
            />
          </Col> */}
        </Row>
        <div>
          <Table
            scroll={{ x: "900px" }}
            className={`table_lich_lam_viec`}
            rowKey={(record, index) => index}
            columns={columns}
            dataSource={data}
            sticky={true}
            pagination={{ position: ["bottomCenter"], pageSize: 20 }}
          ></Table>
        </div>
      </div>
      {XoaLich(
        xacNhan,
        setXacNhan,
        "Bạn chắc chắn muốn xóa nhân viên này khỏi lịch làm việc không ?",
        cySelected,
        selectedRow,
        data,
        setData,
        setDataTotal
      )}
    </Modal>
  );
}
