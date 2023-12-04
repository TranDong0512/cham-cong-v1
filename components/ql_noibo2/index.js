import { useEffect, useRef, useState } from "react";
import { infoCom, infoEp } from "../../utils/handleApi";
import Cookies from "js-cookie";
export default function QlNoibo2() {
    const elementRefs = useRef([]);
    const seeNvAllClickHandlerRef = useRef(null);

    const handleClick = (index) => {
        const hiddenElement = elementRefs.current[index].nextElementSibling;
        if (hiddenElement) {
            hiddenElement.style.display =
                hiddenElement.style.display === "none" ? "block" : "none";
        }
    };
    const type = () => {
        return Cookies.get('role');
    };
    const [getNameCompany, setNameCompany] = useState('');
    useEffect(() => {
        const getData = async () => {
            try {
                if (type() === '2') {
                    let response = await infoEp();
                    setNameCompany(response.data.companyName.userName)
                } else if (type() === '1') {
                    let response = await infoCom();
                    setNameCompany(response.data.userName)
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        getData();
        seeNvAllClickHandlerRef.current = (event, index) => {
            event.stopPropagation();
            handleClick(index);
        };

        const detlNvCtyClickHandler = (event) => {
            event.stopPropagation();
        };

        document.addEventListener("click", detlNvCtyClickHandler);

        return () => {
            document.removeEventListener("click", detlNvCtyClickHandler);
        };
    }, [getNameCompany]);
    return (
        <>
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://vanthu.timviec365.vn/" target="_blank">
                            <img src="../img/vt-luutru.png" alt="Văn thư lưu trữ" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://vanthu.timviec365.vn/" className="share_clr_four" target="_blank">Văn thư lưu trữ</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 0)}
                    ref={(el) => (elementRefs.current[0] = el)}>
                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                </div>
                <div className="detl_nv_cty" style={{ display: 'none' }}>
                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                        <span className="cr_weight com_name"> {getNameCompany}</span>
                    </p>
                </div>
            </div>
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://truyenthongnoibo.timviec365.vn/" target="_blank">
                            <img src="../img/tt-vanhoa.png" alt="Truyền thông văn hóa" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://truyenthongnoibo.timviec365.vn/" className="share_clr_four" target="_blank">Truyền thông văn hóa</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 1)}
                    ref={(el) => (elementRefs.current[1] = el)}>
                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                </div>
                <div className="detl_nv_cty" style={{ display: 'none' }}>
                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                        <span className="cr_weight com_name"> {getNameCompany}</span>
                    </p>
                </div>
            </div>
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/trang-chu.html" target="_blank">
                            <img src="../img/chuyendoi_vb.png" alt="Chuyển văn bản thành giọng nói" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/trang-chu.html" className="share_clr_four" target="_blank">
                                    Chuyển văn bản thành giọng nói</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 2)}
                    ref={(el) => (elementRefs.current[2] = el)}>
                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                </div>
                <div className="detl_nv_cty" style={{ display: 'none' }}>
                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                        <span className="cr_weight com_name"> {getNameCompany}</span>
                    </p>
                </div>
            </div>
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://phanmemquanlytaisan.timviec365.vn" target="_blank">
                            <img src="../img/quanly_taisan.png" alt="Quản lý tài sản" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlytaisan.timviec365.vn" className="share_clr_four" target="_blank">Quản lý tài sản</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 3)}
                    ref={(el) => (elementRefs.current[3] = el)}>
                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                </div>
                <div className="detl_nv_cty" style={{ display: 'none' }}>
                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                        <span className="cr_weight com_name"> {getNameCompany}</span>
                    </p>
                </div>
            </div>
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://bienphiendich.timviec365.vn" target="_blank">
                            <img src="../img/phanmem_phiendich.png" alt="Phần mềm phiên dịch" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://bienphiendich.timviec365.vn" className="share_clr_four" target="_blank">Phần mềm phiên dịch</a>
                            </h4>
                            <div className="count_qlyud"></div>
                        </div>
                    </div>
                    <div className="count_qlyud"></div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 4)}
                    ref={(el) => (elementRefs.current[4] = el)}>
                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                </div>
                <div className="detl_nv_cty" style={{ display: 'none' }}>
                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                        <span className="cr_weight com_name"> {getNameCompany}</span>
                    </p>
                </div>
            </div>
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://phanmemsohoatailieu.timviec365.vn/" target="_blank">
                            <img src="../img/danh-gia.png" alt="Số hóa tài liệu" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemsohoatailieu.timviec365.vn/" className="share_clr_four" target="_blank">Số hóa tài liệu</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 5)}
                    ref={(el) => (elementRefs.current[5] = el)}>
                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                </div>
                <div className="detl_nv_cty" style={{ display: 'none' }}>
                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                        <span className="cr_weight com_name"> {getNameCompany}</span>
                    </p>
                </div>
            </div>
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://phanmemquanlytaisan.timviec365.vn" target="_blank">
                            <img src="../img/quanly_taisan.png" alt="Quản lý tài sản" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlytaisan.timviec365.vn" className="share_clr_four" target="_blank">Quản lý tài sản</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 6)}
                    ref={(el) => (elementRefs.current[6] = el)}>
                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                </div>
                <div className="detl_nv_cty" style={{ display: 'none' }}>
                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                        <span className="cr_weight com_name"> {getNameCompany}</span>
                    </p>
                </div>
            </div>
        </>
    )
}