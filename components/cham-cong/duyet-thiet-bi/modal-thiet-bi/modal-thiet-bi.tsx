import { Modal, Button } from 'antd'
import Image from 'next/image'
import styles from './modal-thiet-bi.module.css'

export function modalDeleteThietBi(
  context: string,
  text_of_button: string,
  open: boolean,
  setOpen: Function,
  setNewData: Function,
  newdataother: any[]
) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={450}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.body}>
        <Image alt='/' width={50} height={50} src={'/big-x.png'} />
        <p style={{ paddingTop: '20px' }}>{context}</p>
      </div>
      <div className={styles.footer}>
        <Button className={styles.button_white}>
          <p style={{ color: '#4C5BD4' }} onClick={() => setOpen(false)}>
            Hủy
          </p>
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            setNewData(newdataother)
            setOpen(false)
          }}>
          <p className={styles.text}>{text_of_button}</p>
        </Button>
      </div>
    </Modal>
  )
}
