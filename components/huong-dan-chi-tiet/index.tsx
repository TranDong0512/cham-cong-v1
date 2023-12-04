import { Col, Image, Typography, Row, Button } from "antd";
import styles from "./styles.module.scss";
import Link from "next/link";
export default function HuongDanCamera() {
    return (
        <div className={styles.main}>
            <div
                style={{
                    margin: "24px 0",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className={styles.hidden}>
                    <Image
                        src="/alert/lineLeft.svg"
                        alt="hungha365.com"
                        preview={false}
                    />
                </div>
                <h1 className={styles.title_h1}>
                    Hướng dẫn tự cài đặt chi tiết camera AI365 chấm công
                </h1>

                <div className={styles.hidden}>
                    <Image
                        src="/alert/lineRight.svg"
                        alt="hungha365.com"
                        preview={false}
                    />
                </div>
            </div>

            <div className={styles.layout}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                    }}
                >
                    <div>
                        <Image
                            src="/alert/circle.svg"
                            alt="hungha365.com"
                            preview={false}
                            width={12}
                            height={12}
                        />
                    </div>

                    <h2
                        style={{
                            textAlign: "justify",
                        }}
                        className={styles.title_box}
                    >
                        Nếu bạn đã mua sản phẩm EZVIZ C6W, bạn có thể lựa chọn
                        một trong hai cách sau để tùy chỉnh và sử dụng các tính
                        năng của camera:
                    </h2>
                </div>
                <div
                    style={{
                        marginBottom: "8px",
                    }}
                >
                    <h3
                        style={{
                            textAlign: "justify",
                        }}
                        className={styles.text}
                    >
                        1. Sử dụng phần mềm EZVIZ PC Studio Software (PC): Bạn
                        có thể{" "}
                        <Link
                            style={{
                                color: "#000",
                            }}
                            href="https://mfs.ezvizlife.com/EzvizStudioSetups.exe?ver=23851&_gl=1*1fd8abk*_ga*MTkyODkwMDIuMTY5Njk4Njg3OQ..*_ga_GFXNRVT2BW*MTY5Njk4Njg3OS4xLjAuMTY5Njk4Njg4Mi41Ny4wLjA.*_gcl_au*MjEyMTY3NzA4MC4xNjk2OTg2ODc5"
                        >
                            Tải phần mềm EZVIZ PC Studio
                        </Link>{" "}
                        từ trang web của chúng tôi và cài đặt trên máy tính của
                        mình. Sau khi cài đặt, bạn có thể tùy chỉnh và quản lý
                        các chức năng của camera.
                    </h3>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Link
                        style={{
                            color: "#000",
                        }}
                        href="https://mfs.ezvizlife.com/EzvizStudioSetups.exe?ver=23851&_gl=1*1fd8abk*_ga*MTkyODkwMDIuMTY5Njk4Njg3OQ..*_ga_GFXNRVT2BW*MTY5Njk4Njg3OS4xLjAuMTY5Njk4Njg4Mi41Ny4wLjA.*_gcl_au*MjEyMTY3NzA4MC4xNjk2OTg2ODc5"
                    >
                        Tải phần mềm EZVIZ PC Studio
                    </Link>
                </div>
                <div
                    style={{
                        marginBottom: "8px",
                    }}
                >
                    <h3
                        style={{
                            textAlign: "justify",
                        }}
                        className={styles.text}
                    >
                        2. Sử dụng ứng dụng EZVIZ (mobile): Nếu bạn muốn quản lý
                        camera từ điện thoại di động, bạn có thể tải ứng dụng
                        EZVIZ từ App Store để cài đặt trên điện thoại của mình.
                        Ứng dụng này cho phép bạn điều khiển và xem camera từ
                        xa.
                    </h3>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "16px",
                        marginBottom: "16px",
                        gap: "16px",
                    }}
                    className={styles.wrapperImg}
                >
                    <Image
                        src="/alert/pc.png"
                        alt="hungha365.com"
                        preview={false}
                    />
                    <div className={styles.w50}>
                        <Image
                            src="/alert/mb1.png"
                            alt="hungha365.com"
                            preview={false}
                        />{" "}
                        <Image
                            src="/alert/mb2.png"
                            alt="hungha365.com"
                            preview={false}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                    }}
                >
                    <div>
                        <Image
                            src="/alert/circle.svg"
                            alt="hungha365.com"
                            preview={false}
                            width={12}
                            height={12}
                        />
                    </div>

                    <h2
                        style={{
                            textAlign: "justify",
                        }}
                        className={styles.title_box}
                    >
                        Trong trường hợp sử dụng sản phẩm khác, bạn có xem hướng
                        dẫn từ nhà sản xuất hoặc liên hệ với chúng tôi thông qua
                        ứng dụng Chat365 với tài khoản là "HHP" để được nhận hỗ
                        trợ. Chúng tôi sẽ cung cấp các gợi ý cần thiết phù hợp
                        với nhu cầu và mục đích sử dụng của bạn.
                    </h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                    }}
                >
                    <div>
                        <Image
                            src="/alert/circle.svg"
                            alt="hungha365.com"
                            preview={false}
                            width={12}
                            height={12}
                        />
                    </div>

                    <h2
                        style={{
                            textAlign: "justify",
                        }}
                        className={styles.title_box}
                    >
                        Đối với trường hợp bạn muốn xem camera từ xa, vui lòng
                        liên hệ với chúng tôi để được hỗ trợ cài đặt cấu hình từ
                        bộ phận kỹ thuật.
                    </h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                    }}
                >
                    <div>
                        <Image
                            src="/alert/circle.svg"
                            alt="hungha365.com"
                            preview={false}
                            width={12}
                            height={12}
                        />
                    </div>

                    <h2
                        style={{
                            textAlign: "justify",
                        }}
                        className={styles.title_box}
                    >
                        Lưu ý, để thực hiện điều này, chúng tôi cần làm việc với
                        nhà cung cấp dịch vụ mạng của bạn, vì vậy, bạn sẽ cần
                        cung cấp thông tin liên quan đến dịch vụ mạng của bạn
                        đang sở hữu. Quá trình này sẽ được thực hiện thông qua
                        UltraViewer để đảm bảo sự hỗ trợ tốt nhất dành cho bạn.
                    </h2>
                </div>
<div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                    }}
                >
                    <div>
                        <Image
                            src="/alert/circle.svg"
                            alt="hungha365.com"
                            preview={false}
                            width={12}
                            height={12}
                        />
                    </div>

                    <h2
                        style={{
                            textAlign: "justify",
                        }}
                        className={styles.title_box}
                    >
                        Url kết nối với camera:
                        
                    </h2>

                </div>
 <div
                    style={{
                        marginLeft: "24px",
                    }}
                >
                    <p>url:rtsp://[UserName]:[PassWord]@[IP]:[Post]</p>{" "}
                </div>
                <div
                    style={{
                        marginLeft: "24px",
                    }}
                >
                    <p>Ví dụ:rtsp://admin:KEUKPL@192.168.1.240:554/</p>
                </div>
            </div>
        </div>
    );
}
