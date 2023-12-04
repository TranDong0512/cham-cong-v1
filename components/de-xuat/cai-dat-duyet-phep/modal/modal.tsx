import { ModalWrapper } from '@/components/modal/ModalWrapper'
import { MySelect } from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { MyTable } from '@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table'
import { Table } from 'antd'
import { useState } from 'react'
import styles from './modal.module.css'

export const DanhSachNhanVienModal = ({
  open,
  setOpen,
  data,
}: {
  open: boolean
  setOpen: any
  data: any[]
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [onAddSuccess, setOnAddSuccess] = useState(false)

  const columns = [
    {
      title: <p className={styles.headerTxt}>ID</p>,
      render: (record: any) => <p>{record?.id}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Tên nhân viên</p>,
      render: (record: any) => <p>{record?.name}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any) => (
        <p style={{ textTransform: 'capitalize' }}>{record?.apartment}</p>
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ</p>,
      render: (record: any) => <p>{record?.job}</p>,
      align: 'center',
    },

    Table.SELECTION_COLUMN,
  ]

  const children = (
    <div>
      <div style={{ padding: '0px 20px' }}>
        <div style={{ marginTop: '20px' }}>
          {MySelect('', 'Tất cả', false, false, '', [
            { label: 'Tất cả', value: 'Tất cả' },
          ])}
        </div>
        {MySelect('', 'Tên nhân viên', false, false, '', [
          { label: '(504004) Hồ Mạnh Hùng', value: '(504004) Hồ Mạnh Hùng' },
          { label: '(504004) Hồ Mạnh Hùng', value: '(504004) Hồ Mạnh Hùng12' },
          { label: '(504004) Hồ Mạnh Hùng', value: '(504004) Hồ Mạnh Hùng332' },
        ])}
      </div>
      <MyTable
        colunms={columns}
        data={data}
        hasRowSelect
        selectedRowKeys={selectedRowKeys}
        onSelectChange={(newRowkeys) => setSelectedRowKeys(newRowkeys)}
        Footer={null}
        onRowClick={() => null}
        rowKey='id'
      />
    </div>
  )

  return (
    <>
      {ModalWrapper(
        open,
        setOpen,
        children,
        1000,
        'Danh sách nhân viên',
        'Đồng ý',
        () => setOnAddSuccess(true),
        true,
        false
      )}
      {ModalWrapper(
        onAddSuccess,
        setOnAddSuccess,
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          {selectedRowKeys?.length === data?.length
            ? 'Bạn đã thêm toàn bộ nhân viên'
            : 'Bạn đã thêm nhân viên thành công'}
        </p>,
        400,
        '',
        'OK',
        () => {
          setOpen(false)
          setOnAddSuccess(false)
        },
        false,
        true,
        false,
        false
      )}
    </>
  )
}
