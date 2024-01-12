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
              style={{ fontSize: "18px" }}
              onClick={() => router.push('/cai-dat-luong/hoa-hong/hoa-hong')}>
              Quay lại
            </button>
          </div>
          <div>
            <p className={styles.p}>
              Hoa hồng lợi nhuận chính là phần chênh lệch giữa chi phí bỏ ra để
              tạo ra một sản phẩm, dịch vụ mới với khoản doanh thu thu lại khi
              bán sản phẩm, dịch vụ đó. .
            </p>
            <h2 className={styles.h2}>1. Thêm sản phẩm</h2>
            <p className={styles.p}>
              Việc đầu tiên cần thực hiện chính là việc cài đặt và thiết lập sản
              phẩm, dịch vụ với chi phí bỏ ra để sản xuất và xây dựng. Các bước
              cài đặt như sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Nhấp chuột vào biểu tượng răng cưa ở cuối góc bên trái ô
              thông tin Hoa hồng lợi nhuận. Chọn “Thêm”, biểu mẫu điền thông tin
              sẽ được hiện ra.
            </p>

            <p className={styles.p}>
              - Bước 2: Tiến hành nhập thông tin theo yêu cầu.
            </p>
            <p className={styles.p}>+ Nhập tên sản phẩm</p>
            <p className={styles.p}>+ Nhập chi phí bỏ ra để sản xuất</p>
            <p className={styles.p}>
              -Bước 3: Chọn “Lưu”, hệ thống sẽ cập nhật thông tin sản phẩm vào
              bảng danh sách cài đặt hoa hồng lợi nhuận.
            </p>
            <p className={styles.p}>
              Các trường thông tin trong bảng bao gồm: STT, Tên sản phẩm, Chi
              phí và cuối chính là tùy chỉnh. Trong trường hợp bạn muốn chỉnh
              sửa thông tin của sản phẩm nào thì chỉ cần click vào biểu tượng
              chiếc bút, biểu mẫu điền thông tin sẽ hiện ra, tiến hành chỉnh sửa
              và “Lưu” để hệ thống cập nhật dữ liệu mới. Còn nếu bạn muốn xóa
              thông tin của sản phẩm nào thì chỉ cần click vào biểu tượng thùng
              rác, xác nhận xóa và thông tin sản phẩm sẽ biến mất khỏi danh
              sách.
            </p>

            <div className={styles.img}>
              <Image alt='/' src={'/hhloinhuan.png'} />
              <p className={styles.p_center}>Cài đặt hoa hồng lợi nhuận</p>
            </div>
            <p className={styles.p}>
              Tương tự các bước như trên bạn sẽ cập nhật và bổ sung dữ liệu về
              các sản phẩm, dịch vụ mà công ty, doanh nghiệp mình đang triển
              khai.
            </p>
            <h2 className={styles.h2}>2. Thêm nhân viên áp dụng</h2>
            <p className={styles.p}>
              Sau khi đã xây dựng xong dữ liệu về các sản phẩm, dịch vụ với chi
              phí tương ứng thì việc tiếp theo bạn cần làm chính là thiết lập
              danh sách các nhân viên áp dụng với loại hoa hồng này.
            </p>
            <p className={styles.p}>
              Các bước thêm nhân viên được tiến hành theo các bước sau đây:
            </p>
            <p className={styles.p}>
              - Bước 1: Click vào “Nhập” của ô thông tin hoa hồng lợi nhuận. Hệ
              thống sẽ đưa bạn tới giao diện với các danh mục như: Hoa hồng cá
              nhân, hoa hồng nhóm và tổng hoa hồng.
            </p>
            <p className={styles.p}>
              - Bước 2: Chọn “Thêm hoa hồng”, popup điền thông tin sẽ được hiển
              thị. Nếu như bạn thiết lập hoa hồng cá nhân thì sẽ chọn biểu mẫu
              “Nhân viên”. Còn nếu thiết lập cho nhóm nhân viên thì sẽ lựa chọn
              “nhóm”.
            </p>
            <p className={styles.p}>
              - Bước 3: Điền các thông tin theo yêu cầu của biểu mẫu mà hệ thống
              cung cấp.
            </p>
            <p className={styles.p}>
              + Đối với thiết lập dành cho cá nhân thì các thông tin bao gồm:
            </p>
            <p className={styles.p}>+ Chọn tên nhân viên</p>
            <p className={styles.p}>
              + Chọn sản phẩm (sản phẩm được thiết lập ngay từ phần đầu tiên)
            </p>
            <p className={styles.p}>
              + Nhập sản lượng theo ngày: Số lượng, Doanh thu và Thời gian
            </p>
            <p className={styles.p}>
              Để thêm sản lượng của các ngày khác thì bạn sẽ click vào “Thêm
              doanh thu” ở phía bên dưới. Sau khi hoàn thiện sản lượng theo ngày
              thì hệ thống sẽ tự cập nhật về tổng sản phẩm và tổng doanh thu
              tương ứng.
            </p>

            <h2 className={styles.h2}>Chọn chu kỳ tương ứng</h2>
            <p className={styles.p}>Ghi chú: Nhập ghi chú (nếu có).</p>

            <p className={styles.p}>
              + Đối với thiết lập dành cho nhóm thì các thông tin sẽ cần được
              cập nhật bao gồm:
            </p>
            <p className={styles.p}>Lựa chọn Nhóm</p>
            <p className={styles.p}>Chọn chu kỳ</p>
            <p className={styles.p}>
              Chọn sản phẩm (sản phẩm sẽ là danh sách các sản phẩm được thiết
              lập từ đầu tiên)
            </p>
            <p className={styles.p}>
              Nhập sản lượng theo ngày: Số lượng, Doanh thu và Thời gian cụ thể.
            </p>
            <p className={styles.p}>
              Để thêm doanh thu của các ngày khác thì bạn sẽ chọn “Thêm doanh
              thu” và nhập tương tự. Sau khi hoàn thiện thì hệ thống sẽ tổng hợp
              số sản phẩm và tổng doanh thu mà nhóm đã đạt được.
            </p>
            <p className={styles.p}>Ghi chú: Nhập ghi chú nếu có.</p>
            <p className={styles.p}>
              - Bước 4: Sau khi hoàn thiện thông tin trong biểu mẫu thì bạn sẽ
              chọn “Thêm hoa hồng”. Hệ thống sẽ cập nhật thông tin được cung cấp
              để tính số tiền hoa hồng nhận được tương ứng.
            </p>
            <h2 className={styles.h2}>3. Xem danh sách nhân viên áp dụng</h2>

            <p className={styles.p}>
              Nhân viên sau khi được thiết lập hoa hồng lợi nhuận sẽ xuất hiện
              thông tin trong bảng danh sách tương ứng. Nếu là cá nhân thì sẽ
              được cập nhật trong Hoa hồng cá nhân, nếu là nhóm sẽ được cập nhật
              trong Hoa hồng nhóm, Tổng hoa hồng sẽ là mục thống kê toàn bộ
              những người được nhận hoa hoa hồng lợi nhuận (bao gồm cả cá nhân
              và nhóm).
            </p>
            <p className={styles.p}>
              Với hoa hồng cá nhân, những cá nhân được cập nhật thông tin sẽ
              được thể hiện trong bảng với các trường thông tin như: Họ tên, Chu
              kỳ áp dụng, Sản phẩm, Số lượng, Tổng doanh thu, Hoa hồng được
              nhận. Dựa vào bảng thống kê này, công ty, doanh nghiệp cũng như
              các nhà quản lý có thể biết được số sản phẩm, doanh thu mang lại
              và hoa hồng lợi nhuận mà nhân viên nhận được.
            </p>
            <p className={styles.p}>
              Cuối thông tin của mỗi nhân viên sẽ có 2 biểu tượng là chiếc bút
              và thùng rác. Đây sẽ là phần giúp bạn có thể chỉnh sửa thông tin
              hoặc xóa thông tin của nhân viên đó với hoa hồng lợi nhuận được áp
              dụng. Để tiến hành chỉnh sửa thông tin, bạn chọn biểu tượng chiếc
              bút, hệ thống sẽ hiển thị biểu mẫu nhập thông tin, tiến hành chỉnh
              sửa và chọn “Lưu hoa hồng” để cập nhật thông tin mới. Nếu muốn xóa
              nhân viên khỏi danh sách hoa hồng lợi nhuận được áp dụng thì click
              chọn biểu tượng thùng rác, xác nhận xóa và hệ thống sẽ bỏ đi nhân
              viên đó trong danh sách tương ứng.
            </p>
            <p className={styles.p}>
              Phía trên bảng quản lý theo dõi nhân viên hưởng hoa hồng lợi nhuận
              sẽ là thanh search. Dựa vào đó bạn có thể lọc và tìm kiếm nhanh
              chóng những nhân viên được hưởng hoa hồng lợi nhuận trong tháng
              bất kỳ. Lựa chọn tháng, chọn năm tương ứng, hệ thống sẽ trả lại
              danh sách những nhân viên có hoa hồng lợi nhuận của tháng đó. Còn
              nếu muốn xem thông tin chi tiết về hoa hồng lợi nhuận của một nhân
              viên bất kỳ thì bạn sẽ lựa chọn hoặc nhập tên nhân viên đó vào
              thanh search tương ứng, kết quả sẽ được hiển thị ngay sau đó.{' '}
            </p>
            <p className={styles.p}>
              Danh sách hoa hồng nhóm sẽ tổng hợp và thống kê các nhóm được
              hưởng hoa hồng lợi nhuận theo từng tháng. Bảng thống kê được hiển
              thị với các cột thông tin như: Tên nhóm, Chu kỳ, Sản phẩm, Số
              lượng, Tổng doanh thu. Cuối mỗi hàng thông tin của từng nhóm sẽ là
              mục chỉnh sửa và xóa.
            </p>
            <p className={styles.p}>
              Khi click vào biểu tượng chiếc bút, biểu mẫu điền thông tin sẽ
              được hiển thị. Ở đây, bạn sẽ tiến hành nhập phần trăm hoa hồng mà
              mỗi thành viên trong nhóm sẽ nhận được dựa trên tổng tiền hoa hồng
              mà cả nhóm có được. Việc thiết lập này là cần thiết để có thể tính
              được tiền hoa hồng mà mỗi thành viên trong nhóm nhận được sau này.
              Bên cạnh đó, bạn có thể thực hiện việc chỉnh sửa về sản phẩm, sản
              lượng và doanh thu mỗi ngày. Sau đó ấn “Lưu cài đặt”, hệ thống sẽ
              cập nhật và lưu trữ dữ liệu mới.
            </p>
            <p className={styles.p}>
              Trong trường hợp bạn muốn xóa nhóm nào đó khỏi danh sách hoa hồng
              lợi nhuận thì chỉ cần click vào biểu tượng thùng rác nằm ở cuối
              dòng thông tin của nhóm tương ứng, hệ thống sẽ hiển thị popup xác
              nhận xóa. Tiến hành xác nhận và kết thúc thao tác, nhóm bị xóa sẽ
              bị mất đi và không còn trong danh sách nữa.
            </p>
            <p className={styles.p}>
              Ngoài ra, phía trên bảng danh sách chính là thanh search. Chỉ cần
              chọn tháng, năm tương ứng, hệ thống sẽ hiển thị danh sách các nhóm
              nhận hoa hồng lợi nhuận trong tháng, năm đó. Nếu muốn xem chi tiết
              một nhóm nhất định thì chỉ cần chọn tên nhóm đó ở ô tìm kiếm cuối
              cùng. Kết quả sẽ được hệ thống gửi lại cho bạn trong tích tắc.
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/hhln.png'} />
              <p className={styles.p_center}>Tổng hoa hồng lợi nhuận</p>
            </div>
            <p className={styles.p}>
              Tổng hoa hồng lợi nhuận sẽ là mục thống kê toàn bộ danh sách những
              nhân viên được hưởng hoa hồng lợi nhuận. Bao gồm cả cá nhân và
              nhóm, tuy nhiên, sẽ hiển thị theo từng cá nhân với tổng số tiền
              hoa hồng lợi nhuận có được. Với những nhân viên được hưởng cả hoa
              hồng cá nhân và hoa hồng nhóm thì sẽ hiển thị tổng số tiền hoa
              hồng có được tại Tổng hoa hồng tiền lợi nhuận.
            </p>
            <p className={styles.p}>
              Đối với nhân viên được hưởng hoa hồng lợi nhuận cá nhân thì tổng
              số tiền hoa hồng nhận được sau cùng sẽ dựa trên số lượng và khoản
              chênh lệch bán được sản phẩm.
            </p>
            <p className={styles.p}>
              Ví dụ: Nhân viên A trong tháng 10 bán được 5 sản phẩm. Chi phí sản
              xuất là 20 triệu/ sản phẩm, chi phí bán ra là 30 triệu/ sản phẩm.
              Số tiền hoa hồng nhân viên A nhận được trong tháng 10 là (30 triệu
              - 20 triệu)*5 = 50 triệu.
            </p>
            <p className={styles.p}>
              Với nhân viên hưởng hoa hồng lợi nhuận theo nhóm thì số tiền hoa
              hồng lợi nhuận nhận được sẽ dựa trên phần trăm hoa hồng của mỗi
              người với tổng số tiền hoa hồng của cả nhóm làm được.{' '}
            </p>
            <p className={styles.p}>
              Ví dụ: Nhóm B có 4 thành viên. Trong tháng 10, nhóm B bán được 37
              sản phẩm. Chi phí sản xuất là 25 triệu đồng/sản phẩm, chi phí bán
              ra là 45 triệu/ sản phẩm.
            </p>
            <p className={styles.p}>
              Số tiền hoa hồng của cả nhóm B là: (45 triệu - 25 triệu)*37= 740
              triệu đồng.
            </p>
            <p className={styles.p}>
              Phần trăm hoa hồng của mỗi thành viên tương ứng là 15%.{' '}
            </p>
            <p className={styles.p}>
              Vậy, số tiền hoa hồng lợi nhuận của mỗi thành viên nhóm B trong
              tháng 10 là:
            </p>
            <p className={styles.p}>15%*740000000 = 111.000.000 đồng.</p>
            <p className={styles.p}>
              Phía trên bảng danh sách tổng hoa hồng tiền lợi nhuận sẽ là thanh
              search. Dựa trên đó, việc lọc danh sách nhân viên hưởng hoa hồng
              lợi nhuận theo tháng nhất định sẽ dễ dàng hơn. Lựa chọn THÁNG, NĂM
              tương ứng, hệ thống sẽ hiển thị danh sách theo tháng, năm đó. Nếu
              như muốn xem thông tin của một nhân viên bất kỳ thì có thể lựa
              chọn tên nhân viên đó trong ô tìm kiếm tên tương ứng. Kết quả sẽ
              được trả lại ngay sau đó.{' '}
            </p>
            <p className={styles.p}>
              Để trở về danh sách các loại hoa hồng ban đầu, bạn sẽ click chọn
              “Quay lại” bên cạnh “Thêm hoa hồng”. Hệ thống sẽ trở về giao diện
              Cài đặt hoa hồng.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Huongdan
