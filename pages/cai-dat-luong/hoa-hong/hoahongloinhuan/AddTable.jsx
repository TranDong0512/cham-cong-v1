import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Card } from 'antd'
import styles from '../index.module.css'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { POST, POST_TL, getCompIdCS } from '../../../api/BaseApi'

const Profit = () => {
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
  const router = useRouter()
  const [tables, setTables] = useState([])
  const [apiData, setApiData] = useState([])
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editRevenue, setEditRevenue] = useState('')
  const [reload, setReload] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const showModalEdit = () => {
    setIsEdit(false)
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
    setIsEdit(true)
    setEditingIndex(key?.tl_id)
    setEditName(key?.tl_name)
    setEditRevenue(key?.tl_chiphi)
  }

  const handleOk = async () => {
   
    if (isEdit) {
      const com_id = getCompIdCS()
      if( editName == null || editName == '' || editName == undefined) {
        window.alert('Nhập tên sản phẩm!') 
        return
      }
      if( editRevenue == null || editRevenue == '' || editRevenue == undefined) {
        window.alert('Nhập hoa hồng') 
        return
      }
      else {
        const res = await POST_TL(
          'api/tinhluong/congty/capnhat_thiet_lap_chiphi',
          {
            tl_chiphi:editRevenue,
            tl_hoahong: 0,
            tl_name: editName,
            tl_id: editingIndex,
          }
        )
        if (res?.message === 'success') {
          window.alert('Chỉnh sửa thành công')
          setIsModalEditOpen(false)
          setEditingIndex(null)
          setEditName('')
          setEditRevenue('')
          setReload(!reload)
        }
      }
    } else { 
      const com_id = getCompIdCS()
      if( editName == null || editName == '' || editName == undefined) {
        window.alert('Nhập tên sản phẩm!') 
        return
      }
      if( editRevenue == null || editRevenue == '' || editRevenue == undefined) {
        window.alert('Nhập hoa hồng') 
        return
      }
      
      else {
        const res = await POST_TL('api/tinhluong/congty/them_thiet_lap', {
          tl_id_com: com_id,
          tl_id_rose: 3,
          tl_chiphi: editRevenue,
          tl_name: editName,
          tl_money_max: 0,
          tl_money_min: 0,
          tl_phan_tram: 0,
          tl_kpi_yes: 0,
          tl_kpi_no: 0,
          tl_hoahong: 0,
        })
        if (res?.message === 'success') {
          window.alert('Thêm mới thành công')
          setIsModalEditOpen(false)
          setEditingIndex(null)
          setEditName('')
          setEditRevenue('')
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
    if (selectedTableIndex) {
      const res = await POST_TL('api/tinhluong/congty/delete_thiet_lap', {
        tl_id: selectedTableIndex,
      })

      if (res?.message === 'success') {
        setIsModalDeleteOpen(false)
        setReload(!reload)
      }
    }
  }

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <p className={styles.employee_p}>Cài đặt hoa hồng lợi nhuận</p>
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
    },
    {
      title: 'Chi phí',
      render: (record) => (
        <div>
          <p className={styles.p_style}>{record?.tl_chiphi}</p>
        </div>
      ),
    },
    {
      title: 'Hành động',
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
    const com_id = getCompIdCS()
    const getThietlap = async () => {
      const res = await POST_TL('api/tinhluong/congty/take_thiet_lap_com', {
        tl_id_com: com_id,
        token: token,
      })

      if (res?.message === 'success') {
        let mapData = res?.listThietLap
        const filteredData = mapData.filter((obj) => obj?.tl_id_rose === 3)
        const filteredDataWithStt = filteredData.map((obj, index) => {
          obj.stt = index + 1
          return obj
        })
        setApiData(filteredDataWithStt)
      }
    }
    getThietlap()
  }, [reload])
  return (
    <>
      <Card
        key=''
        title='Hoa hồng lợi nhuận'
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
              Là phần chênh lệch giữa chi phí bỏ ra để tạo ra 1 sản phẩm, dịch
              vụ với doanh thu thu lại khi bán sản phẩm dịch vụ đó.
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
                router.push('/cai-dat-luong/hoa-hong/hoahongloinhuan')
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
          open={isModalEditOpen}
          onCancel={handleModalEditCancer}
          footer={null}>
          <div className={styles.modalRecipe_body} style={{ padding: '10px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {isEdit
                ? 'Sửa hoa hồng lợi nhuận'
                : 'Thêm mới hoa hồng lợi nhuận'}
            </p>
            <div>
              <label className={styles.p_edit}>Tên sản phẩm <span style={{color:'red'}}>*</span></label>
              <input
                type='text'
                className={styles.input}
                placeholder='Nhập tên sản phẩm'
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required = {true}
              />
            </div>
            <div>
              <label className={styles.p_edit}>Hoa hồng (VNĐ)<span style={{color:'red'}}>*</span></label>
              <input
                type='number'
                className={styles.input}
                placeholder='Nhập tiền'
                value={editRevenue}
                onChange={(e) => setEditRevenue(e.target.value)}
                required = {true}

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

export default Profit
