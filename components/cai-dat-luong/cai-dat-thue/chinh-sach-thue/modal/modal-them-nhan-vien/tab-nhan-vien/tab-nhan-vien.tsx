import {
  Avatar,
  List,
  Radio,
  Space,
  Card,
  Select,
  Input,
  Checkbox,
} from "antd";
import React, { useState } from "react";
import Image from "next/image";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import styles from "./tab-nhan-vien.module.css";
import { ModalApDung } from "./modal-thoi-gian-ap-dung/modal-thoi-gian-ap-dung";
import { useRouter } from "next/router";

export const DanhSachNhanVien = ({
  listEmp,
  taxSelected,
}: {
  listEmp: any;
  taxSelected: any;
}) => {
  const [modalApDung, setModalApDung] = useState(false);
  const [modalKey, setModalKey] = useState(Array<String>);
  const [thongbao, setThongBao] = useState(false);
  const [idNV, setIdNV] = useState(Array<Number>);
  const router = useRouter();
  const info = listEmp?.map((emp, index) => {
    return {
      key: `${index + 1}`,
      name: emp?.userName,
      id: emp?.idQLC,
      url: "",
    };
  });

  const checkModalKey = (x: any) => {
    if (modalKey.length == 0) {
      return setThongBao(true);
    }
    return setModalApDung(true), setThongBao(false);
  };
  return (
    <div className={styles.khung}>
      <List
        style={{ height: "500px" }}
        className={styles.list}
        dataSource={info}
        rowKey={(item: any) => item?.key}
        renderItem={(item: any, index) => (
          <List.Item>
            <div className={styles.the}>
              <Checkbox
                className={styles.checkbox}
                onChange={(e: CheckboxChangeEvent) => {
                  if (e.target.checked === true) {
                    setModalKey([...modalKey, item.key]);
                    setIdNV([...idNV, item.id]);
                  } else {
                    setModalKey(modalKey.filter((x) => x !== item.key));
                    setIdNV(idNV.filter((x) => x !== item.id));
                  }
                }}
              ></Checkbox>
              <Avatar
                src={item.url}
                style={{ width: "46px", height: "46px", margin: "auto" }}
              />
              <div className={styles.info}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.id}>{item.id}</p>
              </div>
            </div>
          </List.Item>
        )}
      />
      {thongbao ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          <p style={{ color: "red", fontSize: "16px" }}>
            Vui lòng chọn nhân viên!
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.khungbutton}>
        <button
          className={styles.button}
          onClick={() => checkModalKey(modalKey)}
        >
          <p className={styles.textbutton}>Tiếp tục</p>
        </button>
      </div>
      {ModalApDung(
        modalApDung,
        setModalApDung,
        modalKey,
        info,
        taxSelected,
        idNV
      )}
    </div>
  );
};
