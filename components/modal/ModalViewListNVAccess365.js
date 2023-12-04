/** @format */

import React from 'react';
import styles from './Modal.module.scss';
import {Col, Row, Select, Tabs} from 'antd';
export default function ModalViewListNVAccess365({setOpenModalGetListNVAccess}) {
   const ctyData = ['Chọn', 'Hưng Hà', 'Hưng H'];
   return (
      <div>
         <div className={styles.modalviewlistaccess365}>
            <div className={styles.header}>
               <div className={styles.left}>Thêm IP mới Công ty Cổ Phần Thanh Toán Hưng Hà</div>
               <div className={styles.right} style={{cursor: 'pointer'}} onClick={() => setOpenModalGetListNVAccess(false)}>
                  <img src='../img/tabler_plus.png' alt='' />
               </div>
            </div>
            <div className={styles.content}>
               <Row gutter={[22, 22]}>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <Select
                        defaultValue={ctyData[0]}
                        className={styles.select}
                        options={ctyData.map((item) => ({
                           label: item,
                           value: item,
                        }))}
                     />
                  </Col>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.btn_wrap}>
                        <button className={styles.btn_cacel}>Hủy</button>
                        <button className={styles.btn_add}>Lưu</button>
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
         <div className={styles.dark_overlay}></div>
      </div>
   );
}
