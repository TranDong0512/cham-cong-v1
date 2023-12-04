import styles from './index.module.css'
import Image from 'next/image'
import { Card, Carousel } from 'antd'

const Body = () => {
  return (
    <div className={styles.box_hot_new}>
      <div className={styles.hot_new1}>
        <div className={styles.divBig}>
          <img src={'/abc.png'} alt={'anc'} />
          <div className={styles.img_banner}>
            <h3>[Câu hỏi] Các ưu điểm vượt trội của chấm công</h3>
            <p>
              Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
              đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi đăng
              nhập vào website timviec365.vn cũng có thể được chấp nhận hồ sơ.
              Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất cả sẽ được
              chúng tôi giải đáp ở ngay bên dưới bạn nhé!
            </p>
            <p>
              Đăng bởi: <span>Trương Văn Trắc</span>
            </p>
          </div>
          <div className={styles.carousel}>
            <Carousel autoplay>
              <div>
                <div className={styles.content_styles}>
                  <img src={'/thongtin1.png'} alt={'thong tin'} />
                  <div className={styles.content_styles_st}>
                    <h4>Phần mềm quản trị nhân sự - các tính năng nổi bật</h4>
                    <p>
                      Chuyển đổi số và công nghệ ngày càng làm thay đổi thói
                      quen về cách thức làm việc của con người cũng như phương
                      pháp quản trị của các doanh nghiệp trong những công ty nhỏ
                      đến tập đoàn xuyên quốc gia. Tuy nhiên, sự thăng hạng về
                      vai trò của chuyển đổi số hiện nay cũng làm đe dọa về tính
                      bảo mật của thành . Đó chính là dữ liệu. Theo khảo sát về
                      tình hình an ninh mạng tại Việt Nam của nhiều tổ chức uy
                      tín cho thấy, chỉ trong vòng một năm gần 18.000 vi đến hơn
                      1,6 triệu máy tính bị mất dữ liệu...
                    </p>
                    <p className={styles.content_styles_st_p}>
                      Đăng bởi:{' '}
                      <span style={{ color: '#474747', fontStyle: 'roboto' }}>
                        {' '}
                        Trương Văn Trắc
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.content_styles}>
                  <img src={'/thongtin3.png'} alt={'thong tin'} />
                  <div className={styles.content_styles_st}>
                    <h4>Phần mềm quản trị nhân sự - các tính năng nổi bật</h4>
                    <p>
                      Chuyển đổi số và công nghệ ngày càng làm thay đổi thói
                      quen về cách thức làm việc của con người cũng như phương
                      pháp quản trị của các doanh nghiệp trong những công ty nhỏ
                      đến tập đoàn xuyên quốc gia. Tuy nhiên, sự thăng hạng về
                      vai trò của chuyển đổi số hiện nay cũng làm đe dọa về tính
                      bảo mật của thành 600 cuộc tấn công vào các trang web, gần
                      18.000 vi đến hơn 1,6 triệu máy tính bị mất dữ liệu...
                    </p>
                    <p className={styles.content_styles_st_p}>
                      Đăng bởi:{' '}
                      <span style={{ color: '#474747', fontStyle: 'roboto' }}>
                        {' '}
                        Trương Văn Trắc
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.content_styles}>
                  <img src={'/thongtin4.png'} alt={'thong tin'} />
                  <div className={styles.content_styles_st}>
                    <h4>Phần mềm quản trị nhân sự - các tính năng nổi bật</h4>
                    <p>
                      Chuyển đổi số và công nghệ ngày càng làm thay đổi thói
                      quen về cách thức làm việc của con người cũng như phương
                      pháp quản trị của các doanh nghiệp trong những công ty nhỏ
                      đến tập đoàn xuyên quốc gia. Tuy nhiên, sự thăng hạng về
                      vai trò là dữ liệu. Theo khảo sát về tình hình an ninh
                      mạng tại Việt Nam của nhiều tổ chức uy tín cho thấy, chỉ
                      trong vòng một năm đã có tới trên 600 cuộc tấn công vào
                      các trang web, gần 18.000 vi đến hơn 1,6 triệu máy tính bị
                      mất dữ liệu...
                    </p>
                    <p className={styles.content_styles_st_p}>
                      Đăng bởi:{' '}
                      <span style={{ color: '#474747', fontStyle: 'roboto' }}>
                        {' '}
                        Trương Văn Trắc
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.content_styles}>
                  <img src={'/thongtin2.png'} alt={'thong tin'} />
                  <div className={styles.content_styles_st}>
                    <h4>Phần mềm quản trị nhân sự - các tính năng nổi bật</h4>
                    <p>
                      Chuyển đổi số và công nghệ ngày càng làm thay đổi thói
                      quen về cách thức làm việc của con người cũng như phương
                      pháp quản trị của các doanh nghiệp trong những công ty nhỏ
                      đến tập đoàn xuyên quốc gia. Tuy nhiên, sự thăng hạng về
                      vai trò của chuyển uy tín cho thấy, chỉ trong vòng một năm
                      đã có tới trên 600 cuộc tấn công vào các trang web, gần
                      18.000 vi đến hơn 1,6 triệu máy tính bị mất dữ liệu...
                    </p>
                    <p className={styles.content_styles_st_p}>
                      Đăng bởi:{' '}
                      <span style={{ color: '#474747', fontStyle: 'roboto' }}>
                        {' '}
                        Trương Văn Trắc
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className={styles.divBig2}>
        <div className={styles.div_left}>
          <img src={'/tintuc5.png'} alt={'tin tuc'} />
          <h4>[CÂU HỎI] phầm mềm chat365 có ưu điểm vượt trội gì ?</h4>
          <p>
            Các tính năng của chat365 là phần mềm có nhiều tính năng vượt trội .
            Các tính năng của chat365 là phần mềm có nhiều tính năng vượt trội
            .Các tính...
          </p>
          <p>Đăng bởi: Trương Văn Trắc</p>
        </div>
        <div className={styles.div_left}>
          <img src={'/tintuc6.png'} alt={'tin tuc'} />
          <h4>Phần mềm tính lương - các tính năng của phần mềm tính lương</h4>
          <p>
            Trắc nghiệm trí thông minh hiện là một phương pháp mới được các
            doanh nghiệp tìm hiểu nhiều để nhằm áp dụng đánh giá nhân viên, ứng
            viên h...{' '}
          </p>
          <p>Đăng bởi: Trương Văn Trắc</p>
        </div>
      </div>
    </div>
  )
}
export default Body
