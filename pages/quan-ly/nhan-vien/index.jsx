import styles from './index.module.css'
import React, { FC, use, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import _ from 'lodash'
import cookieCutter from 'cookie-cutter'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { Calendar } from 'antd'
// import { TokenForTinhLuong } from "../../api/BaseApi";
import { domain } from '../../cai-dat-luong/hoa-hong/hoahongdoanhthu/AddTable'
import jwtDecode from 'jwt-decode'

function SummaryIntel({ index, intel, color1 }) {
  return (
    <div className={styles.ift_hl_part_one}>
      <p className={styles.hl_std} style={{ color: color1 }}>
        {index}
      </p>
      <p className={styles.hl_nb}>{intel}</p>
    </div>
  )
}
function calculateSumOfKeys(array) {
  let sum = 0

  if (array.length >= 0) {
    array.map((item) => {
      sum += item?.num_to_calculate
    })
  }

  return sum
}
export default function QuanLyNhanVien({ title }) {
  const router = useRouter()
  const user_info = cookieCutter.get('userName')
  const token = cookieCutter.get('token_base365')
  // @ts-ignore
  const [apiData, setApiData] = useState([])
  const [apiRealData, setApiRealData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1)
  const [selectedYear, setSelectedYear] = useState(dayjs().year())
  const [userInfo, setUserInfo] = useState({})
  const [scrollPosition, setScrollPosition] = useState(0)

  console.log('Api RealData: ', apiRealData)
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear)
  }, [selectedMonth, selectedYear])

  useEffect(() => {
    const decoded = jwtDecode(token)?.['data']
    const idQLC = decoded?.['idQLC']
    const cp = decoded?.['com_id']

    axios
      .post(`${domain}/api/tinhluong/nhanvien/qly_ho_so_ca_nhan`, {
        ep_id: idQLC,
        cp: cp,
        token: token,
        // Add other properties you want to update
      })
      .then((response) => {
        console.log('userInfo', response.data.data)
        setUserInfo(response.data.data)
      })
      .catch((err) => {
        console.log(
          'Error ở API api/tinhluong/nhanvien/qly_ho_so_ca_nhan:',
          err
        )
      })
  }, [])
  //* Định nghĩa hàm fetchAPI data
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
        console.log('Response sau thành công là: ', response.data)
        setApiData(response.data)
        setApiRealData(response.data.data.count_real_works)
      })
      .catch((error) => {
        console.log('Error fetching data from API:', error)
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

  //* Định nghĩa hàm CellRender
  const cellRender = (value) => {
    const valueDate = value?.format('YYYY-MM-DD')
    const map_data_obj = _.groupBy(
      apiData?.data?.data_final,
      (item) =>
        item?.detail_cycle?.date &&
        dayjs(item?.detail_cycle?.date)?.format('YYYY-MM-DD')
    )

    // map lai data
    let temp = {}
    Object.keys(map_data_obj)?.forEach((key) => {
      const sorted = map_data_obj[key]?.sort((a, b) => {
        return a?.detail_cycle?.detail?.start_time -
          b?.detail_cycle?.detail?.start_time >
          0
          ? 1
          : -1
      })
      temp[key] = sorted
    })

    return (
      <div className='events-container'>
        <ListData value={temp && temp?.[valueDate]} />
      </div>
    )
  }

  const onPanelChange = (value, mode) => {
    const month = value.month() + 1
    const year = value.year()
    setSelectedMonth(month)
    setSelectedYear(year)
  }
  const headerRender = () => {
    return null // Ẩn phần header chọn ngày
  }

  const handleSeeSalary = () => {
    router.push('/quan-ly/tinh-luong')
  }
  return (
    <div className={styles.idx_ttnv}>
      <div className={styles.part_hps}>
        <div className={styles.part_ift_one}>
          <div className={styles.ift_fl}>
            <p className={styles.fl_hl}>
              Xin chào {userInfo?.info_dep_com?.user?.userName}
            </p>
            <p className={styles.fl_pr}>
              <a
                className={styles.see_table_salary}
                style={{ cursor: 'pointer' }}
                onClick={handleSeeSalary}>
                <span>
                  <img src='/tinhluong/left.png' />
                </span>
                Xem bảng lương
              </a>
            </p>
          </div>
          <div className={styles.ift_hl}>
            <SummaryIntel
              index={
                apiData?.data?.count_standard_works != []
                  ? apiData?.data?.count_standard_works
                  : 0
              }
              intel='Công chuẩn'
              color1='#4C5BD4'></SummaryIntel>
            <SummaryIntel
              index={calculateSumOfKeys(apiRealData)}
              intel='Tổng công'
              color1='#68B782'></SummaryIntel>
            <SummaryIntel
              index={apiData?.data?.count_late_early?.length}
              intel='Đi muộn'
              color1='#FFA72E'></SummaryIntel>
            <SummaryIntel
              index={apiData?.data?.get_dx_cong_tl365.length}
              intel='Công ghi nhận thêm'
              color1='#afa70f'></SummaryIntel>
          </div>
        </div>
        <div className={styles.part_prl_bg} style={{ minHeight: 'unset' }}>
          <div className={styles.prl_one}>
            <div className={styles.prl_part_one}>
              <h3 style={{ marginBottom: '20px' }}>
                Bảng công chu kỳ lương tháng {dayjs().month() + 1}
              </h3>
            </div>
          </div>
          <div className={styles.custom_calendar_container}>
            <div className={styles.prl_tow}>
              {/* noi chung ta dien lich vao  */}
              <Calendar
                headerRender={headerRender}
                cellRender={cellRender}
                onPanelChange={onPanelChange}
                locale={{
                  lang: {
                    locale: 'vi',
                  },
                }}
                // fullscreen={false}
                className={`${styles.centeredCalendar} centered-calendar`}
              />
            </div>
          </div>
          <div className={styles.thong_ke}>
            <div className={styles.tk_tong}>
              Công theo lịch: {calculateSumOfKeys(apiRealData)}
            </div>
            <div className={styles.tk_muon_som}>
              Đi muộn/Về sớm: {apiData?.data?.count_late_early?.length} ca
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
