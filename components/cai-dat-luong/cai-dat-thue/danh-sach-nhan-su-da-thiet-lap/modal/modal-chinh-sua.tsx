import { Modal, Input, Select, Button, Form, Avatar } from "antd";
import styles from "./modal-chinh-sua.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { DaDuyet } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su";
import { IconSelect } from "../../danh-sach-nhan-su-chua-thiet-lap/anh";
import moment from "moment";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
const dataBaoThue = [
  {
    value: 1,
    label: "Thuế theo hệ số cố định",
  },
  {
    value: 2,
    label: "Thuế theo hệ số lũy tiến",
  },
];
export function ModalChinhSua(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  data: any,
  key: String,
  info: any,
  listTax: any
) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const current = data?.find((item) => item?.key === key);
  console.log(current);
  const [from, setFrom] = useState<any>();
  const [to, setTo] = useState<any>();
  const listTaxes = [
    ...dataBaoThue,
    ...listTax?.tax_list_detail?.map((item) => ({
      label: item?.cl_name,
      value: item?.cl_id,
    })),
  ];
  const router = useRouter();
  const [taxId, setTaxId] = useState();

  useEffect(() => {
    setFrom(moment(current?.ADTN).format("YYYY-MM"));
    setTo(moment(current?.DN).format("YYYY-MM"));
    setTaxId(current?.cls_id_cl);
  }, [current]);

  const handleEdit = async () => {
    if (!from) window.alert("Thiếu trường từ ngày");
    else if (!taxId) window.alert("Thiếu trường thuế");
    else {
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/edit_nv_tax", {
        cls_id_com: com_id,
        cls_day: from,
        cls_day_end: to || "",
        cls_id: taxId,
      });

      console.log(res);
      if (res?.message === "success") {
        window.alert("Sửa thuế nhân viên thành công");
        setOpen(false);
        router.reload();
      } else {
        window.alert("Sửa thuế nhân viên lỗi");
      }
    }
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
        <div className={styles.textHead}>Chỉnh sửa thuế nhân viên</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        {data?.map((Data: any, index: number) => {
          if (key === Data?.key) {
            const handleChange = (value: {
              value: string;
              label: React.ReactNode;
            }) => {};
            return (
              <div key={index}>
                <div>
                  <div>
                    <div className={styles.info} key={index}>
                      <div className={styles.khungavata}>
                        <Avatar
                          src={info.url}
                          style={{
                            width: "46px",
                            height: "46px",
                            margin: "auto",
                          }}
                        />
                      </div>
                      <div className={styles.infotext}>
                        <p className={styles.title}>{info.title}</p>
                        <p>ID: {info.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Áp dụng từ tháng
                    </p>{" "}
                    <p style={{ color: "#FF5B4D" }}>*</p>
                  </div>
                  <Input
                    type="month"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Đến tháng (Không bắt buộc)
                    </p>
                  </div>
                  <Input
                    type="month"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Loại Thuế
                    </p>{" "}
                    <p style={{ color: "#FF5B4D" }}>*</p>
                  </div>
                  <Select
                    disabled
                    defaultValue={taxId}
                    value={taxId}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={listTaxes}
                    suffixIcon={<IconSelect />}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={styles.huy} onClick={() => setOpen(false)}>
                    <p className={styles.texthuy}>Huỷ</p>
                  </button>
                  <button className={styles.luu} onClick={handleEdit}>
                    <p className={styles.textluu}>Lưu</p>
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </Modal>
  );
}
