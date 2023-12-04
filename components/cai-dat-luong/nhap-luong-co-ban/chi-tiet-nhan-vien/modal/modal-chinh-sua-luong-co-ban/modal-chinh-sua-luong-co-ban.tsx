import { Modal, Input, Select, Button, Form, List, Checkbox } from 'antd'
import styles from './modal-chinh-sua-luong-co-ban.module.css'
import Image from 'next/image'
import { values } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Logo } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import {
  MyDatePicker,
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import moment from 'moment'
import { POST_TL } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
const { TextArea } = Input
export function ModalChinhSuaLuongCoBan(
  open: boolean,
  setOpen: Function,
  data: any
) {
  const [ND, setND] = useState('')
  const [form] = Form.useForm()
  const router = useRouter()
  const onFinish = async (value) => {
    const body = {
      ...value,
      sb_salary_bh: value?.sb_salary_bh || 0,
      sb_pc_bh: value?.sb_pc_bh || 0,
      sb_id: data?.sb_id,
      sb_salary_basic: value?.sb_salary_basic,
      sb_lydo: value?.sb_lydo,
      sb_quyetdinh: value?.sb_quyetdinh,
      sb_time_up: dayjs(value?.sb_time_up).format('YYYY-MM-DD'),
    }
    const res = await POST_TL('api/tinhluong/congty/update_basic_salary', body)
    // console.log(res)

    if (res?.message === 'success') {
      // router.replace(router.asPath)
      router.reload()
    }
  }
  form.setFieldsValue({ ...data, sb_time_up: dayjs(data?.sb_time_up) })

  return (
    <Modal
      className='bannerQLC'
      open={open}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Chỉnh sửa lương cơ bản</div>
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
          {MyInput(
            'Lương cơ bản',
            'Lương cơ bản',
            true,
            true,
            'sb_salary_basic',
            'number'
          )}
          {/* {MySelect('Loại hình tính lương', 'Chọn', true, true, 'sb_type', [
            { label: 'Chọn', value: 0 },
            { label: 'Tất cả', value: 1 },
            { label: 'Theo giờ', value: 2 },
            { label: 'Theo ngày công', value: 3 },
          ])} */}
          {MyInput(
            'Lương đóng bảo hiểm',
            'Lương đóng bảo hiểm',
            false,
            true,
            'sb_salary_bh',
            'number'
          )}
          {MyInput(
            'Phụ cấp bảo hiểm',
            'Phụ cấp bảo hiểm',
            false,
            true,
            'sb_pc_bh',
            'number'
          )}
          {MyDatePicker(
            'Thời gian đóng bảo hiểm',
            'Thời gian đóng bảo hiểm',
            true,
            true,
            'sb_time_up',
            true
          )}
          {MyInput('Lý do', 'Lý do', false, true, 'sb_lydo')}
          {MyInput(
            'Căn cứ quyết định',
            'Căn cứ quyết định (nếu có)',
            false,
            true,
            'sb_quyetdinh'
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}>
            <button className={styles.huyb} onClick={() => setOpen(false)}>
              <p className={styles.texthuyb}>Huỷ bỏ</p>
            </button>
            <button className={styles.luu} type='submit'>
              <p className={styles.textluu}>Cập nhật</p>
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
