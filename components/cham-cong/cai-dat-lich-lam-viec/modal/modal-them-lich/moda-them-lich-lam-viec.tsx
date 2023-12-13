import { Modal, Input, Select, Button, Form, Checkbox, DatePicker } from 'antd'
import styles from './modal-them-lich.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GET, POST } from '@/pages/api/BaseApi'
import { ModalThemCa } from '../modal-them-ca/modal-them-ca'
import moment from 'moment'
import dayjs from 'dayjs'

export function ModalTiepTuc(
  open: boolean,
  setOpen: Function,
  setBack: Function,
  setNext: Function,
  form: any,
  listShift: any,
  listShiftSelected: any,
  setListShiftSelected: Function
) {
  // console.log(listShift);

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields()
        setOpen(false)
        setListShiftSelected([])
      }}    
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm mới lịch làm việc</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => {
            form.resetFields()
            setListShiftSelected([])
            setOpen(false)
          }}
        />
      </div>
      <div style={{ padding: '20px 20px 0px 20px', fontSize: '16px' }}>
        {listShift?.length <= 0 ? (
          <div className={styles.bodyItem}>
            Chọn ca làm việc <br />
            Bạn cần thiết lập ca làm việc{' '}
            <Link href={'/quan-ly-cong-ty/quan-ly-ca'} style={{ color: 'red' }}>
              tại đây{' '}
            </Link>
            trước
          </div>
        ) : (
          listShift?.map((shift, index) => {
            const onChange = async (key: string) => {
              listShiftSelected?.includes(key)
                ? setListShiftSelected(
                    listShiftSelected?.filter((d: any) => d !== key)
                  )
                : setListShiftSelected([...listShiftSelected, key])
            }
            return (
              <li key={index}>
                <Checkbox
                  onChange={() => onChange(shift?.shift_id)}
                  checked={listShiftSelected?.includes(
                    shift?.shift_id
                  )}></Checkbox>
                <span className={styles.shiftNameTxt}>{shift?.shift_name}</span>
              </li>
            )
          })
        )}
        <div className={`${styles.bodyItem} ${styles.bodyItemNext}`}>
          <Button
            className={styles.ButtonWhite}
            onClick={() => {
              setOpen(false)
              setBack(true)
              setListShiftSelected([]) 
            }}>
            <img src='/quay_lai.png' alt='/' />
            <p className={styles.text}>Quay lại</p>
          </Button>
          <Button
            className={styles.Button}
            onClick={() => {
              setNext(true)
              setOpen(false)
            }}>
            <p className={styles.txt}>Tiếp tục</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export function ModalThemLichLamViec(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  data: any,
  setData: Function,
  setCySelected: Function,
  formData: any,
  setDateApply: Function,
  weekType: any,
  setWeekType: Function
) {
  // const [form, setForm]: any = useState(formData)

  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString('default', { year: 'numeric' })
    const month = date?.toLocaleString('default', { month: '2-digit' })
    const day = date?.toLocaleString('default', { day: '2-digit' })

    return [year, month, day].join('-')
  }

  const getDaysInMonth = (month, year) => {
    var date: Date = new Date(year, month, 1)
    var days = Array<any>()
    while (date.getMonth() === month) {
      days.push({ date: formatDate(date), shift_id: '' })
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  const handleNext = () => {
    formData.validateFields().then((value) => {
      setOpen(false)
      setNext(true)
    })
  }

  return (
    <Modal
      className='bannerQLC modalThemLLV'
      open={open}
      onCancel={() => {
        formData.resetFields()
        setOpen(false)
      }}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm mới lịch làm việc</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => {
            formData.resetFields()
            setOpen(false)
          }}
        />
      </div>
      <div className={styles.body}>
        <Form form={formData}>
          <Form.Item
            name={'cy_name'}
            label='Tên lịch làm việc'
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc',
              },
            ]}>
            <Input
              placeholder='Nhập tên'
              className={styles.input}
              // onChange={(value)=>setData({...data,name:value.target.value})}
            ></Input>
          </Form.Item>
          <Form.Item
            initialValue={weekType}
            name={'type_week'}
            label='Chọn lịch làm việc'
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc',
              },
            ]}>
            <Select
              className={styles.input}
              style={{ width: '100%' }}
              suffixIcon={<img src='/down-icon.png'></img>}
              value={weekType}
              onChange={(e) => setWeekType(e)}
              options={[
                {
                  label: 'Thứ 2 - Thứ 6',
                  value: 1,
                },
                {
                  label: 'Thứ 2 - Thứ 7',
                  value: 2,
                },
                {
                  label: 'Thứ 2 - CN',
                  value: 3,
                },
              ]}></Select>
          </Form.Item>
          <Form.Item
            name={'month_add'}
            label='Tháng áp dụng'
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc',
              },
            ]}>
            <Input
              placeholder='Chọn tháng'
              type='month'
              className={styles.input}
              onChange={(e) => {
                const date = dayjs(e.target.valueAsDate)
                setDateApply(date?.format('YYYY-MM-DD'))
                formData.setFieldValue(
                  'apply_month',
                  date?.format('YYYY-MM-DD')
                )
              }}></Input>
          </Form.Item>
          <Form.Item
            name={'apply_month'}
            label='Ngày bắt đầu làm việc'
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc',
              },
            ]}>
            <Input
              placeholder='YYYY-MM-DD'
              className={styles.input}
              style={{ width: '100%' }}
              type='date'
              onChange={(e) => {
                console.log(e)
                setDateApply(e.target.value)
              }}
              // format={'DD-MM-YYYY'}
              // onChange={(e) => {
              //   formData.setFieldValue(
              //     'month_add',
              //     e.target.value.substring(0, 7)
              //   )
              //   setDateApply(e.target.value)
              // }}
              // onChange={(value)=>setData({...data,date:value.target.value})}
            ></Input>
          </Form.Item>
          <div className={styles.hasButton}>
            <Button className={styles.Button} onClick={handleNext}>
              <p className={styles.txt}>Tiếp tục</p>
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
