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
import { POST, POST_VT, getCompIdCS, getInfoUser } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DXFileInput } from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'

export default function DeXuatNhapNgayNhanLuong() {
  const [fileData, setFileData] = useState<any>()

  const router = useRouter()
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
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

      POST_VT('api/vanthu/dexuat/addDXNNNL', fd).then((res) => {
        alert('Tạo đề xuất nhập ngày nhận lương thành công!')
        router.reload()
      })
    })
  }

  const [infoUser, setInfoUser] = useState<any>()
  const [listDuyet, setListDuyet] = useState<any>({})
  const [depLabel, setDepLabel] = useState<any>([])

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
    let com_id = null
    com_id = getCompIdCS()

    com_id !== null &&
      POST('api/qlc/department/list', {
        com_id: com_id,
      }).then((res) => {
        if (res?.result === true) {
          setDepLabel(
            res?.items?.map((dep) => ({
              label: dep?.dep_name,
              value: dep?.dep_id,
            }))
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
        <p className={styles.headerText}>Đề xuất nhập ngày nhận lương</p>
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
                'Đề xuất nhập này nhận lương',
                false,
                true,
                'type_dx',
                '',
                true,
                '#EDF3FF'
              )}
            </Col>
            <Col sm={12} xs={24} className={styles.addElement}></Col>
            <Col sm={12} xs={24}>
              {MySelect(
                'Phòng ban',
                'Chọn phòng ban',
                true,
                true,
                'phong_ban',
                depLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker(
                'Ngày nhận lương',
                'Chọn ngày nhận lương',
                true,
                true,
                'ngay_nhan_luong'
              )}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name='ly_do'
                required={true}
                title='Lý do đề xuất nhận lương'
                hasLabel={true}
                placeholder='Nhập lý do đề xuất nhận lương'
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
              <DXFileInput setFileData={setFileData} />
              {/* {MyInputFile(
                "Tài liệu dính kèm",
                "Thêm tài liệu đính kèm",
                true,
                true,
                "file_kem"
              )} */}
            </Col>
          </Row>
        </div>
        {DeXuatCongCongFooter(handleSubmit, () => null)}
      </Form>
    </div>
  )
}
