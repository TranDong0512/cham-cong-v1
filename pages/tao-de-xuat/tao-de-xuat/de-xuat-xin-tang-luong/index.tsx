import {
  DXFileInput,
  DXInputMoney,
  DXTextArea,
  DxDatePicker,
  DxInputTxt,
  DxSelect,
  TaoDeXuatWrapper,
} from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'
import { POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import { Col, Form, Row } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DeXuatTangLuong() {
  const [fileData, setFileData] = useState<Blob>()
  const [form] = Form.useForm()

  const router = useRouter()

  form.setFieldValue('type_dx', 'Đề xuất xin tăng lương')

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        date_tang_luong: dayjs(value['date_tang_luong']).unix(),
      }
      // console.log(body);
      const fd = new FormData()

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k])
      })

      if (fileData) {
        fd.append('fileKem', fileData)
      }

      POST_VT('api/vanthu/dexuat/De_Xuat_Xin_Tang_Luong', fd).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất xin tăng lương thành công!')
          router.reload()
        }
      })
    })
  }
  const [infoUser, setInfoUser] = useState<any>()
  const [listDuyet, setListDuyet] = useState<any>({})

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

          <Col md={6} sm={12} xs={24}>
            <DXInputMoney
              name='mucluong_ht'
              placeholder='Tiền lương hiện tại'
              required
              title='Mức lương hiện tại'
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DXInputMoney
              name='mucluong_tang'
              placeholder='Lương đề xuất tăng'
              required
              title='Mức lương đề xuất tăng'
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxDatePicker
              name='date_tang_luong'
              placeholder='Chọn ngày'
              required
              title='Đề xuất tăng từ ngày'
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name='ly_do'
              placeholder='Nhập lý do xin tăng lương'
              required
              title='Lý do xin tăng lương'
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
          <Col md={12} sm={12} xs={24}>
            <DXFileInput setFileData={setFileData} />
          </Col>
        </Row>
      </Form>
    )
  }

  return (
    <TaoDeXuatWrapper
      header='Đề xuất xin tăng lương'
      onCreateClicked={handleSubmit}>
      <MyForm />
    </TaoDeXuatWrapper>
  )
}
