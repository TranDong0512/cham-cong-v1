import { Modal, Input, Select, Button, Form, List, Checkbox } from "antd";
import styles from "./nhap-luong-co-ban.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { message, Upload } from "antd";
import { POST, POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { CSVLink } from "react-csv";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

const { Dragger } = Upload;

export function ModalNhapLuongCoBan(open: boolean, setOpen: Function) {
  const [fileList, setFileList] = useState<any>([]);
  const [lastFileSelectedJson, setLastFileSelectedJson] = useState<any>();
  const router = useRouter();

  const readExcel = (file) => {
    try {
      //f = file
      var name = file.name;
      const reader = new FileReader();
      reader.onload = (evt) => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws);
        /* Update state */
        console.log("Data>>>" + data);
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(lastFileSelectedJson)

  const hanldeSubmit = async () => {
    const headers = lastFileSelectedJson?.[0];
    let com_id = null;
    com_id = getCompIdCS();

    // for (let i = 1; i < lastFileSelectedJson.length; i++) {
    //   com_id !== null && lastFileSelectedJson?.[i]?.[0] &&
    //   POST_TL('api/tinhluong/congty/insert_basic_salary', {
    //     sb_id_user: lastFileSelectedJson?.[i]?.[0],
    //     sb_id_com: com_id,
    //     sb_salary_basic: lastFileSelectedJson?.[i]?.[2],
    //     sb_time_up: dayjs(lastFileSelectedJson?.[i]?.[3]).format("YYYY-MM-DDT00:00:00.000Z")
    //   })
    //     .then(res => {
    //       if (res?.message === "success") {

    //       }
    //     })
    // }
    alert("Nhập lương cơ bản thành công!");
    // router.replace(router.asPath)
  };

  return (
    <Modal
      className="bannerQLC"
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.khungc1}>
          <Dragger
            beforeUpload={async (file) => {
              readExcel(file);
            }}
            fileList={fileList}
            onChange={(info) => {
              // if (info?.file) {
              //   Papa.parse(info?.file, {
              //     complete: function (results) {
              //       console.log('Finished:', results.data);
              //     },
              //   });
              // }
              setFileList(info?.fileList);
            }}
            accept=".csv,.xlsx,.xls"
            className={`draggerNhapLuong ${styles.khung1}`}
          >
            <div className={styles.iconUp}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.7283 11.3467C29.317 11.3467 33.2221 14.2963 34.6409 18.409L34.6617 18.4692C34.7816 18.8171 34.9131 19.1987 35.0552 19.5112C35.207 19.8451 35.4872 20.3769 36.0468 20.7758C36.5761 21.1531 37.126 21.2585 37.5083 21.2987C37.8366 21.3333 38.2143 21.3331 38.5344 21.333L38.5962 21.3329H40.3067C43.0076 21.3329 45.1972 23.5225 45.1972 26.2234V27.4218C45.1972 30.1227 43.0076 32.3123 40.3067 32.3123H30.5499L32.5499 34.3123H40.3067C44.1122 34.3123 47.1972 31.2273 47.1972 27.4218V26.2234C47.1972 22.4179 44.1122 19.3329 40.3067 19.3329H38.5962C37.8442 19.3329 37.4682 19.3329 37.2077 19.1472C36.9472 18.9615 36.8086 18.5599 36.5315 17.7567C34.8431 12.8624 30.1962 9.34668 24.7283 9.34668C19.3745 9.34668 14.8079 12.7171 13.0346 17.4519L13.0346 17.4519L13.0346 17.4519C12.6368 18.5141 12.4379 19.0451 12.1699 19.2241C11.9019 19.4032 11.2725 19.3813 10.0137 19.3375C9.92579 19.3345 9.83748 19.3329 9.74882 19.3329C5.61239 19.3329 2.25916 22.6862 2.25916 26.8226C2.25916 30.959 5.61239 34.3123 9.74882 34.3123C10.6336 34.3123 11.4825 34.1589 12.2704 33.8772C12.8131 33.6832 13.0844 33.5862 13.26 33.587C13.4356 33.5877 13.7118 33.6892 14.2643 33.892C15.0047 34.1639 15.8047 34.3123 16.6393 34.3123H16.9067L18.9067 32.3123H16.6393C16.0433 32.3123 15.4765 32.2066 14.9537 32.0146L14.9196 32.0021C14.6731 31.9115 14.4293 31.822 14.2259 31.7574C14.046 31.7003 13.6834 31.5888 13.2686 31.587C12.8567 31.5852 12.4974 31.6914 12.3157 31.7472C12.1138 31.8092 11.8727 31.8954 11.6311 31.9818L11.5972 31.9939C11.0222 32.1994 10.4009 32.3123 9.74882 32.3123C6.71696 32.3123 4.25916 29.8545 4.25916 26.8226C4.25916 23.7907 6.71696 21.3329 9.74882 21.3329C9.81432 21.3329 9.87945 21.3341 9.94423 21.3363L10.0083 21.3386C10.5823 21.3585 11.1121 21.377 11.529 21.3633L11.5343 21.3631C11.8556 21.3526 12.6217 21.3274 13.2807 20.8873C13.9218 20.4591 14.2309 19.8074 14.3693 19.5077C14.5341 19.151 14.7058 18.6924 14.8847 18.2144L14.9076 18.1533C16.3979 14.174 20.2354 11.3467 24.7283 11.3467ZM22.5635 34.3123H22.7283V34.1475L22.5635 34.3123ZM26.7283 34.3123H26.893L26.7283 34.1475V34.3123Z"
                  fill="#4C5BD4"
                />
                <path
                  d="M25 21.7393L24.3064 21.0189L25 20.351L25.6937 21.0189L25 21.7393ZM26 39.1306C26 39.6828 25.5523 40.1306 25 40.1306C24.4477 40.1306 24 39.6828 24 39.1306L26 39.1306ZM17.7846 27.2991L24.3064 21.0189L25.6937 22.4596L19.1719 28.7398L17.7846 27.2991ZM25.6937 21.0189L32.2154 27.2991L30.8281 28.7398L24.3064 22.4596L25.6937 21.0189ZM26 21.7393L26 39.1306L24 39.1306L24 21.7393L26 21.7393Z"
                  fill="#4C5BD4"
                />
              </svg>
            </div>
            <div className={styles.ktexthd}>
              <p className={styles.texthd}>Thả hoặc kéo vào đây hoặc</p>
            </div>
            <div className={styles.khungbutton}>
              <button className={styles.addfile}>
                <p className={styles.textaddfile}>Add file lương cơ bản</p>
              </button>
            </div>
          </Dragger>
        </div>
        <div className={styles.khung2}>
          <div className={styles.note}>
            <p className={styles.textnote}>
              Bạn cần tải file lương cơ bản theo mẫu bên dưới về máy, nhập lương
              cơ bản của các nhân viên vào file, sau đó add file lương cơ bản
              theo mẫu lên phần mềm
            </p>
          </div>
          <div className={styles.link}>
            <CSVLink
              filename={`fileMau`}
              data={[
                ["ID", "Name", "BasicSalary", "ApplyTime"],
                [135239, "Nguyễn Hiệu Năng", 10000, "2023-08-21"],
              ]}
              className={styles.link}
            >
              <p className={styles.textlink}>Tải file mẫu</p>
              <div className={styles.iconlink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                >
                  <path
                    d="M18.3913 7.52174L19.1116 6.8281L19.7796 7.52174L19.1116 8.21538L18.3913 7.52174ZM0.999992 8.52174C0.447708 8.52174 -7.62939e-06 8.07402 -7.62939e-06 7.52174C-7.62939e-06 6.96945 0.447708 6.52174 0.999992 6.52174V8.52174ZM12.8314 0.306358L19.1116 6.8281L17.671 8.21538L11.3908 1.69364L12.8314 0.306358ZM19.1116 8.21538L12.8314 14.7371L11.3908 13.3498L17.671 6.8281L19.1116 8.21538ZM18.3913 8.52174L0.999992 8.52174V6.52174L18.3913 6.52174L18.3913 8.52174Z"
                    fill="#4C5BD4"
                  />
                </svg>
              </div>
            </CSVLink>
          </div>
        </div>
        <div className={styles.khung3}>
          <Button className={styles.buttontailen} onClick={hanldeSubmit}>
            <p className={styles.texttailen}>Tải lên</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
