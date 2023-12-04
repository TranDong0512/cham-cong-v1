import React, { useState } from 'react'
import styles from '../hoahongcanhan.module.css'
import { DatePicker, Table, Select, Modal, Button, Radio } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/router'

dayjs.extend(customParseFormat)
dayjs.locale('vi')
const { RangePicker } = DatePicker

const Hoahongnhom = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [selectedYear, setSelectedYear] = useState(dayjs())
  const monthFormat = 'MM'
  const yearFormat = 'YYYY'
  const dateFormat = 'DD/MM/YYYY'
  const handleMonthChange = (monthString) => {
    setSelectedMonth(dayjs(monthString, monthFormat))
  }

  const handleYearChange = (yearString) => {
    setSelectedYear(dayjs(yearString, yearFormat))
  }

  const onChange = (value) => {
    console.log(`selected ${value}`)
  }
  const onSearch = (value) => {
    console.log('search:', value)
  }
  const router = useRouter()

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

    if (editingIndex !== null) {
      console.log('Updating data with key:', editingIndex)
      handleEditData(editingIndex, newTable)
    } else {
      console.log('Adding new data:', newTable)
      handleAddData(newTable)
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
      dataIndex: 'incomeType',
      render: (editName) => (
        <div>
          <p className={styles.p_name}>{editName}</p>
        </div>
      ),
    },
    {
      title: 'Chu kỳ',
      dataIndex: 'editTime',
      render: (editTime) => (
        <div>
          <p className={styles.p_time}>{editTime}</p>
        </div>
      ),
    },
    {
      title: 'Tên kế hoạch',
      dataIndex: 'editMoney',
      render: (editMoney) => (
        <div>
          <p className={styles.p_red}>{editMoney}</p>
        </div>
      ),
    },
    {
      title: 'Tiền thưởng',
      dataIndex: 'editNote',
      render: (editNote) => (
        <div>
          <p className={styles.p_time}>{editNote}</p>
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'editNote',
      render: (editNote) => (
        <div>
          <p className={styles.p_time}>{editNote}</p>
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

  // table checkbox
  const columnGroup = [
    {
      title: '',
      dataIndex: 'name',
      render: (name) => (
        <div className={styles.render}>
          <div>
            <Image
              alt='/'
              src={'/tinhluong/tien.png'}
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div>
            <p>{name}</p>
            <p>(10 người)</p>
          </div>
        </div>
      ),
    },
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
    },
    {
      key: '2',
      name: 'Jim Green',
    },
    {
      key: '3',
      name: 'Joe Black',
    },
  ]
  const [selectionType, setSelectionType] = useState('radio')
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>
              Danh sách nhóm nhân viên hoa hồng kế hoạch
            </h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhóm nhân viên hoa hồng kế hoạch
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
          <div>
            <DatePicker
              defaultValue={selectedMonth}
              format={monthFormat}
              onChange={handleMonthChange}
              picker='month'
              locale={{
                lang: {
                  locale: 'vi',
                },
              }}
            />
          </div>
          <div>
            <DatePicker
              defaultValue={selectedYear}
              format={yearFormat}
              onChange={handleYearChange}
              picker='year'
            />
          </div>
          <div>
            <SearchOutlined className={styles['search-icon']} />
            <Select
              showSearch
              placeholder=''
              defaultValue='Nhập tên cần tìm'
              optionFilterProp='children'
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
        </div>
        <div className={styles.table_content}>
          <Table
            columns={columns}
            scroll={{
              x: 1000,
            }}
            dataSource={tables}
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
          title='Thêm mới hoa kế hoạch'
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
                  dataSource={data}
                  pagination={false}
                  scroll={{
                    y: 240,
                  }}
                />
              </div>
              <label className={styles.p_edit}>Họ và tên</label>
              <Select
                className={styles.seclected}
                placeholder=''
                defaultValue='Chọn nhân viên'
                optionFilterProp='children'
                value={editName}
                onChange={(value) => setEditName(value)}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'Trường GPT',
                    label: 'Trường GPT',
                  },
                  {
                    value: 'Tiến ngơ',
                    label: 'Tiến ngơ',
                  },
                ]}
              />
              <label className={styles.p_edit}>Đánh giá *</label>
              <Select
                className={styles.seclected}
                placeholder=''
                defaultValue='Chọn đánh giá '
                optionFilterProp='children'
                value={editName}
                onChange={(value) => setEditName(value)}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'Trường GPT',
                    label: 'Trường GPT',
                  },
                  {
                    value: 'Tiến ngơ',
                    label: 'Tiến ngơ',
                  },
                ]}
              />
              <label className={styles.p_edit}>Tên kế hoạch *</label>
              <Select
                className={styles.seclected}
                placeholder=''
                defaultValue='Chọn tên kế hoạch'
                optionFilterProp='children'
                value={editName}
                onChange={(value) => setEditName(value)}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'Trường GPT',
                    label: 'Trường GPT',
                  },
                  {
                    value: 'Tiến ngơ',
                    label: 'Tiến ngơ',
                  },
                ]}
              />
              <label className={styles.p_edit}>Thời gian áp dụng</label>
              <DatePicker
                formatr={dateFormat}
                className={styles.times_month}
                value={editTime}
                onChange={(date) => setEditTime(date)}
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
