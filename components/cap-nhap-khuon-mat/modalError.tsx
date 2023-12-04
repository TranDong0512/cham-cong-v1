import { Button, Typography, Modal, Row, Image } from "antd";
import { useRouter } from "next/router";

export default function ModalError({ open, close }) {
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
                        Cập nhập khuôn mặt thất bại.
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
