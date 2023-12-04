import { Button, Col, Form, Input, Row, Select } from 'antd'
import styles from './tham-gia-du-an.module.css'
import {
  IconSelect,
  Tep,
} from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DXFileInput } from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'
import { POST, POST_VT, getCompIdCS, getInfoUser } from '@/pages/api/BaseApi'
import { getPosition } from '@/utils/function'

export const ThamGiaDuAn: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [form] = Form.useForm()
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  const router = useRouter()
  const { TextArea } = Input
  const [selectedItems, setSelectedItems] = useState('')
  const [selectTheoDoi, setSelectTheoDoi] = useState<string[]>([])

  const handalSubmit = () => {
    form.validateFields().then((value) => {
      const formData = new FormData()
      if (fileData) {
        formData.append('file_kem', fileData)
      }
      formData.append('name_dx', form.getFieldValue('name_dx'))
      formData.append(
        'id_user_duyet',
        form.getFieldValue('id_user_duyet')?.join(',')
      )
      formData.append(
        'id_user_theo_doi',
        form.getFieldValue('id_user_theo_doi')?.join(',')
      )
      formData.append('ly_do', form.getFieldValue('ly_do'))
      formData.append('cv_nguoi_da', form.getFieldValue('cv_nguoi_da'))
      formData.append('pb_nguoi_da', form.getFieldValue('pb_nguoi_da'))
      formData.append('dx_da', form.getFieldValue('dx_da'))
      POST_VT('api/vanthu/dexuat/De_Xuat_Tham_Gia_Du_An', formData).then(
        (res) => {
          // console.log(res)
          alert('Tạo đề xuất tham gia dự án thành công!')
          router.replace(router.asPath)
        }
      )
    })
  }

  const [infoUser, setInfoUser] = useState<any>()
  const [listDuyet, setListDuyet] = useState<any>({})
  const [depLabel, setDepLabel] = useState<any>([])
  const [fileData, setFileData] = useState<any>([])

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

  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }))

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
        <p className={styles.textheader}>Đề xuất tham gia dự án</p>
      </div>
      <div className={`shadowForm  ${styles.body}`}>
        <Form
          className={`${styles.bodyform} mc taoDeXuatForm`}
          onFinish={handalSubmit}>
          <Row gutter={24} className={styles.body1}>
            <Col sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                name='name_dx'
                className={styles.bodyk1}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Tên đề xuất</p>
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
            <Col md={6} xs={24} sm={12}>
              <Form.Item
                name='x'
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
            <Col md={6} xs={24} sm={12}>
              <Form.Item
                name='y'
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
                  defaultValue='Đề xuất tham gia dự án'
                  disabled
                  size='large'
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className={styles.pbbackup}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                name={'pb_nguoi_da'}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Phòng ban</p>
                  </div>
                }
                labelCol={{ span: 24 }}
                style={{ width: '100%' }}>
                <Select
                  className={styles.input}
                  optionFilterProp="label"
                  placeholder='Chọn phòng ban'
                  options={depLabel}
                  onChange={handleChange}
                  size='large'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body2}>
            <Col sm={12} xs={24} className={styles.bodya1}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Phòng ban</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={styles.input}
                  placeholder='Chọn phòng ban'
                  optionFilterProp="label"
                  options={depLabel}
                  onChange={handleChange}
                  size='large'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                name={'cv_nguoi_da'}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Chức vụ</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  optionFilterProp="label"
                  placeholder='Chọn chức vụ'
                  options={positionLabel}
                  size='large'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className={styles.dabackup}>
              <Form.Item
                className={styles.bodyc}
                name={'dx_da'}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Dự án đề xuất tham gia</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  className={styles.input}
                  placeholder='Nhập dự án đề xuất tham gia'
                  size='large'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body3}>
            <Col sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                className={styles.bodyc}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Dự án đề xuất tham gia</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  className={styles.input}
                  placeholder='Nhập dự án đề xuất tham gia'
                  size='large'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} className={styles.body1}>
            <Col sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                className={styles.bodyd}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Lý do đề xuất tham gia dự án</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <TextArea
                  style={{ resize: 'none' }}
                  className={styles.input}
                  rows={5}
                  placeholder='Nhập lý do đề xuất tham gia dự án'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body5}>
            <Col sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                name={'id_user_duyet'}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người xét duyệt</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={styles.input}
                  placeholder='Chọn người xét duyệt'
                  optionFilterProp="label"
                  options={listDuyet?.listDuyet}
                  onChange={setSelectedItems}
                  size='large'
                  value={selectedItems}
                  mode='multiple'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                name={'id_user_theo_doi'}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người theo dõi</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  placeholder='Chọn người theo dõi'
                  optionFilterProp="label"
                  options={listDuyet?.listTheoDoi}
                  onChange={setSelectTheoDoi}
                  size='large'
                  value={selectTheoDoi}
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
        <Button className={styles.tao} htmlType='submit'>
          <p className={styles.texttao}>Tạo đề xuất</p>
        </Button>
      </div>
    </div>
  )
}
