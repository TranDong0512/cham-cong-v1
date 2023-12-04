import React, { useState } from 'react'
import styles from '../hoahongcanhan.module.css'
import { DatePicker, Table, Select } from 'antd'
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

const Tonghoahong = () => {
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

  const router = useRouter()

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'incomeType',
      render: (editName) => (
        <div>
          <p className={styles.p_name}>{editName}</p>
        </div>
      ),
    },
    {
      title: 'Chu kỳ',
      dataIndex: 'editMoney',
      render: (editMoney) => (
        <div>
          <p className={styles.p_red}>{editMoney}</p>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'editMoney',
      render: (editMoney) => (
        <div>
          <p className={styles.p_red}>{editMoney}</p>
        </div>
      ),
    },
  ]
  const onChange = (value) => {
    console.log(`selected ${value}`)
  }
  const onSearch = (value) => {
    console.log('search:', value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>Tổng hoa hồng lợi nhuận</h3>
            <p className={styles.p_style}>
              Quản lý theo dõi tổng hoa hồng lợi nhuận
            </p>
          </div>
          <div>
            <div className={styles.modal_delete_body}></div>
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
            className={`table_add ${styles.table_add}`}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Tonghoahong
