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
            <p className={styles.p}>
              Hoa hồng doanh thu chính là mức hoa hồng nhận được dựa trên tỷ lệ
              phần trăm nhất định trong tổng doanh thu do nhân viên bán hàng tạo
              ra.
            </p>
            <h2 className={styles.h2}>1. Thêm nhân viên áp dụng</h2>
            <p className={styles.p}>
              Việc đầu tiên bạn cần làm chính là thiết lập mức doanh thu với
              việc xây dựng phần trăm hoa hồng tương ứng cho từng loại doanh thu
              mà nhân viên bán hàng có thể tạo ra. Các thao tác thực hiện như
              sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Nhấp chuột vào biểu tượng răng cưa ở góc dưới bên trái ô
              thông tin Hoa hồng doanh thu , chọn “Thêm” ở góc trên bên phải
              biểu mẫu thông tin được hiển thị.
            </p>

            <p className={styles.p}>
              - Bước 2: Điền thông tin vào popup thiết lập doanh thu.
            </p>
            <p className={styles.p}>+ Nhập tên doanh thu</p>
            <p className={styles.p}>+ Doanh thu nhỏ nhất</p>
            <p className={styles.p}>+ Doanh thu lớn nhất</p>
            <p className={styles.p}>
              + Hoa hồng (%, phần trăm hoa hồng nhận được)
            </p>
            <p className={styles.p}>
              - Bước 3: Chọn “Lưu” , hệ thống sẽ cập nhật doanh thu đó vào bảng
              doanh thu tương ứng với các trường thông tin như: STT, Tên doanh
              thu, Doanh thu, Hoa hồng và tùy chỉnh.
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/hoa-hong-doanh-thu.png'} />
              <p className={styles.p_center}>Hoa hồng doanh thu</p>
            </div>
            <h2 className={styles.h2}>2. Thêm nhân viên áp dụng</h2>
            <p className={styles.p}>
              Sau khi đã thiết lập các mức doanh thu với phần trăm nhận hoa hồng
              tương ứng thì bạn sẽ cần thêm nhân viên áp dụng cho từng mức doanh
              thu cụ thể. Thao tác thực hiện như sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Chọn “Nhập” nằm ở cuối ô thông tin Hoa hồng doanh thu,
              hệ thống hiển thị giao diện với các danh mục: Hoa hồng cá nhân,
              Hoa hồng nhóm và Tổng hoa hồng.
            </p>
            <p className={styles.p}>
              - Bước 2: Chọn “Thêm mới”, popup cập nhật thông tin sẽ xuất hiện.
            </p>
            <p className={styles.p}>+ Chọn nhân viên/ nhóm tương ứng.</p>
            <p className={styles.p}>+ Nhập doanh thu theo thời điểm.</p>
            <p className={styles.p}>
              Trong trường hợp một chu kỳ có nhiều thời điểm với nhiều khoản
              doanh thu khác nhau thì bạn sẽ tiến hành nhập từng khoản doanh thu
              ở từng thời điểm cụ thể bằng cách điền số doanh thu và chọn thời
              điểm ở ô bên cạnh. Click vào “Thêm doanh thu” để nhập thêm doanh
              thu ở các thời điểm khác trong chu kỳ.
            </p>
            <p className={styles.p}>
              + Nhập tổng doanh thu: Số doanh thu được cộng lại từ tất cả doanh
              thu ở các thời điểm trong chu kỳ được xét.
            </p>
            <p className={styles.p}>
              + Chọn mức doanh thu: Lựa chọn mức doanh thu tương ứng với nhân
              viên/ nhóm đang được xét dựa trên các mức doanh thu với phần trăm
              hoa hồng tương ứng mà bạn đã thiết lập đầu tiên.
            </p>
            <p className={styles.p}>+ Nhập ghi chú (nếu có).</p>
            <p className={styles.p}>
              - Bước 3: Nhấp chuột chọn “Thêm hoa hồng”, hệ thống sẽ cập nhật và
              lưu trữ thông tin vào bảng bên dưới của Hoa hồng cá nhân hay Hoa
              hồng nhóm tùy theo đối tượng mà bạn thiết lập.
            </p>

            <h2 className={styles.h2}>3. Xem danh sách nhân viên áp dụng</h2>
            <p className={styles.p}>
              Đối với danh sách hoa hồng cá nhân, đây sẽ là danh sách hiển thị
              những nhân viên được hưởng hoa hồng doanh thu. Các trường thông
              tin trong bảng bao gồm: Họ tên, Chu kỳ, Doanh thu, Hoa hồng và Ghi
              chú.
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/hoa-hong-ca-nhan-doanh-thu.png'} />
              <p className={styles.p_center}>Hoa hồng cá nhân</p>
            </div>
            <p className={styles.p}>
              Để chỉnh sửa thông tin về phần trăm hoa hồng của nhân viên bất kỳ
              thì bạn chỉ cần chọn biểu tượng chiếc bút nằm ở cuối dòng thông
              tin của nhân viên đó, biểu mẫu chỉnh sửa thông tin sẽ hiện ra,
              tiến hành chỉnh sửa về doanh thu thời điểm, thời điểm, mức doanh
              thu áp dụng và ghi chú, Lưu hoa hồng, hệ thống sẽ cập nhật thông
              tin mới.
            </p>
            <p className={styles.p}>
              Còn nếu muốn xóa nhân viên khỏi danh sách hưởng hoa hồng doanh thu
              thì bạn sẽ click chuột vào biểu tượng thùng rác, popup xác nhận
              thao tác xóa hiển thị, tiến hành xác nhận và kết thúc thao tác xóa
              nhân viên khỏi danh sách.
            </p>
            <p className={styles.p}>
              Để xem ghi chú về hoa hồng doanh thu thì bạn chỉ cần chọn “Xem
              thêm” ở cột ghi chú, toàn bộ ghi chú được note sẽ hiển thị ở popup
              trên màn hình sau khi click chọn xem.
            </p>
            <p className={styles.p}>
              Phía trên bảng danh sách sẽ là bộ lọc và thanh search để bạn có
              thể tìm kiếm nhanh với thông tin mà mình mong muốn. Lựa chọn
              tháng, năm để xem danh sách những nhân viên hưởng hoa hồng doanh
              thu của thời điểm đó. Chọn tên nhân viên để xem thông tin cụ thể
              của nhân viên bất kỳ về việc hưởng hoa hồng doanh thu trong tháng
              nhất định.
            </p>
            <p className={styles.p}>
              Đối với danh sách hoa hồng nhóm, đây sẽ là danh sách hiển thị các
              nhóm được hưởng hoa hồng doanh thu. Việc cung cấp danh sách này sẽ
              giúp công ty, doanh nghiệp và các nhà quản lý sẽ thuận tiện hơn
              trong việc thống kê, theo dõi, quản lý danh sách nhóm nhân viên
              hoa hồng doanh thu.
            </p>
            <p className={styles.p}>
              Các nhóm được xây dựng theo bảng với các cột thông tin như: Nhóm
              nhân viên, Chu kỳ, Doanh thu, Hoa hồng, Ghi chú. Ở cuối mỗi dòng
              thông tin của từng nhóm nhân viên sẽ có mục chỉnh sửa và xóa.
            </p>
            <p className={styles.p}>
              Khi click vào biểu tượng chiếc bút (thao tác chỉnh sửa), biểu mẫu
              thông tin được hiển thị, tiến hành cài đặt phần trăm hoa hồng cho
              từng thành viên trong nhóm, có thể chỉnh sửa doanh thu theo thời
              điểm và mức doanh thu áp dụng, Lưu cài đặt, hệ thống sẽ cập nhật
              và lưu trữ thông tin mới.
            </p>
            <p className={styles.p}>
              Việc tiến hành cài đặt phần trăm hoa hồng cho từng thành viên
              trong nhóm là bắt buộc, điều này sẽ ảnh hưởng đến việc tính hoa
              hồng của từng người và hiển thị ở mục tổng hoa hồng.
            </p>
            <p className={styles.p}>
              Trong trường hợp muốn xóa nhóm nhân viên hưởng hoa hồng doanh thu
              thì chỉ cần chọn biểu tượng thùng rác, popup xác nhận, tiến hành
              xác nhận và kết thúc việc xóa nhóm nhân viên tương ứng.
            </p>
            <p className={styles.p}>
              Để xem chi tiết ghi chú của nhóm nhân viên hưởng hoa hồng doanh
              thu thì bạn chỉ cần click vào “Xem thêm”, ghi chú nếu được note sẽ
              thể hiện đầy đủ trên màn hình.
            </p>
            <p className={styles.p}>
              Bên cạnh đó, bạn có thể thực hiện việc tìm kiếm hay lọc danh sách
              nhóm nhân viên hưởng hoa hồng doanh thu thông qua thanh lọc được
              cung cấp phía trên bảng danh sách. Lựa chọn tháng, lựa chọn năm
              hoặc lựa chọn tên nhóm, hệ thống sẽ trả lại kết quả tìm kiếm dựa
              trên thông tin mà bạn chọn.
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/hoa-hong-nhom.png'} />
              <p className={styles.p_center}>Hoa hồng nhóm</p>
            </div>
            <p className={styles.p}>
              Tổng hoa hồng sẽ là mục cho thấy được chi tiết hoa hồng được hưởng
              của mỗi nhân viên trong từng tháng nhất định. Nhân viên sẽ được
              thống kê theo dạng bảng với 2 trường thông tin chính là Họ tên và
              Tổng tiền. Trong trường hợp một nhân viên trong cùng một tháng
              nhận được nhiều loại hoa hồng khác nhau thì tổng tiền sẽ chính là
              tổng các loại hoa hồng nhận được của nhân viên đó.
            </p>
            <p className={styles.p}>
              Đối với số tiền hoa hồng cá nhân thì sẽ dựa vào doanh thu của nhân
              viên đó cùng với mức doanh thu áp dụng để tính được số tiền hưởng
              thực tế.
            </p>
            <p className={styles.p}>
              Ví dụ: Nhân viên A trong tháng 10 có tổng doanh thu là 2.500.000
              đồng. Mức doanh thu áp dụng là Bán thẻ (500.000 - 5.000.000 đồng,
              % hoa hồng là 15%). Vậy số tiền hoa hồng nhân viên A nhận được là:
              15%*2500000 = 375.000 đồng.
            </p>
            <p className={styles.p}>
              Còn với hoa hồng nhóm thì số tiền được hưởng của mỗi thành viên sẽ
              dựa trên phần trăm của từng người so với tổng số hoa hồng mà cả
              nhóm có được..
            </p>
            <p className={styles.p}>
              Ví dụ: Nhóm A có 4 thành viên. Tổng doanh thu của nhóm trong tháng
              11 là 2.000.000 đồng. Mức doanh thu áp dụng là Việc làm (1.500.000
              - 3.500.000, % hoa hồng là 12%).{' '}
            </p>
            <p className={styles.p}>
              Số tiền hoa hồng của cả nhóm nhận được là: 12%*2000000 = 240000
              đồng.
            </p>
            <p className={styles.p}>
              Mỗi thành viên có % hoa hồng được cài đặt là 12%. Vậy số tiền hoa
              hồng của mỗi thành viên trong nhóm A = 12%*240.000 = 28.800 đồng.
            </p>
            <p className={styles.p}>
              Phía trên bảng danh sách về tổng hoa hồng doanh thu sẽ là thanh
              search. Với thanh tìm kiếm này, bạn có thể lọc được danh sách
              những nhân viên được hưởng hoa hồng doanh thu trong từng tháng
              nhất định bằng cách lựa chọn tháng, năm tương ứng. Thêm vào đó,
              thanh search theo tên sẽ giúp bạn tra cứu nhanh hơn về thông tin
              hoa hồng doanh thu của một nhân viên nhất định bằng cách nhập hoặc
              chọn tên nhân viên đó.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Huongdan
