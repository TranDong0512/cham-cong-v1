import React, { createContext, useState } from "react";

import { Tabs } from "antd";

export const DiagramContext = createContext({});

import type { TabsProps } from "antd";

import ThemCoCau from "./modal/them-co-cau";
import TableContent from "./content/table";
import TreeNodeContent from "./content/treeNode";

export default function ChiTiet() {
    const item: TabsProps["items"] = [
        {
            key: "1",
            label: "Sơ đồ dạng cây",
            children: <TreeNodeContent />,
        },
        {
            key: "2",
            label: "Sơ đồ dạng bảng",
            children: <TableContent />,
        },
    ];

    const [openModalAddNewRank, setOpenModalAddNewRank] = useState(false);
    const handleCloseModalAddNewRank = () => {
        setOpenModalAddNewRank(false);
    };

    return (
        <div>
            <div id="ThietLapCtPb">
                <div className="flex flex-space-between">
                    <div
                        style={{
                            backgroundColor: "#4c5bd4",
                        }}
                        onClick={() => setOpenModalAddNewRank(true)}
                        className="w-140px mb-16  font-size-14 text-align-center p-12 border-radius-4 color-white cursor-pointer"
                    >
                        Thêm tổ chức
                    </div>
                </div>
                <ThemCoCau
                    open={openModalAddNewRank}
                    close={handleCloseModalAddNewRank}
                />
                <Tabs defaultActiveKey="1" items={item} />
            </div>
        </div>
    );
}
