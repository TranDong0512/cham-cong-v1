import { Col, Row, Input } from 'antd'
import styles from './LuanChuyen.module.css'
import { AddButton, SearchButton } from '@/components/commons/Buttons'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  AddNewModal,
  ConfirmDeleteModal,
  UpdatePhongBanModal,
} from './modal/modal'
import { MyTable } from '../table/Table'
import { MyInput, MySelect } from '../../quan-ly-cong-ty-con/modal'
import { POST, getCompIdCS } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'

export function LuanChuyen({
  listTranferJob,
  listDepartments,
  listTeams,
  listGroups,
  infoCom,
}) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openConfirmDel, setOpenConfirmDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [openAddNew, setOpenAddNew] = useState(false)
  const [data, setData] = useState(listTranferJob?.data)
  const [listDepLabel, setListDepLabel]: any = useState(
    listDepartments?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  )
  const [listTeamLabel, setTeamLabel]: any = useState(
    listTeams?.map((team) => ({
      label: team?.team_name,
      value: team?.team_id,
    }))
  )
  const [listGrLabel, setListGrLabel]: any = useState(
    listGroups?.map((group) => ({
      label: group?.gr_name,
      value: group?.gr_id,
    }))
  )
  const [listEmp, setListEmp] = useState([])

  useEffect(() => {
    let com_id = null
    com_id = getCompIdCS()
    com_id !== null &&
      POST('api/qlc/managerUser/list', {
        com_id: com_id,
      }).then((res) => {
        if (res?.result === true) {
          setListEmp(res?.items)
        }
      })
  }, [])

  const columns = [
    {
      title: <p className={styles.headerTxt}>ID Nhân viên</p>,
      render: (_: any, record: any, index: number) => <p>{record?.ep_id}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Họ và tên</p>,
      render: (record: any, index: any) => <p>{record?.userName}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Thời gian chuyển công tác</p>,
      render: (record: any, index: any) => (
        <p>{dayjs(record?.created_at)?.format('YYYY-MM-DD')}</p>
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Lý do</p>,
      render: (record: any, index: any) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record?.note,
          }}></div>
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban cũ</p>,
      render: (record: any, index: any) => <p>{record?.old_dep_name}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban mới</p>,
      render: (record: any, index: any) => <p>{record?.new_dep_name}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Tên công ty cũ</p>,
      render: (record: any, index: any) => (
        <p>{record?.old_com_name || 'Chưa cập nhật'}</p>
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Tên công ty mới</p>,
      render: (record: any, index: any) => <p>{record?.new_com_name}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ cũ</p>,
      render: (record: any, index: any) => <p>{record?.old_position}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ mới</p>,
      render: (record: any, index: any) => <p>{record?.new_position}</p>,
      align: 'center',
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
            onClick={() => {
              setOpenEdit(true)
              setSelectedRow(record)
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt='/'
            src={'/delete-icon.png'}
            width={24}
            height={24}
            onClick={() => {
              setOpenConfirmDel(true)
              setSelectedRow(record)
            }}
          />
        </div>
      ),
      align: 'center',
    },
  ]

  const [listDataFiltered, setListDataFiltered] = useState([])
  const [depFilter, setDepFilter]: any = useState<any>()
  const [epIdFilter, setEpIdFilter]: any = useState<any>()
  const [dateFilter, setDateFilter]: any = useState<any>(
    dayjs().format('YYYY-MM')
  )
  useEffect(() => {
    setListDataFiltered(data)
  }, [data])

  useEffect(() => {
    if (!depFilter) {
      setListDataFiltered(data)
    }
    if (!dateFilter) {
      setListDataFiltered(data)
    }
  }, [depFilter, dateFilter])

  const handleFilter = () => {
    if (depFilter) {
      setListDataFiltered(
        data?.filter(
          (data: any) =>
            data?.old_dep_name === depFilter?.label ||
            data?.new_dep_name === depFilter?.label
        )
      )
    }

    if (epIdFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.ep_id === epIdFilter)
      )
    }

    if (dateFilter) {
      setListDataFiltered(
        data?.filter(
          (data: any) =>
            dayjs(data?.created_at).format('YYYY-MM') === dateFilter
        )
      )
    }
  }

  const handleChangeDep = (value: any, option: any) => {
    setDepFilter(option)
  }

  const handleChangeEp = (value: any, option: any) => {
    setEpIdFilter(value)
  }

  return (
    <div>
      <Row gutter={{ lg: 20, md: 25, sm: 10, xs: 20 }}>
        <Col
          lg={{ span: 10, order: 1 }}
          md={{ span: 10, order: 1 }}
          sm={12}
          xs={24}>
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
        <Col
          lg={{ span: 11, order: 1 }}
          md={{ span: 10, order: 2 }}
          sm={12}
          xs={24}>
          <div>
            {MySelect(
              '',
              'Nhập tên nhân viên',
              false,
              false,
              'ep_id',
              data?.map((empQuit) => ({
                label: empQuit?.userName,
                value: empQuit?.ep_id,
              })),
              null,
              () => null,
              handleChangeEp
            )}
          </div>
        </Col>
        <Col
          lg={{ span: 3, order: 1 }}
          md={{ span: 4, order: 3 }}
          sm={{ span: 5, order: 2 }}
          xs={{ span: 9, order: 1 }}
          className={styles.button}>
          <div>{SearchButton('Tìm kiếm', handleFilter, false)}</div>
        </Col>
        <Col
          lg={{ span: 10, order: 1 }}
          md={{ span: 10, order: 4 }}
          sm={{ span: 11, order: 1 }}
          xs={24}>
          <Input
            className={styles.input}
            type='month'
            placeholder='Chọn tháng'
            size='large'
            value={dateFilter ? dayjs(dateFilter).format('YYYY-MM') : undefined}
            onChange={(e) => setDateFilter(e.target.value)}
            allowClear={dateFilter ? true : false}></Input>
        </Col>
        <Col
          lg={{ span: 14, order: 1 }}
          md={{ span: 14, order: 5 }}
          sm={{ span: 8, order: 3 }}
          xs={{ span: 15, order: 2 }}
          className={styles.button}>
          <div>
            {AddButton('Thêm mới luân chuyển', () => setOpenAddNew(true))}
          </div>
        </Col>
      </Row>

      {/* table */}
      <MyTable
        colunms={columns}
        data={listDataFiltered}
        onRowClick={() => null}
        Footer={null}
        hasRowSelect={false}
        onSelectChange={() => null}
        rowKey='name'
        selectedRowKeys={null}
      />
      {UpdatePhongBanModal(
        openEdit,
        setOpenEdit,
        data,
        setData,
        selectedRow,
        listDepLabel,
        infoCom,
        listTeamLabel,
        listGrLabel
      )}
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
        setData,
        listEmp,
        listDepLabel,
        listTeams?.data,
        listGroups?.data
      )}
    </div>
  )
}
