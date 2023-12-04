import React, { useState, useMemo, useEffect } from 'react'
import styles from '../hoahongcanhan.module.css'
import {
  DatePicker,
  Table,
  Select,
  Modal,
  Button,
  Row,
  Col,
  Form,
  Input,
} from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import moment from 'moment'
import { POST, POST_TL, getCompIdCS } from '../../../api/BaseApi'
import _ from 'lodash'

dayjs.extend(customParseFormat)
dayjs.locale('vi')
const { RangePicker } = DatePicker

const Hoahongcanhan = () => {

  const onSearch = (value) => {
  }

  //modalthêm mới
  const [tables, setTables] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsEdit(false)
    form.resetFields()
    setId()
    setIsModalOpen(true)
  }
  const handleModalCancer = () => {
    setIsModalOpen(false)
  }
  const [editingIndex, setEditingIndex] = useState(null)


  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false)
  const [selectedTableIndex, setSelectedTableIndex] = useState(null)
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false)
  }

  const showModalDeleteConfirm = async (key) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      const res = await POST_TL('api/tinhluong/congty/delete_rose', {
        ro_id: key?.ro_id,
      })

      if (res?.message === 'success') {
        window.alert('Xóa thành công')
        setReload(!reload)
      } else {
        window.alert('Xóa thất bại')
      }
    }
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
      title: 'Chu kỳ',
      render: (record) => (
        <div>
          <p className={styles.p_time}>
            {moment(record?.ro_time)?.format('DD/MM/YYYY')}
          </p>
        </div>
      ),
    },
    {
      title: 'Tên kế hoạch',
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {listSp?.find((item) => item?.value === record?.ro_id_tl)?.label}
          </p>
        </div>
      ),
    },
    {
      title: 'Hoa hồng (VNĐ)',
      render: (record) => (
        <div>
          <p className={styles.p_time}>
            <span style={{ color: 'green' }}>
              {record?.TinhluongThietLap?.tl_kpi_yes} VNĐ
            </span>{' '}
            /{' '}
            <span style={{ color: 'red' }}>
              {record?.TinhluongThietLap?.tl_kpi_no} VNĐ
            </span>
          </p>
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.ro_kpi_active === 0
              ? 'Chưa đạt kế hoạch'
              : 'Đã đạt kế hoạch'}
          </p>
        </div>
      ),
    },
    // {
    //   title: '',
    //   dataIndex: 'edit',
    //   render: () => (
    //     <button className={styles.button_edit} onClick={showModalEditConfirm}>
    //       <Image
    //         alt='/'
    //         src={'/tinhluong/add-icon.png'}
    //         width={15}
    //         height={15}
    //       />
    //     </button>
    //   ),
    // },
    {
      title: '',
      render: (record) => (
        <>
          <button
            className={styles.button_edit}
            style={{ marginRight: '20px' }}
            onClick={() => {
              setIsEdit(true)
              form.setFieldsValue({
                ...record,
                ro_time: dayjs(record?.ro_time),
              })
              setIsModalOpen(true)
              setId(record?.ro_id)
            }}>
            <EditOutlined />
          </button>
          <button
            className={styles.button_edit}
            onClick={() => showModalDeleteConfirm(record)}>
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ]

  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [initData, setInitData] = useState([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState(moment().month() + 1)
  const [year, setYear] = useState(moment().year())
  const [listEmp, setListEmp] = useState([])
  const [listSp, setListSp] = useState([])
  const [id, setId] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [param, setParam] = useState({
    month: moment().month() + 1,
    year: moment().year(),
  })

  useEffect(() => {
    const getListSp = async () => {
      const com_id = getCompIdCS()
      const res = await POST_TL('api/tinhluong/congty/take_thiet_lap_com', {
        tl_id_com: com_id,
        tl_id_rose: 5,
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
        'api/tinhluong/congty/take_hoa_hong_kh_ca_nhan',
        {
          ro_id_com: com_id,
          start_date: start_date,
          end_date: end_date,
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
      })
    }
  }

  const onSubmit = async (values) => {
    const com_id = getCompIdCS()
    if (isEdit) {
      const body = {
        ro_id_user: values?.ro_id_user,
        ro_kpi_active: values?.ro_kpi_active,
        ro_note: values?.ro_note,
        ro_time: values?.ro_time?.format('YYYY/MM/DD'),
        cp: com_id,
        ro_id_tl: values?.ro_id_tl,
      }
      const res = await POST_TL('api/tinhluong/congty/edit_hh_kh', {
        ...body,
        ro_id: id,
      })

      if (res?.message === 'success') {
        window.alert('Sửa thành công')
        setIsModalOpen(false)
        setReload(!reload)
      } else {
        window.alert('Sửa thất bại')
      }
    } else {
      const body = {
        ro_id_user: values?.ro_id_user,
        ro_kpi_active: values?.ro_kpi_active,
        ro_note: values?.ro_note,
        ro_time: values?.ro_time?.format('YYYY/MM/DD'),
        cp: com_id,
        ro_id_tl: values?.ro_id_tl,
      }
      const res = await POST_TL('api/tinhluong/congty/add_hh_kh', body)

      if (res?.message === 'success') {
        window.alert('Thêm thành công')
        setIsModalOpen(false)
        setReload(!reload)
      } else {
        window.alert('Thêm thất bại')
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>
              Danh sách nhân viên hưởng hoa hồng kế hoạch
            </h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhân viên hưởng hoa kế hoạch
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
              style={{ width: '200px' }}
              options={_.range(2021, 2025).map((item) => ({
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
              allowClear
              showSearch
              placeholder=''
              optionFilterProp='label'
              onSearch={onSearch}
              style={{ width: '300px' }}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listEmp}
              onChange={(e) =>
                setData(
                  e
                    ? initData?.filter((item) => item?.detail?.idQLC === e)
                    : initData
                )
              }
            />
          </div>
          <Button type='primary' onClick={onFinish}>
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
            pagination={false}
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
            src='https://www.youtube.com/embed/WQaU3n2wYdM'
            title='YouTube video player'
            frameBorder={0}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen=''
          />
        </div>
      </div> */}
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
          title=''
          open={isModalOpen}
          onCancel={handleModalCancer}
          footer={null}>
          <div className={styles.modalRecipe_body} style={{ padding: '10px' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {isEdit ? 'Sửa hoa hồng kế hoạch' : 'Thêm mới hoa hồng kế hoạch'}
            </p>
            <Form form={form} onFinish={onSubmit}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name={'ro_id_user'}
                    label='Họ và tên'
                    required
                    labelCol={{ span: 24 }}>
                    <Select
                      size='large'
                      options={listEmp}
                      placeholder='Tên nhân viên'
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={'ro_kpi_active'}
                    label='Đánh giá'
                    required
                    labelCol={{ span: 24 }}>
                    <Select
                      size='large'
                      options={[
                        {
                          label: 'Đạt kế hoạch',
                          value: 1,
                        },
                        {
                          label: 'Không đạt kế hoạch',
                          value: 0,
                        },
                      ]}
                      placeholder='Đánh giá'
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={'ro_id_tl'}
                    label='Tên kế hoạch'
                    required
                    labelCol={{ span: 24 }}>
                    <Select
                      size='large'
                      options={listSp}
                      placeholder='Tên kế hoạch'
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={'ro_time'}
                    label='Chu kì áp dụng'
                    required
                    labelCol={{ span: 24 }}>
                    <DatePicker
                      size='large'
                      picker='month'
                      placeholder='Chu kì áp dụng'
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={'ro_note'}
                    label='Ghi chú'
                    required
                    labelCol={{ span: 24 }}>
                    <Input.TextArea size='large' placeholder='Ghi chú' />
                  </Form.Item>
                </Col>
                <Col
                  span={24}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: 'center',
                  }}>
                  <Button
                    size='large'
                    type='primary'
                    htmlType='submit'
                    style={{ margin: 'auto', marginTop: '20px' }}>
                    <p>{isEdit ? 'Sửa hoa hồng' : 'Thêm hoa hồng'}</p>
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
