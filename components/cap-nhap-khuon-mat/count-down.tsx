import { Button, Typography, Modal, Row, Image } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
function StartCountdown({ start }) {
    const router = useRouter();
    const countdownTime = 180000;
    start &&
        setTimeout(function () {
            setOpen(true);
        }, countdownTime);
    const [open, setOpen] = useState(false);
    const close = () => {
        router.back();
    };
    return (
        <Modal open={open} closeIcon={false} footer={false} onCancel={close}>
            <div
                style={{
                    textAlign: "center",
                    padding: "24px",
                }}
            >
                <div>
                    <Image
                        src="/update-error.png"
                        alt="xxx"
                        width={80}
                        height={80}
                        preview={false}
                    />
                </div>

                <div
                    style={{
                        marginTop: "16px",
                    }}
                >
                    <Typography.Text
                        style={{
                            fontSize: "18px",
                            color: "red",
                        }}
                    >
                        Đã hết thời gian cập nhập khuôn mặt. Xin vui lòng thử
                        lại.
                    </Typography.Text>
                </div>
                <div
                    style={{
                        marginTop: "16px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button type="primary" size="large">
                        <p
                            style={{
                                color: "#fff",
                                padding: "0 32px",
                            }}
                            onClick={() => router.push("/")}
                        >
                            Trở về
                        </p>
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default StartCountdown;
