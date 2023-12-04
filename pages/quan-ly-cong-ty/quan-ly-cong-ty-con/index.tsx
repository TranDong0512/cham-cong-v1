import { Card, Table } from 'antd'
import styles from './index.module.css'
import { AddButton } from '@/components/commons/Buttons'
import Image from 'next/image'
import { ModalQuanLyCongTyCon } from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { useState } from 'react'
import {
  TYPE_ADD,
  TYPE_UPDATE,
} from '@/components/quan-ly-cong-ty/quan-ly-ca/modal'
import { POST, POST_SS } from '@/pages/api/BaseApi'

export default function QuanLyCongTyConPage({
  listChildCompanies,
}: {
  listChildCompanies?: any
}) {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [companySelected, setCompanySelected] = useState({})
  const [data, setData] = useState(listChildCompanies?.items)

  // console.log(listChildCompanies?.data)

  const columns = [
    {
      title: <p className={styles.title}>ID</p>,
      render: (record: any) => <p>{record?._id}</p>,
    },
    {
      title: <p className={styles.title}>Logo Công ty</p>,
      render: (record: any) => (
        <div>
          <Image alt='/' src={'/logo_demo.png'} width={147} height={80} />
        </div>
      ),
    },
    {
      title: <p className={styles.title}>Tên Công ty</p>,
      render: (record: any) => <p>{record?.com_name}</p>,
    },
    {
      title: <p className={styles.title}>Công ty</p>,
      render: (record: any) => <p>{'Công ty con'}</p>,
    },
    {
      title: <p className={styles.title}>Số điện thoại</p>,
      render: (record: any) => <p>{record?.com_phone}</p>,
    },
    {
      title: <p className={styles.title}>Địa chỉ</p>,
      render: (record: any) => <p>{record?.com_address}</p>,
    },
    {
      title: <p className={styles.title}>Chỉnh sửa</p>,
      render: (record: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Image
            alt='/'
            src={'/edit.png'}
            width={24}
            height={24}
            onClick={() => {
              setCompanySelected(record)
              setIsOpenUpdate(true)
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <div>
      <Card>
        <div className={styles.header}>
          <p className={styles.headerTxt}>Quản lý công ty con</p>
          {AddButton('Thêm công ty', () => setIsOpenAdd(true))}
        </div>
        <Table
          className={`table_cong_ty_con`}
          style={{
            border: '1px solid lightgrey',
            borderRadius: '8px',
            marginTop: '20px',
          }}
          columns={columns}
          dataSource={data}
          pagination={{
            position: ['bottomCenter'],
            showPrevNextJumpers: false,
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
      {ModalQuanLyCongTyCon(
        isOpenAdd,
        setIsOpenAdd,
        TYPE_ADD,
        data,
        setData,
        null,
        setIsOpenAdd
      )}
      {ModalQuanLyCongTyCon(
        isOpenUpdate,
        setIsOpenUpdate,
        TYPE_UPDATE,
        data,
        setData,
        companySelected,
        setIsOpenUpdate
      )}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const listChildCompanies = await POST_SS(
    'api/qlc/company/child/list',
    {},
    context
  )

  return {
    props: {
      listChildCompanies,
    },
  }
}
