import React from 'react'
import { Image } from 'antd'
import styles from '../huongdan.module.css'
import { useRouter } from 'next/router'
const Huongdan = () => {
  const router = useRouter()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <button
              type='primary'
              className={styles.btn_cancer}
              onClick={() => router.push('/cai-dat-luong/hoa-hong')}>
              Quay lại
            </button>
          </div>
          <div>
            <p className={styles.p}>
              Hoa hồng tiền chính là khoản hoa hồng bằng tiền mặt mà nhân viên
              có thể nhận được dựa trên công việc mà mình đảm nhận. Tùy vào từng
              vị trí việc làm nhất định trong công ty mà sẽ có thêm khoản hoa
              hồng tương ứng, ví dụ như nhân sự hay nhân viên kinh doanh sẽ là
              đối tượng có thêm hoa hồng trong khoản lương của mình.
            </p>
            <h2 className={styles.h2}>1. Thêm nhân viên áp dụng</h2>
            <p className={styles.p}>
              Với hoa hồng tiền, đây sẽ thường là danh sách những người có hoa
              hồng và được xác định bằng con số cụ thể. Vì thế mà các công ty,
              doanh nghiệp có thể tải lên bằng file excel để cập nhật dữ liệu.
              Bên cạnh đó, việc thêm thông tin về nhân sự được nhận hoa hồng
              tiền có thể thao tác như sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Chọn Thêm hoa hồng xong chọn hệ thống sẽ hiển thị giao
              diện với các mục nội dung như: Hoa hồng cá nhân, Hoa hồng nhóm và
              Tổng hoa hồng.
            </p>
            <p className={styles.p}>
              Trong đó, hoa hồng cá nhân sẽ hiển thị danh sách các nhân viên
              được hoa hồng, hoa hồng nhóm sẽ biểu hiện danh sách các nhóm nhận
              được hoa hồng. Tổng hoa hồng chình là danh sách tổng hợp của hoa
              hồng cá nhân và hoa hồng nhóm.
            </p>
            <p className={styles.p}>
              - Bước 2: Chọn “Thêm mới” để tạo dữ liệu cho Hoa hồng cá nhân và
              Hoa hồng nhóm ở mục Hoa hồng tiền , popup điền thông tin sẽ được
              hiển thị trên màn hình.
            </p>
            <p className={styles.p}>+ Chọn nhân viên/ nhóm nhân viên </p>
            <p className={styles.p}>
              + Chọn thời gian áp dụng cho hoa hồng tiền được thiết lập.
            </p>
            <p className={styles.p}>
              + Nhập số tiền tương ứng với hoa hồng nhận được.
            </p>
            <p className={styles.p}>+ Điền ghi chú (nếu có)</p>
            <p className={styles.p}>
              - Bước 3: Chọn “thêm hoa hồng”, hệ thống sẽ cập nhật dữ liệu vào
              Hoa hồng cá nhân/ Hoa hồng nhóm và Tổng hoa hồng dựa theo đối
              tượng mà bạn nhập dữ liệu.
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/hoa-hong-tien.png'} />
              <p className={styles.p_center}>Hoa hồng tiền</p>
            </div>
            <h2 className={styles.h2}>2. Xem nhân viên áp dụng</h2>
            <p className={styles.p}>
              Danh sách nhân viên/ nhóm nhân viên được hưởng hoa hồng sẽ được
              thống kê theo dạng bảng với các trường thông tin bao gồm: Họ và
              tên/ Nhóm nhân viên, Thời gian, Số tiền và Ghi chú. Riêng với Tổng
              hoa hồng tiền thì sẽ được hiển thị với 3 trường thông tin: Họ tên,
              Chu kỳ và Tổng tiền. Với những nhân viên vừa được hưởng hoa hồng
              cá nhân, vừa được hưởng hoa hồng theo nhóm thì bảng Tổng hoa hồng
              tiền sẽ hiển thị tổng số tiền hoa hồng mà nhân viên đó nhận được
              trong tháng.
            </p>
            <p className={styles.p}>
              Ở bảng danh sách hoa hồng cá nhân và hoa hồng nhóm sẽ có mục Tùy
              chỉnh bao gồm thao tác chỉnh sửa và xóa. Điều này cho phép nhân sự
              hay nhà quản lý có thể thực hiện việc sửa đổi thông tin về hoa
              hồng hay xóa nhân viên đó ra khỏi danh sách nhận hoa hồng tiền. Để
              thực hiện thao tác này thì bạn sẽ làm như sau:
            </p>
            <p className={styles.p}>
              - Chọn nhân viên/ nhóm cần chỉnh sửa/ xóa thông tin về hoa hồng.
            </p>
            <p className={styles.p}>
              - Click vào biểu tượng chiếc bút/ thùng rác tại cuối mỗi dòng
              thông tin của nhân viên/ nhóm đó.
            </p>
            <p className={styles.p}>
              - Đối với thao tác chỉnh sửa, bạn có thể chỉnh sửa thời gian áp
              dụng, số tiền hoa hồng và ghi chú. Lưu hoa hồng để hệ thống cập
              nhật thông tin mới.
            </p>
            <p className={styles.p}>
              Trong trường hợp xóa, popup xác nhận thao tác xóa được hiển thị,
              tiến hành xác nhận thao tác và xóa nhân viên/ nhóm đó khỏi danh
              sách hoa hồng.
            </p>
            <p className={styles.p}>
              Để xem ghi chú hoa hồng của nhân viên hay nhóm thì bạn chỉ cần
              nhấp chuột vào “Xem thêm” ở cột ghi chú của hàng thông tin về nhân
              viên/ nhóm cụ thể, hệ thống sẽ hiển thị popup chi tiết ghi chú về
              hoa hồng của nhân viên/ nhóm nếu được cập nhật khi thêm thông tin.
            </p>
            <p className={styles.p}>
              Trên mỗi bảng danh sách hoa hồng cá nhân, Hoa hồng nhóm hay Tổng
              hoa hồng đều có bộ lọc thanh search tương ứng. Chỉ cần lựa chọn
              tháng, năm, tên nhân viên hay nhóm là hệ thống sẽ trả lại kết quả
              ngay sau đó. Đặc biệt, bạn không cần phải nhập hết các trường
              thông tin trên thanh search mà chỉ cần lựa chọn ở ô thông tin tùy
              theo nhu cầu tìm kiếm của mình. Nếu không có sự lựa chọn ở trường
              thông tin nào thì hệ thống sẽ hiển thị mặc định ở thời điểm hiện
              tại mà bạn truy cập và sử dụng phần mềm Tính lương 365.
            </p>
            <p className={styles.p}>
              Để quay trở lại giao diện cài đặt hoa hồng ban đầu thì bạn sẽ
              click chuột vào “Quay lại”, hệ thống sẽ trở về giao diện là 5 loại
              hoa hồng được thiết lập mặc định.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Huongdan
