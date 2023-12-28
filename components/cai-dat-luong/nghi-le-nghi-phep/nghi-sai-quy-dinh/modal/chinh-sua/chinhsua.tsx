import styles from './chinh-sua.module.css'
import { Modal, Button } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const ChinhSuaThanhCongNghiSaiQuyDinh = (
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
