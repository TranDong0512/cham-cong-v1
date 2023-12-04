import React, { useState } from "react";
import { Button, Card, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChinhSachThue } from "@/components/cai-dat-luong/cai-dat-thue/chinh-sach-thue/chinh-sach-thue";
import styles from "./index.module.css";
import { ChuaDuyet } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/danh-sach-nhan-su";
import { DaDuyet } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su";
import { ModalThemThue } from "@/components/cai-dat-luong/cai-dat-thue/chinh-sach-thue/modal/model";
import { POST_SS, POST_SS_TL, POST_TL, getCompIdSS } from "@/pages/api/BaseApi";
import { removeVietnameseTones } from "@/constants/style-constants";
import moment from "moment";

export default function CaiDatThue({
  listTax,
  listEmpNoTax,
  listEmpHasTax,
  listDepartments,
  listEmp,
}) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [checkButton, setCheckButton] = useState("1");
  // const [comLabel, setComLabel]: any = useState({ label: infoCom?.data?.userName, value: infoCom?.data?.idQLC })
  const [listDepLabel, setListDepLabel]: any[] = useState([]);
  const [listEmpLabel, setListEmpLabel]: any[] = useState(
    listEmp?.items?.map((emp) => ({
      label: `${emp?.ep_id} - ${emp?.ep_name}`,
      value: emp?.ep_id,
      labelNoVN: removeVietnameseTones(`${emp?.ep_id} - ${emp?.ep_name}`),
    }))
  );
  const tabList = [
    {
      key: "1",
      label: "Chính sách thuế",
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <button className={styles.space1} onClick={() => setModalAdd(true)}>
              <div className={styles.chu1}>+</div>
              <div className={styles.chu2}>Thêm mới</div>
            </button>
          </div>
          <ChinhSachThue listTax={listTax} listEmp={listEmp} />
        </>
      ),
    },
    {
      key: "2",
      label: "Danh sách nhân sự chưa thiết lập",
      bt: "",
      children: (
        <ChuaDuyet
          listEmpNoTax={listEmpNoTax}
          listDepLabel={listDepLabel}
          listTax={listTax}
        />
      ),
    },
    {
      key: "3",
      label: "Danh sách nhân sự đã thiết lập",
      bt: "",
      children: (
        <DaDuyet
          listEmpHasTax={listEmpHasTax}
          listDepLabel={listDepLabel}
          listEmpLabel={listEmpLabel}
          listTax={listTax}
        />
      ),
    },
  ];
  return (
    <div>
      <Card>
        <Tabs
          items={tabList}
          onChange={(activekey) => setCheckButton(activekey)}
          className={`tab_caidatthue ${styles.tab}`}
          tabBarExtraContent={
            <button
              className={styles.space2}
              onClick={() => setModalAdd(true)}
              style={{ display: checkButton === "1" ? "flex" : "none" }}
            >
              <div className={styles.chu1}>+</div>
              <div className={styles.chu2}>Thêm mới</div>
            </button>
          }
        />

        {ModalThemThue(modalAdd, setModalAdd, setModalNext)}
      </Card>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);

  const res = await Promise.all([
    POST_SS_TL(
      "api/tinhluong/congty/takeinfo_tax_com",
      {
        com_id: com_id,
      },
      context
    ),
    POST_SS_TL(
      "api/tinhluong/congty/show_list_user_tax",
      {
        start_date: `${moment().year()}-01-01T00:00:00.000+00:00`,
        end_date: `${moment().year()}-12-31T00:00:00.000+00:00`,
        cls_id_com: com_id,
      },
      context
    ),
    POST_SS_TL(
      "api/tinhluong/congty/show_list_user_no_tax",
      {
        cls_id_com: com_id,
        start_date: `${moment().year()}-01-01`,
        end_date: `${moment().year()}-12-31`,
      },
      context
    ),
    POST_SS(
      "api/qlc/department/list",
      {
        com_id: com_id,
      },
      context
    ),
    POST_SS(
      "api/qlc/managerUser/list",
      {
        com_id: com_id,
      },
      context
    ),
  ]);

  return {
    props: {
      listTax: res[0],
      listEmpNoTax: res[2],
      listEmpHasTax: res[1],
      listDepartments: res[3],
      listEmp: res[4],
    },
  };
};
