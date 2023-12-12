import React, { useEffect, useState } from 'react'
import { Calendar } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import styles from './index.module.css'
import axios from 'axios'
import _ from 'lodash'
import cookieCutter from 'cookie-cutter'
import { domain } from '../../cai-dat-luong/hoa-hong/hoahongdoanhthu/AddTable'
import jwtDecode from 'jwt-decode'

dayjs.locale('vi')

const List = () => {
  const [apiData, setApiData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1)
  const [selectedYear, setSelectedYear] = useState(dayjs().year())
  const [user, setUser] = useState([])
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear)
  }, [selectedMonth, selectedYear])

  const token = cookieCutter.get('token_base365')
  const fetchApiData = (month, year) => {
    const start_date = `${year}-${String(month).padStart(
      2,
      '0'
    )}-01T00:00:00.000+00:00`
    const end_date = dayjs(start_date)
      .add(1, 'month')
      .format('YYYY-MM-01T00:00:00.000+00:00')

    const decoded = jwtDecode(token)?.['data']
    const idQLC = decoded?.['idQLC']
    const cp = decoded?.['com_id']

    axios
      .post(`${domain}/api/tinhluong/nhanvien/qly_ttnv`, {
        token: token,
        cp: cp,
        year: year,
        month: month,
        ep_id: idQLC,
        start_date: start_date,
        end_date: end_date,
      })
      .then((response) => {
        setApiData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error)
      })
  }

  const fetchApiUser = () => {
    const decoded = jwtDecode(token)?.['data']
    const idQLC = decoded?.['idQLC']
    const cp = decoded?.['com_id']

    axios
      .post(`${domain}/api/tinhluong/nhanvien/qly_ho_so_ca_nhan`, {
        token: token,
        ep_id: idQLC,
        cp: cp,
      })
      .then((response) => {
        setUser(response.data?.data?.info_dep_com?.user)
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error)
      })
  }

  useEffect(() => {
    fetchApiUser()
  }, [])
  const DateCellRender = ({ value }) => {

    return (
      <ul className='events'>
        {value &&
          value?.map((item) => (
            <li
              key={item?.detail?.shift_name}
              className={styles.border_list}
              style={{ background: '#D0EAE7' }}>
              {item.type === 'success'}
              <span className={styles.span_abc}>{item.detail?.shift_name}</span>
            </li>
          ))}
      </ul>
    )
  }
  const cellRender = (value) => {
    const valueDate = value?.format('YYYY-MM-DD')
    const map_data_obj = _.groupBy(
      apiData?.data?.list_cycle,
      (item) => item?.date && dayjs(item?.date)?.format('YYYY-MM-DD')
    )

    return (
      <div className='events-container'>
        <DateCellRender value={map_data_obj && map_data_obj?.[valueDate]} />
      </div>
    )
  }
  const onPanelChange = (value, mode) => {
    const selectedMonth = value.month() + 1 
    const selectedYear = value.year()
    setSelectedMonth(selectedMonth)
    setSelectedYear(selectedYear) 
  }

  return (
    <div style={{ flex: 1 }}>
      <table className={styles.table}>
        <div>
          <div>
            <h3>
              Lịch làm việc tháng
              <a
                className={styles.btn_cv}
                href='/van-thu-luu-tru/trang-quan-ly-de-xuat/de-xuat-lich-lam-viec'>
                Đề xuất lịch làm việc
              </a>
            </h3>
            <p className={styles.span_name}>Chi tiết lịch làm việc</p>
          </div>
          <div className={styles.ctn}>
            <p>
              Họ và tên:
              <span style={{ color: 'blue' }}> {user?.userName}</span>
            </p>
            <p>
              <span>ID: {user?.idQLC}</span>
            </p>
          </div>
        </div>
        <div className={styles.calendar}>
          <Calendar
            cellRender={cellRender}
            onPanelChange={onPanelChange}
            locale={{
              lang: {
                locale: 'vi',
              },
            }}
            mode='month'
            className={`${styles.centeredCalendar} centered-calendar`}
          />
        </div>
      </table>
    </div>
  )
}

export default List
