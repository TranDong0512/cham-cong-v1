import { Button, Col, DatePicker, Form, Modal, Row, Select, Input } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
export default function XoaCong({ openXC, handleCloseXC, data, onClick }) {
  const [finalData, setFinalData] = useState<any>();

  const curentUrlTL = process.env.NEXT_PUBLIC_API;
  const dateFormat = "YYYY-MM-DD";

  const router = useRouter();
  const onFinish = async (values) => {
    try {

      const token = Cookies.get("token_base365");
      const object = {
        ep_id: data.ep_id,
        at_time: moment(data?.ts_date)?.format("YYYY-MM-DD"),
        shift_id: data?.shift_id,
        token: token,
      };
      const response: any = await axios.post(
        `${curentUrlTL}/api/tinhluong/congty/delete_cong`,
        object
      );

      if (response?.status == 200) {
        onClick(data)
        window.alert("Xóa công thành công");
        handleCloseXC()


      }
    } catch (error) {
      if (error.response.status == 500) {
        window.alert(`${error?.response?.data.error}`);
      }
    }
  };
  return (
    <>
      <Modal
        open={openXC}
        onCancel={handleCloseXC}
        footer={null}
        title={
          <div
            style={{
              display: "flex",
              padding: "12px 0",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#4c5bd4 ",
              borderRadius: "8px 8px 0 0",
              color: "#fff",
            }}
          >
            <p style={{ fontSize: "20px", color: "#fff" }}>
              Xóa công nhân viên
            </p>
          </div>
        }
      >
        <div style={{ padding: 20 }}>
          <Form
            onFinish={onFinish}

          >
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <div style={{ padding: "0px 0" }}>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      width: "max-content",
                      margin: "auto",
                    }}
                  >
                    {data?.ep_name}
                  </p>
                </div>

                <div>
                  <Form.Item
                    label={
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          width: "max-content",
                        }}
                      >
                        Thời gian
                      </p>
                    }
                    name={"time"}
                    labelCol={{ span: 24 }}
                  >
                    <DatePicker
                      disabled
                      defaultValue={dayjs(data?.ts_date, "YYYY-MM-DD")}
                      format="DD-MM-YYYY"
                      style={{ width: "100%" }}
                      size="large"
                    ></DatePicker>
                  </Form.Item>

                  <Form.Item
                    label={
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          width: "max-content",
                        }}
                      >
                        Ca làm việc
                      </p>
                    }
                    name={"shift_id"}
                    labelCol={{ span: 24 }}
                  >
                    <Input
                      disabled
                      defaultValue={data?.shift_name}
                      value={data?.shift_id}
                      style={{ width: "100%" }}
                      size="large"
                    ></Input>
                  </Form.Item>

                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: 24,
                  }}
                >
                  <Form.Item>
                    <Button
                      type="default"
                      style={{ padding: "4px 40px", display: "flex" }}
                      onClick={handleCloseXC}
                    >
                      <p>Hủy</p>
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{ padding: "4px 40px" }}
                      htmlType="submit"

                    >
                      <p>Lưu</p>
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
