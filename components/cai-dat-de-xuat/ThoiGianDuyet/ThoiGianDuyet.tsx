import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Tabs1 from "./contentTabs/tabs1";
import Tabs2 from "./contentTabs/tabs2";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Thời gian duyệt đề xuất có kế hoạch",
    children: <Tabs1 />,
  },
  {
    key: "2",
    label: "Thời gian duyệt đề xuất đột xuất",
    children: <Tabs2 />,
  },
];
export default function ThoiGianDuyet() {
  return (
    <div>
      <div className="mt-16">
        <Tabs items={items} centered />
      </div>
    </div>
  );
}
