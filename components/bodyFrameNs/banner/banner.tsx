import { Col, Row } from 'antd'
import Image from 'next/image'
import styles from './banner.module.css'

export const Banner = () => {
  return (
    <Row className={`${styles.bannerWrapper} bannerQLC`}>
      <Col span={6} className={styles.bannerLeft}>
        <Image
          alt='/'
          src={'/network.png'}
          width={275}
          height={299}
          // sizes="100vw"
          className={styles.leftImg}
        />
      </Col>
      <Col span={12} className={styles.bannerCenter}>
        <span className={styles.bannerText}>
          Cần tải <span className={styles.highlightText}>app chat365</span> để
          chấm công tại mục tiện ích
        </span>
        <div className={styles.qrSection}>
          <div className={styles.qr}>
            <Image
              alt='/'
              src={'/qr1.png'}
              width={0}
              height={0}
              sizes='200vw'
              className={styles.qr}
            />
            <p className={styles.qrText}>Chat365</p>
          </div>
          <div className={styles.downloadBtn}>
            <Image alt='/' src={'/download.png'} width={24} height={24} />
            <span className={styles.txt}>Chat365</span>
          </div>
        </div>
      </Col>
      <Col sm={6} xs={3} className={styles.bannerRight}>
        <div className={styles.imgWrapper}>
          <Image
            alt='/'
            src={'/phone-banner.png'}
            width={0}
            height={0}
            sizes='100vw'
            style={{
              width: '80%',
              height: 'auto',
            }}
            className={styles.phoneImg}
          />
        </div>
      </Col>
      <Col sm={0} xs={15} className={styles.rightSectionRes}>
        <span className={styles.bannerText}>
          Cần tải{' '}
          <span
            className={styles.highlightText}
            style={{
              fontFamily: 'Lilita One',
              color: '#fed851',
            }}>
            app chat365
          </span>{' '}
          để chấm công tại mục tiện ích
        </span>
        <div className={styles.downloadSection}>
          <p style={{ color: '#fff', textAlign: 'end', marginBottom: '10px' }}>
            Tải app tại đây
          </p>
          <div className={styles.downloadBtn}>
            <Image alt='/' src={'/download.png'} width={24} height={24} />
            <span className={styles.txt} style={{ color: '#fff' }}>
              Tải ngay
            </span>
          </div>
        </div>
      </Col>
    </Row>
  )
}
