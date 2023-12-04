import { SearchOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";

export default function SearchIdUserCustomize({
    initialData,
    setDataTable,
    setNameUser,
}) {
    const onChange = (e) => {
        console.log(e);
        // const newValue = e.target.value;
        // if (newValue === "") {
        //     setNameUser(null);
        // } else {
        //     setNameUser(newValue);
        // }
        // let filteredData = initialData.filter((data) => {
        //     return data?.userName
        //         .toLowerCase()
        //         .includes(newValue.toLowerCase());
        // });
        // setDataTable(filteredData);
    };
    return (
        <div>
            <span>ID</span>
            <div className="mt-8">
                <InputNumber
                    size="large"
                    prefix={<SearchOutlined rev={"xxx"} />}
                    onChange={onChange}
                    placeholder="Tìm kiếm"
                    style={{
                        width: "100%",
                    }}
                />
            </div>
        </div>
    );
}
