import React, { useState } from "react";
import { Button, Tabs } from "antd";
import DeXuat from "./DeXuat";
import NhanVien from "./NhanVien";
import { Typography } from "antd";
import checkRoleAdmin from "@/components/check-role";
import styles from "../stylesTabs/styles.module.scss";
const { Text } = Typography;

export default function CaiDatDeXuat() {
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
            children: <DeXuat />,
        },
        {
            key: "2",
            children: <NhanVien />,
        },
    ];
    return (
        <div>
            {isAdmin ? (
                <div>
                    <div className={styles.button_top}>
                        <Button
                            onClick={() => handleTabChange("1")}
                            className={`${isButtonCustom("1")
                                ? styles.button_styles_custom
                                : styles.button_styles_default
                                } ${styles.button}`}
                        >
                            <div style={{ padding: "0 18px", width: "90px", display: "flex", justifyContent: "center", alignItems: "center" }}>Đề xuất</div>
                        </Button>
                        <Button
                            onClick={() => handleTabChange("2")}
                            className={`${isButtonCustom("2")
                                ? styles.button_styles_custom
                                : styles.button_styles_default
                                } ${styles.button}`}
                        >
                            <div style={{ padding: "0 18px", width: "90px", display: "flex", justifyContent: "center", alignItems: "center" }}>Nhân viên</div>
                        </Button>
                    </div>
                    <Tabs
                        activeKey={currentTabKey}
                        onChange={handleTabChange}
                        destroyInactiveTabPane={true}
                    >
                        {items.map((item) => (
                            <Tabs.TabPane key={item.key}>
                                {item.children}
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </div>
            ) : (
                <div>
                    {/* <LuanChuyenPhongBan setAllUser={setAllUser} /> */}
                </div>
            )}
        </div>
    );
}
