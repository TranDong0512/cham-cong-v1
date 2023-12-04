/** @format */

import React from 'react';
import styles from './Modal.module.scss';

export default function ModalSuccess({setSuccess}) {
   return (
      <div>
         <div className={styles.modalsuccess}>
            <img src='../img/tick-circle.png' alt='' width={80} height={80} />
            <span>Xóa thành công!</span>
            <button onClick={() => setSuccess(false)}>Đóng</button>
         </div>
         <div className={styles.dark_overlay}></div>
      </div>
   );
}
