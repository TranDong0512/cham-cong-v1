import {
  DeXuatCongCongFooter,
  MyInputMoney,
  MySelectAcp,
} from '@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/de-xuat-cong-cong/de-xuat-cong-cong'
import DeXuatCongCong from '../de-xuat-cong-cong'
import styles from './index.module.css'
import Image from 'next/image'
import { Col, Form, Input, Row } from 'antd'
import {
  MyDatePicker,
  MyInput,
  MySelect,
  MyTextArea,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DeXuatHoaHongDoanhThu() {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      POST_VT('api/vanthu/dexuat/addDXHH', {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        time_hh: dayjs(value['time_hh']).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        chu_ky: `${value['chu_ky'].diff(dayjs(), 'month')} tháng`,
      }).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất hoa hồng doanh thu thành công!')
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
            value: user?.idQLC ? `/${user?.idQLC}` : '/nhanvien.png',
            url: user?.avatarUser,
          })),
          listTheoDoi: res?.listUsersTheoDoi?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC,
            url: user?.avatarUser,
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

  return (
    <div>
      <div className={styles.header}>
        <Image src={'/back-w.png'} alt='' width={24} height={24}></Image>
        <p className={styles.headerText}>Đề xuất hoa hồng doanh thu </p>
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
            <Col md={6} sm={12} xs={24}>
              {MyInput(
                'Thành viên đề xuất',
                'Vũ Văn Khá',
                false,
                true,
                'name',
                '',
                true,
                '#EDF3FF'
              )}
            </Col>
            <Col md={6} sm={12} xs={24}>
              {MyInput(
                'Loại đề xuất',
                'Đề xuất hoa hồng doanh thu',
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
                'Chu kì',
                'Chọn chu kì',
                true,
                true,
                'chu_ky',
                'month',
                '#EDF3FF'
              )}
            </Col>
            <Col md={6} sm={12} xs={24}>
              {MyInputMoney(
                'Doanh thu theo thời điểm',
                'Nhập số tiền',
                true,
                true,
                'dt_money_mdt'
              )}
            </Col>
            <Col md={6} sm={12} xs={24}>
              {MyDatePicker('', '', false, true, 'time_hh')}
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name='dt_money'
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập tổng doanh thu của bạn!`,
                  },
                ]}
                label={<p>Tổng doanh thu</p>}
                labelCol={{ span: 24 }}>
                {/* <div className={styles.sumMoney}> */}
                <Input className={styles.sumMoney} type='number' />
                {/* </div> */}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                'Mức doanh thu',
                'Chọn mức doanh thu',
                true,
                true,
                'name_dt',
                [
                  { label: 'Dưới 1TR', value: 1 },
                  { label: 'Trên 1TR', value: 2 },
                ]
              )}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name='ly_do'
                required={true}
                title='Lý do đề xuất hoa hồng doanh thu'
                hasLabel={true}
                placeholder='Nhập lý do đề xuất hoa hồng doanh thu'
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
          </Row>
        </div>
      </Form>
      {DeXuatCongCongFooter(handleSubmit, () => null)}
    </div>
  )
}
