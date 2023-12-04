import { MyTable } from '@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table'
import { Card, Col, Input, Row } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './[id].module.css'
import { useContext, useEffect, useState } from 'react'
import { DeleteEmpFromGroup } from '@/components/quan-ly-cong-ty/danh-sach-nhom/modal'
import { POST_SS, getCompIdSS } from '@/pages/api/BaseApi'
import { renderPosition } from '@/utils/function'
import dayjs from 'dayjs'

export default function ChiTietTo({ listEmpInTeam }) {
  const router = useRouter()
  const [openDel, setOpenDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [data, setData] = useState<any>(listEmpInTeam?.items)
  const [dataFilter, setDataFilter] = useState<any>(listEmpInTeam?.items)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    if (inputValue === '') {
      setDataFilter(data)
    } else {
      setDataFilter(
        data?.filter((e) =>
          e?.userName?.toLowerCase()?.includes(inputValue?.toLowerCase())
        )
      )
    }
  }, [inputValue])

  const columns = [
    {
      title: <p className={styles.headertxt}>Ảnh</p>,
      render: (record: any) => (
        <Image
          alt='/'
          src={
            record?.avatarUser ? `/${record?.avatarUser}` : '/anhnhanvien.png'
          }
          width={30}
          height={30}
        />
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>ID</p>,
      render: (record: any) => <p>{record?.idQLC}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>Họ và tên</p>,
      render: (record: any) => <p>{record?.userName}</p>,
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>Chức vụ</p>,
      render: (record: any) => <p>{renderPosition(record?.position_id)}</p>,
      align: 'center',
    },
    // {
    //   title: <p className={styles.headertxt}>Nhóm</p>,
    //   render: (record: any) => <p>{record?.group_name}</p>,
    //   align: "center"
    // },
    {
      title: <p className={styles.headertxt}>Ngày bắt đầu</p>,
      render: (record: any) => (
        <p>{dayjs.unix(record?.start_working_time).format('YYYY-MM-DD')}</p>
      ),
      align: 'center',
    },
    {
      title: <p className={styles.headertxt}>Chức năng</p>,
      render: (record: any) => (
        <div
          onClick={() => {
            setSelectedRow(record)
            setOpenDel(true)
          }}>
          <Image alt='/' src={'/delete-icon.png'} width={25} height={25} />
        </div>
      ),
      align: 'center',
    },
  ]
  return (
    <div>
      <Card>
        <Row>
          <Col sm={12} xs={24}>
            <p className={styles.title}>Chi tiết {router.query?.name}</p>
          </Col>

          <Col sm={12} xs={24}>
            <Input
              placeholder={'Tìm kiếm nhân viên'}
              size='large'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              suffix={
                <Image
                  alt='/'
                  src={'/search-black.png'}
                  width={24}
                  height={24}
                />
              }
            />
          </Col>
        </Row>

        <MyTable
          colunms={columns}
          data={dataFilter}
          onRowClick={() => null}
          Footer={null}
          hasRowSelect={false}
          onSelectChange={() => null}
          rowKey='team_id'
          selectedRowKeys={null}
        />
      </Card>
      <DeleteEmpFromGroup
        open={openDel}
        setOpen={setOpenDel}
        empData={selectedRow}
        groupName={router?.query?.name}
        onConfirm={() => null}
        type='Tổ'
      />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const id = context.query?.id || null
  let com_id = null
  com_id = getCompIdSS(context)

  const listEmpInTeam = await POST_SS(
    'api/qlc/managerUser/list',
    {
      com_id: com_id,
      team_id: id,
    },
    context
  )

  return {
    props: {
      listEmpInTeam,
    },
  }
}
