import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import {
  MonthData,
  YearData,
} from '../../../components/tinh-luong/components/Data/SelectionData'
import {
  DatePicker,
  Table,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Button,
  Popover,
} from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import * as XLSX from 'xlsx'
import cookieCutter from 'cookie-cutter'
import axios from 'axios'
import { domain } from '../../cai-dat-luong/hoa-hong/hoahongdoanhthu/AddTable'
import jwtDecode from 'jwt-decode'
dayjs.extend(customParseFormat)
dayjs.locale('vi')
const { RangePicker } = DatePicker
const dateFormat = 'DD/MM/YYYY'

const App = () => {
  function roundToInteger(number) {
    if (typeof number !== 'number' || isNaN(number)) {
      return 'Chưa cập nhật'
    }
    let number1 = Math.round(number)
    return number1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function convertDateFormatforStartDate(inputDate) {
    const dateParts = inputDate.split('-').map(Number)
    let year = dateParts[0]
    let month = dateParts[1]

    const formattedMonth = month < 10 ? `0${month}` : month
    return `${year}-${formattedMonth}`
  }

  function convertDateFormatforEndDate(inputDate) {
    const dateParts = inputDate.split('-').map(Number)
    let year = dateParts[0]
    let month = dateParts[1]

    if (month === 12) {
      month = 1
      year++
    } else {
      month++
    }

    const formattedMonth = month < 10 ? `0${month}` : month
    return `${year}-${formattedMonth}`
  }

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  //render user
  const [apiDataUser, setApiDataUser] = useState([])
  useEffect(() => {
    fetchApiDataUser()
  }, [])
  const fetchApiDataUser = () => {
    const decoded = jwtDecode(token)?.['data']
    const idQLC = decoded?.['idQLC']
    const cp = decoded?.['com_id']

    axios
      .post(`${domain}/api/tinhluong/nhanvien/qly_ho_so_ca_nhan`, {
        token: token,
        cp: cp,
        ep_id: idQLC,
      })
      .then((response) => {
        setApiDataUser(response.data.data)

        console.log(response.data.data)
      })
      .catch((error) => {
        console.log('Error fetching data from API:', error)
      })
  }
  //render data
  const [form] = Form.useForm()
  const [apiData, setApiData] = useState([])
  const [placement, SetPlacement] = useState('topLeft')
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1)
  const [selectedYear, setSelectedYear] = useState(dayjs().year())

  // const [selectedId,setSelectedID]=useState()
  const user_info = cookieCutter.get('userName')
  const token = cookieCutter.get('token_base365')
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear)
  }, [selectedMonth, selectedYear])
  const fetchApiData = (month, year) => {
    const decoded = jwtDecode(token)?.['data']
    const idQLC = decoded?.['idQLC']
    const cp = decoded?.['com_id']

    axios
      .post(`${domain}/api/tinhluong/nhanvien/show_payroll_user`, {
        token: token,
        cp: cp,
        ep_id: idQLC,
        month: month,
        year: year,
        start_date: `${convertDateFormatforStartDate(
          `${year}-${month}`
        )}-01T00:00:00.000+00:00`,
        end_date: `${convertDateFormatforEndDate(
          `${year}-${month}`
        )}-01T00:00:00.000+00:00`,
      })
      .then((response) => {
        setApiData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error)
      })
  }

  //* Hiển thị bảng

  const TableContent = ({ name }) => {
    // Customize the table content based on the row's data and name
    // const tableData = apiData.filter(item => item.name === name);

    let dataSource = []

    let columns = []
    if (name == 'Đi muộn/ về sớm phạt tiền') {
      dataSource = apiData?.data?.data_late_early
      columns = [
        {
          title: 'Tiền',
          render: (record) => {
            return <div>{record?.money}</div>
          },
        },
        {
          title: 'Ngày phạt',
          render: (record) => {
            return <div>{formatDateToDDMMYYYY(record?.ts_date)}</div>
          },
        },
        {
          title: 'Lý do',
          render: (record) => {
            if (record?.late !== 0) return <div>Đi muộn</div>
            if (record?.late == 0) return <div>Về sớm</div>
          },
        },
      ]
      console.log(
        'Đi muộn/ về sớm phạt tiền: ',
        apiData?.data?.data_late_early[0]?.ts_date
      )
    }
    if (name == 'Đi muộn/ về sớm phạt công') {
      dataSource = apiData?.data?.data_late_early_cong
      columns = [
        {
          title: 'Công',
          render: (record) => {
            return <div>{record?.money}</div>
          },
        },
        {
          title: 'Ngày phạt',
          render: (record) => {
            return <div>{formatDateToDDMMYYYY(record?.ts_date)}</div>
          },
        },
        {
          title: 'Lý do',
          render: (record) => {
            if (record?.late !== 0) return <div>Đi muộn</div>
            if (record?.late == 0) return <div>Về sớm</div>
          },
        },
      ]
    }
    if (name == 'Phạt nghỉ sai quy định') {
      dataSource = apiData?.data?.data_ko_cc_detail
      columns = [
        {
          title: 'Ngày phạt',
          render: (record) => {
            return <div>{formatDateToDDMMYYYY(record?.date)}</div>
          },
        },
        {
          title: 'Lý do',
          render: (record) => {
            ;<div>Không chấm công</div>
          },
        },
      ]
    }
    return (
      <Table
        className={`customTable`}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
    )
  }

  //*Hiển thị nút chi tiết
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null)
  console.log('openPopoverIndex', openPopoverIndex)
  const handlePopoverOpen = (index) => {
    console.log('Đã chạy vào hàm handlePopoverOpen')
    if (openPopoverIndex === index) {
      setOpenPopoverIndex(null) // Close the popover if it's already open
    } else {
      setOpenPopoverIndex(index) // Open the popover of the clicked row
    }
  }

  const dataTable = [
    {
      id: '1',
      name: 'Lương cơ bản',
      parameter: `${roundToInteger(apiData?.data?.luong_co_ban)}`,
      unit: 'VNĐ',
    },
    {
      id: '2',
      name: 'Hợp đồng',
      parameter: `${apiData?.data?.phan_tram_hop_dong}`,
      unit: '%',
    },
    {
      id: '3',
      name: 'Công chuẩn',
      parameter: `${apiData?.data?.cong_chuan}`,
      unit: 'Công',
    },
    {
      id: '4',
      name: 'Công thực',
      parameter: `${apiData?.data?.cong_thuc}`,
      unit: 'Công',
    },
    {
      id: '5',
      name: 'Công sau phạt',
      parameter: `${apiData?.data?.cong_sau_phat}`,
      unit: 'Công',
    },
    {
      id: '6',
      name: 'Công theo tiền (ca tính tiền)',
      parameter: `${apiData?.data?.cong_theo_tien}`,
      unit: 'VNĐ',
    },
    {
      id: '7',
      name: 'Công ghi nhận',
      parameter: `${apiData?.data?.cong_ghi_nhan}`,
      unit: 'Công',
    },
    {
      id: '8',
      name: 'Công nghỉ phép',
      parameter: `${apiData?.data?.cong_nghi_phep}`,
      unit: 'Công',
    },
    {
      id: '9',
      name: 'Tổng công nhận',
      parameter: `${apiData?.data?.tong_cong_nhan}`,
      unit: 'Công',
    },
    {
      id: '10',
      name: 'Lương thực',
      parameter: `${roundToInteger(apiData?.data?.luong_thuc)}`,
      unit: 'VNĐ',
    },
    {
      id: '11',
      name: 'Lương sau phạt',
      // parameter: `${apiData?.data?.luong_sau_phat
      //   .toString()
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      parameter: roundToInteger(apiData?.data?.luong_sau_phat),
      unit: 'VNĐ',
    },
    {
      id: '12',
      name: 'Lương bảo hiểm',
      parameter: `${roundToInteger(apiData?.data?.luong_bao_hiem)}`,
      unit: 'VNĐ',
    },
    {
      id: '13',
      name: 'Đi muộn/ về sớm phạt tiền',
      parameter: `${roundToInteger(apiData?.data?.tien_phat_muon)}`,
      unit: 'VNĐ',
    },
    {
      id: '14',
      name: 'Đi muộn/ về sớm phạt công',
      parameter: `${apiData?.data?.cong_phat_di_muon_ve_som}`,
      unit: 'Công',
    },
    {
      id: '15',
      name: 'Hoa hồng',
      parameter: `${roundToInteger(apiData?.data?.tong_hoa_hong)}`,
      unit: 'VNĐ',
    },
    {
      id: '16',
      name: 'Tiền lương theo giờ',
      parameter: `${roundToInteger(apiData?.data?.tongTienTheoGio)}`,
      unit: 'VNĐ',
    },
    {
      id: '17',
      name: 'Tiền đã tạm ứng',
      parameter: `${roundToInteger(apiData?.data?.tien_tam_ung)}`,
      unit: 'VNĐ',
    },
    {
      id: '18',
      name: 'Thưởng',
      parameter: `${roundToInteger(apiData?.data?.thuong)}`,
      unit: 'VNĐ',
    },
    {
      id: '19',
      name: 'Thưởng nghỉ lễ',
      parameter: `${roundToInteger(apiData?.data?.luong_nghi_le)}`,
      unit: 'VNĐ',
    },
    {
      id: '20',
      name: 'Phạt',
      parameter: `${roundToInteger(apiData?.data?.phat)}`,
      unit: 'VNĐ',
    },
    {
      id: '21',
      name: 'Phạt nghỉ ngày không được phép nghỉ',
      parameter: `${roundToInteger(apiData?.data?.tien_phat_nghi_khong_phep)}`,
      unit: 'VNĐ',
    },
    {
      id: '22',
      name: 'Phạt nghỉ sai quy định',
      parameter: `${roundToInteger(apiData?.data?.phat_nghi_sai_quy_dinh)}`,
      unit: 'VNĐ',
    },
    {
      id: '23',
      name: 'Phúc lợi',
      parameter: `${roundToInteger(apiData?.data?.tien_phuc_loi)}`,
      unit: 'VNĐ',
    },
    {
      id: '24',
      name: 'Phụ cấp',
      parameter: `${roundToInteger(apiData?.data?.tien_phu_cap)}`,
      unit: 'VNĐ',
    },
    {
      id: '25',
      name: 'Phụ cấp theo ca',
      parameter: `${roundToInteger(apiData?.data?.phu_cap_theo_ca)}`,
      unit: 'VNĐ',
    },
    {
      id: '26',
      name: 'Bảo hiểm',
      parameter: `${roundToInteger(apiData?.data?.tong_bao_hiem)}`,
      unit: 'VNĐ',
    },
    {
      id: '27',
      name: 'Khoản tiền khác',
      parameter: `${roundToInteger(apiData?.data?.tien_khac)}`,
      unit: 'VNĐ',
    },
    {
      id: '28',
      name: 'Tổng lương',
      parameter: `${roundToInteger(apiData?.data?.tong_luong)}`,
      unit: 'VNĐ',
    },
    {
      id: '29',
      name: 'Thuế',
      parameter: `${roundToInteger(apiData?.data?.thue)}`,
      unit: 'VNĐ',
    },
    {
      id: '30',
      name: 'Tổng lương thực nhận',
      // parameter: `${apiData?.data?.tien_thuc_nhan
      //   .toString()
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      parameter: `${roundToInteger(apiData?.data?.tien_thuc_nhan)}`,
      unit: 'VNĐ',
    },
    {
      id: '31',
      name: 'Tổng lương đã trả',
      parameter: `${roundToInteger(apiData?.data?.luong_da_tra)}`,
      unit: 'VNĐ',
    },
  ]
  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <p className={styles.p_style}>{id}</p>,
    },
    {
      title: 'Các khoản lương',
      dataIndex: 'name',
      key: 'name',
      render: (name, record, index) => (
        <div className={styles.nameColumn}>
          {console.log(`12<${record?.id} < 27`, 12 < record?.id < 27)}
          <p className={styles.p_style}>{name}</p>
          {12 < record.id && record.id < 27 && record.parameter !== '0' && (
            <Popover
              className={`customPopOver`}
              content={<TableContent name={name} apiData={apiData} />}
              trigger='click'
              open={openPopoverIndex === index} // Use the state variable to control the open prop
            >
              <Button
                onClick={() => handlePopoverOpen(index)}
                // type='primary'
                className={`customButtonatPopOver ${styles.customButton}`}>
                Chi tiết
              </Button>
            </Popover>
          )}
        </div>
      ),
    },
    {
      title: 'Thông số lương',
      dataIndex: 'parameter',
      key: 'parameter',
      render: (parameter) => <p className={styles.p_red}>{parameter}</p>,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      render: (unit) => <p className={styles.p_style}>{unit}</p>,
    },
  ]

  const onFinish = (val) => {
    setSelectedYear(val?.year)
    setSelectedMonth(val?.month)
  }
  const dataArr = dataTable.map((obj) => [
    obj.id,
    obj.name,
    obj.parameter,
    obj.unit,
  ])
  const handleExportExcel = ({ dataTable }) => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(dataArr)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bảng lương')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const excelData = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    })
    const excelUrl = URL.createObjectURL(excelData)
    const link = document.createElement('a')
    link.href = excelUrl
    link.download = 'bang_luong.xlsx'
    link.click()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Bảng lương chu kỳ</h3>
          <span className={styles.span}>
            {apiDataUser?.info_dep_com?.user?.userName} - ID{' '}
            {apiDataUser?.info_dep_com?.user?.idQLC}
          </span>
          <p className={styles.p}>
            {apiDataUser?.info_dep_com?.department?.dep_name}
          </p>
        </div>
        <div className={styles.select_time}>
          <Form
            onFinish={onFinish}
            className={styles.formContainer}
            initialValues={{ year: selectedYear, month: selectedMonth }}>
            <Row>
              <Form.Item className={styles.formItem} name={'fromTo'}>
                <RangePicker
                  placement={placement}
                  format={dateFormat}
                  locale={{
                    lang: {
                      locale: 'vi',
                      rangePlaceholder: ['Từ ngày', 'Đến ngày'],
                    },
                  }}
                />
              </Form.Item>

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
                  defaultValue={{
                    label: `${selectedYear}`,
                    value: selectedYear,
                  }}
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  options={YearData}
                />
              </Form.Item>

              <button type='submit' className={styles.button}>
                Thống kê
              </button>
            </Row>
          </Form>
        </div>
        <div className={styles.table}>
          <Table
            className={`customTable1 ${styles.table}`}
            scroll={{
              x: 1000,
            }}
            columns={columns}
            dataSource={dataTable}
            pagination={false}
          />
          <p className={styles.p_money}>
            Tổng lương thực nhận:{' '}
            {roundToInteger(apiData?.data?.tien_thuc_nhan)} (VNĐ)
          </p>
        </div>
        <button className={styles.export} onClick={handleExportExcel}>
          Xuất công
        </button>
      </div>
    </div>
  )
}

export default App
