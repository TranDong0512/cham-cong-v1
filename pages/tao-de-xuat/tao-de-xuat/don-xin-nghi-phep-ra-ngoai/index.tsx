import {
  MyDatePicker,
  MyInput,
  MySelect,
  MyTextArea,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import styles from './index.module.css'
import Image from 'next/image'
import {
  DeXuatCongCongFooter,
  MyInputFile,
  MySelectAcp,
  MyTime,
} from '@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/component/ChiTiet'
import { Col, Form, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GET, POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'

export default function DonXinNghiPhepOut() {
  const [form] = Form.useForm()
  const [fileData, setFileData] = useState<any>()
  const router = useRouter()

  const typeOffLabel = [
    { label: 'Nghỉ giữa ca', value: 1 },
    { label: 'Nghỉ hết ca', value: 2 },
  ]

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        bd_nghi: dayjs(
          `${dayjs(value['bd_nghi']).format('YYYY-MM-DD')} ${
            value['bd_nghi_time']
          }`
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        kt_nghi: dayjs(
          `${dayjs(value['kt_nghi']).format('YYYY-MM-DD')} ${
            value['kt_nghi_time']
          }`
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      }

      // console.log(body);
      const fd = new FormData()

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k])
      })

      if (fileData) {
        fd.append('file_kem', fileData)
      }

      POST_VT('api/vanthu/dexuat/addDXXNRN', fd).then((res) => {
        alert('Tạo đề xuất xin nghỉ phép ra ngoài thành công!')
        router.reload()
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

  return (
    <div>
      <div className={styles.header}>
        <Image
          src={'/back-w.png'}
          alt=''
          width={24}
          height={24}
          onClick={() => router.back()}></Image>
        <p className={styles.headerText}>Đơn xin nghỉ phép ra ngoài</p>
      </div>
      <Form
        form={form}
        className='shadowForm taoDeXuatForm'
        initialValues={{ name: 'khas' }}>
        <div className={styles.body}>
          <Row gutter={[20, 10]}>
            <Col sm={12} xs={24}>
              {MyInput(
                'Tên đề xuất',
                'Nhập tên đề xuất',
                true,
                true,
                'name_dx',
                '',
                false
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyInput(
                'Họ và tên',
                'Vũ Văn Khá',
                false,
                true,
                'name',
                '',
                true,
                '#EDF3FF'
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                'Loại nghỉ phép',
                'Chọn loại công công',
                true,
                true,
                'kieu_duyet',
                typeOffLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyInput(
                'Loại đề xuất',
                'Đơn xin nghỉ phép ra ngoài',
                false,
                true,
                'type_dx',
                '',
                true,
                '#EDF3FF'
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker(
                'Từ ngày',
                'Chọn ngày bắt đầu',
                true,
                true,
                'bd_nghi'
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker(
                'Đến ngày',
                'Chọn ngày kết thúc',
                true,
                true,
                'kt_nghi'
              )}
            </Col>
            <Col md={12} sm={24} xs={24}>
              {MySelect(
                'Ca làm việc',
                'Chọn ca làm việc',
                true,
                true,
                'ca_nghi',
                shiftLabel
              )}
            </Col>
            <Col md={6} sm={12} xs={24}>
              {MyTime('Thời gian ra ngoài', true, true, 'bd_nghi_time')}
            </Col>
            <Col md={6} sm={12} xs={24}>
              {MyTime('Thời gian quay lại', true, true, 'kt_nghi_time')}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name='ly_do'
                required={true}
                title='Lý do ra ngoài'
                hasLabel={true}
                placeholder='Nhập lý do ra ngoài'
              />
            </Col>
            <Col sm={12} xs={24}>
              {MySelectAcp(
                'Người xét duyệt',
                'Chọn người xét duyệt',
                true,
                true,
                'id_user_duyet',
                listDuyet?.listDuyet
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MySelectAcp(
                'Người theo dõi',
                'Chọn người theo dõi',
                true,
                true,
                'id_user_theo_doi',
                listDuyet?.listTheoDoi
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyInputFile(
                'Tài liệu dính kèm',
                'Thêm tài liệu đính kèm',
                true,
                true,
                'file_kem'
              )}
            </Col>
          </Row>
        </div>
        {DeXuatCongCongFooter(handleSubmit, () => null)}
      </Form>
    </div>
  )
}
