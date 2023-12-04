import React, { useEffect, useState } from 'react'
import { Steps, Button, Typography, Modal } from 'antd'
const { Text } = Typography
import instance from '@/components/hooks/axios.config'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/storeQLC'
import { useDispatch } from 'react-redux'
import type { FormInstance } from 'antd/es/form'
import Step2 from './step2'
import Step1 from './step1'
import { toast } from 'react-toastify'
import { updateVerify } from '@/redux/reducer/update'

import Constants from '@/components/cai-dat-de-xuat/Constant/constant'
import { CloseOutlined } from '@ant-design/icons'
export default function ModalAddSCD({ open, onClose }) {
  const [current, setCurrent] = useState(0)
  const dispatch = useDispatch()
  const [listUsers, setListUsers] = useState([])
  const [valueSelect, setValueSelect] = useState([])
  const formRef = React.useRef<FormInstance>(null)
  const [inputChange, setInputChange] = useState<any>()
  const [listConfirm, setListConfirm] = useState([])
  const [inputTime, setInputTime] = useState<any>()
  const setListConfirmSelect = (data) => {
    setListConfirm(data)
  }
  const steps = [
    {
      title: 'Thêm nhân viên',
      content: <Step1 listUsers={listUsers} setListUsers={setListUsers} />,
    },
    {
      title: 'Hình thức duyệt',
      content: (
        <Step2
          setInputChange={setInputChange}
          setValueSelect={setValueSelect}
          setListConfirm={setListConfirmSelect}
          setInputTime={setInputTime}
        />
      ),
    },
  ]
  const items = steps.map((item) => ({ key: item.title, title: item.title }))
  const isUpdate = useSelector((state: RootState) => state.update.updateVerify)
  const [display, setDisplay] = useState(false)
  useEffect(() => {
    if (listUsers.length > 0) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }, [listUsers])
  const close = () => {
    onClose()
    setListUsers([])
    setValueSelect([])
    formRef.current?.resetFields()
  }
  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }
  const handleSubmit = async () => {
    try {
      const apiPromises = [
        instance.post(Constants.settingConfirm_updatePrivateType, {
          confirm_type: valueSelect,
          listUsers: listUsers,
          listConfirm: listConfirm,
        }),
        instance.post(Constants.settingConfirm_updatePrivateLevel, {
          confirm_level: inputChange,
          listUsers: listUsers,
          listConfirm: listConfirm,
        }),
        instance.post(Constants.settingConfirm_updatePrivateTime, {
          confirm_time: inputTime,
          listUsers: listUsers,
          listConfirm: listConfirm,
        }),
      ]
      const responses = await Promise.all(apiPromises)
      const isSuccess = responses.every(
        (response) => response.data?.data?.result
      )

      if (isSuccess) {
        dispatch(updateVerify(!isUpdate))
        toast('Cập nhập thành công')
        close()
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message)
    }
  }
  return (
    <>
      <Modal
        open={open}
        wrapClassName='CustomerModal'
        footer={false}
        onCancel={close}
        width={640}
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}>
        <div
          className='px-24 py-16'
          style={{
            backgroundColor: '#4C5BD4',
            padding: '10px',
          }}>
          <p className='color-white font-size-16' style={{ color: '#fff' }}>
            Thêm mới
          </p>
        </div>
        <div className='p-20' style={{ padding: '20px' }}>
          <div className='px-40'>
            <Steps current={current} items={items} />
          </div>
          <div>{steps[current].content}</div>
          <div className='flex flex-center mt-16'>
            {current < steps.length - 1 && (
              <div
                className='max-w-160 mx-10 w-100'
                style={{
                  margin: 'auto',
                  marginTop: '20px',
                }}>
                <Button
                  type='primary'
                  block
                  size='large'
                  onClick={() => next()}
                  disabled={!display}>
                  <p> Tiếp tục</p>
                </Button>
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto',
            }}>
            {current > 0 && (
              <div
                className='max-w-160 mx-10 w-100'
                style={{ padding: '10px', marginTop: '10px' }}>
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={() => prev()}
                  block
                  size='large'>
                  <p> Trở lại</p>
                </Button>
              </div>
            )}
            {current === steps.length - 1 && (
              <div
                className='max-w-160 mx-10 w-100'
                style={{ padding: '10px', marginTop: '10px' }}>
                <Button
                  type='primary'
                  block
                  htmlType='submit'
                  size='large'
                  onClick={handleSubmit}>
                  <p> Hoàn thành</p>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
