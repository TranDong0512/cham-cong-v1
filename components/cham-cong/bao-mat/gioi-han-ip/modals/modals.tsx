import { Button, Form, Input, Modal } from 'antd'
import styles from './modals.module.css'
import Image from 'next/image'
import _ from 'lodash'
import { DELETE, POST } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'

export const TYPE_ADD = 'add'
export const TYPE_UPDATE = 'update'

export function AddNewIPModal(
  open: boolean,
  setOpen: Function,
  type: string,
  reload: boolean,
  setReload: any,
  defaultValue: any
) {
  const [form] = Form.useForm()

  const onFinish = async (value: any) => {
    if (!_.isEmpty(value)) {
      if (type === TYPE_ADD) {
        const res = await POST('api/qlc/SetIp/create', { ...value })
        if (res?.result) {
          // setList([res?.settingIP, ...list])
          // console.log(reload)
          form.resetFields()
          setReload(!reload)
          setOpen(false)
        }
      } else {
        const body = {
          ...value,
          id_acc: defaultValue?.id_acc,
        }
        const res = await POST('api/qlc/SetIp/edit', body)

        if (res?.result === true) {
          // const newArr = [...list]
          // const updatedItemIndex = list?.findIndex(
          //   (item: any) => item?._id === defaultValue?._id
          // )
          // newArr[updatedItemIndex] = {
          //   ...defaultValue,
          //   ...body
          // }
          // console.log(newArr)
          // setList(newArr)
          setReload(!reload)
          setOpen(false)
        }
      }
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      destroyOnClose
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <p className={styles.headerText}>
          {type === TYPE_ADD ? 'Thêm địa chỉ IP mới' : 'Cập nhật thông tin IP'}
        </p>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          style={{ marginRight: '20px' }}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish} initialValues={defaultValue}>
          <Form.Item
            name='from_site'
            label={<p>Tên IP Mạng</p>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
            <Input placeholder='Nhập tên' size='large' />
          </Form.Item>
          <Form.Item
            name='ip_access'
            required
            label={<p> Địa chỉ IP mạng dùng điểm danh</p>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
            <Input placeholder='Nhập địa chỉ IP mạng' size='large' />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size='large'
              htmlType='submit'
              className={styles.addNewBtn}
              type='primary'>
              <p className={styles.btnText}>
                {type === TYPE_ADD ? 'Thêm mới' : 'Cập nhật'}
              </p>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

// pop up

export function ConfirmIPModal(
  open: boolean,
  setOpen: Function,
  id: any,
  list: any,
  setList: any
) {
  const onYes = async () => {
    const res = await DELETE('api/qlc/SetIp/delete', { id_acc: id })

    if (res?.data?.result === true) {
      setList(list?.filter((item: any) => item?.id_acc !== id))
      setOpen(false)
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
      <div className={styles.confirmBody}>
        <Image alt='/' src={'/big-x.png'} width={50} height={50} />
        <p className={styles.alertText}>Hành động xóa không thể phục hồi.</p>
        <p>Bạn có chắc chắn muốn xóa?</p>
        <div className={styles.btnGroup}>
          <Button
            className={styles.abortBtn}
            size='large'
            onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button className={styles.confirmBtn} size='large' onClick={onYes}>
            <p className={styles.text}>Đồng ý</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
