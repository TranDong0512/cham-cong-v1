import React from 'react'
import { Image } from 'antd'
import styles from './huongdan.module.css'
const Huongdan = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.p}>
            Mục hoa hồng & tạm ứng sẽ là chức năng giúp các công ty, doanh
            nghiệp, các nhà quản lý có thể dễ dàng hơn trong việc thống kê và áp
            dụng các khoản hoa hồng, tạm ứng với từng đối tượng hay nhóm đối
            tượng nhân viên phù hợp nhất.
          </p>
          <h2 className={styles.h2}>1. Cài đặt hoa hồng</h2>
          <p className={styles.p}>
            Khi click vào mục Hoa hồng & tạm ứng, hệ thống sẽ hiển thị giao diện
            của Cài đặt hoa hồng. Ở mục này, sẽ có 5 loại hoa hồng được hệ thống
            thiết lập và cài đặt sẵn. Bao gồm: Hoa hồng tiền, Hoa hồng doanh
            thu, Hoa hồng lợi nhuận, Hoa hồng lệ phí vị trí và Hoa hồng kế
            hoạch.
          </p>
          <p className={styles.p}>
            Chọn "Thêm hoa hồng" để xem chi tiết và thiết lập thông tin ở Hoa
            hồng tiền. Với 4 loại hoa hồng còn lại, chọn "Nhập" để thực hiện
            việc cài đặt và xem thông tin chi tiết của từng loại hoa hồng tương
            ứng.
          </p>
          <h2 className={styles.h2}>2. Danh sách nhân viên</h2>
          <p className={styles.p}>
            Danh sách nhân viên chính là mục tổng hợp để quản lý và theo dõi
            nhân viên được gán hoa hồng của toàn công ty trong tháng nhất định.
            Khi click vào danh mục này, hệ thống sẽ hiển thị những nhân viên
            được hưởng hoa hồng trong tháng mặc định là thời điểm mà bạn thực
            hiện thao tác. Các thông tin được hiển thị sẽ gồm có Họ tên và Tổng
            hoa hồng nhận được. Những nhân viên được nhận nhiều loại hoa hồng
            khác nhau sẽ được hệ thống cộng lại và hiển thị tại đây.
          </p>
          <p className={styles.p}>
            Để xem danh sách nhân viên được gán hoa hồng trong tháng nào đó thì
            bạn chỉ cần lựa chọn THÁNG, NĂM theo nhu cầu của mình. CHỌN hoặc
            NHẬP tên nhân viên cụ thể để tìm kiếm nhanh và xem chi tiết tiền hoa
            hồng của nhân viên đó.
          </p>
          <Image alt='/' src={'/nv.png'} />
          <p className={styles.p_center}>Danh sách nhân viên</p>
          <h2 className={styles.h2}>3. Tạm ứng</h2>
          <p className={styles.p}>
            Tạm ứng là mục hiển thị danh sách nhân viên đã có đề xuất tạm ứng
            tiền lương. Việc tạo đơn đề xuất sẽ được thực hiện tại mục Đề xuất
            (xin nghỉ) ở tài khoản nhân viên và thể hiện trạng thái cũng như nội
            dung chi tiết ở tài khoản công ty.
          </p>
          <p className={styles.p}>
            Những nhân viên tạm ứng sẽ được hiển thị trong bảng với các trường
            thông tin như: Họ tên, tiền tạm ứng, trạng thái, thời gian và ghi
            chú. Trạng thái sẽ hiển thị mẫu đơn tạm ứng của nhân viên đó được
            duyệt hay chưa được duyệt, tiền tạm ứng sẽ hiển thị số tiền mà nhân
            viên tạm ứng là bao nhiêu. Mục ghi chú sẽ thể hiện ghi chú kèm theo
            của đơn tạm ứng đó.
          </p>
          <p className={styles.p}>
            Với những đơn tạm ứng được phê duyệt thì nhân viên sẽ được thực hiện
            việc tạm ứng lương. Còn nếu ở các trạng thái khác thì sẽ tùy theo
            tình hình thời gian cụ thể để biết được nhân viên đó có được tạm ứng
            hay không.
          </p>
          <p className={styles.p}>
            Ngay trên bảng danh sách nhân viên tạm ứng sẽ là thanh search theo
            tên. Chỉ cần CHỌN hoặc NHẬP tên nhân viên mà mình muốn tra cứu là hệ
            thống sẽ hiển thị ngay bên dưới. Nếu nhân viên đó không có đề xuất
            tạm ứng thì danh sách hiển thị sẽ là dữ liệu trống.
          </p>
        </div>
      </div>
    </>
  )
}
export default Huongdan
