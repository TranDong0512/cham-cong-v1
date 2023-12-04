import { Input, Card, Modal, Row, Col, Button, Select, Form } from 'antd'
import { SearchOutlined, EditOutlined } from '@ant-design/icons'
import styles from './cong_chuan.module.css'
import { useEffect, useState } from 'react'
import { ModalXacNhan } from '@/components/cham-cong/cong-chuan/modal-xac-nhan-cong-chuan'
import { POST, POST_SS } from '@/pages/api/BaseApi'
import _ from 'lodash'
import moment from 'moment'
const years = [
  {
    label: 'Năm 2023',
    value: '2023',
  },
  {
    label: 'Năm 2024',
    value: '2024',
  },
  {
    label: 'Năm 2025',
    value: '2025',
  },
  {
    label: 'Năm 2026',
    value: '2026',
  },
]
const months = [
  {
    label: 'Tháng 01',
    value: '01',
  },
  {
    label: 'Tháng 02',
    value: '02',
  },
  {
    label: 'Tháng 03',
    value: '03',
  },
  {
    label: 'Tháng 04',
    value: '04',
  },
  {
    label: 'Tháng 05',
    value: '05',
  },
  {
    label: 'Tháng 06',
    value: '06',
  },
  {
    label: 'Tháng 07',
    value: '07',
  },
  {
    label: 'Tháng 08',
    value: '08',
  },
  {
    label: 'Tháng 09',
    value: '09',
  },
  {
    label: 'Tháng 10',
    value: '10',
  },
  {
    label: 'Tháng 11',
    value: '11',
  },
  {
    label: 'Tháng 12',
    value: '12',
  },
]

export default function Congchuan({ listCompanyWorkdays }) {
  const [year, setYear] = useState(moment().year())
  const [month, setMonth] = useState(moment().month() + 1)
  const [modalXacNhan, setModalXacNhan] = useState(false)
  const [data, setData] = useState(listCompanyWorkdays?.data)
  const [form] = Form.useForm()
  console.log(data)

  useEffect(() => {
    const dateSplit = data?.apply_month.split('-')
    // console.log(dateSplit)
    if (dateSplit) {
      setYear(dateSplit[0])
      setMonth(dateSplit[1])
    }
  }, [data])

  const handleChangeYear = (value: string) => {
    setYear(Number(value))
    POST('api/qlc/companyworkday/detail', {
      year: value,
      month,
    }).then((res) => {
      if (res?.result === true) {
        setData(res?.data)
      } else if (_.isNull(res)) {
        setData({ apply_month: `${value}-${month}-01`, num_days: undefined })
      }
    })
  }
  const handleChangeMonth = (value: string) => {
    setMonth(Number(value))
    POST('api/qlc/companyworkday/detail', {
      year,
      month: value,
    }).then((res) => {
      if (res?.result === true) {
        setData(res?.data)
      } else if (_.isNull(res)) {
        setData({ apply_month: `${year}-${value}-01`, num_days: undefined })
      }
    })
  }
  const onFinish = (value: any) => {
    console.log(value)

    POST('api/qlc/companyworkday/create', value).then((res) => {
      if (res?.result === true) {
        POST('api/qlc/companyworkday/detail', value).then((res) => {
          if (res?.result === true) {
            setData(res?.data)
          } else if (_.isNull(res)) {
            setData({
              apply_month: `${year}-${month}-01`,
              num_days: undefined,
            })
          }
        })
      }
    })
  }

  useEffect(() => {
    form.setFieldsValue(data)
  }, [form, data])
  return (
    <Card>
      <div className={styles.body}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            year: moment().year(),
            month: moment().month() + 1,
            num_days: undefined,
          }}>
          <div
            className={styles.tieuDe}
            style={{
              borderBottom: 'solid 1px #B6B6B6',
              fontSize: '20px',
              fontWeight: '600',
              color: '#474747',
            }}>
            Công chuẩn tháng {month}/{year}
          </div>
          <Row
            gutter={10}
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '20px',
            }}>
            <Col xl={4} lg={5} md={6} xs={12}>
              <Form.Item name='year'>
                <Select
                  suffixIcon={<SearchOutlined rev={''} />}
                  showSearch
                  defaultValue='Năm 2023'
                  style={{ width: '100%' }}
                  options={years}
                  onChange={handleChangeYear}
                  listHeight={200}
                />
              </Form.Item>
            </Col>
            <Col xl={4} lg={5} md={6} xs={12}>
              <Form.Item name='month'>
                <Select
                  suffixIcon={<SearchOutlined rev={''} />}
                  showSearch
                  defaultValue='Tháng 07'
                  style={{ width: '100%' }}
                  options={months}
                  onChange={handleChangeMonth}
                  listHeight={200}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col lg={14} md={12} sm={17} xs={24}>
              <Card style={{ padding: '20px 10px', fontSize: '16px' }}>
                <div>
                  <EditOutlined rev={''} />
                  <strong style={{ marginLeft: '10px', color: '#474747' }}>
                    Mô tả
                  </strong>
                </div>
                <div style={{ marginBottom: '10px', color: '#474747' }}>
                  Cài đặt số ngày công tiêu chuẩn để tính lương cho toàn bộ nhân
                  viên của công ty trong tháng đó.
                  <br />
                  Định dạng nhập là số nguyên dương hoặc số thập phân.
                </div>

                <Form.Item name='num_days'>
                  <Input
                    type='number'
                    placeholder='Nhập số ngày công'
                    style={{ padding: '10px', marginBottom: '10px' }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    className={styles.buttons}
                    htmlType='submit'
                    onClick={() => {
                      if (!form.getFieldValue('num_days')) {
                        alert('Số ngày công không được để trống!')
                      } else {
                        setModalXacNhan(true)
                      }
                    }}>
                    <p className={styles.txt}>Lưu công chuẩn</p>
                  </Button>
                </Form.Item>
                {ModalXacNhan(
                  modalXacNhan,
                  setModalXacNhan,
                  'Bạn đã lưu công chuẩn thành công'
                )}
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
  )
}

export const getServerSideProps = async (context) => {
  const listCompanyWorkdays = await POST_SS(
    'api/qlc/companyworkday/detail',
    {
      month: moment().month() + 1,
      year: moment().year(),
    },
    context
  )

  return {
    props: {
      listCompanyWorkdays,
    },
  }
}
