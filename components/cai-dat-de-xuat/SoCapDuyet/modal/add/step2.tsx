import React, { useState, useEffect } from "react";
import { InputNumber, Select, Typography, Checkbox, Form } from "antd";
import instance from "@/components/hooks/axios.config";
export default function Step2({ setValueSelect, valueSelect, setListConfirm }) {
  const handleSetLevel = (e) => {
    setValueSelect(e);
  };
  const [propose, setPropose] = useState([]);
  const [check, setCheck] = useState(false);
  const [numberPropose, setNumberPropose] = useState();
  const handleSelect = (value) => {
    setPropose(value);
    if (value) {
      setListConfirm(value);
    } else setCheck(false);
  };
  const [listOptions, setListOptions] = useState([]);
  const handleCheckboxChange = async (e) => {
    const { checked } = e.target;
    if (checked === true) {
      const arrayOfNumbers = listOptions?.map((item) => item.key);
      console.log(arrayOfNumbers);
      setListConfirm(arrayOfNumbers);
      setPropose(arrayOfNumbers);
      setCheck(true);
    } else {
      setPropose([]);
      setListConfirm([]);
      setCheck(false);
    }
  };
  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetcher = async () => {
          return await instance.post("api/vanthu/setting/fetchTimeSetting");
        };
        const data = await fetcher();

        const options = data?.data?.time_dx?.map((item, index) => ({
          label: item?.name_cate_dx,
          value: item?.id_dx,
          key: item?.id_dx,
        }));
        setNumberPropose(data?.data?.time_dx?.length);
        setListOptions(options);
      } catch (err) {
        console.log(err);
      }
    };
    unFollow();
  }, []);
  return (
    <>
      <div className="mt-16">
        <Form.Item rules={[{ required: true, message: "Nhập số cấp duyệt" }]}>
          <InputNumber
            style={{
              width: "100%",
            }}
            size="large"
            placeholder="Nhập cấp độ duyệt"
            onChange={handleSetLevel}
          />
        </Form.Item>
      </div>
      <div className="mt-16">
        <Typography.Text>Danh sách đề xuất</Typography.Text>
      </div>
      <div style={{ display: "flex", margin: "8px 0" }}>
        <Checkbox
          type="checkbox"
          checked={check}
          onChange={handleCheckboxChange}
        >
          Chọn tất cả
        </Checkbox>
      </div>
      <div className="mt-8">
        <Select
          placeholder="Chọn"
          mode="multiple"
          value={propose}
          onChange={handleSelect}
          onClear={() => {
            setCheck(false);
            setValueSelect(null);
          }}
          allowClear
          showSearch
          style={{
            width: "100%",
          }}
          filterOption={(input, option: any) =>
            (option?.label ?? "").includes(input)
          }
          size="large"
          options={listOptions}
        />
      </div>
    </>
  );
}
