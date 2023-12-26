import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  Form,
  Select,
  Skeleton,
} from "antd";
import styles from "./modal-chinh-sua-phuc-loi.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import moment from "moment";

export function ModalChinhSuaPhucLoi(
  openFilterSettingWelfareClick: boolean,
  setOpenFilterSettingWelfareClick: any,
  data: any
) {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (openFilterSettingWelfareClick) {
      form.setFieldsValue({
        ...data,
        cl_day: `${moment(data?.cl_day).year()}-${(
          moment(data?.cl_day).month() + 1
        ).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`,
        cl_day_end: `${moment(data?.cl_day_end).year()}-${(
          moment(data?.cl_day_end).month() + 1
        ).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`,
        cl_note: data?.cl_note != "undefined" ? data?.cl_note : "",
      });
    }
  }, [data, openFilterSettingWelfareClick]);
  const Save = () => {
    setOpenFilterSettingWelfareClick(false);
  };
  const onFinish = (value) => {
    let finalValue = {
      ...value,
      cl_id: data.cl_id,
      cl_salary: parseInt(value?.cl_salary),
      cl_type: 3,
      cl_active: 1,
    };
    POST_TL("api/tinhluong/congty/sua_phuc_loi", finalValue).then((res) => {
      if (res?.data) {
        router.replace(router.asPath);
        setOpenFilterSettingWelfareClick(false);
      }
    });
  };
  const typeOfWelfareOptions = [
    { value: 0, label: "Thu nhập chịu thuế" },
    { value: 1, label: "Thu nhập miễn thuế" },
  ];
  return (
    <Modal
      open={openFilterSettingWelfareClick}
      closable={false}
      width={700}
      onCancel={() => {setOpenFilterSettingWelfareClick(false)}}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      className={`modal_chinh_sua_nhan_vien_phuc_loi`}
    >
      <div className={styles.header}>
        <div className={styles.textHead}>Chỉnh sửa phúc lợi</div>
        <div className={styles.crossImage}>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => setOpenFilterSettingWelfareClick(false)}
          />
        </div>
      </div>

      <div className={styles.body}>
        <Form form={form} onFinish={onFinish}>
          <div className={styles.bodyItem}>
            <span style={{ fontSize: "16px" }}>
              Tên phúc lợi<span style={{ color: "red" }}>*</span>
            </span>
            <Form.Item
              rules={[
                { required: true, message: "Bắt buộc điền tên phúc lợi!" },
              ]}
              name="cl_name"
            >
              <Input
                required
                type="text"
                style={{ width: "100%", fontSize: "16px" }}
                placeholder="Nhập tên phúc lợi"
              ></Input>
            </Form.Item>
          </div>
          <div className={styles.bodyItem}>
            <span style={{ fontSize: "16px" }}>
              Tiền phúc lợi<span style={{ color: "red" }}>*</span>
            </span>
            <Form.Item
              rules={[
                { required: true, message: "Bắt buộc điền tiền phúc lợi!" },
              ]}
              name="cl_salary"
            >
              <Input
                required
                type="text"
                style={{ width: "100%", fontSize: "16px" }}
                placeholder="Nhập số tiền phúc lợi"
              ></Input>
            </Form.Item>
          </div>

          <div className={styles.bodyItem}>
            <div style={{ fontSize: "16px" }}>
              Chọn loại <span style={{ color: "red" }}>*</span>
            </div>
            <Form.Item
              name="cl_type_tax"
              label=""
              rules={[{ required: true, message: "Bắt buộc điền loại thuế!" }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Chọn loại bảo hiểm"
                className={styles.selectYeah}
                options={typeOfWelfareOptions}
                suffixIcon={
                  <Image
                    src="/suffixIcon_1.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                }
              />
            </Form.Item>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.bodyItem}>
              <span style={{ fontSize: "16px" }}>
                Áp dụng từ ngày <span style={{ color: "red" }}>*</span>
              </span>
              <Form.Item
                rules={[
                  { required: true, message: "Bắt buộc điền ngày áp dụng!" },
                ]}
                name="cl_day"
              >
                <Input
                  required
                  type="month"
                  style={{ width: "100%", fontSize: "16px" }}
                  placeholder="Chọn tháng"
                ></Input>
              </Form.Item>
            </div>
            <div className={styles.bodyItem}>
              <span style={{ fontSize: "16px" }}>
                Đến ngày (Không bắt buộc)
              </span>
              <Form.Item name="cl_day_end">
                <Input
                  type="month"
                  style={{ width: "100%", fontSize: "16px" }}
                  placeholder="Chọn tháng"
                ></Input>
              </Form.Item>
            </div>
          </div>
          <div className={styles.bodyItem}>
            <span style={{ fontSize: "16px" }}>Ghi chú</span>
            <Form.Item name="cl_note">
              <Input.TextArea
                style={{ width: "100%", fontSize: "16px", minHeight: "104px" }}
                placeholder="Nhập ghi chú nếu có"
              ></Input.TextArea>
            </Form.Item>
          </div>
          <Form.Item>
            <div className={styles.hasButton}>
              <Button className={styles.ButtonWhite} onClick={Save}>
                <p style={{ color: "#4C5BD4", fontSize: "18px" }}>Hủy bỏ</p>
              </Button>
              <Button className={styles.Button} htmlType="submit">
                <p className={styles.txt}>Cập nhật</p>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
