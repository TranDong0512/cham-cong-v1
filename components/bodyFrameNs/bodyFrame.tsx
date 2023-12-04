import React, { useState } from 'react'
import styles from './bodyFrame.module.css'
import Header from '../header/Header.js'
import { Button, Card, Col, ConfigProvider, Popover, Row } from 'antd'
import IndexSection from '../home/index'
import Article from '../home/article/article'
import { BackButton, MyBreadCrumb } from './bread-crump/BreadCrump'
import { useRouter } from 'next/router'
import { AddButton, ExportExcelButton } from '../commons/Buttons'
import Footer from '../footer/Footer'
import { Banner } from './banner/banner'
import { CCBannerNV_TKCTY } from '../cham-cong-nhan-vien/cc-bang-tk-nv'
import { BANNER_CCBNDKM_CHAMCONG365 } from '../cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365'
import { BANNER_CCBNDKM_CHAT365 } from '../cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365'
import { BANNER_CCBNDKM_PC365NV } from '../cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien'
import { ChamCong365 } from '../cham-cong-bang-QR/cham-cong-365/cham-cong-365'
import { Chat365 } from '../cham-cong-bang-QR/chat-365/chat365'
import { PC365 } from '../cham-cong-bang-QR/pc365/pc365'
import { CCBanner } from './cai-dat-cham-cong-banner/cc-banner'
import Meta from '../meta/meta'
export interface BodyFrame {}

export const PAGE_DOMAIN = '/phan-mem-cham-cong/'

export default function Bodyframe({ children }: any) {
  const [showMore, setShowmore] = useState<boolean>(false)

  const router = useRouter()
  const CAI_DAT_VI_TRI_URL = `/cai-dat-vi-tri`
  const NV_CCCTY_URL = '/cham-cong-nhan-vien/cc-bang-tai-khoan-cong-ty'
  const NV_CCBNDKM_CC365 =
    '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365'
  const NV_CCBNDKM_CHAT365 =
    '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365'
  const NV_CCBNDKM_PC365 =
    '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien'
  const NV_CCQR_URL = `/cham-cong-bang-QR/cham-cong-365`
  const CTY_CCCTY = `/cham-cong/cham-cong-cong-ty`
  const ADD_DX = `${PAGE_DOMAIN}tao-de-xuat/tao-de-xuat`

  const AddNewPopoverContent = () => {
    const listAdds = [
      {
        title: 'Thêm mới công ty con',
        url: '/quan-ly-cong-ty/quan-ly-cong-ty-con',
        tabIndex: '1',
      },
      {
        title: 'Thêm mới phòng ban',
        url: '/quan-ly-cong-ty/quan-ly-phong-ban',
        tabIndex: '1',
      },
      {
        title: 'Thêm mới tổ',
        url: '/quan-ly-cong-ty/quan-ly-phong-ban',
        tabIndex: '2',
      },
      {
        title: 'Thêm mới nhóm',
        url: '/quan-ly-cong-ty/quan-ly-phong-ban',
        tabIndex: '3',
      },
    ]

    const item = (item: any) => (
      <p
        style={{ color: '#4C5BD4', cursor: 'pointer' }}
        onClick={() => {
          // window.localStorage.setItem(PHONGBAN_ACTIVE_KEY, item?.tabIndex)
          router.push(item?.url)
        }}>
        {item?.title}
      </p>
    )

    return (
      <div>
        {listAdds.map((singleLink: any, index: number) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {item(singleLink)}
          </div>
        ))}
      </div>
    )
  }

  const DEXUAT_TO_CHUC_URL = '/de-xuat/so-do-to-chuc'
  const DEXUAT_SO_DO_TO_CHUC_DANHSACHNHANVIEN =
    '/de-xuat/so-do-to-chuc/danh-sach-nhan-vien'
  const DEXUAT_SO_DO_TO_CHUC_DANHSACHNHANVIENCC =
    '/de-xuat/so-do-to-chuc/danh-sach-nhan-vien-cham-cong'
  const DEXUAT_SO_DO_TO_CHUC_DANHSACHNHANVIEN_CHUACC =
    '/de-xuat/so-do-to-chuc/danh-sach-nhan-vien-chua-cham-cong'
  const UPDATE_FACE_URL = '/cap-nhat-du-lieu-khuon-mat'
  const CC_TK_CTY_URL = '/cham-cong-bang-tai-khoan-cong-ty'
  const CC_TK_NV_URL = '/cham-cong-bang-tai-khoan-nhan-vien'
  const renderBackButton = () => {
    if (
      router.pathname !== CAI_DAT_VI_TRI_URL &&
      router.pathname !== NV_CCCTY_URL &&
      router.pathname !== NV_CCBNDKM_CC365 &&
      router.pathname !== NV_CCBNDKM_CHAT365 &&
      router.pathname !== NV_CCBNDKM_PC365 &&
      router.pathname !== CC_TK_CTY_URL &&
      router.pathname !== CC_TK_NV_URL &&
      router.pathname !== NV_CCQR_URL &&
      router.pathname !== UPDATE_FACE_URL &&
      router.pathname !== CTY_CCCTY
    ) {
      if (
        router.pathname?.includes(
          '/quan-ly-cong-ty/danh-sach-ung-vien/chi-tiet-ung-vien'
        )
      ) {
        return <div style={{ marginTop: '20px' }}></div>
      } else {
        return <BackButton router={router} color='#474747' isCC={false} />
      }
    }
  }

  const renderArticle = () => {
    if (
      router.pathname?.includes(
        'quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/chi-tiet-nhan-vien'
      ) ||
      router.pathname === UPDATE_FACE_URL ||
      router.pathname === CC_TK_CTY_URL ||
      router.pathname === CC_TK_NV_URL ||
      router.pathname === CTY_CCCTY
    ) {
      return <div></div>
    } else {
      return (
        <Row gutter={[20, 20]} className={`bannerQLC ${styles.moreSection}`}>
          <Col lg={6} md={8} sm={8} xs={24}>
            <Card className={styles.cardArticleSection}>
              <IndexSection
                className={styles.idxSection}
                setShowmore={setShowmore}
              />
            </Card>
          </Col>
          <Col lg={18} md={16} sm={16} xs={24}>
            <Card className={styles.cardArticleSection}>
              <Article
                className={styles.articleSection}
                showMore={showMore}
                setShowmore={setShowmore}
              />
            </Card>
            <div className={styles.btnWrapper}>
              <Button
                className={styles.moreBtn}
                onClick={() => setShowmore(!showMore)}>
                <p className={styles.text}>Xem thêm</p>
              </Button>
            </div>
          </Col>
        </Row>
      )
    }
  }

  const renderExportExcelBtn = () => {
    if (
      router.pathname === DEXUAT_SO_DO_TO_CHUC_DANHSACHNHANVIEN ||
      router.pathname === DEXUAT_SO_DO_TO_CHUC_DANHSACHNHANVIENCC ||
      router.pathname === DEXUAT_SO_DO_TO_CHUC_DANHSACHNHANVIEN_CHUACC
    ) {
      return (
        <div style={{ marginLeft: '20px' }}>
          {ExportExcelButton(() => null)}
        </div>
      )
    } else {
      return null
    }
  }

  const renderBanner = () => {
    const pathname = router.pathname
    if (pathname === '/cham-cong-nhan-vien/cc-bang-tai-khoan-cong-ty') {
      return <CCBannerNV_TKCTY />
    } else if (
      pathname ===
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365'
    ) {
      return <BANNER_CCBNDKM_CHAMCONG365 />
    } else if (
      pathname ===
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365'
    ) {
      return <BANNER_CCBNDKM_CHAT365 />
    } else if (
      pathname ===
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien'
    ) {
      return <BANNER_CCBNDKM_PC365NV />
    } else if (pathname === '/cham-cong-bang-QR/cham-cong-365') {
      return <ChamCong365 />
    } else if (pathname === '/cham-cong-bang-QR/chat-365') {
      return <Chat365 />
    } else if (pathname === '/cham-cong-bang-QR/pc-365') {
      return <PC365 />
    } else if (pathname === '/cai-dat-vi-tri') {
      return <CCBanner />
    } else if (
      pathname === UPDATE_FACE_URL ||
      pathname === CC_TK_CTY_URL ||
      pathname === CC_TK_NV_URL ||
      pathname === CTY_CCCTY
    ) {
      return null
    } else {
      return <Banner />
    }
  }

  return (
    <div
      style={{
        backgroundColor: `${
          router.pathname === '/pham-mem-cham-cong' ? '#F6F6F6' : ''
        }`,
      }}>
      <Header />
      {/* <Banner /> */}
      <div
        className='bannerQLC'
        style={{
          paddingTop:
            router.pathname === UPDATE_FACE_URL ||
            router.pathname === CC_TK_CTY_URL ||
            router.pathname === CC_TK_NV_URL ||
            router.pathname === CTY_CCCTY
              ? '0px'
              : '50px',
        }}>
        {renderBanner()}
      </div>
      {renderBackButton()}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        className={`bannerQLC ${
          router.pathname?.includes('/cap-nhat-du-lieu-khuon-mat') ||
          router.pathname.includes('/cham-cong-bang-tai-khoan-cong-ty') ||
          router.pathname.includes('/cham-cong-cong-ty') ||
          !router.pathname.includes(CTY_CCCTY)
            ? styles.breadcrumbUpdateFace
            : styles.breadcrumb
        }`}>
        {router.pathname !== CAI_DAT_VI_TRI_URL &&
          router.pathname !== NV_CCCTY_URL &&
          // router.pathname !== UPDATE_FACE_URL &&
          router.pathname !== NV_CCBNDKM_CC365 &&
          router.pathname !== NV_CCBNDKM_PC365 &&
          router.pathname !== NV_CCBNDKM_CHAT365 &&
          !router.pathname.includes(CTY_CCCTY) &&
          !router.pathname?.includes('/cham-cong-bang-QR') && (
            <MyBreadCrumb color='#474747' />
          )}
        {router.pathname === DEXUAT_TO_CHUC_URL && (
          <Popover content={AddNewPopoverContent()} trigger={'click'}>
            <div
              style={{
                marginLeft: ' 20px',
              }}>
              {AddButton('Thêm mới', () => null)}
            </div>
          </Popover>
        )}
        {renderExportExcelBtn()}
      </div>
      <div
        className={`bannerQLC ${
          router.pathname.includes('/cap-nhat-du-lieu-khuon-mat') ||
          router.pathname.includes('/cham-cong-bang-tai-khoan-cong-ty') ||
          router.pathname.includes('/cham-cong-cong-ty')
            ? 'hiddenScrollBar'
            : ''
        }`}>
        <div
          style={{
            marginTop:
              router.pathname.includes('/cap-nhat-du-lieu-khuon-mat') ||
              router.pathname.includes('/cham-cong-bang-tai-khoan-cong-ty') ||
              router.pathname.includes('/cham-cong-cong-ty') ||
              !router.pathname.includes(CTY_CCCTY)
                ? '0'
                : '10px',
          }}
          className={
            router.pathname === DEXUAT_TO_CHUC_URL ||
            router.pathname === UPDATE_FACE_URL ||
            router.pathname === CC_TK_CTY_URL ||
            router.pathname === CC_TK_NV_URL ||
            router.pathname === CTY_CCCTY
              ? styles.mainNoPadding
              : router.pathname.includes(ADD_DX)
              ? styles.noPaddingForm
              : styles.main
          }>
          {children}
        </div>
        {/* <div className={styles.main}>{renderArticle()}</div> */}
        {/* Vấn đề màn 414 width 50% tại đây!!!! --pvh */}
        <link
          rel='stylesheet'
          href='https://timviec365.vn/css/footer_new.css?v=2'
        />
        {router.pathname === UPDATE_FACE_URL ||
        router.pathname === CC_TK_CTY_URL ||
        router.pathname === CC_TK_NV_URL ||
        router.pathname === CTY_CCCTY ? null : (
          <Footer></Footer>
        )}
      </div>
    </div>
  )
}
