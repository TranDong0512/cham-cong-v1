import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, InputNumber, TimePicker } from "antd";
import { Typography } from "antd";
import instance from "@/components/hooks/axios.config";
import { toast } from "react-toastify";
import Constants from "../../Constant/constant";
const { Text } = Typography;

interface ItemsType {
  shift_name?: string;
  start_time?: string;
  end_time?: string;
  shift_id?: number;
}
interface DataType {
  message?: string;
  items?: ItemsType[];
}
export default function Tabs2() {
  const [data, setData] = useState<DataType>({});
  useEffect(() => {
    const unFollow = async () => {
      const fetcher = async () => {
        return await instance.get(Constants.shift_list);
      };
      try {
        const result = await fetcher();
        setData(result?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    unFollow();
  }, []);
  function convertToTime(decimal) {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
  }
  const [form] = Form.useForm();
  function convertObjectValuesToTime(obj) {
    const convertedObj = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== undefined) {
          convertedObj[key] = convertToTime(value);
        }
      }
    }

    return convertedObj;
  }
  const handleUpdate = async (values) => {
    const convertedObject = convertObjectValuesToTime(values);
    let dataSend = {
      time_limit_l: JSON.stringify(convertedObject),
    };
    const fetcher = async () => {
      return await instance.post(
        Constants.vanthu_setting_editSetting,
        dataSend
      );
    };

    try {
      const result = await fetcher();
      if (result?.data?.data?.result) {
        toast.success("Chỉnh sửa thành công");
        form.resetFields();
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  return (
    <>
      <div className="mt-16">
        <Text>
          Ứng với việc nhân viên nghỉ đột xuất, áp dụng đối với những trường hợp
          không có dự kiến từ trước mà xảy ra mang tính đột xuất, bất ngờ như:
          Nghỉ ốm, nghỉ người nhà mất, tai nạn....
        </Text>
      </div>
      <div className="mt-16 mb-16">
        <div className="mb-16">
          <Text
            style={{
              color: "#4c5bd4",
              fontSize: "18px",
            }}
          >
            {data?.message}
          </Text>
        </div>

        <Form layout="vertical" form={form} onFinish={handleUpdate}>
          <div className="min-h-300">
            <Row gutter={[16, 16]}>
              {data?.items?.map((item, index) => {
                return (
                  <Col key={index} xs={12} sm={12} md={12} xl={12}>
                    <Form.Item
                      label={item?.shift_name}
                      name={item?.shift_id}
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <InputNumber
                        size="large"
                        suffix="h"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Chọn thời gian duyệt"
                      />
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="mt-16 flex flex-center">
            <div className="max-w-160 w-100">
              <Button block htmlType="submit" size="large" type="primary">
                Cập nhật
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
