import Image from 'next/image'
import styles from './cc-banner.module.css'
import { useState } from 'react'
import { BackButton, MyBreadCrumb } from '../bread-crump/BreadCrump'
import { useRouter } from 'next/router'

export function CCBanner() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [listSteps, setListSteps] = useState([
    {
      title: 'Tại Trang chủ, chọn “ Cấu hình”',
      clicked: true,
      img: '/phone1.png',
    },
    {
      title: 'Chọn “Cài đặt”',
      clicked: false,
      img: '/phone2.png',
    },
    {
      title: 'Chọn “Danh sách vị trí”',
      clicked: false,
      img: '/phone3.png',
    },
    {
      title: 'Chọn biểu tượng dấu “+” để thêm vị trí',
      clicked: false,
      img: '/phone4.png',
    },
    {
      title:
        'Chọn vị trí muốn cài đặt, điều chỉnh bán kính chấm công, nhấn “Ghim lại” để lưu vị trí',
      clicked: false,
      img: '/phone5.png',
    },
  ])

  const tickOrUntick = (isTicked: boolean) => {
    return (
      <Image
        alt='/'
        src={isTicked ? '/tick.png' : '/untick.png'}
        width={44}
        height={44}
      />
    )
  }

  const setTicked = (input: string, index: any) => {
    setCurrentIndex(index)
    const updatedArr = listSteps.map((item) => {
      if (item.title === input) {
        item.clicked = true
      }

      return item
    })
    setListSteps(updatedArr)
  }

  return (
    <div className={styles.mainWrapper}>
      <div style={{ width: '100%' }}>
        <div style={{ paddingTop: '50px' }}>
          <BackButton router={router} color='#fff' isCC={true} />
        </div>
        <div className={styles.breadcrumb}>
          <MyBreadCrumb color='#fff' />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.leftSection}>
          <h2 className={styles.headerText} style={{ textAlign: 'center' }}>
            bƯỚC 1: Tải app chấm công 365 tại đây
          </h2>
          <Image
            alt='/'
            src={'/qr-chamcong.png'}
            width={120}
            height={120}
            style={{ marginTop: '30px' }}
          />
        </div>
        <div className={styles.middleSection}>
          <Image
            alt='/'
            src={`${listSteps[currentIndex].img}`}
            width={363}
            height={720}
            className={styles.img}
            //   sizes="100vw"
            //   style={{ height: "100%", width: "auto" }}
          />
        </div>
        <div>
          <div className={styles.leftSectionRes}>
            <h2 className={styles.headerText}>
              bƯỚC 1: Tải app chấm công 365 tại đây
            </h2>
            <Image
              alt='/'
              src={'/qr-chamcong.png'}
              width={120}
              height={120}
              style={{ marginTop: '30px' }}
              className={styles.imgQr}
            />
          </div>
          <div className={styles.stepTwo}>
            <h2 className={styles.headerText}>
              bƯỚC 2: đĂNG NHẬP APP VÀ THỰC HIỆN CÁc BƯỚC
            </h2>
            <div>
              {listSteps.map((item, index) => (
                <div
                  style={{ marginBottom: '10px' }}
                  key={index}
                  className={styles.singleStep}
                  onClick={() => setTicked(item.title, index)}>
                  {tickOrUntick(item.clicked)}
                  <p
                    className={styles.stepText}
                    style={{ color: `${item.clicked ? '#FED851' : '#fff'}` }}>
                    {index + 1}: {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
