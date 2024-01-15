import { POST } from '@/pages/api/BaseApi'
import styles from './modal-sao-chep.module.css'
import { Modal, Button, Input } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function SaoChep(
    open: boolean,
    setOpen: Function,
    data: any,
    cySelected: any,
    setDataTotal: Function
) {
    const [applyMonth, setApplyMonth]: any = useState("")
    const [selectMonth, setSelectMonth] = useState('')
    const [cycleName, setCycleName]: any = useState('')
    const router = useRouter()

    const handleSubmit = () => {
        if (cySelected?.cy_id) {
            // console.log(applyMonth)
            if (applyMonth !== "") {
                if (cycleName) {

                    POST('api/qlc/cycle/copy_cycle', {
                        cy_id_old: cySelected?.cy_id,
                        apply_month_new: applyMonth,
                        cy_name_new: cycleName
                    })
                        .then(res => {
                            if (res?.result === true) {
                                setApplyMonth("")
                                setSelectMonth("")
                                setCycleName("")
                                setOpen(false)
                                //router.replace(router.asPath)
                                setDataTotal()

                            }
                        })
                }
                else {
                    window.alert('Thiếu tên lịch làm việc mới')
                }
            }
            else {
                window.alert('Thiếu thông tin tháng áp dụng')
            }
        }
    }


    return (
        <Modal
            open={open}
            onCancel={() => {
                setSelectMonth('')
                setOpen(false)
            }}
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
                    onClick={() => {
                        setSelectMonth('')
                        setOpen(false)
                    }}
                />
            </div>
            <div className={styles.body}>
                <div>
                    Chọn tháng áp dụng lịch làm việc <span style={{ color: 'red' }}>*</span>
                    <Input
                        value={selectMonth}
                        onChange={(e) => {
                            setSelectMonth(e.target.value)
                            setApplyMonth(`${e.target.value}-01`)
                        }}
                        placeholder='Chọn tháng'
                        type='month'
                        style={{ width: '100%' }}>
                    </Input>
                </div>
                <div>
                    Tên lịch làm việc mới <span style={{ color: 'red' }}>*</span>
                    <Input
                        value={cycleName}
                        onChange={(e) => {
                            setCycleName(e.target.value)
                        }}
                        placeholder='Tên lịch làm việc mới'
                        type='text'
                        style={{ width: '100%' }}>
                    </Input>
                </div>
                <Button className={styles.button} onClick={handleSubmit}>
                    <p className={styles.txt}>Lưu lại</p>
                </Button>
                <div style={{ color: 'black' }}>
                    Lưu ý: Những nhân viên đã được xét lịch làm việc trong tháng áp dụng sẽ không được cài đặt trong lịch làm việc sao chép này.
                </div>
            </div>
        </Modal>
    )
}