import { Card, Table, Button, Select, Row, Col, Form } from 'antd'
import { useState, useEffect } from 'react'
import {
  MyTable2,
  mySelect,
} from '@/components/cham-cong/duyet-thiet-bi/duyet-thiet-bi'
import styles from './duyet-thiet-bi.module.css'
import { POST, POST_SS, getCompIdSS } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import { modalNhapLaiMat } from '@/components/cham-cong/nhap-lai-mat/modal'

export default function DuyetThietBi({
  infoCom,
  listDepartments,
  listEmps,
  listDevices,
}) {
  const router = useRouter()
  const [listAccept, setListAccept] = useState([])
  const [comLabel, setComLabel]: any = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  })
  const [listDepLabel, setListDepLabel]: any = useState(
    listDepartments?.items?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  )
  const [listEmpLabel, setListEmpLabel] = useState(
    listDevices?.data?.map((emp) => ({
      label: emp?.userName,
      value: emp?.idQLC,
    }))
  )
  const [data, setData] = useState(
    listDevices?.data?.map((emp) => {
      const empData = listEmps?.items?.map((e) => e?.idQLC === emp?.idQLC)

      return {
        key: emp?.ed_id,
        url: empData?.avatarUser
          ? `/${empData?.avatarUser}`
          : '/anhnhanvien.png',
        name: emp?.userName,
        room: empData?.nameDeparment || 'Chưa cập nhật',
        equipment: emp?.current_device_name || 'Chưa cập nhật',
        newEquipment: emp?.new_device_name || 'Chưa cập nhật',
        ep_id: emp?.idQLc,
        status: emp?.new_device ? 1 : 0,
      }
    })
  )

  const [listDataFiltered, setListDataFiltered] = useState([])
  const [epIdFilter, setEpIdFilter]: any = useState<any>()
  const [depFilter, setDepFilter]: any = useState<any>()
  useEffect(() => {
    setListDataFiltered(data)
  }, [data])

  useEffect(() => {
    if (!depFilter) {
      setListDataFiltered(data)
    }
  }, [depFilter])

  const handleFilter = () => {
    if (depFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.dep_name === depFilter?.label)
      )
    }
    if (epIdFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.idQLC === epIdFilter)
      )
    }
  }

  const handleChangeEp = (value: any, option: any) => {
    setEpIdFilter(value)
  }

  const handleChangeDep = (value: any, option: any) => {
    setDepFilter(option)
  }

  const duyetThietBi = () => {
    // console.log(listAccept?.join(","));
    POST('api/qlc/checkdevice/add', { ed_id: listAccept?.join(',') }).then(
      (res) => console.log(res)
    )

    setModalState(true)
  }

  const [modalState, setModalState] = useState(false)
  const [typeModal, setTypeModal] = useState('')
  return (
    <Card>
      <div className={styles.body}>
        <div
          style={{
            marginBottom: '20px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#474747',
          }}
          className={styles.tieuDe}>
          Danh sách thiết bị
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Form>
            <Row
              gutter={[20, 5]}
              justify={{ xs: 'center', sm: 'start', md: 'start' }}>
              <Col xl={7} md={12} sm={12} xs={24}>
                {mySelect(false, '', 'Chọn công ty', true, false, 'congTy', [
                  comLabel,
                ])}
              </Col>
              <Col xl={6} md={12} sm={12} xs={24}>
                {mySelect(
                  false,
                  '',
                  'Phòng ban(tất cả)',
                  true,
                  false,
                  'dep_id',
                  listDepLabel,
                  handleChangeDep
                )}
              </Col>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                {mySelect(
                  true,
                  '',
                  'Nhập tên cần tìm',
                  true,
                  false,
                  'ep_id',
                  listEmpLabel,
                  handleChangeEp
                )}
              </Col>
              <Col lg={3} sm={4} xs={8}>
                <Form.Item name={'filter'}>
                  <Button
                    className={styles.buttons}
                    size='large'
                    onClick={handleFilter}>
                    <p className={styles.txt}>Lọc</p>
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ marginBottom: '20px' }}>
          {MyTable2(
            listDataFiltered,
            setListAccept,
            setModalState,
            setTypeModal
          )}
        </div>
        <Row justify='center'>
          <Col lg={3} sm={4} xs={7}>
            <Button className={styles.buttons} size='large'>
              <p className={styles.txt} onClick={duyetThietBi}>
                Duyệt
              </p>
            </Button>
          </Col>
        </Row>
      </div>
      {modalNhapLaiMat(
        modalState,
        setModalState,
        typeModal === 'checkAll'
          ? 'Tất cả nhân viên đã được duyệt thiết bị khi chấm công'
          : 'Các nhân viên vừa chọn đã được duyệt thiết bị chấm công',
        router
      )}
    </Card>
  )
}

export const getServerSideProps = async (context) => {
  const infoCom = await POST_SS('api/qlc/company/info', {}, context)
  let com_id = null
  com_id = getCompIdSS(context)

  const listDepartments = await POST_SS(
    'api/qlc/department/list',
    {
      com_id: com_id,
    },
    context
  )

  const listEmps = await POST_SS(
    'api/qlc/managerUser/list',
    { com_id: com_id },
    context
  )

  const listDevices = await POST_SS(
    'api/qlc/checkdevice/list',
    { com_id: com_id },
    context
  )

  return {
    props: {
      infoCom,
      listDepartments,
      listEmps,
      listDevices,
    },
  }
}
