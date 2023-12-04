import {
  DXFileInput,
  DXInputMoney,
  DXTextArea,
  DxDatePicker,
  DxInputTxt,
  DxSelect,
  TaoDeXuatWrapper,
} from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'
import { GET, POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import { Col, Form, Row } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DeXuatThoiViec() {
  const [form] = Form.useForm()
  const router = useRouter()

  form.setFieldValue('type_dx', 'Đơn xin thôi việc')

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   id_user_duyet: value["id_user_duyet"]?.join(","),
      //   id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      //   ngaybatdau_tv: dayjs(value["ngaybatdau_tv"]).unix()
      // });

      POST_VT('api/vanthu/DeXuat/De_Xuat_Xin_thoi_Viec', {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        ngaybatdau_tv: dayjs(value['ngaybatdau_tv']).unix(),
      }).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất thôi việc thành công!')
          router.reload()
        }
      })
    })
  }

  const [infoUser, setInfoUser] = useState<any>()
  const [listDuyet, setListDuyet] = useState<any>({})
  const [shiftLabel, setShiftLabel] = useState<any>([])

  useEffect(() => {
    const getListDuyet = async () => {
      const res = await POST_VT('api/vanthu/dexuat/showadd', {})

      if (res?.result) {
        setListDuyet({
          listDuyet: res?.listUsersDuyet?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC,
          })),
          listTheoDoi: res?.listUsersTheoDoi?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC,
          })),
        })
      }
    }

    getListDuyet()
    GET('api/qlc/shift/list').then((res) => {
      if (res?.result === true) {
        setShiftLabel(
          res?.items.map((item) => {
            return {
              value: `${item?.shift_id}`,
              label: item?.shift_name,
            }
          })
        )
      }
    })

    setInfoUser(getInfoUser())
  }, [])

  useEffect(() => {
    if (infoUser?.idQLC) {
      form.setFieldValue('name', infoUser?.userName)
    }
  }, [infoUser])

  const MyForm = () => {
    return (
      <Form form={form} initialValues={{ name: 'khas' }}>
        <Row gutter={[20, 10]}>
          <Col md={12} sm={12} xs={24}>
            <DxInputTxt
              name='name_dx'
              placeholder='Nhập tên đề xuất'
              required
              title='Tên đề xuất'
              disabled={false}
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name='name'
              placeholder='Họ và tên'
              required
              title='Họ và tên'
              disabled
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name='type_dx'
              placeholder='Loại đề xuất'
              required
              title='Loại đề xuất'
              disabled
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxDatePicker
              name='ngaybatdau_tv'
              placeholder='Chọn ngày'
              required
              title='Ngày bắt đầu nghỉ'
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti={false}
              name='ca_bdnghi'
              options={shiftLabel}
              placeholder='Chọn ca nghỉ'
              required
              showSearch
              title='Ca bắt đầu nghỉ'
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name='ly_do'
              placeholder='Nhập lý do xin nghỉ'
              required
              title='Lý do xin thôi việc'
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti
              name='id_user_duyet'
              options={listDuyet?.listDuyet}
              placeholder='Người xét duyệt'
              required
              showSearch
              title='Người xét duyệt'
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti
              name='id_user_theo_doi'
              options={listDuyet?.listTheoDoi}
              placeholder='Người theo dõi'
              required
              showSearch
              title='Người theo dõi'
            />
          </Col>
        </Row>
      </Form>
    )
  }

  return (
    <TaoDeXuatWrapper header='Đơn xin thôi việc' onCreateClicked={handleSubmit}>
      <MyForm />
    </TaoDeXuatWrapper>
  )
}
