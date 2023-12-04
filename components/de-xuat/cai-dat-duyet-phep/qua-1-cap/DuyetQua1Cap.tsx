import { Button, Checkbox, Switch, Table, Tooltip } from 'antd'
import { useState } from 'react'
import styles from './DuyetQua1Cap.module.css'
import Image from 'next/image'
import { DanhSachNhanVienModal } from '../modal/modal'
import { ModalWrapper } from '@/components/modal/ModalWrapper'

const DeleteConfirmModal = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: any
}) => {
  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: 'center' }}>Bạn có chắc muốn xóa ?</p>,
    400,
    '',
    'Xóa',
    () => null,
    false,
    true,
    false,
    true
  )
}

export const DuyetQua1Cap = () => {
  const [isOn, setIsOn] = useState(true)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [data, setData] = useState([])
  const columns = [
    {
      title: <p className={styles.headerTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>ID</p>,
      render: (record: any, index: number) => <p>{record?.id}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Họ và tên</p>,
      render: (record: any, index: number) => <p>{record?.name}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any, index: number) => (
        <p style={{ textTransform: 'uppercase' }}>{record?.apartment}</p>
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ</p>,
      render: (record: any, index: number) => <p>{record?.job}</p>,
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ]

  const onCheckAll = () => {
    const allIds: any[] = data.map((item) => item?.id)
    selectedRowKeys?.length === data?.length
      ? setSelectedRowKeys([])
      : setSelectedRowKeys(allIds)
  }

  return (
    <div>
      <p className={styles.firstText}>
        Là để xuất nghỉ bắt buộc chọn 1 người duyệt
      </p>
      <div style={{ display: 'flex', margin: '20px 0px' }}>
        <Switch
          style={{ backgroundColor: isOn ? '#29B66E' : 'grey' }}
          checked={isOn}
          onChange={(checked) => setIsOn(checked)}
        />
        <p style={{ marginLeft: '12px' }}>Duyệt đề xuất nghỉ phép qua 1 cấp</p>
      </div>
      {isOn && (
        <>
          <p
            className={styles.firstText}
            style={{ fontWeight: '600', marginBottom: '10px' }}>
            Danh sách những nhân sự duyệt qua nhiều cấp (nếu có)
          </p>
          <Button
            onClick={() => setIsOpenModal(true)}
            size='large'
            style={{
              borderRadius: '5px',
              background: '#4C5BD4',
              display: 'flex',
              alignItems: 'center',
            }}
            icon={
              <Image alt='/' src={'/check-circle.png'} width={24} height={24} />
            }>
            <p style={{ color: '#fff', padding: '10px 0px' }}>Chọn Nhân viên</p>
          </Button>

          {/* table */}
          <Table
            className={`${styles.table} blue-table`}
            rowClassName={styles.row}
            columns={columns}
            dataSource={data}
            scroll={{ x: 'max-content' }}
            rowKey={(record) => record?.id}
            pagination={{
              position: ['bottomCenter'],
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys: any) =>
                setSelectedRowKeys(selectedRowKeys),
              columnWidth: 150,
              columnTitle: (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Tooltip title={<p style={{ color: '#fff' }}>Xóa tất cả</p>}>
                    <Image
                      alt='/'
                      src={'/trash-red.png'}
                      width={24}
                      height={24}
                      onClick={() => setIsOpenDeleteModal(true)}
                    />
                  </Tooltip>
                  <Checkbox
                    onChange={onCheckAll}
                    style={{ marginLeft: '10px' }}
                  />
                </div>
              ),
            }}
          />
          <DanhSachNhanVienModal
            open={isOpenModal}
            setOpen={setIsOpenModal}
            data={[]}
          />
          <DeleteConfirmModal
            open={isOpenDeleteModal}
            setOpen={setIsOpenDeleteModal}
          />
        </>
      )}
    </div>
  )
}
