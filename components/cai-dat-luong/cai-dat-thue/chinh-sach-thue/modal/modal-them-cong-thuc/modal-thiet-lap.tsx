import { Modal, Input, Select, Button, Form, List, Checkbox } from "antd";
import styles from "./modal-thiet-lap-cong-thuc.module.css";
import Image from "next/image";
import { values } from "lodash";
import React, { useState, useEffect } from "react";
const { TextArea } = Input;

const congThuc = [
  {
    key: "1",
    title: "dong_gop",
    noidung: "Các khoản đóng góp",
    url: "/Order_light.png",
  },
  {
    key: "2",
    title: "cong_thuc",
    noidung: "Số công thức thực",
    url: "/Order_light.png",
  },
  {
    key: "3",
    title: "cong_sau-phat",
    noidung: "Số công thực tế còn lại sau phạt",
    url: "/Order_light.png",
  },
  {
    key: "4",
    title: "cong_sau-phat",
    noidung: "Số công thực tế còn lại sau phạt",
    url: "/Order_light.png",
  },
];
export function ModalThietLapCongThuc(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  form: any,
  taxSelected?: any
) {
  const [fsData, setFsData]: any = useState("");
  const [listCt, setListCt]: any[] = useState([]);
  const [fsRepica, setFsRepica]: any = useState("");

  const handleInputChange = (event: any) => {
    setFsRepica(event.target.value);
  };

  useEffect(() => {
    if (taxSelected?.cl_id) {
      form.setFieldsValue(taxSelected);
      setListCt(taxSelected?.TinhluongFormSalary);
      setFsData(`${taxSelected?.TinhluongFormSalary?.[0]?.fs_data}`);
    }
  }, [form, taxSelected]);

  useEffect(() => {
    if (listCt?.length > 0) {
      form.setFieldValue("fs_name", listCt?.[0]?.fs_name);
      let repica = "";
      listCt?.map((ct, index) => {
        if (index === listCt?.length - 1) {
          repica += `${ct?.fs_repica}`;
        } else {
          repica += `${ct?.fs_repica} `;
        }
      });
      setFsRepica(repica);
    }
  }, [listCt]);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={710}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Công thức</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <Form
        form={form}
        initialValues={{ fs_name: "", fs_data: "", fs_repica: "" }}
      >
        <div className={styles.body}>
          <div className={styles.tieude}>Thêm công thức</div>
          <div className={styles.tq}>
            <div className={styles.khung}>
              <Form.Item name={"fs_name"}>
                <Input
                  className={styles.nameCT}
                  placeholder="nhập tên công thức"
                  type="text"
                  prefix={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 6H19M5 10H19M5 14H19M5 18H19"
                        stroke="#ACACAC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                />
              </Form.Item>
              <Form.Item name={"fs_data"}>
                <div className={styles.option}>
                  <div style={{ display: "flex", flex: "1" }}>
                    <input
                      type="radio"
                      className={styles.nut}
                      value="1"
                      id="hangso"
                      name="drone"
                      onChange={(e) => {
                        setFsData(e.target.value);
                      }}
                      checked={fsData === "1" ? true : false}
                    ></input>
                    <label className={styles.hs}>Hằng số</label>
                  </div>
                  <div style={{ display: "flex", flex: "1" }}>
                    <input
                      type="radio"
                      className={styles.nut}
                      value="2"
                      id="congthuc"
                      name="drone"
                      onChange={(e) => {
                        setFsData(e.target.value);
                      }}
                      checked={fsData === "2" ? true : false}
                    ></input>
                    <label className={styles.hs}>Công thức</label>
                  </div>
                </div>
              </Form.Item>
              <List
                dataSource={congThuc}
                className={styles.tableCongThuc1}
                renderItem={(item) => (
                  <div
                    className={styles.theTable}
                    onClick={() => {
                      setFsRepica(fsRepica + ` ${item?.title}`);
                    }}
                  >
                    <div style={{ padding: "2px 0" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="5"
                          y="4"
                          width="14"
                          height="17"
                          rx="2"
                          stroke="#4C5BD4"
                          stroke-width="1.5"
                        />
                        <path
                          d="M9 9H15"
                          stroke="#4C5BD4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9 13H15"
                          stroke="#4C5BD4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9 17H13"
                          stroke="#4C5BD4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className={styles.title}>{item.title}</p>
                      <p>{item.noidung}</p>
                    </div>
                  </div>
                )}
              />
              <Form.Item name={"fs_repica"}></Form.Item>
              <TextArea
                style={{ resize: "none" }}
                className={styles.noidung}
                rows={6}
                value={fsRepica}
                onChange={(e) => setFsRepica(e.target.value)}
              />

              <div className={styles.button}>
                <button
                  className={styles.ThemCC}
                  onClick={() => {
                    form.setFieldValue("fs_data", fsData);
                    form.setFieldValue("fs_repica", fsRepica);
                    setOpen(false);
                  }}
                >
                  Thêm công thức
                </button>
              </div>
            </div>

            <List
              dataSource={congThuc}
              className={styles.tableCongThuc2}
              renderItem={(item) => (
                <div
                  className={styles.theTable}
                  onClick={() => {
                    setFsRepica(fsRepica + ` ${item?.title}`);
                  }}
                >
                  <div style={{ padding: "2px 0" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="5"
                        y="4"
                        width="14"
                        height="17"
                        rx="2"
                        stroke="#4C5BD4"
                        stroke-width="1.5"
                      />
                      <path
                        d="M9 9H15"
                        stroke="#4C5BD4"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M9 13H15"
                        stroke="#4C5BD4"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M9 17H13"
                        stroke="#4C5BD4"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.title}>{item.title}</p>
                    <p>{item.noidung}</p>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
}
