import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

export default function SideBar() {
  const type = () => {
    return Cookies.get('role')
  }
  const [linkHome, setLinkHome] = useState('')
  useEffect(() => {
    if (type() == '1') {
      setLinkHome('/')
    } else if (type() == '0') {
      setLinkHome('/')
    } else {
      setLinkHome('/')
    }
  }, [])
  const html1 = (
    <>
      <div className='ctn_qly_left'>
        <div className='logo_qly'>
          <div className='avt_qly'>
            <a href='https://dev.timviec365.vn/' target='_blank'>
              <picture>
                <img src='../img/logo_h.svg' alt='timviec365.vn' />
              </picture>
            </a>
          </div>
        </div>
        <div className='nav_qly'>
          <ul className='navbar-nav'>
            <a href={linkHome} className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img src='../img/ung-dung.png' alt='Ứng dụng' />
                </span>
                Ứng dụng
              </li>
            </a>
            <a
              href='quan-ly-thong-tin-tai-khoan-nhan-vien.html'
              className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img
                    src='../img/qly-tttaikhoan.png'
                    alt='Thông tin tài khoản'
                  />
                </span>
                Thông tin tài khoản
              </li>
            </a>
            {/* <a href="#" className="nav-item">
                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                            <span className="item_ic"><img src="../img/qly-ttvieclam.png" alt="Thiết lập tài khoản nhân viên" /></span>
                            Thiết lập tài khoản nhân viên
                        </li>
                    </a>
                    {(linkHome === 'quan-ly-ung-dung-nhan-vien.html') && (
                        <a href="#" className="nav-item">
                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                <span className="item_ic"><img src="../img/qly-ttnghiviec.png" alt="Chấm dứt lao động" /></span>
                                Chấm dứt lao động
                            </li>
                        </a >
                    )} */}
          </ul>
        </div>
      </div>
    </>
  )

  const html2 = (
    <>
      <div className='ctn_qly_left'>
        <div className='logo_qly'>
          <div className='avt_qly'>
            <a href='https://dev.timviec365.vn/' target='_blank'>
              <picture>
                <img src='../img/logo_h.svg' alt='timviec365.vn' />
              </picture>
            </a>
          </div>
        </div>
        <div className='nav_qly'>
          <ul className='navbar-nav'>
            <a href={linkHome} className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img src='../img/ung-dung.png' alt='Ứng dụng' />
                </span>
                Ứng dụng
              </li>
            </a>
            {/* <a href="#" className="nav-item">
                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                            <span className="item_ic"><img src="../img/qly-nhanvien.png" alt="Quản lý nhân viên" /></span>
                            Quản lý nhân viên
                        </li>
                    </a>
                    <a href="#" className="nav-item">
                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                            <span className="item_ic"><img src="../img/qly-phongban.png" alt="Quản lý phòng ban" /></span>
                            Quản lý phòng ban
                        </li>
                    </a>
                    <a href="#" className="nav-item">
                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                            <span className="item_ic"><img src="../img/qly-ctycon.png" alt="Quản lý công ty con" /></span>
                            Quản lý công ty con
                        </li>
                    </a >
                    <a href="#" target="_blank" className="nav-item">
                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                            <span className="item_ic"><img src="../img/qly-cctochuc.png" alt="Sơ đồ cơ cấu tổ chức" /></span>
                            Sơ đồ cơ cấu tổ chức
                        </li>
                    </a> */}
            <a href='#' className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img
                    src='../img/delete_data.png'
                    alt='Xóa dữ liệu ứng dụng'
                  />
                </span>
                Xóa dữ liệu ứng dụng
              </li>
            </a>

            <a
              href='/quan-ly-thong-tin-tai-khoan-cong-ty.html'
              className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img
                    src='../img/qly-tttaikhoan.png'
                    alt='Thông tin tài khoản'
                  />
                </span>
                Thông tin tài khoản
              </li>
            </a>
            <a href='/danh-gia.html' className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img src='../img/ic_dg.png' alt='Đánh giá' />
                </span>
                Đánh giá
              </li>
            </a>
            <a href='/bao-loi.html' className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img src='../img/ic_bl.png' alt='Báo lỗi' />
                </span>
                Báo lỗi
              </li>
            </a>
            <a
              href='/cai-dat-thiet-lap-dai-ip-phan-mem.html'
              className='nav-item'>
              <li className='nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex'>
                <span className='item_ic'>
                  <img src='../img/cai-dat.png' alt=' Cài đặt' />
                </span>
                Cài đặt
              </li>
            </a>
          </ul>
        </div>
      </div>
    </>
  )

  const render_html = linkHome === '' ? html2 : html1

  return <>{render_html}</>
}
