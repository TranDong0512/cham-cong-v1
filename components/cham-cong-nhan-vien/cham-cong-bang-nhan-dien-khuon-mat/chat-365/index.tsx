import { useRouter } from 'next/router'
import { BackButton } from '../../../../components/bodyFrameNs/bread-crump/BreadCrump'
import styles from './index.module.css'
import { useState } from 'react'
import { Button } from 'antd'
import Image from 'next/image'

export function BANNER_CCBNDKM_CHAT365() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeButton, setActiveButton] = useState(1)

  const HandleNavigationCC365 = () => {
    router.push(
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365'
    )
  }

  const HandleNavigationChat365 = () => {
    router.push(
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365'
    )
  }

  const HandleNavigationPC365 = () => {
    router.push(
      '/cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien'
    )
  }

  const [listSteps, setListSteps] = useState([
    {
      title:
        'Tại trang chủ chọn tiện ích, trong mục công cụ của tiện ích chọn “CHẤM CÔNG”',
      clicked: true,
      img: '/ccbndkm_chat365_1.png',
    },
    {
      title:
        'Lựa chọn phương thức nhận diện khuôn mặt, sau đó đưa khuôn mặt của bạn vào khung nhận diện, để hệ thống cập nhật thông tin nhận diện thành công.',
      clicked: false,
      img: '/ccbndkm_chat365_2.png',
    },
    {
      title:
        'Đối chiếu các điều kiện về thông tin vị trí và wifi xem đã chuẩn chưa, sau đó lựa chọn “CA LÀM VIỆC” phù hợp nhất.',
      clicked: false,
      img: '/ccbndkm_chat365_3.png',
    },
    {
      title:
        'Nhấn vào “chấm công” để kết thúc thao tác. Nếu chấm công thành công, sẽ có màn hình thông báo chấm công thành công màu xanh, còn nếu chấm công thất bại, sẽ có thông báo màu đỏ trên màn hình, hãy chọn CHẤM CÔNG LẠI.',
      clicked: false,
      img: '/ccbndkm_chat365_4.png',
    },
  ])

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

  return (
    <div className={styles.main}>
      <div className={styles.back}>
        <BackButton router={router} color='#fff' isCC={true} />
      </div>
      <div className={styles.title}>
        <p>CÁC CHỨC NĂNG CƠ BẢN CỦA CHẤM CÔNG</p>
      </div>
      <div className={styles.breadcrumb}>
        <span className={styles.txt} style={{ color: '#fff' }}>
          Chấm công bằng nhận diện khuôn mặt / Chat365
        </span>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          className={`${styles.buttonTabs}`}
          onClick={HandleNavigationCC365}>
          <div className={styles.buttonTabsGroup}>
            <Image
              src='/ql_chamcong.png'
              alt=''
              width={40}
              height={40}
              className={styles.imge}></Image>
            <span className={styles.txt}>Chamcong365</span>
          </div>
        </Button>
        <Button className={styles.activeButton} onClick={() => {}}>
          <div className={styles.buttonTabsGroup1}>
            <Image
              src='/ql_chat.png'
              alt=''
              width={40}
              height={40}
              className={styles.imge}></Image>
            <span className={styles.txt}>Chat365</span>
          </div>
        </Button>
        <Button className={styles.buttonTabs2} onClick={HandleNavigationPC365}>
          <div className={styles.buttonTabsGroup2}>
            <Image
              src='/ql_pcnv.png'
              alt=''
              width={40}
              height={40}
              className={styles.imge}></Image>
            <span className={styles.txt}>PC365 NHAN VIEN</span>
          </div>
        </Button>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyItem1}>
          <div className={styles.txt}>BƯỚC 1: TẢI APP CHAT 365 TẠI ĐÂY</div>
          <Image
            src='/qr-chamcong.png'
            alt=''
            height={120}
            width={120}
            className={styles.img2}
          />
        </div>

        <div className={styles.bodyItem2}>
          <Image
            src={`${listSteps[currentIndex].img}`}
            alt=''
            width={363}
            height={720}
            className={styles.img}></Image>
        </div>

        <div className={styles.bodyItem3}>
          <div className={styles.bodyHeader}>
            <p className={styles.textBodyHeaderRight}>
              BƯỚC 2: ĐĂNG NHẬP APP VÀ THỰC HIỆN CÁC BƯỚC
            </p>
          </div>
          <div className={styles.bodySteps}>
            {listSteps.map((item, index) => (
              <div
                className={styles.step}
                key={index}
                onClick={() => setTicked(item.title, index)}>
                <div className={styles.stepTick}>
                  {tickOrUntick(item.clicked)}
                </div>
                <p
                  className={styles.stepFront}
                  style={{ color: `${item.clicked ? '#FED851' : '#fff'}` }}>
                  {index + 1}:
                </p>
                <p
                  className={styles.stepAfter}
                  style={{ color: `${item.clicked ? '#FED851' : '#fff'}` }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <div
            className={styles.buttonContinue}
            onClick={HandleNavigationPC365}>
            <span className={styles.txt}>Chuyển tiếp</span>
            <Image
              src={'/expand_arrow 1.svg'}
              alt={''}
              height={25}
              width={25}
              className={styles.ctn}></Image>
          </div>
        </div>
      </div>
    </div>
  )
}
