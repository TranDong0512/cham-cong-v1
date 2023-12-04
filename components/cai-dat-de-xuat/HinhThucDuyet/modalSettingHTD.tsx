import { RootState } from '@/redux/storeQLC'
import {
  Button,
  Form,
  InputNumber,
  Modal,
  Select,
  Table,
  Typography,
} from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { modalSettingHTDState, updateHTD } from '../reducer/reducer'
import { useEffect, useState } from 'react'
import instance from '@/components/hooks/axios.config'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import FormData from 'form-data'
import { toast } from 'react-toastify'
import Constants from '../Constant/constant'
import { ColumnType } from 'antd/es/table'

const option = [
  { label: 'Duyệt đồng thời', value: '1' },
  { label: 'Duyệt lần lượt', value: '2' },
  { label: 'Duyệt đồng thời và lần lượt', value: '3' },
]
interface Item {
  key: string
  dexuat_name: string
  confirm_type: any
  confirm_level: number
  confirm_time: number
  confirmTypeName: string
  dexuat_id: any
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

export default function ModalSettingHTD() {
  const dispatch = useDispatch()
  const update = useSelector((state: RootState) => state.tgd.updateHTD)
  const [dataVt, setDataVt] = useState<any>()
  const ep_id = useSelector((state: RootState) => state.tgd.data)
  const [form] = Form.useForm()
  const open = useSelector((state: RootState) => state.tgd.modalSettingHTD)
  const [editingKey, setEditingKey] = useState('')
  const [id_dx, setId_dx] = useState()
  const [selectChange, setSelectChange] = useState<any>()
  useEffect(() => {
    const unFollow = async () => {
      try {
        const object = {
          ep_id: ep_id[0],
        }
        const fetcher = async () => {
          return await instance.post(
            'api/qlc/settingConfirm/detailUser',
            object
          )
        }
        const data = await fetcher()
        const newData = data?.data?.data?.data?.map((item, index) => ({
          ...item,
          key: index,
        }))
        setDataVt(newData)
      } catch (err) {}
    }
    unFollow()
  }, [update])
  const onClose = () => {
    dispatch(modalSettingHTDState(false))
  }
  const onChange = (value: any) => {
    setSelectChange(value)
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
    const inputNode =
      inputType == 'number' ? (
        <InputNumber />
      ) : (
        <Select
          options={option}
          onChange={onChange}
          value={selectChange}
          defaultValue={option[record?.confirm_type - 1]}
        />
      )
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${title}`,
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

  const [dataChon, setDataChon] = useState<any>()
  const isEditing = (record: Item) => record.key === editingKey
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    setDataChon(record)
    form.setFieldsValue({
      confirm_level: '',
      confirm_type: '',
      confirm_time: '',
      ...record,
    })
    setEditingKey(record.key)
    setId_dx(record.dexuat_id)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item
      const apiPromises = [
        instance.post(Constants.settingConfirm_updatePrivateType, {
          confirm_type:
            row.confirmTypeName != '1' &&
            row.confirmTypeName != '2' &&
            row.confirmTypeName != '3'
              ? dataChon.confirm_type
              : row.confirmTypeName,
          listConfirm: [id_dx],
          listUsers: ep_id,
        }),
        instance.post(Constants.settingConfirm_updatePrivateLevel, {
          confirm_level: row.confirm_level,
          listConfirm: [id_dx],
          listUsers: ep_id,
        }),
        instance.post(Constants.settingConfirm_updatePrivateTime, {
          confirm_time: row.confirm_time,
          listConfirm: [id_dx],
          listUsers: ep_id,
        }),
      ]
      const responses = await Promise.all(apiPromises)
      const isSuccess = responses.every(
        (response) => response.data?.data?.result
      )
      if (isSuccess) {
        setSelectChange(selectChange)
        toast.success('Cập nhập thành công')
        dispatch(updateHTD(!update))
        setEditingKey('')
      }
    } catch (error) {}
    // setEditingKey("");
  }
  const columns = [
    {
      title: 'Tên đề xuất',
      dataIndex: 'dexuat_name',
      width: '25%',
      editable: false,
    },
    {
      title: 'Số cấp duyệt',
      width: '15%',
      dataIndex: 'confirm_level',
      editable: true,
    },
    {
      title: 'Hình thức duyệt',
      width: '35%',
      dataIndex: 'confirmTypeName',
      editable: true,
    },
    {
      title: 'Thời gian duyệt',
      width: '15%',
      dataIndex: 'confirm_time',
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
                icon={<EditOutlined style={{ color: '#fff' }} rev={'xxx'} />}
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
        inputType: col.dataIndex === 'confirmTypeName' ? 'text' : 'number',
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
        width={1124}
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
              dataSource={dataVt}
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
