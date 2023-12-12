import { Modal, Input, Form } from 'antd'
import Image from 'next/image'
import styles from './modal-chinh-sua.module.css'
import { ModalChinhSua_Them } from '../../modal-them-ca/modal-them-ca'
import { useEffect } from 'react'
export function ModalChinhSua(
  open: boolean,
  setOpen: Function,
  cySelected: any,
  setCySelected: Function
) {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(cySelected)
  }, [form, cySelected])

  console.log(cySelected)
  return (
    <Modal
      className='bannerQLC modalThemLLV'
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Chỉnh sửa lịch làm việc</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div>
        <Form form={form} initialValues={cySelected}>
          <div style={{ margin: '20px' }}>
            <p>
              Tên lịch làm việc <span style={{ color: 'red' }}>*</span>
            </p>
            <Form.Item name={'cy_name'}>
              <Input style={{ width: '100%', fontSize: '16px' }}></Input>
            </Form.Item>
          </div>
          <div>
            {ModalChinhSua_Them({
              data: cySelected,
              form: form,
              setOpen: setOpen,
            })}
          </div>
        </Form>
      </div>
    </Modal>
  )
}
