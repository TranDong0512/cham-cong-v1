import { Modal, Input, Select, Button, Form, List, Checkbox } from "antd";
import styles from "./modal-them-phu-cap.module.css";
import Image from "next/image";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import { IconSelect } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
const { TextArea } = Input;
const loai = [
  {
    value: 0,
    label: "Thu nhập chịu thuế",
  },
  {
    value: 1,
    label: "Thu nhập miễn thuế",
  },
];
export function ModalThemPhuCap(
  open: boolean,
  setOpen: Function,
  dsPhuCap: any,
  setDsPhuCap: any
) {
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])
  const onFinish = (value: any) => {
    const com_id = getCompIdCS();
    let finalValue = {
      ...value,
      cl_type: 4,
      cl_active: 1,
      cl_com: com_id,
    };
    POST_TL("api/tinhluong/congty/insert_phuc_loi", finalValue).then((res) => {
      if (res?.data) {
        POST_TL("api/tinhluong/congty/take_phuc_loi", {
          companyId: com_id,
        }).then((res) => {
          if (res?.data) {
            setDsPhuCap(res?.data?.list_welfa);
            setOpen(false);
          }
        });
      }
    });
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={710}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm mới phụ cấp</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <p>Tên phụ cấp</p>
              <p style={{ color: "red", marginLeft: "5px" }}>*</p>
            </div>
            <Form.Item
              name="cl_name"
              rules={[{ required: true, message: "Nhập tên phụ cấp" }]}
            >
              <Input
                placeholder="Nhập tên phụ cấp"
                className={styles.inputname}
              />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <p>Tiền phụ cấp</p>
              <p style={{ color: "red", marginLeft: "5px" }}>*</p>
            </div>
            <Form.Item
              name="cl_salary"
              rules={[{ required: true, message: "Nhập tiền phụ cấp" }]}
            >
              <Input
                placeholder="Nhập số tiền phụ cấp"
                className={styles.inputname}
                suffix="VNĐ"
              />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <p>Chọn loại</p>
              <p style={{ color: "red", marginLeft: "5px" }}>*</p>
            </div>
            <Form.Item
              name="cl_type_tax"
              rules={[{ required: true, message: "Chọn loại phụ cấp" }]}
            >
              <Select
                placeholder={"Chọn loại thu nhập"}
                options={loai}
                style={{ width: "100%" }}
                size="large"
                suffixIcon={<IconSelect />}
              />
            </Form.Item>
          </div>
          <div className={styles.date}>
            <div className={styles.date1}>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <p>Áp dụng từ ngày</p>
                <p style={{ color: "red", marginLeft: "5px" }}>*</p>
              </div>
              <Form.Item
                name="cl_day"
                rules={[{ required: true, message: "Chọn ngày áp dụng" }]}
              >
                <Input type="date" className={styles.inputname} />
              </Form.Item>
            </div>
            <div className={styles.date2}>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <p>Đến ngày (Không bắt buộc)</p>
              </div>
              <Form.Item name="cl_day_end">
                <Input type="date" className={styles.inputname} />
              </Form.Item>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <p>Ghi chú</p>
            </div>
            <Form.Item name="cl_note">
              <TextArea
                style={{ resize: "none" }}
                rows={5}
                placeholder="Nhập ghi chú nếu có"
              />
            </Form.Item>
          </div>
          <div className={styles.khungbutton}>
            <Button className={styles.huyb}>
              <p className={styles.texthuyb}>Huỷ bỏ</p>
            </Button>
            <Form.Item>
              <Button className={styles.luu} htmlType="submit">
                <p className={styles.textluu}>Thêm mới</p>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
