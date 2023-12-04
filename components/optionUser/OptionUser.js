import { type } from 'os'
import { React, useState, useEffect } from 'react'
import Logout from '../logout'

export default function OptionUser(props) {
  const [link, setLink] = useState('')
  const [getHtml, setHtml] = useState('')
  useEffect(() => {
    if (props.type === '1') {
      setLink('/quan-ly-thong-tin-tai-khoan-cong-ty.html')
    } else {
      setLink('/quan-ly-thong-tin-tai-khoan-nhan-vien.html')
    }
    if (props.type == '1' || props.type == '2') {
      const html = (
        <>
          <a href='/danh-gia.html' className='nav-item'>
            <li className='nav-child-item share_clr_one share_fsize_one'>
              <span className='item_ic'>
                <img src='../img/danh_gia.png' alt='' />
              </span>
              Đánh giá
            </li>
          </a>
          <a href='/bao-loi.html' className='nav-item'>
            <li className='nav-child-item share_clr_one share_fsize_one'>
              <span className='item_ic'>
                <img src='../img/bao-loi.png' alt='' />
              </span>
              Báo lỗi
            </li>
          </a>
        </>
      )
      setHtml(html)
    }
  }, [props.type])

  const [showLogout, setShowLogout] = useState(false)

  const logout = () => {
    props.setOption(true)
    setShowLogout(true)
  }

  return (
    <>
      <div
        className='avt_log_posti share_bgr_tow'
        style={{ display: props.option ? 'block' : 'none' }}>
        <ul className='navbar-nav'>
          <a href={link} className='nav-item'>
            <li className='nav-child-item share_clr_one share_fsize_one'>
              <span className='item_ic'>
                <img src='../img/inf_tk.png' alt='' />
              </span>
              Tài khoản
            </li>
          </a>
          {getHtml}
          <a className='nav-item' onClick={logout}>
            <li className='nav-child-item share_clr_one share_fsize_one btx_logout'>
              <span className='item_ic'>
                <img src='../img/dang-xuat.png' alt='' />
              </span>
              Đăng xuất
            </li>
          </a>
        </ul>
      </div>
      <Logout showLogout={showLogout} setShowLogout={setShowLogout} />
    </>
  )
}
