import React, { useState, useMemo, useEffect } from 'react'
import styles from '../hoahongcanhan.module.css'
import {
  Table,
  Select,
  Modal,
  Button,
  Input,
  Form,
  Space,
  Radio,
  DatePicker,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/router'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import 'react-datepicker/dist/react-datepicker.css'
import { domain } from './AddTable'

dayjs.extend(customParseFormat)
dayjs.locale('vi')

const onFinish = (values) => {
  console.log('Received values of form:', values)
}
const Hoahongnhom = () => {
  const user_info = cookieCutter.get('userName')
  const token = cookieCutter.get('token_base365')
  const cp = cookieCutter.get('com_id')
  const ep_id = cookieCutter.get('userID')
  const role = cookieCutter.get('role')

  const YearData = [
    {
      value: dayjs().year() - 1,
      label: `${dayjs().year() - 1}`,
    },
    {
      value: dayjs().year(),
      label: `${dayjs().year()}`,
    },
    {
      value: dayjs().year() + 1,
      label: `${dayjs().year() + 1}`,
    },
  ]

  const MonthData = [
    {
      value: 1,
      label: 'Tháng 1',
    },
    {
      value: 2,
      label: 'Tháng 2',
    },
    {
      value: 3,
      label: 'Tháng 3',
    },
    {
      value: 4,
      label: 'Tháng 4',
    },
    {
      value: 5,
      label: 'Tháng 5',
    },
    {
      value: 6,
      label: 'Tháng 6',
    },
    {
      value: 7,
      label: 'Tháng 7',
    },
    {
      value: 8,
      label: 'Tháng 8',
    },
    {
      value: 9,
      label: 'Tháng 9',
    },
    {
      value: 10,
      label: 'Tháng 10',
    },
    {
      value: 11,
      label: 'Tháng 11',
    },
    {
      value: 12,
      label: 'Tháng 12',
    },
  ]

  //* useState phụ

  const [mucDoanhThu, setMucDoanhThu] = useState([])
  const [mucDoanhThuSelected, setMucDoanhThuSelected] = useState()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const [allGroup, setAllGroup] = useState([])
  console.log('allGroup', allGroup)
  const [allEmp, setAllEmp] = useState([])
  const [selectedGroup, setSelectedGroup] = useState({})
  console.log('selectedGroup', selectedGroup)
  const [selectedGroupFromOutSide, setSelectedGroupFromOutSide] =
    useState('all')

  const [selectedEmp, setSelectedEmp] = useState('all')
  const [moneyFields, setMoneyFields] = useState([])
  const [dateFields, setDateFields] = useState([])
  const [dateFieldsConverted, setDateFieldsConverted] = useState([])
  const [note, setNote] = useState('')
  const today = dayjs()
  const todayConvert = today.format('YYYY-MM-DDT00:00:00.000+00:00')
  const [roTime, setRotime] = useState()
  console.log('roTime', roTime)
  const [isInsert, setIsInsert] = useState(false)
  console.log('isInsert', isInsert)

  //* useState chính
  const [apiData, setApiData] = useState([])
  console.log('apiData', apiData)
  const handleModalCancer = () => {
    setMoneyFields([])
    setDateFields([])
    setDateFieldsConverted([])
    setIsModalOpen(false)
  }

  const handleAddField = () => {
    setMoneyFields([...moneyFields, 0])
    setDateFields([...dateFields, null])
    setDateFieldsConverted([...dateFieldsConverted, null])
  }

  const handleRemoveField = (index) => {
    const newMoneyFields = [...moneyFields]
    const newDateFields = [...dateFields]
    const newDateFieldsConverted = [...dateFieldsConverted]

    newMoneyFields.splice(index, 1)
    newDateFields.splice(index, 1)
    newDateFieldsConverted.splice(index, 1)

    setMoneyFields(newMoneyFields)
    setDateFields(newDateFields)
    setDateFieldsConverted(newDateFieldsConverted)
  }

  const handleMoneyChange = (index, value) => {
    const moneyValue = parseFloat(value)

    if (!isNaN(moneyValue)) {
      const newMoneyFields = [...moneyFields]
      newMoneyFields[index] = moneyValue
      setMoneyFields(newMoneyFields)
    }
  }

  const handleDateChange = (index, date) => {
    const newDateFields = [...dateFields]
    const newDateFieldsConverted = [...dateFieldsConverted]
    console.log(date)
    newDateFields[index] = date
    // Convert the selected date to a Unix timestamp (in seconds)
    newDateFieldsConverted[index] = date ? date : null

    setDateFields(newDateFields)
    setDateFieldsConverted(newDateFieldsConverted)
  }
  // console.log("allGroup", allGroup);
  // console.log("selectedEmp", selectedEmp);
  // console.log("allEmp", allEmp);
  // console.log("selectedEmp", selectedEmp);
  // console.log("roTime", roTime);

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

  const showModal = () => {
    setIsInsert(true)
    setIsModalOpen(true)
  }

  //chỉnh sửa
  const showModalEditConfirm = (key) => {
    // console.log('Edit key:', key)
    // setIsModalOpen(true)
    // // setEditName(tables[key]?.incomeType)
    // setRotime(key?.ro_time)
    // setEditMoney(key?.ro_price)
    // setEditNote(key?.editNode)
  }

  const handleOk = () => {
    if (isInsert) {
      axios
        .post(`${domain}/api/tinhluong/congty/insert_tb_rose_group`, {
          ro_id_group: selectedGroup,
          ro_id_com: Number(cp),
          ro_id_lr: 2,
          ro_time: convertToUTC0(`${roTime}`),
          ro_note: note,
          ro_price: sum,
          dt_money: JSON.stringify(moneyFields),
          dt_time: JSON.stringify(dateFieldsConverted),
          token: token,
          ro_id_tl: mucDoanhThuSelected,
        })
        .then((res) => {
          alert('Thêm mới thành công')
          // console.log("Date from API : ", ro_time);
        })
        .catch((err) => {
          console.log('Err ở API tinhluong/congty/insert_rose_dt_ca_nhan', err)

          alert('Thêm hoa hồng thất bại')
        })
    }
    setIsInsert(false)
  }

  const columns = [
    {
      title: 'Nhóm nhân viên',

      render: (record) => (
        <div>
          <p className={styles.p_name}>{record?.ListGroup[0]?.lgr_name}</p>
        </div>
      ),
    },
    {
      title: 'Chu kỳ',

      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_time}</p>
        </div>
      ),
    },
    {
      title: 'Loại hoa hồng',

      render: (record) => (
        <div>
          <p className={styles.p_red}>Hoa hồng doanh thu</p>
        </div>
      ),
    },
    {
      title: 'Doanh thu',

      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_price}</p>
        </div>
      ),
    },
    {
      title: 'Hoa hồng(%)',
      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_phan_tram}</p>
        </div>
      ),
    },
    {
      title: 'Ghi chú',
      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_note}</p>
        </div>
      ),
    },
    {
      title: '',
      render: (record) => (
        <button
          className={styles.button_edit}
          onClick={() => showModalEditConfirm(record)}>
          <EditOutlined />
        </button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',

      render: () => (
        <button className={styles.button_edit}>
          <DeleteOutlined />
        </button>
      ),
    },
  ]
  // table checkbox
  const columnGroup = [
    {
      title: '',
      render: (record) => (
        <div className={styles.render}>
          <div>
            <Image
              alt='/'
              src={'/avt_365.png'}
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div>
            <p>{record?.lgr_name}</p>
            <p>({record?.detail?.length} người)</p>
          </div>
        </div>
      ),
    },
  ]

  const [selectionType, setSelectionType] = useState('radio')
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setSelectedGroup(selectedRowKeys[0])
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  }

  //*function phụ
  const sum = moneyFields.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)

  function convertToUTC0(indochinaTimeStr) {
    // Create a Date object with the provided Indochina Time
    const indochinaTime = new Date(indochinaTimeStr)

    // Get the day, month, and year components
    const day = indochinaTime.getDate()
    const month = indochinaTime.getMonth()
    const year = indochinaTime.getFullYear()

    // Create a new Date object with the same date components but set the time to midnight (UTC+0)
    const utc0Time = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))

    // Convert the date to ISO 8601 format and return it
    const isoString = utc0Time.toISOString()

    return isoString
  }

  //* useEffect phụ
  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/takedata_group_com`, {
        lgr_id_com: cp,
        token: token,
      })
      .then((res) => {
        setAllGroup(res.data.listGroup)
      })
      .catch((err) => {
        console.log('Lỗi ở API api/tinhluong/congty/takedata_group_com', err)
      })
  }, [])

  useEffect(() => {
    const getThietLapCom = async () => {
      axios
        .post(`${domain}/api/tinhluong/congty/take_thiet_lap_com`, {
          tl_id_com: cp,
          token: token,
        })
        .then((res) => {
          let mapData = res.data.listThietLap
          const filteredData = mapData.filter((obj) => obj?.tl_id_rose === 2)
          setMucDoanhThu(filteredData)
        })
        .catch((err) => {
          console.log('Erro ở API api/tinhluong/congty/take_thiet_lap_com', err)
        })
    }

    getThietLapCom()
  }, [isInsert, selectedGroup])

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

  //* useEffect Chính
  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_hoa_hong_dt_nhom`, {
        start_date:
          selectedMonth > 9
            ? `${selectedYear}-${selectedYear}-01T00:00:00.000+00:00`
            : `${selectedYear}-0${selectedMonth}-01T00:00:00.000+00:00`,
        end_date:
          selectedMonth == 12
            ? `${selectedYear + 1}-01-01T00:00:00.000+00:00`
            : selectedMonth > 8
            ? `${selectedYear}-${selectedMonth + 1}-01T00:00:00.000+00:00`
            : `${selectedYear}-0${selectedMonth + 1}-01T00:00:00.000+00:00`,
        ro_id_com: cp,
        token: token,
      })
      .then((res) => {
        let mapData = res.data.rose_user
        if (selectedGroupFromOutSide != 'all') {
          mapData = mapData.filter(
            (item) => item?.lgr_id == selectedGroupFromOutSide
          )
        }

        setApiData(mapData)
      })
      .catch((err) => {
        console.log('Lỗi ở API api/tinhluong/congty/take_hoa_hong_dt_nhom', err)
      })
  }, [selectedMonth, selectedYear, isInsert])

  const formData = {
    lgr_id: selectedGroup,
    ro_id_com: cp,
    ro_id_lr: 2,
    // ro_time: convertToUTC0(`${roTime}`),
    ro_note: note,
    ro_price: sum,
    dt_money: JSON.stringify(moneyFields),
    dt_time: JSON.stringify(dateFieldsConverted),
    token: token,
    ro_id_tl: mucDoanhThuSelected,
  }
  console.log('formData', formData)
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>
              Danh sách nhóm nhân viên hoa hồng doanh thu
            </h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhóm nhân viên hoa hồng doanh thu
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
            <SearchOutlined className={styles['search-icon']} />
            <Select
              showSearch
              placeholder=''
              defaultValue='Tất cả các nhóm'
              optionFilterProp='children'
              onChange={(e) => setSelectedGroupFromOutSide(e)}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }>
              {allGroup.map((item, index) => (
                <Option value={item?.lgr_id}>{item?.lgr_name}</Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={styles.table_content}>
          <Table
            columns={columns}
            scroll={{
              x: 1000,
            }}
            dataSource={apiData}
            className={`table_add ${styles.table_add}`}
            pagination={false}
          />
        </div>
      </div>
      <div className={styles.content_bot}>
        <div className={styles.video}>
          <iframe
            className='video_hd'
            style={{ borderRadius: 15 }}
            width='100%'
            height={430}
            src='https://www.youtube.com/embed/WQaU3n2wYdM'
            title='YouTube video player'
            frameBorder={0}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen=''
          />
        </div>
      </div>

      <div className='modalRecipe'>
        <Modal
          width={600}
          className={`modal_edit ${styles.modal_edit}`}
          open={isModalOpen}
          onCancel={handleModalCancer}
          footer={null}>
          <div className={styles.modalRecipe_body} style={{ padding: '10px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
              Thêm mới hoa nhóm
            </p>
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
                  dataSource={allGroup}
                  pagination={false}
                  scroll={{
                    y: 240,
                  }}
                  rowKey='lgr_id'
                />
              </div>
              <div className={styles.flex}>
                <div className={styles.flex_input}>
                  <label className={styles.p_edit}>Chu kỳ(tháng) áp dụng</label>

                  <DatePicker
                    picker='month'
                    className={`${styles.times_month} customDatePicker`}
                    selected={roTime}
                    value={roTime}
                    onChange={(date) => setRotime(date)}
                    showMonthYearPicker
                  />
                </div>
              </div>

              <form onSubmit={onFinish}>
                {moneyFields.map((field, index) => (
                  <div key={index}>
                    <div className={styles.flex}>
                      <div className={styles.flex_input}>
                        <label
                          className={styles.p_edit}
                          style={{ fontSize: '16px' }}>
                          Doanh thu theo thời điểm
                        </label>
                        <input
                          type='number'
                          className={styles.input_ant}
                          placeholder='Doanh thu(dạng số)'
                          value={moneyFields[index]}
                          onChange={(e) =>
                            handleMoneyChange(index, e.target.value)
                          }
                        />
                      </div>
                      <div className={styles.flex_input_ant}>
                        <DatePicker
                          className={`${styles.times_month} customDatePicker`}
                          selected={dateFields[index]}
                          value={dateFields[index] ? dateFields[index] : null}
                          onChange={(date) => handleDateChange(index, date)}
                        />
                      </div>
                    </div>
                    <div></div>
                    {moneyFields.length > 1 && (
                      <button
                        type='button'
                        onClick={() => handleRemoveField(index)}
                        className={styles.remove1}>
                        Xóa doanh thu
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type='button'
                  onClick={handleAddField}
                  className={styles.add}>
                  Thêm doanh thu
                </button>
              </form>
              <div className={styles.flex_top}>
                <div className={styles.flex_input}>
                  <label className={styles.p_edit}>Tổng doanh thu *</label>

                  <Input value={sum} disabled />
                </div>
                <div className={styles.flex_input}>
                  <label className={styles.p_edit}>Mức doanh thu *</label>
                  <Select
                    className={styles.seclected}
                    placeholder=''
                    defaultValue='Chọn doanh thu'
                    optionFilterProp='children'
                    value={mucDoanhThuSelected}
                    onChange={(e) => setMucDoanhThuSelected(e)}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    {mucDoanhThu.map((item) => (
                      <Option value={item?.tl_id}>{item?.tl_name}</Option>
                    ))}
                  </Select>
                </div>
              </div>

              <label className={styles.p_edit}>Ghi chú</label>
              <textarea
                type='text'
                rows={3}
                className={styles.textarea}
                placeholder='Thêm ghi chú'
                value={note}
                onChange={(e) => {
                  setNote(e.target.value)
                }}
              />

              <Button
                className={`btn_recipe ${styles.btn_recipe}`}
                type='primary'
                onClick={handleOk}>
                <p>Thêm hoa hồng</p>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Hoahongnhom
