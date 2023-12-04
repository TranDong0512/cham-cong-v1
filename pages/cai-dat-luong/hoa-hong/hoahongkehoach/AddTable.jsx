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

const Plan = () => {

  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false)

  const hanleModalEmployeeCancer = () => {
    setIsModalEmployeeOpen(false)
  }
  const router = useRouter()
  const [tables, setTables] = useState([])
  const [apiData, setApiData] = useState([])
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editRevenue, setEditRevenue] = useState('')
  const [reload, setReload] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [kpiYes, setKpiYes] = useState()
  const [kpiNo, setKpiNo] = useState()
  const showModalEdit = () => {
    setIsEdit(false)
    setEditName('')
    setKpiYes('')
    setKpiNo('')
    setIsModalEditOpen(true)
  }
  const handleModalEditCancer = () => {
    setIsModalEditOpen(false)
  }
  const [editingIndex, setEditingIndex] = useState(null)

  //chỉnh sửa

  const showModalEditConfirm = (key) => {
    setIsModalEditOpen(true)
    setIsEdit(true)
    setEditingIndex(key?.tl_id)
    setEditName(key?.tl_name)
    setKpiYes(key?.tl_kpi_yes)
    setKpiNo(key?.tl_kpi_no)
  }

  const handleOk = async () => {
    const com_id = getCompIdCS()
    if (!editName) window.alert('Thiếu tên hoa hồng')
    else if (!kpiYes) window.alert('Thiếu trường đạt KPI')
    else if (!kpiNo) window.alert('Thiếu trường không đạt KPI')
    else {
      if (isEdit) {
        const res = await POST_TL(
          'api/tinhluong/congty/capnhat_thiet_lap_kpi',
          {
            tl_id: editingIndex,
            tl_name: editName,
            tl_kpi_yes: kpiYes,
            tl_kpi_no: kpiNo,
          }
        )

        if (res?.message === 'success') {
          window.alert('Sửa thành công')
          setIsModalEditOpen(false)
          setEditingIndex(null)
          setEditName('')
          setEditRevenue('')
          setReload(!reload)
        } else {
          window.alert('Sửa thất bại')
        }
      } else {
        const res = await POST_TL('api/tinhluong/congty/them_thiet_lap', {
          tl_id_com: com_id,
          tl_id_rose: 5,
          tl_name: editName,
          tl_money_max: 0,
          tl_money_min: 0,
          tl_phan_tram: 0,
          tl_chiphi: 0,
          tl_hoahong: 0,
          tl_kpi_yes: kpiYes,
          tl_kpi_no: kpiNo,
        })

        if (res?.message === 'success') {
          window.alert('Thêm thành công')
          setIsModalEditOpen(false)
          setEditingIndex(null)
          setEditName('')
          setEditRevenue('')
          setReload(!reload)
        } else {
          window.alert('Thêm thất bại')
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
        setIsModalDeleteOpen(false)
        setReload(!reload)
      } else {
        window.alert('Xóa Thất bại')
      }
    }
  }

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <p className={styles.employee_p}>Cài đặt hoa hồng kế hoạch</p>
          </div>
          <div>
            <Button
              type='primary'
              className={styles.btn_employee}
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
      render: (_, record, index) => (
        <div>
          <p className={styles.p_style}>{index + 1}</p>
        </div>
      ),
    },
    {
      title: 'Tên kế hoạch',
      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.tl_name}</p>
        </div>
      ),
    },
    {
      title: 'Đạt KPI',
      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.tl_kpi_yes}</p>
        </div>
      ),
    },
    {
      title: 'Không đạt KPI',
      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.tl_kpi_no}</p>
        </div>
      ),
    },
    {
      title: '',
      render: (record) => (
        <>
          <button
            className={styles.button_edit}
            onClick={() => showModalEditConfirm(record)}
            style={{ marginRight: '20px' }}>
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
        tl_id_rose: 5,
      })

      if (res?.message === 'success') {
        setApiData(res?.listThietLap)
      }
    }

    getTl()
  }, [reload])
  return (
    <>
      <Card
        key=''
        title='Hoa hồng kế hoạch'
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
              Là mức hoa hồng mà nhân viên được hưởng khi đạt 1 mức chỉ tiêu
              nhất định do công ty đề ra{' '}
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
                router.push('/cai-dat-luong/hoa-hong/hoahongkehoach')
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
          className={styles.modal_recipe}
          open={isModalEditOpen}
          onCancel={handleModalEditCancer}
          footer={null}>
          <div className={styles.modalRecipe_body} style={{ padding: '10px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {isEdit ? 'Sửa hoa hồng kế hoạch' : 'Thêm mới hoa hồng kế hoạch'}
            </p>
            <div>
              <label className={styles.p_edit}>Tên kế hoạch*</label>
              <input
                type='text'
                className={styles.input}
                placeholder='Nhập Tên kế hoạch'
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.p_edit}>Đạt KPI *</label>
              <input
                type='number'
                className={styles.input}
                placeholder='Nhập tiền'
                value={kpiYes}
                onChange={(e) => setKpiYes(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.p_edit}>Không đạt KPI *</label>
              <input
                type='number'
                className={styles.input}
                placeholder='Nhập tiền'
                value={kpiNo}
                onChange={(e) => setKpiNo(e.target.value)}
              />
            </div>
            <div>
              <Button
                className={styles.btn_recipe}
                type='primary'
                onClick={handleOk}>
                <p> Lưu</p>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className='modal_employee'>
        <Modal
          title={<Title />}
          width={1200}
          className={styles.modal_employee}
          open={isModalEmployeeOpen}
          onCancel={hanleModalEmployeeCancer}
          footer={null}>
          <div className={styles.modal_add_body}>
            <div>
              <Table
                scroll={{
                  x: 1000,
                }}
                className={styles.table_add}
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

export default Plan
