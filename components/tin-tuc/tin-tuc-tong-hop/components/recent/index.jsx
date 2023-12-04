import styles from './index.module.css'
import CardAction from './cardAction'
import useSize from '../../hook/hook/useSize'
const Recent = () => {
  const { width } = useSize()

  return (
    <div className={styles.box_hot_new1}>
      <div className={styles.div_fl}>
        <div className={styles.boder}></div>
        <div className={styles.title}>
          <h2>Gần đây</h2>
        </div>
      </div>
      <div className={styles.div_big_fl}>
        <div className={styles.card_1}>
          <div className={styles.recent_news}>
            <img src={'/ttth-pic5.png'} alt={'tin tuc'} />
            <div>
              <h2 className={styles.card_1_element_title}>
                [Câu hỏi] Các ưu điểm vượt trội của chấm công
              </h2>
              <p>
                Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
              </p>
              <p>
                Đăng bởi: <span> Trương Văn Trắc</span>
              </p>
            </div>
          </div>
          <div className={styles.recent_news}>
            <img src={'/ttth-pic6.png'} alt={'tin tuc'} />
            <div>
              <h2 className={styles.card_1_element_title}>
                Phần mềm quản trị nhân sự - các tính năng nổi bật
              </h2>
              <p>
                An toàn, bảo mật tuyệt đối, dữ liệu được lưu trữ theo mô hình
                điện toán đám mây. Tích hợp tất cả các ứng dụng dành cho doanh
                nghiệp của bạn trên cùng một nền tảng duy nhất. Ứng dụng Công
                nghệ AI tự nhận thức phân tích hành vi người dùng giải quyết
                toàn diện các bài toán đối với từng doanh nghiệp cụ thể. Luôn
                đồng hành và hỗ trợ 24/7. Phù hợp với cả những tập đoàn xuyên
                quốc gia đến những công ty SME. Miễn phí trọn đời đối với tất cả
                các doanh nghiệp đăng ký trong đại dịch Covid 19.
              </p>
              <p>
                Đăng bởi: <span> Trương Văn Trắc</span>
              </p>
            </div>
          </div>
          <div className={styles.recent_news}>
            <img src={'/ttth-pic7.png'} alt={'tin tuc'} />
            <div>
              <h2 className={styles.card_1_element_title}>
                các tính năng nổi bật của phần mềm đánh giá năng lực nhân viên
                365
              </h2>
              <p>
                Với ứng dụng quản lý doanh nghiệp của timviec365.vn, người quản
                trị có thể sử dụng rất nhiều tính năng cực kỳ hữu ích để quản lý
                đơn vị mình một cách hiệu quả nhất. Một hệ sinh thái về quản trị
                doanh nghiệp đều được tích hợp ở hệ thống này. Trong đó có phần
                mềm. Đánh giá năng lực nhân viên. Trên nền tảng chuyển đổi số
                “ngoạn mục” với nhiều tiện ích, tính năng thông minh, phần mềm
                Đánh giá năng lực nhân viên của timviec365.vn sẽ giúp cho bạn
                đánh giá được chính xác năng lực của mỗi nhân viên đang làm việc
                tại công ty, từ đó dễ dàng đưa ra được những kế hoạch đ...
              </p>
              <p>
                Đăng bởi: <span> Trương Văn Trắc</span>
              </p>
            </div>
          </div>
          <div className={styles.recent_news}>
            <img src={'/ttth-pic5.png'} alt={'tin tuc'} />
            <div>
              <h2 className={styles.card_1_element_title}>
                [Câu hỏi] Các ưu điểm vượt trội của chấm công
              </h2>
              <p>
                Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
              </p>
              <p>
                Đăng bởi: <span> Trương Văn Trắc</span>
              </p>
            </div>
          </div>
          <div className={styles.recent_news}>
            <img src={'/ttth-pic6.png'} alt={'tin tuc'} />
            <div>
              <h2 className={styles.card_1_element_title}>
                Phần mềm quản trị nhân sự - các tính năng nổi bật
              </h2>
              <p>
                An toàn, bảo mật tuyệt đối, dữ liệu được lưu trữ theo mô hình
                điện toán đám mây. Tích hợp tất cả các ứng dụng dành cho doanh
                nghiệp của bạn trên cùng một nền tảng duy nhất. Ứng dụng Công
                nghệ AI tự nhận thức phân tích hành vi người dùng giải quyết
                toàn diện các bài toán đối với từng doanh nghiệp cụ thể. Luôn
                đồng hành và hỗ trợ 24/7. Phù hợp với cả những tập đoàn xuyên
                quốc gia đến những công ty SME. Miễn phí trọn đời đối với tất cả
                các doanh nghiệp đăng ký trong đại dịch Covid 19.
              </p>
              <p>
                Đăng bởi: <span> Trương Văn Trắc</span>
              </p>
            </div>
          </div>
          <div className={styles.recent_news}>
            <img src={'/ttth-pic7.png'} alt={'tin tuc'} />
            <div>
              <h2 className={styles.card_1_element_title}>
                các tính năng nổi bật của phần mềm đánh giá năng lực nhân viên
                365
              </h2>
              <p>
                Với ứng dụng quản lý doanh nghiệp của timviec365.vn, người quản
                trị có thể sử dụng rất nhiều tính năng cực kỳ hữu ích để quản lý
                đơn vị mình một cách hiệu quả nhất. Một hệ sinh thái về quản trị
                doanh nghiệp đều được tích hợp ở hệ thống này. Trong đó có phần
                mềm. Đánh giá năng lực nhân viên. Trên nền tảng chuyển đổi số
                “ngoạn mục” với nhiều tiện ích, tính năng thông minh, phần mềm
                Đánh giá năng lực nhân viên của timviec365.vn sẽ giúp cho bạn
                đánh giá được chính xác năng lực của mỗi nhân viên đang làm việc
                tại công ty, từ đó dễ dàng đưa ra được những kế hoạch đ...
              </p>
              <p>
                Đăng bởi: <span> Trương Văn Trắc</span>
              </p>
            </div>
          </div>
          <div className={styles.pagination}>
            <a href='#'>&laquo;</a>
            <a href='#'>1</a>
            <a href='#' className='active'>
              2
            </a>
            <a href='#'>3</a>
            <a href='#'>4</a>
            <a className={styles.pagination_next} href='#'>
              Next
            </a>
            <a href='#'>....</a>
            <a className={styles.pagination_last} href='#'>
              Last
            </a>
            <a href='#'>&raquo;</a>
          </div>
        </div>
        {width > 1024 ? <CardAction /> : null}
      </div>
    </div>
  )
}
export default Recent
