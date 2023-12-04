import { Col, Image, Typography, Row } from "antd";
import styles from "./styles.module.scss";
import Link from "next/link";
import TableOfContents from "./footer";
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
                    Hướng dẫn sử dụng camera AI365 để chấm công tại
                    Hungha365.com
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
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={14}>
                        <div className={styles.layout_left}>
                            <div>
                                <h2 className={styles.title_box}>
                                    Bước 1: Quý khách hàng tự mua camera hoặc
                                    mua camera AI365 của công ty chúng tôi.
                                </h2>
                            </div>
                            <div>
                                <h3 className={styles.text_header}>
                                    {" "}
                                    Đối với quý khách hàng mua camera AI365
                                    chúng tôi
                                </h3>
                                <div>
                                    <p
                                        style={{
                                            textAlign: "justify",
                                        }}
                                        className={styles.text}
                                    >
                                        {" "}
                                        - Quý khách hàng có thể mua Camera AI365
                                        của chúng tôi và chỉ cần nhập địa chỉ
                                        wifi công ty để bắt đầu thực hiện chấm
                                        công.
                                    </p>
                                    <p
                                        style={{
                                            textAlign: "justify",
                                        }}
                                        className={styles.text}
                                    >
                                        - Phương thức mua hàng: Quý khách vui
                                        lòng liên hệ tài khoản{" "}
                                        <Link href={""}>
                                            <span>HHP</span>
                                        </Link>{" "}
                                        của ứng dụng Chat 365.
                                    </p>
                                    <p className={styles.text}>
                                        - Hungha365 đang áp dụng 2 hình thức mua
                                        hàng:
                                        <ul>
                                            <li
                                                style={{
                                                    padding: "0 0 0 20px",
                                                    textAlign: "justify",
                                                }}
                                                className={styles.text}
                                            >
                                                + Cách 1: Mua trực tuyến và sử
                                                dụng dịch vụ chuyển phát nhanh.
                                            </li>
                                            <li
                                                style={{
                                                    padding: "0 0 0 20px",
                                                    textAlign: "justify",
                                                }}
                                                className={styles.text}
                                            >
                                                + Cách 2: Đến trực tiếp tại địa
                                                chỉ: Số 01 Trần Nguyên Đán, Khu
                                                Đô Thị Định Công, Hoàng Mai, Hà
                                                Nội.
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className={styles.text_header}>
                                    {" "}
                                    Đối với quý khách hàng sử dụng camera tự
                                    mua:
                                </h3>
                                <div>
                                    <p
                                        style={{
                                            textAlign: "justify",
                                        }}
                                        className={styles.text}
                                    >
                                        {" "}
                                        - Nếu quý khách đã sở hữu một Camera,
                                        bạn vẫn có thể sử dụng dịch vụ AI365 của
                                        chúng tôi. Sau khi mua Camera, hãy liên
                                        hệ với chúng tôi qua tài khoản “HHP”
                                        trên ứng dụng Chat 365 để được hướng dẫn
                                        cách tích hợp AI365.
                                    </p>
                                    <p
                                        style={{
                                            textAlign: "justify",
                                        }}
                                        className={styles.text}
                                    >
                                        - Các loại Camera có thể tích hợp AI365
                                        bao gồm các loại hỗ trợ phát qua phương
                                        thức RTSP như: EZVIZ C6W,...
                                    </p>
                                    <p
                                        style={{
                                            textAlign: "justify",
                                        }}
                                        className={styles.text}
                                    >
                                        - Quý khách có thể tự tích hợp theo
                                        hướng dẫn chi tiết{" "}
                                        <Link href={"/huong-dan-chi-tiet"}>
                                            <span>tại đây</span>
                                        </Link>{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={10}>
                        <div className={styles.layout_right}>
                            <div>
                                <p className={styles.text_header_right}>
                                    Camera EZVIZ C6W
                                </p>
                            </div>
                            <div>
                                <Image
                                    src="/alert/camera.svg"
                                    alt="hungha365.com"
                                    preview={false}
                                />
                            </div>

                            <Typography.Text
                                className={styles.text_header_right1}
                            >
                                1.200.000 đ
                            </Typography.Text>

                            <div>
                                <Typography.Text>
                                    (chưa bao gồm phí giao hàng)
                                </Typography.Text>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.layout}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={10}>
                        <div className={styles.layout_right}>
                            <Image
                                src="/alert/bg.png"
                                alt="hungha365.com"
                                preview={false}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={14}>
                        <div className={styles.layout_left}>
                            <div>
                                <h2 className={styles.title_box}>
                                    Bước 2: Truy cập website Hungha365.com tạo
                                    tài khoản và tiến hành cài đặt lịch làm
                                    việc, ca làm việc, lương,...
                                </h2>
                            </div>
                            <div>
                                <h3 className={styles.text_header}>
                                    {" "}
                                    Đối với quý khách hàng mua camera AI365
                                    chúng tôi
                                </h3>
                                <div>
                                    <p
                                        style={{
                                            textAlign: "justify",
                                        }}
                                        className={styles.text}
                                    >
                                        {" "}
                                        Quý khách hàng vui lòng liên hệ chúng
                                        tôi qua tài khoản HHP tại app Chat365 để
                                        được hỗ trợ cài đặt từ A - Z các tính
                                        năng: chấm công, tính lương, quản trị
                                        nhân sự, CRM… với 200 phần mềm tích hợp
                                        trong cùng 1 hệ sinh thái
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <TableOfContents />
        </div>
    );
}
