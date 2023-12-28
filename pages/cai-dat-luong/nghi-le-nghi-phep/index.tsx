import { Card, Tabs } from "antd";
import { CpmNghiSaiQuyDinh } from "@/components/cai-dat-luong/nghi-le-nghi-phep/nghi-sai-quy-dinh/nghi-sai-quy-dinh";
import { CpmDanhSachNghiSaiQuyDinh } from "@/components/cai-dat-luong/nghi-le-nghi-phep/danh-sach-nghi-sai-quy-dinh/danh-sach-nghi-sai-quy-dinh";

import _, { set } from "lodash";
import { useState } from "react";
import { Cpmnghiphep } from "@/components/cai-dat-luong/nghi-le-nghi-phep/danh-sach-nghi-co-phep";

export default function DiMuonVeSom() {
  const KEY_TL = "key_tl";
  const [key, setKey] = useState(window.localStorage.getItem(KEY_TL) || "1");
  const [keyChildren, setKeyChildren] = useState("");

  const tabItems = [
    {
      key: "1",
      label: "Cài đặt nghỉ sai quy định",
      children: <CpmNghiSaiQuyDinh />,
    },
    {
      key: "2",
      label: "Danh sách nghỉ sai quy định",
      children: <CpmDanhSachNghiSaiQuyDinh keyChildren={keyChildren} />,
    },
    {
      key: "3",
      label: "Danh sách nghỉ có phép",
      children: <Cpmnghiphep keyChildren={keyChildren} />,
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
