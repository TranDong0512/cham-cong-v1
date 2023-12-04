import React from 'react'
import styles from './mdsc.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
const ModalSuccess = ({ open, setOpen }) => {
  const router = useRouter()
  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup_main}>
          <div className={styles.img_v}>
            <Image src="/img/tick-circle.png" width={80} height={80} alt="" />
          </div>

          <div className={styles.text_content}>Xóa thành công</div>
          <div className={styles.group_btn}>
            <div
              className={styles.btn_dong}
              onClick={() => {
                setOpen(false)
                router.replace(router.asPath)
              }}
            >
              <div className={styles.text_dong}>Đóng</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalSuccess
