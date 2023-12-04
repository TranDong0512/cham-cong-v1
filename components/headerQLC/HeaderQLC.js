/** @format */
import { React, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './HeaderQLC.module.scss'
import { useRouter } from 'next/router'
const Cookies = require('js-cookie')
import { infoCom, infoEp, infoPersonal } from '../../utils/handleApi'
import ModalRegsiter from '@/components/modal/ModalRegsiter'
import ModalLogin from '@/components/modal/ModalLogin'
import ModalConfirm from '@/components/modal/ModalConfirm'
import OptionUser from '../optionUser/OptionUser'
export default function HeaderQLC({ currentPage, openSB, setOpenSB }) {
  const router = useRouter()

  const [popup, setPopup] = useState(false)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [openModalLogin, setOpenModalLogin] = useState(false)
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [option, setOption] = useState(false)
  const [linkHome, setLinkHome] = useState('')
  const optionUser = () => {
    if (option) {
      setOption(false)
    } else {
      setOption(true)
      setShowSideBar(false)
    }
  }

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
    document.cookie =
      'token_base365' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie =
      'rf_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie =
      'role' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.href = '/'
  }

  const [showSideBar, setShowSideBar] = useState(true)
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

  const [data, setData] = useState([])
  const [renderContent, setRenderContent] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined' && Cookies.get('token_base365')) {
      const getData = async () => {
        try {
          if (type() === '2') {
            let response = await infoEp()
            Cookies.set('phone', response.data.phoneTK)
            setData(response.data)

            if (response.data.authentic == 0) {
              setLinkHome(router.pathname)
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
            Cookies.set('phone', response.data.ep_phone_tk)
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
  }, [])

  return (
    <>
      <div className={styles.HeaderQLC}>
        <div
          className={styles.hambuger_close}
          onClick={() => setOpenSB(!openSB)}>
          {openSB === true ? (
            <img src='./qlc_close.png' alt='' />
          ) : (
            <img src='./hamburger.png' alt='' />
          )}
        </div>
        <div className={styles.left}>
          <div className={styles.title}>
            <span className={styles.prev_page}>Ứng dụng</span>
            <span> / </span>
            <span className={styles.curent_page}>{currentPage}</span>
          </div>
        </div>
        <div className={styles.logo}>
          <img src='./img/logo_hh.png' alt='' />
        </div>
        <div className={styles.right}>
          <div className={styles.gioithieu}>
            <span>Giới thiệu</span>
          </div>
          <div className={styles.huongdan}>
            <span>Hướng dẫn</span>
          </div>
          <div className={styles.tintuc}>
            <span>Tin tức</span>
          </div>
          <div className={styles.log}>
            {renderContent ? (
              <>
                <div className={styles.noty_user}>
                  <div className={styles.notify}>
                    <img
                      src='./qlc_notification.png'
                      alt=''
                      className={styles.img_noti}
                    />
                    <img
                      src='./notify_fill.png'
                      alt=''
                      className={styles.img_noti_fill}
                    />
                    <span>2</span>
                  </div>
                  <div className={styles.user} onClick={optionUser}>
                    <div className={styles.img_user}>
                      {data.avatarUser ? (
                        <img
                          src={data.avatarUser}
                          className={styles.avt_img_tk}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '../img/logo_com.png'
                          }}
                        />
                      ) : (
                        <img
                          src='../img/logo_com.png'
                          alt=''
                          className={styles.avt_img_tk}
                        />
                      )}
                      <span>{data?.userName}</span>
                      {/* <span>Nguyễn Quốc Doanh</span> */}
                    </div>

                    <img
                      src='./arrow_down_black.png'
                      alt=''
                      className={styles.arrow}
                    />
                    {
                      <OptionUser
                        type={type()}
                        option={option}
                        setOption={setOption}
                      />
                    }
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.register_login}>
                <span
                  className={styles.register}
                  onClick={() => setOpenModalRegister(true)}>
                  Đăng ký
                </span>
                <span
                  className={styles.login}
                  onClick={() => setOpenModalLogin(true)}>
                  Đăng nhập
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {openModalConfirm && (
        <ModalConfirm
          setOpenModalConfirm={setOpenModalConfirm}
          setOpenModalRegister={setOpenModalRegister}
          setOpenModalLogin={setOpenModalLogin}
        />
      )}
      {openModalRegister && (
        <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />
      )}
      {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
    </>
  )
}
