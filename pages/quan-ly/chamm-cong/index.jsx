import React, { useEffect, useState } from 'react'
import { Calendar } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import styles from './App.module.css'
import _ from 'lodash'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import { domain } from '../../cai-dat-luong/hoa-hong/hoahongdoanhthu/AddTable'
import jwtDecode from 'jwt-decode'
dayjs.locale('vi')

const App = () => {
  const [apiData, setApiData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1)
  const [selectedYear, setSelectedYear] = useState(dayjs().year())

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
      .post(` ${domain}/api/tinhluong/nhanvien/qly_ttnv`, {
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
  const countTitleRealWork = apiData?.data?.count_real_works?.length || 0
  const countTitleLateEarly = apiData?.data?.count_late_early?.length || 0
  const ListData = ({ value }) => {
    return (
      <ul className='events'>
        {value &&
          value?.map((item) => (
            <li
              key={item.content}
              className={styles.border_list}
              style={{
                background: (() => {
                  switch (item?.type) {
                    case 1:
                      return '#D0EAE7' // Màu nền cho ca hoàn thành
                    case 2:
                      return '#FEE5E5' //Màu nền cho ca chưa hoàn thành
                    case 3:
                      return '#FEE5E5' // Màu nền cho ca muộn
                    case 4:
                      return '#FFF3EB' // Màu nền cho ca nghỉ
                  }
                })(),
              }}>
              {item.type === 1 && (
                <CheckCircleOutlined style={{ color: 'green' }} />
              )}
              {(item.type === 2 || item.type === 4) && (
                <CloseCircleOutlined style={{ color: 'red' }} />
              )}
              {item.type === 3 && (
                <ClockCircleOutlined style={{ color: 'orange' }} />
              )}
              <span className={styles.span_abc}>{item.content}</span>
            </li>
          ))}
      </ul>
    )
  }

  const cellRender = (value) => {
    const valueDate = value?.format('YYYY-MM-DD')
    const map_data_obj = _.groupBy(
      apiData?.data?.data_final,
      (item) =>
        item?.detail_cycle?.date &&
        dayjs(item?.detail_cycle?.date)?.format('YYYY-MM-DD')
    )

    return (
      <div className='events-container'>
        <ListData value={map_data_obj && map_data_obj?.[valueDate]} />
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
        <h2>Bảng Chu Kì Công </h2>
        <div className={styles.calendar}>
          <Calendar
            cellRender={cellRender}
            onPanelChange={onPanelChange}
            locale={{
              lang: {
                locale: 'vi',
              },
            }}
            className={`${styles.centeredCalendar} centered-calendar`}
          />
          <div className={styles.div}>
            <span style={{ marginRight: '50px' }}>
              Công Theo Lịch: {countTitleRealWork}
            </span>
            <span>Đi muộn/Về sớm: {countTitleLateEarly}</span>
          </div>
        </div>
      </table>
    </div>
  )
}

export default App
