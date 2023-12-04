import Image from 'next/image'
import styles from './index.module.css'
import { Button, Modal, Spin } from 'antd'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import Head from 'next/head'
import { POST, getCompIdCS } from '@/pages/api/BaseApi'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { COOKIE_KEY } from '@/pages'
import { PAGE_DOMAIN } from '@/components/bodyFrameNs/bodyFrame'

export default function ChamCongCongTy() {
  const router = useRouter()
  const [openCam, setOpenCam] = useState(false)
  const [undetectedModal, setUndetectedModal] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [userData, setUserData] = useState<any>()
  const [modalDetail, setModalDetail] = useState(false)
  const [modalDetailCC, setModalDetailCC] = useState(false)
  const [reload, setReload] = useState(false)
  const [listCa, list_ca] = useState()
  const [id, setId] = useState()
  const [lat, setLat] = useState<Number>()
  const [long, setLong] = useState<Number>()
  const [ip, setIp] = useState()
  const [selectedCa, setSelectedCa] = useState('')
  const videoConstraints = {
    width: 971,
    height: 971,
    facingMode: 'user',
  }

  useEffect(() => {
    const checkHasCam = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      // filter on video inputs, and map to query object
      const queries = devices
        .filter(({ kind }) => kind === 'videoinput')
        .map(({ deviceId }) => ({ name: 'camera', deviceId }))

      if (_.isEmpty(queries)) {
        window.alert(
          'Không tìm thấy camera. Vui lòng cắm camera vào để chấm công'
        )
      }
    }

    checkHasCam()
  }, [])

  const webcamRef = useRef<Webcam>(null)
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current
      ?.getScreenshot
      //   {
      //   height: 300,
      //   width: 300,
      // }
      ()

    let comId = ''
    const acc_token = getCookie(COOKIE_KEY)

    if (acc_token) {
      const decoded: any = jwtDecode(acc_token?.toString())

      comId = decoded?.data?.com_id
    }
    if (comId && imageSrc) {
      try {
        const formD = new FormData()
        formD.append('company_id', comId)
        formD.append('image', imageSrc)
        const res: any = await POST('api/qlc/ai/detectFace', formD)
        const resp = res?.data?.data
        if (
          !resp?.user_id ||
          resp?.user_id === 'Unknown' ||
          resp?.user_id === 'Undetected'
        ) {
          setUndetectedModal(true)
        } else {
          // const userInfo = await axios.get(

          // )
          // if (userInfo) {
          //   setUserData(userInfo)
          // }
          const token = getCookie(COOKIE_KEY)
          let compId: any = ''
          if (token) {
            compId = jwtDecode(token?.toString())?.['data']?.['com_id']
          }
          const fd = new FormData()
          fd.append('c_id', compId)
          fd.append('u_id', resp?.user_id)
          const resdata = await POST('api/qlc/shift/list_shift_user', fd)

          const respDetail = resdata?.data

          if (respDetail?.ep_name) {
            setUserData({
              ep_name: respDetail?.ep_name,
              shift: respDetail?.shift,
            })
            setModalDetail(true)
          } else {
            setModalDetail(false)
            setUndetectedModal(true)
          }
        }
      } catch (err) {
        console.log(err)
        // setUndetectedModal(true);
      }
    }
  }, [webcamRef])

  useEffect(() => {
    if (openCam) {
      // if (countdown === 0) {
      //   setCountdown(3)
      // }
      const interval = setInterval(() => {
        if (countdown === 0) {
          try {
            capture()
          } catch (error) {}

          clearInterval(interval)
        } else {
          setCountdown(countdown - 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [countdown, openCam, reload])

  const diemdanh = async () => {
    if (selectedCa === '' || selectedCa === undefined) {
      window.alert('Vui lòng chọn ca làm việc')
    } else {
      const fd = new FormData()
      fd.append('wifi_ip', ip)
      fd.append('shift_id', selectedCa)
      fd.append('type', '2')
      fd.append('ts_lat', lat.toString())
      fd.append('ts_long', long?.toString())
      const res = await POST('api/qlc/timekeeping/create/webComp', fd)

      if (res?.result) {
        window.alert('Chấm công thành công')
      } else {
        window.alert(res?.message)
      }
    }
  }

  return (
    <div className={styles.updateFaceMain}>
      {!openCam ? (
        <div className={styles.main}>
          <div className={styles.divWrapper}>
            <Image
              src={'/scan-face.png'}
              width={300}
              height={287}
              alt='/'
              className={styles.avatarImg}
            />
            <p
              style={{ color: '#fff', padding: '20px 0px' }}
              className={styles.textInstruct}>
              Vui lòng hướng khuôn mặt theo khung xuất hiện trên màn hình
            </p>
            <Button
              size='large'
              className={styles.startBtn}
              onClick={() => setOpenCam(true)}>
              <p
                style={{ color: '#fff', padding: '0px 20px' }}
                className={styles.startBtnTxt}>
                Bắt đầu
              </p>
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
          className={styles.webcamCaptureContainer}>
          <div
            style={{
              height: '100%',
              width: '100%',
              paddingTop: '52px',
              position: 'relative',
            }}>
            <Webcam
              audio={false}
              className={styles.webcamCapture}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              mirrored={true}
            />
            <div
              className={styles.borderVectorWrapper}
              style={{
                display: countdown === 0 ? 'none' : 'flex',
              }}>
              <div
                className={`${styles.borderVector} ${styles.borderPartFourth}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='98'
                  height='92'
                  viewBox='0 0 98 92'
                  fill='none'>
                  <path
                    d='M3 89.5C3 60.1159 3 41.9613 3 15.5C3.05331 11.3333 5.92794 3 17 3C44.9546 3 64.3125 3 95.5 3'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </svg>
              </div>

              <div
                className={`${styles.borderVector} ${styles.borderPartFirst}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='98'
                  height='92'
                  viewBox='0 0 98 92'
                  fill='none'>
                  <path
                    d='M3 89.5C3 60.1159 3 41.9613 3 15.5C3.05331 11.3333 5.92794 3 17 3C44.9546 3 64.3125 3 95.5 3'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </svg>
              </div>

              <div
                className={`${styles.borderVector} ${styles.borderPartSecond}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='98'
                  height='92'
                  viewBox='0 0 98 92'
                  fill='none'>
                  <path
                    d='M3 89.5C3 60.1159 3 41.9613 3 15.5C3.05331 11.3333 5.92794 3 17 3C44.9546 3 64.3125 3 95.5 3'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </svg>
              </div>

              <div
                className={`${styles.borderVector} ${styles.borderPartThird}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='98'
                  height='92'
                  viewBox='0 0 98 92'
                  fill='none'>
                  <path
                    d='M3 89.5C3 60.1159 3 41.9613 3 15.5C3.05331 11.3333 5.92794 3 17 3C44.9546 3 64.3125 3 95.5 3'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={styles.recognizeTxt}
            style={{ display: countdown === 0 ? 'none' : 'flex' }}>
            <p className={styles.txt}>Nhận diện trong {countdown}</p>
          </div>
        </div>
      )}
      <Modal
        centered
        width={700}
        closable={false}
        open={undetectedModal}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        className='chamCongModalDetail'>
        <div
          style={{
            padding: '30px 50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          className={styles.modalDetailWrapper}>
          <Image alt='/' src={'/err-x.png'} width={120} height={120} />
          <p
            style={{
              fontSize: '20px',
              marginTop: '30px',
              color: 'red',
              textAlign: 'center',
              fontWeight: '400',
            }}
            className={styles.modalDetailHelloTxt}>
            Dữ liệu khuôn mặt không hợp lệ! Vui lòng chấm công lại hoặc liên hệ
            với kỹ thuật để biết thêm !
          </p>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.btnOkModalUndetected}
              size='large'
              onClick={() => router.push(PAGE_DOMAIN)}>
              <p style={{ color: '#4c5bd4' }}>Trang chủ</p>
            </Button>
            <Button
              size='large'
              className={styles.btnCancelModalUndetected}
              onClick={() => {
                setUndetectedModal(false)
                setTimeout(() => {
                  setCountdown(3)
                }, 500)
              }}>
              <p style={{ color: '#fff' }}>Chấm công</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        closable={false}
        open={modalDetail}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        className='chamCongModalDetail'>
        <div
          style={{
            padding: '30px 50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          className={styles.modalDetailWrapper}>
          <Image alt='/' src={'/check-tc.png'} width={120} height={120} />
          <p className={styles.modalDetailHelloTxt}>Xin chào bạn có phải là</p>
          <p className={styles.modalDetailNameTxt}>
            {userData && userData?.ep_name}
          </p>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.btnOk}
              size='large'
              onClick={() => {
                setModalDetail(false)
                setModalDetailCC(true)
              }}>
              <p
                className={styles.modalDetailBtnTxtOk}
                style={{
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '400',
                }}>
                Là tôi, tiếp tục chấm công
              </p>
            </Button>
            <Button
              size='large'
              className={styles.btnCancel}
              onClick={() => {
                setModalDetail(false)
                setReload(!reload)
              }}>
              <p
                style={{
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '400',
                }}>
                Không phải tôi
              </p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        closable={false}
        open={modalDetailCC}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        className='chamCongModalDetail'>
        <div
          style={{
            padding: '50px 30px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          className={styles.modalDetailWrapper}>
          <div style={{ width: '100%' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <div className={styles.titleDescription}>
                <i className={styles.iconWrapper}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'>
                    <circle cx='15' cy='15' r='14.5' stroke='white' />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='16'
                    viewBox='0 0 12 16'
                    fill='none'>
                    <path
                      d='M4.88289 2.12389C4.73169 1.82734 4.70953 1.51445 4.81641 1.18522C4.92329 0.855991 5.125 0.615778 5.42155 0.464582C5.72238 0.300216 6.03741 0.271472 6.36664 0.378351C6.69586 0.48523 6.93394 0.69353 7.08086 1.00325C7.24523 1.30408 7.27397 1.61911 7.16709 1.94833C7.06021 2.27756 6.85191 2.51563 6.54219 2.66256C6.24564 2.81375 5.93275 2.83591 5.60352 2.72903C5.2743 2.62216 5.03408 2.42044 4.88289 2.12389ZM3.78425 5.23907C3.9125 4.84399 4.10746 4.57975 4.36913 4.44634C4.63506 4.29977 4.91948 4.27564 5.22237 4.37397C5.52526 4.4723 5.73896 4.64357 5.86347 4.88779L4.02302 10.5571C3.77934 11.3077 3.74037 11.921 3.90611 12.397C4.07185 12.8729 4.40493 13.1921 4.90536 13.3546C5.40578 13.5171 5.97161 13.3659 6.60285 12.9012C7.23409 12.4365 7.76988 11.526 8.21022 10.1696C8.26221 10.0991 8.3738 10.0917 8.545 10.1472C8.78204 10.2242 8.78727 10.6116 8.56069 11.3096C8.2315 12.3236 7.67279 13.103 6.88456 13.6478C6.09632 14.1925 5.27421 14.3259 4.41822 14.048C3.35152 13.7018 2.65739 13.127 2.33584 12.3239C2.02745 11.5251 2.06136 10.5462 2.43757 9.38733L3.78425 5.23907Z'
                      fill='white'
                    />
                    <path
                      d='M1.54857 6.72814L3.97385 5.84817'
                      stroke='white'
                      stroke-width='1.5'
                      stroke-linecap='round'
                    />
                  </svg>
                </i>
                <p className={styles.titleDescriptionTxt}>
                  Thông tin chấm công
                </p>
              </div>
              <div className={styles.wrapper2}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Image
                    alt='/'
                    src={'/tdo.png'}
                    width={24}
                    height={21}
                    style={{ marginRight: '20px' }}
                  />
                  <p className={styles.txt}>
                    Tọa độ:{' '}
                    <span className={styles.txtData}>{`${long}, ${lat}`}</span>
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Image
                    alt='/'
                    src={'/ip.png'}
                    width={24}
                    height={21}
                    style={{ marginRight: '20px' }}
                  />
                  <p className={styles.txt}>
                    IP Mạng : <span className={styles.txtData}>{ip}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              {userData &&
                userData?.shift?.map((item: any) => (
                  <div
                    className={`${
                      selectedCa === item?.shift_id
                        ? styles.bgShiftSelected
                        : ''
                    } ${styles.shiftWrapper}`}
                    onClick={() => setSelectedCa(item?.shift_id)}
                    style={{
                      cursor: 'pointer',
                      width: '100%',
                    }}>
                    <p
                      className={`${styles.shiftNameWrapper} ${styles.txt}`}
                      style={{
                        color: selectedCa === item?.shift_id ? 'blue' : '#000',
                        fontWeight: '400',
                      }}>
                      <div className={styles.iconCheckedShift}>
                        {selectedCa === item?.shift_id && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'>
                            <path
                              d='M20 6L9 17L4 12'
                              stroke='#4C5BD4'
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        )}
                      </div>

                      {item?.shift_name}
                    </p>
                    {item?.start_time && item?.end_time && (
                      <p
                        className={styles.txt}
                        style={{
                          color:
                            selectedCa === item?.shift_id ? 'blue' : '#000',
                          fontWeight: '500',
                        }}>
                        {item?.start_time} - {item?.end_time}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <Button
              className={`${styles.btnOkModalUndetected} ${styles.btnChamCongWidth}`}
              size='large'
              onClick={() => router.push(PAGE_DOMAIN)}>
              <p style={{ color: '#4c5bd4', fontWeight: 500 }}>Trang chủ</p>
            </Button>
            <Button
              size='large'
              className={`${styles.btnCancelModalUndetected} ${styles.btnChamCongWidth}`}
              onClick={diemdanh}>
              <p style={{ color: '#fff', fontWeight: 400 }}>Điểm danh</p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
