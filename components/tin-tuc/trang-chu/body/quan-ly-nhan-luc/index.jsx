import styles from './index.module.css'
import { Card, Pagination } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

const QuanLyNhanLuc = () => {
  return (
    <div className={styles.box_hot_new1}>
      {/*nhân lực*/}
      <div className={styles.div_fl}>
        <div className={styles.boder}></div>
        <div className={styles.title}>
          <h2>Quản Lý Nhân Lực</h2>
        </div>
      </div>
      <div className={styles.div_big_fl}>
        <div className={styles.card}>
          <img src={'/tintuc7.png'} alt={'tin tuc'} />
          <h4>Phần Chấm Công - Các Tính Năng và Hoạt Động của Phần Mềm</h4>
          <p>
            Chấm công là một việc làm quen thuộc cùng như quan trọng đối với mỗi
            cá nhân, doanh nghiệp, công ty, tổ chức. Việc chấm công như một cách
            điểm danh, giúp nhân viên điểm danh giờ đi làm. Bên cạ...
          </p>
          <p>
            Đăng bởi: <span> Trương Văn Trắc</span>
          </p>
        </div>
        <div className={styles.card}>
          <img src={'/tintuc8.png'} alt={'tin tuc'} />
          <h4>
            Phần mềm Tính lương - các tính năng nổi bật và cách tải phần mềm
          </h4>
          <p>
            Tính công, tính lương luôn là vấn đề nan giải trong mỗi đơn vị doanh
            nghiệp. Nếu như bạn không có một giải pháp tối ưu cho vấn đề này thì
            rất dễ dẫn đến tình trạng áp lực "đến hẹn lại lên" khi tới kỳ tín...{' '}
          </p>
          <p>
            Đăng bởi: <span> Trương Văn Trắc</span>
          </p>
        </div>
        <div className={styles.card}>
          <img src={'/tintuc9.png'} alt={'tin tuc'} />
          <h4>
            Phần mềm quản trị nhân sự - các tính năng thông minh và các ưu điểm
            vượt trội{' '}
          </h4>
          <p>
            Giúp Doanh nghiệp quản lý quá trình tuyển dụng một cách hiệu quả,
            thông minh và tiện lợi. Thiết kế hệ thống các quy định và chính sách
            hiệu quả và và chính sách hiệu quả và các chính sách hiệu quả và...{' '}
          </p>
          <p>
            Đăng bởi: <span> Trương Văn Trắc</span>
          </p>
        </div>
        <div className={styles.card}>
          <img src={'/tintuc10.png'} alt={'tin tuc'} />
          <h4>Phần mềm đánh giá năng lực nhân viên - các tính năng nổi bật </h4>
          <p>
            Đánh giá năng lực nhân viên dễ dàng ngay trên chính phần mềm khi
            thiết lập các tiêu chí đánh giá một cách dễ dàng. Chính phần mềm khi
            thiết lập các tiêu chí đánh giá một cách dễ dàng.{' '}
          </p>
          <p>
            Đăng bởi: <span> Trương Văn Trắc</span>
          </p>
        </div>
      </div>
      {/*công việc*/}
      <div className={styles.div_fl}>
        <div className={styles.boder}></div>
        <div className={styles.title}>
          <h2>Quản Lý Công Việc</h2>
        </div>
      </div>
      <div className={styles.div_big_fl2}>
        <div className={styles.card_fl}>
          <img src={'/tintuc11.png'} alt={'tin tuc'} />
          <h3>Các điểm vượt trội của phần mềm quản lý lịch biểu</h3>
          <p>
            Mang đến người dùng trải nghiệm tối ưu trong việc tạo và quan sát
            trực quan kế hoạch của mình thông qua hàng rào bảo mật nghiêm ngặt.
            Trong đó mỗi người sở hữu một tài khoản đăng nhập riêng biệt mà
            không phải lo lắng kế hoạch, dự định của mình bị điều chỉnh.
          </p>
          <p>
            Đăng bởi: <span> Trương Văn Trắc</span>
          </p>
        </div>
        <div className={styles.card_fl2}>
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
      {/*Nội bộ*/}
      <div className={styles.div_nb}>
        {/*mục lục*/}
        <div className={styles.card_page}>
          <Card title='Quản Lý Nhân Lực' bordered={false}>
            <div className={styles.div_card}>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Phần mềm chấm công{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Phần mềm tính lương{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Phần mềm quản trị nhân sự{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Đánh giá năng lực nhân viên{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Quản lý cuộc họp{' '}
              </a>
            </div>
          </Card>
          <Card
            title='Quản Lý Công Việc'
            bordered={false}
            style={{ marginTop: '30px' }}>
            <div className={styles.div_card}>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined />
                Phần mềm lịch biểu
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Giao việc{' '}
              </a>
            </div>
          </Card>
          <Card
            title='Quản Lý Nội Bộ'
            bordered={false}
            style={{ marginTop: '30px' }}>
            <div className={styles.div_card}>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Phần mềm văn thư lưu trữ{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Truyền thông văn hóa{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Phần mềm phiên dịch{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Chuyển văn bản - giọng nói{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Quản lý tài sản{' '}
              </a>
            </div>
          </Card>
          <Card
            title='Quản Lý Bán Hàng'
            bordered={false}
            style={{ marginTop: '30px' }}>
            <div className={styles.div_card}>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Phần mềm CRM{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Phần mềm DMS{' '}
              </a>
              <a style={{ color: '#474747' }}>
                <PlusCircleOutlined /> Quản lý bán hàng{' '}
              </a>
            </div>
          </Card>
        </div>
        {/*nội dung*/}
        <div className={styles.div_page}>
          {/*Quản lý nội bộ*/}
          <div className={styles.div_fl}>
            <div className={styles.boder}></div>
            <div className={styles.title}>
              <h2>Quản Lý Nội Bộ</h2>
            </div>
          </div>
          <div className={styles.div_right}>
            <div className={styles.div_right_big}>
              <img src={'/tintuc16.png'} alt={'tintuc'} />
              <h3>
                Phần mềm văn thư lưu trữ - các tính năng mà không thể không biết
                đến
              </h3>
              <p>
                Dữ liệu khổng lồ về văn thư, tài liệu, nhân sự,... được lưu trữ
                hoàn toàn theo mô hình điện toán đám mây, đảm bảo tiêu chí an
                toàn và bảo mật tuyệt đối.
              </p>
              <p>
                Đăng bởi : <span>Trương Văn Trắc</span>
              </p>
            </div>
            <div className={styles.div_right_big2}>
              <div className={styles.div_right_big_div}>
                <img src={'/tintuc17.png'} alt={'tin tuc'} />
                <div className={styles.div_r_div}>
                  <h4>
                    Các tính năng nổi bật của truyển thông nội bộ - văn hóa
                    doanh nghiệp
                  </h4>
                  <p>
                    Các giá trị văn hóa doanh nghiệp được xây dựng, gửi tới nhân
                    viên một cách có tổ chức, rõ ràng, dễ hiểu. ương tác đa
                    chiều giữa Nhân viên - cấp quản lý - nhân viên góp phần quan
                    trọng ...
                  </p>
                  <p>Đăng bởi: Trương Văn Trắc</p>
                </div>
              </div>
              <div
                className={styles.div_right_big_div}
                style={{ marginTop: '10px' }}>
                <img src={'/tintuc17.png'} alt={'tin tuc'} />
                <div className={styles.div_r_div}>
                  <h4>
                    Các tính năng nổi bật của truyển thông nội bộ - văn hóa
                    doanh nghiệp
                  </h4>
                  <p>
                    Các giá trị văn hóa doanh nghiệp được xây dựng, gửi tới nhân
                    viên một cách có tổ chức, rõ ràng, dễ hiểu. ương tác đa
                    chiều giữa Nhân viên - cấp quản lý - nhân viên góp phần quan
                    trọng ...
                  </p>
                  <p>Đăng bởi: Trương Văn Trắc</p>
                </div>
              </div>
            </div>
          </div>
          {/*Quản lý bán hàng*/}
          <div className={styles.div_fl}>
            <div className={styles.boder}></div>
            <div className={styles.title}>
              <h2>Quản Lý Bán Hàng</h2>
            </div>
          </div>
          <div className={styles.div_bh}>
            <div className={styles.div_bh_right}>
              <div className={styles.div_bh_right_div}>
                <img src={'/tintuc18.png'} alt={''} />
                <div className={styles.div_right_sm}>
                  <h4>Phần mềm cRM - tính năng quản lý toàn diện</h4>
                  <p>
                    Phần mềm CRM365 hỗ trợ doanh nghiệp có góc nhìn toàn diện về
                    khách hàng, đưa ra những giải pháp tối ưu trong quá trình
                    thu thập và quản lý thông tin khách hàng, gia tăng doanh thu
                    vượt trội.
                  </p>
                  <p>
                    Đăng bởi : <span>Đào Thanh Hồng</span>
                  </p>
                </div>
              </div>
              <div className={styles.div_bh_right_div}>
                <div className={styles.div_right_sm}>
                  <h4>Phần mềm cRM - tính năng quản lý toàn diện</h4>
                  <p>
                    Phần mềm CRM365 hỗ trợ doanh nghiệp có góc nhìn toàn diện về
                    khách hàng, đưa ra những giải pháp tối ưu trong quá trình
                    thu thập và quản lý thông tin khách hàng, gia tăng doanh thu
                    vượt trội.
                  </p>
                  <p>
                    Đăng bởi : <span>Đào Thanh Hồng</span>
                  </p>
                </div>
                <img src={'/tintuc18.png'} alt={''} />
              </div>
            </div>
            <div className={styles.div_bh_left}>
              <img src={'/tintuc19.png'} alt={'tin tuc'} />
              <h4>
                Quản lý bán hàng - quản lý bán hàng hiệu quả và nhanh chóng
              </h4>
              <p>
                Phù hợp với tất cả các ngành hàng, giao diện thân thiệt dễ dàng
                quản lý. Quản lý rành mạch rõ ràng và tiện ích.
              </p>
              <p>
                Đăng bởi: <span>Đặng Minh Tốt</span>
              </p>
            </div>
          </div>
          {/*Gần đây*/}
          <div className={styles.div_fl}>
            <div className={styles.boder}></div>
            <div className={styles.title}>
              <h2>Gần đây</h2>
            </div>
          </div>
          <div className={styles.div_new}>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.div_log}>
              <img src={'/tintuc20.png'} alt={'tin tuc'} />
              <div className={styles.div_bog_text}>
                <h4>[câu hỏi] các ưu điểm vượt trội của chấm công </h4>
                <p>
                  Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất
                  đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi
                  đăng nhập vào website timviec365.vn cũng có thể được chấp nhận
                  hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất
                  cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                </p>
                <p>
                  Đăng bởi: <span>Trương Văn Trắc</span>
                </p>
              </div>
            </div>
            <div className={styles.page_nation}>
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default QuanLyNhanLuc
