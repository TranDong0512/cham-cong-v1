import {
  DXFileInput,
  DXInputMoney,
  DXTextArea,
  DxDatePicker,
  DxInputTxt,
  DxSelect,
  TaoDeXuatWrapper,
} from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'
import { POST, POST_VT, getCompIdCS, getInfoUser } from '@/pages/api/BaseApi'
import { getPosition } from '@/utils/function'
import { Col, Form, Row } from 'antd'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export default function DeXuatTangLuong() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [infoUser, setInfoUser] = useState<any>()
  const [listDuyet, setListDuyet] = useState<any>({})
  const [listEmp, setListEmp]: any = useState([])
  const [depLabel, setDepLabel]: any = useState<any>([])
  const [fileData, setFileData] = useState<Blob>()
  const [tvBoNhiem, setTvBoNhiem] = useState<any>(false)

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
    let com_id = null
    com_id = getCompIdCS()
    com_id !== null &&
      POST('api/qlc/managerUser/list', {
        com_id: com_id,
      }).then((res) => {
        if (res?.result === true) {
          setListEmp(res?.items);
        }
      })
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

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   id_user_duyet: value["id_user_duyet"]?.join(","),
      //   id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      // });
      const dep = depLabel?.find((dep) => dep?.label === value['name_ph_bn'])
      const po = positionLabel?.find(
        (dep) => dep?.label === value['chucvu_hientai']
      )
      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        name_ph_bn: dep?.value,
        chucvu_hientai: po?.value,
      }
      // console.log(body);

      const fd = new FormData()

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k])
      })

      if (fileData) {
        // console.log(fileData)

        fd.append('file_kem', fileData)
      }

      POST_VT('api/vanthu/dexuat/De_Xuat_Xin_Bo_Nhiem', fd).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất xin bổ nhiệm thành công!')
          router.replace(router.asPath)
        }
      })
    })
  }

  const handleSelectEmpAppointed = (value: any, option: any) => {
    const depName = depLabel?.find(
      (dep) => dep?.value === option?.dep_id
    )?.label
    form.setFieldValue('name_ph_bn', depName)
    const positionName = positionLabel?.find(
      (p) => p?.value === option?.position_id
    )?.label
    form.setFieldValue('chucvu_hientai', positionName)
    setTvBoNhiem(true)
  }

  const MyForm = () => {
    return (
      <Form
        form={form}
        initialValues={{
          name: 'Vũ Văn Khá',
          type_dx: 'Đề xuất bổ nhiệm',
          name_ph_bn: undefined,
          chucvu_hientai: undefined,
        }}>
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

          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti={false}
              name='thanhviendc_bn'
              options={listEmp?.map((e) => ({
                label: e?.userName,
                value: e?.idQLC,
                dep_id: e?.dep_id,
                position_id: e?.position_id,
              }))}
              placeholder='Chọn thành viên'
              required
              showSearch
              title='Thành viên được bổ nhiệm'
              handleChange={handleSelectEmpAppointed}
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name='name_ph_bn'
              placeholder='Phòng ban'
              required
              title='Phòng ban'
              disabled={tvBoNhiem}
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name='chucvu_hientai'
              placeholder='Chức vụ hiện tại'
              required
              title='Chức vụ hiện tại'
              disabled={tvBoNhiem}
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti={false}
              name='chucvu_dx_bn'
              options={positionLabel}
              placeholder='Chọn chức vụ bổ nhiệm'
              required
              showSearch
              title='Chức vụ đề xuất bổ nhiệm'
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti={false}
              name='phong_ban_moi'
              options={depLabel}
              placeholder='Chọn phòng ban'
              required
              showSearch
              title='Phòng ban mới'
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name='ly_do'
              placeholder='Nhập lý do đề xuất bổ nhiệm'
              required
              title='Lý do đề xuất bổ nhiệm'
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
    <TaoDeXuatWrapper header='Đề xuất bổ nhiệm' onCreateClicked={handleSubmit}>
      <MyForm />
    </TaoDeXuatWrapper>
  )
}
