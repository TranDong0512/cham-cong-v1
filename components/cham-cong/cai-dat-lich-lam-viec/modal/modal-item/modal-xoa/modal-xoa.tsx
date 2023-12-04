import { DELETE, POST } from '@/pages/api/BaseApi'
import styles from './modal-xoa.module.css'
import { Modal, Button } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function XoaLich(
  open: boolean,
  setOpen: Function,
  content: string,
  cySelected: any,
  empSelected?: any,
  listEmpInCy?: any,
  setListEmpInCy?: Function
) {
  const router = useRouter()

  const handleSubmit = () => {
    if (empSelected?.ep_id) {
      POST('api/qlc/cycle/delete_employee', {
        cy_id: cySelected?.cy_id,
        ep_id: empSelected?.ep_id,
      }).then((res) => {
        if (res?.result === true) {
          alert('Xóa thành công nhân viên khỏi lịch làm việc!')
          setListEmpInCy &&
            setListEmpInCy(
              listEmpInCy.filter((emp) => emp?.ep_id !== empSelected?.ep_id)
            )
          setOpen(false)
        }
      })
    } else {
      // console.log(cySelected?.cy_id)
      DELETE('api/qlc/cycle/del', {
        cy_id: cySelected?.cy_id,
      }).then((res) => {
        if (res?.data?.result) {
          alert('Xóa thành công lịch làm việc!')
          setOpen(false)
          router.reload()
        }
      })
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
            onClick={handleSubmit}>
            <p style={{ color: 'white', fontSize: '18px' }}>Đồng ý</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
