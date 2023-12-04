import { Button, Col, Row } from 'antd'
import styles from './[id].module.css'
import Image from 'next/image'
import { HorizontalLine } from '@/components/commons/Components'
import {
  ConfirmHuyDuyet,
  ConfirmTamUngModal,
} from '@/components/de-xuat/tam-ung-tien/modal'
import { useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { POST_SS_VT } from '@/pages/api/BaseApi'

export default function ChiTietTamUng({ dxDetail }) {
  const [openConfirm, setOpenComfirm] = useState(false)
  const [openHuy, setOpenHuy] = useState(false)
  const [tamUngState, setTamUngState] = useState(
    dxDetail?.thoi_gian_duyet ? true : false
  )

  const SingleInfo = ({
    title,
    data,
    isBlue,
  }: {
    title: any
    data: any
    isBlue: boolean
  }) => (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <p>{title}:</p>
      <p style={{ color: isBlue ? '#4C5BD4' : '#666666', marginLeft: '5px' }}>
        {data}
      </p>
    </div>
  )

  const line = () => (
    <div style={{ margin: '20px 0px' }}>
      <HorizontalLine color='#ACACAC' />
    </div>
  )
  const Item = ({
    img,
    name,
    id,
    title,
  }: {
    img: string
    name: string
    id: string
    title: string
  }) => (
    <div>
      <p className={styles.itemTitle}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image alt='/' src={img} width={60} height={60} />
        <div style={{ marginLeft: '10px' }}>
          <p
            style={{
              fontWeight: '500',
              color: '#4C5BD4',
              marginBottom: '5px',
            }}>
            {name}
          </p>
          <p>ID: {id}</p>
        </div>
      </div>
    </div>
  )

  const State = ({
    icon,
    time,
    name,
    action,
  }: {
    time: string
    name: string
    action: string
    icon: string
  }) => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <Image
          alt='/'
          src={icon}
          width={20}
          height={20}
          style={{ marginRight: '10px' }}
        />
        <p>
          {time} <span style={{ color: '#4C5BD4' }}>{name}</span> {action}
        </p>
      </div>
    )
  }

  return (
    <>
      <Row className={styles.main} gutter={{ md: 20, sm: 20, xs: 0 }}>
        <Col md={17} sm={24} xs={24} className={styles.cardFirst}>
          <div className={styles.card} style={{ height: '100%' }}>
            <div className={styles.header}>
              <div className={styles.printImg}>
                <Image alt='/' src={'/print.png'} width={30} height={30} />
              </div>
            </div>
            <p className={styles.title}>Đề xuất tạm ứng tiền</p>
            <Row className={styles.body} gutter={{ md: 20 }}>
              <Col sm={14} xs={24} className={styles.info}>
                <div>
                  <p className={styles.itemTitle}>Thông tin đề xuất</p>
                  <div>
                    <SingleInfo
                      data={dxDetail?.nguoi_tao}
                      title={'Người tạo'}
                      isBlue={false}
                    />
                    <SingleInfo
                      data={dxDetail?.nhom_de_xuat}
                      title={'Nhóm đề xuất'}
                      isBlue={true}
                    />
                    <SingleInfo
                      data={
                        dxDetail?.thoi_gian_tao
                          ? dxDetail?.thoi_gian_tao.toString().length > 10
                            ? moment
                                .unix(moment(dxDetail?.thoi_gian_tao).unix())
                                .format('HH:mm A DD/MM/YYYY')
                            : moment
                                .unix(dxDetail?.thoi_gian_tao)
                                .format('HH:mm A DD/MM/YYYY')
                          : 'Chưa cập nhật'
                      }
                      title={'Thời gian tạo'}
                      isBlue={false}
                    />
                    <SingleInfo
                      data={
                        dxDetail?.cap_nhat
                          ? dxDetail?.cap_nhat
                          : 'Chưa cập nhật'
                      }
                      title={'Cập nhật'}
                      isBlue={false}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <p className={styles.itemTitle}>Thông tin chung</p>
                  <div>
                    <SingleInfo
                      data={dxDetail?.nguoi_tao}
                      title={'1. Người tạo'}
                      isBlue={false}
                    />
                    <SingleInfo
                      data={
                        dxDetail?.thong_tin_chung?.tam_ung?.sotien_tam_ung
                          ? dxDetail?.thong_tin_chung?.tam_ung?.sotien_tam_ung
                          : 'Chưa cập nhật'
                      }
                      title={'2. Số tiền tạm ứng'}
                      isBlue={true}
                    />
                    <SingleInfo
                      data={
                        dxDetail?.thong_tin_chung?.tam_ung?.ngay_tam_ung
                          ? moment
                              .unix(
                                dxDetail?.thong_tin_chung?.tam_ung?.ngay_tam_ung
                              )
                              .format('HH:mm A DD/MM/YYYY')
                          : 'Chưa cập nhật'
                      }
                      title={'3. Ngày tạm ứng'}
                      isBlue={false}
                    />
                    <SingleInfo
                      data={
                        dxDetail?.thong_tin_chung?.tam_ung?.ly_do
                          ? dxDetail?.thong_tin_chung?.tam_ung?.ly_do
                          : 'Chưa cập nhật'
                      }
                      title={'4. Lý do tạm ứng'}
                      isBlue={false}
                    />
                  </div>
                </div>
              </Col>
              <Col
                sm={10}
                xs={24}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'column',
                }}>
                <Button
                  size='large'
                  className={styles.approveBtn}
                  icon={
                    <Image
                      alt='/'
                      src={'/approve.png'}
                      width={24}
                      height={24}
                    />
                  }>
                  <p className={styles.txt}>Được chấp thuận</p>
                </Button>
                {!tamUngState ? (
                  <Button
                    size='large'
                    className={styles.confirmBtn}
                    icon={
                      <Image
                        alt='/'
                        src={'/approve-w.png'}
                        width={24}
                        height={24}
                      />
                    }
                    onClick={() => setOpenComfirm(true)}>
                    <p className={styles.txt}>Xác nhận được tạm ứng</p>
                  </Button>
                ) : (
                  <div
                    style={{
                      marginTop: '10px',
                    }}>
                    <Button
                      size='large'
                      className={styles.approveBtn}
                      icon={
                        <Image
                          alt='/'
                          src={'/approve.png'}
                          width={24}
                          height={24}
                        />
                      }>
                      <p className={styles.txt}>Đã được tạm ứng</p>
                    </Button>
                    <Button
                      size='large'
                      className={styles.abortBtn}
                      icon={
                        <Image
                          alt='/'
                          src={'/abort.png'}
                          width={24}
                          height={24}
                        />
                      }
                      onClick={() => setOpenHuy(true)}
                      style={{
                        marginTop: '10px',
                        marginLeft: 'auto',
                      }}>
                      <p className={styles.txt}>Hủy duyệt</p>
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={7} sm={24} style={{ height: '100%' }}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.contentWrapper}>
                <Image alt='/' src={'/info.png'} width={24} height={24} />
                <p className={styles.headerTxt}>Thông tin đề xuất</p>
              </div>
            </div>
            <div className={styles.body}>
              <div>
                <p className={styles.itemTitle}>Kiểu phê duyệt</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image alt='/' src={'/flag.png'} width={24} height={24} />
                  <p style={{ color: '#4C5BD4', marginLeft: '5px' }}>
                    Phê duyệt lần lượt
                  </p>
                </div>
              </div>
              {line()}
              {dxDetail?.lanh_dao_duyet?.map((emp: any, index: number) => {
                ;<Item
                  key={index}
                  id={emp?.idQLC}
                  img={emp?.avatarUser ? `/${emp.avatarUser}` : '/avatar.png'}
                  name={emp?.userName}
                  title='Người duyệt'
                />
              })}

              {line()}
              {dxDetail?.nguoi_theo_doi?.map((emp: any, index: number) => {
                ;<Item
                  key={index}
                  id={emp?.idQLC}
                  img={emp?.avatarUser ? `/${emp.avatarUser}` : '/avatar.png'}
                  name={emp?.userName}
                  title='Người theo dõi'
                />
              })}

              {line()}

              <div>
                <p className={styles.itemTitle}>Trạng thái đề xuất</p>
                <State
                  action='vừa tạo đề xuất'
                  time={
                    dxDetail?.thoi_gian_tao &&
                    dxDetail?.thoi_gian_tao.toString().length > 10
                      ? moment
                          .unix(moment(dxDetail?.thoi_gian_tao).unix())
                          .format('HH:mm A DD/MM/YYYY')
                      : moment
                          .unix(dxDetail?.thoi_gian_tao)
                          .format('HH:mm A DD/MM/YYYY')
                  }
                  name='Vũ Văn Khá'
                  icon='/add-circle.png'
                />

                {dxDetail?.thoi_gian_tiep_nhan !== 0 && (
                  <State
                    action='vừa tiếp nhận đề xuất'
                    time={moment(dxDetail?.thoi_gian_tiep_nhan).format(
                      'hh:mm A DD/MM/YYYY'
                    )}
                    name={dxDetail?.lanh_dao_duyet?.[0].userName}
                    icon='/share.png'
                  />
                )}

                {dxDetail?.thoi_gian_duyet !== 0 && (
                  <State
                    action='vừa duyệt đề xuất'
                    time={moment(dxDetail?.thoi_gian_duyet).format(
                      'hh:mm A DD/MM/YYYY'
                    )}
                    name={dxDetail?.lanh_dao_duyet?.[0].userName}
                    icon='/approve.png'
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ConfirmTamUngModal
        open={openConfirm}
        setOpen={setOpenComfirm}
        setTamUngState={setTamUngState}
        dxDetail={dxDetail}
      />
      <ConfirmHuyDuyet
        open={openHuy}
        setOpen={setOpenHuy}
        setTamUngState={setTamUngState}
        dxDetail={dxDetail}
      />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const idDx = context?.query?.id
  let dxDetail = {}
  const listDxRes = await POST_SS_VT(
    'api/vanthu/catedx/showCTDX',
    {
      _id: idDx,
    },
    context
  )
  if (listDxRes) {
    dxDetail = listDxRes?.detailDeXuat?.[0]
  }

  return {
    props: {
      dxDetail,
    },
  }
}
