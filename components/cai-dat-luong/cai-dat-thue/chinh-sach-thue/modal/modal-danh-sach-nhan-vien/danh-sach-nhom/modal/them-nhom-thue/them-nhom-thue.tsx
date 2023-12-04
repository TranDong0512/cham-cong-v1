import {
    Modal,
    Input,
    Select,
    Button,
    Form,
    List,
    Checkbox,
    Tabs,
    Avatar
  } from "antd"
  import styles from "./them-nhom-thue.module.css"
  import Image from "next/image"
  import React, { useState } from "react"
  export function ModalThemMoiNhomThue(open: boolean, setOpen: Function, data: any) {
    const onClick = () => {
      setOpen(false)
    }
    const [ND, setND] = useState("")
    const handleInputChange = (event: any) => {
      setND(event.target.value)
    }
    const handelSubmit = (event: any) => {
      event.preventDefaut()
    }
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
          <div className={styles.textHead}>Thêm mới nhóm thuế</div>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.apdung}>
            <div className={styles.text}>
              <p className={styles.title}>Tên nhóm</p>
              <p className={styles.dau}>*</p>
            </div>
            <Input className={styles.inputap} size="large" placeholder="Nhập tên nhóm" />
          </div>
          <div className={styles.khungbutton}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
              <p className={styles.textbutton1}>Huỷ</p>
            </button>
            <button className={styles.button2}>
              <p className={styles.textbutton2}>Thêm mới</p>
            </button>
          </div>
        </div>
      </Modal>
    )
  }
  