import React, { useEffect, useState } from "react";
import {
  Typography,
  Modal,
  Checkbox,
  Select,
  Button,
  Form,
  InputNumber,
} from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";

import type { FormInstance } from "antd/es/form";

import { toast } from "react-toastify";
import { updateVerify } from "@/redux/reducer/update";
import { useDispatch } from "react-redux";
import { updateSoCapDuyet } from "@/components/cai-dat-de-xuat/reducer/reducer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { CloseOutlined } from "@ant-design/icons";
export default function ModalAddSCD({ open, onClose, setData }) {
  const load = useSelector((state: RootState) => state.tgd.updateSoCapDuyet);

  const [listUsers, setListUsers] = useState([]);
  const [valueSelect, setValueSelect] = useState([]);
  const formRef = React.useRef<FormInstance>(null);
  const [propose, setPropose] = useState([]);
  const [check, setCheck] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSelect = (value) => {
    if (value) {
      setPropose(value);
    } else setCheck(false);
  };

  const handleCheckboxChange = async (e) => {
    const { checked } = e.target;
    if (checked === true) {
      const arrayOfNumbers = setData?.map((item) => item.dexuat_id);
      setPropose(arrayOfNumbers);
      setCheck(true);
    } else {
      setPropose([]);
      setCheck(false);
    }
  };
  const [confirm_level, set_confirm_level] = useState<any>();
  const [confirm_time, set_confirm_time] = useState<any>();
  const [confirm_type, set_confirm_type] = useState<any>();

  const dataInput = (value, name) => {
    if (name == "confirm_level") set_confirm_level(+value);
    if (name == "confirm_time") set_confirm_time(+value);
  };
  const onChange = (value: string) => {
    set_confirm_type(+value);
  };
  const close = () => {
    onClose();
    setListUsers([]);
    setValueSelect([]);
    formRef.current?.resetFields();
    dispatch(updateSoCapDuyet(false));
  };
  const onFinish = async () => {
    try {
      const object = {
        list_SettingPropose: propose,
        confirm_level: confirm_level,
        confirm_type: confirm_type,
        confirm_time: confirm_time,
      };

      const response = await instance.post(
        "api/qlc/settingConfirm/settingPropose",
        object
      );
      if (response?.status == 200) {
        toast.success("Cài đặt thành công", {
          style: {
            marginTop: 60,
          },
        });
        close();
        dispatch(updateSoCapDuyet(!load));
      }
    } catch (error) {}
  };
  return (
    <>
      <Modal
        open={open}
        wrapClassName="CustomerModal"
        footer={false}
        onCancel={close}
        closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
      >
        <Form name="form" onFinish={onFinish} form={form}>
          <div
            className="px-24 py-16"
            style={{
              backgroundColor: "#4C5BD4",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <p
              className="color-white font-size-18"
              style={{ padding: "10px", color: "#fff" }}
            >
              Cài đặt đề xuất
            </p>
          </div>
          <div style={{ padding: "0 20px" }}>
            <div className="mt-16">
              <Typography.Text style={{ fontSize: "16px", fontWeight: 500 }}>
                Danh sách đề xuất
              </Typography.Text>
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
              <Form.Item
                name="list_SettingPropose"
                rules={[{ required: true, message: "Vui lòng nhập đề xuất!" }]}
              >
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
                  options={setData}
                />
              </Form.Item>
            </div>

            <div className="mt-16">
              <Typography.Text
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Số cấp duyệt
              </Typography.Text>
            </div>
            <Form.Item
              name="confirm_level"
              rules={[{ required: true, message: "Nhập số cấp duyệt!" }]}
            >
              <InputNumber
                placeholder="Nhập số cấp duyệt"
                size="large"
                style={{ marginTop: "8px", width: "100%" }}
                onChange={(e) => dataInput(e, "confirm_level")}
              ></InputNumber>
            </Form.Item>

            <div className="mt-16">
              <Typography.Text
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Hình thức duyệt
              </Typography.Text>
            </div>
            <Form.Item
              name="confirm_type"
              rules={[{ required: true, message: "Nhập hình thức duyệt!" }]}
            >
              <Select
                style={{ width: "100%" }}
                size="large"
                onChange={onChange}
                placeholder="Chọn hình thức duyệt"
                options={[
                  {
                    value: "1",
                    label: "Duyệt lần lượt",
                  },
                  {
                    value: "2",
                    label: "Duyệt đồng thời",
                  },
                  {
                    value: "3",
                    label: "Duyệt lần lượt và đồng thời",
                  },
                ]}
              ></Select>
            </Form.Item>
            <div className="mt-16">
              <Typography.Text
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Giới hạn thời gian duyệt
              </Typography.Text>
            </div>
            <Form.Item
              name="confirm_time"
              rules={[{ required: true, message: "Nhập thời gian duyệt!" }]}
            >
              <InputNumber
                placeholder="Nhập thời gian"
                size="large"
                style={{ marginTop: "8px", width: "100%" }}
                onChange={(e) => dataInput(e, "confirm_time")}
                addonAfter="Giờ"
              ></InputNumber>
            </Form.Item>
          </div>
          <div
            className="mt-16"
            style={{
              paddingBottom: "32px",
              display: "flex",
              justifyContent: "space-evenly",
              paddingTop: "12px",
              width: "75%",
              margin: "0 auto",
            }}
          >
            <Button
              style={{ padding: "4px 48px", height: "38px" }}
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              style={{ padding: "4px 48px", height: "36px" }}
              htmlType="submit"
            >
              <p> Lưu</p>
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
