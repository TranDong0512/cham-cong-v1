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
import { CheckOutlined } from '@ant-design/icons'

import * as faceapi from 'face-api.js'
// import { handleVideoOnPlay } from '@/components/cam-xuc-model'
import moment from 'moment'
import { COOKIE_KEY } from '@/pages'
import { PAGE_DOMAIN } from '@/components/bodyFrameNs/bodyFrame'

export default function ChamCongNhanVien() {
  const router = useRouter()
  const canvasRef = useRef()
  const [openCam, setOpenCam] = useState(false)
  const [undetectedModal, setUndetectedModal] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [userData, setUserData] = useState<any>()
  const [modalDetail, setModalDetail] = useState(false)
  const [modalDetailCC, setModalDetailCC] = useState(false)
  const [modalEmotionNotAccepted, setModalEmotionNotAccepted] = useState(false)
  const [modalEmotionAccepted, setModalEmotionAccepted] = useState(false)
  const [openAutoCheckin, setOpenAutoCheckin] = useState(false)
  const [reload, setReload] = useState(false)
  const [listCa, list_ca] = useState()
  const [id, setId] = useState()
  const [lat, setLat] = useState<Number>()
  const [long, setLong] = useState<Number>()
  const [ip, setIp] = useState()
  const [selectedCa, setSelectedCa] = useState()
  const [loading, setLoading] = useState(false)
  const [hasEmotion, setHasEmotion] = useState()
  const [base64, setBase64] = useState<string>()

  const [score, setScore] = useState(0)
  const [scoreCapture, setScoreCapture] = useState(0)
  const [emotionCapture, setEmotionCapture] = useState<any>({})

  const handleChangeScore = (expressionScore) => {
    setScore(expressionScore)
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log('asdfasdfds')
    }
  }

  function showPosition(position) {
    console.log('CHECK POSITION BY USING NAVIGATOR')
    console.log(position?.coords)
    setLong(position?.coords?.longitude)
    setLat(position?.coords?.latitude)
  }

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        // faceapi.nets.ageGenderNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]).then(() => {
        setLoading(false)
      })
    }

    // loadModels()
  }, [])
  const webcamRef = useRef<Webcam>(null)

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIp(data?.ip)
        // setLong(data.longitude)
        // setLat(data.latitude)
      })
      .catch((error) => console.log(error))

    getLocation()
  }, [])
  useEffect(() => {
    modalEmotionAccepted &&
      setTimeout(() => {
        setModalEmotionAccepted(false)
      }, 2000)
    modalEmotionNotAccepted &&
      setTimeout(() => {
        setModalEmotionNotAccepted(false)
        setCountdown(3)
      }, 2000)
  }, [modalEmotionAccepted, modalEmotionNotAccepted])

  const autoSendDataCheckin = async (data, imgSrc) => {
    try {
      const time = new Date()
      const res = await POST('api/qlc/timekeeping/create/saveHisWebEmp', {
        ip: ip,
        // shift_id: data?.shift?.[0]?.shift_id || 0,
        // type: 2,
        // idQLC: data?.id,
        img: imgSrc,
        lat: lat,
        long: long,
        time: time?.toISOString(),
      })
      console.log(res)
      if (res?.result) {
        setUserData(res)
        setOpenAutoCheckin(true)

        setTimeout(() => {
          setOpenAutoCheckin(false)
          setSelectedCa(undefined)
          setModalDetailCC(false)
          setTimeout(() => {
            setCountdown(3)
          }, 500)
        }, 3000)
      } else {
        setTimeout(() => {
          setTimeout(() => {
            setCountdown(3)
          }, 500)
        }, 3000)
      }
      // }
    } catch (error) {
      console.log(error)
      window.alert('Có lỗi xảy ra')
      setTimeout(() => {
        setCountdown(3)
      }, 500)
    }
  }

  // CHECKIN
  const checkin = async (imageSrc) => {
    let comId = ''
    const acc_token = getCookie(COOKIE_KEY)

    if (acc_token) {
      const decoded: any = jwtDecode(acc_token?.toString())

      comId = decoded?.data?.com_id
    }
    if (
      comId &&
      imageSrc
      // && captureScoreThisPoint > emotionCaptureThisPoint?.avg_pass_score
    ) {
      try {
        const res: any = await axios.post(
          // 'http://43.239.223.154:8081/',
          `${process.env.NEXT_PUBLIC_API}/api/qlc/ai/detectFace`,
          {
            company_id: comId,
            image: imageSrc,
            // image: imageSrc,
          },
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
            },
          }
        )
        const resp = res?.data?.data
        const token = getCookie(COOKIE_KEY)
        let tokenUserId: any = ''
        if (token) {
          tokenUserId = jwtDecode(token?.toString())?.['data']?.['idQLC']
        }
        if (
          !resp?.user_id ||
          resp?.user_id === 'Unknown' ||
          resp?.user_id === 'Undetected' ||
          Number(resp?.user_id) !== Number(tokenUserId)
        ) {
          setUndetectedModal(true)
          setTimeout(() => {
            setUndetectedModal(false)
            setTimeout(() => {
              setCountdown(3)
            }, 500)
          }, 3000)
        } else {
          setId(resp?.user_id)
          const token = getCookie(COOKIE_KEY)
          let compId: any = ''
          if (token) {
            compId = jwtDecode(token?.toString())?.['data']?.['com_id']
          }

          await autoSendDataCheckin({}, imageSrc)
        }
      } catch (err) {
        console.log(err)
        window.alert(err?.response?.data?.error?.message || 'Lỗi bên servers')
        setUndetectedModal(true)
        setTimeout(() => {
          setUndetectedModal(false)
          setTimeout(() => {
            setCountdown(3)
          }, 500)
        }, 3000)
      }
    }
  }

  const capture = useCallback(async () => {
    if (ip && lat && long) {
      const imageSrc = webcamRef.current
        ?.getScreenshot
        //   {
        //   height: 300,
        //   width: 400,
        // }
        ()
      console.log(ip, lat, long)
      setBase64(imageSrc)

      const fdFF = new FormData()
      fdFF.append('image_url', imageSrc)
      const resp = await POST(`api/qlc/ai/detectFakeFace`, fdFF)
      console.log(resp)
      if (!resp?.predicted_label) {
        window.alert('Phát hiện mặt giả mạo')
        setCountdown(3)
      } else {
        setTimeout(async () => {
          checkin(imageSrc)
        }, 2000)
      }
    } else {
      alert('Chưa có thông tin vị trí hiện tại')
      setTimeout(() => {
        setTimeout(() => {
          setCountdown(3)
        }, 500)
      }, 3000)
    }
  }, [webcamRef, ip, lat, long])
  // console.log(id)

  useEffect(() => {
    if (openCam) {
      const interval = setInterval(() => {
        if (countdown === 0) {
          try {
            console.log(ip, lat, long)
            capture()
          } catch (error) {
            console.log(error)
            window.alert('Có lỗi xảy ra')
          }

          clearInterval(interval)
        } else {
          setCountdown(countdown - 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
    // }
  }, [countdown, openCam])
  console.log(ip, lat, long)

  const diemdanh = async () => {
    if (selectedCa === '' || selectedCa === undefined) {
      window.alert('Vui lòng chọn ca làm việc')
    } else {
      const time = new Date()
      const res = await POST('api/qlc/timekeeping/create/webComp', {
        wifi_ip: ip,
        shift_id: selectedCa,
        type: 2,
        idQLC: id,
        img_url: base64,
        ts_lat: lat,
        ts_long: long,
        time: time?.toISOString(),
      })

      // await saveImgToBase(id, base64)

      if (res?.result) {
        alert('Điểm danh thành công')
        setSelectedCa(undefined)
        setModalDetailCC(false)
        setTimeout(() => {
          setCountdown(3)
        }, 500)
      } else {
        window.alert(res?.message)
        setTimeout(() => {
          setCountdown(3)
        }, 500)
      }
    }
  }

  const emotionCheckCaptured = async () => {
    let totalScore = 0
    const video: any = document.getElementById('video')

    const videoHeight = video.offsetHeight
    const videoWidth = video.offsetWidth

    const canvas = faceapi.createCanvas(video)

    const displaySize = {
      width: videoWidth,
      height: videoHeight,
    }
    faceapi.matchDimensions(canvas, displaySize)
    video.append(canvas)

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
      // .withFaceLandmarks()
      .withFaceExpressions()

    if (detections.length > 0) {
      detections.sort(function (a, b) {
        return b.detection.box.area - a.detection.box.area
      })
      const largestFace = detections[0]
      // let resizedDetections = faceapi.resizeResults(detections[0], displaySize)

      // Điểm được tính theo trọng số cảm xúc: tức giận-1 | ghê sợ-2 | lo sợ-3 | buồn-4 | bình thường-5 | ngạc nhiên-6 | vui vẻ-7
      totalScore += largestFace.expressions.angry * 1
      totalScore += largestFace.expressions.disgusted * 2
      totalScore += largestFace.expressions.fearful * 3
      totalScore += largestFace.expressions.sad * 4
      totalScore += largestFace.expressions.neutral * 5
      totalScore += largestFace.expressions.surprised * 6
      totalScore += largestFace.expressions.happy * 7

      if (totalScore > 0) {
        handleChangeScore(totalScore / 7)
      }
    }
    return totalScore / 7
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
                {' '}
                Bắt đầu
              </p>
            </Button>
          </div>
        </div>
      ) : loading ? (
        <Spin />
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
              mirrored={false}
              // onPlay={() =>
              //   handleVideoOnPlay(canvasRef, webcamRef, handleChangeScore)
              // }

              id='video'
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
          }}>
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
            Dữ liệu khuôn mặt không hợp lệ! Xin chờ 3 giây và chấm công lại
          </p>
          {/* <div className={styles.btnWrapper}>
            <Button
              className={styles.btnOkModalUndetected}
              size='large'
              onClick={() => router.push('/cham-cong')}>
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
          </div> */}
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
                setTimeout(() => {
                  setCountdown(3)
                }, 500)
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

      {/* Emotion Modal --Accepted */}
      <Modal
        centered
        width={570}
        closable={false}
        open={modalEmotionAccepted}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        footer={null}
        className={`chamCongModalDetail ${styles.modalEmotion}`}>
        <div
          style={{
            padding: '50px 70px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          className={styles.modalDetailWrapper}>
          <div style={{ width: '100%' }}>
            <div>
              <p className={styles.emotionTxtDescription}>
                AI365 cho biết điểm cảm xúc của bạn là{' '}
                {(scoreCapture * 10).toFixed(1)}/10
              </p>
              <div
                style={{
                  marginTop: '22px',
                  textAlign: 'center',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <img
                  src={base64 || ''}
                  className={`emotionalCaptureImg ${styles.emotionCapture}`}
                  alt='Capture picture'
                />
              </div>
            </div>
          </div>
          <div
            className={styles.textEmotionWrapper}
            style={{ marginTop: '32px' }}>
            <p className={styles.textEmotionWrapperHighline}>
              {emotionCapture?.emotion_detail}
            </p>
          </div>
        </div>
      </Modal>

      {/* Emotion Modal --NotAccepted */}
      <Modal
        centered
        width={570}
        closable={false}
        open={modalEmotionNotAccepted}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        className={`chamCongModalDetail ${styles.modalEmotion}`}>
        <div
          style={{
            padding: '50px 70px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          className={styles.modalDetailWrapper}>
          <div style={{ width: '100%' }}>
            <div>
              <p className={styles.emotionTxtDescription}>
                AI365 cho biết điểm cảm xúc của bạn là{' '}
                {(scoreCapture * 10).toFixed(1)}/10
              </p>
              <div
                style={{
                  marginTop: '22px',
                  textAlign: 'center',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <img
                  src={base64 || ''}
                  className={`emotionalCaptureImg ${styles.emotionCapture}`}
                  alt='Capture picture'
                />
              </div>

              <div
                className={styles.textEmotionWrapper}
                style={{ marginTop: '17px' }}>
                <p className={styles.textEmotionWrapperHighline}>
                  Cảm xúc của bạn đang không ổn định
                </p>
              </div>
              <p
                className={styles.textEmotionNotAccepted}
                style={{ marginTop: '17px' }}>
                Bạn được đề nghị chấm công lại để được ghi nhận công
              </p>
            </div>
          </div>
          <div className={styles.btnWrapper}></div>
        </div>
      </Modal>

      {/* Modal Chấm công tự động */}
      <Modal
        centered
        width={570}
        closable={false}
        open={openAutoCheckin}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        className={`chamCongModalDetail ${styles.modalEmotion}`}>
        <div
          style={{
            padding: '50px 70px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          className={styles.modalDetailWrapper}>
          <div style={{ width: '100%' }}>
            <p
              style={{
                fontWeight: 'bold',
                color: '#4C5BD4',
                fontSize: '22px',
                textAlign: 'center',
              }}>
              {userData && userData?.['ep_name']} - {id}
            </p>
            <p
              style={{
                fontSize: '20px',
                textAlign: 'center',
                fontWeight: '600',
              }}>
              Đã chấm công thành công{' '}
              <span
                style={{
                  color: 'red',
                  fontSize: '20px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                {userData?.['shift']?.[0]?.['type']}
              </span>{' '}
              <span
                style={{
                  color: 'blue',
                  fontSize: '20px',
                  fontWeight: '600',
                }}>
                {userData?.['shift']?.[0]?.['shift_name'] || ''}
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
