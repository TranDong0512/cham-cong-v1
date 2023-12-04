import Image from 'next/image'
import { Tree, TreeNode } from 'react-organizational-chart'
import styles from './Chart.module.css'
import { useRef, useState } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import { DetailModal, UpdateNodeModal } from '../modal/modal'
import { useRouter } from 'next/router'
import Link from 'next/link'
import _ from 'lodash'

export default function OChart({ infoCompany }: { infoCompany: any }) {
  const [onOpenEdit, setOnOpenEdit] = useState(false)
  const [inputDataEdit, setInputDataEdit] = useState<any>()
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const router = useRouter()

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  })
  // console.log(infoCompany)
  const numberData = (
    title: string,
    data: number,
    url: string,
    type: string,
    name: string,
    id: string
  ) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
      }}>
      {type !== 'công ty con' && (
        <Image
          alt='/'
          src={'/paper.png'}
          width={24}
          height={24}
          style={{ marginRight: '5px' }}
        />
      )}
      <Link
        href={{ pathname: url, query: { name: name, type: type, id: id } }}
        as={url}
        style={{ textDecoration: 'underline' }}
        className={styles.link}>
        {title}: {data}
      </Link>
    </div>
  )

  const TopNode = ({ inputData }: { inputData: any }) => {
    const numberDataTop = (
      title: string,
      data: string,
      url: string,
      type: string,
      id: any
    ) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
        }}>
        <Image
          alt='/'
          src={'/papaer.png'}
          width={24}
          height={24}
          style={{ marginRight: '5px' }}
        />
        <Link
          href={{
            pathname: url,
            query: { name: inputData?.companyName, type: type, id: id },
          }}
          as={url}
          style={{ textDecoration: 'underline' }}
          // className={styles.link}
        >
          {title}: {data}
        </Link>
      </div>
    )

    return (
      <div className={styles.topNode}>
        <p style={{ color: '#fff', marginTop: '10px', fontWeight: '600' }}>
          {inputData?.companyName}
        </p>
        <p style={{ color: '#fff', marginTop: '10px' }}>
          Giám đốc:{' '}
          {inputData?.parent_manager?.[0]?.userName || 'Chưa cập nhật'}
        </p>
        <p style={{ color: '#fff', marginTop: '10px' }}>
          Phó giám đốc:{' '}
          {inputData?.parent_deputy?.[0]?.userName || 'Chưa cập nhật'}
        </p>
        {numberDataTop(
          'Tổng nhân viên',
          inputData?.tong_nv,
          'so-do-to-chuc/danh-sach-nhan-vien',
          'company',
          inputData?.parent_com_id
        )}
        {numberDataTop(
          'Tổng nhân viên đã điểm danh',
          inputData?.tong_nv_da_diem_danh,
          'so-do-to-chuc/danh-sach-nhan-vien-cham-cong',
          'company',
          inputData?.parent_com_id
        )}
        {numberDataTop(
          'Tổng nhân viên chưa điểm danh',
          `${inputData?.tong_nv - inputData?.tong_nv_da_diem_danh}`,
          'so-do-to-chuc/danh-sach-nhan-vien-chua-cham-cong',
          'company',
          inputData?.parent_com_id
        )}
      </div>
    )
  }

  const ChildNodeType1 = ({
    inputData,
    type,
  }: {
    inputData: any
    type: string
  }) => {
    const renderData = () => {
      switch (type) {
        case 'phòng ban':
          return {
            titles: ['Trưởng phòng', 'Phó phòng'],
            id: inputData?.dep_id,
            name: inputData?.dep_name,
            manager: inputData?.manager,
            deputy: inputData?.deputy,
            desc: inputData?.description,
            tong_nv_dd: inputData?.tong_nv_da_diem_danh,
            tong_nv: inputData?.total_emp,
            type: 'phòng ban',
          }

        case 'tổ':
          return {
            titles: ['Tổ trưởng', 'Phó tổ trưởng'],
            id: inputData?.gr_id,
            name: inputData?.gr_name || 'Chưa cập nhật',
            manager: inputData?.to_truong,
            deputy: inputData?.pho_to_truong,
            desc: inputData?.description,
            tong_nv_dd: inputData?.tong_nv_da_diem_danh,
            tong_nv: inputData?.tong_nv,
            type: 'tổ',
          }

        case 'nhóm':
          return {
            titles: ['Nhóm trưởng', 'Nhóm phó'],
            id: inputData?.gr_id,
            name: inputData?.gr_name,
            manager: inputData?.truong_nhom,
            deputy: inputData?.pho_truong_nhom,
            desc: inputData?.description,
            tong_nv_dd: inputData?.tong_nv_da_diem_danh,
            tong_nv: inputData?.group_tong_nv,
            type: 'nhóm',
          }

        case 'công ty con':
          return {
            titles: ['Giám đốc', 'Phó giám đốc'],
            id: inputData?.com_id,
            name: inputData?.com_name,
            manager: inputData?.manager,
            deputy: inputData?.deputy,
            desc: inputData?.description,
            tong_nv_dd: inputData?.tong_nv_da_diem_danh,
            tong_nv: inputData?.tong_nv,
            type: 'công ty con',
          }

        default:
          return {
            titles: ['', ''],
            id: '',
            name: '',
            manager: '',
            deputy: '',
            desc: '',
            tong_nv_dd: '',
            tong_nv: '',
          }
      }
    }

    const header = renderData()

    return (
      <div
        className={styles.childNode}
        style={{
          width: _.isEmpty(inputData?.infoDep) ? '' : 'auto',
          backgroundColor: type === 'công ty con' ? '#F0F1FB' : '#fff',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '10px',
            marginBottom: '10px',
            borderBottom: '1px dotted #474747',
          }}>
          {type !== 'công ty con' && (
            <Image
              alt='/'
              style={{ cursor: 'pointer' }}
              src={'/edit-square.png'}
              width={24}
              height={24}
              onClick={(e) => {
                e.stopPropagation()
                setInputDataEdit(header)
                setOnOpenEdit(true)
              }}
            />
          )}
          <p style={{ fontWeight: '600', marginLeft: '5px', fontSize: '18px' }}>
            {header?.name}
          </p>
        </div>
        {type !== 'công ty con' && (
          <p style={{ marginTop: '10px' }}>
            Mô tả: {header?.desc}
            <span
              style={{ color: '#4C5BD4', cursor: 'pointer' }}
              onClick={() => {
                setSelectedData(inputData)
                setOpenDetail(true)
              }}>
              {' '}
              (Chi Tiết)
            </span>
          </p>
        )}
        <p style={{ marginTop: '10px' }}>
          {header?.titles[0]}: {header?.manager}
        </p>
        <p style={{ marginTop: '10px' }}>
          {header?.titles[1]}: {header?.deputy}
        </p>
        {numberData(
          'Số lượng nhân viên',
          header?.tong_nv,
          'so-do-to-chuc/danh-sach-nhan-vien',
          type,
          header?.name,
          header?.id
        )}
        {numberData(
          'Số lượng nhân viên đã điểm danh',
          header?.tong_nv_dd,
          'so-do-to-chuc/danh-sach-nhan-vien-cham-cong',
          type,
          header?.name,
          header?.id
        )}
        {numberData(
          'Số lượng nhân viên chưa điểm danh',
          header?.tong_nv - header?.tong_nv_dd,
          'so-do-to-chuc/danh-sach-nhan-vien-chua-cham-cong',
          type,
          header?.name,
          header?.id
        )}
      </div>
    )
  }

  return (
    <>
      <div
        ref={ref}
        {...events}
        style={{ overflow: 'scroll' }}
        className='ochart'>
        <Tree label={<TopNode inputData={infoCompany} />}>
          {infoCompany?.infoDep?.map((item: any, index: number) => (
            <TreeNode
              key={index}
              label={<ChildNodeType1 inputData={item} type={'phòng ban'} />}>
              {item?.infoTeam?.map((itemSub: any, indexSub: number) => (
                <TreeNode
                  key={indexSub}
                  label={<ChildNodeType1 inputData={itemSub} type='tổ' />}>
                  {itemSub?.infoGroup?.map(
                    (itemGroup: any, indexGroup: number) => (
                      <TreeNode
                        key={indexGroup}
                        label={
                          <ChildNodeType1 inputData={itemGroup} type='nhóm' />
                        }></TreeNode>
                    )
                  )}
                </TreeNode>
              ))}
            </TreeNode>
          ))}
          {infoCompany?.infoChildCompany?.map((item: any, index: number) => (
            <TreeNode
              key={index}
              label={<ChildNodeType1 inputData={item} type='công ty con' />}>
              {item?.infoDep?.map((item1: any, index: number) => (
                <TreeNode
                  key={index}
                  label={
                    <ChildNodeType1 inputData={item1} type={'phòng ban'} />
                  }>
                  {item1?.infoTeam?.map((itemSub: any, indexSub: number) => (
                    <TreeNode
                      key={indexSub}
                      label={<ChildNodeType1 inputData={itemSub} type='tổ' />}>
                      {itemSub?.infoGroup?.map(
                        (itemGroup: any, indexGroup: number) => (
                          <TreeNode
                            key={indexGroup}
                            label={
                              <ChildNodeType1
                                inputData={itemGroup}
                                type='nhóm'
                              />
                            }></TreeNode>
                        )
                      )}
                    </TreeNode>
                  ))}
                </TreeNode>
              ))}
            </TreeNode>
          ))}
        </Tree>
      </div>
      <UpdateNodeModal
        inputData={inputDataEdit}
        open={onOpenEdit}
        setOpen={setOnOpenEdit}
      />
      <DetailModal
        inputData={inputDataEdit}
        open={openDetail}
        setOpen={setOpenDetail}
      />
    </>
  )
}
