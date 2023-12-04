import { Table } from "antd";
import styles from "./chi-tiet-phat.module.css";
import Image from "next/image";
import { useState } from "react";
import { XoaThuongPhat } from "../../modals/xoa/xoa";
import moment from "moment";

export function ChiTietPhat(
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
        dataSource={selectedData?.tt_phat?.ds_phat}
        columns={[
          {
            title: <p style={{ color: "#fff" }}>Tiền phạt</p>,
            align: "center",
            render: (record) => <p>{record?.pay_price}</p>,
          },
          {
            title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
            align: "center",
            render: (record) => (
              <p>
                {record?.pay_day &&
                  moment(record?.pay_day)?.format("DD-MM-YYYY")}
              </p>
            ),
          },
          {
            title: <p style={{ color: "#fff" }}>Lý do</p>,
            align: "center",
            render: (record) => <p>{record?.pay_case}</p>,
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
      {XoaThuongPhat(xacNhanXoa, setXacNhanXoa, selectedRow)}
    </div>
  );
}
