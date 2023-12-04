import { Modal, Input, Select, Button, Form, List, Checkbox, Tabs } from "antd";
import styles from "./modal-danh-sach-nhan-vien.module.css";
import Image from "next/image";
import { values } from "lodash";
import React, { useState, useEffect } from "react";
const { TextArea } = Input;
import { DanhSachNhanVien } from "./danh-sach-nhan-vien/danh-sach-nhan-vien";
import { DanhSachNhom } from "./danh-sach-nhom/danh-sach-nhom";
import { ModalThemNhanVien } from "./danh-sach-nhan-vien/them-nhan-vien/them-nhan-vien";
import { ModalThemMoiNhomThue } from "./danh-sach-nhom/modal/them-nhom-thue/them-nhom-thue";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
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
const datanhom = [
  {
    key: "1",
    namenhom: "FullTime",
    songuoi: "80 nguoi",
    apdung: "Thang sau 2023",
    denthang: "chua cap nhat",
    tienthue: "500000",
  },
  {
    key: "2",
    namenhom: "FullTime",
    songuoi: "80",
    apdung: "Thang sau 2023",
    denthang: "chua cap nhat",
    tienthue: "500000",
  },
  {
    key: "3",
    namenhom: "FullTime",
    songuoi: "80",
    apdung: "Thang sau 2023",
    denthang: "chua cap nhat",
    tienthue: "500000",
  },
];
export function ModalDanhSachNhanVien(
  open: boolean,
  setOpen: Function,
  title: any,
  taxSelected: any,
  listEmpX: any
) {
  const [modalThemNhanVien, setModalThemNhanVien] = useState(false);
  const [modalThemNhomThue, setModalThemNhomThue] = useState(false);
  const [modalKey, setModalKey] = useState("");
  const [checkButton, setCheckButton] = useState("1");
  const [listEmp, setListEmp]: any[] = useState([]);
  const info = listEmpX?.items?.map((emp, index) => {
    return {
      key: `${index + 1}`,
      name: emp?.userName,
      id: emp?.idQLC,
      url: emp?.avatarUser,
    };
  });

  useEffect(() => {
    if (taxSelected?.cl_id) {
      let com_id = null;
      com_id = getCompIdCS();
      com_id !== null &&
        POST_TL("api/tinhluong/congty/take_list_nv_tax", {
          com_id: com_id,
          cls_id_cl: taxSelected?.cl_id,
        }).then((res) => {
          if (res?.message === "success") {
            setListEmp(
              res?.listUserFinal.map((e, index) => {
                const detailsTax = res?.listUserClass?.find(
                  (item) => item?.cls_id_user === e?.idQLC
                );

                return {
                  key: index,
                  url: e?.avatarUser ? `/${e?.avatarUser}` : "/avatar.png",
                  name: e?.userName,
                  id: e?.idQLC,
                  apdung: moment(detailsTax?.cls_day).format("YYYY-MM"),
                  denthang: moment(detailsTax?.cls_day_end).format("YYYY-MM"),
                  tienthue: `${detailsTax?.cls_salary}`,
                  ...detailsTax,
                };
              })
            );
          }
        });
    }
  }, [taxSelected]);

  const tabList = [
    {
      key: "1",
      label: `Nhân viên (${listEmp.length})`,
      children: (
        <DanhSachNhanVien listEmp={listEmp} taxSelected={taxSelected} />
      ),
    },
    // {
    //   key: "2",
    //   label: `Nhóm (${datanhom.length})`,
    //   children: <DanhSachNhom />,
    // },
  ];
  const checklabel = (key: any) => {
    if (key === "1") return "nhân viên";
    return "nhóm";
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={1200}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.modal}>
        <div className={styles.khungtitle}>
          <div className={styles.khungtitle1}>
            <div>
              <p className={styles.title}>{title}</p>
              <p className={styles.noidungtitle}>
                Danh sách {checklabel(checkButton)} thuế
              </p>
            </div>
          </div>
        </div>
        <div>
          <Tabs
            className={`tab_themNhanVienPhucLoi ${styles.tab}`}
            items={tabList}
            onChange={(activekey) => setCheckButton(activekey)}
          />
        </div>
        {ModalThemNhanVien(
          modalThemNhanVien,
          setModalThemNhanVien,
          modalKey,
          info,
          taxSelected
        )}
        {ModalThemMoiNhomThue(
          modalThemNhomThue,
          setModalThemNhomThue,
          modalKey
        )}
      </div>
    </Modal>
  );
}
