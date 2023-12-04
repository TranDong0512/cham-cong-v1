import { Button, Col, Form, Popover, Row, Table } from 'antd'
import { MyTable } from '../../quan-ly-phong-ban/table/Table'
import { MySeachBar, MySelect } from '../../quan-ly-cong-ty-con/modal'
import styles from './NhanVienChoDuyet.module.css'
import Image from 'next/image'
import { SearchButton } from '@/components/commons/Buttons'
import { useEffect, useState } from 'react'
import { ConfirmDuyetModal } from './modal/modal'
import { getPosition } from '@/utils/function'
import { POST } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { ModalWrapper } from '@/components/modal/ModalWrapper'
import { getOrganizeDetail, getSettingOrganize } from '@/utils/BaseApi'
import { removeVietnameseTones } from '@/constants/style-constants'

export function NhanVienChoDuyet({ listStaffs, comLabel }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [openDuyetModal, setOpenDuyetModal] = useState(false)
  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }))
  const [data, setData] = useState(listStaffs)
  // console.log(comLabel)

  const [listEmpLabel, setListEmpLabel] = useState<any>(
    listStaffs?.map((e) => ({
      label: `${e?.ep_id} - ${e?.ep_name}`,
      value: e?.ep_id,
      labelNoVN: removeVietnameseTones(`${e?.ep_id} - ${e?.ep_name}`),
    }))
  )
  const [listDataFiltered, setListDataFiltered] = useState(listStaffs)

  useEffect(() => {
    setListDataFiltered(data)
  }, [data])

  useEffect(() => {
    setData(listStaffs)
    setListEmpLabel(
      listStaffs?.map((e) => ({ label: e?.ep_name, value: e?.ep_id }))
    )
  }, [listStaffs])

  const router = useRouter()

  const columns = [
    {
      title: <p className='tableHeader'>Ảnh</p>,
      render: (record: any) => (
        <Image
          alt='/'
          src={record?.avatarUser ? `/${record?.avatarUser}` : '/avatar.png'}
          width={46}
          height={46}
        />
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Họ và tên (ID)</p>,
      render: (record: any) => (
        <div>
          <p>{record?.ep_name}</p>
          <p style={{ textAlign: 'center' }}>({record?.ep_id})</p>
        </div>
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Phòng ban</p>,
      render: (record: any) => (
        <p>{record?.dep_name ? record?.dep_name : 'Chưa cập nhật'}</p>
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Chức vụ</p>,
      render: (record: any) => (
        <p>
          {positionLabel?.find((p) => p?.value === record?.position_id)
            ?.label || 'Chưa cập nhật'}
        </p>
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Email</p>,
      render: (record: any) => (
        <p>{record?.ep_email || record?.ep_emailContact || 'Chưa cập nhật'}</p>
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>SĐT</p>,
      render: (record: any) => (
        <p>{record?.ep_phone || record?.ep_phoneTK || 'Chưa cập nhật'}</p>
      ),
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ]
  const duyet = async () => {
    if (selectedRowKeys?.length > 0) {
      const res = await POST('api/qlc/managerUser/verifyListUsers', {
        listUsers: selectedRowKeys?.toString(),
      })
      console.log(res)
      setOpenDuyetModal(true)
    }
  }

  const xoa = async () => {
    const res = await POST('api/qlc/managerUser/delListUsers', {
      listIds: selectedRowKeys?.toString(),
    })
    console.log(res)
    if (res?.result) {
      window.alert('Xóa thành công')
      router.reload()
    }
    // setOpenDuyetModal(true)
  }

  const [form] = Form.useForm()

  const onFinish = async () => {
    const value = form.getFieldsValue()

    let body = {}

    if (value?.orgDetail) {
      const orgDetail = orgDetailList.find(
        (item) => item?.id === value?.orgDetail
      )?.listOrganizeDetailId

      body['organizeDetailId'] = orgDetail
    }

    if (value?.ep_id) {
      body['ep_id'] = value?.ep_id
    }

    if (value?.type) {
      body['type'] = value?.type
    }

    const res = await POST('api/qlc/managerUser/listAllPending', body)

    if (res?.result) {
      setListDataFiltered(res?.items)
    }
  }

  const [confirmOpen, setConfirmOpen] = useState(false)

  // const [selectedOrgId, setSelectedOrgId] = useState()
  const [orgList, setOrgList] = useState([])
  const [orgDetailList, setOrgDetailList] = useState([])

  // useEffect(() => {
  //   const getOrgList = async () => {
  //     const res = await getSettingOrganize()
  //     setOrgList(res)
  //   }

  //   getOrgList()
  // }, [])

  useEffect(() => {
    const getOrgDetail = async () => {
      const res = await getOrganizeDetail()

      setOrgDetailList(res)
    }

    getOrgDetail()
  }, [])

  return (
    <div>
      <div>
        <Form form={form}>
          <Row gutter={[20, 0]}>
            {/* <Col lg={7} sm={12} xs={24} defaultValue={comLabel?.value}>
              {MySelect(
                '',
                'Chọn cơ cấu',
                false,
                false,
                'orgId',
                [
                  { label: 'Tất cả', value: 'all' },
                  ...orgList.map((item) => ({
                    label: item?.organizeName,
                    value: item?.id,
                  })),
                ],
                'all',
                (val) => {
                  form.resetFields(['orgDetail'])
                },
                () => null,
                false
              )}
            </Col> */}
            <Col lg={8} sm={12} xs={24}>
              <Form.Item name={'dep_id'}>
                {MySelect(
                  'Phòng ban',
                  'Chọn tổ chức',
                  false,
                  false,
                  'orgDetail',
                  orgDetailList?.map((item) => ({
                    label: item?.organizeDetailName,
                    value: item?.id,
                  })),
                  undefined
                )}
              </Form.Item>
            </Col>
            <Col lg={8} sm={12} xs={24} className={styles.inputName}>
              <Form.Item name={'ep_id'}>
                {MySelect(
                  'Nhân viên',
                  'Nhập tên cần tìm',
                  false,
                  false,
                  'ep_id',
                  listEmpLabel,
                  undefined
                )}
              </Form.Item>
            </Col>
            <Col lg={8} sm={12} xs={24} className={styles.inputName}>
              <Form.Item name={'type'} initialValue={0}>
                {MySelect(
                  '',
                  'Nhập điều kiện tìm kiếm',
                  false,
                  false,
                  'type',
                  [
                    {
                      label: 'Tất cả nhân viên',
                      value: 0,
                    },
                    {
                      label: 'Nhân viên đã xác thực OTP',
                      value: 1,
                    },
                    {
                      label: 'Nhân viên chưa xác thực OTP',
                      value: 2,
                    },
                    // {
                    //   label: 'Nhân viên đăng ký lỗi',
                    //   value: 3,
                    // },
                  ],
                  0
                )}
              </Form.Item>
            </Col>
            <Col lg={4} sm={12} xs={12} className={styles.searchBtn} >
              {SearchButton('Tìm kiếm', onFinish, false)}
            </Col>

            <Col lg={0} sm={0} xs={24} className={styles.inputName}></Col>
            <Col
              lg={20}
              sm={24}
              xs={24}
              className={styles.searchBtn}
              style={{
                display: 'flex',
                // alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Button style={{ backgroundColor: '#4C5BD4' }} size='large'>
                <p
                  style={{ color: '#fff', padding: '0px 28px' }}
                  onClick={duyet}>
                  Duyệt
                </p>
              </Button>
              <Button
                style={{ backgroundColor: 'red', marginLeft: '10px' }}
                size='large'>
                <p
                  style={{ color: '#fff', padding: '0px 28px' }}
                  onClick={() => setConfirmOpen(true)}>
                  Xóa
                </p>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <MyTable
          colunms={columns}
          data={listDataFiltered}
          onRowClick={() => null}
          hasRowSelect={true}
          onSelectChange={(newSelectedRowKeys) =>
            setSelectedRowKeys(newSelectedRowKeys)
          }
          selectedRowKeys={selectedRowKeys}
          rowKey='ep_id'
          Footer={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}></div>
          }
        />
      </div>
      <ConfirmDuyetModal
        open={openDuyetModal}
        setOpen={setOpenDuyetModal}
        data={selectedRowKeys}
      />
      {ModalWrapper(
        confirmOpen,
        setConfirmOpen,
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
          Bạn có chắc muốn xóa
        </p>,
        450,
        'Xóa nhân viên',
        'Xác nhận',
        xoa
      )}
    </div>
  )
}
