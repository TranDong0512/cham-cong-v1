import {
  ADD_ICON,
  DEL_ICON,
  DXFileInput,
  DXInputMoney,
  DXTextArea,
  DxDatePicker,
  DxInputTxt,
  DxSelect,
  TaoDeXuatWrapper,
} from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'
import { Button, Col, Form, Input, Row, Table } from 'antd'
import { ColumnType, ColumnsType } from 'antd/es/table'
import styles from './index.module.css'
import { useEffect, useState } from 'react'
import { POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'

export default function DeXuatSuaChuaCSVC() {
  const [fileData, setFileData] = useState<Blob>()
  const [form] = Form.useForm()
  const router = useRouter()
  form.setFieldValue('type_dx', 'Đề xuất sửa chữa cơ sở vật chất')

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   id_user_duyet: value["id_user_duyet"]?.join(","),
      //   id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      // });

      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        input_csv: JSON.stringify(value['input_csv']),
      }
      // console.log(body);
      const fd = new FormData()

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k])
      })

      if (fileData) {
        fd.append('file_kem', fileData)
      }

      POST_VT('api/vanthu/dexuat/addDXVC', fd).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất sửa chữa cơ sở vật chất thành công!')
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
      <Form form={form} initialValues={{ name: 'Vũ Văn Khá' }}>
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
          <Col lg={6} md={12} sm={12} xs={24}>
            <DxInputTxt
              name='name'
              placeholder='Họ và tên'
              required
              title='Họ và tên'
              disabled
            />
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <DxInputTxt
              name='type_dx'
              placeholder='Loại đề xuất'
              required
              title='Loại đề xuất'
              disabled
            />
          </Col>

          <Col md={24} sm={24} xs={24} className={styles.tblWrapper}>
            <p className={styles.tblHeader}>Cơ sở vật chất cần sửa chữa</p>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.tbl}>
                <tr
                  style={{ backgroundColor: '#D9EAFF' }}
                  className={styles.header}>
                  <th className={styles.th}>
                    <p className={styles.txt}>STT</p>
                  </th>
                  <th>
                    <p className={styles.txt}>Tên</p>
                  </th>
                  <th>
                    <p className={styles.txt}>Lý do sửa chữa</p>
                  </th>
                  <th>
                    <p className={styles.txt}>Chi phí dự kiến</p>
                  </th>
                  <th>
                    <p className={styles.txt}>Xóa</p>
                  </th>
                </tr>
                <Form.List name={'input_csv'}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => {
                        return (
                          <tr key={key} className={styles.cusTr}>
                            <td>
                              <p className={styles.input}>{index + 1}</p>
                            </td>
                            <td>
                              <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                className={styles.input}>
                                <Input
                                  placeholder='Nhập tên tài sản'
                                  size='large'
                                />
                              </Form.Item>
                            </td>
                            <td>
                              <Form.Item
                                {...restField}
                                name={[name, 'reason']}
                                className={styles.input}>
                                <Input
                                  placeholder='Nhập lý do sửa chữa'
                                  size='large'
                                />
                              </Form.Item>
                            </td>
                            <td>
                              <Form.Item
                                {...restField}
                                name={[name, 'amount']}
                                className={styles.input}>
                                <Input
                                  placeholder='Nhập chi phí dự kiến'
                                  size='large'
                                  suffix='VNĐ'
                                />
                              </Form.Item>
                            </td>
                            <td>
                              <div
                                className={styles.input}
                                onClick={() => remove(name)}>
                                <DEL_ICON />
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                      <Form.Item>
                        <div
                          onClick={() => add()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 'max-content',
                            marginLeft: '10px',
                            marginTop: '10px',
                          }}>
                          <ADD_ICON />
                          <p style={{ color: '#4C5BD4', marginLeft: '8px' }}>
                            Thêm dòng
                          </p>
                        </div>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </table>
            </div>
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name='ly_do'
              placeholder='Nhập lý do đề xuất sửa chữa cơ sở vật chất'
              required
              title='Lý do đề xuất sửa chữa cơ sở vật chất'
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
      header='Đề xuất sửa chữa cơ sở vật chất'
      onCreateClicked={handleSubmit}>
      <MyForm />
    </TaoDeXuatWrapper>
  )
}
