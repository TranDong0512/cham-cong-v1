import { Modal, Form, Input, Checkbox, Radio, Table, Button } from "antd";
import styles from "./chinh-sua-thuong-phat.module.css";
import Image from "next/image";
import { XoaThuongPhat } from "../xoa/xoa";
import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

export function ModalChinhSuaThuongPhat(
  open: boolean,
  setOpen: Function,
  rowSelectKey: any,
  setRowSelectKey: Function,
  seletedData: any
) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [xacNhanXoa, setXacNhanXoa] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const router = useRouter();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...rowSelectKey,
        pay_day: moment(rowSelectKey?.pay_day)?.format("YYYY-MM-DD"),
      });
    }
  }, [rowSelectKey, open]);

  const onFinish = async (value) => {
    const body = {
      ...value,
      pay_id: rowSelectKey?.pay_id,
      pay_month: moment(value?.pay_day)?.month() + 1,
      pay_year: moment(value?.pay_day)?.year(),
    };

    const res = await POST_TL("api/tinhluong/congty/edit_thuong_phat", body);

    if (res?.message === "success") {
      window.alert("Sửa thưởng phạt thành công");
      setOpen(false);
      router.reload();
    } else {
      window.alert("Sửa thưởng phạt lỗi");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        localStorage.removeItem("userSelect");
      }}
      width={1200}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thưởng phạt</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => {
            setOpen(false);
            localStorage.removeItem("userSelect");
          }}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} className={styles.bodyLeft} onFinish={onFinish}>
          <div>
            <Form.Item
              className={styles.formItem}
              name={"pay_price"}
              labelCol={{ span: 24 }}
              label={"Tiền thưởng phạt"}
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <Input type="number" size="large" suffix={<div>VNĐ</div>}></Input>
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name={"pay_status"}
              labelCol={{ span: 24 }}
            >
              <Radio.Group className={styles.radioGroup}>
                <Radio className={styles.radio} value={1}>
                  Tiền thưởng
                </Radio>
                <Radio className={styles.radio} value={2}>
                  Tiền phạt
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name={"pay_day"}
              labelCol={{ span: 24 }}
              label={"Ngày áp dụng"}
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <Input type="date" size="large"></Input>
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name={"pay_case"}
              labelCol={{ span: 24 }}
              label={"Lý do"}
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item className={styles.formButton}>
              <Button size="large" htmlType="submit">
                Cập nhật thưởng phạt
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className={styles.bodyRight}>
          {!_.isEmpty(seletedData?.tt_thuong?.ds_thuong) && (
            <Table
              className={`green-table-bodyBorder`}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={seletedData?.tt_thuong?.ds_thuong}
              columns={[
                {
                  title: <p style={{ color: "#fff" }}>Tiền thưởng</p>,
                  align: "center",
                  render: (record) => (
                    <p style={{ color: "#34B171" }}>
                      {record?.pay_price || 0} VNĐ
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
                  align: "center",
                  render: (record) => (
                    <p>
                      {record?.pay_day &&
                        moment(record?.pay_day)?.format("DD-MM-YYYY")}
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Lý do</p>,
                  align: "center",
                  render: (record) => <p>{record?.pay_case}</p>,
                },
                {
                  title: <p style={{ color: "#fff" }}>Điều chỉnh</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setRowSelectKey(record);
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setSelectedRow(record);
                          setXacNhanXoa(true);
                        }}
                      />
                    </div>
                  ),
                },
              ]}
              rowClassName={(record, index) =>
                rowSelectKey?.pay_id === record?.pay_id &&
                  rowSelectKey?.pay_status === 1
                  ? `${styles.select}`
                  : ``
              }
            ></Table>
          )}
          {!_.isEmpty(seletedData?.tt_phat?.ds_phat) && (
            <Table
              className={`green-table-bodyBorder ${styles.tableBottom}`}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={seletedData?.tt_phat?.ds_phat}
              columns={[
                {
                  title: <p style={{ color: "#fff" }}>Tiền phạt</p>,
                  align: "center",
                  render: (record) => (
                    <p style={{ color: "#FF5B4D" }}>
                      {record?.pay_price || 0} VNĐ
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
                  align: "center",
                  render: (record) => (
                    <p>
                      {record?.pay_day &&
                        moment(record?.pay_day)?.format("DD-MM-YYYY")}
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Lý do</p>,
                  align: "center",
                  render: (record) => <p>{record?.pay_case}</p>,
                },
                {
                  title: <p style={{ color: "#fff" }}>Điều chỉnh</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setRowSelectKey(record);
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setSelectedRow(record);
                          setXacNhanXoa(true);
                        }}
                      />
                    </div>
                  ),
                },
              ]}
              rowClassName={(record, index) =>
                rowSelectKey?.pay_id === record?.pay_id &&
                  rowSelectKey?.pay_status === "phat"
                  ? `${styles.select}`
                  : ``
              }
            ></Table>
          )}
        </div>
      </div>
      {XoaThuongPhat(xacNhanXoa, setXacNhanXoa, selectedRow)}
    </Modal>
  );
}
