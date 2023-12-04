import moment from 'moment'
import styles from './index.module.css'
import { Button, Col, Progress, Row } from 'antd'
import { CheckIcon, InfoIcon, PackageIcon } from '@/constants/svgs'
import { useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { POST_SS_VT } from '@/pages/api/BaseApi'

const DXMockData = [
  {
    title: 'Đơn xin nghỉ ngày 24/06/2023',
    sender: 'Vũ Văn Khá',
    type: 1,
    time: '11:29 AM, 14/06/2023',
  },
  {
    title: 'Đơn xin nghỉ ngày 24/06/2023',
    sender: 'Vũ Văn Khá',
    type: 1,
    time: '11:29 AM, 14/06/2023',
  },
  {
    title: 'Đơn xin nghỉ ngày 24/06/2023',
    sender: 'Vũ Văn Khá',
    type: 0,
    time: '11:29 AM, 14/06/2023',
  },
  {
    title: 'Đơn xin nghỉ ngày 24/06/2023',
    sender: 'Vũ Văn Khá',
    type: 1,
    time: '11:29 AM, 14/06/2023',
  },
  {
    title: 'Đơn xin nghỉ ngày 24/06/2023',
    sender: 'Vũ Văn Khá',
    type: 0,
    time: '11:29 AM, 14/06/2023',
  },
  {
    title: 'Đơn xin nghỉ ngày 24/06/2023',
    sender: 'Vũ Văn Khá',
    type: 1,
    time: '11:29 AM, 14/06/2023',
  },
]

export default function LoaiDeXuat({
  deXuatSend,
  deXuatReceive,
  deXuatFollow,
}) {
  const router = useRouter()
  const currentDate = moment().format('DD/MM/YYYY')
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  })
  const HeadingDiv = () => {
    const MyButton = ({
      title,
      onclick,
    }: {
      title: string
      onclick: () => void
    }) => {
      return (
        <Button size='large' className={styles.btn} onClick={onclick}>
          <p className={styles.btnText}>{title}</p>
        </Button>
      )
    }

    return (
      <div className={styles.heading}>
        <p className={styles.date}>Hôm nay, ngày {currentDate}</p>
        <div className={styles.btnGroup}>
          <MyButton
            title='Tạo đề xuất'
            onclick={() => {
              router.push('/tao-de-xuat/loai-de-xuat/tao-de-xuat')
            }}
          />
          <MyButton
            title='Đề xuất của tôi'
            onclick={() =>
              router.push('/tao-de-xuat/loai-de-xuat/de-xuat-cua-toi')
            }
          />
        </div>
      </div>
    )
  }
  const Summary = ({ total, send, receive, dontAcp }) => {
    const SingleCard = ({
      total,
      title,
      isFirst,
      percent,
      color,
    }: {
      total: number
      title: string
      isFirst: boolean
      percent: number
      color: string
    }) => {
      return (
        <div
          className={styles.singleCard}
          style={{ marginRight: title === 'Đề xuất gửi đi' ? '0px' : '20px' }}>
          <p className={styles.numtxt} style={{ color: color }}>
            {total}
          </p>
          <p className={styles.title}>{title}</p>
          {isFirst && (
            <div>
              <p style={{ textAlign: 'center' }}>
                Hoàn thành: {percent ? (percent * 100)?.toFixed(2) : 0}%
              </p>
              <Progress
                style={{ width: '200px' }}
                percent={percent * 100}
                showInfo={false}
                strokeColor='#4C5BD4'
                className={styles.progress}
              />
            </div>
          )}
        </div>
      )
    }

    return (
      <div className={styles.summary}>
        <div className={styles.cardWrapper}>
          <SingleCard
            isFirst
            color='#474747'
            percent={(total - dontAcp) / total}
            title='Tổng số đề xuất'
            total={total}
          />
        </div>
        <div className={styles.cardWrapper}>
          <SingleCard
            isFirst={false}
            color='#FFA13B'
            percent={0.7}
            title='Đề xuất đang chờ duyệt'
            total={dontAcp}
          />
        </div>
        <div className={styles.cardWrapper}>
          <SingleCard
            isFirst={false}
            color='#4AA7FF'
            percent={0.7 * 100}
            title='Đề xuất cần duyệt'
            total={receive}
          />
        </div>
        <div className={`${styles.cardWrapper}`}>
          <SingleCard
            isFirst={false}
            color='#70BE28'
            percent={0.7}
            title='Đề xuất gửi đi'
            total={send}
          />
        </div>
      </div>
    )
  }

  const DXItem = ({ data }: { data: any }) => {
    return (
      <Col lg={8} md={12} sm={12}>
        <div className={styles.dxCard}>
          <div style={{ marginRight: '10px', width: '39px', height: '50px' }}>
            <PackageIcon />
          </div>
          <div style={{ width: '100%' }}>
            <p className={styles.title}>{data?.name_dx}</p>
            <p className={styles.sender}>{data?.name_user}</p>
            <div className={styles.footer}>
              <div className={styles.status}>
                {data?.type_duyet === 5 ? <CheckIcon /> : <InfoIcon />}
                <p
                  style={{
                    color: data?.type_duyet === 5 ? 'green' : '#4AA7FF',
                    marginLeft: '5px',
                  }}>
                  {data?.type_duyet === 5 ? 'Chấp thuận' : 'Đã gửi'}
                </p>
              </div>
              <p>
                {moment.unix(data?.time_create).format('HH:MM A, DD/MM/YYYY')}
              </p>
            </div>
          </div>
        </div>
      </Col>
    )
  }
  return (
    <div>
      <HeadingDiv />
      <div ref={ref} {...events} className={styles.mainWrapper}>
        <Summary
          total={deXuatSend.length + deXuatReceive.length + deXuatFollow.length}
          send={deXuatSend.length}
          receive={
            deXuatReceive.filter((data) => data?.type_duyet !== 5).length
          }
          dontAcp={deXuatSend.filter((data) => data?.type_duyet !== 5).length}
        />
      </div>
      <div className={styles.recentDxTitle}>
        <p className={styles.txt}>Đề xuất gần đây</p>
      </div>
      <Row gutter={[20, 20]}>
        {deXuatSend
          .sort((a: any, b: any) => b?.time_create - a?.time_create)
          .slice(0, 6)
          .map((item: any, index: number) => (
            <DXItem data={item} key={index} />
          ))}
      </Row>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const deXuatSend = await POST_SS_VT(
    'api/vanthu/DeXuat/user_send_deXuat_All',
    { type: 1 },
    context
  )
  const deXuatReceive = await POST_SS_VT(
    'api/vanthu/DeXuat/deXuat_send_user',
    { type: 1 },
    context
  )
  const deXuatFollow = await POST_SS_VT(
    'api/vanthu/DeXuat/deXuat_follow',
    { type: 1 },
    context
  )
  return {
    props: {
      deXuatSend: deXuatSend?.data || [],
      deXuatReceive: deXuatReceive?.data || [],
      deXuatFollow: deXuatFollow?.data || [],
    },
  }
}
