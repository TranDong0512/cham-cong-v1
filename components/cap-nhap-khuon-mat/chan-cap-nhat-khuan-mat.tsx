import { useState, useEffect } from "react";
import styles from "./chan-cap-nhat-khuan-mat.module.css";
import { Image } from "antd";
import {
  AndroidOutlined,
  AppleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import Head from "next/head";

export default function BlockFaceUpdate() {
  const openPlayStore = () => {
    const appPackageName = "vn.timviec365.chat_365";

    window.open(
      `https://play.google.com/store/apps/details?id=${appPackageName}`,
      "_blank"
    );
  };

  const openAppStore = () => {
    const appID = "vn.timviec365.chat365";

    window.open(`https://apps.apple.com/app/id${appID}`, "_blank");
  };

  const openMicrosoftStore = () => {
    const appPackageName = "vn.timviec365.chat365";

    window.open(
      `ms-windows-store://pdp/?ProductId=${appPackageName}`,
      "_blank"
    );
  };
  return (
    <>
      <Head>
        <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          integrity="sha256-kJ3+5n1lRn7d3M3cwJKMeNRbFYA2YJ+a9z4tDl8+4Pc="
          crossOrigin="anonymous"
        />
      </Head>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.ctn_qmk}>
            <div className={styles.ctn_set_vip}>
              <img
                src="https://hungha365.com/img/bgd_ncapv.png"
                className={styles.wn_vip}
              ></img>
              <p className={styles.wn_text_1}>
                Bạn cần tải chat365 tại đây để cập nhật lại khuôn mặt!{" "}
              </p>

              <div className={styles.ctn_phone_box}>
                <div className={styles.box_hl_chat}>
                  <div className={styles.mobi}>
                    <div className={styles.ctn_vipchung}>
                      <button
                        onClick={openPlayStore}
                        style={{ backgroundColor: "#ff993a" }}
                      >
                        <AndroidOutlined
                          style={{ color: "#fff", fontSize: 18 }}
                        />
                        <p className={styles.cr_weight}>CH Play</p>
                      </button>
                    </div>
                    <div className={styles.ctn_vipchung}>
                      <button
                        onClick={openMicrosoftStore}
                        style={{
                          background:
                            "linear-gradient(92.55deg, #039dfc 9.78%, #4051c4 99.38%)",
                        }}
                      >
                        <AppleOutlined
                          style={{ color: "#fff", fontSize: 18 }}
                        />
                        <p className={styles.cr_weight}>App Store</p>
                      </button>
                    </div>
                  </div>

                  <div className={styles.pc}>
                    <div className={styles.ctn_vipchung}>
                      <button
                        onClick={openMicrosoftStore}
                        style={{ backgroundColor: "#ff993a" }}
                      >
                        <DownloadOutlined
                          style={{ color: "#fff", fontSize: 18 }}
                        />
                        <p className={styles.cr_weight}>Tải xuống</p>
                      </button>
                    </div>
                  </div>
                </div>
                <p className={styles.wn_text_2}>
                  Tải chat365 để hỗ trợ cập nhật khuân mặt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
