import { Modal, Input, Select, Button, Form, List, Checkbox } from "antd";
import styles from "./model-them-phu-cap-theo-ca.module.css";
import Image from "next/image";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import { IconSelect } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import moment from "moment";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
const { TextArea } = Input;

export function ModalThemPhuCapTheoCa(
  open: boolean,
  setOpen: Function,
  shiftLabel: any
) {
  const [ND, setND] = useState("");
  const [shiftSelected, setShiftSelected] = useState();
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const [money, setMoney] = useState<any>(undefined);
  const router = useRouter();
  useEffect(() => {
    if (!open) {
      setFromDate(null)
      setToDate(null)
      setMoney(null)
      setShiftSelected(null)
      setND(null)
    }
  }, [open])

  const handleChange = (value: any, option: any) => {
    setShiftSelected(value);
  };
  const handleInputChange = (event: any) => {
    setND(event.target.value);
  };
  const handelSubmit = () => {
    let com_id = null;
    com_id = getCompIdCS();
    shiftSelected
      ? fromDate
        ? // ? toDate
        money
          ? POST_TL("api/tinhluong/congty/insert_wf_shift", {
            wf_com: com_id,
            wf_money: money,
            wf_time: fromDate,
            wf_time_end: toDate,
            wf_shift: shiftSelected,
          }).then((res) => {
            if (res?.message === "success") {
              alert("Thêm phụ cấp theo ca thành công!");
              // router.replace(router.asPath)
              setOpen(false);
              router.reload();
            }
          })
          : alert("Vui lòng nhập số tiền phụ cấp!")
        : // : alert("Vui lòng nhập ngày hết hạn!")
        alert("Vui lòng nhập ngày áp dụng!")
      : alert("Vui lòng chọn ca làm việc!");
  };
  // console.log(ND);
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
        <div className={styles.textHead}>Thêm phụ cấp theo ca</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <p>Ca làm việc</p>
            <p style={{ color: "red", marginLeft: "5px" }}>*</p>
          </div>
          <Select
            value={shiftSelected}
            onChange={handleChange}
            options={shiftLabel}
            style={{ width: "100%" }}
            size="large"
            suffixIcon={<IconSelect />}
          />
        </div>
        <div className={styles.date}>
          <div className={styles.date1}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <p>Áp dụng từ ngày</p>
              <p style={{ color: "red", marginLeft: "5px" }}>*</p>
            </div>
            <Input
              type="month"
              className={styles.inputname}
              value={moment(fromDate).format("YYYY-MM")}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className={styles.date2}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <p>Đến ngày (Không bắt buộc)</p>
            </div>
            <Input
              type="month"
              className={styles.inputname}
              value={moment(toDate).format("YYYY-MM")}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <p>Tiền Phụ Cấp</p>
            <p style={{ color: "red", marginLeft: "5px" }}>*</p>
          </div>
          <Input
            placeholder="Nhập số tiền phụ cấp"
            className={styles.inputname}
            suffix="VNĐ"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <p>Ghi chú</p>
          </div>
          <TextArea
            style={{ resize: "none" }}
            rows={5}
            value={ND}
            onChange={handleInputChange}
            placeholder="Nhập ghi chú nếu có"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={styles.huyb} onClick={() => setOpen(false)}>
            <p className={styles.texthuyb}>Huỷ bỏ</p>
          </button>
          <button className={styles.luu} onClick={handelSubmit}>
            <p className={styles.textluu}>Thêm Mới</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}
