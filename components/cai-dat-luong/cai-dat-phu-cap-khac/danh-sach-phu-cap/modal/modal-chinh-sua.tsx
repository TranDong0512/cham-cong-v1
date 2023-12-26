import { Modal, Input, Select, Button, Form, List, Checkbox } from 'antd'
import styles from './modal-chinh-sua.module.css'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { IconSelect } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import moment from 'moment'
import { POST_TL } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'

export function ModalChinhSua(open: boolean, setOpen: Function, data: any) {
  const [form] = Form.useForm()
  const router = useRouter()
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...data,
        cl_name: data?.cl_name,
        cl_day: moment(data?.cl_day).format('YYYY-MM-DD'),
        cl_day_end: moment(data?.cl_day_end).format('YYYY-MM-DD'),
      })
    }
  }, [data, open])
  const onFinish = (value) => {
    let finalValue = {
      ...value,
      cl_id: data.cl_id,
      cl_salary: parseInt(value?.cl_salary),
      cl_type: 4,
      cl_active: 1,
    }
    POST_TL('api/tinhluong/congty/sua_phuc_loi', finalValue).then((res) => {
      if (res?.data) {
        setOpen(false)
        // router.replace(router.asPath)
        router.reload()
      }
    })
  }
  const { TextArea } = Input
  const loai = [
    {
      value: 0,
      label: 'Thu nhập chịu thuế',
    },
    {
      value: 1,
      label: 'Thu nhập miễn thuế',
    },
  ]
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
        <div className={styles.textHead}>Chỉnh sửa phụ cấp</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <p>Tên phụ cấp</p>
              <p style={{ color: 'red', marginLeft: '5px' }}>*</p>
            </div>
            <Form.Item
              name='cl_name'
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc',
                },
              ]}>
              <Input
                type='text'
                placeholder='Nhập tên phụ cấp'
                className={styles.inputname}
              />
            </Form.Item>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <p>Tiền phụ cấp</p>
              <p style={{ color: 'red', marginLeft: '5px' }}>*</p>
            </div>
            <Form.Item
              name='cl_salary'
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc',
                },
              ]}>
              <Input
                placeholder='Nhập số tiền phụ cấp'
                className={styles.inputname}
                suffix='VNĐ'
              />
            </Form.Item>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <p>Chọn loại</p>
              <p style={{ color: 'red', marginLeft: '5px' }}>*</p>
            </div>
            <Form.Item
              name='cl_type_tax'
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc',
                },
              ]}>
              <Select
                placeholder={'Chọn loại thu nhập'}
                options={loai}
                style={{ width: '100%' }}
                size='large'
                suffixIcon={<IconSelect />}
              />
            </Form.Item>
          </div>
          <div className={styles.date}>
            <div className={styles.date1}>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <p>Áp dụng từ ngày</p>
                <p style={{ color: 'red', marginLeft: '5px' }}>*</p>
              </div>
              <Form.Item
                name='cl_day'
                rules={[
                  {
                    required: true,
                    message: 'Trường này là bắt buộc',
                  },
                ]}>
                <Input type='date' className={styles.inputname} />
              </Form.Item>
            </div>
            <div className={styles.date2}>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <p>Đến ngày (Không bắt buộc)</p>
              </div>
              <Form.Item name='cl_day_end'>
                <Input type='date' className={styles.inputname} />
              </Form.Item>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <p>Ghi chú</p>
            </div>
            <Form.Item name='cl_note'>
              <TextArea
                style={{ resize: 'none' }}
                rows={5}
                placeholder='Nhập ghi chú nếu có'
              />
            </Form.Item>
          </div>
          <div className={styles.khungbutton}>
            <Button className={styles.huyb} onClick={() => setOpen(false)}>
              <p className={styles.texthuyb}>Huỷ bỏ</p>
            </Button>
            <Form.Item>
              <Button className={styles.luu} htmlType='submit'>
                <p className={styles.textluu}>Cập nhật</p>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
