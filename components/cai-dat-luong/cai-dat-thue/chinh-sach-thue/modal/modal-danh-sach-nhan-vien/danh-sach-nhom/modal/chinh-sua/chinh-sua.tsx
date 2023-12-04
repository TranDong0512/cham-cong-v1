import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  List,
  Checkbox,
  Tabs,
  Avatar,
} from 'antd'
import styles from './chinh-sua.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { Lenxuong } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'

const { TextArea } = Input
const infoNV = [
  {
    key: '1',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
  {
    key: '2',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
  {
    key: '3',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
  {
    key: '4',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
]
export function ModalChinhSua(open: boolean, setOpen: Function, data: any) {
  const onClick = () => {
    setOpen(false)
  }
  const [ND, setND] = useState('')
  const handleInputChange = (event: any) => {
    setND(event.target.value)
  }
  const handelSubmit = (event: any) => {
    event.preventDefaut()
  }
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
        <div className={styles.textHead}>Chỉnh sửa nhóm thuế</div>
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
            defaultValue={data.tienthue}
            suffix='VNĐ'
          />
        </div>
        <div className={styles.khungbutton}>
          <button className={styles.button}>
            <p className={styles.textbutton}>Cập nhật</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}
