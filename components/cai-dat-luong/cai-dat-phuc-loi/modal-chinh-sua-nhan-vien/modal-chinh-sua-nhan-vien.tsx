import { Row, Col, Modal, Input, Button, Form, Select } from "antd";
const { Option } = Select;
import styles from "./modal-chinh-sua-nhan-vien.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import moment from "moment";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

export function ModalChinhSuaNhanVien({
  openFilterSettingClick,
  setOpenFilterSettingClick,
  key,
}: {
  openFilterSettingClick: boolean;
  setOpenFilterSettingClick: any;
  key: any;
}) {
  const [form] = Form.useForm();
  const Save = () => {
    setOpenFilterSettingClick(false);
  };

  console.log("key", moment(key?.cl_day_end).year());
  const router = useRouter();
  useEffect(() => {
    form.setFieldsValue({
      ...key,
      cl_day_end: `${
        moment(key?.cl_day_end).year() == 1970
          ? "---"
          : `${moment(key?.cl_day).year()}-${(
              moment(key?.cl_day).month() + 1
            ).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}`
      }`,
    });
  }, [key]);
  const handleSubmit = async () => {
    const isFieldsFilled1 = form.getFieldValue("cls_day");
    const isFieldsFilled2 = form.getFieldValue("cls_day_end");
    const res = await POST_TL("api/tinhluong/congty/edit_nv_nhom", {
      cls_day:
        moment(isFieldsFilled1).format("YYYY-MM-DD") + "T00:00:00.000+00:00",
      cls_day_end: isFieldsFilled2
        ? moment(isFieldsFilled2).format("YYYY-MM-DD") + "T00:00:00.000+00:00"
        : "",
      cls_id_user: key?.cls_id_user,
      cls_id_cl: key?.cls_id_cl,
      cls_id_com: key?.cls_id_com,
    });
    if (res?.message === "success") {
      window.alert("Sửa phúc lợi nhân viên thành công");
      setOpenFilterSettingClick(false);
      router.reload();
    } else {
      window.alert("Lỗi sửa phúc lợi nhân viên");
    }
  };

  return (
    <Modal
      open={openFilterSettingClick}
      closable={false}
      width={700}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      className={`modal_chinh_sua_nhan_vien_phuc_loi`}
    >
      <div className={styles.header}>
        <div className={styles.textHead}>Chỉnh sửa nhân viên phúc lợi</div>
        <div className={styles.crossImage}>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => setOpenFilterSettingClick(false)}
          />
        </div>
      </div>

      <div className={styles.body}>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <div
            className={styles.bodyItem}
            style={{ borderBottom: "1px dashed rgba(0, 0, 0, 0.3)" }}
          >
            <Row>
              <Col>
                <Image
                  src={
                    key?.avatarUser ? `/${key?.avatarUser}` : "/anhnhanvien.png"
                  }
                  alt=""
                  height={50}
                  width={50}
                  style={{ margin: "10px 10px 10px 10px" }}
                />
              </Col>
              <Col
                style={{
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ color: "#4C5BD4", fontSize: "16px" }}>
                  {key?.userName}
                </div>
                <div style={{ fontSize: "16px" }}>ID: {key?.idQLC} </div>
              </Col>
            </Row>
          </div>
          <Form.Item
            rules={[{ required: true, message: "Bắt buộc điền ngày áp dụng!" }]}
            name="cls_day"
          >
            <div className={styles.bodyItem}>
              <span style={{ fontSize: "16px" }}>
                Áp dụng từ ngày <span style={{ color: "red" }}>*</span>
              </span>
              <Input
                required
                type="month"
                style={{ width: "100%", fontSize: "16px" }}
                placeholder="Chọn tháng"
                defaultValue={moment(key?.cls_day).format("YYYY-MM")}
              ></Input>
            </div>
          </Form.Item>

          <Form.Item name="cls_day_end">
            <div className={styles.bodyItem}>
              <span style={{ fontSize: "16px" }}>
                Đến ngày (Không bắt buộc)
              </span>
              <Input
                type="month"
                style={{ width: "100%", fontSize: "16px" }}
                placeholder="Chọn tháng"
                defaultValue={moment(key?.cls_day_end).format("YYYY-MM")}
              ></Input>
            </div>
          </Form.Item>

          <Form.Item>
            <div className={styles.hasButton}>
              <Button className={styles.ButtonWhite} onClick={Save}>
                <p style={{ color: "#4C5BD4", fontSize: "18px" }}>Hủy</p>
              </Button>
              <Button
                className={styles.Button}
                htmlType="submit"
                onClick={handleSubmit}
              >
                <p className={styles.txt}>Cập nhật</p>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
