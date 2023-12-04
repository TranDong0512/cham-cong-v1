import { Modal, Input, Select, Button, Form } from "antd"
import styles from './xoa.module.css'
import Image from "next/image"
export function ModalXoa(
    open:boolean,
    setOpen:Function,
    key:any
){
    // console.log(key)
    return(
        <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={500}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        >
        <div className={styles.body}>
           <div className={styles.logo}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <g clip-path="url(#clip0_897_133047)">
                        <circle cx="25" cy="25" r="25" fill="#FF5B4D"/>
                        <path d="M15 15L35 35" stroke="white" stroke-width="4" stroke-linecap="round"/>
                        <path d="M35 15L15 35" stroke="white" stroke-width="4" stroke-linecap="round"/>
                        <path d="M15 15L35 35" stroke="white" stroke-width="4" stroke-linecap="round"/>
                        <path d="M35 15L15 35" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_897_133047">
                        <rect width="50" height="50" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
           </div>
           <div className={styles.title}>Bạn có chắc muốn xoá nhóm thuế này</div>
           <div className={styles.button}>
                <button className={styles.button1} onClick={() => setOpen(false)}>Huỷ</button>
                <button className={styles.button2}>Đồng ý</button>
           </div>
        </div>
        </Modal>
    )
}