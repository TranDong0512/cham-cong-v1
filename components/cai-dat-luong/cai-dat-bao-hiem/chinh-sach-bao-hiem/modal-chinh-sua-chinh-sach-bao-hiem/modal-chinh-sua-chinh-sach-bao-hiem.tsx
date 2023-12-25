import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  List,
  Divider,
  Skeleton,
  Form,
} from 'antd'
import styles from './modal-chinh-sua-chinh-sach-bao-hiem.module.css'
import Image from 'next/image'
import { MenuOutlined } from '@ant-design/icons'
import { ItemList } from './ItemList/itemList'
import { useState, useEffect } from 'react'
import { POST_TL } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import { ModalCongThuc } from '../modal-them-moi-bao-hiem/modal-them-moi-chinh-sach-bao-hiem'

export function ModalChinhSuaChinhSachBaoHiem({
  openFilterSettingClick,
  setOpenFilterSettingClick,
  insureSelected,
}: {
  openFilterSettingClick: boolean
  setOpenFilterSettingClick: any
  insureSelected: any
}) {
  const [form] = Form.useForm()
  const [next, setNext] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (insureSelected?.cl_id) {
      form.setFieldsValue(insureSelected)
    }
  }, [insureSelected, openFilterSettingClick])

  const openFormula = () => {
    setNext(true)
  }

  const handleSubmit = () => {
    // setOpen(false);
    // console.log(form.getFieldsValue());
    form.validateFields().then((value) => {
      // console.log({
      //   cl_id: insureSelected?.cl_id,
      //   ...value,
      //   fs_data:
      //     form.getFieldValue("fs_data") !== ""
      //       ? Number(form.getFieldValue("fs_data"))
      //       : undefined,
      //   fs_id: insureSelected?.TinhluongFormSalary?.[0]?.fs_id
      // })

      POST_TL('api/tinhluong/congty/update_insrc', {
        cl_id: insureSelected?.cl_id,
        ...value,
        fs_data:
          form.getFieldValue('fs_data') !== ''
            ? Number(form.getFieldValue('fs_data'))
            : undefined,
        fs_id: insureSelected?.TinhluongFormSalary?.[0]?.fs_id,
      }).then((res) => {
        if (res?.message === 'success') {
          setOpenFilterSettingClick(false)
          router.reload()
        }
      })
    })
  }

  return (
    <Modal
      open={openFilterSettingClick}
      width={600}
      onCancel={() => {
        setOpenFilterSettingClick(false)
        form.resetFields()
      }}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div className={styles.textHead}>Chỉnh sửa chính sách bảo hiểm</div>
        <div className={styles.crossImage}>
          <Image
            alt='/'
            src={'/cross.png'}
            width={14}
            height={14}
            onClick={() => {
              form.resetFields()  
              setOpenFilterSettingClick(false)
            }}
          />
        </div>
      </div>
      <div className={styles.body}>
        <Form form={form}>
          <div className={styles.bodyItem}>
            Tên chính sách bảo hiểm <span style={{ color: 'red' }}>*</span>
            <Form.Item name={'cl_name'}>
              <Input
                style={{ fontSize: '16px', border: '1px solid #9F9F9F' }}
                placeholder='Nhập tên bảo hiểm'></Input>
            </Form.Item>
          </div>
          <div className={styles.bodyItem}>
            Miêu tả chính sách
            <Form.Item name={'cl_note'}>
              <Input.TextArea
                placeholder='Nhập miêu tả'
                className={styles.textArea}></Input.TextArea>
            </Form.Item>
          </div>
        </Form>
        <Button className={styles.ButtonContinue} onClick={openFormula}>
          <span style={{ color: '#4C5BD4' }}>
            <strong style={{ marginRight: '5px' }}>Thiết lập công thức</strong>
            <Image src='/right-arrow.svg' alt='' width={17.4} height={13} />
          </span>
        </Button>
        {ModalCongThuc(next, setNext, form, insureSelected)}
        <div className={styles.hasButton}>
          <Button className={styles.Button} onClick={handleSubmit}>
            <p className={styles.txt}>Lưu</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
