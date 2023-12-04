import { Modal, Input, Select, Button, Form } from 'antd'
import styles from './modal-xoa.module.css'
import Image from 'next/image'
import { POST_TL } from '@/pages/api/BaseApi'
import { set } from 'lodash'
import { useRouter } from 'next/router'
export function ModalXoa(open: boolean, setOpen: Function, data: any) {
  const router = useRouter()
  const handleDelete = async () => {
    const res = await POST_TL('api/tinhluong/congty/delete_nv_tax', {
      cls_id_cl: data?.cls_id_cl,
      cls_id_user: data?.cls_id_user,
    })

    if (res?.message === 'success') {
      window.alert('Xóa thuế nhân viên thành công')
      setOpen(false)
      router.reload()
    } else {
      window.alert('Xóa thuế nhân viên lỗi')
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='50'
            height='50'
            viewBox='0 0 50 50'
            fill='none'>
            <g clip-path='url(#clip0_897_133047)'>
              <circle cx='25' cy='25' r='25' fill='#FF5B4D' />
              <path
                d='M15 15L35 35'
                stroke='white'
                stroke-width='4'
                stroke-linecap='round'
              />
              <path
                d='M35 15L15 35'
                stroke='white'
                stroke-width='4'
                stroke-linecap='round'
              />
              <path
                d='M15 15L35 35'
                stroke='white'
                stroke-width='4'
                stroke-linecap='round'
              />
              <path
                d='M35 15L15 35'
                stroke='white'
                stroke-width='4'
                stroke-linecap='round'
              />
            </g>
            <defs>
              <clipPath id='clip0_897_133047'>
                <rect width='50' height='50' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles.title}>
          Bạn có muốn xoá cài đặt thuế của nhân sự này!
        </div>
        <div className={styles.button}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            Huỷ
          </button>
          <button className={styles.button2} onClick={handleDelete}>
            Đồng ý
          </button>
        </div>
      </div>
    </Modal>
  )
}
