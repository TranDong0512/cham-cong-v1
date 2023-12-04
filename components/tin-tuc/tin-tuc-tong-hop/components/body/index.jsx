import styles from './index.module.css'
import Image from 'next/image'
import { Card, Carousel } from 'antd'

const Body = () => {
  return (
    <div className={styles.box_hot_new1}>
      <div className={styles.div_big_fl2}>
        <div className={styles.card_fl}>
          <img src={'/banner_1.png'} alt={'tin tuc tong hop'} />
          <h2>
            Tổng hợp thông tin về CV IT phần mềm và một số lưu ý quan trọng
          </h2>
          <p>
            Người ta thường nói nghề IT phần mềm thường khô khan và không biết
            nói lời hoa mỹ. Thế nên khi viết CV xin việc họ thường lúng túng hơn
            và không diễn tả được hết khả năng của mình. Nhưng không sao, tất cả
            đã có timviec365.vn lo giúp bạn. Chúng tôi sẽ trình bày đầy đủ các
            thông tin cần thiết trong CV IT phần mềm và đưa ra một vài mẫu cho
            bạn tham khảo nhé.{' '}
          </p>
          <p>
            Đăng bởi: <span> Thảo Ngọc</span>
          </p>
        </div>
        <div className={styles.card_fl2}>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/ttth-pic1.png'} alt={'tin tuc'} />
            </div>
            <h4>
              Phần mềm quản trị nhân sự - các tính năng thông minh và các ưu
              điểm vượt trội
            </h4>
            <p>
              Giúp Doanh nghiệp quản lý quá trình tuyển dụng một cách hiệu quả,
              thông minh và tiện lợi. Thiết kế hệ thống các quy định và chính
              sách hiệu quả và ...
            </p>
            <p>
              Đăng bởi: <span> Phạm Hà</span>
            </p>
          </div>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/ttth-pic2.png'} alt={'tin tuc'} />
            </div>
            <h4>
              CV giáo viên tiếng Anh viết như thế nào để ghi điểm ấn tượng?
            </h4>
            <p>
              Giúp Doanh nghiệp quản lý quá trình tuyển dụng một cách hiệu quả,
              thông minh và tiện lợi. Thiết kế hệ thống các quy định và chính
              sách hiệu quả và ...
            </p>
            <p>
              Đăng bởi: <span> Phạm Hà</span>
            </p>
          </div>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/ttth-pic3.png'} alt={'tin tuc'} />
            </div>
            <h4>
              CV giáo viên tiếng Anh viết như thế nào để ghi điểm ấn tượng?
            </h4>
            <p>
              Nhu cầu học tiếng Anh ngày càng tăng cao vì thế nhu cầu về giáo
              viên dạy tiếng Anh cũng tăng theo. Để có thêm các giáo viên chất
              lương và đi đầu to…{' '}
            </p>
            <p>
              Đăng bởi: <span> Thảo Ngọc</span>
            </p>
          </div>
          <div className={styles.card_fl2_ft}>
            <div>
              <img src={'/ttth-pic4.png'} alt={'tin tuc'} />
            </div>
            <h4>
              CV giáo viên tiếng Anh viết như thế nào để ghi điểm ấn tượng?
            </h4>
            <p>
              Nhu cầu học tiếng Anh ngày càng tăng cao vì thế nhu cầu về giáo
              viên dạy tiếng Anh cũng tăng theo. Để có thêm các giáo viên chất
              lương và đi đầu to…{' '}
            </p>
            <p>
              Đăng bởi: <span> Thảo Ngọc</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Body
