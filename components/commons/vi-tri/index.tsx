import instance from "@/components/hooks/axios.config";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { getCompIdCS } from "@/pages/api/BaseApi";
import { positions } from "../constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";

export default function SelectPositionsCustomize({
  initialData,
  setDataTable,
  setPosition_id,
}) {
  const com_id = getCompIdCS();
  const [listPositions, setListPositions] = useState([]);
  const [valueSelect, setValueSelect] = useState();
  useEffect(() => {
    let data = {
      com_id: com_id,
    };
    const fetcher = async () => {
      return await instance.post(positions.listAll, data);
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();
        const newData = data?.data?.data?.data?.map((item) => ({
          key: item.level,
          label: item?.positionName,
          value: item?.id,
        }));
        setListPositions(newData);
      } catch (err) {
        console.error(err);
      }
    };
    unFollow();
  }, []);
  const handleSelectPosition = async (e) => {
    setPosition_id(e);
    setValueSelect(e);
    const items = listPositions.filter((item) => item.value === Number(e));
    const listOrganizeDetailName = initialData?.filter(
      (item) => item.positionName === items[0]?.label
    );
    setDataTable(listOrganizeDetailName);
  };
  return (
    <div>
      <span>Vị trí</span>
      <div className="mt-8">
        <Select
          placeholder="Chọn"
          style={{
            width: "100%",
          }}
          onSelect={handleSelectPosition}
          value={valueSelect}
          allowClear
          showSearch
          onClear={() => {
            setDataTable ? setDataTable(initialData) : null;
            setPosition_id(null);
            setValueSelect(null);
          }}
          filterOption={(input, option: any) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          size="large"
          options={listPositions}
        />
      </div>
    </div>
  );
}
