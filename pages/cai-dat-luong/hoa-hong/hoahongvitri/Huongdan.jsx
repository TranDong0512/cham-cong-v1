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
          <div></div>
          <div>
            <p className={styles.p}>
              Hoa hồng lệ phí vị trí tức là mức hoa hồng đã được thiết lập sẵn
              cho một sản phẩm, dịch vụ mà nhân viên được hưởng sau khi bán sản
              phẩm, dịch vụ đó ra thị trường.
            </p>
            <h2 className={styles.h2}>1. Cài đặt hoa hồng lệ phí vị trí</h2>
            <p className={styles.p}>
              Bước đầu tiên bạn cần làm đó chính là cài đặt hoa hồng lệ phí vị
              trí với việc thiết lập tên sản phẩm, dịch vụ và số tiền hoa hồng
              nhận được với sản phẩm, dịch vụ đó. Các bước cài đặt được thực
              hiện như sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Click vào biểu tượng răng cưa ở góc dưới bên trái ô
              thông tin Hoa hồng lệ phí vị trí. Hệ thống sẽ hiển thị biểu mẫu
              danh sách. Chọn “Thêm” để tiến hành cập nhật dữ liệu.
            </p>
            <p className={styles.p}>
              - Bước 2: Điền các thông tin vào biểu mẫu được hiển thị.
            </p>
            <p className={styles.p}>
              - Bước 2: Chọn “Thêm mới” để tạo dữ liệu cho Hoa hồng cá nhân và
              Hoa hồng nhóm ở mục Hoa hồng tiền , popup điền thông tin sẽ được
              hiển thị trên màn hình.
            </p>
            <p className={styles.p}>+ Nhập tên sản phẩm, dịch vụ.</p>
            <p className={styles.p}>
              + Nhập số tiền hoa hồng nhận được tương ứng.
            </p>
            <p className={styles.p}>
              - Bước 3: Chọn “Lưu”. Hệ thống sẽ cập nhật sản phẩm và tiền hoa
              hồng đó vào bảng danh sách tương ứng.
            </p>
            <p className={styles.p}>
              Các loại sản phẩm, dịch vụ và số tiền hoa hồng được thiết lập
              tương ứng sẽ hiển thị trong bảng với các trường thông tin như:
              STT, Tên sản phẩm, Hoa hồng. Ở cuối mỗi dòng thông tin tương ứng
              sẽ là biểu tượng chiếc bút với vai trò chỉnh sửa và biểu tượng
              thùng rác với chức năng xóa.
            </p>
            <p className={styles.p}>
              Trong trường hợp bạn muốn điều chỉnh hoa hồng hay tên sản phẩm,
              dịch vụ thì sẽ nhấp chuột vào biểu tượng chiếc bút. Hệ thống hiển
              thị giao diện điền thông tin, chỉnh sửa thông tin cần thiết và
              chọn “Lưu” để cập nhật thông tin mới. Còn nếu muốn xóa thì sẽ chọn
              biểu tượng thùng rác, xác nhận thao tác và xóa thông tin về sản
              phẩm, dịch vụ khỏi danh sách.
            </p>
            <p className={styles.p}>
              Tương tự các thao tác trên bạn sẽ tiến hành việc cài đặt các sản
              phẩm, dịch vụ khác với mức hoa hồng nhận được tương ứng.
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/tinhluong/lpvt.png'} />
              <p className={styles.p_center}>Hoa hồng lệ phí vị trí</p>
            </div>
            <h2 className={styles.h2}>2. Thêm nhân viên áp dụng</h2>
            <p className={styles.p}>
              Sau khi đã thiết lập xong các khoản hoa hồng của từng loại sản
              phẩm, dịch vụ thì cần tiến hành thêm nhân viên áp dụng cũng như
              hưởng loại hoa hồng này. Việc thêm nhân viên áp dụng sẽ được thực
              hiện như sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Chọn “Nhập” nằm ở cuối ô thông tin hoa hồng lệ phí vị
              trí. Hệ thống sẽ đưa bạn tới giao diện hiển thị danh sách những
              nhân viên/ nhóm nhân viên được nhận hoa hồng lệ phí vị trí.
            </p>
            <p className={styles.p}>
              - Bước 2: Lựa chọn “Thêm hoa hồng” ở phía góc trên bên phải để
              tiến hành thêm nhân viên nhận hoa hồng lệ phí vị trí. Biểu mẫu
              điền thông tin sẽ được hiển thị.
            </p>
            <p className={styles.p}>
              + Chọn tên nhân viên/ nhóm nhân viên tương ứng.
            </p>
            <p className={styles.p}>
              + Chọn sản phẩm, chọn chu kỳ tương ứng với nhân viên/ nhóm nhân
              viên được thiết lập.
            </p>
            <p className={styles.p}>
              + Nhập sản lượng theo ngày của nhân viên/ nhóm nhân viên bán được.
              Click “Thêm doanh thu” để thiết lập đúng số ngày và doanh thu từng
              ngày.
            </p>
            <p className={styles.p}>+ Ghi chú: Nhập ghi chú (nếu có).</p>
            <p className={styles.p}>
              - Bước 3: Chọn “Thêm hoa hồng”, hệ thống sẽ lưu trữ dữ liệu mà bạn
              đã cập nhật thông tin. Những đối tượng được cập nhật sẽ xuất hiện
              trong danh sách Hoa hồng cá nhân hay Hoa hồng nhóm tùy theo diện
              cập nhật thông tin là nhân viên hay nhóm mà bạn thao tác.
            </p>
            <h2 className={styles.h2}>3. Xem nhân viên áp dụng</h2>
            <p className={styles.p}>
              Hoa hồng cá nhân sẽ hiển thị danh sách các cá nhân nhân viên được
              hưởng hoa hồng lệ phí vị trí với việc tự tiêu thụ sản phẩm ra thị
              trường. Các cá nhân được hưởng hoa hồng này sẽ được thống kê trong
              bảng với các cột thông tin như: Họ tên, Chu kỳ áp dụng, Sản phẩm,
              Số lượng và Hoa hồng được nhận.
            </p>
            <p className={styles.p}>
              Dựa vào bảng, việc theo dõi, thống kê cũng như cập nhật thông tin
              về hoa hồng lệ phí vị trí sẽ được thực hiện một cách đơn giản và
              dễ dàng hơn. Số tiền hoa hồng nhận được của cá nhân sẽ dựa trên số
              sản phẩm bán được và hoa hồng nhận được của sản phẩm đó là bao
              nhiêu.
            </p>
            <p className={styles.p}>
              Ví dụ: Nhân viên A bán được 110 bàn chải điện trong tháng 10. Hoa
              hồng lệ phí vị trí nhận được cho 1 sản phẩm là 1.200.000 đồng. Vì
              thế, số tiền hoa hồng của nhân viên A là: 110*1200000= 132.000.000
              đồng.
            </p>
            <p className={styles.p}>
              Cuối mỗi dòng thông tin của nhân viên tương ứng sẽ là biểu tượng
              chỉnh sửa và biểu tượng xóa.
            </p>
            <p className={styles.p}>
              Để thực hiện việc chỉnh sửa thông tin hoa hồng lệ phí vị trí của
              nhân viên bất kỳ bạn sẽ tiến hành click vào biểu tượng chiếc bút,
              popup điền thông tin sẽ được hiển thị. Tiến hành chỉnh sửa thông
              tin cần thiết và chọn “Lưu hoa hồng” để cập nhật thông tin mới.
              Còn nếu muốn xóa thông tin của nhân viên nào thì bạn chỉ cần chọn
              biểu tượng thùng rác, xác nhận thao tác là việc xóa sẽ được tiến
              hành thành công.
            </p>
            <div className={styles.img}>
              <Image
                alt='/'
                src={'/tinhluong/nv (1).png'}
                width={512}
                height={294}
                style={{ margin: 'auto' }}
              />
              <p className={styles.p_center}>
                Danh sách nhân viên hưởng hoa hồng lệ phí vị trí
              </p>
            </div>
            <h2 className={styles.h2}>
              Việc lọc và tìm kiếm nhân viên sẽ được thực hiện nhanh hơn với
              thanh search được cung cấp bên trên. bằng cách chọn thời gian,
              chọn tên nhân viên, hệ thống sẽ trả lại kết quả tương ứng dựa trên
              thao tác tìm kiếm mà bạn thiết lập. Tìm kiếm theo thời gian (chọn
              tháng, chọn năm), tìm kiếm theo tên (chọn tên).{' '}
            </h2>
            <p className={styles.p}>
              Hoa hồng theo nhóm sẽ hiển thị danh sách các nhóm được nhận hoa
              hồng lệ phí vị trí đã được cập nhật thông tin. Các nhóm được xây
              dựng trong bảng với các trường thông tin như: Tên nhóm, Chu kỳ,
              Sản phẩm, Số lượng, Hoa hồng nhận được và ở cuối sẽ là tùy chỉnh
              với 2 biểu tượng chỉnh sửa, xóa.
            </p>
            <p className={styles.p}>
              Việc chỉnh sửa thông tin của hoa hồng nhóm là rất cần thiết, bởi
              đây sẽ là bước thiết lập phần trăm hoa hồng của mỗi thành viên
              trong nhóm. Dựa vào đó để tính được số tiền hoa hồng nhận được của
              mỗi người sau này.
            </p>
            <p className={styles.p}>
              - Nhấp chuột vào biểu tượng chiếc bút ở dòng thông tin của nhóm
              tương ứng, popup điền thông tin sẽ hiện ra.
            </p>
            <p className={styles.p}>
              - Nhập phần trăm hoa hồng của mỗi thành viên trong nhóm, chỉ cần
              điền số, không cần điền ký hiệu %. Có thể chỉnh sửa thông tin như
              Sản phẩm, Sản lượng theo ngày để cập nhật con số chính xác nhất.
            </p>
            <p className={styles.p}>
              - Chọn “Lưu cài đặt” để hệ thống cập nhật thông tin mới.
            </p>
            <p className={styles.p}>
              Số tiền hoa hồng của mỗi thành viên trong nhóm sẽ được tính dựa
              trên phần trăm hoa hồng của mỗi người so với số tiền hoa hồng mà
              cả nhóm nhận được.
            </p>
            <p className={styles.p}>
              Ví dụ: Nhóm C có 4 thành viên. Tháng 10 nhóm bán được 275 máy rửa
              mặt. Tiền hoa hồng cho 1 sản phẩm là 1.500.000 đồng.
            </p>
            <p className={styles.p}>
              Số tiền hoa hồng của nhóm C là: 275*1.500.000 = 412.500.000 đồng.
            </p>
            <p className={styles.p}>
              Số tiền hoa hồng của mỗi người trong nhóm sẽ là số phần trăm hoa
              hồng vừa được thiết lập *412.500.000.
            </p>
            <p className={styles.p}>
              Nếu như muốn xóa nhóm bất kỳ khỏi danh sách quản lý theo dõi nhóm
              hưởng hoa hồng lệ phí vị trí thì chỉ cần click vào biểu tượng
              thùng rác, xác nhận thao tác xóa là nhóm đó sẽ biến mất khỏi danh
              sách được cập nhật..
            </p>
            <p className={styles.p}>
              Để lọc và tìm kiếm nhanh nhóm nhận hoa hồng lệ phí vị trí thì bạn
              có thể sử dụng thanh search được cung cấp ở phía trên bảng danh
              sách. Các thanh search về thời gian (chọn tháng, năm) và tên (chọn
              hoặc nhập tên) sẽ giúp bạn thực hiện việc lọc theo thời gian hoặc
              tìm kiếm thông tin nhóm bất kỳ nhanh chóng hơn.{' '}
            </p>
            <p className={styles.p}>
              Tổng hoa hồng tiền lợi nhuận sẽ là bảng quản lý và theo dõi tổng
              hoa hồng tiền lợi nhuận của những nhân viên được hưởng. Bao gồm cả
              danh sách cá nhân và danh sách nhóm. Tuy nhiên, bảng thống kê sẽ
              thống kê theo từng cá nhân, những nhân viên vừa hưởng hoa hồng lệ
              phí vị trí ở dạng cá nhân và nhóm sẽ được hệ thống tính toán và
              cập nhật tổng số tiền hoa hồng nhận được ở mục này.
            </p>
            <p className={styles.p}>
              Bảng danh sách được xây dựng với 3 thông tin cơ bản là Họ tên, Chu
              kỳ và tổng tiền. Dựa vào đây công ty, doanh nghiệp cũng như các
              nhà quản lý có thể biết được số tiền hoa hồng lệ phí vị trí của
              một nhân viên trong một tháng nhất định là bao nhiêu.
            </p>
            <p className={styles.p}>
              Thanh search ở phía trên sẽ giúp bạn lọc được danh sách nhân viên
              hưởng hoa hồng lệ phí vị trí theo tháng nhất định khi lựa chọn
              THÁNG, NĂM tương ứng. Còn nếu muốn xem nhanh thông tin hoa hồng
              của nhân viên nào thì chỉ cần CHỌN hoặc NHẬP TÊN NHÂN VIÊN trong
              thanh search tương ứng, hệ thống sẽ trả lại kết quả ngay sau đó.
            </p>
            <p className={styles.p}>
              Nhấp chuột vào “Quay lại” để trở về giao diện Cài đặt hoa hồng ban
              đầu.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Huongdan
