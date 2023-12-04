import styles from './duyet-thiet-bi.module.css'
import { Card, Table, Button, Select, Form } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { modalDeleteThietBi } from './modal-thiet-bi/modal-thiet-bi'
import Image from 'next/image'
import { DELETE } from '@/pages/api/BaseApi'
export const mySelect = (
  hasSearch: boolean,
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string,
  options: Array<any> = [],
  handleChange?: Function
) => (
  <Form.Item
    name={name}
    required={required}
    rules={[{ required: true, message: 'Vui lòng điền đủ thông tin' }]}>
    <Select
      size='large'
      placeholder={placeholder}
      suffixIcon={<img src='/down-icon.png'></img>}
      options={options}
      showSearch={hasSearch}
      listHeight={200}
      allowClear={true}
      onChange={(value: any, option: any) => {
        handleChange && handleChange(value, option)
      }}
    />
  </Form.Item>
)

export function MyTable2(
  data: any,
  setListAccept: Function,
  setModalState: Function,
  setTypeModal: Function
) {
  const [newdata, setNewData] = useState(data)
  const [newdataother, setNewDataOther] = useState(newdata)
  const [modalDelete, setModalDelete] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([
    ...data?.map((emp) => (emp?.status === 1 ? null : emp?.key)),
  ])
  console.log(selectedRowKeys)
  const handleNewData = (key: React.Key) => {
    DELETE('api/qlc/checkdevice/delete', { ed_id: key }).then((res) => {
      setModalDelete(true)
      const dataTemple = newdata?.filter((item: any) => item?.key !== key)
      setNewDataOther(dataTemple)

      const keyTemp = selectedRowKeys?.filter((item) => item !== key)
      setListAccept(keyTemp)
    })
  }
  const columns: ColumnsType<any> = [
    {
      title: <p style={{ color: '#4c5bd4 ' }}>Ảnh</p>,
      dataIndex: 'url',
      align: 'center',
      render: (record) => <Image src={record} alt='/' width={46} height={46} />,
    },
    {
      title: <p style={{ color: '#4c5bd4 ' }}>Họ tên(ID)</p>,
      render: (record: any) => <p>{record?.name}</p>,
      align: 'center',
    },
    {
      title: <p style={{ color: '#4c5bd4 ' }}>Phòng ban</p>,
      render: (record: any) => <p>{record?.room}</p>,
      align: 'center',
    },
    {
      title: <p style={{ color: '#4c5bd4 ' }}>Thiết bị đang sử dụng</p>,
      render: (record: any) => <p>{record?.equipment}</p>,
      align: 'center',
    },
    {
      title: <p style={{ color: '#4c5bd4 ' }}>Thiết bị mới</p>,
      render: (record: any) => <p>{record?.newEquipment}</p>,
      align: 'center',
    },
    {
      title: <p style={{ color: '#4c5bd4 ' }}>Chức năng</p>,
      dataIndex: 'delete',
      align: 'center',
      render: (_, record: any) => (
        <img
          src='/delete-icon.png'
          onClick={() => {
            handleNewData(record?.key)
          }}
        />
      ),
    },
  ]
  return (
    <div>
      <Table
        className={`${styles.Tables} table_duyet`}
        columns={columns}
        dataSource={newdata}
        sticky={true}
        scroll={{ x: '1200px' }}
        pagination={{ position: ['bottomCenter'] }}
        rowSelection={{
          onSelectAll: (
            selected: any,
            selectedRowKeys: any,
            selectedRows: any
          ) => {
            if (selected === true) {
              setTypeModal('checkAll')
            }
          },
          onSelect: (record: any, selected: boolean) => {
            if (selected === true) {
              setTypeModal(record?.name)
            }
          },
          onChange(selectedRowKeys: any, selectedRows: any) {
            setSelectedRowKeys(selectedRowKeys)
            setListAccept(selectedRowKeys)
          },
          selectedRowKeys,
        }}></Table>
      {/* {modalNhapLaiMat(
        modalState,
        setModalState,
        typeModal === "checkAll"
          ? "Tất cả nhân viên đã được duyệt thiết bị khi chấm công"
          : `Đã duyệt thiết bị nhân viên ${typeModal} chấm công`
      )} */}
      {modalDeleteThietBi(
        'Bạn có chắc chắn muốn xóa nhân viên này khỏi danh sách thiết bị mới chấm công ?',
        'Xác nhận',
        modalDelete,
        setModalDelete,
        setNewData,
        newdataother
      )}
    </div>
  )
}
