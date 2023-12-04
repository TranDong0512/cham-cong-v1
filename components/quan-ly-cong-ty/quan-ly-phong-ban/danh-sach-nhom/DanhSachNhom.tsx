import { Col, Input, Row, Select, Table } from 'antd'
import styles from './DanhSachNhom.module.css'
import { AddButton, SearchButton } from '@/components/commons/Buttons'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AddNewModal, ConfirmDeleteModal, UpdateNhomModal } from './modal/modal'
import { MyTable } from '../table/Table'
import { useRouter } from 'next/router'
import { MySelect } from '../../quan-ly-cong-ty-con/modal'
import { POST, getCompIdCS } from '@/pages/api/BaseApi'

export function DanhSachNhom({ infoCom }: { infoCom: any }) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openConfirmDel, setOpenConfirmDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [openAddNew, setOpenAddNew] = useState(false)
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [listDepLabel, setListDepLabel]: any = useState()

  const [listTeamLabel, setListTeamLabel]: any = useState()
  const [comLabel, setComlabel] = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  })

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      const com_id = getCompIdCS()

      const res = await Promise.all([
        POST('api/qlc/department/list', { com_id: com_id }),
        POST('api/qlc/team/list', { com_id: com_id }),
        POST('api/qlc/group/search', { com_id: com_id }),
      ])

      console.log(res)

      // set dep data

      if (res?.[0]?.result) {
        setListDepLabel(
          res?.[0]?.items?.map((item) => ({
            label: item?.dep_name,
            value: item?.dep_id,
          }))
        )
      }

      // set team data

      if (res?.[1]?.result) {
        setListTeamLabel(
          res?.[1]?.data?.map((item) => ({
            label: item?.team_name,
            value: item?.team_id,
          }))
        )
      }
      if (res?.[2]?.result) {
        setData(res?.[2]?.data)
        setFilterData(res?.[2]?.data)
      }

      // set group data
    }

    fetchData()
  }, [])

  const columns = [
    {
      title: <p className={styles.headerTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Tên nhóm</p>,
      render: (record: any, index: any) => (
        <p style={{ color: '#4c5bd4' }}>{record?.gr_name}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Nhóm trưởng</p>,
      render: (record: any, index: any) => (
        <p>{record?.leader || 'Đang cập nhật'}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Nhóm phó</p>,
      render: (record: any, index: any) => (
        <p>{record?.subLeader || 'Đang cập nhật'}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Tổ</p>,
      render: (record: any, index: any) => (
        <p>{record?.team_name || 'Đang cập nhật'}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any, index: any) => (
        <p>{record?.dep_name || 'Đang cập nhật'}</p>
      ),
    },

    {
      title: <p className={styles.headerTxt}>Số lượng</p>,
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

  const onRowClicked = (id: string, name: string) => {
    router.push({
      pathname: `${router.pathname}/chi-tiet-nhom/${id}`,
      query: {
        name: name,
      },
    })
  }

  const [listDataFiltered, setListDataFiltered] = useState([])
  const [teamFilter, setTeamFilter]: any = useState<any>()
  const [depFilter, setDepFilter]: any = useState<any>()
  const [groupIdFilter, setGroupIdFilter]: any = useState<any>()
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
    if (teamFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.team_name === teamFilter?.label)
      )
    }
    if (groupIdFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.gr_id === groupIdFilter)
      )
    }
  }

  const handleChangeTeam = (value: any, option: any) => {
    setTeamFilter(option)
  }

  const handleChangeDep = (value: any, option: any) => {
    setDepFilter(option)
  }

  const handleChangeGr = (value: any, option: any) => {
    setGroupIdFilter(value)
  }

  return (
    <div>
      <Row gutter={[20, 10]} justify={'end'}>
        <Col lg={10} md={10} sm={12} xs={24}>
          {/* {MySelect('', 'Chọn công ty', false, false, 'com_id', [comLabel])} */}
          <Select
            size='large'
            style={{ width: '100%', marginBottom: '10px' }}
            options={[comLabel]}
            defaultValue={comLabel}
            disabled
          />
          {MySelect(
            '',
            'Chọn tổ',
            false,
            false,
            'team_id',
            listTeamLabel && listTeamLabel,
            null,
            () => null,
            handleChangeTeam
          )}
        </Col>
        <Col lg={11} md={10} sm={12} xs={24}>
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
          {MySelect(
            '',
            'Chọn nhóm',
            false,
            false,
            'group_id',
            data?.map((gr) => ({ label: gr?.gr_name, value: gr?.gr_id })),
            null,
            () => null,
            handleChangeGr
          )}
        </Col>
        <Col lg={3} md={4} sm={12} className={styles.groupButton}>
          <div>{SearchButton('Tìm kiếm', handleFilter, false)}</div>
          <div className={styles.secondButton}>
            {AddButton('Thêm mới', () => setOpenAddNew(true))}
          </div>
        </Col>
      </Row>

      {/* table */}
      <MyTable
        colunms={columns}
        data={listDataFiltered}
        onRowClick={(record, index) =>
          onRowClicked(record?.team_id, record?.gr_name)
        }
        hasRowSelect={false}
        onSelectChange={() => null}
        selectedRowKeys={[]}
        rowKey='name'
        Footer={null}
      />
      {UpdateNhomModal(openEdit, setOpenEdit, data, setData, selectedRow)}
      {ConfirmDeleteModal(
        openConfirmDel,
        setOpenConfirmDel,
        selectedRow ? selectedRow['name'] : '',
        data,
        setData,
        selectedRow
      )}
      {AddNewModal(
        openAddNew,
        setOpenAddNew,
        data,
        setData,
        comLabel,
        listDepLabel,
        listTeamLabel
      )}
    </div>
  )
}
