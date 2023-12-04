import { POST_TL } from '@/pages/api/BaseApi'
import styles from './xoa.module.css'
import { Modal, Button } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const XoaThanhCongNghiSaiQuyDinh = (
  open: boolean,
  setOpen: Function,
  content: string
) => {
  const router = useRouter()
  return (
    <Modal
      className={styles.widthModal}
      open={open}
      onCancel={() => setOpen(false)}
      width={310}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '16px',
          color: '#474747',
        }}>
        <div style={{ textAlign: 'center' }}>{content}</div>
        <div style={{ marginTop: '20px' }}>
          <Button
            style={{ height: 'auto', backgroundColor: '#4C5BD4' }}
            onClick={() => router.replace(router.asPath)}>
            <p style={{ color: 'white', fontSize: '18px' }}>OK</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const XoaNghiSaiQuyDinh = (
  open: boolean,
  setOpen: Function,
  setNext: Function,
  content: string,
  data: any
) => {
  const router = useRouter()
  const onDel = async () => {
    const res = await POST_TL('api/tinhluong/congty/delete_phat_ca', {
      pc_id: data?.pc_id,
    })

    if (res?.message === 'success') {
      setOpen(false)
      setNext(true)
      router.reload()
    }
  }

  return (
    <Modal
      className={styles.widthModal}
      open={open}
      onCancel={() => setOpen(false)}
      width={450}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '16px',
          color: '#474747',
        }}>
        <Image
          alt='/'
          width={50}
          height={50}
          src={'/big-x.png'}
          style={{ marginBottom: '20px' }}
        />
        <div style={{ textAlign: 'center' }}>{content}</div>
        <div style={{ marginTop: '20px' }}>
          <Button
            style={{
              padding: '5px 40px 5px 40px',
              height: 'auto',
              backgroundColor: 'white',
            }}
            onClick={() => setOpen(false)}>
            <p style={{ color: '#4C5BD4', fontSize: '18px' }}>Hủy</p>
          </Button>
          <Button
            style={{
              marginLeft: '20px',
              padding: '5px 30px 5px 30px',
              height: 'auto',
              backgroundColor: '#4C5BD4',
            }}
            onClick={onDel}>
            <p style={{ color: 'white', fontSize: '18px' }}>Đồng ý</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
