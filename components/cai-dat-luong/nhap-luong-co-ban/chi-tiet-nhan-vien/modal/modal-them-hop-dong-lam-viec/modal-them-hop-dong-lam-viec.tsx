import { Modal, Input, Select, Button, Form, List, Checkbox } from "antd";
import styles from "./modal-them-hop-dong-lam-viec.module.css";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Tep } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import {
  MyDatePicker,
  MyInput,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import { POST_TL } from "@/pages/api/BaseApi";
import moment from "moment";
import { useRouter } from "next/router";
import { MyInputFile } from "@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/component/ChiTiet";
const { TextArea } = Input;
export function ModalThemHopDong(open: boolean, setOpen: Function, data: any) {
  const [ND, setND] = useState("");
  const [form] = Form.useForm();
  const inputFileRef = useRef<any>(null);
  const [listFileNames, setListFileNames] = useState<any[]>([]);
  const router = useRouter();

  const onFileChange = (value) => {
    const formData = new FormData();
    const data = value.target.files[0];

    setListFileNames([...listFileNames, data?.name]);
    formData.append("inputname", data);
  };

  const onFinish = async (value) => {
    console.log("value", value);
    const res = await POST_TL("api/tinhluong/congty/insert_contract", {
      ...value,
      con_time_up: value?.con_time_up?.format("YYYY-MM-DD"),
      con_time_end: value?.con_time_end?.format("YYYY-MM-DD"),
      con_id_user: router.query.id,
      con_file: value?.con_file || "",
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
      onCancel={() => {
        form.resetFields()
        setOpen(false)
      }}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm hợp đồng nhân viên</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => {
            form.resetFields()
            setOpen(false)
          }}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish}>
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
          <input
            type="file"
            onChange={(e) => onFileChange(e)}
            ref={inputFileRef}
            style={{ display: "none" }}
          />

          {/* <div
            style={{
              border: '1px solid #ACACAC',
              borderRadius: '10px',
              width: '100%',
              padding: '8px',
              margin: '10px 0px',
            }}
            onClick={() => inputFileRef?.current?.click()}>
            <div style={{ display: 'flex' }}>
              {listFileNames?.map((item: any, index: number) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px',
                    border: '1px solid #acacac',
                  }}>
                  <p
                    onClick={(e) => {
                      e.stopPropagation()
                      setListFileNames(
                        listFileNames?.filter(
                          (item: any, idx: number) => index !== idx
                        )
                      )
                    }}>
                    x
                  </p>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Tep />
            </div>
          </div> */}

          {/* {MyInput('Tệp đính kèm', 'Chọn tệp đính kèm (Tối đa 10MB)', false, true, 'con_file', "", false, "#fff", "file")} */}
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
            <button className={styles.huyb} onClick={() => {
              form.resetFields()
              setOpen(false)
              }}>
              <p className={styles.texthuyb}>Huỷ bỏ</p>
            </button>
            <button className={styles.luu}>
              <p className={styles.textluu}>Thêm mới</p>
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
