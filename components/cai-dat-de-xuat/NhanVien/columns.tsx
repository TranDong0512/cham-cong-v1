import { Image, Space, Button, Avatar } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/storeQLC'
import {
  dataOld,
  modalSettingHTDState,
  openModalDeleteHTD,
  openModalEditHTD,
  sendData,
} from '../reducer/reducer'

interface DataType {
  key: string
  stt: string
  ep_id: string
  userName: string
  organizeDetailName: string
  positionName: string
  confirm_level: number
  confirm_type: number
  phone: string | null
  avatarUser: string | null
  email: string
}
const option: any = [
  { label: 1, value: 'Duyệt đồng thời' },
  { label: 2, value: 'Duyệt lần lượt' },
  { label: 3, value: 'Duyệt đồng thời và lần lượt' },
]

export const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'ep_id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'Họ và tên',
    key: 'hoTen',
    align: 'center',
    render: (name: string, record: DataType) => (
      <div className='flex flex-align-center'>
        <div className='w-30px h-30px'>
          {record.avatarUser ? (
            record?.avatarUser
          ) : (
            <Avatar
              size={50}
              src='/avt_365.png'
              //   width='100%'
              alt='img'
              //   preview={false}
            />
          )}
        </div>
        <div
          className='ml-8'
          style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          {record.userName}
        </div>
      </div>
    ),
  },
  {
    title: 'Tổ chức',
    dataIndex: 'organizeDetailName',
    key: 'organizeDetailName',
    align: 'center',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'positionName',
    key: 'positionName',
    align: 'center',
  },
  {
    title: 'Chi tiết',
    key: '',
    align: 'center',
    render: (record) => {
      const dispatch = useDispatch()
      return (
        <div
          onClick={() => {
            dispatch(modalSettingHTDState(true))
            dispatch(sendData([record.ep_id]))
            dispatch(dataOld(record))
          }}
          style={{ color: '#1677FF', cursor: 'pointer' }}>
          Xem chi tiết
        </div>
      )
    },
  },
]
export const columnsModal: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'ep_id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'Họ và tên',
    key: 'hoTen',
    align: 'center',
    render: (name: string, record: DataType) => (
      <div className='flex flex-align-center'>
        <div className='w-30px h-30px'>
          {record.avatarUser ? (
            record?.avatarUser
          ) : (
            <Avatar src='/avt_365.png' alt='img' size={50} />
          )}
        </div>
        <div className='ml-8'>{record.userName}</div>
      </div>
    ),
  },
  {
    title: 'Tổ chức',
    dataIndex: 'organizeDetailName',
    key: 'organizeDetailName',
    align: 'center',
  },
  {
    title: 'Vị trí',
    dataIndex: 'positionName',
    key: 'positionName',
    align: 'center',
  },
]
