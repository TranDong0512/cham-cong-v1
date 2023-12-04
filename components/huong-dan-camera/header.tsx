import { Badge, Image } from "antd";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./heasder.module.scss";
export default function HeaderSupport() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#4C5BD4",
                color: "#fff",
                padding: "0 24px ",
            }}
        >
            <div>
                <div className={styles.LogoHeader}>
                    <Link href={"/"}>
                        <Image
                            preview={false}
                            alt="hungha365.com"
                            src="/alert/HH365.svg"
                            height={70}
                            width={140}
                        />
                    </Link>
                </div>
                <div className={styles.MenuHeader}>
                    <MenuOutlined rev="xxx" />
                </div>
            </div>
            <div className={styles.MenuHeader}>
                <Image
                    preview={false}
                    alt="hungha365.com"
                    src="/alert/HH365.svg"
                    height={70}
                    width={140}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    gap: "16px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        gap: "16px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    className={styles.Logo}
                >
                    <div>
                        <Link
                            style={{
                                color: "#fff",
                            }}
                            href="/"
                        >
                            Trang chủ
                        </Link>
                    </div>
                    <div>
                        <Link
                            style={{
                                color: "#fff",
                            }}
                            href="/"
                        >
                            Tin tức
                        </Link>
                    </div>{" "}
                    <div className={styles.linkHeader}>
                        <Link
                            href="/"
                            style={{
                                color: "#fff",
                            }}
                        >
                            Hướng dẫn
                        </Link>
                    </div>{" "}
                </div>

                <Badge count={5} showZero>
                    <Link href="/">
                        <div
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                padding: "2px",
                            }}
                        >
                            <Image
                                src="./img/Logo365.svg"
                                alt={"ic_chat"}
                                preview={false}
                                width={16}
                                height={16}
                            />
                        </div>
                    </Link>
                </Badge>
                <Badge count={5} showZero>
                    <Link href="/">
                        {" "}
                        <Image
                            src="./img/tb.svg"
                            alt={"ic_chat"}
                            preview={false}
                        />
                    </Link>
                </Badge>

                <div className={styles.LogoHeader}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: "30px",
                            backgroundColor: "#7C87E2",
                            cursor: "pointer",
                            gap: "2px",
                            padding: "4px",
                        }}
                    >
                        <Image
                            alt="avata"
                            src="./avatar.jpg"
                            width={24}
                            height={24}
                            preview={false}
                            style={{
                                borderRadius: "50%",
                            }}
                        />

                        <div
                            style={{
                                maxWidth: "140px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Công ty cổ phần Thanh toán hưng hà 2
                        </div>
                        <div
                            style={{
                                marginRight: "8px",
                            }}
                        >
                            <Image
                                src="./alert/down.svg"
                                preview={false}
                                alt="drop"
                            ></Image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
