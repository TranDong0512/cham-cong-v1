import { ColumnsType } from "antd/es/table";
import styles from "./phu-cap-theo-ca.module.css";
import { Button, Card, Tabs, Table, Popover } from "antd";
import React, { useState } from "react";
import { ModalThemPhuCapTheoCa } from "./modal/model-them-phu-cap-theo-ca";
import { ModalChinhSuaPhuCapTheoCa } from "./modal/modal-chinh-sua-phu-cap-theo-ca";
import { ModalXoaPhuCapTheoCa } from "./modal/modal-xoa-phu-cap-theo-ca";
import moment from "moment";

export const PhuCapTheoCa = ({ listPhuCapTheoCa, listShift }) => {
  const [modalXoa, setModalXoa] = useState(false);
  const [modalThem, setModalThem] = useState(false);
  const [modalChinhSua, setModalChinhSua] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [wfShiftSelected, setWfShiftSelected] = useState<any>({});

  const shiftLabel = listShift?.map((shift) => ({
    ...shift,
    label: shift?.shift_name,
    value: shift?.shift_id,
  }));

  const [key, setKey] = useState("");
  const chinhsua = (data: any) => {
    return (
      <div className={styles.chucnang}>
        <div
          onClick={() => {
            setKey(data.key);
            setModalAdd(true);
            setWfShiftSelected(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M12.5 3.9979H7.6875C5.92709 3.9979 4.5 5.42499 4.5 7.1854V16.8104C4.5 18.5708 5.92709 19.9979 7.6875 19.9979H17.3125C19.0729 19.9979 20.5 18.5708 20.5 16.8104V11.9979M18.9142 8.4121L20 7.32634C20.781 6.54529 20.781 5.27897 20 4.49792C19.2189 3.71687 17.9526 3.71688 17.1715 4.49794L16.0858 5.58367M18.9142 8.4121L12.8779 14.4485C12.5987 14.7277 12.2431 14.918 11.856 14.9954L8.91422 15.5838L9.50257 12.642C9.58001 12.2548 9.77032 11.8992 10.0495 11.62L16.0858 5.58367M18.9142 8.4121L16.0858 5.58367"
              stroke="#4C5BD4"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="20"
            viewBox="0 0 1 20"
            fill="none"
          >
            <path d="M0.5 0V20" stroke="#D9D9D9" />
          </svg>
        </div>
        <div
          onClick={() => {
            setWfShiftSelected(data);
            setModalXoa(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M3.5 6H5.5H21.5"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.5 6V20C19.5 20.5304 19.2893 21.0391 18.9142 21.4142C18.5391 21.7893 18.0304 22 17.5 22H7.5C6.96957 22 6.46086 21.7893 6.08579 21.4142C5.71071 21.0391 5.5 20.5304 5.5 20V6M8.5 6V4C8.5 3.46957 8.71071 2.96086 9.08579 2.58579C9.46086 2.21071 9.96957 2 10.5 2H14.5C15.0304 2 15.5391 2.21071 15.9142 2.58579C16.2893 2.96086 16.5 3.46957 16.5 4V6"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5 11V17"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.5 11V17"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  };
  const columns: any = [
    {
      title: "Tên ca",
      align: "center",
      render: (record) => (
        <a style={{ color: "#4C5BD4" }}>
          {shiftLabel?.find((shift) => shift?.value === record?.wf_shift)
            ?.label || record?.wf_shift}
        </a>
      ),
    },
    {
      title: "Tiền phụ cấp",
      align: "center",
      render: (record) => {
        return (
          <p style={{ color: "#FF5B4D" }}>
            {`${record?.wf_money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
          </p>
        );
      },
    },
    {
      title: "Áp dụng từ tháng",
      align: "center",
      render: (record) => (
        <p style={{ color: "#474747", font: "16px" }}>
          {moment(record?.wf_time).format("DD/MM/YYYY")}
        </p>
      ),
    },
    {
      title: "Đến tháng",
      align: "center",
      render: (record) => (
        <p style={{ color: "#474747", font: "16px" }}>
          {new Date(record?.wf_time_end) > new Date("2022-01-01")
            ? moment(record?.wf_time_end).format("DD/MM/YYYY")
            : "Chưa cập nhật"}
        </p>
      ),
    },
    {
      title: "Tuỳ chỉnh",
      align: "center",
      render: (record: any) => chinhsua(record),
    },
  ];
  return (
    <Card style={{ marginTop: "30px" }}>
      <div className={styles.DSPCKhungTitle}>
        <div className={styles.buttoncheck1}>
          <button className={styles.button1} onClick={() => setModalThem(true)}>
            <p className={styles.cong}>+</p>
            <p className={styles.buttonname}>Thêm phụ cấp theo ca</p>
          </button>
        </div>
        <div className={styles.DSPCTitle}>
          <h2 className={styles.title1}>Phụ cấp theo ca</h2>
          <p className={styles.nd1}>
            Mức phụ cấp tương ứng với tổng ngày công trong tháng. Tổng tiền phụ
            cấp hưởng được tính theo số ngày công thực tế đi làm trong tháng{" "}
          </p>
        </div>
        <div className={styles.buttoncheck2}>
          <button className={styles.button1} onClick={() => setModalThem(true)}>
            <p className={styles.cong}>+</p>
            <p className={styles.buttonname}>Thêm phụ cấp theo ca</p>
          </button>
        </div>
      </div>
      <div className={styles.table1}>
        <Table
          className={`table_phucap ${styles.table}`}
          columns={columns}
          dataSource={listPhuCapTheoCa}
          pagination={{
            position: ["bottomCenter"],
          }}
          bordered
          scroll={{ x: 1100 }}
        />
      </div>
      {ModalThemPhuCapTheoCa(modalThem, setModalThem, shiftLabel)}
      {ModalChinhSuaPhuCapTheoCa(modalAdd, setModalAdd, wfShiftSelected)}
      {ModalXoaPhuCapTheoCa(modalXoa, setModalXoa, wfShiftSelected)}
    </Card>
  );
};
