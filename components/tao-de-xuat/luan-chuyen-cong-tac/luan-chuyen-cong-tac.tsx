import { Button, Col, Form, Input, Row, Select } from 'antd'
import styles from './luan-chuyen-cong-tac.module.css'
import {
  IconSelect,
  Tep,
} from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  POST,
  POST_SS,
  POST_VT,
  getCompIdCS,
  getInfoUser,
} from '@/pages/api/BaseApi'
import { result } from 'lodash'
import { DXFileInput } from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'
import { getPosition } from '@/utils/function'

export const LuanChuyenCongTac: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null) // State to store the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0]
    setSelectedFile(file)
    // You can also update the form field value if needed
    form.setFieldsValue({
      fileKem: file,
    })
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  const [form] = Form.useForm()
  const router = useRouter()
  const { TextArea } = Input
  const [selectedItems, setSelectedItems] = useState('')

  const [selectTheoDoi, setSelectTheoDoi] = useState('')
  const Router = useRouter()

  const handalSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   id_user_duyet: form.getFieldValue('id_user_duyet')?.join(','),
      //   fileKem: new FormData(),
      // });
      // console.log(form.getFieldValue('id_user_duyet')?.join(','));
      const formData = new FormData()
      formData.append('fileKem', selectedFile)
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
      formData.append('cv_nguoi_lc', form.getFieldValue('cv_nguoi_lc'))
      formData.append('pb_nguoi_lc', form.getFieldValue('pb_nguoi_lc'))
      formData.append('noi_cong_tac', form.getFieldValue('noi_cong_tac'))
      formData.append('noi_chuyen_den', form.getFieldValue('noi_chuyen_den'))
      POST_VT('api/vanthu/dexuat/De_Xuat_Luan_Chuyen_Cong_Tac', formData).then(
        (res) => {
          alert('Tạo đề xuất luân chuyển công tác thành công!')
          router.reload()
        }
      )
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
        <p className={styles.textheader}>Đề xuất luân chuyển công tác</p>
      </div>
      <div className={`shadowForm  ${styles.body}`}>
        <Form
          form={form}
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
            <Col xl={6} xs={24} sm={12}>
              <Form.Item
                name='name'
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
            <Col xl={6} xs={24} sm={12}>
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
                  defaultValue='Đề xuất luân chuyển công tác'
                  disabled
                  size='large'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body2}>
            <Col sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                name='pb_nguoi_lc'
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Phòng ban</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
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
            <Col sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền thông tin',
                  },
                ]}
                name='cv_nguoi_lc'
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Chức vụ</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  placeholder='Chọn chức vụ'
                  optionFilterProp="label"
                  options={positionLabel}
                  size='large'
                  suffixIcon={<IconSelect />}
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
                name='noi_cong_tac'
                className={styles.bodyc}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Nơi công tác</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  className={styles.input}
                  placeholder='Nhập nơi đang công tác'
                  size='large'
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
                name='noi_chuyen_den'
                className={styles.bodyc}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Nơi xin chuyển đến</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  className={styles.input}
                  placeholder='Nhập nơi xin chuyển đến'
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
                name='ly_do'
                className={styles.bodyd}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>
                      Lý do đề xuất luân chuyển công tác
                    </p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <TextArea
                  style={{ resize: 'none' }}
                  className={styles.input}
                  rows={5}
                  placeholder='Nhập lý do đề xuất luân chuyển công tác'
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
                name='id_user_duyet'
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
                name='id_user_theo_doi'
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
              <DXFileInput />
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.footer}>
        <Button className={styles.huy}>
          <p className={styles.texthuy}>Hủy</p>
        </Button>
        <Button className={styles.tao} onClick={handalSubmit}>
          <p className={styles.texttao}>Tạo đề xuất</p>
        </Button>
      </div>
    </div>
  )
}
