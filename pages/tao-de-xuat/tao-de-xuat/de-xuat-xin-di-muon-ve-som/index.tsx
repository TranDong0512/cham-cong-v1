import {
  MyDatePicker,
  MyInput,
  MySelect,
  MyTextArea,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import styles from './index.module.css'
import Image from 'next/image'
import { Col, Form, Row } from 'antd'
import {
  DeXuatCongCongFooter,
  MyInputFile,
  MySelectAcp,
  MyTime,
} from '@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/component/ChiTiet'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { GET, POST_VT, getInfoUser } from '@/pages/api/BaseApi'

export default function DeXuatXinDiMuonVeSom() {
  const [fileData, setFileData] = useState<any>()

  const router = useRouter()
  const [form] = Form.useForm()

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
        time_batdau: dayjs(
          `${dayjs(value['time_batdau']).format('YYYY-MM-DD')} ${
            value['time_batdau_time']
          }`
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        time_ketthuc: dayjs(
          `${dayjs(value['time_batdau']).format('YYYY-MM-DD')} ${
            value['time_ketthuc_time']
          }`
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        // time_batdau_tomorrow: dayjs().diff(value["time_batdau"])?.[0] === "-" ? false : true,
        time_batdau_tomorrow:
          dayjs().diff(value['time_batdau'], 'day') <= 0 ? true : false,
        time_ketthuc_tomorrow:
          dayjs().diff(value['time_batdau'], 'day') <= 0 ? true : false,
        kieu_duyet: 0,
      }

      // console.log(body);
      const fd = new FormData()

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k])
      })

      if (fileData) {
        fd.append('file_kem', fileData)
      }

      POST_VT('api/vanthu/dexuat/addDXDMVS', fd).then((res) => {
        alert('Tạo đề xuất xin đi muộn về sớm thành công!')
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
        <p className={styles.headerText}>Đề xuất xin đi muộn về sớm</p>
      </div>
      <Form
        form={form}
        className='shadowForm taoDeXuatForm'
        initialValues={{ name: 'Vũ Văn Khá' }}>
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
            <Col lg={6} sm={12} xs={24}>
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
            <Col lg={6} sm={12} xs={24}>
              {MyInput(
                'Loại đề xuất',
                'Đề xuất xin đi muộn về sớm',
                false,
                true,
                'type_dx',
                '',
                true,
                '#EDF3FF'
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                'Loại đề xuất',
                'Chọn loại công công',
                true,
                true,
                'type_duyet',
                typeOffLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker('Ngày', 'Chọn ngày', true, true, 'time_batdau')}
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                'Ca làm việc',
                'Chọn ca làm việc',
                true,
                true,
                'ca_lam_viec',
                shiftLabel
              )}
            </Col>
            <Col sm={6} xs={24}>
              {MyTime('Thời gian bắt đầu', true, true, 'time_batdau_time')}
            </Col>
            <Col sm={6} xs={24}>
              {MyTime('Thời gian kết thúc', true, true, 'time_ketthuc_time')}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name='ly_do'
                required={true}
                title='Lý do xin đi muộn về sớm'
                hasLabel={true}
                placeholder='Nhập lý do xin đi muộn về sớm'
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
