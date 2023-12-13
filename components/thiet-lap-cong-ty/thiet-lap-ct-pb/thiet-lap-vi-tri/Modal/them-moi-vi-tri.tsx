import React, { useEffect, useState } from "react";

import { Button, Form, Input, Modal, Row, Col, Typography, Select } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import type { FormInstance } from "antd/es/form";
import { useDispatch } from "react-redux";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { positions } from "../../../constant/constant";
import Cookies from "js-cookie";
import { getCompIdCS } from "@/pages/api/BaseApi";

export default function ModalAddNewPosition({ isNew, close, open }) {
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.setup.update);
  const [data, setData] = useState<any>({});
  const com_id = getCompIdCS();
  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetch = async () => {
          return await instance.post(positions.listAll, {
            com_id: com_id,
          });
        };
        const data = await fetch();
        let list = data?.data?.data?.data?.map((item) => ({
          label: item?.positionName,
          value: item?.level,
        }));
        setData(list);
      } catch (err) {
        alert("Error: " + err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad]);
  const handleSubmit = async ({ level, typeAdd, positionName }) => {
    const valueSend = {
      level: level,
      typeAdd: typeAdd,
      positionName: positionName,
    };
    try {
      const fetcher = async () => {
        return await instance.post("api/qlc/positions/create", valueSend);
      };
      const result = await fetcher();
      if (result?.data?.data?.result) {
        alert("Thêm mới vị trí thành công");
        formRef.current?.resetFields();
        dispatch(update(!isLoad));
        close();
      }
    } catch (err) {
      alert("Error: " + err?.response?.data?.error?.message);
    }
  };
  const formRef = React.useRef<FormInstance>(null);
  const onCancel = () => {
    close();
    formRef.current?.resetFields();
  };
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      wrapClassName="CustomerModal"
      footer={false}
    >
      <div
        className="px-24 py-16"
        style={{
          backgroundColor: "#4C5BD4",
        }}
      >
        <Text className="color-white font-size-16">Thêm mới</Text>
      </div>
      <Form
        labelAlign="left"
        layout="vertical"
        ref={formRef}
        onFinish={handleSubmit}
        size="small"
        className="px-16 py-24"
      >
        <Form.Item
          label="Tên vị trí"
          required
          name="positionName"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input type="text" placeholder="Nhập" size="large" />
        </Form.Item>
        {isNew ? (
          <div>
            <div className="mb-8">
              <span style={{ color: "red" }}>*</span> Vị trí cấp bậc
            </div>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8} md={8}>
                <Form.Item
                  required
                  name="typeAdd"
                  rules={[{ required: true, message: "Vui lòng chọn!" }]}
                >
                  <Select
                    placeholder="Chọn"
                    virtual={false}
                    style={{
                      width: "100%",
                    }}
                    options={[
                      {
                        label: "Trên",
                        value: "1",
                      },
                      {
                        label: "Dưới",
                        value: "2",
                      },
                    ]}
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={16} md={16}>
                <Form.Item required name="level" rules={[{ required: true }]}>
                  <Select
                    placeholder="Chọn"
                    virtual={false}
                    options={data}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ) : (
          <></>
        )}
        <div className="flex mt-16 flex-center">
          <Button className="min-w-120 mx-10" size="large" onClick={onCancel}>
            Hủy
          </Button>
          <Button
            className="min-w-120 mx-10"
            type="primary"
            size="large"
            htmlType="submit"
          >
            <span className="color-white">Thêm</span>
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
