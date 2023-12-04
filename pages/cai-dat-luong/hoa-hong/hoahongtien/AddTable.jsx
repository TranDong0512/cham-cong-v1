import React, { useState } from 'react'
import { Button, Modal, Table, Card, Upload } from 'antd'
import styles from '../index.module.css'
import Image from 'next/image'
import { EditOutlined, InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload
import { useRouter } from 'next/router'

export const domain = process.env.NEXT_PUBLIC_API

// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   onChange(info) {
//     const { status } = info.file
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList)
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`)
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`)
//     }s
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files)
//   },
// }
const Money = () => {
  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false)
  const showModalAdd = () => {
    setIsModalEmployeeOpen(true)
  }
  const hanleModalEmployeeCancer = () => {
    setIsModalEmployeeOpen(false)
  }
  const router = useRouter()
  const [tables, setTables] = useState([])
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editRevenue, setEditRevenue] = useState('')

  const showModalEdit = () => {
    setIsModalEditOpen(true)
  }
  const handleModalEditCancer = () => {
    setIsModalEditOpen(false)
  }
  const [editingIndex, setEditingIndex] = useState(null)
  const handleAddData = (data) => {
    const newData = { ...data, key: Date.now() }
    setTables((prevTables) => [...prevTables, newData])
  }

  const handleEditData = (key, newData) => {
    setTables((prevTables) =>
      prevTables.map((item) =>
        item.key === key ? { ...item, ...newData } : item
      )
    )
  }

  //chỉnh sửa

  const showModalEditConfirm = (key) => {

    setIsModalEditOpen(true)
    setEditingIndex(key)
    setEditName(tables[key]?.editName)
    setEditRevenue(tables[key]?.editRevenue)
  }

  const handleOk = () => {
    const newTable = {
      editName: editName,
      editRevenue: editRevenue,
    }

    if (editingIndex !== null) {
      handleEditData(editingIndex, newTable) // Gọi hàm handleEditData để cập nhật dữ liệu
    } else {
      handleAddData(newTable) // Gọi hàm handleAddData để thêm mới dữ liệu
    }

    setIsModalEditOpen(false)
    setEditingIndex(null)
    setEditName('')
    setEditRevenue('')
  }

  // ...

  // xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false)
  const [selectedTableIndex, setSelectedTableIndex] = useState(null)
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false)
  }

  const showModalDeleteConfirm = (key) => {
    setSelectedTableIndex(key)
    setIsModalDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedTableIndex !== null) {
      setTables((prevTables) =>
        prevTables.filter((_, key) => key !== selectedTableIndex)
      )
      setSelectedTableIndex(null)
      setIsModalDeleteOpen(false)
    }
  }

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <p className={styles.employee_p}>Cài đặt hoa hồng tiền</p>
          </div>
          <div>
            <Button
              type='primary'
              className={`btn_employee ${styles.btn_employee}`}
              onClick={showModalEdit}>
              Thêm mới
            </Button>
          </div>
        </div>
      </>
    )
  }

  const columnsEmployee = [
    {
      title: 'STT',
      dataIndex: 'key',
      render: () => (
        <div>
          <p className={styles.p_style}>1</p>
        </div>
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'editName',
      render: (editName) => (
        <div>
          <p className={styles.p_style}>{editName}</p>
        </div>
      ),
    },
    {
      title: 'Hoa hồng (VNĐ)',
      dataIndex: 'editRevenue',
      render: (editRevenue) => (
        <div>
          <p className={styles.p_style}>{editRevenue}</p>
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'edit',
      render: () => (
        <button className={styles.button_edit} onClick={showModalEditConfirm}>
          <Image
            alt='/'
            src={'/tinhluong/add-icon.png'}
            width={15}
            height={15}
          />
        </button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',

      render: () => (
        <button className={styles.button_edit} onClick={showModalDeleteConfirm}>
          <Image
            alt='/'
            src={'/tinhluong/delete-icon.png'}
            width={15}
            height={15}
          />
        </button>
      ),
    },
  ]

  return (
    <>
      <Card
        key=''
        title='Hoa hồng tiền'
        bordered={false}
        style={{
          width: 300,
        }}>
        {' '}
        <div>
          <div>
            <p className={styles.write}>
              <EditOutlined style={{ color: '#000' }} />
              Miêu tả
            </p>
            <p className={styles.bottom}>
              Nhập trực tiếp từ excel hoa hồng cho nhân viên
            </p>
          </div>
          <div className={styles.excel}>
            {/* <div className={styles.upLoad}>
              <Dragger {...props} className={styles.dragger}>
                <InboxOutlined />

                <p className={styles.file_ex}>
                  <Image
                    alt='/'
                    src={'/tinhluong/file_ex.png'}
                    width={20}
                    height={20}
                  />
                  File excel
                </p>
              </Dragger>
            </div>
            <p style={{ textAlign: 'center', color: '#68798B' }}>or</p> */}
            <div>
              <button
                className={styles.button_add}
                onClick={() =>
                  router.push('/cai-dat-luong/hoa-hong/hoahongtien')
                }>
                Thêm hoa hồng
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className='modal_delete'>
        <Modal
          className={`modal_delete ${styles.modal_delete}`}
          title='Bạn chắc chắn muốn xóa ?'
          open={isModalDeteleOpen}
          onCancel={handleDeleteCancel}
          footer={null}>
          <div className={styles.modal_delete_body}>
            <Button
              type='primary'
              onClick={handleDeleteCancel}
              className={`btn_cancer ${styles.btn_cancer}`}>
              Hủy
            </Button>
            <Button
              type='primary'
              onClick={handleConfirmDelete}
              className={`btn_delete ${styles.btn_delete}`}>
              Xóa
            </Button>
          </div>
        </Modal>
      </div>
      
      <div className='modalRecipe'>
        <Modal
          className={`modal_recipe ${styles.modal_recipe}`}
          title='Thêm mới hoa hồng lệ phí vị trí'
          open={isModalEditOpen}
          onCancel={handleModalEditCancer}
          footer={null}>
          <div className={styles.modalRecipe_body}>
            <div>
              <label className={styles.p_edit}>Tên sản phẩm *</label>
              <input
                type='text'
                className={styles.input}
                placeholder='Nhập tên sản phẩm'
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.p_edit}>Hoa hồng (VNĐ)*</label>
              <input
                type='number'
                className={styles.input}
                placeholder='Nhập tiền'
                value={editRevenue}
                onChange={(e) => setEditRevenue(e.target.value)}
              />
            </div>

            <div>
              <Button
                className={`btn_recipe ${styles.btn_recipe}`}
                type='primary'
                onClick={handleOk}>
                Lưu
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className='modal_employee'>
        <Modal
          title={<Title />}
          className={`modal_employee ${styles.modal_employee}`}
          open={isModalEmployeeOpen}
          onCancel={hanleModalEmployeeCancer}
          footer={null}>
          <div className={styles.modal_add_body}>
            <div>
              <Table
                scroll={{
                  x: 'max-content',
                }}
                className={`table_add ${styles.table_add}`}
                columns={columnsEmployee}
                dataSource={tables}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Money
