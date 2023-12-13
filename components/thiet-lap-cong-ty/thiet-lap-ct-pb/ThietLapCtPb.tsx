import React, { useEffect, createContext, useState } from "react";
import ThongTinCongTy from "./Drawer/congty/modal-thong-tin-cong-ty-chi-tiet";
import styles from "./ctpb.module.scss";
import { Tabs } from "antd";
import { Drawer } from "antd";
export const DiagramContext = createContext({});
import type { TabsProps } from "antd";
import ThongTinPhongBan from "./Drawer/modal-thong-tin-pb";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import ThongTinNhanVien from "./Drawer/nhan-vien/modal-thong-tin-nv";
import { setOpenDrawer } from "@/redux/reducer/thiet_lap_cong_ty";
import ThietLapViTri from "./thiet-lap-vi-tri";
import ThietLapCoCauToChuc from "./thiet-lap-co-cau-to-chuc";
import { setTabsPosition } from "@/redux/reducer/white-list";

export default function ThietLapCtPb() {
  const openModalCompany = useSelector(
    (state: RootState) => state.setup.openModalCompany
  );
  const openModalDrawer = useSelector(
    (state: RootState) => state.setup.openDrawer
  );
  const openModalDepartment = useSelector(
    (state: RootState) => state.setup.openModalDepartment
  );
  const openModalUser = useSelector(
    (state: RootState) => state.setup.openModalUser
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setOpenDrawer(!openModalDrawer));
  };
  const activeTabs = useSelector(
    (state: RootState) => state.white_list.tabsPosition
  );
  const handleChange = (e) => {
    dispatch(setTabsPosition(e));
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thiết lập cơ cấu tổ chức",
      children: <ThietLapCoCauToChuc />,
    },
    {
      key: "2",
      label: "Vị trí",
      children: <ThietLapViTri />,
    },
  ];

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          color: "#000",
          marginBottom: "-56px",
        }}
        className={styles.title}
      >
        Chế độ xem :
      </div>
      <Tabs
        defaultActiveKey={activeTabs}
        items={items}
        centered
        size="large"
        onChange={handleChange}
      />

      <Drawer
        closeIcon={false}
        placement="right"
        onClose={onClose}
        width={600}
        open={openModalDrawer}
      >
        {openModalCompany ? <ThongTinCongTy /> : <></>}
        {openModalDepartment ? <ThongTinPhongBan /> : <></>}
        {openModalUser ? <ThongTinNhanVien /> : <></>}
      </Drawer>
    </>
  );
}
