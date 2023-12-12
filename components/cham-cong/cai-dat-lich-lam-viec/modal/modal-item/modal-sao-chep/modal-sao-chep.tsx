import { POST } from '@/pages/api/BaseApi'
import styles from './modal-sao-chep.module.css'
import { Modal, Button, Input } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'

export function SaoChep(
    open:boolean,
    setOpen:Function,
    data: any,
    cySelected: any
){
    const [applyMonth, setApplyMonth]: any = useState("")
    const router = useRouter()

    const handleSubmit = () => {
        if (cySelected) {
            // console.log(applyMonth)
            if (applyMonth !== "") {
                POST('api/qlc/cycle/create', {
                    cy_name: `Bản sao của ${cySelected?.cy_name}`,
                    apply_month: applyMonth,
                    cy_detail: JSON.stringify(cySelected?.cy_detail)
                })
                    .then(res => {
                        if (res?.result === true) {
                            setOpen(false)
                            router.replace(router.asPath)
                        }
                    })
            }
        }
    }
    

    return(
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            width={600}
            closable={false}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
        >
        <div className={styles.header}>
            <div></div>
            <div></div>
            <Image
                alt="/"
                src={"/cross.png"}
                width={14}
                height={14}
                onClick={() => setOpen(false)}
            />
        </div>
        <div className={styles.body}>
            <div>
                Chọn tháng áp dụng lịch làm việc <span style={{color:'red'}}>*</span>
                <Input onChange={(e) => setApplyMonth(`${e.target.value}-01`)} placeholder='Chọn tháng' type='month'style={{width:'100%'}}></Input>
            </div>
            <Button className={styles.button} onClick={handleSubmit}>
                <p className={styles.txt}>Lưu lại</p>
            </Button>
            <div style={{color:'black'}}>
            Lưu ý: Những nhân viên đã được xét lịch làm việc trong tháng áp dụng sẽ không được cài đặt trong lịch làm việc sao chép này.
            </div>
        </div>  
        </Modal>
    )
}