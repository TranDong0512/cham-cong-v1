import React, { useEffect, useState } from "react";
import { Button, Form, Select, Row, Col, Input, Checkbox } from "antd";
import { Modal, Typography } from "antd";
import type { FormInstance } from "antd/es/form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import instance from "@/components/hooks/axios.config";
import Constant from "../../../constant/constant";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
import { notification } from "antd";
import { useRouter } from "next/router";
import { getCompIdCS } from "@/pages/api/BaseApi";
import { toast } from "react-toastify";

const { Text } = Typography;

export default function ThemCoCau({ close, open }) {
  const formRef = React.useRef<FormInstance>(null);
  const [api, contextHolder] = notification.useNotification();

  const isLoad = useSelector((state: RootState) => state.setup.update);
  const handleClose = () => {
    formRef.current?.resetFields();
    close();
  };
  const [options, setOptions] = useState([]);
  const [check, setCheck] = useState(true);
  const [initialData, setInitialData] = useState([]);
  const [id, setId] = useState(0);
  const com_id = getCompIdCS();
  useEffect(() => {
    const fetcher = async () => {
      return await instance.post(Constant.settingOrganize_listAll, {
        com_id: com_id,
      });
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();
        setInitialData(data?.data?.data?.data);
        const option = data?.data?.data?.data.map((op) => {
          return {
            label: op.organizeName,
            value: op.id,
            key: op.id,
          };
        });
        setOptions(option);
      } catch (err) {
        alert("Error: " + err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad]);
  const dispatch = useDispatch();
  const [parentId, setParentId] = useState(0);
  const [level, setLevel] = useState(0);
  const router = useRouter();
  const handleSubmit = async ({ organizeName, label, select = "" }) => {
    let valueSend;
    if (select) {
      if (label === 1) {
        valueSend = {
          organizeName: organizeName,
          parentId: parentId,
          level: level,
        };
      }
      if (label === 2) {
        valueSend = {
          organizeName: organizeName,
          parentId: id,
          level: level + 1,
        };
      }
    } else {
      valueSend = {
        organizeName: organizeName,
        parentId: 0,
        level: 1,
      };
    }

    try {
      const fetcher = async () => {
        return await instance.post(Constant.settingOrganize_create, valueSend);
      };
      const result = await fetcher();
      if (result?.data?.data?.result) {
        toast(result?.data?.data?.message);
        dispatch(update(!isLoad));
        formRef.current?.resetFields();
      } else {
        toast(result?.data?.data?.message);
      }
    } catch (err) {
      toast(err?.response?.data?.error?.message);
    }
  };

  const handleSelect = (e) => {
    const item = initialData.filter((item) => item.id === e);
    setParentId(item[0].parentId);
    setId(e);
    setLevel(item[0].level);
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      wrapClassName="CustomerModal"
      footer={false}
    >
      <div
        className="px-24 py-16"
        style={{
          backgroundColor: "#4C5BD4",
        }}
      >
        <Text className="color-white font-size-16">Thêm cơ cấu tổ chức</Text>
      </div>
      <div className="p-16">
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          ref={formRef}
          size="small"
        >
          <Form.Item
            label="Tên cấp tổ chức"
            required
            name="organizeName"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input size="large" placeholder="Nhập" />
          </Form.Item>
          <div>
            <Checkbox onChange={() => setCheck(!check)}>Cấp cao nhất</Checkbox>
          </div>
          {contextHolder}
          {check ? (
            <>
              <div className="mb-8 mt-8">Vị trí cấp bậc *</div>
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12} sm={12}>
                  <Form.Item initialValue={1} name="label">
                    <Select
                      placeholder="Chọn"
                      virtual={false}
                      options={[
                        {
                          label: "Ngang cấp",
                          value: 1,
                        },
                        {
                          label: "Dưới cấp",
                          value: 2,
                        },
                      ]}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} sm={12}>
                  <Form.Item name="select">
                    <Select
                      placeholder="Chọn"
                      allowClear
                      showSearch
                      filterOption={(input, option: any) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      virtual={false}
                      onSelect={handleSelect}
                      options={options}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}

          <div className="flex mt-16 flex-center">
            <Button
              className="min-w-120 mx-10"
              size="large"
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button
              className="min-w-120 mx-10"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
