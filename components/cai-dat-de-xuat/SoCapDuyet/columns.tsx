import { Image, Space, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/storeQLC'
import {
  dataOld,
  modalSettingSCD,
  openModalDelete,
  openModalEdit,
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
const option = [
  { value: 1, label: 'Duyệt lần lượt' },
  { value: 2, label: 'Duyệt đồng thời' },
  { value: 1, label: 'Duyệt lần lượt và đồng thời' },
]
export const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    align: 'center',
  },
  {
    title: 'Loại đề xuất',
    key: 'dexuat_name',
    align: 'center',
    dataIndex: 'dexuat_name',
  },
  {
    title: 'Số cấp duyệt',
    dataIndex: 'confirm_level',
    key: 'confirm_level',
    align: 'center',
  },
  {
    title: 'Hình thức duyệt',
    key: 'confirm_type',
    align: 'center',
    render: (data) => {
      return <p>{option[data?.confirm_type - 1].label}</p>
    },
  },
  {
    title: 'Giới hạn thời gian',
    dataIndex: 'confirm_time',
    key: 'confirm_time',
    align: 'center',
  },

  {
    title: 'Hành động',
    dataIndex: '',
    key: 'hanhDong',
    align: 'center',
    width: 160,
    render: (record: DataType) => {
      const dispatch = useDispatch()
      return (
        <Space
          size='small'
          style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button
            type='primary'
            style={{
              width: '30px',
              height: '30px',
            }}
            icon={<EditOutlined style={{ color: '#fff' }} rev={'xxx'} />}
            onClick={() => {
              dispatch(openModalEdit(true))
              dispatch(dataOld(record))
            }}
          />
        </Space>
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
            <Image src='/avt_365.png' width='100%' alt='img' preview={false} />
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
