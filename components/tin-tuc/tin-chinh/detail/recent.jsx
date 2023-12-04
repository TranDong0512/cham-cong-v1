import styles from './index.module.css'

const Recent = () => {
  return (
    <div className={styles.content_detail1}>
      <div className={styles.box_xt}>
        <p>Bài viết liên quan</p>
        <div className={styles.box_xt_item_see_more_blog}>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/tintuc12.png'} alt={'tin tuc'} />
            </div>
            <h4>Giao việc - các tính năng nổi bật trong phần mềm giao việc</h4>
          </div>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/tintuc13.png'} alt={'tin tuc'} />
            </div>
            <h4>Giao việc - nhanh chóng hiệu quả, các công việc minh bạch</h4>
          </div>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/tintuc14.png'} alt={'tin tuc'} />
            </div>
            <h4>
              Tại sao nên sử dụng phần mềm quản lý lịch biểu - các điều cần biết{' '}
            </h4>
          </div>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/tintuc15.png'} alt={'tin tuc'} />
            </div>
            <h4>Tính năng vượt trội của phần mềm quản lý lịch biểu</h4>
          </div>
        </div>
      </div>
      <div className={styles.xem_them}>
        <a>Xem thêm</a>
      </div>
    </div>
  )
}
export default Recent
