import { useRouter } from 'next/router'

import styles from './index.module.css'
import Image from 'next/image'
import { useState, useContext } from 'react'
import { Button } from 'antd'
import { BackButton } from '@/components/bodyFrameNs/bread-crump/BreadCrump'

export default function ChamCongBangNhanDienKhuonMat() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeButton, setActiveButton] = useState(1)
  // const { setHasBanner } = useContext(HasBannerContext)
  // setHasBanner(true)

  const [listSteps, setListSteps] = useState([
    {
      title:
        'Vào tài khoản nhà tuyển dụng , chọn “Ứng dụng ” rồi chọn “Chấm công”',
      clicked: true,
      img: '/computer1.png',
    },
    {
      title: 'Chọn tiếp nút “CHẤM CÔNG” trên thanh Menu',
      clicked: false,
      img: '/computer2.png',
    },
    {
      title: 'Sau đó chọn “BẮT ĐẦU”',
      clicked: false,
      img: '/computer3.png',
    },
    {
      title:
        'Đưa khuôn mặt của bạn vào khung hình nhận diện trong khoảng thời gian hệ thống để giây, để hệ thống tiến hành xác minh khuôn mặt rồi chọn “LÀ TÔI, TIẾP TỤC CHẤM CÔNG”',
      clicked: false,
      img: '/computer4.png',
    },
    {
      title: 'Chọn đúng ca làm việc và chọn “ĐIỂM DANH”',
      clicked: false,
      img: '/computer5.png',
    },
    {
      title:
        'Trang thái chấm công thành công là khi hệ thống hiển thị lên màn hình thông báo “ĐIỂM DANH THÀNH CÔNG”.',
      clicked: false,
      img: '/computer6.png',
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
        <span style={{ color: '#fff' }}>
          Chấm công bằng nhận diện khuôn mặt / Chamcong365
        </span>
      </div>
      <div className={styles.buttonGroup}>
        <Button className={`${styles.activeButton}`} onClick={() => {}}>
          <div className={styles.buttonTabsGroup}>
            <Image src='/ql_chamcong.png' alt='' width={40} height={40}></Image>
            <span className={styles.txt}>Chamcong365</span>
          </div>
        </Button>
        <Button className={styles.buttonTabs} onClick={() => {}}>
          <div className={styles.buttonTabsGroup1}>
            <Image src='/ql_chat.png' alt='' width={40} height={40}></Image>
            <span className={styles.txt}>Chat365</span>
          </div>
        </Button>
        <Button className={styles.buttonTabs2} onClick={() => {}}>
          <div className={styles.buttonTabsGroup2}>
            <Image src='/ql_pcnv.png' alt='' width={40} height={40}></Image>
            <span className={styles.txt}>PC365 NHAN VIEN</span>
          </div>
        </Button>
      </div>
      {/* <div className={styles.body}>

                <div className={styles.bodyLeft}>
                <Image 
                    src={`${listSteps[currentIndex].img}`} 
                    alt='' width={871} height={495} 
                    className={styles.img}>
                </Image>
                </div>
                <div className={styles.bodyRight}>
                    <div className={styles.bodyHeader}>
                        <div className={styles.textBodyHeaderLeft}>1</div>
                        <p className={styles.textBodyHeaderRight}>Chấm công bằng tài khoản công ty</p>
                    </div>
                    <div className={styles.bodySteps}>
                    {listSteps.map((item, index) => (
                        <div className={styles.step} key={index}  onClick={() => setTicked(item.title, index)}>
                            <div className={styles.stepTick}>{tickOrUntick(item.clicked)}</div>
                            <p className={styles.stepFront} style={{color:`${item.clicked ? '#FED851':'#fff'}`}}>Bước {index + 1}:</p>
                            <p className={styles.stepAfter} style={{color:`${item.clicked ? '#FED851':'#fff'}`}}>
                            {item.title}
                            </p>
                        </div>
                    ))}
                    </div>
                </div>
            </div> */}
    </div>
  )
}
