import { Card, Tabs } from "antd";
import { CpmDiMuonVeSom } from "@/components/cai-dat-luong/di-muon-ve-som/di-muon-ve-som";
import { CpmCaiDatDiMuonVeSom } from "@/components/cai-dat-luong/di-muon-ve-som/cai-dat-di-muon-ve-som/cai-dat-di-muon-ve-som";

import _, { set } from "lodash";
import { useState } from "react";

export default function DiMuonVeSom() {
  const KEY_TL = "key_tl";
  const [key, setKey] = useState(window.localStorage.getItem(KEY_TL) || "1");
  const [keyChildren, setKeyChildren] = useState("");

  const tabItems = [
    {
      key: "1",
      label: "Cài đặt đi muộn về sớm",
      children: <CpmCaiDatDiMuonVeSom />,
    },
    {
      key: "2",
      label: "Đi muộn về sớm",
      children: <CpmDiMuonVeSom keyChildren={keyChildren} />,
    },
  ];

  return (
    <Card>
      <Tabs
        items={tabItems}
        defaultActiveKey={key}
        onChange={(key) => {
          setKeyChildren(key);
          window.localStorage.setItem(KEY_TL, key);
        }}
      />
    </Card>
  );
}
