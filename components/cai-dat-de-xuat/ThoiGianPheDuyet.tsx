import React, { useState } from "react";
import { Button, Tabs } from "antd";
import SoCapDuyet from "./SoCapDuyet/SoCapDuyet";
import HinhThucDuyet from "./HinhThucDuyet/HinhThucDuyet";
import ThoiGianDuyet from "./ThoiGianDuyet/ThoiGianDuyet";
import { Typography } from "antd";
import checkRoleAdmin from "@/components/check-role";
import styles from "../stylesTabs/styles.module.scss";
const { Text } = Typography;

export default function ThoiGianPheDuyet() {
  const isAdmin = checkRoleAdmin();
  const [currentTabKey, setCurrentTabKey] = useState("1");
  const [selectedButton, setSelectedButton] = useState("1");
  const isButtonCustom = (key) => key === selectedButton;

  const handleTabChange = (key) => {
    setCurrentTabKey(key);
    setSelectedButton(key);
  };

  const items = [
    {
      key: "1",
      children: <SoCapDuyet />,
    },
    {
      key: "2",
      children: <HinhThucDuyet />,
    },
  ];
  return (
    <div>
      {isAdmin ? (
        <div>
          <div className={styles.button_top}>
            <Button
              onClick={() => handleTabChange("1")}
              className={`${
                isButtonCustom("1")
                  ? styles.button_styles_custom
                  : styles.button_styles_default
              } ${styles.button}`}
            >
              <div style={{ padding: "0 24px" }}>Đề xuất</div>
            </Button>
            <Button
              onClick={() => handleTabChange("2")}
              className={`${
                isButtonCustom("2")
                  ? styles.button_styles_custom
                  : styles.button_styles_default
              } ${styles.button}`}
            >
              <div style={{ padding: "0 24px" }}>Nhân viên</div>
            </Button>
          </div>
          <Tabs
            activeKey={currentTabKey}
            onChange={handleTabChange}
            destroyInactiveTabPane={true}
          >
            {items.map((item) => (
              <Tabs.TabPane key={item.key}>{item.children}</Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      ) : (
        <div>{/* <LuanChuyenPhongBan setAllUser={setAllUser} /> */}</div>
      )}
    </div>
  );
}
