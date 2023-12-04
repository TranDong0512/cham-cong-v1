import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'
const listPageDangNhap = ['/dang-nhap-nhan-vien', 'dang-nhap-cong-ty']
const checkCookie = () => {
  let data = JSON.parse(window.localStorage.getItem('inforuserlogin'))
  let idQLC = Number(cookieCutter.get('userID'))
  let exp = Number(cookieCutter.get('exp'))
  let now = new Date().getTime() / 1000
  const router = useRouter()
  const page = router.pathname
  const checkPage = listPageDangNhap.find((e) => e == page)
  //   if (!checkPage) {
  //     if (idQLC) {
  //       if (exp < now) {
  //         if (data.data.type == 1) {
  //           window.location.href = 'https://hungha365.com/dang-nhap-cong-ty.html'
  //         } else {
  //           window.location.href =
  //             'https://hungha365.com/dang-nhap-nhan-vien.html'
  //         }
  //       }
  //     } else {
  //       console.log('Đang không ở trong đăng nhập')
  //       window.location.href = 'https://hungha365.com/dang-nhap-nhan-vien.html'
  //     }
  //   }
}

export default checkCookie
