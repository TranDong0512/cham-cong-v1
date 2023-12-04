import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
export default function Loading() {
    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                backgroundColor: "rgba(255,255,255,0.5)",
                zIndex: "99999",
            }}
        >
            <Spin
                size="large"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                }}
                indicator={antIcon}
            />
        </div>
    );
}
