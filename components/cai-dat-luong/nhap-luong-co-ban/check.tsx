import { Card, Table, Input, Select, Button, Avatar, Row, Col } from 'antd'
import styles from './nhap-luong-co-ban.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Logo } from '../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { IconDown } from '../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { IconEX } from '../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { ColumnsType } from 'antd/es/table'

const phongBan = [
  {
    value: 'phòng ban (tất cả)',
    label: 'phòng ban (tất cả)',
  },
  {
    value: 'phòng 1',
    label: 'phòng 1',
  },
  {
    value: 'phòng 2',
    label: 'phòng 2',
  },
]
const nhanVien = [
  {
    value: 'Tất cả nhân viên',
    label: 'Tất cả nhân viên',
  },
  {
    value: 'Nguyên văn a',
    label: 'Nguyễn văn a',
  },
  {
    value: 'Nguyễn văn b',
    label: 'Nguyễn văn b',
  },
]
interface DataType {
  key: String
  url: any
  info: any
  luongCB: String
  HDApDung: String
  phongBan: String
  chucVu: String
  lienHe: any
}
const avatax = [
  {
    key: '1',
    url: '/Ellipse1125.png',
  },
  {
    key: '2',
    url: '/Ellipse1125.png',
  },
  {
    key: '3',
    url: '/Ellipse1125.png',
  },
  {
    key: '4',
    url: '/Ellipse1125.png',
  },
  {
    key: '5',
    url: '/Ellipse1125.png',
  },
  {
    key: '6',
    url: '/Ellipse1125.png',
  },
]
const datainfo = [
  {
    key: '1',
    name: ' Nguyễn Hoàng Anh',
    id: '12345',
  },
  {
    key: '2',
    name: 'Nguyễn văn A',
    id: '2345678',
  },
  {
    key: '3',
    name: 'Nguyên Văn B',
    id: 'acxx',
  },
  {
    key: '4',
    name: ' Nguyễn Hoàng Anh',
    id: '12345',
  },
  {
    key: '5',
    name: ' Nguyễn Hoàng Anh',
    id: '12345',
  },
  {
    key: '6',
    name: ' Nguyễn Hoàng Anh',
    id: '12345',
  },
  {
    key: '7',
    name: ' Nguyễn Hoàng Anh',
    id: '12345',
  },
]
const dataLH = [
  {
    key: '1',
    sdt: '12345',
    email: 'ác@',
    address: 'Hưng Yên',
  },
  {
    key: '2',
    sdt: '2341',
    email: 'ác@',
    address: 'Hà Nội',
  },
  {
    key: '3',
    sdt: '1245',
    email: 'c@',
    address: 'Hải Phòng',
  },
  {
    key: '4',
    sdt: '12345',
    email: 'ác@',
    address: 'Hưng Yên',
  },
  {
    key: '5',
    sdt: '12345',
    email: 'ác@',
    address: 'Hưng Yên',
  },
  {
    key: '6',
    sdt: '12345',
    email: 'ác@',
    address: 'Hưng Yên',
  },
  {
    key: '7',
    sdt: '12345',
    email: 'ác@',
    address: 'Hưng Yên',
  },
]
export const Check: React.FC = () => {
  const [modalChinhSua, setModalChinhSua] = useState(false)
  const [modalKey, setModalKey] = useState('')
  const router = useRouter()
  const chitiet = (id: String) => {
    router.push(`${router.pathname}/chi-tiet-nhan-vien/${id}`)
  }
  const thongTin = (info: any) => {
    return (
      <>
        {datainfo.map((data: any, index: number) => {
          if (data.key === info.key) {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  width: '260px',
                }}>
                <div>
                  <p className={styles.textname}>{data.name}</p>
                  <p className={styles.text}>ID: {data.id}</p>
                </div>
                <div
                  className={`chinhsua ${styles.editInfo}`}
                  onClick={(e) => chitiet(data?.id)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='24'
                    viewBox='0 0 25 24'
                    fill='none'>
                    <path
                      d='M12.75 3.99985H7.9375C6.17709 3.99985 4.75 5.42694 4.75 7.18735V16.8123C4.75 18.5728 6.17709 19.9998 7.9375 19.9998H17.5625C19.3229 19.9998 20.75 18.5728 20.75 16.8123V11.9998M19.1642 8.41405L20.25 7.32829C21.031 6.54724 21.031 5.28092 20.25 4.49988C19.4689 3.71883 18.2026 3.71883 17.4215 4.49989L16.3358 5.58563M19.1642 8.41405L13.1279 14.4504C12.8487 14.7296 12.4931 14.9199 12.106 14.9974L9.16422 15.5857L9.75257 12.644C9.83001 12.2568 10.0203 11.9012 10.2995 11.622L16.3358 5.58563M19.1642 8.41405L16.3358 5.58563'
                      stroke='#4C5BD4'
                      stroke-width='1.2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
            )
          }
        })}
      </>
    )
  }
  const lienhe = (lh: any) => {
    return (
      <>
        {dataLH.map((datalh: any, index: number) => {
          if (datalh.key === lh.key) {
            return (
              <div key={index}>
                <p>{datalh.sdt}</p>
                <p>{datalh.email}</p>
                <p>{datalh.address}</p>
              </div>
            )
          }
        })}
      </>
    )
  }
  const avata = (a: any) => {
    return (
      <>
        {avatax.map((img: any, index: number) => {
          if (a.key == img.key) {
            return (
              <Avatar
                key={index}
                src={img.url}
                style={{ width: '46px', height: '46px' }}
              />
            )
          }
        })}
      </>
    )
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Ảnh',
      align: 'center',
      render: (record: any) => avata(record),
    },
    {
      title: 'Họ và Tên (ID)',
      align: 'center',
      render: (record: any) => thongTin(record),
    },
    {
      title: 'Lương cơ bản',
      dataIndex: 'luongCB',
      align: 'center',
      render: (value) => {
        return (
          <p style={{ color: '#FF5B4D' }} className={styles.text}>
            {value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ
          </p>
        )
      },
    },
    {
      title: 'Hợp đồng áp dụng',
      dataIndex: 'HDApDung',
      align: 'center',
      render: (text: String) => <p className={styles.text}>{text}</p>,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'phongBan',
      align: 'center',
      render: (text: String) => <p className={styles.text}>{text}</p>,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chucVu',
      align: 'center',
      render: (text: String) => <p className={styles.text}>{text}</p>,
    },
    {
      title: 'Liên hệ',
      render: (record: any) => lienhe(record),
    },
  ]
  const data: DataType[] = [
    {
      key: '1',
      url: { avata },
      info: { thongTin },
      luongCB: '100000000',
      HDApDung: '100% lương cơ bản',
      phongBan: 'Biên tập',
      chucVu: 'Nhân viên chính thức',
      lienHe: { lienhe },
    },
    {
      key: '2',
      url: '/Ellipse1125.png',
      info: { thongTin },
      luongCB: '100000000',
      HDApDung: '100% lương cơ bản',
      phongBan: 'Biên tập',
      chucVu: 'Nhân viên chính thức',
      lienHe: { lienhe },
    },
    {
      key: '3',
      url: '/Ellipse1125.png',
      info: { thongTin },
      luongCB: '100000000',
      HDApDung: '100% lương cơ bản',
      phongBan: 'Biên tập',
      chucVu: 'Nhân viên chính thức',
      lienHe: { lienhe },
    },
    {
      key: '4',
      url: '/Ellipse1125.png',
      info: { thongTin },
      luongCB: '100000000',
      HDApDung: '100% lương cơ bản',
      phongBan: 'Biên tập',
      chucVu: 'Nhân viên chính thức',
      lienHe: { lienhe },
    },
    {
      key: '5',
      url: '/Ellipse1125.png',
      info: { thongTin },
      luongCB: '100000000',
      HDApDung: '100% lương cơ bản',
      phongBan: 'Biên tập',
      chucVu: 'Nhân viên chính thức',
      lienHe: { lienhe },
    },
  ]
  return (
    <Card style={{ padding: '10px 20px' }}>
      <div className={styles.khung1}>
        <div style={{ marginBottom: '20px' }}>
          <p className={styles.title}>Danh sách nhân viên</p>
        </div>
        <Row className={styles.form}>
          <Col xl={7} lg={8} style={{ padding: '0' }} className={styles.time1}>
            <Input type='date' />
          </Col>
          <Col
            xl={7}
            lg={8}
            style={{ padding: '0' }}
            className={styles.phongBan}>
            <Select
              style={{ width: '100%' }}
              defaultValue='phòng ban (tất cả)'
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={phongBan}
              suffixIcon={<Logo />}
            />
          </Col>
          <Col
            xl={7}
            lg={8}
            style={{ padding: '0' }}
            className={styles.phongBan}>
            <Select
              style={{ width: '100%' }}
              defaultValue='Tất cả nhân viên'
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={nhanVien}
              suffixIcon={<Logo />}
            />
          </Col>
        </Row>
      </div>
      <Row className={styles.button}>
        <Col sm={9} xs={24} style={{ padding: '0' }} className={styles.time2}>
          <Input type='date' />
        </Col>
        <Col sm={7} xs={13}>
          <Button className={styles.button1} icon={<IconDown />}>
            <p className={styles.textB}>Nhập lương cơ bản</p>
          </Button>
        </Col>
        <Col sm={7} xs={13}>
          <Button className={styles.button2} icon={<IconEX />}>
            <p className={styles.textB}>Xuất lương cơ bản</p>
          </Button>
        </Col>
      </Row>

      <div style={{ padding: '10px' }}>
        <Table
          className={`table_nhansu ${styles.table}`}
          pagination={{
            position: ['bottomCenter'],
          }}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
        />
      </div>
    </Card>
  )
}
