import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  Form,
  Select,
  Skeleton,
} from 'antd'
const { Option } = Select
import styles from './modal-thiet-lap.module.css'
import Image from 'next/image'
import type { SelectProps } from 'antd'
import { useState } from 'react'
import { StaffLable } from '../staff-lable/staff-lable'

export function ModalThietLapBaoHiemNhanVien({
  openFilterStaffSettingClick,
  setOpenFilterStaffSettingClick,
  key = '1',
}: {
  openFilterStaffSettingClick: boolean
  setOpenFilterStaffSettingClick: any
  key: string
}) {
  const [form] = Form.useForm()
  const Save = () => {
    setOpenFilterStaffSettingClick(false)
  }

  const [monthFrom, setMonthFrom] = useState('')
  const [monthTo, setMonthTo] = useState('')
  const [typeOfInsurance, setTypeOfInsurance] = useState('')
  const [url, setUrl] = useState('/anhnhanvien.png')
  const [name, setName] = useState('NGUYỄN TIẾN LONG')
  const [ID, setId] = useState('131942')

  const handleSubmit = () => {
    const isFieldsFilled1 = form.getFieldValue('monthFrom')
    const isFieldsFilled2 = form.getFieldValue('monthTo')
    const isFieldsFilled3 = form.getFieldValue('insurance')
    // if( (isFieldsFilled1 !== undefined) && ( isFieldsFilled3 !== undefined ) )
    // {
    setMonthFrom(isFieldsFilled1)
    setMonthTo(isFieldsFilled2)
    setTypeOfInsurance(isFieldsFilled3)
    setOpenFilterStaffSettingClick(false)
    // }
  }

  const selectInsurance = [
    { value: 'Chọn loại bảo hiểm', label: 'Chọn loại bảo hiểm' },
    {
      value: 'BHXH tính theo lương cơ bản',
      label: 'BHXH tính theo lương cơ bản',
    },
    {
      value: 'BHXH tính theo lương nhập vào',
      label: 'BHXH tính theo lương nhập vào',
    },
    { value: 'BHXH mới', label: 'BHXH mới' },
  ]
  return (
    <Modal
      open={openFilterStaffSettingClick}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      className={`modal_thiet_lap`}>
      <div className={styles.header}>
        <div className={styles.textHead}>Chỉnh sửa bảo hiểm nhân viên</div>
        <div className={styles.crossImage}>
          <Image
            alt='/'
            src={'/cross.png'}
            width={14}
            height={14}
            onClick={() => setOpenFilterStaffSettingClick(false)}
          />
        </div>
      </div>

      <div className={styles.body}>
        <Form
          form={form}
          name='basic'
          initialValues={{ remember: true }}
          autoComplete='off'>
          <div style={{ width: '100%', display: 'flex', marginBottom: '20px' }}>
            <StaffLable url={url} name={name} />
          </div>
          <Form.Item
            rules={[
              { required: true, message: 'Bắt buộc điền tháng áp dụng!' },
            ]}
            name='monthFrom'>
            <div className={styles.bodyItem}>
              <span style={{ fontSize: '16px' }}>
                Áp dụng từ tháng <span style={{ color: 'red' }}>*</span>
              </span>
              <Input
                required
                type='month'
                style={{ width: '100%' }}
                placeholder='Chọn tháng'></Input>
            </div>
          </Form.Item>

          <Form.Item name='monthTo'>
            <div className={styles.bodyItem}>
              <span style={{ fontSize: '16px' }}>
                Đến tháng (Không bắt buộc)
              </span>
              <Input
                type='month'
                style={{ width: '100%' }}
                placeholder='Chọn tháng'></Input>
            </div>
          </Form.Item>

          <div style={{ fontSize: '16px' }}>
            Nhập tiền bảo hiểm <span style={{ color: 'red' }}>*</span>
          </div>
          <Form.Item name='insurance' label=''>
            <Input
              type='text'
              style={{ width: '100%' }}
              defaultValue={500000}
              suffix='VNĐ'></Input>
          </Form.Item>
          <Form.Item>
            <div className={styles.hasButton}>
              <Button
                className={styles.Button}
                htmlType='submit'
                onClick={handleSubmit}>
                <p className={styles.txt}>Cập nhật</p>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
