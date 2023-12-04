import Image from "next/image";
import styles from "./index.module.css";
import { Button, Modal, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ChamCong = dynamic(() => import("@/components/cham-cong-cong-ty"), {
    ssr: false,
});
export default function ChamCongCongTy() {
    const [modalTBCamera, setModalTBCamera] = useState(false);
    const closeModalTBCamera = () => {
        setModalTBCamera(false);
    };
    useEffect(() => {
        const checkHasCam = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const queries = devices.filter(
                    (video) =>
                        video?.kind === "videoinput" && video?.deviceId !== ""
                );
                if (queries.length > 0) {
                    setCheckConnext(true);
                } else {
                    setModalTBCamera(true);
                }
            } catch (error) {
                console.log("Error", error);
            }
        };

        checkHasCam();
    }, []);
    const router = useRouter();
    const [checkConnext, setCheckConnext] = useState(false);
    return (
        <div className={styles.updateFaceMain}>
            <div
                style={{
                    position: "absolute",
                    top: "80px",
                    left: "20px",
                    cursor: "pointer",
                    color: "#fff",
                }}
                onClick={() => router.back()}
            >
                <ArrowLeftOutlined rev={null} /> Quay lại!
            </div>
            {checkConnext ? <ChamCong /> : <></>}
            <Modal
                open={modalTBCamera}
                closeIcon={false}
                footer={false}
                onCancel={closeModalTBCamera}
            >
                <div
                    style={{
                        textAlign: "center",
                        padding: "24px",
                    }}
                >
                    <div>
                        <Image
                            src="/alert/images.png"
                            alt="xxx"
                            width={80}
                            height={80}
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
                            Bạn chưa có camera AI365
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
                                }}
                                onClick={() =>
                                    router.push("/huong-dan-chi-tiet")
                                }
                            >
                                Chi tiết xem tại đây
                            </p>
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
