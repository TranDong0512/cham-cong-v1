import { Table } from "antd";
import styles from "./ct-phat-cong.module.css";
import Image from "next/image";
import { useState } from "react";
import moment from "moment";
import { XoaThuongPhatCong } from "../../modals/xoa-cong/xoa-cong";

export function ChiTietPhatCong(
  setPopoverKey: Function,
  setModalChinhSua: Function,
  rowSelectKey: any,
  setRowSelectKey: Function,
  selectedData: any
): React.ReactNode {
  const [xacNhanXoa, setXacNhanXoa] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const onDelClick = async (record) => {
    setSelectedRow(record);
    setXacNhanXoa(true);
  };

  return (
    <div className={styles.chiTietPhat}>
      <Table
        className={`green-table-bodyBorder`}
        dataSource={selectedData?.tt_phat_cong?.ds_phat_cong}
        columns={[
          {
            title: <p style={{ color: "#fff" }}>Công phạt</p>,
            align: "center",
            render: (record) => (
              <p style={{ color: "#FF5B4D" }}>
                {record?.shifts.shift_name} -{" "}
                {record?.shifts.num_to_calculate.$numberDecimal} công
              </p>
            ),
          },
          {
            title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
            align: "center",
            render: (record) => (
              <p>
                {record?.phatcong_time &&
                  moment(record?.phatcong_time)?.format("DD-MM-YYYY")}
              </p>
            ),
          },
          {
            title: <p style={{ color: "#fff" }}>Lý do</p>,
            align: "center",
            render: (record) => <p>{record?.ly_do}</p>,
          },
          {
            title: <p style={{ color: "#fff" }}>Điều chỉnh</p>,
            align: "center",
            render: (record) => (
              <div className={styles.actionGroup}>
                <Image
                  alt="/"
                  src={"/edit.png"}
                  width={24}
                  height={24}
                  onClick={() => {
                    setPopoverKey("none");
                    setModalChinhSua(true);
                    setRowSelectKey(record);
                  }}
                />
                <div className={styles.divider}></div>
                <Image
                  alt="/"
                  src={"/delete-icon.png"}
                  width={24}
                  height={24}
                  onClick={() => onDelClick(record)}
                />
              </div>
            ),
          },
        ]}
        scroll={{ x: "max-content" }}
        pagination={false}
      ></Table>
      <div className={styles.exit}>
        <Image
          src={"/big-x.png"}
          alt="/"
          width={18}
          height={18}
          onClick={() => setPopoverKey("none")}
        ></Image>
      </div>
      {XoaThuongPhatCong(xacNhanXoa, setXacNhanXoa, selectedRow)}
    </div>
  );
}
