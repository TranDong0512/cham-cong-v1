import React, { useEffect, useState } from 'react'
import styles from '../hoahongcanhan.module.css'
import { DatePicker, Table, Select } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/router'
import axios from 'axios'
import { domain } from './AddTable'
import cookieCutter from 'cookie-cutter'
import {
  MonthData,
  YearData,
} from '../../../../components/tinh-luong/components/small-component/Month_and_Year'

dayjs.extend(customParseFormat)
dayjs.locale('vi')
const { RangePicker } = DatePicker

const Tonghoahong = () => {
  const user_info = cookieCutter.get('userName')
  const token = cookieCutter.get('token_base365')
  const cp = cookieCutter.get('com_id')
  const ep_id = cookieCutter.get('userID')

  //*useState phụ

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [allEmp, setAllEmp] = useState([])
  const [selectedEmp, setSelectedEmp] = useState('all')

  //* useState chính
  const [apiData, setApiData] = useState([])
  console.log('apiData', apiData)

  const router = useRouter()

  const columns = [
    {
      title: 'Họ và tên',

      render: (record) => (
        <div>
          <p className={styles.p_name}>{record?.detail?.userName}</p>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',

      render: (record) => (
        <div>
          <p className={styles.p_red}>{record?.ro_price}</p>
        </div>
      ),
    },
  ]

  //*useEffect phụ
  useEffect(() => {
    axios
      .post(
        `${domain}/api/qlc/managerUser/listAll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace 'your-token' with your actual authorization token
          },
        }
      )
      .then((res) => {
        setAllEmp(res?.data?.data?.items)
      })
      .catch((err) => {
        console.log('Error ở API api/qlc/managerUser/listAll ', err)
      })
  }, [])

  //*useEffect chính
  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_hoa_hong_dt_ca_nhan`, {
        ro_id_com: cp,
        start_date:
          selectedMonth > 9
            ? `${selectedYear}-${selectedMonth}-01T00:00:00.000+00:00`
            : `${selectedYear}-0${selectedMonth}-01T00:00:00.000+00:00`,
        end_date:
          selectedMonth == 12
            ? `${selectedYear + 1}-01-01T00:00:00.000+00:00`
            : selectedMonth > 8
            ? `${selectedYear}-${selectedMonth + 1}-01T00:00:00.000+00:00`
            : `${selectedYear}-0${selectedMonth + 1}-01T00:00:00.000+00:00`,
        token: token,
      })
      .then((res) => {
        let mapData = res.data.data
        if (selectedEmp != 'all') {
          mapData = mapData.filter((item) => item?.ro_id_user == selectedEmp)
        }
        setApiData(mapData)
      })
      .catch((err) => {
        setApiData([])
        console.log(
          'Err ở API api/tinhluong/congty/take_hoa_hong_dt_ca_nhan',
          err
        )
      })
  }, [selectedMonth, selectedYear, selectedEmp])
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>Tổng hoa hồng doanh thu</h3>
            <p className={styles.p_style}>
              Quản lý theo dõi tổng hoa hồng doanh thu
            </p>
          </div>
          <div>
            <div className={styles.modal_delete_body}></div>
          </div>
        </div>
        <div className={styles.select_time}>
          <div>
            <Select
              className={styles.selection}
              showSearch
              defaultValue={`Tháng ${selectedMonth}`}
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              onChange={(e) => setSelectedMonth(e)}>
              {MonthData.map((item, index) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              className={styles.selection}
              showSearch
              defaultValue={`${selectedYear}`}
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              onChange={(e) => setSelectedYear(e)}>
              {YearData.map((item, index) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <SearchOutlined className={styles['search-icon']} />
            <Select
              showSearch
              placeholder=''
              defaultValue='Nhập tên cần tìm'
              optionFilterProp='children'
              onChange={(e) => setSelectedEmp(e)}
              value={selectedEmp}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }>
              <Option value='all'>Tất cả nhân viên</Option>
              {allEmp.map((item) => (
                <Option value={item?.ep_id}>{item?.ep_name}</Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={styles.table_content}>
          <Table
            columns={columns}
            dataSource={apiData}
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
