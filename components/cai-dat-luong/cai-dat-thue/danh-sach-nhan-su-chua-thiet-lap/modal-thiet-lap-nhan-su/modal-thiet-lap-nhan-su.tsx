import { Modal, Input, Select, Button, Form, Avatar } from 'antd'
import styles from './modal-thiet-lap-nhan-su.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { DaDuyet } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su'
import { IconSelect } from '../anh'
import { POST_TL, getCompIdCS } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
const dataBaoThue = [
  {
    value: 1,
    label: 'Thuế theo hệ số cố định',
  },
  {
    value: 2,
    label: 'Thuế theo lũy tiến',
  },
]
export function ModalThiepLapNhanSu(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  data: any,
  key: String,
  listTax: any
) {
  const [modalAdd, setModalAdd] = useState(false)
  const [modalNext, setModalNext] = useState(false)
  const [from, setFrom] = useState<any>()
  const [to, setTo] = useState<any>()
  const [selectedTax, setSelectedTax] = useState<any>()
  const router = useRouter()
  const [taxes, setTaxes] = useState([
    ...dataBaoThue,
    ...listTax?.tax_list_detail?.map((item) => ({
      label: item?.cl_name,
      value: item?.cl_id,
    })),
  ])
  const [selected, setSelected] = useState()

  const handleAdd = async () => {
    if (!from) window.alert('Thiếu trường áp dụng từ')
    if (!selectedTax) window.alert('Thiếu trường chọn thuế')
    else {
      /*  */
      const com_id = getCompIdCS()
      const res = await POST_TL(
        'api/tinhluong/congty/them_nv_nhom_other_money',
        {
          cls_day: `${from}-01T00:00:00.000+07:00`,
          cls_day_end: to ? `${to}-01T00:00:00.000+07:00` : '',
          cls_id_com: com_id,
          cls_id_user: data.find((item, index) => item?.key === key)?.id,
          cls_id_cl: selectedTax?.value,
        }
      )

      console.log(res)
      if (res?.message === 'success') {
        window.alert('Thêm thuế cho nhân viên thành công')
        setOpen(false)
        router.reload()
      } else {
        window.alert('Thêm thuế cho nhân viên lỗi')
      }
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thuế nhân viên</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        {data?.map((Data: any) => {
          if (key === Data?.key) {
            const handleChange = (value: {
              value: string
              label: React.ReactNode
            }) => {}
            return (
              <div key={Data?.key}>
                <div className={styles.info}>
                  <div>
                    <Avatar
                      src={Data?.url}
                      style={{ width: '46px', height: '46px', margin: 'auto' }}
                    />
                  </div>
                  <div style={{ margin: '0 0 0 10px' }}>
                    <p className={styles.name}>{Data?.title}</p>
                    <p>ID: {Data?.id}</p>
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex' }}>
                    <p style={{ color: '#474747', marginRight: '4px' }}>
                      Áp dụng từ tháng
                    </p>{' '}
                    <p style={{ color: '#FF5B4D' }}>*</p>
                  </div>
                  <Input
                    type='month'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex' }}>
                    <p style={{ color: '#474747', marginRight: '4px' }}>
                      Đến tháng (Không bắt buộc)
                    </p>
                  </div>
                  <Input
                    type='month'
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex' }}>
                    <p style={{ color: '#474747', marginRight: '4px' }}>
                      Loại thuế
                    </p>{' '}
                    <p style={{ color: '#FF5B4D' }}>*</p>
                  </div>
                  <Select
                    labelInValue
                    defaultValue={{ value: '', label: 'Chọn loại thuế' }}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={taxes}
                    onSelect={(e) => setSelectedTax(e)}
                    suffixIcon={<IconSelect />}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button className={styles.huy}>
                    <p
                      className={styles.texthuy}
                      onClick={() => setOpen(false)}>
                      Huỷ
                    </p>
                  </button>
                  <button className={styles.luu} onClick={handleAdd}>
                    <p className={styles.textluu}>Lưu</p>
                  </button>
                </div>
              </div>
            )
          }
        })}
      </div>
    </Modal>
  )
}
