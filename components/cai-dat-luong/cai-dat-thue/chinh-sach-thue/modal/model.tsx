import { Modal, Input, Select, Button, Form } from 'antd'
import styles from './modal-them-lich.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { ModalThietLapCongThuc } from './modal-them-cong-thuc/modal-thiet-lap'
import { POST_TL, getCompIdCS } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
const { TextArea } = Input
export function ModalThemThue(
  open: boolean,
  setOpen: Function,
  setNext: Function
) {
  const [modalAdd, setModalAdd] = useState(false)
  const [modalNext, setModalNext] = useState(false)
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSubmit = () => {
    // setOpen(false);
    // console.log(form.getFieldsValue())
    if (!form.getFieldValue('fs_data')) window.alert('Chưa nhập công thức tính')
    else {
      form.validateFields().then((value) => {
        let com_id = null
        com_id = getCompIdCS()
        com_id !== null &&
          POST_TL('api/tinhluong/congty/insert_category_tax', {
            com_id: com_id,
            ...value,
            fs_data:
              form.getFieldValue('fs_data') !== ''
                ? Number(form.getFieldValue('fs_data'))
                : undefined,
          }).then((res) => {
            console.log(res)
            if (res?.message === 'success') {
              // router.replace(router.asPath)
              window.alert('Thêm mới thuế thành công')
              setOpen(false)
              router.reload()
            }
          })
      })
    }
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
        <div className={styles.textHead}>Thêm mới chính sách thuế</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form
          form={form}
          initialValues={{
            cl_name: '',
            cl_note: '',
          }}>
          <div className={styles.bodyItem}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <p className={styles.titlename}>Tên chính sách thuế</p>
              <p className={styles.titledau}>*</p>
            </div>
            <Form.Item
              name={'cl_name'}
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc',
                },
              ]}>
              <Input
                placeholder='Nhập tên thuế'
                style={{
                  border: '1px solid #9F9F9F',
                  borderRadius: '5px',
                }}></Input>
            </Form.Item>
          </div>
          <Form.Item
            name={'cl_note'}
            label={<p>Miêu tả chính sách</p>}
            labelCol={{ span: 24 }}>
            <TextArea
              placeholder='Nhập miêu tả'
              style={{ resize: 'none', width: '100%' }}
              rows={6}
              className={styles.inputMota}
            />
          </Form.Item>
        </Form>
        <div className={styles.Tlap} onClick={() => setModalAdd(true)}>
          <div className={styles.TLtext}>Thiết lập công thức</div>
          <div className={styles.iconTL}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='15'
              viewBox='0 0 20 15'
              fill='none'>
              <path
                d='M18.3906 7.52174L19.1109 6.8281L19.7789 7.52174L19.1109 8.21538L18.3906 7.52174ZM0.999321 8.52174C0.447037 8.52174 -0.000679016 8.07402 -0.000679016 7.52174C-0.000679016 6.96945 0.447037 6.52174 0.999321 6.52174V8.52174ZM12.8308 0.306358L19.1109 6.8281L17.6703 8.21538L11.3901 1.69364L12.8308 0.306358ZM19.1109 8.21538L12.8308 14.7371L11.3901 13.3498L17.6703 6.8281L19.1109 8.21538ZM18.3906 8.52174L0.999321 8.52174V6.52174L18.3906 6.52174L18.3906 8.52174Z'
                fill='#4C5BD4'
              />
            </svg>
          </div>
        </div>
        {ModalThietLapCongThuc(modalAdd, setModalAdd, setModalNext, form)}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <button className={styles.Luu} onClick={handleSubmit}>
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  )
}
