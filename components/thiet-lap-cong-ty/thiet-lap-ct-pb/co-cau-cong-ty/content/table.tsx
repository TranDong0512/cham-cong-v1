import React, { useEffect, useState } from "react";
import { Collapse, Table } from "antd";
import instance from "@/components/hooks/axios.config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import Constant from "../../../constant/constant";

export default function TableContent() {
    const [data, setData] = useState<any>();
    const isLoad = useSelector((state: RootState) => state.setup.update);

    useEffect(() => {
        const fetch = async () => {
            return await instance.post(Constant.settingOrganize_list);
        };
        const unFollow = async () => {
            try {
                const data = await fetch();
                setData(data?.data?.data?.data);
            } catch (err) {
                alert("Error: " + err?.response?.data?.error?.message);
            }
        };
        unFollow();
    }, [isLoad]);
    const columns = [
        {
            title: "",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "",
            dataIndex: "",
            key: "actions",
            width: "30px",
        },
    ];
    const items = data?.children?.map((data, index) => ({
        key: index,
        label: data.name,
        children: (
            <div>
                <Table
                    columns={columns}
                    dataSource={data.children?.map((data, index) => ({
                        ...data,
                        key: index,
                    }))}
                    pagination={false}
                    showHeader={false}
                />
            </div>
        ),
    }));
    return (
        <div>
            {" "}
            <Collapse
                items={items}
                bordered={false}
                style={{
                    backgroundColor: "transparent",
                }}
            />
        </div>
    );
}
