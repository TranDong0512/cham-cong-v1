import { Button, Image, Carousel } from "antd";
import styles from "./index.module.css";
export default function StartBeforeRecord({
    modelsLoadOk,
    setShouldStartRecord,
    setOpenStartBeforeRecord,
}) {
    const lists = [
        {
            postion: "Chính giữa",
            src: "/karma/front4.jpg",
        },
        {
            postion: "Phải",
            src: "/karma/right4.jpg",
        },
        {
            postion: "Trên phải",
            src: "/karma/upright4.jpg",
        },
        {
            postion: "Trên",
            src: "/karma/up4.jpg",
        },
        {
            postion: "Trên trái",
            src: "/karma/upleft4.jpg",
        },
        {
            postion: "Trái",
            src: "/karma/left4.jpg",
        },
        {
            postion: "Dưới trái",
            src: "/karma/downleft4.jpg",
        },
        {
            postion: "Dưới",
            src: "/karma/down4.jpg",
        },
        {
            postion: "Dưới phải",
            src: "/karma/downright4.jpg",
        },
    ];
    return (
        <div className={styles.start}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                }}
            >
                <div>
                    <h4>Cách thức để cập nhập khuôn mặt</h4>
                </div>
                <div
                    style={{
                        width: "400px",
                    }}
                >
                    <Carousel autoplay>
                        {lists.map((list, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "16px",
                                    }}
                                >
                                    {list.postion}
                                </div>

                                <div
                                    style={{
                                        width: "400px",
                                    }}
                                >
                                    <Image
                                        src={list.src}
                                        width="100%"
                                        alt="faceUpdate"
                                        preview={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* <div>
                    <Image
                        src="/faceUpdate.png"
                        width={100}
                        height={100}
                        alt="faceUpdate"
                        preview={false}
                    />
                </div> */}

                <div>
                    <p
                        style={{
                            textAlign: "center",
                            padding: "0 20px",
                        }}
                    >
                        Di chuyển khuôn mặt của bạn trên camera theo các hướng
                        sau: <br /> xoay sang trái; xoay sang phải; hướng lên
                        trên; cúi xuống dưới; căn khuôn mặt ở vị trí trung tâm;
                        nghiêng lên trên ở góc trên bên trái và góc trên bên
                        phải.
                    </p>
                </div>
            </div>
            <div
                style={{
                    width: "160px",
                }}
                className={styles.btn}
            >
                {modelsLoadOk ? (
                    <Button
                        block
                        size="large"
                        type="primary"
                        onClick={() => {
                            setShouldStartRecord(true);
                            setOpenStartBeforeRecord(false);
                        }}
                    >
                        <span
                            style={{
                                color: "#fff",
                            }}
                        >
                            Bắt đầu
                        </span>
                    </Button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
