import { Modal, Input, Select, Button, Form, List, Checkbox } from "antd";
import styles from "./modal-chinh-sua-phu-cap-theo-ca.module.css";
import Image from "next/image";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import moment from "moment";
const { TextArea } = Input;
export function ModalChinhSuaPhuCapTheoCa(
  open: boolean,
  setOpen: Function,
  wfShiftSelected: any
) {
  const [ND, setND] = useState("");
  const [fromDate, setFromDate] = useState<any>(wfShiftSelected?.wf_time);
  const [toDate, setToDate] = useState<any>(
    wfShiftSelected?.wf_time_end == "1970-01-01T00:00:00.000Z"
      ? ""
      : wfShiftSelected?.wf_time_end
  );
  const [money, setMoney] = useState<any>(wfShiftSelected?.wf_money);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      if (wfShiftSelected?.wf_id) {
        setFromDate(wfShiftSelected?.wf_time);
        setToDate(
          wfShiftSelected?.wf_time_end == "1970-01-01T00:00:00.000Z"
            ? ""
            : wfShiftSelected?.wf_time_end
        );
        setMoney(wfShiftSelected?.wf_money);
      }
    }
  }, [wfShiftSelected, open]);

  const handleInputChange = (event: any) => {
    setND(event.target.value);
  };
  const handelSubmit = () => {
    if (!fromDate) window.alert("Thiếu trường Từ ngày");
    else if (!money) window.alert("Thiếu trường Tiền phụ cấp");
    else {
      if (wfShiftSelected?.wf_id) {
        POST_TL("api/tinhluong/congty/edit_wf_shift", {
          wf_money: money,
          wf_time: fromDate,
          wf_time_end: toDate,
          wf_id: wfShiftSelected?.wf_id,
        }).then((res) => {
          if (res?.message === "success") {
            alert("Cập nhật phụ cấp theo ca thành công!");
            setOpen(false);
            // router.replace(router.asPath)
            router.reload();
          }
        });
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
        <div className={styles.textHead}>Chỉnh sửa phụ cấp theo ca</div>
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
        <div className={styles.date}>
          <div className={styles.date1}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <p>Áp dụng từ ngày</p>
              <p style={{ color: "red", marginLeft: "5px" }}>*</p>
            </div>
            <Input
              type="month"
              className={styles.inputname}
              defaultValue="xin chào"
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={styles.huy} onClick={() => setOpen(false)}>
            <p className={styles.texthuy}>Huỷ bỏ</p>
          </button>
          <button className={styles.capNhap} onClick={handelSubmit}>
            <p className={styles.textCN}>Cập nhật</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}
