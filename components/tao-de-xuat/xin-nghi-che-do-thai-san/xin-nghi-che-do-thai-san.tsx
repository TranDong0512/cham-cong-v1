import { Button, Col, Form, Input, Row, Select } from 'antd'
import styles from './xin-nghi-che-do-thai-san.module.css'
import {
  IconSelect,
  Tep,
} from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'
import { DXFileInput } from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'
const loainghiphep = [
  {
    value: 1,
    label: 'Không lương',
  },
  {
    value: 2,
    label: 'Có lương',
  },
]
export const XinNghiCheDoThaiSan: any = () => {
  const { TextArea } = Input
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectTheoDoi, setSelectTheoDoi] = useState<string[]>([])
  const [fileData, setFileData] = useState<any>()
  const router = useRouter()
  const [form] = Form.useForm()

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        ngaybatdau_nghi_ts: dayjs(value['ngaybatdau_nghi_ts']).unix(),
        ngayketthuc_nghi_ts: dayjs(value['ngayketthuc_nghi_ts']).unix(),
      }
      delete body['file_kem']

      // console.log(body);
      const fd = new FormData()

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k])
      })

      if (fileData) {
        fd.append('file_kem', fileData)
      }

      POST_VT('api/vanthu/dexuat/addDxTs', fd).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất nghỉ thai sản thành công!')
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
    <div className={styles.khung}>
      <div className={styles.header}>
        <div className={styles.iconheader} onClick={() => router.back()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='22'
            viewBox='0 0 12 22'
            fill='none'>
            <path
              d='M10.5996 1.66189L1.12587 11.1356L10.5996 20.6094'
              stroke='white'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
        <p className={styles.textheader}>Đề xuất xin nghỉ chế độ thai sản</p>
      </div>
      <div className={`shadowForm  ${styles.body}`}>
        <Form
          form={form}
          className={`${styles.bodyform} mc taoDeXuatForm`}
          initialValues={{ name: 'Khas' }}>
          <Row gutter={24} className={styles.body1}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'name_dx'}
                className={styles.bodyk1}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Tên đề xuất</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  className={styles.input}
                  placeholder='Nhập tên đề xuất'
                  size='large'
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'name'}
                className={styles.bodyk2}
                label={
                  <div>
                    <p className={styles.text}>Họ và tên</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  style={{ backgroundColor: '#EDF3FF' }}
                  className={styles.input}
                  defaultValue='Vu Van Kha'
                  disabled
                  size='large'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body2}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'type_nghi'}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Loại nghỉ phép</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  defaultValue={1}
                  options={loainghiphep}
                  size='large'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'type_dx'}
                className={styles.bodyk2}
                label={
                  <div>
                    <p className={styles.text}>Loại đề xuất</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  style={{ backgroundColor: '#EDF3FF' }}
                  className={styles.input}
                  defaultValue='Đề xuất xin nghỉ chế độ thai sản'
                  disabled
                  size='large'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body3}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'ngaybatdau_nghi_ts'}
                className={styles.bodyk1}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Thời gian nghỉ từ ngày</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input className={styles.input} size='large' type='date' />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'ngayketthuc_nghi_ts'}
                className={styles.bodyk1}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Đến ngày</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input className={styles.input} size='large' type='date' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} className={styles.body1}>
            <Col sm={24} xs={24}>
              <Form.Item
                name={'ly_do'}
                className={styles.bodyd}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>
                      Lý do đề xuất xin nghỉ chế độ thai sản
                    </p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <TextArea
                  style={{ resize: 'none' }}
                  className={styles.input}
                  rows={5}
                  placeholder='Nhập lý do đề xuất xin nghỉ chế độ thai sản'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body5}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'id_user_duyet'}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người xét duyệt</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={styles.input}
                  placeholder='Chọn người xét duyệt'
                  optionFilterProp="label"
                  options={listDuyet?.listDuyet}
                  size='large'
                  mode='multiple'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'id_user_theo_doi'}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người theo dõi</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  placeholder='Chọn người theo dõi'
                  optionFilterProp="label"
                  options={listDuyet?.listTheoDoi}
                  size='large'
                  mode='multiple'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body6}>
            <Col sm={12} xs={24}>
              <DXFileInput setFileData={setFileData} />
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.footer}>
        <Button className={styles.huy}>
          <p className={styles.texthuy}>Hủy</p>
        </Button>
        <Button className={styles.tao} onClick={handleSubmit}>
          <p className={styles.texttao}>Tạo đề xuất</p>
        </Button>
      </div>
    </div>
  )
}
