import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tabs,
  TimePicker,
} from 'antd'
import styles from './toi-gui-di.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

export const children = (data: any, columns: any, router: any) => (
  <div className={styles.searchFormToiGuiDi}>
    <Form>
      <Row
        gutter={{sm:20, xs: 40}}
        justify={{ sm: 'start', xs: 'center' }}
        className={styles.filter}>
        <Col lg={7} md={6} sm={12} xs={24}>
          <Form.Item>
            <Select
              size='large'
              showSearch
              placeholder='Chọn người duyệt đề xuất'
              optionFilterProp="label"
              suffixIcon={
                <Image
                  src={'/down-icon.png'}
                  alt=''
                  height={10}
                  width={10}></Image>
              }></Select>
          </Form.Item>
        </Col>
        <Col lg={7} md={7} sm={12} xs={24}>
          <Form.Item>
            <DatePicker
              style={{ width: '100%' }}
              size='large'
              suffixIcon={
                <Image
                  src={'/calendar.png'}
                  alt=''
                  height={20}
                  width={20}></Image>
              }
              placeholder='Từ ngày'
              format={'DD/MM/YYYY'}></DatePicker>
          </Form.Item>
        </Col>
        <Col lg={7} md={7} sm={12} xs={24}>
          <Form.Item>
            <DatePicker
              style={{ width: '100%' }}
              size='large'
              suffixIcon={
                <Image
                  src={'/calendar.png'}
                  alt=''
                  height={20}
                  width={20}></Image>
              }
              placeholder='Đến ngày'
              format={'DD/MM/YYYY'}></DatePicker>
          </Form.Item>
        </Col>
        <Col lg={3} md={4} sm={5} xs={7}>
          <Form.Item>
            <Button size='large' className={styles.button}>
              <Image
                src={'/search.png'}
                alt=''
                height={24}
                width={24}
                style={{ marginRight: '10px' }}></Image>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <div className={styles.table}>
      <Table
        className={`table_lich_lam_viec`}
        dataSource={data}
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
        scroll={{ x: 'max-content' }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`de-xuat-cua-toi/de-xuat-chi-tiet/${record?._id}`)
            },
          }
        }}></Table>
    </div>
  </div>
)
export function ToiGuiDi({
  dxFrom,
  listDuyet,
}: {
  dxFrom: any[]
  listDuyet: any[]
}) {
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
              {record?.room || 'Chưa cập nhật'}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <p style={{ fontSize: '18px', color: '#fff' }}>Người xét duyệt</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {listDuyet?.find((item) => item?.idQLC === record?.id_user_duyet) ||
            'Chưa cập nhật'}
        </p>
      ),
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
            ? moment
                .unix(
                  record?.time_create?.toString()?.length >= 13
                    ? record?.time_create / 1000000
                    : record?.time_create
                )
                ?.format('DD-MM-YYYY')
            : 'Chưa cập nhật'}
        </p>
      ),
    },
  ]
  const items: any = [
    {
      key: '1',
      label: <div className={styles.textCenter}>Tất cả</div>,
      children: <div>{children(dxFrom, columns, router)}</div>,
    },
    {
      key: '2',
      label: <div className={styles.textCenter}>Đang chờ duyệt</div>,
      children: (
        <div>
          {children(
            dxFrom?.filter((item) => ![3, 5, 7].includes(item?.type_duyet)),
            columns,
            router
          )}
        </div>
      ),
    },
    {
      key: '3',
      label: <div className={styles.textCenter}>Đã phê duyệt</div>,
      children: (
        <div>
          {children(
            dxFrom?.filter((item) => item?.type_duyet === 5),
            columns,
            router
          )}
        </div>
      ),
    },
    {
      key: '4',
      label: <div className={styles.textCenter}>Đã từ chối</div>,
      children: (
        <div>
          {children(
            dxFrom?.filter((item) => item?.type_duyet === 3),
            columns,
            router
          )}
        </div>
      ),
    },
  ]
  return (
    <div>
      <Tabs items={items} className={`tab_de_xuat`}></Tabs>
    </div>
  )
}
