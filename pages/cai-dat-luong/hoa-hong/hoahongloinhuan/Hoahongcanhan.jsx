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
  Col,
  Row,
  Card,
  InputNumber,
} from 'antd'
import {
  CloseOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/router'
import moment from 'moment'
import { POST, POST_TL, getCompIdCS } from '../../../api/BaseApi'
import _ from 'lodash'

dayjs.extend(customParseFormat)
dayjs.locale('vi')
const { RangePicker } = DatePicker

const Hoahongcanhan = () => {

  //modalthêm mới
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleModalCancer = () => {
    setIsModalOpen(false)
  }

  // xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false)
  const [selectedTableIndex, setSelectedTableIndex] = useState(null)
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false)
  }

  const showModalDeleteConfirm = (key) => {
    setSelectedTableIndex(key?.ro_id)
    setIsModalDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedTableIndex !== null) {
      const res = await POST_TL('api/tinhluong/congty/delete_rose', {
        ro_id: selectedTableIndex,
      })

      if (res?.message === 'success') {
        window.alert('Xóa thành công')
        setSelectedTableIndex(null)
        setIsModalDeleteOpen(false)
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
            {dayjs(record?.ro_time)?.format('MM/YYYY')}
          </p>
        </div>
      ),
    },
    {
      title: 'Sản phẩm',
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {listSp?.find((item) => record?.ro_id_tl === item?.value)?.label}
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
      title: 'Tổng doanh thu',
      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_price}</p>
        </div>
      ),
    },
    // {
    //   title: 'Hoa hồng được nhận	',
    //   dataIndex: 'delete',

    //   render: () => (
    //     <button className={styles.button_edit} onClick={showModalDeleteConfirm}>
    //       <Image
    //         alt='/'
    //         src={'/tinhluong/delete-icon.png'}
    //         width={15}
    //         height={15}
    //       />
    //     </button>
    //   ),
    // },
    {
      title: '',
      render: (record) => (
        <button
          className={styles.button_edit}
          onClick={() => showModalDeleteConfirm(record)}>
          <DeleteOutlined />
        </button>
      ),
    },
  ]

  const [data, setData] = useState([])
  const [initData, setInitData] = useState([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)

 
  const [month, setMonth] = useState(moment().month() + 1)
  const [year, setYear] = useState(moment().year())
  const [epId, setEpId] = useState('')
  const [listEmp, setListEmp] = useState([])
  const [listSp, setListSp] = useState([])
  const [form] = Form.useForm()

  const [param, setParam] = useState({
    month: moment().month() + 1,
    year: moment().year(),
    ro_id_com : epId
  })

  useEffect(() => {
    const getListSp = async () => {
      const com_id = getCompIdCS()
      const res = await POST_TL('api/tinhluong/congty/take_thiet_lap_com', {
        tl_id_com: com_id,
        tl_id_rose: 3,
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
        'api/tinhluong/congty/take_hoa_hong_ln_ca_nhan',
        {
          ro_id_com: com_id,
          start_date: start_date,
          end_date: end_date,
          // ro_id_com : epId
        }
      )
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
        ro_id_com : epId
      })
    }
  }

  const [totalItem, setTotalItem] = useState(0)
  const [totalMoney, setTotalMoney] = useState(0)

  const onSubmit = async (values) => {
    if (values?.list?.length === 0) window.alert('Thiếu thêm doanh thu')
    else {
      const id_com = getCompIdCS()
      let total = 0
      values?.list?.forEach((item) => (total += item?.count))
      let body = {
        ro_id_user: values?.ro_id_user,
        ro_id_com: id_com,
        ro_id_lr: 3,
        ro_time: values?.ro_time?.format('YYYY/MM/DD'),
        ro_note: values?.ro_note || '',
        ro_price: totalMoney,
        ro_id_tl: values?.sp,
        dt_money: JSON.stringify(values?.list?.map((item) => item?.money)),
        dt_time: JSON.stringify(
          values?.list?.map((item) => item?.time?.format('YYYY/MM/DD'))
        ),
        dt_sl: JSON.stringify(values?.list?.map((item) => item?.count)),
        ro_so_luong: total,
      }
      const res = await POST_TL(
        'api/tinhluong/congty/insert_rose_personal_ln',
        body
      )

      if (res?.message === 'success') {
        window.alert('Thêm thành công')
        setIsModalOpen(false)
        setReload(!reload)
      } else {
        window.alert('Thêm thất bại')
      }
    }
  }

  const onChangeField = () => {
    const formData = form.getFieldsValue()
    const temp = formData?.list
    if (temp) {
      let tempMoney = 0
      let tempCount = 0
      temp?.forEach((item) => {
        tempMoney += item?.money || 0
        tempCount += item?.count || 0
      })
      setTotalItem(tempCount)
      setTotalMoney(tempMoney)
    } else {
      setTotalItem(0)
      setTotalMoney(0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>
              Danh sách nhân viên hưởng hoa hồng lợi nhuận
            </h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhân viên hưởng hoa hồng lợi nhuận
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
          <Select
            size='large'
            placeholder='Chọn tháng'
            options={_.range(1, 13).map((item) => ({
              label: 'Tháng ' + item,
              value: item,
            }))}
            value={month}
            onChange={(v) => setMonth(v)}
          />
          <div>
            <Select
              size='large'
              placeholder='Chọn năm'
              options={_.range(2021, 2026).map((item) => ({
                label: 'Năm ' + item,
                value: item,
              }))}
              value={year}
              onChange={(v) => setYear(v)}
            />
          </div>
          <div>
            <SearchOutlined className={styles['search-icon']} />
            <Select
              showSearch
              placeholder=''
              defaultValue='Tất cả nhân viên'
              optionFilterProp='label'
              size='large'
              onChange={(v) => setEpId(v)}
              style={{ width: '300px' }}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { label: 'Tất cả nhân viên', value: 'all' },
                ...listEmp,
              ]}
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
              x: 1000,
            }}
            dataSource={data}
            className={`table_add ${styles.table_add}`}
            // pagination={false}
          />
        </div>
      </div>

      <div className='modal_delete' >
        <Modal
          className={`modal_delete ${styles.modal_delete}`}
          open={isModalDeteleOpen}
          onCancel={handleDeleteCancel}
          footer={null}>
          <div
            className={styles.modal_delete_body}
            style={{
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Bạn chắc chắn muốn xóa ?
            </p>
          </div>
          <div style={{display:'flex', justifyContent:'space-evenly'}}>
              
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
                <p> Xóa</p>
              </Button>
            </div>
            <div style={{paddingBottom:24}}></div>
        </Modal>
      </div>
      <div className='modalRecipe'>
        <Modal
          className={`modal_edit ${styles.modal_edit}`}
          open={isModalOpen}
          width={700}
          onCancel={handleModalCancer}
          footer={null}>
          <div className={styles.modalRecipe_body} style={{ padding: '10px' }}>
            <p
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}>
              Thêm mới hoa hồng lợi nhuận
            </p>
            <Form form={form} onFinish={onSubmit}>
              <Row gutter={[12, 12]}>
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
                          <Space>
                            <Form.Item name={[field.name, 'count']}>
                              <InputNumber
                                size='large'
                                placeholder='Số lượng sản phẩm'
                                style={{ width: '100%' }}
                                onChange={onChangeField}
                              />
                            </Form.Item>
                            <Form.Item name={[field.name, 'money']}>
                              <InputNumber
                                size='large'
                                placeholder='Doanh thu'
                                style={{ width: '100%' }}
                                onChange={onChangeField}
                              />
                            </Form.Item>

                            <Form.Item name={[field.name, 'time']}>
                              <DatePicker
                                size='large'
                                placeholder='Thời gian'
                              />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                remove(field.name)
                                onChangeField()
                              }}
                            />
                          </Space>
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
                <Col span={12}>
                  <p>
                    Tổng doanh thu:{' '}
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      {totalMoney} VNĐ
                    </span>
                  </p>
                </Col>
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
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Hoahongcanhan
