import { Modal, Input, Select, Button, Form, List, Checkbox } from "antd";
import styles from "./modal-chinh-sua-hop-dong.module.css";
import Image from "next/image";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import { Tep } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import {
  MyDatePicker,
  MyInput,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import moment from "moment";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { MyInputFile } from "@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/component/ChiTiet";
const { TextArea } = Input;
export function ModalChinhSuaHopDong(
  open: boolean,
  setOpen: Function,
  data: any
) {
  const [ND, setND] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();
  useEffect(() => {
    form.setFieldsValue({
      ...data,
      con_time_up: dayjs(data?.con_time_up),
      con_time_end: dayjs(data?.con_time_end),
    });
  }, [data]);
  console.log(data);
  const onFinish = async (value) => {
    const res = await POST_TL("api/tinhluong/congty/edit_contract", {
      ...value,
      con_time_up: value?.con_time_up?.format("YYYY-MM-DD"),
      con_time_end: value?.con_time_end?.format("YYYY-MM-DD"),
      con_id: data?.con_id,
      con_id_user: data?.con_id_user,
    });

    if (res?.message === "success") {
      // router.replace(router.asPath)
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
        <div className={styles.textHead}>Chỉnh sửa hợp đồng nhân viên</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form onFinish={onFinish} form={form}>
          {MyInput(
            "Hợp đồng nhân viên",
            "Hợp đồng nhân viên",
            true,
            true,
            "con_name"
          )}
          {MyInput(
            "Phần trăm lương",
            "Phần trăm lương",
            true,
            true,
            "con_salary_persent",
            "number"
          )}
          {MyDatePicker(
            "Ngày hiệu lực",
            "Ngày hiệu lực",
            true,
            true,
            "con_time_up"
          )}
          {MyDatePicker(
            "Ngày hết hạn",
            "Ngày hết hạn",
            true,
            true,
            "con_time_end"
          )}
          {MyInputFile(
            "Tệp đính kèm",
            "Chọn tệp đính kèm (Tối đa 10MB)",
            false,
            true,
            "con_file",
            open
          )}
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
              <p className={styles.textluu}>Cập nhật</p>
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
