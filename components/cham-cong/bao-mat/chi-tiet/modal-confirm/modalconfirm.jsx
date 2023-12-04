import React, { useState } from 'react'
import styles from './mdcf.module.scss'
import Image from 'next/image'
import ModalSuccess from '../modal-success/modalsuccess'
import { DELETE } from '@/pages/api/BaseApi'
const ModalConfirm = ({ open, setOpen, dataSelected, setSuccess }) => {
  const handleSubmit = () => {
    dataSelected?.user_id &&
      dataSelected.shift_id &&
      DELETE('api/qlc/setIp/deletePersonal', {
        user_id: dataSelected?.user_id,
        shift_id: dataSelected?.shift_id,
      }).then((res) => {
        console.log("CHECK RES DELETE")
        console.log(res)
        if (res?.data?.result === true) {
          setOpen(false)
          setSuccess(true)
        } else {
          setOpen(false)
          alert("Xóa KHÔNG thành công. Vui lòng kiểm tra lại!")
        }
      })
  }
  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup_main}>
          <Image src="/img/question_2.png" width={56} height={56} alt="" />
          <div className={styles.popup_content}>
            <div className={styles.text_confirm}>Bạn muốn xóa cài đặt này</div>
            <div className={styles.group_btn}>
              <div className={styles.btn_huy} onClick={() => setOpen(false)}>
                <div className={styles.text_huy}>Hủy</div>
              </div>
              <div className={styles.btn_luu} onClick={handleSubmit}>
                <div className={styles.text_luu}>Xóa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalConfirm
