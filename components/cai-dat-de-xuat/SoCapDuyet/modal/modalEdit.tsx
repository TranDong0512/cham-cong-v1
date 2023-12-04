import {
  Button,
  Modal,
  InputNumber,
  Typography,
  Form,
  Checkbox,
  Select,
} from 'antd'
import { useEffect, useState } from 'react'
import instance from '@/components/hooks/axios.config'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/storeQLC'
const { Text } = Typography
import { openModalEdit, updateSoCapDuyet } from '../../reducer/reducer'
import { CloseOutlined } from '@ant-design/icons'
export default function ModalEditSCD({
  setHidden,
  setSelectedRowKeys,
  setData,
}) {
  const option = [
    { value: 1, label: 'Duyệt lần lượt' },
    { value: 2, label: 'Duyệt đồng thời' },
    { value: 1, label: 'Duyệt lần lượt và đồng thời' },
  ]
  const dispatch = useDispatch()
  const [check, setCheck] = useState(false)
  const [propose, setPropose] = useState([])
  const dataOld = useSelector((state: RootState) => state.tgd.dataOld)
  console.log(dataOld)
  const [editFieldValue, setEditFieldValue] = useState(dataOld)
  const isUpdateSCD = useSelector(
    (state: RootState) => state.tgd.updateSoCapDuyet
  )
  const load = useSelector((state: RootState) => state.tgd.updateSoCapDuyet)

  const open = useSelector((state: RootState) => state.tgd.openModalEdit)
  const ep_id = useSelector((state: RootState) => state.tgd.data)

  const handleSelect = (value) => {
    if (value) {
      setPropose(value)
    } else setCheck(false)
  }
  const [confirm_level, set_confirm_level] = useState<any>()
  const [confirm_time, set_confirm_time] = useState<any>()
  const [confirm_type, set_confirm_type] = useState<any>()
  const dataInput = (value, name) => {
    if (name == 'confirm_level') set_confirm_level(+value)
    if (name == 'confirm_time') set_confirm_time(+value)
  }
  const onChange = (value: string) => {
    set_confirm_type(+value)
  }
  const onClose = () => {
    dispatch(openModalEdit(false))
  }

  const onFinish = async () => {
    const object = {
      list_SettingPropose: [dataOld.dexuat_id],
      confirm_level: confirm_level ? confirm_level : dataOld.confirm_level,
      confirm_type: confirm_type ? confirm_type : dataOld.confirm_type,
      confirm_time: confirm_time ? confirm_time : dataOld.confirm_time,
    }
    const response = await instance.post(
      'api/qlc/settingConfirm/settingPropose',
      object
    )
    if (response?.status == 200) {
      toast.success('Chỉnh sửa thành công')
      onClose()
      dispatch(updateSoCapDuyet(!load))
    }
  }
  return (
    <>
      <Modal
        open={open}
        // wrapClassName="CustomerModal"
        footer={false}
        onCancel={onClose}
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}>
        <Form name='form' onFinish={onFinish}>
          <div
            className='px-24 py-16'
            style={{
              backgroundColor: '#4C5BD4',
              borderRadius: '8px 8px 0 0',
            }}>
            <p
              className='color-white font-size-18'
              style={{ padding: '10px', color: '#fff' }}>
              Chỉnh sửa đề xuất
            </p>
          </div>
          <div style={{ padding: '8px 20px' }}>
            <div className='mt-16'>
              <Typography.Text style={{ fontSize: '16px', fontWeight: 500 }}>
                <p> Danh sách đề xuất</p>
              </Typography.Text>
            </div>

            <div className='mt-8' style={{ marginTop: '8px' }}>
              <Select
                disabled
                placeholder='Chọn'
                onChange={handleSelect}
                defaultValue={`${dataOld?.dexuat_name}`}
                onClear={() => {
                  setCheck(false)
                }}
                allowClear
                showSearch
                style={{
                  width: '100%',
                }}
                filterOption={(input, option: any) =>
                  (option?.label ?? '').includes(input)
                }
                size='large'
                options={setData}
              />
            </div>

            <div className='mt-16'>
              <Typography.Text
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                }}>
                Số cấp duyệt
              </Typography.Text>
            </div>
            <InputNumber
              placeholder='Nhập số cấp duyệt'
              size='large'
              style={{ marginTop: '8px', width: '100%' }}
              onChange={(e) => dataInput(e, 'confirm_level')}
              defaultValue={dataOld?.confirm_level}></InputNumber>

            <div className='mt-16' style={{ marginTop: '8px' }}>
              <Typography.Text
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                }}>
                Hình thức duyệt
              </Typography.Text>
            </div>
            <Select
              style={{ width: '100%' }}
              size='large'
              onChange={onChange}
              placeholder='Chọn hình thức duyệt'
              defaultValue={option[dataOld.confirm_type - 1].label}
              options={[
                {
                  value: '1',
                  label: 'Duyệt lần lượt',
                },
                {
                  value: '2',
                  label: 'Duyệt đồng thời',
                },
                {
                  value: '3',
                  label: 'Duyệt lần lượt và đồng thời',
                },
              ]}></Select>
            <div className='mt-16' style={{ marginTop: '8px' }}>
              <Typography.Text
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                }}>
                Giới hạn thời gian duyệt
              </Typography.Text>
            </div>
            <InputNumber
              placeholder='Nhập thời gian'
              size='large'
              style={{ marginTop: '8px', width: '100%' }}
              onChange={(e) => dataInput(e, 'confirm_time')}
              addonAfter='Giờ'
              defaultValue={dataOld?.confirm_time}></InputNumber>
          </div>
          <div
            className='mt-16'
            style={{
              paddingBottom: '32px',
              display: 'flex',
              justifyContent: 'space-evenly',
              paddingTop: '12px',
              width: '75%',
              margin: '0 auto',
            }}>
            <Button
              style={{ padding: '4px 48px', height: '38px' }}
              onClick={onClose}>
              Hủy
            </Button>
            <Button
              type='primary'
              style={{ padding: '4px 48px', height: '36px' }}
              htmlType='submit'>
              <p> Lưu</p>
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
