import { POST } from "@/pages/api/BaseApi";
import { Button, DatePicker, Form, InputNumber, Modal, Select } from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ModalAdd({ open, handleCancel, setCall }) {
  const token = Cookies.get("token_base365");
  const com_id = Cookies.get("com_id");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [listUser, setListUser] = useState<any>([]);
  const onFinish = async (values) => {
    try {
      const object = {
        num_days: values.num_days,
        apply_month: dayjs(values.apply_month).format("YYYY-MM-01"),
        listUsers: values.listUsers,
      };
      const response = await POST(
        "api/qlc/companyworkday/create_employee",
        object
      );
      if (response?.result == true) {
        toast.success("Cập nhật công chuẩn thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleCancel();
        setCall();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      const object = {
        token: token,
        com_id: com_id,
      };
      const fetchData = async () => {
        const response = await POST("api/qlc/managerUser/listUser", object);
        if (response?.result == true) {
          const newData = response?.data.map((item, index) => ({
            ...item,
            label: item.userName,
            value: item.ep_id,
          }));
          setListUser(newData);
        }
      };
      fetchData();
    } catch (error) {}
  }, []);
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const monthFormat = "YYYY/MM";
  return (
    <>
      <Modal
        title={
          <div
            style={{ backgroundColor: "#4c5bd4", borderRadius: "8px 8px 0 0" }}
          >
            <p
              style={{
                padding: "14px 0 14px 12px",
                color: "#FFF",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Thiết lập công chuẩn nhân viên
            </p>
          </div>
        }
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <div style={{ padding: "0 20px", paddingBottom: 24 }}>
          <Form
            name="formAdd"
            onFinish={onFinish}
            initialValues={{ apply_month: dayjs() }}
          >
            <Form.Item
              labelCol={{ span: 24 }}
              label="Thời gian áp dụng"
              name="apply_month"
              rules={[{ required: true, message: "Chọn thời gian áp dụng!" }]}
            >
              <DatePicker
                defaultValue={dayjs()}
                format={monthFormat}
                picker="month"
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Số công chuẩn"
              name="num_days"
              rules={[{ required: true, message: "Nhập số công chuẩn!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                placeholder="Nhập số công chuẩn!"
              ></InputNumber>
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Nhân viên áp dụng"
              name="listUsers"
              rules={[{ required: true, message: "Chọn nhân viên áp dụng!" }]}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                size="large"
                placeholder="Chọn nhân viên áp dụng!"
                filterOption={filterOption}
                options={listUser}
              ></Select>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Form.Item>
                <Button type="default" onClick={handleCancel}>
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0 24px",
                    }}
                  >
                    Huỷ
                  </p>
                </Button>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0 24px",
                    }}
                  >
                    Lưu
                  </p>
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
