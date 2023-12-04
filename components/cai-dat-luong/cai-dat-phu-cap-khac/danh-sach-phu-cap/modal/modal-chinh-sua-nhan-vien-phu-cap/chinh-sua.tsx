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
  DatePicker,
} from "antd";
import styles from "./chinh-sua.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import dayjs from "dayjs";
const { TextArea } = Input;

export function ModalChinhSua(open: boolean, setOpen: Function, data: any) {
  const [fromDate, setFromDate] = useState(data?.cls_day);
  const [toDate, setToDate] = useState(data?.cls_day_end);
  const router = useRouter();
  useEffect(() => {
    if (data) {
      setFromDate(data?.cls_day);
      setToDate(
        data?.cls_day_end == "1970-01-01T00:00:00.000Z" ? "" : data?.cls_day_end
      );
    }
  }, [data]);
  const handleSubmit = () => {
    if (!fromDate) {
      window.alert("Vui lòng nhập thời điểm áp dụng");
      return;
    } else {
      data?.cls_id &&
        POST_TL("api/tinhluong/congty/edit_phuc_loi", {
          cls_day:
            dayjs(fromDate)?.format("YYYY-MM-DD") + "T00:00:00.000+00:00",
          cls_day_end: toDate
            ? dayjs(toDate)?.format("YYYY-MM-DD") + "T00:00:00.000+00:00"
            : "",
          cls_id: data?.cls_id,
        }).then((res) => {
          if (res?.message === "success") {
            alert("Cập nhật thông tin phụ cấp thành công!");
            router.reload();
          }
        });
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
        <div className={styles.textHead}>
          Chỉnh sửa nhân viên {data?.userName}
        </div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.info}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              src={
                data?.avatarUser ? `/${data?.avatarUser}` : "/anhnhanvien.png"
              }
              style={{ width: "46px", height: "46px" }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <p className={styles.textname}>{data?.userName}</p>
            <p className={styles.text}>{data?.idQLC}</p>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", marginBottom: "5px", gap: "5px" }}>
            <p className={styles.text}>Thời điểm áp dụng</p>
            <p className={styles.dau}>*</p>
          </div>
          <DatePicker
            size="large"
            allowClear={false}
            value={dayjs(fromDate)}
            format={"DD-MM-YYYY"}
            style={{
              border: "1px solid #ACACAC",
              borderRadius: "10px",
              width: "100%",
            }}
            onChange={(e) =>
              setFromDate(`${dayjs(e).format("YYYY-MM-DD")}T00:00:00.000+00:00`)
            }
          />
          {/* <Input
            style={{ border: '1px solid #9F9F9F', borderRadius: '5px' }}
            size='large'
            type='date'
            value={moment(fromDate).format('YYYY-MM-DD')}
            onChange={(e) =>
              setFromDate(`${e.target.value}T00:00:00.000+00:00`)
            }
          /> */}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", marginBottom: "5px", gap: "5px" }}>
            <p className={styles.text}>Đến ngày (Không bắt buộc)</p>
          </div>
          <DatePicker
            // allowClear={false}
            size="large"
            value={toDate && dayjs(toDate)}
            format={"DD-MM-YYYY"}
            style={{
              border: "1px solid #ACACAC",
              borderRadius: "10px",
              width: "100%",
            }}
            onChange={(e) => {
              console.log(e);
              setToDate(
                e
                  ? `${dayjs(e).format("YYYY-MM-DD")}T00:00:00.000+00:00`
                  : undefined
              );
            }}
          />
          {/* style={{ border: '1px solid #9F9F9F', borderRadius: '5px' }}
            size='large'
            type='date'
            value={moment(toDate).format('YYYY-MM-DD')}
            onChange={(e) => setToDate(`${e.target.value}T00:00:00.000+00:00`)}s
          /> */}
        </div>
        <div className={styles.khungbutton}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            <p className={styles.textbutton1}>Huỷ</p>
          </button>
          <button className={styles.button2} onClick={handleSubmit}>
            <p className={styles.textbutton2}>Cập nhật</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}
