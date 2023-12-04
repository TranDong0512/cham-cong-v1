import React, { useEffect, useState } from "react";
import styles from "./danh-sach-nhan-vien.module.css";
import { Table, Avatar, Popover } from "antd";
import { ColumnsType } from "antd/es/table";
import { title } from "process";
import { ModalXoa } from "./modal-xoa/modal-xoa";
import { ModalChinhSua } from "./modal-chinh-sua/modal-chinh-sua";
import moment from "moment";
const data = [
  {
    key: "1",
    url: "/Ellipse1125.png",
    name: "Le Nhat Minh",
    id: "123456",
    apdung: "Thang6 2023",
    denthang: "chuc cap nhat",
    tienthue: "500000",
  },
  {
    key: "2",
    url: "/Ellipse1125.png",
    name: "Le Nhat Minh",
    id: "123456",
    apdung: "Thang6 2023",
    denthang: "chuc cap nhat",
    tienthue: "500000",
  },
  {
    key: "3",
    url: "/Ellipse1125.png",
    name: "Le Nhat Minh",
    id: "123456",
    apdung: "Thang6 2023",
    denthang: "chuc cap nhat",
    tienthue: "500000",
  },
  {
    key: "4",
    url: "/Ellipse1125.png",
    name: "Le Nhat Minh",
    id: "123456",
    apdung: "Thang6 2023",
    denthang: "chuc cap nhat",
    tienthue: "500000",
  },
  {
    key: "5",
    url: "/Ellipse1125.png",
    name: "Le Nhat Minh",
    id: "123456",
    apdung: "Thang6 2023",
    denthang: "chuc cap nhat",
    tienthue: "500000",
  },
];
interface DataType {
  key: String;
  url: String;
  name: String;
  id: String;
  apdung: String;
  denthang: String;
  tienthue: String;
}

export const DanhSachNhanVien = ({ listEmp, taxSelected }) => {
  const [modalKey, setModalKey] = useState("");
  const [modalXoa, setModalXoa] = useState(false);
  const [modalChinhSua, setModalChinhSua] = useState(false);
  const [listEmpX, setlistEmpX] = useState(listEmp);

  useEffect(() => {
    setlistEmpX([]);
    if (listEmp?.length > 0) {
      setlistEmpX(listEmp);
    }
  }, [listEmp]);
  const thongTin = (x: any) => {
    return (
      <>
        {listEmpX?.map((k, index) => {
          if (x.key === k.key) {
            return (
              <div key={index}>
                <p>{k.name}</p>
                <p>{k.id}</p>
              </div>
            );
          }
        })}
      </>
    );
  };
  const avata = (x: any) => {
    return (
      <>
        {listEmpX?.map((k, index) => {
          if (x.key == k.key) {
            return (
              <Avatar
                src={k.url}
                key={index}
                style={{ width: "46px", height: "46px" }}
              />
            );
          }
        })}
      </>
    );
  };
  const chucnang = (data: any) => {
    return (
      <div className={styles.chucnang}>
        <div
          onClick={() => {
            setModalChinhSua(true), setModalKey(data);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1"
          height="24"
          viewBox="0 0 1 24"
          fill="none"
        >
          <path d="M0.5 0V24" stroke="#D9D9D9" />
        </svg>
        <div
          onClick={() => {
            setModalXoa(true), setModalKey(data);
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
  const columns: ColumnsType<DataType> = [
    {
      title: "Ảnh",
      align: "center",
      render: (record: any) => avata(record),
    },
    {
      title: "Họ và Tên (ID)",
      align: "center",
      render: (record: any) => thongTin(record),
    },
    {
      title: "Áp dụng từ tháng",
      align: "center",
      render: (record) => (
        <p className={styles.texttable}>
          {new Date(record?.cls_day) > new Date("2020-01-01")
            ? moment(record?.cls_day)?.format("DD-MM-YYYY")
            : "Chưa cập nhật"}
        </p>
      ),
    },
    {
      title: "Đến tháng",
      align: "center",
      render: (record) => (
        <p className={styles.texttable}>
          {new Date(record?.cls_day_end) > new Date("2020-01-01")
            ? moment(record?.cls_day_end)?.format("DD-MM-YYYY")
            : "Chưa cập nhật"}
        </p>
      ),
    },
    {
      title: "Tiền thuế",
      dataIndex: "tienthue",
      align: "center",
      render: (value) => {
        return (
          <p className={styles.texttable}>
            {value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
          </p>
        );
      },
    },
    {
      title: "Chức năng",
      align: "center",
      render: (record: any) => chucnang(record),
    },
  ];

  return (
    <div>
      <Table
        className={`table_danhsachnhanvienthue ${styles.table}`}
        columns={columns}
        dataSource={listEmpX}
        pagination={false}
        scroll={{ x: 1100 }}
      />
      {ModalXoa(
        modalXoa,
        setModalXoa,
        modalKey,
        listEmpX,
        setlistEmpX,
        taxSelected
      )}
      {ModalChinhSua(modalChinhSua, setModalChinhSua, modalKey)}
    </div>
  );
};
