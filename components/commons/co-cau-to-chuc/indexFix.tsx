import instance from "@/components/hooks/axios.config";
import { Select, Input, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { getCompIdCS } from "@/pages/api/BaseApi";
import SelectPositionsCustomize from "../vi-tri";
import { positions } from "../constant";
import { SearchOutlined } from "@ant-design/icons";
export default function SelectOrganizeCustomize({
  initialData,
  setDataTable,
  setListOrganizeDetailId,
  setNameUser,
  setPosition_id,
  ep_status,
  href,
}) {
  const com_id = getCompIdCS();
  const [listOrganizeType, setListOrganizeType] = useState([]);
  const [organizeType, setOrganizeType] = useState();
  const [select, setSelect] = useState([]);
  const [isSelect1, setIsSelect1] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);

  const [listNV, setListNV] = useState<any>([]);
  useEffect(() => {
    if (initialData) {
      const arrNv = initialData?.map((item, index) => ({
        ...item,
        key: index + 1,
        value: item.ep_id,
        label: `${item.ep_id} - ${item.userName}`,
      }));
      setListNV(arrNv);
    }
  }, [initialData]);
  const [valueInput, setValueInput] = useState();
  useEffect(() => {
    const data_com_id = {
      com_id: com_id,
    };
    const fetcher = async () => {
      return await instance.post("api/qlc/organizeDetail/listAll", data_com_id);
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();
        setListOrganizeType(data?.data?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    unFollow();
  }, []);
  const handleSelectOrganizeType = async (e) => {
    const items = listOrganizeType?.filter((item) => item.id === e);
    setOrganizeType(e);
    setValueSelect(null);
    setListOrganizeDetailId(items[0]?.listOrganizeDetailId);
    const fetcher = async () => {
      return await instance.post(href, {
        ep_status: ep_status,
        listOrganizeDetailId: items[0]?.listOrganizeDetailId,
        pageSize: 10000,
      });
    };
    try {
      const data = await fetcher();
      const newData = data?.data?.data?.data?.map((item, index) => ({
        ...item,
        stt: index + 1,
        key: index,
      }));
      setSelect(newData);
      setDataTable(newData);
    } catch (err) {
      console.error(err);
    }
    setValueInput(null);
    setIsSelect1(true);
  };
  const [dataPos, setDataPos] = useState<any>();
  const dataPosition = (data) => {
    setDataPos(data);
  };
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
    setValueInput(null);
    let data;
    if (isSelect1) {
      data = select;
    } else data = initialData;

    const items = listPositions.filter((item) => item.value === Number(e));
    const listOrganizeDetailName = data?.filter(
      (item) => item.positionName === items[0]?.label
    );
    setIsSelect2(true);
    setDataTable(listOrganizeDetailName);
    dataPosition(listOrganizeDetailName);
  };
  const onChange = (e) => {
    setValueInput(e);
    const newValue = e;
    if (newValue === "" || newValue == undefined) {
      setNameUser(null);
      setDataTable(initialData);
      !isSelect1
        ? setDataTable(initialData)
        : dataPos?.length > 0
        ? setDataTable(dataPos)
        : setDataTable(select);
    } else {
      setNameUser(newValue);

      let data;
      if (isSelect1 || isSelect2) {
        if (dataPos?.length > 0) {
          data = dataPos;
        } else data = select;
      } else data = initialData;

      let filteredData = data?.filter((item) => item.ep_id === e);
      setDataTable(filteredData ? filteredData : initialData);
    }
  };
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8}>
        <span>Tên tổ chức </span>
        <div
          style={{
            border: "1px solid rgb(217, 217, 217)",
            borderRadius: "8px",
          }}
          className="mt-8 flex w-100"
        >
          <Select
            value={organizeType}
            size="large"
            onChange={handleSelectOrganizeType}
            allowClear
            showSearch
            bordered={false}
            onClear={() => {
              setOrganizeType(null);
              setDataTable(initialData);
              setValueSelect(null);
              setListOrganizeDetailId(null);
              setDataPos([]);
              setIsSelect1(false);
              setValueInput(null);
            }}
            filterOption={(input, option: any) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            placeholder="Chọn"
            style={{
              width: "100%",
            }}
            options={[
              ...listOrganizeType.map((item) => ({
                key: item.id,
                label: item?.organizeDetailName,
                value: item?.id,
              })),
            ]}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={8}>
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
              isSelect1 ? setDataTable(select) : setDataTable(initialData);
              setDataPos([]);
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
      </Col>

      <Col xs={24} sm={24} md={8}>
        <span>Họ và tên</span>
        <div className="mt-8">
          <Select
            allowClear={true}
            style={{ width: "100%", height: "38px" }}
            showSearch
            onChange={onChange}
            options={listNV}
            placeholder="Chọn nhân viên"
            size="large"
          ></Select>
        </div>
      </Col>
    </Row>
  );
}
