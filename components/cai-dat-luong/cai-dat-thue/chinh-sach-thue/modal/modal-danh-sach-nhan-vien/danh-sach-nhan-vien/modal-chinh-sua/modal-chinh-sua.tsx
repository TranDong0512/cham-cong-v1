import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  List,
  Checkbox,
  Tabs,
  Avatar,
} from "antd";
import styles from "./modal-chinh-sua.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Lenxuong } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
export function ModalChinhSua(open: boolean, setOpen: Function, data: any) {
  const onClick = () => {
    setOpen(false);
  };
  const router = useRouter();
  const [start, setStart] = useState<any>();
  const [end, setEnd] = useState<any>();
  const [sal, setSal] = useState<any>();

  useEffect(() => {
    setStart(data?.apdung);
    setEnd(data?.denthang != "1970-01" ? data?.denthang : "---------");
    setSal(data?.tienthue);
  }, [data]);
  const update = async () => {
    if (!start) window.alert("Thiêu trường tháng áp dụng");
    else {
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/edit_nv_tax", {
        cls_id_com: com_id,
        cls_day: start,
        cls_day_end: end,
        cls_id: data?.cls_id,
      });

      if (res?.data === true) {
        window.alert("Chỉnh sửa thuế nhân viên thành công");
        setOpen(false);
        router.reload();
      } else {
        window.alert("Chỉnh sửa thuế nhân viên lỗi");
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
        <div className={styles.khungnhanvien}>
          <div className={styles.nhanvien}>
            <Avatar
              src={data?.url}
              style={{ width: "24px", height: "24px", margin: "auto" }}
            />
            <p className={styles.name}>{data?.name}</p>
          </div>
        </div>
        <div className={styles.apdung}>
          <div className={styles.text}>
            <p className={styles.title}>Áp dụng từ tháng</p>
            <p className={styles.dau}>*</p>
          </div>
          <Input
            className={styles.inputap}
            type="month"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
          />
        </div>
        <div className={styles.apdung}>
          <div className={styles.text}>
            <p className={styles.title}>Đến tháng (Không bắt buộc)</p>
          </div>
          <Input
            className={styles.inputap}
            type="month"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
          />
        </div>
        {/* <div className={styles.apdung}>
          <div className={styles.text}>
            <p className={styles.title}>Nhập tiền thuế</p>
            <p className={styles.dau}>*</p>
          </div>
          <Input className={styles.inputap} value={sal} suffix='VNĐ' />
        </div> */}
        <div className={styles.khungbutton}>
          <button className={styles.button} onClick={update}>
            <p className={styles.textbutton}>Cập nhật</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}
