import { Col, Rate, Row } from 'antd'
import { AddButton, ExportExcelButton, SearchButton } from '../commons/Buttons'
import styles from './DanhSachUngVien.module.css'
import { MyInput, MySelect } from '../quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import Image from 'next/image'
import { useState } from 'react'
import {
  AddNewCandiModal,
  AddNewStageModal,
  ChangeStageModal,
  ConfirmDeleteAttendantModal,
  ConfirmDeleteModal,
  ConfirmDeleteStageModal,
  UpdateStageModal,
} from './modal/modal'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragableContainer } from './drag-and-drop/item/DragableItem'
import { DropableColumn } from './drag-and-drop/column/DropableColumn'
import dayjs from 'dayjs'
import { POST_HR } from '@/pages/api/BaseApi'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const DanhSachUngVien = ({
  // listCandidates,
  listCandidatesOnProcess,
  listEmp,
}: {
  // listCandidates: any
  listCandidatesOnProcess: any
  listEmp: any
}) => {
  const [openAddNew, setOpenAddNew] = useState(false)
  const [openChangeStage, setOpenChangeStage] = useState(false)
  const [openDeleteStage, setOpenDeleteStage] = useState(false)
  const [openDeleteAttendant, setOpenDeleteAttendant] = useState(false)
  const [onOpenStageUpdate, setOnOpenStageUpdate] = useState(false)
  const [selectedStage, setSelectedStage] = useState<any>(null)
  const [openAddNewCandi, setOpenAddNewCandi] = useState(false)
  const [dataCandidates, setDataCandidates] = useState(
    // listCandidates?.data?.filter((can) => can.isSwitch === 0)
    listCandidatesOnProcess?.listCandidate
  )

  const [listProcess, setListProcess] = useState(
    listCandidatesOnProcess
      ? listCandidatesOnProcess?.data
          ?.map((item) => {
            if (item?.listCandidate) {
              return {
                ...item,
                required: false,
                bgColor: '#FFEDDA',
                textColor: '#474747',
                title: item?.name,
              }
            } else return null
          })
          ?.filter((item) => item !== null)
      : null
  )
  const [listCols, setListCols] = useState([
    {
      title: 'Nhận hồ sơ ứng viên',
      required: true,
      bgColor: '#FFEDDA',
      textColor: '#474747',
      listCandidate: dataCandidates?.map((can) => {
        return {
          ...can,
          canId: can?.id,
          canName: can?.name,
        }
      }),
    },
    ...(listProcess || []),
    {
      title: 'Nhận việc',
      required: true,
      bgColor: '#42CA73',
      textColor: '#fff',
      listCandidate: listCandidatesOnProcess?.listCandidateGetJob,
    },
    {
      title: 'Trượt',
      required: true,
      bgColor: '#FF5B4D',
      textColor: '#fff',
      listCandidate: listCandidatesOnProcess?.listCandidateFailJob,
    },
    {
      title: 'Hủy',
      required: true,
      bgColor: '#FFA13B',
      textColor: '#fff',
      listCandidate: listCandidatesOnProcess?.listCandidateCancelJob,
    },
    {
      title: 'Ký hợp đồng',
      required: true,
      bgColor: '#4C5BD4',
      textColor: '#fff',
      listCandidate: listCandidatesOnProcess?.listCandidateContactJob,
    },
  ])

  // const [listCols, setListCols] = useState(mockdata)
  const [draggedItem, setDraggedItem] = useState()
  const [dropCol, setDropCol] = useState()
  const [canIdSelected, setCanIdSelected] = useState(-1)
  const [listEmpLabel, setListEmpLabel]: any = useState(
    listEmp?.items?.map((emp) => ({ label: emp?.userName, value: emp?.idQLC }))
  )

  const router = useRouter()

  const onDeleteClicked = (title: any) => {
    setListCols(listCols?.filter((item) => item.title !== title))
  }

  const handleDeleteCandidate = () => {
    POST_HR('api/hr/recruitment/softDeleteCandi', {
      candidateId: canIdSelected,
    }).then((res) => {
      if (res?.result === true) {
        setOpenDeleteAttendant(false)
        router.reload()
      }
    })
  }

  const handleDeleteStage = () => {
    if (selectedStage !== null) {
      POST_HR('api/hr/recruitment/deleteProcess', {
        processInterId: selectedStage?.id,
      }).then((res) => {
        if (res?.result === true) {
          setOpenDeleteStage(false)
          router.reload()
        }
      })
    }
  }

  const [listColsFilter, setListColsFilter] = useState<any[]>(listCols)
  const [epIdFilter, setEpIdFilter] = useState<any>()
  const [positionFilter, setPositionFilter] = useState<any>()

  useEffect(() => {
    setListColsFilter(listCols)
  }, [listCols])

  useEffect(() => {
    if (!positionFilter) {
      setListColsFilter(listCols)
    }
    if (!epIdFilter) {
      setListColsFilter(listCols)
    }
  }, [epIdFilter, positionFilter])

  const handleChangeEp = (value: any, option: any) => {
    setEpIdFilter(value)
  }

  const handleChangePosition = (value: any, option: any) => {
    setPositionFilter(value)
  }

  const handleFilter = () => {
    if (positionFilter) {
      setListColsFilter(
        listCols?.map((col) => ({
          ...col,
          listCandidate: col?.listCandidate?.filter(
            (can) => can?.recruitmentNewsId === positionFilter
          ),
        }))
      )
    }
    if (epIdFilter) {
      setListColsFilter(
        listCols?.map((col) => ({
          ...col,
          listCandidate: col?.listCandidate?.filter(
            (can) => can?.userHiring === epIdFilter
          ),
        }))
      )
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.btnSection}>
        <div className={`${styles.btn} ${styles.btnExport}`}>
          {ExportExcelButton(() => null)}
        </div>
        <div className={styles.btn}>
          {AddButton('Thêm giai đoạn', () => setOpenAddNew(true))}
        </div>
        <div className={styles.btn}>
          {AddButton('Thêm ứng viên', () => setOpenAddNewCandi(true))}
        </div>
      </div>
      <div>
        <Row gutter={[20, 0]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            {MySelect('', 'dd/mm/yyyy', false, false, 'from')}
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            {MySelect('', 'dd/mm/yyyy', false, false, 'to')}
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            {MyInput('', 'Nhập tên ứng viên', false, false, 'can_name')}
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            {MySelect(
              '',
              'Vị trí ứng tuyển',
              false,
              false,
              'position_apply',
              [{ label: 'Tuyển nhân viên nhập liệu 2', value: 187 }],
              null,
              () => null,
              handleChangePosition
            )}
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            {MySelect(
              '',
              'Chọn nhân viên',
              false,
              false,
              'ep_id',
              listEmpLabel,
              null,
              () => null,
              handleChangeEp
            )}
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            {MySelect('', 'Chọn giới tính', false, false, 'gender')}
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            {MySelect('', 'Trạng thái', false, false, 'status')}
          </Col>
          <Col md={6} sm={12} xs={24}>
            <div className={styles.search} onClick={handleFilter}>
              <Image alt='/' src={'/search.png'} width={24} height={24} />
              <p className={styles.text}>Tìm kiếm</p>
            </div>
          </Col>
          <Col md={0} sm={0} xs={24} className={styles.exportBtnRes}>
            {ExportExcelButton(() => null)}
          </Col>
        </Row>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.table}>
          {listColsFilter?.map((item, index) => (
            <DropableColumn
              item={item}
              key={index}
              onDeleteClicked={onDeleteClicked}
              setOpenModal={setOpenChangeStage}
              setDragItem={setDraggedItem}
              setDropCol={setDropCol}
              listItem={listColsFilter}
              setOpenDeleteStageModal={setOpenDeleteStage}
              setOpenDeleteAttendantModal={setOpenDeleteAttendant}
              setOpenUpdateStage={setOnOpenStageUpdate}
              setSelectedStage={setSelectedStage}
              setCanIdSelected={setCanIdSelected}
              listEmpLabel={listEmpLabel}
            />
          ))}
        </div>
      </div>
      <AddNewStageModal
        data={listCols}
        setData={setListCols}
        open={openAddNew}
        setOpen={setOpenAddNew}
      />
      <ChangeStageModal
        data={listCols}
        setData={setListCols}
        open={openChangeStage}
        setOpen={setOpenChangeStage}
        draggedItem={draggedItem}
        dropCol={dropCol}
        listEmpLabel={listEmpLabel}
      />
      {ConfirmDeleteStageModal(
        openDeleteStage,
        setOpenDeleteStage,
        handleDeleteStage
      )}
      {ConfirmDeleteAttendantModal(
        openDeleteAttendant,
        setOpenDeleteAttendant,
        handleDeleteCandidate
      )}
      <AddNewCandiModal
        open={openAddNewCandi}
        setOpen={setOpenAddNewCandi}
        listEmpLabel={listEmpLabel}
      />
      <UpdateStageModal
        data={listCols}
        open={onOpenStageUpdate}
        setOpen={setOnOpenStageUpdate}
        selectedStage={selectedStage}
      />
    </DndProvider>
  )
}
