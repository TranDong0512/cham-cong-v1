import Image from 'next/image'
import { MyTable } from '../table/Table'
import styles from './DanhSachTo.module.css'
import { useEffect, useState } from 'react'
import { Col, Row, Select } from 'antd'
import { MySelect } from '../../quan-ly-cong-ty-con/modal'
import { AddButton, SearchButton } from '@/components/commons/Buttons'
import { AddNewToModal, ConfirmDeleteModal, EditToModal } from './modal/Modals'
import { useRouter } from 'next/router'
import { POST, getCompIdCS } from '@/pages/api/BaseApi'

export function DanhSachTo({ infoCom }: { infoCom: any }) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openConfirmDel, setOpenConfirmDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [openAddNew, setOpenAddNew] = useState(false)
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [company, setCompany]: any = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  })
  const [listDepLabel, setListDepLabel]: any[] = useState()

  // fetch data
  useEffect(() => {
    const com_id = getCompIdCS()
    const fetchData = async () => {
      const res = await Promise.all([
        POST('api/qlc/department/list', { com_id: com_id }),
        POST('api/qlc/team/list', { com_id: com_id }),
      ])

      // set dep data
      if (res?.[0]?.result) {
        setListDepLabel(
          res?.[0]?.items?.map((dep) => ({
            label: dep?.dep_name,
            value: dep?.dep_id,
          }))
        )
      }

      // set team data
      if (res?.[1]?.result) {
        setData(res?.[1]?.data)
        setFilterData(res?.[1]?.data)
      }
    }

    fetchData()
  }, [])

  const columns = [
    {
      title: <p className={styles.headerTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Tên tổ</p>,
      render: (record: any, index: any) => (
        <p style={{ color: '#4c5bd4' }}>{record?.team_name}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Tổ trưởng</p>,
      render: (record: any, index: any) => (
        <p>{record?.manager || 'Chưa cập nhật'}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Phó tổ trưởng</p>,
      render: (record: any, index: any) => (
        <p>{record?.deputy || 'Chưa cập nhật'}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any, index: any) => (
        <p>{record?.dep_name || 'Chưa cập nhật'}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Số lượng nhân viên</p>,
      render: (record: any, index: any) => <p>{record?.total_emp || 0}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Chức năng</p>,
      render: (record: any, index: any) => (
        <div className={styles.actionGroup}>
          <Image
            alt='/'
            src={'/edit.png'}
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedRow(record)
              setOpenEdit(true)
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt='/'
            src={'/delete-icon.png'}
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedRow(record)
              setOpenConfirmDel(true)
            }}
          />
        </div>
      ),
    },
  ]

  const navigateToDetailTo = (id: string, name: string) => {
    router.push({
      pathname: `${router.pathname}/chi-tiet-to/${id}`,
      query: {
        name: name,
      },
    })
  }

  const [listDataFiltered, setListDataFiltered] = useState([])
  const [teamIdFilter, setTeamIdFilter]: any = useState<any>()
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
    if (teamIdFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.team_id === teamIdFilter)
      )
    }
  }

  const handleChangeTeam = (value: any, option: any) => {
    // setTeamIdFilter(value)
    setFilterData(
      value === 'all' ? data : data?.filter((item) => item?.team_id === value)
    )
  }

  const handleChangeDep = (value: any, option: any) => {
    // setDepFilter(option)
    setFilterData(
      value === 'all' ? data : data?.filter((item) => item?.dep_id === value)
    )
  }

  return (
    <div>
      <Row gutter={{ lg: 15, md: 20, sm: 20 }}>
        <Col lg={10} md={11} sm={12} xs={24}>
          <Row gutter={20}>
            <Col sm={24} xs={24}>
              <div>
                <Select
                  size='large'
                  options={[company]}
                  defaultValue={company}
                  disabled
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              </div>
            </Col>
            <Col sm={24} xs={24} className={styles.hiddenBefore}>
              <div>
                {MySelect(
                  '',
                  'Chọn phòng ban',
                  false,
                  false,
                  'dep_id',
                  listDepLabel,
                  null,
                  () => null,
                  handleChangeDep
                )}
              </div>
            </Col>
            <Col sm={24} xs={24}>
              <div>
                {MySelect(
                  '',
                  'Chọn tổ',
                  false,
                  false,
                  'team_id',
                  [
                    { label: 'Tất cả tổ', value: 'all' },
                    ...data?.map((team) => ({
                      label: team?.team_name,
                      value: team?.team_id,
                    })),
                  ],
                  null,
                  handleChangeTeam
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={14} md={13} sm={12} xs={24}>
          <Row
            gutter={{ lg: 15, md: 20, sm: 20, xs: 10 }}
            justify={'end'}
            style={{ display: 'flex', justifyContent: 'end' }}>
            <Col lg={19} md={17} sm={24} xs={24}>
              <div className={styles.hiddenAfter}>
                {MySelect(
                  '',
                  'Chọn phòng ban',
                  false,
                  false,
                  'dep_id',
                  [
                    { value: 'all', label: 'Tất cả phòng ban' },
                    ...(listDepLabel ? listDepLabel : []),
                  ],
                  null,
                  () => null,
                  handleChangeDep
                )}
              </div>
            </Col>
            <Col lg={5} md={7}>
              <div>{SearchButton('Tìm kiếm', handleFilter, false)}</div>
            </Col>
            <Col lg={5} md={7}>
              <div>{AddButton('Thêm mới', () => setOpenAddNew(true))}</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <MyTable
        colunms={columns}
        data={filterData}
        onRowClick={(record, index) =>
          navigateToDetailTo(record?.team_id, record?.teamName)
        }
        Footer={null}
        hasRowSelect={false}
        onSelectChange={() => null}
        rowKey='_id'
        selectedRowKeys={null}
      />
      {AddNewToModal(
        openAddNew,
        setOpenAddNew,
        listDepLabel,
        data,
        setData,
        company,
        listDepLabel
      )}
      {EditToModal(openEdit, setOpenEdit, data, setData, selectedRow)}
      {ConfirmDeleteModal(
        openConfirmDel,
        setOpenConfirmDel,
        selectedRow ? selectedRow['name'] : '',
        data,
        setData,
        selectedRow
      )}
    </div>
  )
}
