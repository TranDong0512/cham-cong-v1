import { Button, Col, Form, Input, Row, Select, Table, Tabs } from 'antd'
import styles from './dang-theo-doi.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { children } from '../toi-gui-di/toi-gui-di'
import { useRouter } from 'next/router'
import moment from 'moment'

export function DangTheoDoi({ dxFollow }: { dxFollow: any[] }) {
  const router = useRouter()
  const columns: any = [
    {
      title: <p style={{ fontSize: '18px', color: '#fff' }}>Đề xuất</p>,
      align: 'center',
      render: (record: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '16px', display: 'flex' }}>
            <div style={{ color: '#4C5BD4' }}>{record?.name_user}</div>
            <div style={{ color: '#474747' }}>: {record?.name_dx}</div>
          </div>
          <div style={{ fontSize: '16px', color: '#474747', display: 'flex' }}>
            Phòng ban:
            <div
              style={{
                fontSize: '16px',
                borderRadius: '15px',
                color: '#fff',
                backgroundColor: '#4C5BD4',
                padding: '2px 10px',
                marginLeft: '10px',
              }}>
              {record.room || 'Chưa cập nhật'}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <p style={{ fontSize: '18px', color: '#fff' }}>Người xét duyệt</p>,
      align: 'center',
      render: (record: any) => <p>{record?.id_user_duyet}</p>,
    },
    {
      title: <p style={{ fontSize: '18px', color: '#fff' }}>Trạng thái</p>,
      align: 'center',
      render: (record: any) => (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '5px',
              marginRight: '10px',
              backgroundColor: `${
                record?.type_duyet === 3
                  ? '#FF5B4D'
                  : record?.type_duyet === 7
                  ? '#FFA13B'
                  : record?.type_duyet === 5
                  ? '#97C25F'
                  : '#4AA7FF'
              }`,
            }}></div>
          {record?.type_duyet === 3
            ? 'Từ chối'
            : record?.type_duyet === 7
            ? 'Đã tiếp nhận'
            : record?.type_duyet === 5
            ? 'Chấp nhận'
            : 'Đã gửi'}
        </p>
      ),
    },
    {
      title: <p style={{ fontSize: '18px', color: '#fff' }}>Ngày tháng</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {record?.time_create
            ? moment.unix(record?.time_create)?.format('DD-MM-YYYY')
            : 'Chưa cập nhật'}
        </p>
      ),
    },
  ]

  const items: any = [
    {
      key: '1',
      label: <div className={styles.textCenter}>Tất cả</div>,
      children: <div>{children(dxFollow, columns, router)}</div>,
    },
    {
      key: '2',
      label: <div className={styles.textCenter}>Đang chờ duyệt</div>,
      children: (
        <div>
          {children(
            dxFollow?.filter((item) => ![3, 5, 7].includes(item?.type_duyet)),
            columns,
            router
          )}
        </div>
      ),
    },
    {
      key: '3',
      label: <div className={styles.textCenter}>Quá hạn duyệt</div>,
      children: (
        <div>
          {children(
            dxFollow?.filter(
              (item) => moment().unix() - item?.time_create > 86400
            ),
            columns,
            router
          )}
        </div>
      ),
    },
    {
      key: '4',
      label: <div className={styles.textCenter}>Đã phê duyệt</div>,
      children: (
        <div>
          {children(
            dxFollow?.filter((item) => item?.type_duyet === 5),
            columns,
            router
          )}
        </div>
      ),
    },
    {
      key: '5',
      label: <div className={styles.textCenter}>Đã từ chối</div>,
      children: (
        <div>
          {children(
            dxFollow?.filter((item) => item?.type_duyet === 3),
            columns,
            router
          )}
        </div>
      ),
    },
  ]
  return (
    <div>
      <Tabs
        items={items}
        className={`${'tab_de_xuat'} ${'tab_de_xuat_theo_doi'}`}></Tabs>
    </div>
  )
}
