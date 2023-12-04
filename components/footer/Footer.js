import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div>
                <div className={styles.footer_main}>
                    <div className={styles.footer_content}>
                        <div className={styles.ft_bottom}>
                            <div className={styles.left}>
                                <div className={styles.left_top}>
                                    <span>Đơn vị chủ quản:</span>
                                    <h2>Công ty Cổ phần Thanh toán Hưng Hà</h2>
                                    <Link
                                        href="https://goo.gl/maps/stYYuH5Ln5U2"
                                        rel="nofollow"
                                        target="_blank"
                                        className="wrap_address_txt"
                                    >
                                        <span>
                                            VP1: Tầng 4, B50, Lô 6, KĐT Định
                                            Công, Hoàng Mai, Hà Nội
                                        </span>
                                    </Link>

                                    <span>
                                        VP2: Thôn Thanh Miếu, Xã Việt Hưng,
                                        Huyện Văn Lâm, Tỉnh Hưng Yên{" "}
                                    </span>

                                    <span>Hotline: 0982.079.209</span>
                                    <span>
                                        Email hỗ trợ: hungha365@gmail.com
                                    </span>
                                </div>
                                <div className={styles.left_bottom}>
                                    <div className={styles.left_bottom_left}>
                                        <div
                                            className={
                                                styles.left_bottom_left_item
                                            }
                                        >
                                            <img
                                                src="/arrow_right_fill.png"
                                                alt="xxx"
                                            />
                                            <Link href="https://hungha365.com/gioi-thieu-chung">
                                                <span>Giới thiệu chung</span>
                                            </Link>
                                        </div>
                                        <div
                                            className={
                                                styles.left_bottom_left_item
                                            }
                                        >
                                            <img
                                                src="/arrow_right_fill.png"
                                                alt="xxx"
                                            />
                                            <Link href="https://hungha365.com/thong-tin-can-biet">
                                                <span>Thông tin cần biết</span>
                                            </Link>
                                        </div>

                                        <div
                                            className={
                                                styles.left_bottom_left_item
                                            }
                                        >
                                            <img
                                                src="/arrow_right_fill.png"
                                                alt="xxx"
                                            />
                                            <Link href="https://hungha365.com/thoa-thuan-su-dung">
                                                <span>Thỏa thuận sử dụng</span>
                                            </Link>
                                        </div>
                                        <div
                                            className={
                                                styles.left_bottom_left_item
                                            }
                                        >
                                            <img
                                                src="/arrow_right_fill.png"
                                                alt="xxx"
                                            />
                                            <Link href="https://hungha365.com/so-do-website">
                                                <span>Sơ đồ website</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={styles.left_bottom_right}>
                                        <div
                                            className={
                                                styles.left_bottom_left_item
                                            }
                                        >
                                            <img
                                                src="/arrow_right_fill.png"
                                                alt="xxx"
                                            />
                                            <Link href="https://hungha365.com/tam-nhin-va-su-menh">
                                                <span>Tầm nhìn và sứ mệnh</span>
                                            </Link>
                                        </div>
                                        <div
                                            className={
                                                styles.left_bottom_right_item
                                            }
                                        >
                                            <img
                                                src="/arrow_right_fill.png"
                                                alt="xxx"
                                            />
                                            <Link href="https://hungha365.com/quy-dinh-bao-mat">
                                                <span>Quy định bảo mật</span>
                                            </Link>
                                        </div>
                                        <div
                                            className={
                                                styles.left_bottom_right_item
                                            }
                                        >
                                            <img
                                                src="/arrow_right_fill.png"
                                                alt="xxx"
                                            />
                                            <Link href="https://hungha365.com/quy-trinh-giai-quyet-tranh-chap">
                                                <span>
                                                    Quy trình giải quyết tranh
                                                    chấp
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                        margin: "16px",
                                        gap: "16px",
                                    }}
                                >
                                    <div>
                                        <Link href="https://app.timviec365.vn/Download/Chat365/InstallAndUpdate/Chat365.msi">
                                            <div
                                                style={{
                                                    marginBottom: "4px",
                                                    color: "#fff",
                                                }}
                                            >
                                                Tải app chat winform :{" "}
                                            </div>
                                            <span
                                                style={{
                                                    color: "#4d5cd4",
                                                }}
                                            >
                                                Tại đây
                                            </span>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href="https://app.timviec365.vn/Download/QuanLyChung365/Install/QuanLyChung365.exe">
                                            <div
                                                style={{
                                                    color: "#fff",
                                                    marginBottom: "4px",
                                                }}
                                            >
                                                Tải app QLC365 winform :{" "}
                                            </div>
                                            <span
                                                style={{
                                                    color: "#4d5cd4",
                                                }}
                                            >
                                                Tại đây
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <span>Tải APP Chat 365 tại đây</span>
                                <img src="/qr_footer.png" alt="xxx" />
                            </div>
                        </div>
                        <div className={styles.app_mb}>
                            <span>Tải APP Chat 365 tại đây</span>
                            <div className={styles.icon_app}>
                                <img src="/app_store.png" alt="xxx" />
                                <img src="/gg_play.png" alt="xxx" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
