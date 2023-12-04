import { Button, Col, DatePicker, Form, Modal, Row, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function XoaLichLamViec({ openLLV, handleCloseLLV, data }) {
  const [finalData, setFinalData] = useState<any>();

  const curentUrlTL = process.env.NEXT_PUBLIC_API;
  const dateFormat = "YYYY-MM-DD";
  useEffect(() => {
    const filteredData = data?.data.filter((item) => item.shift_id !== 0);

    const uniqueData = Array.from(
      new Set(filteredData?.map((item) => item.shift_id))
    ).map((shiftId) => filteredData?.find((item) => item.shift_id === shiftId));

    const dataOld = uniqueData?.map((item, index) => ({
      value: item.shift_id,
      label: item.shift[0]?.shift_name,
    }));
    setFinalData(dataOld);
  }, [data]);
  const router = useRouter();
  const onFinish = async (value) => {
    try {
      const com_id = Cookies.get("com_id");
      const token = Cookies.get("token_base365");
      const object = {
        ep_id: data._id,
        time: data.at_time.split("T")?.[0],
        shift_id: value.phatcong_shift,
        token: token,
      };
      const response = await axios.post(
        `${curentUrlTL}/api/tinhluong/congty/delete_cycle`,
        object
      );
      if (response?.status == 200) {
        window.alert("Xóa thành công");
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        open={openLLV}
        onCancel={handleCloseLLV}
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
            <p style={{ fontSize: "20px", color: "#fff" }}>Xóa lịch làm việc</p>
          </div>
        }
      >
        <div style={{ padding: 20 }}>
          <Form onFinish={onFinish}>
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
                    {data?.user.userName}
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
                      defaultValue={dayjs(
                        data.at_time?.split("T")?.[0],
                        dateFormat
                      )}
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
                        Chọn lịch làm việc
                      </p>
                    }
                    name={"phatcong_shift"}
                    rules={[{ required: true, message: "Chọn lịch làm việc" }]}
                    labelCol={{ span: 24 }}
                  >
                    <Select
                      placeholder={"Chọn lịch làm việc"}
                      size="large"
                      options={finalData}
                    ></Select>
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
                      onClick={handleCloseLLV}
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
