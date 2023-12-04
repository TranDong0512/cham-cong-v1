import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";

export default function SearchNameUserCustomize({
  initialData,
  setDataTable,
  setNameUser,
}) {
  const [listNV, setListNV] = useState<any>([]);
  useEffect(() => {
    if (initialData) {
      const arrNv = initialData?.map((item, index) => ({
        ...item,
        key: index + 1,
        value: item.ep_id,
        label: item.userName,
      }));
      setListNV(arrNv);
    }
  }, [initialData]);

  const onChange = (e) => {
    if (e) {
      const items = initialData?.filter((item) => item.ep_id === e);
      setDataTable(items);
    } else {
      setDataTable(initialData);
    }
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <span>Họ và tên</span>
      <div className="mt-8">
        <Select
          placeholder="Chọn nhân viên"
          allowClear={true}
          style={{ width: "100%", height: "39px" }}
          showSearch
          onChange={onChange}
          filterOption={filterOption}
          options={listNV}
        ></Select>
      </div>
    </div>
  );
}
