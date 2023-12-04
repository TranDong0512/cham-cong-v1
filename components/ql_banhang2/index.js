import { useEffect, useRef, useState } from "react";
import { infoCom, infoEp, infoPersonal } from "../../utils/handleApi";
import Cookies from "js-cookie";

export default function QlBanhang2() {
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
                        <a className="avt_qlyc" href="https://crm.timviec365.vn/" target="_blank">
                            <img src="../img/crm_ql.png" alt="Phần mềm CRM" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://crm.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm CRM</a>
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
                        <a className="avt_qlyc" href="https://dms.timviec365.vn" target="_blank">
                            <img src="../img/dms_ql.png" alt="DMS" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://dms.timviec365.vn" rel="nofollow" className="share_clr_four" target="_blank">Phần mềm quản lý hệ thống phân phối - DMS</a>
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
                        <a className="avt_qlyc" href="https://cardvisitthongminh.timviec365.vn/" rel="nofollow" target="_blank">
                            <img src="../img/dms_ql.png" alt="SMARTID365" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://cardvisitthongminh.timviec365.vn/" rel="nofollow" className="share_clr_four" target="_blank">SMARTID365</a>
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
                        <a className="avt_qlyc" href="https://phanmemquanlygaraoto.timviec365.vn/" target="_blank">
                            <img src="../img/ql_gara.png" alt="Phần mềm quản lý Gara ô tô" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlygaraoto.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý Gara ô tô</a>
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
                        <a className="avt_qlyc" href="https://phanmemquanlykhoxaydung.timviec365.vn/" target="_blank">
                            <img src="../img/ql_khvt.png" alt="Phần mềm quản lý kho vật tư xây dựng" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlykhoxaydung.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý kho vật tư xây dựng</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
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
                        <a className="avt_qlyc" href="https://loyalty.timviec365.vn/" target="_blank">
                            <img src="../img/ql_cungung.png" alt="Phần mềm Loyalty" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://loyalty.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm Loyalty</a>
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
                        <a className="avt_qlyc" href="https://phanmemquanlyvantai.timviec365.vn/" target="_blank">
                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlyvantai.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý vận tải</a>
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
            <div className="delt_titl_ud share_bgr_tow">
                <div className="detl_nv_count">
                    <div className="titl_qlyud">
                        <a className="avt_qlyc" href="https://phanmemquanlycungung.timviec365.vn/" target="_blank">
                            <img src="../img/ql_cungung.png" alt="Phần mềm quản lý cung ứng" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlycungung.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý cung ứng</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 7)}
                    ref={(el) => (elementRefs.current[7] = el)}>
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
                        <a className="avt_qlyc" href="https://phanmemquanlykho.timviec365.vn/" target="_blank">
                            <img src="../img/ql_khvt.png" alt="Phần mềm quản lý kho 365" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlykho.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý kho 365</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 8)}
                    ref={(el) => (elementRefs.current[8] = el)}>
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
                        <a className="avt_qlyc" href="https://phanmemquanlyquytrinhsanxuat.timviec365.vn" target="_blank">
                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemquanlyquytrinhsanxuat.timviec365.vn" className="share_clr_four" target="_blank">Phần mềm quản lý quy trình sản xuất</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 9)}
                    ref={(el) => (elementRefs.current[9] = el)}>
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