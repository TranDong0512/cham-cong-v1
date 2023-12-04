import { Modal, Input, Select, Button, Form, List, Checkbox, Tabs } from "antd";
import styles from "./modal-them-nhan-vien.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Search } from "../../../danh-sach-nhan-su-chua-thiet-lap/anh";
import { DanhSachNhanVien } from "./tab-nhan-vien/tab-nhan-vien";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import moment from "moment";
const { TextArea } = Input;
export function ModalThemNhanVien(
  open: boolean,
  setOpen: Function,
  listEmp: any,
  taxSelected: any
) {
  const [listNoTax, setListNoTax] = useState([]);
  const [listFilter, setListFilter] = useState([]);

  useEffect(() => {
    const getListNoTax = async () => {
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/show_list_user_no_tax", {
        cls_id_com: com_id,
        start_date: `${moment().year()}-01-01`,
        end_date: `${moment().year()}-12-31`,
      });

      if (res?.data === true) {
        setListNoTax(res?.listUserFinal);
        setListFilter(res?.listUserFinal);
      }
    };
    getListNoTax();
  }, []);

  const tabList = [
    {
      key: "1",
      label: "Nhân viên",
      children: (
        <DanhSachNhanVien listEmp={listFilter} taxSelected={taxSelected} />
      ),
    },
    // {
    //     key:'2',
    //     label:'Nhóm',
    //     children:<DanhSachNhom/>
    // }
  ];
  const [checkButton, setCheckButton] = useState("1");
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
        <div className={styles.textHead}>Thêm nhân viên</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Input
          className={styles.nameCT}
          placeholder="Nhập từ cần tìm"
          type="text"
          prefix={<Search />}
          onChange={(e) => {
            const kw = e.target.value?.toLowerCase();

            setListFilter(
              kw
                ? listNoTax?.filter((item) =>
                    item?.userName?.toLowerCase()?.includes(kw)
                  )
                : listNoTax
            );
          }}
        />
        <Tabs
          className={`tab_themNhanVienPhucLoi ${styles.tab}`}
          items={tabList}
          onChange={(activekey) => setCheckButton(activekey)}
        />
      </div>
    </Modal>
  );
}
