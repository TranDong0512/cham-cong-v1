import { Modal, Input, Select, Button, Form } from 'antd'
import styles from './modal-xoa.module.css'
import Image from 'next/image'
import { POST_TL } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
export function ModalXoa(
  open: boolean,
  setOpen: Function,
  key: any,
  listEmp: any,
  setListEmpX: Function,
  taxSelected: any
) {
  const router = useRouter()
  // console.log(listEmp);
  const onConfirm = () => {
    POST_TL('api/tinhluong/congty/delete_nv_tax', {
      cls_id_cl: taxSelected?.cl_id,
      cls_id_user: key?.id,
    }).then((res) => {
      //   router.reload()
      alert('Xóa thành công nhân viên ra khỏi chính sách thuế!')
      setListEmpX(listEmp.filter((emp) => emp !== key))
      setOpen(false)
    })
  }
  // console.log(key);
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
          Bạn có chắc muốn xoá thuế của nhân viên này
        </div>
        <div className={styles.button}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            Huỷ
          </button>
          <Button className={styles.button2} onClick={onConfirm}>
            <p className={styles.textyes}>Đồng ý</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
