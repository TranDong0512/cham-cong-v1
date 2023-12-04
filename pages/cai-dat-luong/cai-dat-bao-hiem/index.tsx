import styles from "./index.module.css";
import { useState } from "react";
import { Card, Tabs, Button } from "antd";
import { ChinhSachBaoHiem } from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/chinh-sach-bao-hiem";
import { DanhSachNhanSuChuaThietLap } from "@/components/cai-dat-luong/cai-dat-bao-hiem/danh-sach-nhan-su-chua-thiet-lap/danh-sach-nhan-su-chua-thiet-lap";
import { DanhSachNhanSuDaThietLap } from "@/components/cai-dat-luong/cai-dat-bao-hiem/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su-da-thiet-lap";
import {
  ModalCongThuc,
  ModalThemMoiChinhSachBaoHiem,
} from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/modal-them-moi-bao-hiem/modal-them-moi-chinh-sach-bao-hiem";
import { POST, POST_SS, POST_SS_TL, getCompIdSS } from "@/pages/api/BaseApi";
import moment from "moment";
import { removeVietnameseTones } from "@/constants/style-constants";

export default function CaiDatBaoHiem({
  listInsurance,
  listEmp,
  // listUserNoInsrc,
  listUserInsrc,
}) {
  const [selectedKey, setSelectedKey] = useState("1");
  const [modalAdd, setModalAdd] = useState(false);

  const [listEmpLabel, setListEmpLabel]: any = useState(
    listEmp?.list?.map((e) => ({
      label: `${e?.idQLC} - ${e?.userName}`,
      value: e?.idQLC,
      labelNoVN: removeVietnameseTones(`${e?.idQLC} - ${e?.userName}`),
    }))
  );

  const KEY_TL = "key_tl";
  const [key, setKey] = useState(window.localStorage.getItem(KEY_TL) || "1");
  const handleTabSelect = (key: string) => {
    setSelectedKey(key);
  };
  const LIST_TABS = [
    {
      key: "1",
      label: (
        <div className={styles.labelTabs}>
          <p>Chính sách bảo hiểm</p>
        </div>
      ),
      children: (
        <ChinhSachBaoHiem listInsurance={listInsurance} listEmp={listEmp} />
      ),
    },
    {
      key: "2",
      label: (
        <div className={styles.labelTabs}>Danh sách nhân sự chưa thiết lập</div>
      ),
      children: (
        <DanhSachNhanSuChuaThietLap
          onChangeKey={handleTabSelect}
          listDepLabel={[]}
          listEmpLabel={listEmpLabel}
        />
      ),
    },
    {
      key: "3",
      label: (
        <div className={styles.labelTabs}>Danh sách nhân sự đã thiết lập</div>
      ),
      children: (
        <DanhSachNhanSuDaThietLap
          listDepLabel={[]}
          listEmpLabel={listEmpLabel}
        />
      ),
    },
  ];

  const renderExtraButton = () => {
    if (selectedKey == "1") {
      return (
        <div className={styles.buttonPlus}>
          <Button
            className={`${styles.extraBTn}`}
            onClick={() => {
              setModalAdd(true);
            }}
          >
            <div className={styles.plus}>+</div>
            <div className={styles.buttonPlusText}>Thêm mới</div>
          </Button>
        </div>
      );
    }
    return null;
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Card className={styles.card}>
        <Tabs
          items={LIST_TABS}
          onChange={(key) => window.localStorage.setItem(KEY_TL, key)}
          tabBarExtraContent={renderExtraButton()}
          className={"cai-dat-bao-hiem"}
        />
      </Card>
      {ModalThemMoiChinhSachBaoHiem(modalAdd, setModalAdd)}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);

  const start_date = moment().year() + "-01-01T00:00:00.000+00:00";
  const end_date =
    moment().year() + "-" + (moment().month() + 1) + "-01T00:00:00.000+00:00";

  const res = await Promise.all([
    POST_SS_TL(
      "api/tinhluong/congty/takeinfo_insrc",
      { cl_com: com_id },
      context
    ),
    POST_SS(
      "api/qlc/employee/listEmpSimpleNoToken",
      {
        com_id: com_id,
      },
      context
    ),
    // POST_SS_TL(
    //   "api/tinhluong/congty/show_list_user_noinsrc",
    //   {
    //     start_date: start_date,
    //     end_date: end_date,
    //     cls_id_com: com_id,
    //   },
    //   context
    // ),
    // POST_SS_TL(
    //   "api/tinhluong/congty/show_list_user_insrc",
    //   {
    //     start_date: start_date,
    //     end_date: end_date,
    //     cls_id_com: com_id,
    //   },
    //   context
    // ),
  ]);

  return {
    props: {
      listInsurance: res[0],
      listEmp: res[1],
      // listUserNoInsrc: res[2],
      // listUserInsrc: res[2],
    },
  };
};
