import { Col, ConfigProvider, Row, Switch } from "antd";

export default function Notification() {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <Row>
        <Col style={{ display: "flex", marginBottom: "24px" }} md={24}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#12DD00",
              },
            }}
          >
            <Switch defaultChecked onChange={onChange} />
          </ConfigProvider>

          <p
            style={{
              color: "#474747",
              fontSize: 16,
              fontWeight: 500,
              marginLeft: 12,
            }}
          >
            Mở thông báo chấm công
          </p>
        </Col>
        <Col>
          <p
            style={{
              color: "#474747",
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            (App chấm công sẽ gửi thông báo nhắc nhở nhân viên chấm công trước
            giờ chốt ca 5 phút)
          </p>
        </Col>
      </Row>
    </>
  );
}
