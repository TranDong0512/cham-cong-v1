import { Modal, Input, Select, Button, Form } from "antd"
import styles from './modal-xoa.module.css'
import Image from "next/image"
import { POST_TL } from "@/pages/api/BaseApi"
export function ModalXoa(
    open:boolean,
    setOpen:Function,
    choosen:any,
    dsPhuCap:any,
    setDsPhuCap:any
){
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
           <div className={styles.title}>Bạn có chắc muốn xoá phụ cấp này?</div>
           <div className={styles.button}>
                <button className={styles.button1} onClick={()=>setOpen(false)}>
                        Huỷ
                </button>
                <button className={styles.button2} onClick={() => {
                        if(choosen){
                            POST_TL(
                                "api/tinhluong/congty/delete_phuc_loi",
                                {
                                    cl_id:choosen?.cl_id
                                }
                            ).then( res =>
                                {
                                    if(res?.data){
                                        setDsPhuCap(dsPhuCap.filter(data => data?.cl_id !== choosen?.cl_id))
                                        setOpen(false)
                                    }
                                }
                            )
                            
                        }
                    }
                }
                >
                        Đồng ý
                    </button>
           </div>
        </div>
        </Modal>
    )
}