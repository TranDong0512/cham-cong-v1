import styles from './index.module.css'
import { Button, Card, Col, Form, Row } from 'antd'
import {
  MyDatePicker,
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { POST, POST_SS, getCompIdCS } from '@/pages/api/BaseApi'
import {
  eduLabel,
  expLabel,
  genderLabel,
  marriedLabel,
  positionLabel,
} from '@/utils/function'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ChinhSuaChiTiet({ info }) {
  const [form] = Form.useForm()
  const router = useRouter()
  const initData = {
    ...info,
    comp_name: info?.companyName?.userName,
    com_id: info?.com_id,
    team_id: info?.inForPerson?.employee?.team_id,
    group_id: info?.inForPerson?.employee?.group_id,
    start_working_time: dayjs.unix(info?.start_working_time),
    birthday: dayjs.unix(info?.birthday),
  }
  const [listTo, setListTo] = useState([])
  const [listPb, setListPb] = useState([])
  const [listGr, setListGr] = useState([])

  useEffect(() => {
    const getData = async () => {
      const com_id = getCompIdCS()
      const res = await Promise.all([
        POST('api/qlc/department/list', { com_id: com_id }),
        POST('api/qlc/team/list', { com_id: com_id }),
        POST('api/qlc/group/search', { com_id: com_id }),
      ])

      // pb
      const pbRes = res?.[0]
      if (pbRes?.result) {
        setListPb(
          pbRes?.items?.map((item) => ({
            label: item?.dep_name,
            value: item?.dep_id,
          }))
        )
      }

      // too
      const toRes = res?.[1]
      if (toRes?.result) {
        setListTo(
          toRes?.data?.map((item) => ({
            label: item?.team_name,
            value: item?.team_id,
          }))
        )
      }

      // pb
      const grRes = res?.[2]
      if (grRes?.result) {
        setListGr(
          grRes?.data?.map((item) => ({
            label: item?.group_name,
            value: item?.group_id,
          }))
        )
      }
    }

    getData()
  }, [])

  const onFinish = async () => {
    const value = form.getFieldsValue()
    const res = await POST('api/qlc/employee/updateInfoEmployeeComp', value)

    if (res?.result) {
      window.alert('Cập nhật thông tin thành công')
      router.back()
    } else {
      window.alert('Cập nhật thông tin thất bại')
    }
    console.log(res)
  }

  return (
    <div style={{ marginBottom: '60px' }}>
      <Card>
        <Form form={form} onFinish={onFinish} initialValues={initData}>
          <Row gutter={[20, 0]}>
            <Col md={12} sm={24} xs={24}>
              {MyInput('ID', 'ID', true, true, 'idQLC', '', true)}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect(
                'Công ty',
                '',
                true,
                true,
                'comp_name',
                [{ label: initData?.comp_name, value: initData?.com_id }],
                '',
                () => null,
                () => null,
                true
              )}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MyInput('Họ và tên', 'Họ và tên', true, true, 'userName')}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MyInput('Email', 'Email', true, true, 'emailContact')}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MyInput('Số điện thoại', '', true, true, 'phone')}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MyInput('Địa chỉ', '', true, true, 'address')}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect('Giới tính', '', true, true, 'gender', genderLabel)}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MyDatePicker('Ngày sinh', '', true, true, 'birthday')}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect(
                'Trình độ học vấn',
                '',
                true,
                true,
                'education',
                eduLabel
              )}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect(
                'Tình trạng hôn nhân',
                '',
                true,
                true,
                'married',
                marriedLabel
              )}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect(
                'Kinh nghiệm làm việc',
                '',
                true,
                true,
                'experience',
                expLabel
              )}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MyDatePicker(
                'Ngày bắt đầu làm việc',
                '',
                true,
                true,
                'start_working_time'
              )}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect('Phòng ban', '', true, true, 'dep_id', listPb)}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect(
                'Chức vụ',
                '',
                true,
                true,
                'position_id',
                positionLabel
              )}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect('Tổ', '', false, true, 'team_id', listTo)}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect('Nhóm', '', false, true, 'group_id', listGr)}
            </Col>

            <Col
              md={24}
              sm={24}
              xs={24}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                className={styles.btn}
                style={{
                  marginRight: ' 20px',
                  border: '1px solid #4C5BD4',
                  marginTop: ' 20px',
                }}
                size='large'>
                <p style={{ color: '#4C5BD4' }}>Hủy</p>
              </Button>
              <Button
                // htmlType='submit'
                className={styles.btn}
                onClick={onFinish}
                style={{
                  marginLeft: ' 20px',
                  backgroundColor: '#4C5BD4',
                  marginTop: ' 20px',
                }}
                size='large'>
                <p style={{ color: '#fff' }}>Cập nhật</p>
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export const getServerSideProps = async (contxt) => {
  const id = contxt.query.id

  console.log(id)

  const res = await POST_SS(
    'api/qlc/employee/info',
    {
      idQLC: id,
    },
    contxt
  )

  return {
    props: {
      info: res?.result ? res?.data : {},
    },
  }
}
