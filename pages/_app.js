import Bodyframe from '@/components/bodyFrameNs/bodyFrame'
import { ConfigProvider, Spin } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '@/styles/globals.css'
import Cookies from 'js-cookie'
import { COOKIE_KEY } from '.'
import 'toastify-js/src/toastify.css'
import jwtDecode from 'jwt-decode'
import { POST } from './api/BaseApi'
import '@/styles/styles.scss'
import { ReduxProviders } from '@/redux/provider'
import axios from 'axios'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const LoadingComp = () => {
  return (
    <Spin
      // indicator={<LoadingOutlined rev={null} />}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
      }}
    />
  )
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  //check has token in url
  useEffect(() => {
    const checkUrl = async () => {
      if (!router.isReady) return
      if (!router.pathname.includes('/van-thu-luu-tru')){
        Cookies.remove('hasReloaded')
      }
      const rfToken = router?.query?.refresh_token
      const curRfToken = Cookies.get('rf_token')
      console.log(rfToken)
      if (rfToken && rfToken !== curRfToken) {
        try {
          const resp = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/qlc/employee/getNewToken`,
            { rf_token: rfToken }
          )
          const res = resp?.data

          if (resp?.status === 200) {
            const userInfo = res?.data?.user_info
            console.log(res)
            Cookies.set(COOKIE_KEY, res?.data?.token)
            Cookies.set('rf_token', res?.data?.refreshToken)
            Cookies.set('role', userInfo?.type)
            Cookies.set('userID', userInfo?.idQLC)
            Cookies.set('userName', userInfo?.userName)
            Cookies.set('phone', userInfo?.phoneTK)
            if (userInfo?.type === 1) {
              Cookies.set('com_id', userInfo?.idQLC)
            } else if (userInfo?.type === 2) {
              Cookies.set('com_id', userInfo?.inForPerson?.employee?.com_id)
            }
            // setReload(!reload)
            // router.reload()
            router
              .replace(router?.pathname?.split('?')?.[0])
              .then(() => router.reload())
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    checkUrl()
  }, [router])

  // check type de chan quyen truy cap
  // useEffect(() => {
  //   const block = async () => {
  //     if (Cookies.get('token_base365')) {
  //       const decoded = jwtDecode(Cookies.get('token_base365'))
  //       const type = decoded?.data?.type
  //       const com_id = decoded?.data?.com_id
  //       if (type !== 1 && com_id === 10003087) {
  //         window.location.href = 'https://hungha365.com/thong-bao-truy-cap'
  //       }
  //     }
  //   }

  //   block()
  // }, [])

  // checkAuthen
  useEffect(() => {
    const checkAuthen = async () => {
      if (Cookies.get('token_base365')) {
        const res = await POST('api/qlc/managerUser/checkAuthen')

        if (res?.data?.authentic === 0) {
          const type = res?.data?.type

          if (type === 1) {
            window.location.href =
              'https://hungha365.com/xac-thuc-ma-otp-cong-ty.html'
          } else if (type === 2) {
            window.location.href =
              'https://hungha365.com/xac-thuc-ma-otp-nhan-vien.html'
          } else if (type === 0) {
            window.location.href =
              'https://hungha365.com/xac-thuc-ma-otp-ca-nhan.html'
          }
        }
      }
    }
    checkAuthen()
  }, [])

  return (
    <>
      {/* {loading ? (
        <LoadingComp />
      ) : !firstLoad ? ( */}
      <ReduxProviders>
        <ConfigProvider
          theme={{
            token: {
              screenLG: 1025,
              screenLGMin: 1025,
              screenLGMax: 1025,
              screenMD: 769,
              screenMDMin: 769,
            },
          }}>
          <>
            {router.pathname.includes('huong-dan-camera') ||
            router.pathname.includes('huong-dan-chi-tiet') ? (
              <Component {...pageProps} />
            ) : (
              <Bodyframe>
 <ToastContainer />
                <Component {...pageProps} />
              </Bodyframe>
            )}
          </>
        </ConfigProvider>
      </ReduxProviders>
      {/* ) : (
        <LoadingComp />
      )} */}
    </>
  )
}
