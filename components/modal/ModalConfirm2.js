/** @format */

import React from 'react';
import styles from './Modal.module.scss';

export default function ModalConfirm2({setOpen}) {
   return (
      <div>
         <div className={styles.modalconfirm2}>
            <img src='../img/question.png' alt='' width={56} height={56} />
            <span>
               Bạn muốn xóa tài khoản <b>Trần Hoài Phương Chi</b> khỏi hệ thống của <b>Công ty TNHH Hưng Việt</b>?
            </span>
            <div className={styles.btn_wrap}>
               <button className={styles.btn_cancel} onClick={() => setOpen(false)}>
                  Hủy
               </button>
               <button className={styles.btn_delete}>Xóa</button>
            </div>
         </div>
         <div className={styles.dark_overlay}></div>
      </div>
   );
}
