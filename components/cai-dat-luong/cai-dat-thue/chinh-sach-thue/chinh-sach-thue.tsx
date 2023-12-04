import { Card, Col, Popover, Row } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./chinh-sach-thue.module.css";
import classNames from "classnames";
import { ModalChinhSua } from "./modal/modal-chinh-sua/modal-chinh-sua";
import { ModalXoa } from "./modal/modal-xoa/modal-xoa";
import { ModalThemNhanVien } from "./modal/modal-them-nhan-vien/modal-them-nhan-vien";
import { ModalDanhSachNhanVien } from "./modal/modal-danh-sach-nhan-vien/modal-danh-sach-nhan-vien";
import { SettingOutlined } from "@ant-design/icons";
// const dulieu = [
//   {
//     key: "1",
//     tieude: "Thuế theo hệ số quy định",
//     mieuta:
//       "Thuế thu nhập cá nhân áp dụng với người lao động không ký hợp đồng hoặc ký hợp đồng dưới 3 tháng và có từng lần chi trả thu nhập >2 triệu đồng.",
//     caidat:
//       "Theo hệ số cố định dựa trên quy định mới nhất về cách tính thuế thu nhập cá nhân của Nhà nước năm 2021.",
//   },
//   {
//     key: "2",
//     tieude: "Thuế theo luỹ tiền",
//     mieuta:
//       "Thuế thu nhập cá nhân áp dụng với các cá nhân cư trú và ký hợp đồng lao động từ 3 tháng trở lên.",
//     caidat:
//       "Tính theo từng bậc thu nhập, mỗi bậc thu nhập sẽ có một mức thuế suất dựa trên quy định mới nhất về cách tính thuế thu nhập cá nhân của Nhà nước năm 2021.",
//   },
//   {
//     key: "3",
//     tieude: "Thuế",
//     mieuta:
//       "Thuế thu nhập cá nhân áp dụng với người lao động không ký hợp đồng hoặc ký hợp đồng dưới 3 tháng và có từng lần chi trả thu nhập >2 triệu đồng.",
//     caidat:
//       "Theo hệ số cố định dựa trên quy định mới nhất về cách tính thuế thu nhập cá nhân của Nhà nước năm 2021.",
//   },
//   {
//     key: "4",
//     tieude: "mới",
//     mieuta: "ok",
//     caidat: "ok",
//   },
// ];
export const ChinhSachThue = ({
  listTax,
  listEmp,
}: {
  listTax: any;
  listEmp: any;
}) => {
  const [modalChinhSua, setModalChinhSua] = useState(false);
  const [modalXoa, setModalXoa] = useState(false);
  const [modalThemNV, setModalThemNV] = useState(false);
  const [modalKey, setModalKey] = useState("");
  const [name, setName] = useState("");
  const [modalDanhSachNhanVien, setModalDanhSachNhanVien] = useState(false);
  const [taxSelected, setTaxSelected]: any = useState({});
  const [data, setData] = useState([
    {
      cl_id: "1",
      cl_name: "Thuế theo hệ số quy định",
      cl_note:
        "Thuế thu nhập cá nhân áp dụng với người lao động không ký hợp đồng hoặc ký hợp đồng dưới 3 tháng và có từng lần chi trả thu nhập >2 triệu đồng.",
      TinhluongFormSalary: [
        {
          fs_repica:
            "Theo hệ số cố định dựa trên quy định mới nhất về cách tính thuế thu nhập cá nhân của Nhà nước năm 2021.",
        },
      ],
    },
    {
      cl_id: "2",
      cl_name: "Thuế theo luỹ tiền",
      cl_note:
        "Thuế thu nhập cá nhân áp dụng với các cá nhân cư trú và ký hợp đồng lao động từ 3 tháng trở lên.",
      TinhluongFormSalary: [
        {
          fs_repica:
            "Tính theo từng bậc thu nhập, mỗi bậc thu nhập sẽ có một mức thuế suất dựa trên quy định mới nhất về cách tính thuế thu nhập cá nhân của Nhà nước năm 2021.",
        },
      ],
    },
    ...(listTax?.tax_list_detail || []),
  ]);

  const DuLieu = (
    key: String,
    tieude: String,
    mieuta: String,
    caidat: String,
    data: any
  ) => {
    if (key === "1" || key === "2") {
      return (
        <Col xl={8} sm={12} xs={24} style={{ margin: "0 0 20px 0" }}>
          <Card
            title={
              <h2 className={styles.tit} style={{ color: "#fff" }}>
                {tieude}
              </h2>
            }
            bordered={true}
            extra={titleModal2(data, tieude)}
            className={`cardthue`}
          >
            <div className={styles.mieuta}>
              <div className={styles.hang}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.379 8.44975L11.7184 15.1105C11.2734 15.5554 10.7067 15.8588 10.0896 15.9822L7.50042 16.5L8.01826 13.9108C8.14167 13.2937 8.44497 12.727 8.88994 12.282L15.5506 5.62132M18.379 8.44975L19.3734 7.45538C19.9957 6.83298 19.9957 5.82387 19.3734 5.20148L18.7988 4.62695C18.1764 4.00455 17.1673 4.00455 16.5449 4.62695L15.5506 5.62132M18.379 8.44975L15.5506 5.62132"
                      stroke="#474747"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 20H19"
                      stroke="#474747"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className={styles.noidung}>Miêu tả</p>
              </div>
              <p className={styles.noidung}>{mieuta}</p>
            </div>
            <div className={styles.mieuta}>
              <div className={styles.hang}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H18C19.1046 16 20 15.1046 20 14V12"
                      stroke="#474747"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18 3V6M18 9V6M18 6H15M18 6H21"
                      stroke="#474747"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 16V20"
                      stroke="#474747"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 20H16"
                      stroke="#474747"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className={styles.noidung}>Cách tính</p>
                <br />
              </div>
              <p className={styles.noidung}>{caidat}</p>
            </div>
          </Card>
        </Col>
      );
    }
    return (
      <Col xl={8} sm={12} xs={24} style={{ margin: "0 0 20px 0" }}>
        <Card
          title={
            <h2 className={styles.tit} style={{ color: "#fff" }}>
              {tieude}
            </h2>
          }
          bordered={true}
          extra={titleModal(data, tieude)}
        >
          <div className={styles.mieuta}>
            <div className={styles.hang}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18.379 8.44975L11.7184 15.1105C11.2734 15.5554 10.7067 15.8588 10.0896 15.9822L7.50042 16.5L8.01826 13.9108C8.14167 13.2937 8.44497 12.727 8.88994 12.282L15.5506 5.62132M18.379 8.44975L19.3734 7.45538C19.9957 6.83298 19.9957 5.82387 19.3734 5.20148L18.7988 4.62695C18.1764 4.00455 17.1673 4.00455 16.5449 4.62695L15.5506 5.62132M18.379 8.44975L15.5506 5.62132"
                    stroke="#474747"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 20H19"
                    stroke="#474747"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p className={styles.noidung}>Miêu tả</p>
            </div>
            <p className={styles.noidung}>{mieuta}</p>
          </div>
          <div className={styles.mieuta}>
            <div className={styles.hang}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H18C19.1046 16 20 15.1046 20 14V12"
                    stroke="#474747"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 3V6M18 9V6M18 6H15M18 6H21"
                    stroke="#474747"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16V20"
                    stroke="#474747"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 20H16"
                    stroke="#474747"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p className={styles.noidung}>Cách tính</p>
              <br />
            </div>
            <p className={styles.noidung}>{caidat}</p>
          </div>
        </Card>
      </Col>
    );
  };

  const Muc = () => (
    <div className={styles.khung}>
      {data &&
        data?.map((tax) =>
          DuLieu(
            tax?.cl_id,
            tax?.cl_name,
            tax?.cl_note,
            tax?.TinhluongFormSalary.map((ct) => `${ct?.fs_repica} `),
            tax
          )
        )}
    </div>
  );

  const ItemDropdown = (title: String, key: any, record: any, name: any) => {
    const [color1, setColor1] = useState("#474747");
    const [color2, setColor2] = useState("#474747");
    const [color3, setColor3] = useState("#474747");
    const [color4, setColor4] = useState("#474747");
    if (key === "4")
      return (
        <a
          className={styles.DropdownDel}
          onClick={() => {
            setTaxSelected(record);
            setModalXoa(true);
          }}
          onMouseOver={() => setColor4("#FF5B4D")}
          onMouseOut={() => setColor4("#474747")}
        >
          <div className={styles.xoa}>
            <div>
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
                  stroke-linecap="round"
                />
                <path
                  d="M14 15.5137L14 12.5137"
                  stroke={color4}
                  stroke-linecap="round"
                />
                <path
                  d="M3 7.51367H21V7.51367C20.0681 7.51367 19.6022 7.51367 19.2346 7.66591C18.7446 7.8689 18.3552 8.25825 18.1522 8.74831C18 9.11585 18 9.58179 18 10.5137V16.5137C18 18.3993 18 19.3421 17.4142 19.9279C16.8284 20.5137 15.8856 20.5137 14 20.5137H10C8.11438 20.5137 7.17157 20.5137 6.58579 19.9279C6 19.3421 6 18.3993 6 16.5137V10.5137C6 9.58179 6 9.11585 5.84776 8.74831C5.64477 8.25825 5.25542 7.8689 4.76537 7.66591C4.39782 7.51367 3.93188 7.51367 3 7.51367V7.51367Z"
                  stroke={color4}
                  stroke-linecap="round"
                />
                <path
                  d="M10.0681 3.88426C10.1821 3.77795 10.4332 3.684 10.7825 3.617C11.1318 3.54999 11.5597 3.51367 12 3.51367C12.4403 3.51367 12.8682 3.54999 13.2175 3.617C13.5668 3.684 13.8179 3.77795 13.9319 3.88426"
                  stroke={color4}
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            {title}
          </div>
        </a>
      );
    if (key === "3")
      return (
        <a
          className={styles.Dropdown}
          onClick={() => {
            setTaxSelected(record);
            setModalChinhSua(true), setModalKey(record);
          }}
          onMouseOver={() => setColor3("#4C5BD4")}
          onMouseOut={() => setColor3("#474747")}
        >
          <div className={styles.conlai}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0052 10.6245L15.8694 6.7603L17.9908 8.88162L14.1265 12.7459L11.1991 13.552L12.0052 10.6245ZM16.5766 6.05319L18.6979 8.17451L20.0869 6.78545C20.1374 6.69536 20.2274 6.49976 20.2366 6.25334C20.2458 6.00769 20.1821 5.59866 19.6672 5.08384C19.1524 4.56902 18.7434 4.50524 18.4977 4.51445C18.2513 4.5237 18.0557 4.61372 17.9656 4.66413L16.5766 6.05319ZM20.1132 6.75922C20.1141 6.75826 20.1142 6.75818 20.1134 6.75899L20.1132 6.75922ZM17.9921 4.63767C17.9929 4.63685 17.9928 4.63698 17.9918 4.6379L17.9921 4.63767ZM17.285 3.93056C17.3175 3.89806 17.3514 3.86821 17.3901 3.84348C17.6716 3.66377 18.9675 2.96991 20.3743 4.37673C21.7812 5.78355 21.0873 7.07947 20.9076 7.36093C20.8829 7.39967 20.853 7.4336 20.8205 7.4661L14.8336 13.453C14.7112 13.5754 14.559 13.664 14.392 13.71L11.4646 14.5161C10.7165 14.7221 10.029 14.0346 10.235 13.2865L11.0411 10.3591C11.0871 10.1921 11.1756 10.0399 11.2981 9.91744L17.285 3.93056ZM4 6.10896C3.72386 6.10896 3.5 6.33282 3.5 6.60896V20.609C3.5 20.8851 3.72386 21.109 4 21.109H19C19.2761 21.109 19.5 20.8851 19.5 20.609V14.609C19.5 14.3328 19.2761 14.109 19 14.109C18.7239 14.109 18.5 14.3328 18.5 14.609V20.109H4.5V7.10896H10.5C10.7761 7.10896 11 6.88511 11 6.60896C11 6.33282 10.7761 6.10896 10.5 6.10896H4Z"
                fill={color3}
              />
            </svg>
            {title}
          </div>
        </a>
      );
    if (key === "2")
      return (
        <a
          className={styles.Dropdown}
          onClick={() => {
            setTaxSelected(record);
            setModalDanhSachNhanVien(true), setName(name);
          }}
          onMouseOver={() => setColor2("#4C5BD4")}
          onMouseOut={() => setColor2("#474747")}
        >
          <div className={styles.conlai}>
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
              <path d="M9 9.51367H15" stroke={color2} stroke-linecap="round" />
              <path d="M9 13.5137H15" stroke={color2} stroke-linecap="round" />
              <path d="M9 17.5137H13" stroke={color2} stroke-linecap="round" />
            </svg>
            {title}
          </div>
        </a>
      );
    return (
      <a
        className={styles.Dropdown}
        onClick={() => {
          setTaxSelected(record);
          setModalThemNV(true);
        }}
        onMouseOver={() => setColor1("#4C5BD4")}
        onMouseOut={() => setColor1("#474747")}
      >
        <div className={styles.conlai}>
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
              stroke-linecap="round"
            />
          </svg>
          {title}
        </div>
      </a>
    );
  };
  const items = [
    {
      key: "1",
      label: "Thêm nhân viên",
    },
    {
      key: "2",
      label: "Danh sách nhân viên",
    },
    {
      key: "3",
      label: "Chỉnh sửa",
    },
    {
      key: "4",
      label: "Xoá",
    },
  ];
  const Content1 = (record: any, name: any) => {
    return (
      <div className={styles.moduleContent}>
        {items.map((data) => {
          if (data.key === "3") {
            return (
              <>
                {ItemDropdown(data.label, data.key, record, name)}
                <div style={{ borderBottom: "1px solid #C4C4C4" }}></div>
              </>
            );
          }
          return ItemDropdown(data.label, data.key, record, name);
        })}
      </div>
    );
  };
  const Content2 = (record: any, name: any) => {
    return (
      <div className={styles.moduleContent}>
        {items.map((data) => {
          if (data.key < "3") {
            return <>{ItemDropdown(data.label, data.key, record, name)}</>;
          }
        })}
      </div>
    );
  };
  const titleModal = (data: any, dataname: any): React.ReactNode => (
    <div className={styles.bodyCell}>
      <Popover content={Content1(data, dataname)}>
        <div style={{ marginTop: "10px" }}>
          <SettingOutlined style={{ color: "#fff", fontSize: "20px" }} />
        </div>
      </Popover>
    </div>
  );
  const titleModal2 = (data: any, dataname: any): React.ReactNode => (
    <div className={styles.bodyCell}>
      <Popover content={Content2(data, dataname)}>
        <div style={{ marginTop: "10px" }}>
          <SettingOutlined style={{ fontSize: "20px", color: "#fff" }} />
        </div>
      </Popover>
    </div>
  );

  return (
    <Row gutter={24}>
      <Muc />
      {ModalChinhSua(modalChinhSua, setModalChinhSua, setModalKey, taxSelected)}
      {ModalXoa(modalXoa, setModalXoa, taxSelected)}
      {ModalThemNhanVien(
        modalThemNV,
        setModalThemNV,
        listEmp?.items,
        taxSelected
      )}
      {ModalDanhSachNhanVien(
        modalDanhSachNhanVien,
        setModalDanhSachNhanVien,
        name,
        taxSelected,
        listEmp?.items
      )}
    </Row>
  );
};
