import { useEffect, useRef, useState } from "react";
import { infoCom, infoEp } from "../../utils/handleApi";
import Cookies from "js-cookie";

export default function QlCongviec2() {
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
                        <a className="avt_qlyc" href="https://kpi.timviec365.vn/" target="_blank">
                            <img src="../img/qly-kpi.png" alt="Quản lý KPI" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://kpi.timviec365.vn/" className="share_clr_four" target="_blank">Quản lý KPI</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all"
                    onClick={(event) => seeNvAllClickHandlerRef.current(event, 0)}
                    ref={(el) => (elementRefs.current[0] = el)}
                >
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
                <div className="see_nv_all"
                    onClick={(event) => seeNvAllClickHandlerRef.current(event, 1)}
                    ref={(el) => (elementRefs.current[1] = el)}
                >
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
                        <a className="avt_qlyc" href="https://lichbieu.timviec365.vn/" target="_blank">
                            <img src="../img/lich-bieu.png" alt="Phần mềm quản lý lịch biểu" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://lichbieu.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý lịch biểu</a>
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
                        <a className="avt_qlyc" href="https://phanmemgiaoviec.timviec365.vn/" target="_blank">
                            <img src="../img/qly-nhansu.png" alt="Phần mềm giao việc" />
                        </a>
                        <div className="titl_delt">
                            <h4 className="share_fsize_tow share_clr_four">
                                <a href="https://phanmemgiaoviec.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm giao việc</a>
                            </h4>

                            <div className="count_qlyud">

                            </div>
                        </div>
                    </div>
                    <div className="count_qlyud">

                    </div>
                </div>
                <div className="see_nv_all" onClick={(event) => seeNvAllClickHandlerRef.current(event, 3)}
                    ref={(el) => (elementRefs.current[3] = el)} s>
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