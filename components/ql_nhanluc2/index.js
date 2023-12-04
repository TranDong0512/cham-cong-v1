import { useEffect, useRef, useState } from "react";
import { infoCom, infoEp } from "../../utils/handleApi";
import Cookies from "js-cookie";
const QlNhanluc2 = ({ checkCookie }) => {
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
    return Cookies.get("role");
  };
  const [getNameCompany, setNameCompany] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        if (type() === "2") {
          let response = await infoEp();
          setNameCompany(response.data.companyName.userName);
        } else if (type() === "1") {
          let response = await infoCom();
          setNameCompany(response.data.userName);
        }
      } catch (error) {
        console.log("Error:", error);
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

  // const [isRoleExists, setRoleExists] = useState(!!Cookies.get("role")); // Khởi tạo giá trị ban đầu

  // useEffect(() => {
  //   const roleExists = !!Cookies.get("role");
  //   setRoleExists(roleExists);
  // }, [isRoleExists]); // Sử dụng isRoleExists trong mảng dependency để theo dõi sự thay đổi

  return (
    <>
      <div className="delt_titl_ud share_bgr_tow">
        <div className="detl_nv_count">
          <div className="titl_qlyud">
            <a
              className="avt_qlyc"
              href="https://chamcong.timviec365.vn/"
              target="_blank"
            >
              <img src="../img/ql-chamcong.png" alt="Chấm công" />
            </a>
            <div className="titl_delt">
              <h4 className="share_fsize_tow share_clr_four">
                <a
                  href="https://chamcong.timviec365.vn/"
                  className="share_clr_four"
                  target="_blank"
                >
                  Chấm công
                </a>
              </h4>

              <div className="count_qlyud"></div>
            </div>
          </div>
          <div className="count_qlyud"></div>
        </div>
        <div
          className="see_nv_all"
          onClick={(event) => seeNvAllClickHandlerRef.current(event, 0)}
          ref={(el) => (elementRefs.current[0] = el)}
        >
          <p className="see_dstv cr_weight share_clr_three share_cursor">
            THÀNH VIÊN SỬ DỤNG
          </p>
        </div>
        <div className="detl_nv_cty" style={{ display: "none" }}>
          <p className="see_dvnv share_clr_one share_fsize_one">
            Tất cả thành viên trong:
            <span className="cr_weight com_name"> {getNameCompany} </span>
          </p>
        </div>
      </div>
      <div className="delt_titl_ud share_bgr_tow">
        <div className="detl_nv_count">
          <div className="titl_qlyud">
            <a
              className="avt_qlyc"
              href="https://chat365.timviec365.vn/"
              target="_blank"
            >
              <img src="../img/ql-chat365.png" alt="Chat365" />
            </a>
            <div className="titl_delt">
              <h4 className="share_fsize_tow share_clr_four">
                <a
                  href="https://chat365.timviec365.vn/"
                  className="share_clr_four"
                  target="_blank"
                >
                  Chat365
                </a>
              </h4>

              <div className="count_qlyud"></div>
            </div>
          </div>
          <div className="count_qlyud"></div>
        </div>
        <div
          className="see_nv_all"
          onClick={(event) => seeNvAllClickHandlerRef.current(event, 1)}
          ref={(el) => (elementRefs.current[1] = el)}
        >
          <p className="see_dstv cr_weight share_clr_three share_cursor">
            THÀNH VIÊN SỬ DỤNG
          </p>
        </div>
        <div className="detl_nv_cty" style={{ display: "none" }}>
          <p className="see_dvnv share_clr_one share_fsize_one">
            Tất cả thành viên trong:
            <span className="cr_weight com_name"> {getNameCompany}</span>
          </p>
        </div>
      </div>
      <div className="delt_titl_ud share_bgr_tow">
        <div className="detl_nv_count">
          <div className="titl_qlyud">
            <a
              className="avt_qlyc"
              href="https://tinhluong.timviec365.vn/"
              target="_blank"
            >
              <img src="../img/ql-tinhluong.png" alt="Tính lương" />
            </a>
            <div className="titl_delt">
              <h4 className="share_fsize_tow share_clr_four">
                <a
                  href="https://tinhluong.timviec365.vn/"
                  className="share_clr_four"
                  target="_blank"
                >
                  Tính lương
                </a>
              </h4>

              <div className="count_qlyud"></div>
            </div>
          </div>
          <div className="count_qlyud"></div>
        </div>
        <div
          className="see_nv_all"
          onClick={(event) => seeNvAllClickHandlerRef.current(event, 2)}
          ref={(el) => (elementRefs.current[2] = el)}
        >
          <p className="see_dstv cr_weight share_clr_three share_cursor">
            THÀNH VIÊN SỬ DỤNG
          </p>
        </div>
        <div className="detl_nv_cty" style={{ display: "none" }}>
          <p className="see_dvnv share_clr_one share_fsize_one">
            Tất cả thành viên trong:
            <span className="cr_weight com_name"> {getNameCompany}</span>
          </p>
        </div>
      </div>
      <div className="delt_titl_ud share_bgr_tow">
        <div className="detl_nv_count">
          <div className="titl_qlyud">
            <a
              className="avt_qlyc"
              href="https://phanmemnhansu.timviec365.vn/"
              target="_blank"
            >
              <img src="../img/qly-nhansu.png" alt="Quản trị nhân sự" />
            </a>
            <div className="titl_delt">
              <h4 className="share_fsize_tow share_clr_four">
                <a
                  href="/phan-mem-nhan-su/quan-ly-chung"
                  className="share_clr_four"
                  target="_blank"
                >
                  Quản trị nhân sự
                </a>
              </h4>
              <div className="count_qlyud"></div>
            </div>
          </div>
          <div className="count_qlyud"></div>
        </div>
        <div
          className="see_nv_all"
          onClick={(event) => seeNvAllClickHandlerRef.current(event, 3)}
          ref={(el) => (elementRefs.current[3] = el)}
        >
          <p className="see_dstv cr_weight share_clr_three share_cursor">
            THÀNH VIÊN SỬ DỤNG
          </p>
        </div>
        <div className="detl_nv_cty" style={{ display: "none" }}>
          <p className="see_dvnv share_clr_one share_fsize_one">
            Tất cả thành viên trong:
            <span className="cr_weight com_name"> {getNameCompany}</span>
          </p>
        </div>
      </div>
      <div className="delt_titl_ud share_bgr_tow">
        <div className="detl_nv_count">
          <div className="titl_qlyud">
            <a
              className="avt_qlyc"
              href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/"
              target="_blank"
            >
              <img
                src="../img/danh-gia.png"
                alt="Đánh giá năng lực nhân viên"
              />
            </a>
            <div className="titl_delt">
              <h4 className="share_fsize_tow share_clr_four">
                <a
                  href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/"
                  className="share_clr_four"
                  target="_blank"
                >
                  Đánh giá năng lực nhân viên
                </a>
              </h4>

              <div className="count_qlyud"></div>
            </div>
          </div>
          <div className="count_qlyud"></div>
        </div>
        <div
          className="see_nv_all"
          onClick={(event) => seeNvAllClickHandlerRef.current(event, 4)}
          ref={(el) => (elementRefs.current[4] = el)}
        >
          <p className="see_dstv cr_weight share_clr_three share_cursor">
            THÀNH VIÊN SỬ DỤNG
          </p>
        </div>
        <div className="detl_nv_cty" style={{ display: "none" }}>
          <p className="see_dvnv share_clr_one share_fsize_one">
            Tất cả thành viên trong:
            <span className="cr_weight com_name"> {getNameCompany}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default QlNhanluc2;
