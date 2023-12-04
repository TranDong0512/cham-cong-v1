import { Button, Typography, Modal, Row, Image } from "antd";
import { useRouter } from "next/router";

export default function ModalSuccess({ open, close }) {
    const router = useRouter();

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
                        src="/update-success.png"
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
                        Cập nhập khuôn mặt thành công
                    </Typography.Text>
                </div>
                <div
                    style={{
                        marginTop: "16px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            paddingLeft: "32px",
                            paddingRight: "32px",
                        }}
                    >
                        <p
                            style={{
                                color: "#fff",
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
