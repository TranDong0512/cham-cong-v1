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
  MyInputMoney,
  MySelectAcp,
  MyTime,
} from '@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/de-xuat-cong-cong/de-xuat-cong-cong'
import { Col, Form, Radio, Row } from 'antd'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import { useEffect, useState } from 'react'

export default function DeXuatCongTruTien() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [infoUser, setInfoUser] = useState<any>()
  const [listDuyet, setListDuyet] = useState<any>({})

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //     ...value,
      //     id_user_duyet: value["id_user_duyet"]?.join(","),
      //     id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      //     time_tp: dayjs(value["time_tp"]).format("YYYY-MM-DD"),
      //   });

      POST_VT('api/vanthu/dexuat/addDXTP', {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        time_tp: dayjs(value['time_tp']).format('YYYY-MM-DD'),
      }).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất cộng/trừ tiền thành công!')
          router.replace(router.asPath)
        }
      })
    })
  }

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
        <p className={styles.headerText}>Đề xuất cộng tiền/trừ tiền</p>
      </div>
      <Form form={form} className='shadowForm taoDeXuatForm' initialValues={{ name: 'khas', type_tp: 1 }}>
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
                'Đề xuất cộng công',
                false,
                true,
                'type_dx',
                '',
                true,
                '#EDF3FF'
              )}
            </Col>
            <Col sm={24} xs={24}>
              <Form.Item name={'type_tp'}>
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>Cộng tiền</Radio>
                  <Radio value={2} style={{ marginLeft: '80px' }}>
                    Trừ tiền
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              {MyInputMoney(
                'Số tiền',
                'Nhập số tiền',
                true,
                true,
                'so_tien_tp'
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker('Ngày áp dụng', 'Chọn ngày', true, true, 'time_tp')}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name='ly_do'
                required={true}
                title='Lý do cộng/trừ tiền'
                hasLabel={true}
                placeholder='Nhập lý do cộng/trừ tiền'
              />
            </Col>
            <Col sm={12} xs={24}>
              {MySelectAcp(
                'Người xét duyệt',
                'Chọn người xét duyệt',
                true,
                true,
                'id_user_duyet',
                [{ value: 168, label: 'TEST' }]
                // listDuyet?.listDuyet
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
        {DeXuatCongCongFooter(handleSubmit, () => null)}
      </Form>
    </div>
  )
}
