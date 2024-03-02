import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Row, Col, Card, ConfigProvider, Input, Button } from "antd";
import Image from "next/image";
import { useContext, useState, useEffect, createContext } from "react";
import { THEME_COLOR } from "@/constants/style-constants";
import { LIST_ACTIONS, LIST_ACTIONS_EMP } from "@/constants/home-constants";
import { useRouter } from "next/router";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { getCookie } from "cookies-next";
import Cookies from "js-cookie";
import { ModalSignInHome } from "@/components/modal/ModalSigninCC";
import ModalLogin from "@/components/modal/ModalLogin";
import BlogIndexPage from "@/components/bodyFrameNs/blog";
import axios from "axios";
import jwtDecode from 'jwt-decode'
const ConfirmModal = ({
  open,
  setOpen,
  router,
  url,
}: {
  open: boolean;
  setOpen: any;
  router: any;
  url: string;
}) => {
  const children = (
    <p style={{ textAlign: "center" }}>Bạn có muốn tiến hành cài đặt không?</p>
  );

  const onConfirm = () => {
    router?.push(url);
  };

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    "",
    "Cài đặt",
    onConfirm,
    false
  );
};
export const COOKIE_KEY = "token_base365";

export default function HomeQLNS() {
  const router = useRouter();
  const [selectedUrl, setSelectedUrl] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalSelect, setModalSelect] = useState(false);
  const [key, setKey] = useState();
  const [showBlog, setShowBlog] = useState(false);
  // set to localStorage
  const [success, setSuccess] = useState(false)

  // const check_token = async () => {
  //   try {
  //     const token = Cookies.get("token_base365")
  //     const refresh_token = Cookies.get("refresh_token");
  //     if (!token) {
  //       const resp = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API}/api/qlc/employee/getNewToken`,
  //         { rf_token: refresh_token }
  //       )
  //       if (resp?.status === 200) {
  //         const token_new = resp?.data?.data?.token
  //         if (token_new) {
  //           let data: any = jwtDecode(token_new)
  //           if (data) {
  //             console.log("data", data)
  //             data = data?.data
  //             Cookies.set('rf_token', data?.refreshToken)
  //             Cookies.set('token_base365', token_new)
  //             Cookies.set('role', data?.type)
  //             Cookies.set('userID', data?.idQLC)
  //             Cookies.set('userName', data?.userName)
  //             Cookies.set('phone', data?.phoneTK)
  //             Cookies.set('com_id', data?.com_id)
  //           }
  //         }
  //       }
  //     }
  //     setSuccess(true)
  //   } catch (error) {
  //     console.log("errorerror", error)
  //   }
  // }
  // useEffect(() => {
  //   const call = async () => {
  //     await check_token()
  //   }
  //   call()
  // }, [])
  useEffect(() => {
    if (1) {
      console.log("bắt đầu chạy")
      console.log("Cookiess", Cookies.get("token_base365"))
      const call = async () => {

        const value = localStorage.getItem("selectedBtnIndex") || "0";
        const role = Cookies.get("role") || "1";
        const length =
          role === "1" ? LIST_BUTTONS_COMP.length - 1 : LIST_BUTTONS_EMP.length - 1;

        if (value === "1") {
          setShowBlog(true);
        }

        if (Number(value) > length) {
          setSelectedBtn(0);
        } else if (value === "3" && checkLogin()) {
          setSelectedBtn(0);
        } else {
          setSelectedBtn(value);
        }
      }

      call()
    }

  }, []);

  const LIST_BUTTONS_COMP = [
    {
      color1: "#FFA13B",
      color2: "#E8811A",
      title: "Thiết lập cơ cấu công ty",
      icon: "/globe.png",
      direct: false,
      url: "",
      type: 0,
    },
    {
      color1: "#97C25F",
      color2: "#7DA047",
      title: "Chấm Công",
      icon: "/timer.png",
      direct: false,
      url: "",
      type: 0,
    },

    {
      color1: "#8069FF",
      color2: "#5E53C9",
      title: "Cài đặt lương",
      icon: "/database.png",
      type: 0,
      direct: false,
      url: "",
    },
    {
      color1: "#FF5B4D",
      color2: "#C1403A",
      title: "Cài đặt đề xuất",
      icon: "/checklist.png",
      direct: false,
      type: 0,
      url: "/cai-dat-de-xuat",
    },
  ];

  const LIST_BUTTONS_EMP = [
    {
      color1: "#FF5B4D",
      color2: "#C1403A",
      title: "Chấm Công bằng tài khoản cá nhân",
      icon: "/desktop-icon.png",
      direct: true,
      url: "/cham-cong-bang-tai-khoan-nhan-vien",
      type: 0,
    },
    {
      color1: "#97C25F",
      color2: "#7DA047",
      title: " Chấm công trên app điện thoại",
      icon: "/qr-icon.png",
      direct: false,
      url: "",
      type: 0,
    },
    // {
    //   color1: '#FFA13B',
    //   color2: '#E8811A',
    //   title: 'Chấm công bằng nhận diện khuôn mặt',
    //   icon: '/face-icon.png',
    //   direct: true,
    //   url: 'cham-cong-nhan-vien/cc-bang-tai-khoan-cong-ty',
    // },

    {
      color1: "#8069FF",
      color2: "#5E53C9",
      title: "Tạo đề xuất",
      icon: "/penpaer-icon.png",
      direct: true,
      type: 1,

      url: "https://hungha365.com/van-thu-luu-tru/trang-quan-ly-de-xuat/de-xuat",
    },
    {
      color1: "#6575FE",
      color2: "#4C5BD4",
      title: "Cập nhật dữ liệu khuôn mặt",
      icon: "/face-icon.png",
      direct: true,
      url: "cap-nhat-du-lieu-khuon-mat",
      type: 0,
    },
    {
      color1: "#40B9CC",
      color2: "#318BA3",
      title: "Lịch sử",
      icon: "/history-icon.png",
      type: 0,
      direct: false,
      url: "",
    },
    {
      color1: "#ACACAC",
      color2: "#ACACAC",
      title: "Tính lương",
      icon: "/history-icon.png",
      type: 0,
      direct: false,
      url: "",
    },
    // {
    //   color: '#ACACAC',
    //   title: 'Cập nhật khuôn mặt',
    //   icon: '/face-icon.png',
    // },
  ];

  const utilButton = (
    icon: string,
    index: number,
    title: string,
    color1: string,
    color2: string,
    direct: boolean,
    url: string,
    type: Number,
    isCompany: boolean
  ) => (
    <Row
      // gutter={[{ xs: 30, sm: 20 }, { xs: 15 }]}
      key={index}
      className={`${styles.gradientBackgroundEDF3FF} ${styles.singleBtn}`}
      style={{
        // borderRight: `8px solid ${color1}`,
        color: `${color1}`,
      }}
      onClick={() => {
        setShowBlog(title === "Chấm Công");
        if (isCompany && index === 4 && checkLogin()) {
          router.push("/cai-dat-de-xuat");
        } else {
          if (direct) {
            if (type === 1) {
              window.location.href = url;
            } else {
              router.push(url);
            }
          } else {
            localStorage.setItem("selectedBtnIndex", `${index - 1}`);
            setSelectedBtn(`${index - 1}`);
            window.scrollTo({
              top: 500,
            });
          }
        }
      }}
    >
      <Col sm={5} xs={5}>
        <div
          className={` ${styles.indexWithBorder}`}
          style={{
            borderTop: `7px solid ${color1}`,
            borderRight: `7px solid ${color1}`,
            borderBottom: `7px solid ${color2}`,
            borderLeft: `7px solid ${color2}`,
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
          }}
        >
          <span className={styles.index}>{index}</span>
        </div>
      </Col>
      <Col
        sm={15}
        xs={15}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <p
          className={styles.title}
          style={{
            color: `${index - 1}` === selectedBtn ? THEME_COLOR : "#474747",
            // marginLeft: currentRole === ADMIN_ROLE ? '10px' : '0px',
          }}
        >
          {title}
        </p>
      </Col>
      <Col
        sm={4}
        xs={4}
        className={styles.rightDiv}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <div className={styles.verticalDivider}></div> */}
        <Image
          alt=""
          src={icon}
          width={30}
          height={30}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Col>
    </Row>
  );

  const checkLogin = () => {
    const acc_token = Cookies.get("token_base365");
    const rf_token = Cookies.get("rf_token");
    const role = Cookies.get("role");

    if (acc_token && rf_token && role) {
      return true;
    }
    return false;
  };

  const step = (
    index: number,
    title: string,
    hasExplain: boolean,
    url: string,
    isButton: boolean = false,
    btnIcon: string = "",
    isDirect: boolean = false
  ) => {
    return !isButton ? (
      <div
        className={styles.singleStep}
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className={styles.roundIndex}
          style={{
            minWidth: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "#4c5bd4",
          }}
        >
          <span
            className={styles.index}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "Salsa, cursive !important",
              fontSize: "24px",
            }}
          >
            {index}
          </span>
        </div>
        <span
          className={styles.title}
          onClick={(e) => {
            if (checkLogin()) {
              if (hasExplain) {
                setSelectedUrl(url);
                setOpenConfirm(true);
              } else {
                if (isDirect) {
                  window.location.href = url;
                } else {
                  router.push(url);
                }
              }
            } else {
              // window.location.href =
              //   'https://hungha365.com/dang-nhap-nhan-vien.html'
              // setOpenModal(true);
              setModalSelect(true);
            }
          }}
        >
          {title}
        </span>
        {hasExplain && (
          <Image
            alt="/"
            src={"/question.png"}
            width={44}
            height={44}
            style={{ marginLeft: "10px" }}
          />
        )}
      </div>
    ) : (
      <div
        className={styles.btnEmp}
        onClick={(e) => {
          if (checkLogin()) {
            if (hasExplain) {
              setSelectedUrl(url);
              setOpenConfirm(true);
            } else {
              router.push(url);
            }
          } else {
            alert("Bạn chưa đăng nhập");
          }
        }}
      >
        <Image alt="/" src={btnIcon} width={40} height={40} />
        <p className={styles.btnTitle}>{title}</p>
      </div>
    );
  };

  const RenderSelection = (type) => {
    const ADMIN = (
      <div>
        <h1 className={styles.headerText}>
          {/* {parseInt(LIST_ACTIONS[selectedBtn]?.key) + 1}.{" "} */}
          {LIST_ACTIONS[selectedBtn]?.title}
        </h1>
        {checkLogin() && Number(selectedBtn) === 3
          ? null
          : // step(
          //     1,
          //     'Cài đặt đề xuất',
          //     false,
          //     `/cai-dat-de-xuat`,
          //     null,
          //     null,
          //     false
          //   )
          LIST_ACTIONS[selectedBtn]?.steps.map((stepData, index1) => {
            return step(
              index1 + 1,
              stepData.title,
              stepData?.required,
              `${stepData.url}`,
              null,
              null,
              stepData?.isDirect
            );
          })}
        {Number(selectedBtn) === Number(3) && !checkLogin() && (
          <p
            onClick={() => setModalSelect(true)}
            style={{
              padding: "20px 0px",
              marginLeft: "18px",
              fontWeight: "bold",
              fontSize: "20px",
              color: "#4C5BD4",
              cursor: "pointer",
            }}
          >
            Xem thêm...
          </p>
        )}
      </div>
    );

    const EMP = (
      <div>
        <h1 className={styles.headerText}>
          {/* {parseInt(LIST_ACTIONS_EMP[selectedBtn]?.key) + 1}.{" "} */}
          {LIST_ACTIONS_EMP[selectedBtn]?.title}
        </h1>
        {LIST_ACTIONS_EMP[selectedBtn]?.steps.map((stepData, index1) =>
          step(
            index1 + 1,
            stepData.title,
            false,
            `${stepData.url}`,
            parseInt(LIST_ACTIONS_EMP[selectedBtn]?.key) < 2,
            stepData.icon
          )
        )}
      </div>
    );
    return type === "1" ? ADMIN : EMP;
  };

  const RenderedBody = () => {
    const type = getCookie("role") || "1";
    if (type)
      return (
        <div className={styles.section1}>
          <Row
            gutter={[
              { xl: 100, lg: 60, md: 60, sm: 48, xs: 10 },
              { xl: 0, lg: 0, md: 24, sm: 24, xs: 0 },
            ]}
          >
            <Col lg={type === "1" ? 10 : 11} md={11} sm={12} xs={24}>
              {(type === "1" ? LIST_BUTTONS_COMP : LIST_BUTTONS_EMP)?.map(
                (item, index) =>
                  utilButton(
                    item.icon,
                    index + 1,
                    item.title,
                    item.color1,
                    item.color2,
                    item?.direct,
                    item?.url,
                    item?.type,
                    type === "1"
                  )
              )}
            </Col>
            <Col lg={type === "1" ? 14 : 13} md={13} sm={12} xs={24}>
              {RenderSelection(type)}

              {/* btn */}
              {!checkLogin() && (
                <div
                  className={styles.btnAds}
                  onClick={() => {
                    window.location.href =
                      "https://hungha365.com/dang-ky-cong-ty.html";
                  }}
                >
                  <p className={styles.btnTxt} style={{ fontSize: "18px" }}>
                    đăng ký trải nghiệm miễn phí 3 tháng
                  </p>
                </div>
              )}
            </Col>
          </Row>
          <ConfirmModal
            open={openConfirm}
            setOpen={setOpenConfirm}
            router={router}
            url={selectedUrl}
          />
        </div>
      );
  };
  return (
    <>
      <main>
        <RenderedBody />
        {showBlog && <BlogIndexPage />}
      </main>
      {modalSelect && (
        <ModalLogin
          setOpenModalLogin={setModalSelect}
          setKey={setKey}
          setOpenModal={setOpenModal}
        />
      )}
      <ModalSignInHome open={openModal} setOpen={setOpenModal} type={key} />
    </>
  );
}

// export const getServerSideProps = (context) => {
//   const { role } = context?.req?.cookies

//   if (!role) {
//     return {
//       redirect: {
//         destination: '/lua-chon-dang-nhap.html',
//       },
//     }
//   } else {
//     return {
//       props: {},
//     }
//   }
// }
