import { Row, Col, Modal, Input, Checkbox, Button, Form, Select, Skeleton  } from "antd"
const { Option } = Select;
import styles from "./modal-them-moi-nhom-bao-hiem.module.css"
import Image from "next/image"
import { useState } from "react";


export function ModalThemMoiNhomBaoHiem(
{
    openAddGroupClick,
    setOpenAddGroupClick,
}: {
    openAddGroupClick: boolean
    setOpenAddGroupClick: any
}) {
    
    return (
    <Modal
    open={openAddGroupClick}
    width={600}
    closable={false}
    cancelButtonProps={{ style: { display: "none" } }}
    okButtonProps={{ style: { display: "none" } }}
    className={`modal_thiet_lap modal_themMoiNhomBaoHiem`}
    >
        <div className={styles.header}>
            <div className={styles.textHead}>Thêm mới nhóm bảo hiểm</div>
            <div className={styles.crossImage}>
                <Image
                    alt="/"
                    src={"/cross.png"}
                    width={14}
                    height={14}
                    onClick={() => setOpenAddGroupClick(false)}
                />
            </div>  
        </div>

        <div className={styles.body}>
            <div className={styles.bodyItem}>
                Tên nhóm <span style={{ color: "red", fontSize:"16px" }}>*</span>
                <Input
                    required
                    type="text"
                    style={{ width: "100%",fontSize:"16px" }}
                    placeholder="Nhập tên nhóm"
                ></Input>
            </div>
            <div className={styles.hasButton}>
                <Button className={styles.ButtonWhite} onClick={()=>setOpenAddGroupClick(false)} style={{ marginRight:"20px"}}>
                    <p className={styles.txt}>Hủy</p>
                </Button>
                <Button className={styles.Button} htmlType="submit" onClick={()=>setOpenAddGroupClick(false)}>
                    <p className={styles.txt}>Thêm mới</p>
                </Button>
            </div>
        </div>
    </Modal>
    )
  }