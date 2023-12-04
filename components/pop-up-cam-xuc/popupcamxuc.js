import React from 'react';
import styles from './ppcx.module.scss';
import Image from 'next/image';
const PopUpCamXuc = () => {
  return (
    <>
      <div className={styles.popup_status}>
        <div className={styles.popup_status_main}>
          <div className={styles.text_top}>
            AI365 cho biết điểm cảm xúc của bạn là 8.5/10
          </div>
          <div className={styles.icon}>
            <Image src="/img/happy.png" height={126} width={126} alt="" />
          </div>
          <div className={styles.text_under}>
            Hôm nay bạn có chuyện gì vui vậy?
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpCamXuc;
