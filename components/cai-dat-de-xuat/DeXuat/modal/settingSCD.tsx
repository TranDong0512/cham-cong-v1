import { RootState } from '@/redux/storeQLC'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  Typography,
} from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { modalSettingSCD } from '../../reducer/reducer'
import { useEffect, useState } from 'react'
import instance from '@/components/hooks/axios.config'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import FormData from 'form-data'
import Constants from '../../Constant/constant'
import { toast } from 'react-toastify'

interface Item {
  key: string
  name_cate_dx: string
  confirm_level: number
  id_dx: any
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
  index: number
  children: React.ReactNode
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <InputNumber />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Nhập số cấp duyệt!`,
            },
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
export default function ModalSettingSCD() {
  const dispatch = useDispatch()
  const [dataVt, setDataVt] = useState<any>()
  const ep_id = useSelector((state: RootState) => state.tgd.data)
  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetcher = async () => {
          return await instance.post('api/vanthu/setting/fetchTimeSetting')
        }
        const data = await fetcher()
        const newData = data?.data?.time_dx?.map((item, index) => ({
          ...item,
          key: index,
        }))
        setDataVt(newData)
      } catch (err) {
        console.log(err)
      }
    }
    unFollow()
  }, [])
  const [dataUser, setDataUser] = useState<any>()

  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetcher = async () => {
          return await instance.post('api/qlc/settingConfirm/listUser', {
            ep_id: ep_id,
          })
        }
        const data = await fetcher()
        setDataUser(data?.data?.data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    unFollow()
  }, [])
  const [dataTable, setDataTable] = useState<any>()
  useEffect(() => {
    if (dataUser && dataUser[0] && dataVt) {
      dataVt.map((e) => {
        e.confirm_level = dataUser[0].confirm_level
      })
      if (
        dataUser[0].listPrivateLevel &&
        dataUser[0].listPrivateLevel.length > 0
      ) {
        dataUser[0].listPrivateLevel.map((e) => {
          const founGateway = dataVt.find(
            (value) => Number(value.id_dx) === Number(e.dexuat_id)
          )
          if (founGateway) founGateway.confirm_level = e.confirm_level
        })
      }
      setDataTable(dataVt)
    }
  }, [dataUser, dataVt])

  const [form] = Form.useForm()
  const open = useSelector((state: RootState) => state.tgd.modalSettingSCD)

  const onClose = () => {
    dispatch(modalSettingSCD(false))
  }
  const [editingKey, setEditingKey] = useState('')
  const [id_dx, setId_dx] = useState()
  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    console.log('record', record)
    form.setFieldsValue({ confirm_level: '', ...record })
    setEditingKey(record.key)
    setId_dx(record.id_dx)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item
      const formData = new FormData()
      formData.append('confirm_level', row.confirm_level)
      formData.append('listUsers[]', ep_id)
      formData.append('listConfirm[]', id_dx)
      const response = await instance.post(
        Constants.settingConfirm_updatePrivateLevel,
        formData
      )
      if (response?.status == 200) {
        toast.success('Cập nhập thành công')
      }
    } catch (error) {}
    // setEditingKey("");
  }
  const columns = [
    {
      title: 'Tên đề xuất',
      dataIndex: 'name_cate_dx',
      width: '50%',
      editable: false,
    },
    {
      title: 'Số cấp duyệt',
      dataIndex: 'confirm_level',
      width: '25%',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}>
              Lưu
            </Typography.Link>
            <span onClick={cancel}>
              <a>Hủy</a>
            </span>
          </span>
        ) : (
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}>
              <Button
                type='primary'
                style={{
                  width: '30px',
                  height: '30px',
                }}
                icon={<EditOutlined rev={'xxx'} />}
              />
            </Typography.Link>
          </span>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'confirm_level' ? 'number' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  return (
    <>
      <Modal
        open={open}
        wrapClassName='CustomerModal'
        footer={false}
        width={800}
        onCancel={onClose}
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#4c5bd4',
              padding: '12px 0',
              color: 'white',
              fontSize: '16px',
              fontWeight: 500,
            }}>
            <p style={{ paddingLeft: 12 }}>Chi tiết đề xuất</p>
          </div>
        }>
        <div style={{ padding: 20, marginTop: '-8px' }}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={dataTable}
              columns={mergedColumns}
              rowClassName='editable-row'
              pagination={{
                onChange: cancel,
              }}></Table>
          </Form>
        </div>
      </Modal>
    </>
  )
}

// onChange={onChange}
// onChange={onChange}
