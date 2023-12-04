import { POST } from '@/pages/api/BaseApi'
import { ExportExcellButton } from '@/utils/ExportExccel'
import { Avatar, Button, Card, Col, DatePicker, Form, Row, Table } from 'antd'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function XuatCongCaNhan() {
  const URL = process.env.NEXT_PUBLIC_BASE_URL + '/timviec365'
  const [list, setList] = useState()
  const [total, setTotal] = useState()
  const [param, setParam] = useState<any>({
    curPage: 1,
    startTime: dayjs().subtract(1, 'week'),
    endTime: dayjs(),
  })
  const [form] = Form.useForm()

  useEffect(() => {
    const getList = async () => {
      const res = await POST('api/qlc/timekeeping/getHistoryTrackingEmp', param)

      if (res?.result) {
        setList(res?.data)
        setTotal(res?.total)
      }
    }

    getList()
  }, [param])

  const onFinish = (value) => {
    setParam({
      ...param,
      startTime: dayjs(value?.startTime)?.format('YYYY/MM/DD'),
      endTime: dayjs(value?.endTime)?.format('YYYY/MM/DD'),
    })
  }

  const colunms: any = [
    {
      title: <p>Ảnh</p>,
      render: (record) => (
        <Avatar size={70} alt='/' src={`${URL}/${record?.image}`} />
      ),
      align: 'center',
    },
    {
      title: <p>Ca làm việc</p>,
      render: (record) => <p>{record?.shift_name}</p>,
      align: 'center',
    },
    {
      title: <p>Thời gian chấm công</p>,
      render: (record) => (
        <p>{moment(record?.at_time)?.format('HH:mm:ss DD-MM-YYYY')}</p>
      ),
      align: 'center',
    },
    {
      title: <p>Thiết bị chấm công</p>,
      render: (record) => <p>{record?.device}</p>,
      align: 'center',
    },
    {
      title: <p>Vị trí</p>,
      render: (record) => <p>{record?.vitri || 'Chưa cập nhật'}</p>,
      align: 'center',
    },
  ]

  const [userName, setUserName] = useState(
    Cookies.get('token_base365')?.['data']?.userName
  )

  return (
    <Card title={<p>Bảng xuất công cá nhân</p>}>
      <Form form={form} onFinish={onFinish} initialValues={param}>
        <Row gutter={[20, 20]}>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Từ </p>
            <Form.Item name={'startTime'}>
              <DatePicker size='large' format={'DD/MM/YYYY'} />
            </Form.Item>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Đến </p>
            <Form.Item name={'endTime'}>
              <DatePicker size='large' format={'DD/MM/YYYY'} />
            </Form.Item>
          </Col>
          <Col>
            <Button size='large' type='primary' htmlType='submit'>
              <p style={{ color: '#fff' }}> Tìm kiếm</p>
            </Button>
          </Col>
          {/* <Col>
            <ExportExcellButton
              data={[]}
              fileName={`Bảng xuất công cá nhân ${userName}`}
              fileHeaders={[]}
              listkeys={['Tên', 'Ca làm việc', 'Thời gian chấm công','Thiết bị chấm công', 'Vị trí']}
              component={
                <Button
                  size='large'
                  style={{ backgroundColor: 'green' }}
                  htmlType='submit'>
                  <p style={{ color: '#fff' }}> Xuất File Excel</p>
                </Button>
              }
            />
          </Col> */}
        </Row>
      </Form>

      <Table
        style={{
          marginTop: '20px',
          border: '1px solid #ACACAC',
          borderRadius: '10px',
        }}
        columns={colunms}
        dataSource={list}
        pagination={{
          total: total,
          onChange(page, pageSize) {
            setParam({
              ...param,
              curPage: page,
            })
          },
        }}
      />
    </Card>
  )
}
