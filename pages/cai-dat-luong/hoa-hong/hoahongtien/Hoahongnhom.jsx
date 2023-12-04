import React, { useState, useEffect } from 'react'
import styles from '../hoahongcanhan.module.css'
import { DatePicker, Table, Select, Modal, Button, Radio, Form } from 'antd'
import dayjs from 'dayjs'
import {
  MonthData,
  YearData,
} from '../../../../components/tinh-luong/components/Data/SelectionData'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/router'
import axios from 'axios'
import { domain } from './AddTable'
dayjs.extend(customParseFormat)
dayjs.locale('vi')
const { RangePicker } = DatePicker

const Hoahongnhom = () => {
  const dateFormat = 'DD/MM/YYYY'

  //render dữ liệu
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTc0OTYsImlkVGltVmllYzM2NSI6MjQwMDgwLCJpZFFMQyI6MTI0ODMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoidHVhbmFuaGh1c3QwNUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjgxNTMxNzA5LCJ0eXBlIjoyLCJjb21faWQiOjMzMTIsInVzZXJOYW1lIjoiTmd1eeG7hW4gVHXhuqVuIEFuaCJ9LCJpYXQiOjE2OTIzNDUwNDgsImV4cCI6MTY5MjQzMTQ0OH0.MgfQvd4SnMp9qAVeiaJVGU8p4_rdYgX2QAGMVOY1CIs'
  const cp = 1664
  const [form] = Form.useForm()
  const [apiData, setApiData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1)
  const [selectedYear, setSelectedYear] = useState(dayjs().year())
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear)
  }, [selectedMonth, selectedYear])
  const fetchApiData = (month, year) => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_rose_money_nhom`, {
        token: token,
        ro_id_com: cp,
        month: month,
        year: year,
        start_date: `${year}/${month}/01`,
        end_date: `${month === 12 ? year + 1 : year}/${
          month === 12 ? 1 : month + 1
        }/01`,
      })
      .then((response) => {
        setApiData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error)
      })
  }
  const onChange = (value) => {
    console.log(`selected ${value}`)
  }
  const onSearch = (value) => {
    console.log('search:', value)
  }
  const router = useRouter()
  // in ra dữ liệu nhóm
  const [dataGroup, setDataGroup] = useState()
  // const [dataradio, setDataRadio] = useState(false);
  useEffect(() => {
    fetchApiGroup()
  }, [])
  const fetchApiGroup = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/takedata_group_com`, {
        token: token,
        lgr_id_com: cp,
      })
      .then((response) => {
        const results = response.data.listGroup.map((row) => ({
          key: row.lgr_id,
          name: row.lgr_name,
          length: row.detail.length,
        }))
        setDataGroup(results)
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error)
      })
  }
  //modalthêm mới
  const [tables, setTables] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editName, setEditName] = useState()
  const [editTime, setEditTime] = useState(null)
  const [editMoney, setEditMoney] = useState('')
  const [editNote, setEditNote] = useState('')
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleModalCancer = () => {
    setIsModalOpen(false)
  }

  //chỉnh sửa
  const showModalEditConfirm = (key) => {
    console.log('Edit key:', key)
    setIsModalOpen(true)
    setEditingIndex(key)
    setEditName(tables[key]?.incomeType)
    setEditTime(tables[key]?.editTime)
    setEditMoney(tables[key]?.editMoney)
    setEditNote(tables[key]?.editNode)
  }

  const handleOk = () => {
    const newTable = {
      incomeType: editName,
      editTime: editTime?.format('DD-MM-YYYY'),
      editMoney: editMoney,
      editNote: editNote,
    }
    setIsModalOpen(false)
    setEditingIndex(null)
    setEditName()
    setEditTime(null)
    setEditMoney('')
    setEditNote('')
  }

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

  const columns = [
    {
      title: 'Nhóm nhân viên',
      render: (record) => (
        <div>
          <p className={styles.p_name}>{record?.ListGroup?.[0]?.lgr_name}</p>
          <p className={styles.p_id}>{record?.UserGroup.length} người</p>
        </div>
      ),
    },
    {
      title: 'Thời gian',
      render: (record) => (
        <div>
          <p className={styles.p_time}>
            {new Date(`${record?.ro_time}`).toLocaleDateString('en-GB')}
          </p>
        </div>
      ),
    },
    {
      title: 'Số tiền',
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.ro_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            VNĐ
          </p>
        </div>
      ),
    },
    {
      title: 'Ghi chú',
      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ListGroup?.[0]?.lgr_note}</p>
        </div>
      ),
    },
    {
      title: '',
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

  // table checkbox
  const columnGroup = [
    {
      title: '',

      render: (record) => {
        return (
          <div>
            <p>{record.name}</p>
            <p>{record.length} người</p>
          </div>
        )
      },
      // renderRadio: (record) => (
      //    <Radio value={record.lgr_id} />
      // ),
    },
  ]
  const [selectionType, setSelectionType] = useState('radio')
  // const [selectedRowId, setSelectedRowId] = useState(null);
  const rowSelection = {
    type: selectionType,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    // onChange: (selectedRowKeys, selectedRows) => {
    //    if (selectedRowKeys.length > 0) {
    //       setSelectedRowId(selectedRowKeys[0]);
    //    } else {
    //       setSelectedRowId(null);
    //    }
    // },
    getCheckboxProps: (record) => ({
      name: record?.lgr_name,
    }),
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>
              Danh sách nhóm nhân viên hoa hồng tiền
            </h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhóm nhân viên hoa hồng tiền
            </p>
          </div>
          <div>
            <div className={styles.modal_body}>
              <button
                type='primary'
                className={styles.btn_add}
                onClick={showModal}>
                Thêm mới
              </button>
            </div>
          </div>
        </div>
        <div className={styles.select_time}>
          <Form.Item name={'month'} className={styles.formItem}>
            <Select
              className={styles.selection}
              showSearch
              defaultValue={{
                label: `Tháng ${selectedMonth}`,
                value: selectedMonth,
              }}
              optionFilterProp='children'
              options={MonthData}
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
            />
          </Form.Item>
          <Form.Item name={'year'} className={styles.formItem}>
            <Select
              className={styles.selection}
              showSearch
              defaultValue={{ label: `${selectedYear}`, value: selectedYear }}
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              options={YearData}
            />
          </Form.Item>

          <Select
            showSearch
            style={{ marginTop: '8px' }}
            placeholder=''
            defaultValue='Nhập tên cần tìm'
            optionFilterProp='children'
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 'Mới nhất',
                label: 'Mới nhất',
              },
              {
                value: 'Cũ nhất',
                label: 'Cũ nhất',
              },
              {
                value: 'Phòng ban',
                label: 'Phòng ban',
              },
            ]}
          />
        </div>
        <div className={styles.table_content}>
          <Table
            columns={columns}
            scroll={{
              x: 1000,
            }}
            dataSource={apiData?.rose_user}
            className={`table_add ${styles.table_add}`}
            pagination={false}
          />
        </div>
      </div>
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
          className={`modal_edit ${styles.modal_edit}`}
          title='Thêm mới hoa hồng tiền'
          open={isModalOpen}
          onCancel={handleModalCancer}
          footer={null}>
          <div className={styles.modalRecipe_body}>
            <div className={styles.format}>
              <div>
                <Radio.Group
                  onChange={({ target: { value } }) => {
                    setSelectionType(value)
                  }}
                  defaultValue='radio'
                />
                <Table
                  rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                  }}
                  className={styles.table_group}
                  columns={columnGroup}
                  dataSource={dataGroup}
                  pagination={false}
                  scroll={{
                    y: 240,
                  }}
                />
              </div>

              <label className={styles.p_edit}>Thời gian áp dụng</label>
              <DatePicker
                formatr={dateFormat}
                className={styles.times_month}
                value={editTime}
                onChange={(date) => setEditTime(date)}
              />

              <label className={styles.p_edit}>Nhập số tiền</label>
              <input
                type='number'
                className={styles.input}
                placeholder='Nhập số tiền'
                value={editMoney}
                onChange={(e) => setEditMoney(e.target.value)}
              />

              <label className={styles.p_edit}>Ghi chú</label>
              <textarea
                type='text'
                rows={3}
                className={styles.textarea}
                placeholder='Thêm ghi chú'
                value={editNote}
                onChange={(e) => {
                  setEditNote(e.target.value)
                }}
              />

              <Button
                className={`btn_recipe ${styles.btn_recipe}`}
                type='primary'
                onClick={handleOk}>
                Thêm hoa hồng
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Hoahongnhom
