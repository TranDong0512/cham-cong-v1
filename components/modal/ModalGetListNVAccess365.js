/** @format */

import React, { useState } from 'react'
import styles from './Modal.module.scss'
// import SelectUser from '../modalItem/selectUser'
export default function ModalGetListNVAccess365({ setOpen }) {
  return (
    <div>
      <div className={styles.modaleditlistnvaccess365}>
        <div className={styles.header}>
          <div className={styles.left}>
            Danh sách nhân viên có quyền truy cập Chat365
          </div>
          <div
            className={styles.right}
            style={{ cursor: 'pointer' }}
            onClick={() => setOpen(false)}>
            <img src='../img/tabler_plus.png' alt='' />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.search_select}>
            <div className={styles.search} style={{ width: '100%' }}>
              <img src='../img/qlc_search.png' alt='' />
              <input type='text' placeholder='Tìm kiếm' />
            </div>
          </div>
          <div className={styles.form}>
            <span className={styles.title_dep}>Phòng 1</span>
            {/* <SelectUser />
            <SelectUser />
            <SelectUser />
            <SelectUser />
            <SelectUser /> */}
          </div>
          <div className={styles.form}>
            <span className={styles.title_dep}>Phòng 2</span>
            {/* <SelectUser />
            <SelectUser />
            <SelectUser /> */}
          </div>
          <div className={styles.btn_wrap}>
            <button className={styles.btn_cacel} onClick={() => setOpen(false)}>
              Hủy
            </button>
            <button className={styles.btn_add}>Chỉnh sửa</button>
          </div>
        </div>
      </div>
      <div className={styles.dark_overlay}></div>
    </div>
  )
}
