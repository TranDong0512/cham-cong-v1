import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Card } from 'antd'
import styles from '../index.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'
import axios from 'axios'
import { domain } from './AddTable'
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { POST_TL, getCompIdCS } from '../../../api/BaseApi'

const AddTable = () => {
  const user_info = cookieCutter.get('userName')
  const token = cookieCutter.get('token_base365')
  const cp = cookieCutter.get('com_id')
  const ep_id = cookieCutter.get('userID')
  const role = cookieCutter.get('role')
  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false)
  const showModalAdd = () => {
    setIsModalEmployeeOpen(true)
  }
  const hanleModalEmployeeCancer = () => {
    setIsModalEmployeeOpen(false)
  }
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()
  const [tables, setTables] = useState([])
  const [apiData, setApiData] = useState([])
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editRevenue, setEditRevenue] = useState('')
  const [reload, setReload] = useState(false)
  const showModalEdit = () => {
    setIsEdit(false)
    setIsModalEditOpen(true)
  }
  const handleModalEditCancer = () => {
    setEditName('')
    setEditRevenue('')
    setIsModalEditOpen(false)
  }
  const [editingIndex, setEditingIndex] = useState(null)
  //chỉnh sửa

  const showModalEditConfirm = (key) => {
    setIsModalEditOpen(true)
    setIsEdit(true)
    setEditingIndex(key?.tl_id)
    setEditName(key?.tl_name)
    setEditRevenue(key?.tl_hoahong)
  }

  const handleOk = async () => {
    const newTable = {
      editName: editName,
      editRevenue: editRevenue,
    }
    const com_id = getCompIdCS()
    if (!editName) window.alert('Thiếu trường tên sản phẩm')
    else if (!editRevenue) window.alert('Thiếu trường số tiền')
    else {
      if (isEdit) {
        const res = await POST_TL(
          'api/tinhluong/congty/capnhat_thiet_lap_chiphi',
          {
            tl_id: editingIndex,
            tl_name: newTable?.editName,
            tl_chiphi: 0,
            tl_hoahong: newTable?.editRevenue,
          }
        )

        if (res?.message === 'success') {
          setEditingIndex(null)
          setEditName('')
          setEditRevenue('')
          handleModalEditCancer(false)
          setIsModalEditOpen(false)
          setReload(!reload)
        }
      } else {
        const res = await POST_TL('api/tinhluong/congty/them_thiet_lap', {
          tl_id_com: com_id,
          tl_id_rose: 4,
          tl_name: newTable?.editName,
          tl_money_min: 0,
          tl_money_max: 0,
          tl_phan_tram: 0,
          tl_chiphi: 0,
          tl_hoahong: newTable?.editRevenue,
          tl_kpi_yes: 0,
          tl_kpi_no: 0,
        })

        if (res?.message === 'success') {
          setEditingIndex(null)
          setEditName('')
          setEditRevenue('')
          setIsModalEditOpen(false)
          setReload(!reload)
        }
      }
    }
  }

  // ...

  // xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false)
  const [selectedTableIndex, setSelectedTableIndex] = useState(null)
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false)
  }

  const showModalDeleteConfirm = (key) => {
    setSelectedTableIndex(key?.tl_id)
    setIsModalDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedTableIndex !== null) {
      const res = await POST_TL('api/tinhluong/congty/delete_thiet_lap', {
        tl_id: selectedTableIndex,
      })
      if (res?.message === 'success') {
        window.alert('Xóa thành công')
        setSelectedTableIndex(null)
        setReload(!reload)
        setIsModalDeleteOpen(false)
      } else {
        window.alert('Xóa thất bại')
      }
    }
  }

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <p className={styles.employee_p}>Cài đặt hoa hồng lệ phí vị trí</p>
          </div>
          <div>
            <Button
              type='primary'
              className={`btn_employee ${styles.btn_employee}`}
              onClick={showModalEdit}>
              <p> Thêm mới</p>
            </Button>
          </div>
        </div>
      </>
    )
  }

  const columnsEmployee = [
    {
      title: 'STT',

      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.stt}</p>
        </div>
      ),
    },
    {
      title: 'Tên sản phẩm',
      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.tl_name}</p>
        </div>
      ),
      width: 700,
    },
    {
      title: 'Hoa hồng(VNĐ)',
      render: (record) => (
        <div>
          <p className={styles.p_style}>
            {record?.tl_hoahong
              ? new Intl.NumberFormat().format(record?.tl_hoahong)
              : 0}
          </p>
        </div>
      ),
    },

    {
      title: '',
      render: (record) => (
        <>
          <button
            style={{ marginRight: '20px' }}
            className={styles.button_edit}
            onClick={() => showModalEditConfirm(record)}>
            <EditOutlined />
          </button>
          <button
            className={styles.button_edit}
            onClick={() => showModalDeleteConfirm(record)}>
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ]
  useEffect(() => {
    const getTl = async () => {
      const com_id = getCompIdCS()

      const res = await POST_TL('api/tinhluong/congty/take_thiet_lap_com', {
        tl_id_com: com_id,
        tl_id_rose: 4,
      })

      if (res?.message === 'success') {
        let mapData = res?.listThietLap
        const filteredData = mapData.filter((obj) => obj?.tl_id_rose === 4)
        const filteredDataWithStt = filteredData.map((obj, index) => {
          obj.stt = index + 1
          return obj
        })
        setApiData(filteredDataWithStt)
      }
    }

    getTl()
  }, [reload])
  return (
    <>
      <Card
        key=''
        title='Hoa hồng lệ phí vị trí'
        bordered={false}
        style={{
          width: 300,
        }}>
        <div>
          <div>
            <p className={styles.write}>
              <EditOutlined style={{ color: '#000' }} />
              Miêu tả
            </p>
            <p className={styles.p_card}>
              Là mức hoa hồng đã được thiết lập sẵn cho 1 sản phẩm, dịch vụ mà
              nhân viên được hưởng sau khi bán ra ngoài thị trường{' '}
            </p>
          </div>
          <div className={styles.button_flex}>
            <button
              className={styles.button_top}
              onClick={() => setIsModalEmployeeOpen(true)}>
              <SettingOutlined style={{ color: '#fff' }} />
            </button>
            <button
              className={styles.button_bottom}
              onClick={() =>
                router.push('/cai-dat-luong/hoa-hong/hoahongvitri')
              }>
              Thêm
            </button>
          </div>
        </div>
      </Card>
      <div className="modal_delete">
        <Modal
          className={`modal_delete ${styles.modal_delete}`}
          open={isModalDeteleOpen}
          onCancel={handleDeleteCancel}
          footer={null}
        >
          <div
            className={styles.modal_delete_body}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Bạn chắc chắn muốn xóa ?
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingBottom: "12px",
            }}
          >
            <Button
              style={{backgroundColor:'transparent'}}
              onClick={handleDeleteCancel}
              className={`btn_cancer ${styles.btn_cancer} `}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className={`btn_delete ${styles.btn_delete}`}
            >
              <p> Xóa</p>
            </Button>
          </div>
        </Modal>
      </div>
      <div className='modalRecipe'>
        <Modal
          className={`modal_recipe ${styles.modal_recipe}`}
          title={
            <p style={{ padding: '10px' }}>
              {isEdit
                ? 'Sửa hoa hồng lệ phí vị trí'
                : 'Thêm mới hoa hồng lệ phí vị trí'}
            </p>
          }
          open={isModalEditOpen}
          onCancel={handleModalEditCancer}
          footer={null}>
          <div className={styles.modalRecipe_body} style={{ padding: '20px' }}>
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

            <div style={{display:'flex', justifyContent:'center'}}>
              <Button
                className={`btn_recipe ${styles.btn_recipe}`}
                type='primary'
                onClick={handleOk}>
                <p style={{padding:'0 24px'}}> Lưu</p>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className='modal_employee'>
        <Modal
          title={<Title />}
          width={1200}
          className={`modal_employee ${styles.modal_employee}`}
          open={isModalEmployeeOpen}
          onCancel={hanleModalEmployeeCancer}
          footer={null}>
          <div className={styles.modal_add_body} style={{ padding: '10px' }}>
            <div>
              <Table
                className={`table_add ${styles.table_add}`}
                scroll={{
                  x: 1000,
                }}
                columns={columnsEmployee}
                dataSource={apiData}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default AddTable
