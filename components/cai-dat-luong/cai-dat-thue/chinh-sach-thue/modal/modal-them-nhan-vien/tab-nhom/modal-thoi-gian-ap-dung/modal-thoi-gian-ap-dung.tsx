import { Modal, Input, Select, Button, Form, List, Checkbox, Tabs } from 'antd'
import styles from './modal-thoi-gian-ap-dung.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { Lenxuong } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'

const { TextArea } = Input
export function ModalApDungNhom(open: boolean, setOpen: Function, key: any) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={710}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thời gian áp dụng</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.apdung}>
          <div className={styles.text}>
            <p className={styles.title}>Áp dụng từ tháng</p>
            <p className={styles.dau}>*</p>
          </div>
          <Input className={styles.inputap} type='month' />
        </div>
        <div className={styles.apdung}>
          <div className={styles.text}>
            <p className={styles.title}>Đến tháng (Không bắt buộc)</p>
          </div>
          <Input className={styles.inputap} type='month' />
        </div>
        <div className={styles.apdung}>
          <div className={styles.text}>
            <p className={styles.title}>Nhập tiền thuế</p>
            <p className={styles.dau}>*</p>
          </div>
          <Input
            className={styles.inputap}
            placeholder='Nhập số tiền (VNĐ)'
            suffix={<Lenxuong />}
          />
        </div>
        <div className={styles.khungbutton}>
          <button className={styles.button}>
            <p className={styles.textbutton}>Lưu</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}
