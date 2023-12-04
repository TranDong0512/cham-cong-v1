import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  List,
  Checkbox,
  DatePicker,
  InputNumber,
} from "antd";
import styles from "./modal-them-moi-luong.module.css";
import Image from "next/image";
import { values } from "lodash";
import React, { useState } from "react";
import {
  Logo,
  IconSelect,
} from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import moment from "moment";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import dayjs from "dayjs";
const { TextArea } = Input;
const loai = [
  {
    value: 0,
    label: "Chọn",
  },
  {
    value: 1,
    label: "Tất cả",
  },
  {
    value: 2,
    label: "Theo giờ",
  },
  {
    value: 3,
    label: "Theo ngày công",
  },
];
export function ModalThemMoiLuong(
  open: boolean,
  setOpen: Function,
  key: any,
  info: any
) {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (val) => {
    const body = {
      // sb_salary_basic: val?.sb_salary_basic,
      // sb_lydo: val?.sb_lydo,
      // sb_quyetdinh: val?.sb_quyetdinh,
      ...val,
      sb_time_up: dayjs(val?.sb_time_up)?.format("YYYY-MM-DD"),
      sb_id_user: info?.info_dep_com?.user?.idQLC,
      sb_id_com: info?.info_dep_com?.user?.inForPerson?.employee?.com_id,
      sb_lydo: val?.sb_lydo || "",
      sb_quyetdinh: val?.sb_quyetdinh || "",
      sb_salary_bh: val?.sb_salary_bh || 0,
      sb_pc_bh: val?.sb_pc_bh || 0,
    };
    const res = await POST_TL("api/tinhluong/congty/insert_basic_salary", body);
    if (res.message == "success") {
      window.alert("Thêm lương thành công");
      router.reload();
    }
  };

  return (
    <Modal
      className="bannerQLC"
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm lương cơ bản</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <div>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Lương cơ bản"
              name={"sb_salary_basic"}
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              <InputNumber
                size="large"
                placeholder="Nhập lương"
                className={styles.inputname}
                controls={false}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                style={{ width: "100%" }}
                suffix="VNĐ"
              />
            </Form.Item>

            {/* <Form.Item
              label='Loại hình tính lương'
              name={'sb_type'}
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc',
                },
              ]}
              labelCol={{ span: 24 }}>
              <Select
                size='large'
                placeholder='Chọn'
                className={styles.inputname}
                options={loai}
                defaultValue={1}
                suffixIcon={<IconSelect />}
              />
            </Form.Item> */}

            <Form.Item
              labelCol={{ span: 24 }}
              label="Lương đóng bảo hiểm"
              name={"pc"}
              // rules={[
              //   {
              //     required: true,
              //     message: 'Trường này là bắt buộc',
              //   },
              // ]}
            >
              <InputNumber
                size="large"
                placeholder="Nhập lương đóng bảo hiểm"
                className={styles.inputname}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                style={{ width: "100%" }}
                suffix="VNĐ"
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Phụ cấp đóng bảo hiểm"
              name={"luong"}
              // rules={[
              //   {
              //     required: true,
              //     message: 'Trường này là bắt buộc',
              //   },
              // ]}
            >
              <InputNumber
                size="large"
                placeholder="Nhập lương"
                className={styles.inputname}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                style={{ width: "100%" }}
                suffix="VNĐ"
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Thời gian áp dụng"
              name={"sb_time_up"}
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              <DatePicker
                size="large"
                style={{ width: "100%" }}
                format={"DD-MM-YYYY"}
                placeholder="Chọn ngày"
                className={styles.inputname}
              />
            </Form.Item>
            <Form.Item label="Lý do" name={"sb_lydo"} labelCol={{ span: 24 }}>
              <TextArea
                style={{
                  resize: "none",
                  borderRadius: "5px",
                  border: "1px solid #9f9f9f",
                }}
                rows={5}
                placeholder="Nhập ghi chú (nếu có)"
              />
            </Form.Item>

            {/* <Form.Item
              label="Căn cứ quyết định"
              name={'sb_quyetdinh'}
              labelCol={{ span: 24 }}
            >
              <Select
                size="large"
                placeholder="Căn cứ quyết định"
                className={styles.inputname}
                options={loai}
                suffixIcon={<IconSelect />}
              />
            </Form.Item> */}

            {/* <Form.Item
              label='Căn cứ quyết định'
              name={'sb_quyetdinh'}
              labelCol={{ span: 24 }}>
              <Input
                // size="large"
                type='text'
                placeholder='Căn cứ quyết định (nếu có)'
                className={styles.inputname}
                // options={loai}
                // suffixIcon={<IconSelect />}
              />
            </Form.Item> */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button className={styles.huyb} onClick={() => setOpen(false)}>
                <p className={styles.texthuyb}>Huỷ bỏ</p>
              </button>
              <button className={styles.luu} type="submit">
                <p className={styles.textluu}>Thêm mới</p>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
