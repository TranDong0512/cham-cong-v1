import { React, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Cookies = require('js-cookie')
import styles from './Header.module.css'

import { infoCom, infoEp, infoPersonal } from '../../utils/handleApi'
import { Button } from 'antd'
import ModalRegsiter from '../modal/ModalRegsiter'
import ModalLogin from '../modal/ModalLogin'
import ModalConfirm from '../modal/ModalConfirm'
import { ModalSignInHome } from '../modal/ModalSigninCC'
import { COOKIE_KEY } from '@/pages'
import axios from 'axios'

export default function Header() {
  // get pathname url
  const router = useRouter()
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [openModalLogin, setOpenModalLogin] = useState(false)
  const [data, setData] = useState([])
  const [renderContent, setRenderContent] = useState(false)

  const [getLinkHome, setLinkHome] = useState('/')
  const [popup, setPopup] = useState(false)
  const showPopup = () => {
    if (popup) {
      setPopup(false)
    } else {
      setPopup(true)
    }
  }

  const [showLogout, setShowLogout] = useState(false)

  const show = () => {
    setShowLogout(true)
  }

  const no = () => {
    setShowLogout(false)
  }

  const yes = () => {
    // window.alert('Logging out')
    // document.cookie =
    //   'token_base365' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // document.cookie =
    //   'rf_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // document.cookie =
    //   'role' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    Cookies.remove('token_base365')
    Cookies.remove('refresh_token')

    Cookies.remove('rf_token')
    Cookies.remove('role')
    Cookies.remove('com_id')
    Cookies.remove('phone')
    Cookies.remove('userName')

    Cookies.remove('token_base365', {
      expires: 0,
      path: '/',
      domain: '.hungha365.com',
      secure: true,
      sameSite: 'None',
    })

    window.location.href = '/'
  }

  const [showSideBar, setShowSideBar] = useState(false)
  const handleSideBar = () => {
    if (showSideBar === false) {
      setShowSideBar(true)
    } else {
      setShowSideBar(false)
    }
  }
  const type = () => {
    return Cookies.get('role')
  }
  const [reload, setReload] = useState(false)
  const [success, setSuccess] = useState(false)


  const check_token = async () => {
    try {
      const token = Cookies.get("token_base365")
      const refresh_token = Cookies.get("refresh_token");
      console.log("refresh_token", refresh_token)
      if (!token) {
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/qlc/employee/getNewToken`,
          { rf_token: refresh_token }
        )
        if (resp?.status === 200) {
          const token_new = resp?.data?.data?.token
          if (token_new) {
            let data = jwtDecode(token_new)
            if (data) {
              console.log("data", data)
              data = data?.data
              Cookies.set('rf_token', resp?.data?.data?.refreshToken)
              Cookies.set('token_base365', token_new)
              Cookies.set('role', data?.type)
              Cookies.set('userID', data?.idQLC)
              Cookies.set('userName', data?.userName)
              Cookies.set('phone', data?.phoneTK)
              Cookies.set('com_id', data?.com_id)
            }
          }
        }
      }

    } catch (error) {
      console.log("errorerror", error)
    }
  }

  useEffect(() => {
    const call = async () => {
      console.log("vao day roi")
      await check_token()
      console.log(" Cookies.get('token_base365')", Cookies.get('token_base365'))
      if (typeof window !== 'undefined' && Cookies.get('token_base365')) {
        const getData = async () => {
          try {
            if (type() === '2') {
              let response = await infoEp()
              Cookies.set('phone', response.data.phoneTK)
              setData(response.data)

              if (response.data.authentic == 0) {
                setLinkHome('/')
              } else {
                setLinkHome('/')
              }
            } else if (type() === '1') {
              let response = await infoCom()
              Cookies.set('phone', response.data.com_phone_tk)
              setData(response.data)

              if (response.data.authentic == 0) {
                setLinkHome(router.pathname)
              } else {
                setLinkHome('/')
              }
            } else {
              let response = await infoPersonal()
              Cookies.set('phone', response.data.phoneTK)
              setData(response.data)
              if (response.data.ep_authentic == 0) {
                setLinkHome(router.pathname)
              } else {
                setLinkHome('/quan-ly-ung-dung-ca-nhan.html')
              }
            }
          } catch (error) {
            console.log('Error:', error)
          }
        }
        getData()
        setRenderContent(true)
      }
      setSuccess(true)
    }
    call()

  }, [])




  const [key, setKey] = useState()
  const [openModal, setOpenModal] = useState(false)
  if (success)
    return (
      <>
        <div
          className={styles.header_ql}
          style={{ background: '#4c5bd4', position: 'fixed', zIndex: 999999 }}>
          <div className={styles.cnt_header}>
            <div className={styles.bg_wra}>
              <div className={styles.bg_ima_menu} onClick={handleSideBar}>
                <p className={`${styles.menu_popup} ${styles.btx_modal_ind}`}>
                  <img src='/img/menu.png' alt='menu' />
                </p>
              </div>
              <div className={styles.bg_ima}>
                <a href='/'>
                  <img src='/img/logo_h.svg' alt='logo công ty' />
                </a>
              </div>
              <div className={styles.header_nav}>
                <div className={styles.nav}>
                  <ul>
                    <li>
                      <Link
                        href={'https://hungha365.com/tin-tuc/gioi-thieu-chung-ve-hungha365-24'}
                        className={`cr_weight_bold share_fsize_tow share_clr_tow  ${router.pathname === '/' ? 'active' : ''
                          }`}
                        style={{ fontSize: "18px" }}
                        target="_blank"
                      >
                        Giới thiệu
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={'https://hungha365.com/tin-tuc/thong-tin-can-viet-ve-hungha365-18'}
                        className={`cr_weight_bold share_fsize_tow share_clr_tow ${router.pathname === '/san-pham.html' ? 'active' : ''
                          }`}
                        style={{ fontSize: "18px" }}
                        target="_blank"
                      >
                        Hướng dẫn
                      </Link>
                    </li>
                    {/* <li>
                    <Link
                      href={'/he-sinh-thai.html'}
                      className={`cr_weight_bold share_fsize_tow share_clr_tow ${
                        router.pathname === '/he-sinh-thai.html' ? 'active' : ''
                      }`}>
                      Hệ sinh thái
                    </Link>
                  </li> */}
                    <li>
                      <Link
                        href='https://hungha365.com/tin-tuc'
                        className='cr_weight_bold share_fsize_tow share_clr_tow'
                        style={{ fontSize: "18px" }}
                        target='_blank'
                      >
                        Tin tức
                      </Link>
                    </li>
                  </ul>
                  {renderContent ? (
                    <>
                      <div className={styles.hd_log}>
                        <div className={styles.bg_log_aff} data='97602'>
                          <div
                            className={styles.bg_log_img}
                            onClick={showPopup}
                            style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={
                                data.avatarUser
                                  ? data.avatarUser
                                  : `../img/add.png`
                              }
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = '/img/logo_com.png'
                              }}
                            />
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <p style={{ color: '#fff', marginLeft: '10px' }}>
                                {data?.com_name || data?.userName}
                              </p>
                              <p style={{ color: '#fff', marginLeft: '10px' }}>
                                ID :{' '}
                                {data?.inForPerson ? data?.idQLC : data?.com_id}
                              </p>
                            </div>
                          </div>
                          <div
                            className={styles.bg_logout}
                            style={{
                              display: popup
                                ? renderContent
                                  ? 'block'
                                  : 'none'
                                : 'none',
                            }}>
                            <div className={styles.chd_content}>
                              <p className={styles.chuyen_doi}>
                                <a href={getLinkHome}>Chuyển đổi số 365</a>
                              </p>
                              <p
                                className={`${styles.dang_xuat} ${styles.btx_logout}`}
                                onClick={show}>
                                <a>Đăng xuất</a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <div className={styles.hd_log}>
                      <div className={styles.bg_log}>
                        <p style={{ color: '#fff' }}>
                          <Link
                            href={'lua-chon-dang-ky.html/'}
                            className='cr_weight_bold share_fsize_tow share_clr_tow'>
                            Đăng ký{' '}
                          </Link>
                          /
                          <Link
                            href={'/lua-chon-dang-nhap.html'}
                            className='cr_weight_bold share_fsize_tow share_clr_tow'>
                            {' '}
                            Đăng nhập
                          </Link>
                        </p>
                      </div>
                    </div> */}
                      <div className={styles.hd_log} >
                        <Button
                          className={'btnU'}
                          style={{
                            backgroundColor: '#FFAF52',
                            marginRight: '10px',
                            height: "36px"
                          }}
                          onClick={() => setOpenModalLogin(true)}>
                          <p style={{ color: '#fff', fontSize: "18px" }}>Đăng nhập</p>
                        </Button>
                        <Button
                          className={'btnU'}
                          onClick={() => setOpenModalRegister(true)}
                          style={{ height: "36px" }}
                        >

                          <p style={{ color: '#4C5BD4', fontSize: "18px" }}>Đăng ký</p>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div >
        <div
          className={styles.bg_logout}
          style={{
            display: popup ? (renderContent ? 'none' : 'block') : 'none',
          }}>
          <div className={styles.chd_content}>
            <p className={styles.chuyen_doi}>
              <a href='/'>Chuyển đổi số 365</a>
            </p>
            <p
              className={`${styles.dang_xuat} ${styles.btx_logout}`}
              onClick={show}>
              <a>Đăng xuất</a>
            </p>
          </div>
        </div>
        <div
          className={`${styles.modal_share} ${styles.modal_share_four} ${styles.logout_ht}`}
          style={{ display: showLogout ? 'block' : 'none' }}>
          <div className={styles['modal-content']}>
            <div className={styles.info_modal}>
              <div className={styles['modal-header']}>
                <div className={styles.header_ctn_share}>
                  <h4
                    className={`${styles.ctn_share_h} ${styles.share_clr_tow} ${styles.tex_center} ${styles.cr_weight_bold}`}>
                    Đăng xuất
                  </h4>
                </div>
              </div>
              <div className={styles['modal-body']}>
                <div className={styles.ctn_body_modal}>
                  <div className={styles.madal_form}>
                    <div
                      className={`${styles.edit_share_form} ${styles.share_distance_big} ${styles.logout_ht_form}`}>
                      <div className={styles.titl_dele_nv}>
                        <p
                          className={`${styles.share_fsize_tow} ${styles.share_clr_one} ${styles.tex_center} ${styles.log_tlt}`}>
                          Bạn có muốn đăng xuất ra khỏi hệ thống?
                        </p>
                      </div>
                      <div className={styles.form_butt_ht}>
                        <div className={styles.tow_butt_flex}>
                          <button
                            type='button'
                            className={`${styles.share_fsize_three} ${styles.cr_weight} ${styles.share_cursor} ${styles.share_clr_four} ${styles.share_bgr_tow} ${styles.huy_button}`}
                            onClick={no}>
                            Hủy
                          </button>
                          <button
                            type='button'
                            style={{ color: '#000' }}
                            className={`${styles.share_clr_tow} ${styles.cr_weight} ${styles.share_cursor} ${styles.share_fsize_three}${styles.share_bgr_one} ${styles.dongy_button} ${styles.logout_all} `}
                            onClick={yes}>
                            Đồng ý
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.modal_ind} ${styles.share_res_header}`}
          style={{ display: showSideBar ? 'block' : 'none' }}
          onClick={handleSideBar}>
          <div className={styles['modal-content']}>
            <div className={`${styles.ctn_ind} ${styles.share_bgr_one}`}>
              <div className={styles['modal-body']}>
                {renderContent ? (
                  <>
                    <div className={styles.ind_one}>
                      <div
                        className={`${styles.avt_log_ind} ${styles.share_clr_tow} ${styles.share_fsize_tow} ${styles.cr_weight_bold}`}>
                        <img
                          src={
                            data.avatarUser ? data.avatarUser : `../img/add.png`
                          }
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '/img/logo_com.png'
                          }}
                        />
                        {data.userName}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className={styles['ind-tow']}>
                  <div className={styles.ctn_ulli}>
                    <ul className={styles['navbar-nav']}>
                      <a href={getLinkHome} className={styles['nav-item']}>
                        <li
                          className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                          <span className={styles.item_ic}>
                            <img src='../img/home_ind.png' alt='' />
                          </span>
                          <p style={{ color: '#fff' }}>Trang chủ</p>
                        </li>
                      </a>
                      <a href='/san-pham.html' className={styles['nav-item']}>
                        <li
                          className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                          <span className={styles.item_ic}>
                            <img src='../img/ung-dung.png' alt='' />
                          </span>
                          <p style={{ color: '#fff' }}>Sản phẩm</p>
                        </li>
                      </a>
                      <a href='/he-sinh-thai.html' className={styles['nav-item']}>
                        <li
                          style={{ display: 'flex', alignItems: 'center' }}
                          className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                          <span className={styles.item_ic}>
                            <img src='../img/he_sinhthai.png' alt='' />
                          </span>
                          <p style={{ color: '#fff' }}>Hệ sinh thái</p>
                        </li>
                      </a>
                      <a
                        href='https://dev.timviec365.vn/blog'
                        className={styles['nav-item']}>
                        <li
                          style={{ display: 'flex', alignItems: 'center' }}
                          className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                          <span className={styles.item_ic}>
                            <img src='../img/tin-tuc.png' alt='' />
                          </span>
                          <p style={{ color: '#fff', fontSize: "18px" }}>Tin tức</p>
                        </li>
                      </a>
                      {!renderContent ? (
                        <>
                          <div
                            // href='https://hungha365.com/lua-chon-dang-ky.html'
                            onClick={() => setOpenModalRegister(true)}
                            className={styles['nav-item']}>
                            <li
                              className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                              <span className={styles.item_ic}>
                                <img src='../img/logout_i.png' alt='' />
                              </span>
                              <p style={{ color: '#fff' }}>Đăng ký</p>
                            </li>
                          </div>
                          <div
                            onClick={() => setOpenModal(true)}
                            // href='/lua-chon-dang-nhap.html'
                            className={styles['nav-item']}>
                            <li
                              className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                              <span className={styles.item_ic}>
                                <img src='../img/logout_ind.png' alt='' />
                              </span>
                              <p style={{ color: '#fff' }}>Đăng nhập</p>
                            </li>
                          </div>
                        </>
                      ) : (
                        <>
                          <a
                            href='/quan-ly-ung-dung-cong-ty.html'
                            className={styles['nav-item']}>
                            <li
                              className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} ${styles.d_flex}`}>
                              <span className={styles.item_ic}>
                                <img src='../img/chuyen_d.png' alt='' />
                              </span>
                              <p style={{ color: '#fff' }}>Chuyển đổi số 365</p>
                            </li>
                          </a>
                          <div>
                            <a className='nav-item btx_logout' onClick={show}>
                              <li
                                className={`${styles['nav-child-item']} ${styles.cr_weight_bold} ${styles.share_fsize_tow} ${styles.share_clr_tow} `}>
                                <span className={styles.item_ic} style={{ padding: '10px 15px', position: 'relative', top: 4 }}>
                                  <img src='../img/logout_ind.png' alt='' />
                                </span>
                                <p style={{ color: '#fff', display: 'inline-block' }}>Đăng xuất</p>
                              </li>
                            </a>
                          </div>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          openModalConfirm && (
            <ModalConfirm
              setOpenModalConfirm={setOpenModalConfirm}
              setOpenModalRegister={setOpenModalRegister}
              setOpenModalLogin={setOpenModalLogin}
            />
          )
        }
        {
          openModalRegister && (
            <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />
          )
        }
        {
          openModalLogin && (
            <ModalLogin
              setOpenModalLogin={setOpenModalLogin}
              setKey={setKey}
              setOpenModal={setOpenModal}
            />
          )
        }
        <ModalSignInHome open={openModal} setOpen={setOpenModal} type={key} />
      </>
    )
  else return null


}
