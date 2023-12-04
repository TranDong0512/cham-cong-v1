/** @format */

import React, { useState } from 'react'
import styles from './Modal.module.scss'
import { Col, Row, Select, Tabs } from 'antd'
export default function ModalEditListNVAccess365({ setOpen }) {
  const ctyData = ['Tùy chọn', 'Hưng Hà', 'Hưng H']

  return (
    <div>
      <div className={styles.modaleditlistnvaccess365}>
        <div className={styles.header}>
          <div className={styles.left}>Chỉnh sửa</div>
          <div
            className={styles.right}
            style={{ cursor: 'pointer' }}
            onClick={() => setOpen(false)}>
            <img src='../img/tabler_plus.png' alt='' />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.search_select}>
            <div className={styles.search}>
              <img src='../img/qlc_search.png' alt='' />
              <input type='text' placeholder='Tìm kiếm' />
            </div>
            <Select
              defaultValue={ctyData[0]}
              className={styles.select}
              options={ctyData.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
          <div className={styles.form}>
            <span className={styles.title_dep}>Phòng 1</span>
            <SelectUser check={true} />
            <SelectUser check={true} />
            <SelectUser check={true} />
            <SelectUser check={true} />
            <SelectUser check={true} />
          </div>
          <div className={styles.form}>
            <span className={styles.title_dep}>Phòng 2</span>
            <SelectUser check={true} />
            <SelectUser check={true} />
            <SelectUser check={true} />
          </div>
          <div className={styles.btn_wrap}>
            <button className={styles.btn_cacel} onClick={() => setOpen(false)}>
              Hủy
            </button>
            <button className={styles.btn_add}>Lưu</button>
          </div>
        </div>
      </div>
      <div className={styles.dark_overlay}></div>
    </div>
  )
}
