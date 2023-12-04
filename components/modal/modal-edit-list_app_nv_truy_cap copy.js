/** @format */

import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {Col, Row, Tabs} from 'antd';
import SelectApp from '../modalItem/SelectApp';

export default function ModalEditAppAccess({setOpen}) {
   const [show, setShow] = useState('quan-ly-nhan-su');
   const items = [
      {
         label: 'Quản lý nhân sự',
         key: '1',
      },
      {
         label: 'Giao việc',
         key: '2',
      },
      {
         label: 'Quản lý nội bộ',
         key: '3',
      },
      {
         label: 'Bán hàng',
         key: '4',
      },
      {
         label: 'Phần mềm theo ngành nghề',
         key: '5',
      },
   ];
   const handleOnChange = (key) => {
      console.log(key);
      if (key === '1') {
         setShow('quan-ly-nhan-su');
      } else if (key === '2') {
         setShow('giao-viec');
      } else if (key === '3') {
         setShow('quan-ly-noi-bo');
      } else if (key === '4') {
         setShow('ban-hang');
      } else if (key === '5') {
         setShow('phan-mem-theo-nganh-nghe');
      }
   };
   return (
      <div>
         <div className={styles.modalviewappaccess}>
            <div className={styles.header}>
               <div className={styles.left}>Danh sách phần mềm Trần Hoài Phương Chi có quyền truy cập</div>
               <div className={styles.right} style={{cursor: 'pointer'}} onClick={() => setOpen(false)}>
                  <img src='../img/tabler_plus.png' alt='' />
               </div>
            </div>
            <div className={styles.content}>
               <div className={styles.tab_pane}>
                  <Tabs items={items} onChange={(key) => handleOnChange(key)} /> <Tabs />
                  <Row gutter={[24, 24]}>
                     {show === 'quan-ly-nhan-su' && (
                        <>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Chat365'} img={'chat_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Tính lương'} img={'tinh_luong_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Quản trị nhân sự'} img={'quan_tri-ns_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Chấm công'} img={'cham_cong_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Phần mềm CRM'} img={'crm_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Văn thư lưu trữ'} img={'van_thu_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Quản lý tài sản'} img={'ql_tai_san_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Phần mềm giao việc'} img={'giao_viec_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Quản lý KPI'} img={'kpi_blue.png'} />
                           </Col>
                           <Col xxl={12} sm={24} md={12} xl={12} xs={24} lg={12}>
                              <SelectApp check={true} app_name={'Đánh giá năng lực nhân viên'} img={'danh_gia_nl_blue.png'} />
                           </Col>
                        </>
                     )}
                  </Row>
               </div>
               <div className={styles.btn_close} onClick={() => setOpen(false)}>
                  <button>Đóng</button>
               </div>
            </div>
         </div>
         <div className={styles.dark_overlay}></div>
      </div>
   );
}
