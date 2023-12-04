import { Button, Card, Col, Popover, Row, List } from 'antd'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './cham-cong.module.css'
import { KhuonMat } from './icon/icon'
import { CapNhat } from './icon/icon'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
} from 'recharts'
import Link from 'next/link'
import moment from 'moment'
import _ from 'lodash'
const mapListWeek = {
  0: 'T2',
  1: 'T3',
  2: 'T4',
  3: 'T5',
  4: 'T6',
  5: 'T7',
  6: 'CN',
}

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value, check } = props
  if (height >= 10)
    return (
      <g>
        <text
          x={x + width / 2}
          y={y + height - 10}
          fill='#fff'
          textAnchor='middle'
          dominantBaseline='bottom'
          className={styles.textdate}>
          {value}
        </text>
      </g>
    )
  return (
    <g>
      <text
        x={x + width / 2}
        y={y + height - 10}
        fill='#474747'
        textAnchor='middle'
        dominantBaseline='bottom'
        className={styles.textdate}>
        {value}
      </text>
    </g>
  )
}

export const ChamCong = ({ ccData }: { ccData: any }) => {
  const chartData: any[] = []
  const thisWeekMonday = moment().day(1)

  // render 7 days from this week monday
  const listDays: string[] = []
  let tempDate = thisWeekMonday
  _.range(0, 7).forEach((item, indx) => {
    listDays.push(tempDate?.format('DD/MM'))
    tempDate = tempDate.add(1, 'd')
  })

  // map data for chart
  listDays &&
    listDays?.forEach((item, index) => {
      chartData.push({
        name: mapListWeek[index],
        uv: ccData?.resultChart?.[index] || 0,
        date: item,
      })
    })

  const yAxisTicks = [0, 1, 2, 3, 4, 5]
  const check = (name: String, x: any) => {
    if (x === 1)
      return (
        <p style={{ color: '#4C5BD4' }}>
          {name} {'chấm công thành công'}
        </p>
      )
    return (
      <p style={{ color: '#FF5B4D' }}>
        {name} {'chấm công thất bại'}
      </p>
    )
  }

  return (
    <div className={styles.check414}>
      <div className={styles.khung1}>
        <p className={styles.nameNV}>Xin Chào ...</p>
        <div className={styles.khungbutton}>
          <Link href='/cap-nhat-du-lieu-khuon-mat'>
            <Button size='large' className={styles.Button} icon={<KhuonMat />}>
              <p className={styles.namebutton}>Cập nhật dữ liệu khuôn mặt</p>
            </Button>
          </Link>
          <Link href={'/cham-cong-bang-tai-khoan-nhan-vien'}>
            <Button size='large' className={styles.Button} icon={<CapNhat />}>
              <p className={styles.namebutton}>Chấm công nhân viên</p>
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.khung2}>
        <Card className={`theIcon ${styles.divx} ${styles.size768}`}>
          <div className={styles.divxnd}>
            <div className={styles.ha}>
              <div className={styles.iconk2}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='60'
                  height='60'
                  viewBox='0 0 60 60'
                  fill='none'>
                  <circle
                    cx='30'
                    cy='30'
                    r='27.5'
                    fill='white'
                    stroke='url(#paint0_linear_460_104398)'
                    stroke-width='5'
                  />
                  <defs>
                    <linearGradient
                      id='paint0_linear_460_104398'
                      x1='8.5'
                      y1='9'
                      x2='49.5'
                      y2='49.5'
                      gradientUnits='userSpaceOnUse'>
                      <stop stop-color='#4C5BD4' />
                      <stop offset='1' stop-color='#47A4FF' />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={styles.icon}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='26'
                    viewBox='0 0 26 26'
                    fill='none'>
                    <path
                      d='M4.33203 5.41675L16.2487 5.41675'
                      stroke='#4C5BD4'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M4.33203 8.66675H16.2487'
                      stroke='#4C5BD4'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M4.33203 11.9165H11.9154'
                      stroke='#4C5BD4'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M19.9948 14.6705L15.3065 19.359C14.8615 19.804 14.2947 20.1073 13.6776 20.2307L11.7172 20.6228L12.1093 18.6623C12.2327 18.0453 12.536 17.4785 12.9809 17.0336L17.6694 12.3451M19.9948 14.6705L20.8567 13.8086C21.4791 13.1862 21.4791 12.1771 20.8567 11.5547L20.7852 11.4832C20.1628 10.8608 19.1537 10.8608 18.5313 11.4832L17.6694 12.3451M19.9948 14.6705L17.6694 12.3451'
                      stroke='#4C5BD4'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.divxtext}>
              <p className={styles.text1}>Số lần đi muộn theo tháng</p>
            </div>
          </div>
          <div className={styles.divxnumber}>
            <p className={styles.textnumber}>
              {ccData?.count_late
                ? Number(ccData?.count_late)?.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                  })
                : '00'}{' '}
              lần
            </p>
          </div>
        </Card>
        <Card className={`theIcon ${styles.divx}`}>
          <div className={styles.divxnd}>
            <div className={styles.ha}>
              <div className={styles.iconk2}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='60'
                  height='60'
                  viewBox='0 0 60 60'
                  fill='none'>
                  <circle
                    cx='30'
                    cy='30'
                    r='27.5'
                    fill='white'
                    stroke='url(#paint0_linear_460_104801)'
                    stroke-width='5'
                  />
                  <defs>
                    <linearGradient
                      id='paint0_linear_460_104801'
                      x1='8.5'
                      y1='9'
                      x2='49.5'
                      y2='49.5'
                      gradientUnits='userSpaceOnUse'>
                      <stop stop-color='#68AD23' />
                      <stop offset='1' stop-color='#56D594' />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={styles.icon}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='26'
                    viewBox='0 0 26 26'
                    fill='none'>
                    <path
                      d='M14.6243 3.25H12.9993H8.41602C6.75916 3.25 5.41602 4.59315 5.41602 6.25V19.75C5.41602 21.4069 6.75916 22.75 8.41602 22.75H17.5827C19.2395 22.75 20.5827 21.4069 20.5827 19.75V11.7135V9.34375M14.6243 3.25L20.5827 9.34375M14.6243 3.25V8.34375C14.6243 8.89603 15.0721 9.34375 15.6243 9.34375H20.5827'
                      stroke='#67AE27'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M9.75 18.4167L12.4583 15.7083L14.0833 17.3333L16.7917 14.625'
                      stroke='#67AE27'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.divxtext}>
              <p className={styles.text2}>
                Quản lý dữ liệu điểm danh theo tháng
              </p>
            </div>
          </div>
          <div className={styles.divxnumber}>
            <p className={styles.textnumber}>
              {ccData?.count_success
                ? Number(ccData?.count_success)?.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                  })
                : '00'}{' '}
              lần
            </p>
          </div>
        </Card>
        <Card className={`theIcon ${styles.divx}`}>
          <div className={styles.divxnd}>
            <div className={styles.ha}>
              <div className={styles.iconk2}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='60'
                  height='60'
                  viewBox='0 0 60 60'
                  fill='none'>
                  <circle
                    cx='30'
                    cy='30'
                    r='27.5'
                    fill='white'
                    stroke='url(#paint0_linear_1781_138252)'
                    stroke-width='5'
                  />
                  <defs>
                    <linearGradient
                      id='paint0_linear_1781_138252'
                      x1='8.5'
                      y1='9'
                      x2='49.5'
                      y2='49.5'
                      gradientUnits='userSpaceOnUse'>
                      <stop stop-color='#FE5C4B' />
                      <stop offset='1' stop-color='#FEBA01' />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={styles.icon}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='26'
                    viewBox='0 0 26 26'
                    fill='none'>
                    <circle
                      cx='12'
                      cy='8'
                      r='4'
                      stroke='#FE5F48'
                      stroke-width='2'
                    />
                    <path
                      d='M14 15L19 20M19 15L14 20'
                      stroke='#FE5F48'
                      stroke-width='2'
                      stroke-linecap='round'
                    />
                    <path
                      d='M10 21C10.5523 21 11 20.5523 11 20C11 19.4477 10.5523 19 10 19V21ZM10 19H4.38095V21H10V19ZM11.619 13H12V11H11.619V13ZM4.38095 19C4.72284 19 5 19.2772 5 19.619H3C3 20.3817 3.61827 21 4.38095 21V19ZM5 19.619C5 15.9634 7.96345 13 11.619 13V11C6.85888 11 3 14.8589 3 19.619H5Z'
                      fill='#FE5F48'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.divxtext}>
              <p className={styles.text3}>Điểm danh không hợp lệ trong tháng</p>
            </div>
          </div>
          <div className={styles.divxnumber}>
            <p className={styles.textnumber}>
              {ccData?.time_keeping_not_invalid
                ? Number(ccData?.time_keeping_not_invalid)?.toLocaleString(
                    'en-US',
                    { minimumIntegerDigits: 2 }
                  )
                : '00'}{' '}
              lần
            </p>
          </div>
        </Card>
      </div>
      <Row gutter={24} className={styles.khung3}>
        <Col md={15} sm={24} xs={24} className={styles.chart}>
          <div className={styles.header}>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'>
                <path
                  d='M8 13V17M16 11V17M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
            <div className={styles.textHead}>Lịch sử chấm công trong Tuần</div>
          </div>
          <div className={styles.khungchart}>
            <div className={styles.charts}>
              <BarChart
                width={600}
                height={370}
                data={chartData}
                margin={{
                  top: 50,
                  left: -35,
                  right: 10,
                  bottom: 10,
                }}>
                <text
                  x='15%'
                  y='30'
                  textAnchor='middle'
                  className={styles.chartTitle}>
                  Số lần chấm công
                </text>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='name'
                  tick={{ fontSize: 16, color: '#474747' }}
                />
                <YAxis
                  ticks={yAxisTicks}
                  domain={[0, 5]}
                  allowDataOverflow={true}
                  tick={{ fontSize: 16, color: '#474747' }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div
                          style={{ backgroundColor: '#fff', padding: '10px' }}>
                          <p>Số lần chấm công: {payload?.[0]?.payload?.uv}</p>
                        </div>
                      )
                    }

                    return null
                  }}
                />
                <Bar dataKey='uv' fill='#4C5BD4'>
                  <LabelList dataKey='date' content={renderCustomizedLabel} />
                </Bar>
              </BarChart>
            </div>
          </div>
        </Col>
        <Col md={9} sm={24} xs={24} className={styles.list}>
          <div className={styles.header}>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='24'
                viewBox='0 0 25 24'
                fill='none'>
                <path
                  d='M6.02786 16.7023C7.1602 18.2608 8.8169 19.3584 10.6936 19.7934C12.5703 20.2284 14.5409 19.9716 16.2434 19.0701C17.946 18.1687 19.266 16.6832 19.9611 14.8865C20.6562 13.0898 20.6796 11.1027 20.027 9.29011C19.3745 7.47756 18.0898 5.96135 16.409 5.02005C14.7282 4.07875 12.7641 3.77558 10.8777 4.16623C8.99129 4.55689 7.30919 5.61514 6.14045 7.14656C4.97171 8.67797 4.39482 10.5797 4.51579 12.5023M4.51579 12.5023L3.01579 11.0023M4.51579 12.5023L6.01579 11.0023'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M12.5 8V12L15.5 15'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
            <div className={styles.textHead}>Lịch sử chấm công gần nhất</div>
          </div>
          <div>
            <List
              className={`list_nhanvien ${styles.khunglist}`}
              pagination={false}
              dataSource={ccData?.history ? ccData?.history?.reverse() : []}
              rowKey={(item) => item?.['_id']}
              renderItem={(item, index) => (
                <List.Item className={styles.lists}>
                  <div>
                    <div className={styles.textname}>
                      {check('Bạn', item?.['is_success'])}
                    </div>
                    <div>
                      <p className={styles.ca}>{item?.['shift_name']}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}>
                      <div style={{ marginTop: '3px' }}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          fill='none'>
                          <path
                            d='M3.75 2.25L1.5 4.5M16.5 4.5L14.25 2.25M4.5 14.25L3 15.75M13.5 14.25L15 15.75M9 6.75V9.75L10.5 11.25M9 15.75C10.5913 15.75 12.1174 15.1179 13.2426 13.9926C14.3679 12.8674 15 11.3413 15 9.75C15 8.1587 14.3679 6.63258 13.2426 5.50736C12.1174 4.38214 10.5913 3.75 9 3.75C7.4087 3.75 5.88258 4.38214 4.75736 5.50736C3.63214 6.63258 3 8.1587 3 9.75C3 11.3413 3.63214 12.8674 4.75736 13.9926C5.88258 15.1179 7.4087 15.75 9 15.75Z'
                            stroke='#474747'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </div>
                      <p className={styles.time}>
                        {item?.['at_time'] &&
                          moment(item?.['at_time'])?.format('HH:mm DD-MM-YYYY')}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}
