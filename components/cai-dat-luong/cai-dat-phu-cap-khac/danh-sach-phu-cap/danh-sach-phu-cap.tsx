import { ColumnsType } from "antd/es/table";
import styles from "./danh-sach-phu-cap.module.css";
import { Button, Card, Tabs, Table, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { ModalXoa } from "./modal/modal-xoa";
import { ModalThemPhuCap } from "./modal/modal-them-phu-cap";
import { ModalChinhSua } from "./modal/modal-chinh-sua";
import moment from "moment";
import { ModalThemNhanVien } from "./modal/modal-them-nhan-vien";
import { ModalDanhSachNhanVien } from "./modal/modal-danh-sach-nhan-vien";

export const DanhSachPhuCap = ({
  listPhuCap,
  listPhongBan,
  listNhanVien,
  listEmpX,
}: {
  listPhuCap: any;
  listPhongBan: any;
  listNhanVien: any;
  listEmpX: any;
}) => {
  const [modalXoa, setModalXoa] = useState(false);
  const [modalThem, setModalThem] = useState(false);
  const [modalChinhSua, setModalChinhSua] = useState(false);
  const [modalThemNhanVien, setModalThemNhanVien] = useState(false);
  const [modalDanhSachNhanVien, setModalDanhSachNhanVien] = useState(false);
  const [key, setKey] = useState();
  const [color1, setColor1] = useState("#474747");
  const [color2, setColor2] = useState("#474747");
  const [color3, setColor3] = useState("#474747");
  const [color4, setColor4] = useState("#474747");
  const [choosen, setChoosen] = useState();
  const [dsPhuCap, setDsPhuCap] = useState(listPhuCap);
  const [isShowPopoverContent, setIsShowPopoverContent] = useState(false);

  useEffect(() => {
    if (
      modalXoa ||
      modalThem ||
      modalChinhSua ||
      modalThemNhanVien ||
      modalDanhSachNhanVien
    ) {
      setIsShowPopoverContent(false);
    } else {
      setTimeout(() => {
        setIsShowPopoverContent(true);
      }, 200);
    }
  }, [
    modalXoa,
    modalThem,
    modalChinhSua,
    modalThemNhanVien,
    modalDanhSachNhanVien,
  ]);

  const ItemDropdown = (title: String, url: any, key: String, record: any) => {
    if (key === "4")
      return (
        <a
          className={styles.DropdownDel}
          onClick={() => {
            setModalXoa(true);
          }}
          onMouseOver={() => setColor4("#FF5B4D")}
          onMouseOut={() => setColor4("#474747")}
        >
          <div className={styles.xoa}>
            {url}
            {title}
          </div>
        </a>
      );
    if (key === "3")
      return (
        <a
          className={styles.DropdownDel}
          onMouseOver={() => setColor3("#4C5BD4")}
          onMouseOut={() => setColor3("#474747")}
        >
          <div
            className={styles.conlai}
            onClick={() => {
              setKey(record);
              setModalChinhSua(true);
            }}
          >
            {url}
            {title}
          </div>
        </a>
      );
    if (key === "2")
      return (
        <a
          className={styles.DropdownDel}
          onMouseOver={() => setColor2("#4C5BD4")}
          onMouseOut={() => setColor2("#474747")}
        >
          <div
            className={styles.conlai}
            onClick={() => {
              setModalDanhSachNhanVien(true), setKey(record);
            }}
          >
            {url}
            {title}
          </div>
        </a>
      );
    return (
      <a
        className={styles.DropdownDel}
        onMouseOver={() => setColor1("#4C5BD4")}
        onMouseOut={() => setColor1("#474747")}
      >
        <div
          className={styles.conlai}
          onClick={() => {
            setModalThemNhanVien(true);
          }}
        >
          {url}
          {title}
        </div>
      </a>
    );
  };
  const items = [
    {
      key: "1",
      label: "Thêm nhân viên",
      url: (
        <div className={styles.tim}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <ellipse
              cx="10.1569"
              cy="8.01367"
              rx="3.36"
              ry="3.5"
              stroke={color1}
            />
            <path
              d="M16.4009 18.0137C16.4009 20.499 16.4009 22.5137 9.68094 22.5137C2.96094 22.5137 2.96094 20.499 2.96094 18.0137C2.96094 15.5284 5.96958 13.5137 9.68094 13.5137C13.3923 13.5137 16.4009 15.5284 16.4009 18.0137Z"
              stroke={color1}
            />
            <path
              d="M21.0822 4.51369H19.1622M19.1622 4.51369H17.2422M19.1622 4.51369L19.1622 2.51367M19.1622 4.51369L19.1622 6.51367"
              stroke={color1}
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
    },
    {
      key: "2",
      label: "Danh sách nhân viên",
      url: (
        <div className={styles.tim}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <rect
              x="5"
              y="4.51367"
              width="14"
              height="17"
              rx="2"
              stroke={color2}
            />
            <path d="M9 9.51367H15" stroke={color2} strokeLinecap="round" />
            <path d="M9 13.5137H15" stroke={color2} strokeLinecap="round" />
            <path d="M9 17.5137H13" stroke={color2} strokeLinecap="round" />
          </svg>
        </div>
      ),
    },
    {
      key: "3",
      label: "Chỉnh sửa",
      url: (
        <div className={styles.tim}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M12.0052 10.6245L15.8694 6.7603L17.9908 8.88162L14.1265 12.7459L11.1991 13.552L12.0052 10.6245ZM16.5766 6.05319L18.6979 8.17451L20.0869 6.78545C20.1374 6.69536 20.2274 6.49976 20.2366 6.25334C20.2458 6.00769 20.1821 5.59866 19.6672 5.08384C19.1524 4.56902 18.7434 4.50524 18.4977 4.51445C18.2513 4.5237 18.0557 4.61372 17.9656 4.66413L16.5766 6.05319ZM20.1132 6.75922C20.1141 6.75826 20.1142 6.75818 20.1134 6.75899L20.1132 6.75922ZM17.9921 4.63767C17.9929 4.63685 17.9928 4.63698 17.9918 4.6379L17.9921 4.63767ZM17.285 3.93056C17.3175 3.89806 17.3514 3.86821 17.3901 3.84348C17.6716 3.66377 18.9675 2.96991 20.3743 4.37673C21.7812 5.78355 21.0873 7.07947 20.9076 7.36093C20.8829 7.39967 20.853 7.4336 20.8205 7.4661L14.8336 13.453C14.7112 13.5754 14.559 13.664 14.392 13.71L11.4646 14.5161C10.7165 14.7221 10.029 14.0346 10.235 13.2865L11.0411 10.3591C11.0871 10.1921 11.1756 10.0399 11.2981 9.91744L17.285 3.93056ZM4 6.10896C3.72386 6.10896 3.5 6.33282 3.5 6.60896V20.609C3.5 20.8851 3.72386 21.109 4 21.109H19C19.2761 21.109 19.5 20.8851 19.5 20.609V14.609C19.5 14.3328 19.2761 14.109 19 14.109C18.7239 14.109 18.5 14.3328 18.5 14.609V20.109H4.5V7.10896H10.5C10.7761 7.10896 11 6.88511 11 6.60896C11 6.33282 10.7761 6.10896 10.5 6.10896H4Z"
              fill={color3}
            />
          </svg>
        </div>
      ),
    },
    {
      key: "4",
      label: "Xoá",
      url: (
        <div className={styles.do}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M10 15.5137L10 12.5137"
              stroke={color4}
              strokeLinecap="round"
            />
            <path
              d="M14 15.5137L14 12.5137"
              stroke={color4}
              strokeLinecap="round"
            />
            <path
              d="M3 7.51367H21V7.51367C20.0681 7.51367 19.6022 7.51367 19.2346 7.66591C18.7446 7.8689 18.3552 8.25825 18.1522 8.74831C18 9.11585 18 9.58179 18 10.5137V16.5137C18 18.3993 18 19.3421 17.4142 19.9279C16.8284 20.5137 15.8856 20.5137 14 20.5137H10C8.11438 20.5137 7.17157 20.5137 6.58579 19.9279C6 19.3421 6 18.3993 6 16.5137V10.5137C6 9.58179 6 9.11585 5.84776 8.74831C5.64477 8.25825 5.25542 7.8689 4.76537 7.66591C4.39782 7.51367 3.93188 7.51367 3 7.51367V7.51367Z"
              stroke={color4}
              strokeLinecap="round"
            />
            <path
              d="M10.0681 3.88426C10.1821 3.77795 10.4332 3.684 10.7825 3.617C11.1318 3.54999 11.5597 3.51367 12 3.51367C12.4403 3.51367 12.8682 3.54999 13.2175 3.617C13.5668 3.684 13.8179 3.77795 13.9319 3.88426"
              stroke={color4}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
    },
  ];
  const Content = (record: any) => {
    return (
      <div className={styles.moduleContent}>
        {items.map((data) => {
          return ItemDropdown(data.label, data.url, data.key, record);
        })}
      </div>
    );
  };
  const [reload, setReload] = useState(false);

  const tuyChon = (data: any) => {
    return (
      <div
        onClick={() => {
          setChoosen(data);
          setReload(!reload);
        }}
      >
        <Popover
          content={isShowPopoverContent ? Content(data) : null}
          // trigger={['click']}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.563 7.75H19C19.4142 7.75 19.75 7.41421 19.75 7C19.75 6.58579 19.4142 6.25 19 6.25H15.0103C15.0562 6.80704 15.2544 7.32094 15.563 7.75ZM13.3148 7.75C13.139 7.2795 13.032 6.77541 13.0061 6.25H5C4.58579 6.25 4.25 6.58579 4.25 7C4.25 7.41421 4.58579 7.75 5 7.75H13.3148ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5ZM5 16.25C4.58579 16.25 4.25 16.5858 4.25 17C4.25 17.4142 4.58579 17.75 5 17.75H19C19.4142 17.75 19.75 17.4142 19.75 17C19.75 16.5858 19.4142 16.25 19 16.25H5Z"
              fill="#474747"
            />
            <circle cx="18" cy="6" r="3" fill="#474747" />
          </svg>
        </Popover>
      </div>
    );
  };
  const columns: any = [
    {
      title: "Tên phụ cấp",
      render: (record: any) => {
        return (
          <>
            <a style={{ color: "#4C5BD4" }}>{record?.cl_name}</a>
          </>
        );
      },
    },
    {
      title: "Mức phụ cấp",
      render: (record: any) => (
        <p style={{ color: "#FF5B4D" }}>
          {`${record?.cl_salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      ),
      align: "center",
    },
    {
      title: "Loại thu nhập",
      align: "center",
      render: (record: any) => (
        <p style={{ color: "#474747" }}>
          {record?.cl_type_tax === 0
            ? "Thu nhập chịu thuế"
            : "Thu nhập miễn thuế"}
        </p>
      ),
    },
    {
      title: "Áp dụng từ tháng",
      align: "center",
      render: (record: any) => (
        <p style={{ color: "#474747" }}>
          {moment(record?.cl_day).format("DD/MM/YYYY")}
        </p>
      ),
    },
    {
      title: "Đến tháng",
      align: "center",
      render: (record: any) => (
        <p style={{ color: "#474747" }}>
          {moment(record?.cl_day_end).year() < 2018
            ? "---"
            : `${moment(record?.cl_day_end).format("DD/MM/YYYY")}`}
        </p>
      ),
    },
    {
      title: "Tuỳ chỉnh",
      render: (record: any) => tuyChon(record),
      align: "center",
    },
  ];
  return (
    <>
      <Card>
        <div className={styles.buttoncheck1}>
          <button className={styles.button1} onClick={() => setModalThem(true)}>
            <p className={styles.cong}>+</p>
            <p className={styles.buttonname}>Thêm phụ cấp khác</p>
          </button>
        </div>
        <div className={styles.DSPCKhungTitle}>
          <div className={styles.DSPCTitle}>
            <h2 className={styles.title1}>Danh sách phụ cấp</h2>
            <p className={styles.nd1}>
              Mức phụ cấp tương ứng với tổng ngày công trong tháng. Tổng tiền
              phụ cấp hưởng được tính theo số ngày công thực tế đi làm trong
              tháng{" "}
            </p>
          </div>
          <div className={styles.buttoncheck2}>
            <button
              className={styles.button1}
              onClick={() => setModalThem(true)}
            >
              <p className={styles.cong}>+</p>
              <p className={styles.buttonname}>Thêm phụ cấp khác</p>
            </button>
          </div>
        </div>
        <div className={styles.table1}>
          <Table
            className={`table_phucap ${styles.table}`}
            columns={columns}
            dataSource={listPhuCap}
            pagination={{
              position: ["bottomCenter"],
            }}
            scroll={{ x: "max-content" }}
            bordered
          />
        </div>
      </Card>
      {ModalXoa(modalXoa, setModalXoa, choosen, dsPhuCap, setDsPhuCap)}
      {ModalThemPhuCap(modalThem, setModalThem, dsPhuCap, setDsPhuCap)}
      {ModalChinhSua(modalChinhSua, setModalChinhSua, choosen)}
      {ModalThemNhanVien(
        modalThemNhanVien,
        setModalThemNhanVien,
        listNhanVien,
        choosen
      )}
      {ModalDanhSachNhanVien(
        modalDanhSachNhanVien,
        setModalDanhSachNhanVien,
        key,
        listPhongBan,
        reload
      )}
    </>
  );
};
