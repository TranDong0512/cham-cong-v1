import React, { useState, useMemo, useEffect } from 'react'
import styles from '../hoahongcanhan.module.css'
import {
  DatePicker,
  Table,
  Select,
  Modal,
  Button,
  Input,
  Form,
  Space,
  Row,
  Col,
  InputNumber,
} from 'antd'
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import * as XLSX from 'xlsx'
import { POST, POST_TL, getCompIdCS } from '../../../api/BaseApi'
import { getEmps } from '../hoahongtien/Hoahongcanhan'
import moment from 'moment'
import _ from 'lodash'

dayjs.extend(customParseFormat)
dayjs.locale('vi')
const { RangePicker } = DatePicker

const Hoahongcanhan = () => {

  
  const onSearch = (value) => {
    console.log('search:', value)
  }

  //modalthêm mới
  const [tables, setTables] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editName, setEditName] = useState()
  const [editTime, setEditTime] = useState(null)
  const [editMoney, setEditMoney] = useState('')
  const [editNote, setEditNote] = useState('')
  const [reload, setReload] = useState(false)
  const [listEmp, setListEmp] = useState([])

  useEffect(() => {
    const getListEmp = async () => {
      const list = await getEmps()

      setListEmp(
        list?.map((item) => ({
          label: `${item?.userName} - ${item?.idQLC}`,
          value: item?.idQLC,
        }))
      )
    }

    getListEmp()
  }, [])

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



  const [data, setData] = useState([])
  const [initData, setInitData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [param, setParam] = useState({
    month: moment().month() + 1,
    year: moment().year(),
  })
  const [month, setMonth] = useState(moment().month() + 1)
  const [year, setYear] = useState(moment().year())
  const [listSp, setListSp] = useState([])

  useEffect(() => {
    const getListSp = async () => {
      const com_id = getCompIdCS()
      const res = await POST_TL('api/tinhluong/congty/take_thiet_lap_com', {
        tl_id_com: com_id,
        tl_id_rose: 4,
      })

      if (res?.message === 'success') {
        setListSp(
          res?.listThietLap?.map((item) => ({
            label: item?.tl_name,
            value: item?.tl_id,
          }))
        )
      }
    }

    getListSp()
  }, [])

  useEffect(() => {
    const getListEmp = async () => {
      const com_id = getCompIdCS()
      const res = await POST('api/qlc/employee/listEmpSimpleNoToken', {
        com_id: com_id,
      })

      if (res?.result) {
        setListEmp(
          res?.list?.map((item) => ({
            label: item?.idQLC + ' ' + item?.userName,
            value: item?.idQLC,
          }))
        )
      }
    }

    getListEmp()
  }, [])        
  useEffect(() => {
    const getHHLN = async () => {
      setLoading(true)
      const com_id = getCompIdCS()
      const start = year + '/' + month + '/' + '01'
      const start_date = moment(start).format('YYYY/MM/DD')
      const end_date = moment(start).endOf('month').format('YYYY/MM/DD')
      const res = await POST_TL(
        'api/tinhluong/congty/take_hoa_hong_vt_ca_nhan',
        {
          ro_id_com: com_id,
          start_date: start_date,
          end_date: end_date,
        }
      )
      console.log(res)
      if (res?.message === 'success') {
        setData(res?.data)
        setInitData(res?.data)
      }
      setLoading(false)
    }

    getHHLN()
  }, [param, reload])

  const onFinish = () => {
    if (year && month) {
      setParam({
        year: year,
        month: month,
      })
    }
  }

  const onSubmit = async (values) => {
    console.log(values)
    const com_id = getCompIdCS()
    const body = {
      select_user: values?.ro_id_user,
      sanpham_tl: values?.sp,
      lp_amount: totalItem,
      chuky_lp: values?.ro_time?.format('YYYY/MM/DD'),
      cp: com_id,
      ro_time: values?.ro_time?.format('YYYY/MM/DD'),
      time_add: moment().valueOf(),
      sl_add: totalItem,
    }

    const res = await POST_TL('api/tinhluong/congty/add_lp_vt', body)
    if (res?.message === 'success') {
      window.alert('Thêm thành công')
      setIsModalOpen(false)
      setReload(!reload)
    } else {
      window.alert('Thêm thất bại')
    }
  }

  const [totalItem, setTotalItem] = useState(0)
  const [form] = Form.useForm()
  const onChangeField = () => {
    const formData = form.getFieldsValue()
    const temp = formData?.list
    if (temp) {
      let tempCount = 0
      temp?.forEach((item) => {
        tempCount += item?.count || 0
      })
      setTotalItem(tempCount)
    } else {
      setTotalItem(0)
    }
  }

  const onDel = async (record) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      const res = await POST_TL('api/tinhluong/congty/delete_rose', {
        ro_id: record?.ro_id,
      })

      if (res?.message === 'success') {
        window.alert('Xóa thành công')
        setReload(!reload)
      } else {
        window.alert('Xóa thất bại')
      }
    }
  }

  const columns = [
    {
      title: 'Họ và tên',
      render: (record) => (
        <div>
          <p className={styles.p_name}>
            {record?.detail?.idQLC} - {record?.detail?.userName}
          </p>
        </div>
      ),
    },
    {
      title: 'Chu kỳ áp dụng',
      render: (record) => (
        <div>
          <p className={styles.p_time}>
            {dayjs(record?.ro_time)?.format('DD/MM/YYYY')}
          </p>
        </div>
      ),
    },
    {
      title: 'Sản phẩm',
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {listSp?.find((item) => item?.value === record?.ro_id_tl)?.label}
          </p>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_so_luong}</p>
        </div>
      ),
    },
    {
      title: 'Hoa hồng được nhận',
      render: () => (
        <div>
          <p className={styles.p_time}>{0}</p>
        </div>
      ),
    },
    // {
    //   title: '',
    //   dataIndex: 'edit',
    //   render: () => (
    //
    //   ),
    // },
    {
      title: '',
      render: (record) => (
        <div>
          {/* <button className={styles.button_edit} onClick={showModalEditConfirm}>
            <EditOutlined />
          </button> */}
          <button className={styles.button_edit} onClick={() => onDel(record)}>
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>
              Danh sách nhân viên hưởng hoa hồng lệ phí vị trí
            </h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhân viên hưởng hoa hồng lệ phí vị trí
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
              size='large'
              placeholder='Chọn tháng'
              options={_.range(1, 13).map((item) => ({
                label: 'Tháng ' + item,
                value: item,
              }))}
              value={month}
              onChange={(e) => setMonth(e)}
            />
          </div>
          <div>
            <Select
              size='large'
              placeholder='Chọn năm'
              options={_.range(2021, 2026).map((item) => ({
                label: 'Năm ' + item,
                value: item,
              }))}
              value={year}
              onChange={(e) => setYear(e)}
            />
          </div>
          <div>
            <SearchOutlined className={styles['search-icon']} />
            <Select
              showSearch
              allowClear
              placeholder='Chọn nhân viên'
              // defaultValue='Tất cả nhân viên'
              optionFilterProp='label'
              size='large'
              style={{ width: '300px' }}
              onChange={(e) =>
                setData(
                  e
                    ? initData?.filter((item) => item?.detail?.idQLC === e)
                    : initData
                )
              }
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listEmp}
            />
          </div>
          <Button size='large' type='primary' onClick={onFinish}>
            <p>Thống kê</p>
          </Button>
        </div>
        <div className={styles.table_content}>
          <Table
            columns={columns}
            scroll={{
              x: 'max-content',
            }}
            dataSource={data}
            className={`table_add ${styles.table_add}`}
            // pagination={false}
          />
        </div>
      </div>
      {/* <div className={styles.content_bot}>
        <div className={styles.video}>
          <iframe
            className='video_hd'
            style={{ borderRadius: 15 }}
            width='100%'
            height={430}
            src='https://www.youtube.com/embed/-RKBvH5By48'
            title='YouTube video player'
            frameBorder={0}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen=''
          />
        </div>
      </div> */}

      <div className='modalRecipe'>
        <Modal
          className={`modal_edit ${styles.modal_edit}`}
          width={700}
          style={{ padding: '10px' }}
          title={
            <h2 style={{ padding: '10px', color: 'blue', fontWeight: 'bold' }}>
              Thêm mới hoa hồng vị trí
            </h2>
          }
          open={isModalOpen}
          onCancel={handleModalCancer}
          footer={null}>
          <Form form={form} onFinish={onSubmit}>
            <Row gutter={[12, 12]} style={{ padding: '20px' }}>
              <Col span={12}>
                <Form.Item
                  name={'ro_id_user'}
                  label='Chọn nhân viên'
                  labelCol={{ span: 24 }}
                  required>
                  <Select
                    size='large'
                    options={listEmp}
                    optionFilterProp='label'
                    showSearch
                    placeholder='Chọn nhân viên'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'sp'}
                  label='Chọn sản phẩm'
                  labelCol={{ span: 24 }}
                  required>
                  <Select
                    size='large'
                    options={listSp}
                    optionFilterProp='label'
                    showSearch
                    placeholder='Chọn sản phẩm'
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.List name={'list'}>
                  {(fields, { add, remove }) => (
                    <div
                      style={{
                        display: 'flex',
                        rowGap: 16,
                        flexDirection: 'column',
                      }}>
                      {fields.map((field) => (
                        <Row gutter={[12, 12]}>
                          <Col span={12}>
                            <Form.Item name={[field.name, 'count']}>
                              <InputNumber
                                size='large'
                                placeholder='Sản lượng theo ngày'
                                style={{ width: '100%' }}
                                onChange={onChangeField}
                              />
                            </Form.Item>
                          </Col>
                          {/* <Form.Item name={[field.name, 'money']}>
                            <InputNumber
                              size='large'
                              placeholder='Doanh thu'
                              style={{ width: '100%' }}
                              onChange={onChangeField}
                            />
                          </Form.Item> */}
                          <Col span={11} style={{ display: 'flex' }}>
                            <Form.Item name={[field.name, 'time']}>
                              <DatePicker
                                size='large'
                                placeholder='Thời gian'
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                            <CloseOutlined
                              style={{ marginLeft: '10px' }}
                              onClick={() => {
                                remove(field.name)
                                onChangeField()
                              }}
                            />
                          </Col>
                        </Row>
                      ))}

                      <Button type='dashed' onClick={() => add()} block>
                        Thêm doanh thu
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Col>
              <Col span={12}>
                <p>
                  Tổng sản phẩm:{' '}
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    {totalItem}
                  </span>
                </p>
              </Col>
              {/* <Col span={12}>
                <p>
                  Tổng doanh thu:{' '}
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    {totalMoney} VNĐ
                  </span>
                </p>
              </Col> */}
              <Col span={24}>
                <Form.Item
                  label='Chu kỳ'
                  required
                  labelCol={{ span: 24 }}
                  name={'ro_time'}>
                  <DatePicker
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Chu Kỳ'
                    picker='month'
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='Ghi chú'
                  labelCol={{ span: 24 }}
                  name={'ro_note'}>
                  <Input.TextArea placeholder='Ghi chú' size='large' />
                </Form.Item>
              </Col>

              <Col
                span={24}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Button type='primary' htmlType='submit'>
                  <p>Thêm hoa hồng</p>
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Hoahongcanhan
