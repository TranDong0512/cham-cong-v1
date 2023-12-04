import { useLayoutEffect, useRef, useState } from 'react'
import styles from './chi-tiet-de-xuat-dang-cho-duyet.module.css'
import Image from 'next/image'
import { Status } from '../../de-xuat-cua-toi/chi-tiet-de-xuat/chi-tiet-de-xuat'
import { GroupButton } from '../component/ChiTiet'
import { ModalDetailsLLV } from '@/components/tao-de-xuat/de-xuat-lich-lam-viec/chi-tiet-de-xuat/modal'
import { Col, Row } from 'antd'

export function ChiTietDeXuatDangChoDuyet(data: any) {
  const targetRef: any = useRef()
  const targetRef414: any = useRef()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width:
          targetRef?.current?.offsetWidth === 0
            ? targetRef414?.current?.offsetWidth
            : targetRef?.current?.offsetWidth,
        height: targetRef?.current?.offsetHeight,
      })
    }
  }, [data?.companyAcp])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Image src={'/back-w.png'} alt='' width={24} height={24}></Image>
              <p className={styles.headerText}>Trở lại danh sách</p>
            </div>
            <Image src={'/print.png'} alt='' width={30} height={30}></Image>
          </div>
          <div className={styles.body}>
            <Row>
              <Col span={18}>
                <p className={styles.bodyHeader}>{data?.name}</p>

                <div className={styles.tab}>
                  <p className={styles.headerTab}>Thông tin đề xuất</p>
                  {Object.keys(data?.dxInfo)?.map((k, index) => (
                    <p key={index}>
                      {k}:{' '}
                      <span style={{ color: data?.dxInfo?.[k]?.color }}>
                        {data?.dxInfo?.[k]?.value}
                      </span>
                    </p>
                  ))}
                </div>
                <div className={styles.tab}>
                  <p className={styles.headerTab}>Thông tin chung</p>
                  {Object.keys(data?.commonInfo)?.map((k, index) => (
                    <div key={index} className={styles.gap}>
                      <p>
                        {!data?.commonInfo?.[k]?.noIndex && `${index + 1}.`}
                        {k}:{' '}
                        <span style={{ color: data?.commonInfo?.[k]?.color }}>
                          {data?.commonInfo?.[k]?.value}
                          {data?.commonInfo?.[k]?.component &&
                            data?.commonInfo?.[k]?.component}
                        </span>
                      </p>

                      {data?.commonInfo?.[k]?.more &&
                        Object.keys(data?.commonInfo?.[k]?.more).map(
                          (key, indx) => (
                            <>
                              <span
                                key={indx}
                                style={{
                                  color:
                                    data?.commonInfo?.[k]?.more?.[key]?.color,
                                }}>
                                {key}:{' '}
                                {data?.commonInfo?.[k]?.more?.[key]?.value}
                              </span>
                              {data?.commonInfo?.[k]?.more?.[key]?.more &&
                                Object.keys(
                                  data?.commonInfo?.[k]?.more?.[key]?.more
                                )?.map((k1, index1) => (
                                  <span
                                    key={index1}
                                    style={{
                                      color:
                                        data?.commonInfo?.[k]?.more?.[key]
                                          ?.more?.[k1]?.color,
                                    }}>
                                    {k1}:{' '}
                                    {
                                      data?.commonInfo?.[k]?.more?.[key]
                                        ?.more?.[k1]?.value
                                    }
                                  </span>
                                ))}
                            </>
                          )
                        )}
                    </div>
                  ))}
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.groupButton}>
                  {GroupButton(data?.admin, data?.type, data?.overtime)}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={`${styles.header} ${styles.header2}`}>
            <Image src={'/info.png'} alt='' width={24} height={24}></Image>
            <p className={styles.headerText}>Thông tin đề xuất</p>
          </div>
          <div className={styles.body2}>
            <div className={styles.bodyRight}>
              <p className={styles.headerTab}>Lãnh đạo duyệt</p>
              {data?.duyetInf?.leaderDuyet?.map((item, indx) => (
                <div className={styles.itemPeople} key={indx}>
                  <Image
                    src={item?.avatar}
                    loader={() => `${item?.avatar}`}
                    alt=''
                    width={60}
                    height={60}></Image>
                  <div className={styles.infor}>
                    <p style={{ color: '#4c5bd4' }}>{item?.name}</p>
                    <p>ID: {item?.id}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.bodyRight}>
              <p className={styles.headerTab}>Người theo dõi</p>
              {data?.duyetInf?.monitorDuyet?.map((item, indx) => (
                <div className={styles.itemPeople} key={indx}>
                  <Image
                    src={item?.avatar}
                    loader={() => item?.avatar}
                    alt=''
                    width={60}
                    height={60}></Image>
                  <div className={styles.infor}>
                    <p style={{ color: '#4c5bd4' }}>{item?.name}</p>
                    <p>ID: {item?.id}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.bodyRight}>
              <p className={styles.headerTab}>Trạng thái đề xuất</p>
              <div className={styles.status}>
                {data?.duyetInf?.dxState?.map((item, indx) => (
                  <div key={indx}>
                    {item?.time
                      ? Status(item?.name, item?.time, item?.action, item?.type)
                      : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
