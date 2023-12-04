import React from "react";
import Cookies from "js-cookie";

export default function HeaderAdmin() {
    const logout = () => {
        Cookies.remove('admin')
    }

    return (
        <>
            <div id="header">
                <div className="logo">
                    <a href="https://vieclamtaihanoi.com.vn/admin">
                        <img src="../img/admin-logo.png" />
                    </a>
                </div>
                <div className="header-right">
                    Chào{" "}
                    <a
                        href="https://vieclamtaihanoi.com.vn/admin/edit_thanhvien/2"
                        className="name-admin"
                    >
                        Administrator
                    </a>
                    <a className="exit" href="/admin" onClick={logout}>
                        Thoát
                    </a>
                </div>
            </div>
            <div className="menu">
                <a className="link_menu" href="/admin/danh-sach-cong-ty">Danh sách công ty</a>
                <a className="link_menu" href="/admin/danh-sach-tt-feedback">Danh sách đánh giá</a>
                <a className="link_menu" href="/admin/danh-sach-bao-loi">Danh sách báo lỗi</a>
                <a className="link_menu" href="/admin/danh-sach-cong-ty-dang-ky-loi">Danh sách công ty đăng ký lỗi</a>
            </div>
        </>
    )
}