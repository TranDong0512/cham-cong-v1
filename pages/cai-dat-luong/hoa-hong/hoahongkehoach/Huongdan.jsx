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
              Hoa hồng kế hoạch là mức hoa hồng mà nhân viên nhận được khi đạt
              một mức chỉ tiêu nhất định do công ty đề ra.
            </p>
            <h2 className={styles.h2}>1. Cài đặt hoa hồng kế hoạch</h2>
            <p className={styles.p}>
              Trước khi thiết lập nhân viên hưởng loại hoa hồng này thì bạn cần
              tiến hành cài đặt dữ liệu cho hoa hồng kế hoạch mà công ty đang
              triển khai và áp dụng. Các bước được tiến hành như sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Nhấp chuột vào biểu tượng răng cưa ở cuối góc bên trái ô
              hoa hồng kế hoạch. Popup sẽ hiển thị giao diện là một bảng thống
              kê, lựa chọn “Thêm” để cập nhật dữ liệu.
            </p>
            <p className={styles.p}>
              - Bước 2: Biểu mẫu điền thông tin được hiện trên giao diện màn
              hình. Tiến hành điền thông tin theo yêu cầu.
            </p>
            <p className={styles.p}>+ Nhập tên kế hoạch, dự án.</p>
            <p className={styles.p}>+ Nhập số tiền thưởng nếu đạt KPI. </p>
            <p className={styles.p}>
              + Nhập số tiền nếu không đạt KPI. Trong trường hợp công ty vẫn
              thưởng cho nhân viên dù không đạt KPI thì sẽ nhập số tiền tương
              ứng, còn nếu không thưởng thì sẽ nhập là 0.
            </p>
            <p className={styles.p}>
              - Bước 3: Chọn “Lưu” để hệ thống cập nhật dữ liệu.
            </p>
            <p className={styles.p}>
              Tương tự các thao tác trên, bạn sẽ tiến hành việc cài đặt hoa hồng
              kế hoạch để tạo dữ liệu cho tài khoản công ty cũng như thuận tiện
              cho việc theo dõi và quản lý sau này. Các kế hoạch được cập nhật
              sẽ được hiển thị trong bảng danh sách với các trường thông tin
              như: STT, Tên kế hoạch, Đạt KPI và Không đạt KPI.
            </p>
            <p className={styles.p}>
              Việc hiển thị danh sách theo dạng bảng sẽ giúp cho công ty dễ dàng
              theo dõi về các kế hoạch đang được triển khai, mức hoa hồng cho
              nhân viên khi đạt KPI và khi không đạt KPI ra sao. Cuối mỗi dòng
              thông tin chính là biểu tượng chỉnh sửa và xóa.{' '}
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/hhkehoach.png'} />
              <p className={styles.p_center}>Hoa hồng kế hoạch</p>
            </div>
            <p className={styles.p}>
              Khi click vào biểu tượng chiếc bút, hệ thống sẽ hiển thị biểu mẫu
              điền thông tin. tiến hành chỉnh sửa thông tin theo mong muốn và
              chọn “ Lưu” để hệ thống cập nhật thông tin mới. Còn nếu muốn xóa
              kế hoạch nào đó thì chỉ cần chọn biểu tượng thùng rác, xác nhận
              thao tác xóa và kế hoạch sẽ bị xóa khỏi danh sách cập nhật.
            </p>
            <h2 className={styles.h2}>2. Thêm nhân viên áp dụng</h2>

            <p className={styles.p}>
              Sau khi đã thiết lập và cài đặt xong các thông tin về hoa hồng cho
              các kế hoạch được thực hiện thì việc tiếp theo chính là thêm cũng
              như cập nhật các nhân viên được hưởng hoa hồng kế hoạch.
            </p>
            <p className={styles.p}>
              Để thêm nhân viên áp dụng thì các bước thực hiện như sau:
            </p>
            <p className={styles.p}>
              - Bước 1: Chọn “Nhập” nằm ở cuối ô thông tin hoa hồng kế hoạch.
              Giao diện sẽ hiển thị danh sách các nhân viên hưởng hoa hồng này.
              Để tiến hành cập nhật nhân viên thì bạn nhấp chuột vào “Thêm mới”
              ở góc trên bên phải màn hình.
            </p>
            <p className={styles.p}>
              - Bước 2: Hoàn thiện các thông tin mà biểu mẫu hiển thị yêu cầu.
            </p>
            <p className={styles.p}>+ Chọn tên nhân viên / nhóm nhân viên.</p>
            <p className={styles.p}>
              + Chọn Đánh giá: Đạt kế hoạch/ Không đạt kế hoạch.
            </p>
            <p className={styles.p}>
              + Chọn tên kế hoạch: Dựa trên dữ liệu là các kế hoạch được cập
              nhật từ trước đó.
            </p>
            <p className={styles.p}>
              + Chọn chu kỳ: Chọn thời gian tiến hành và áp dụng.
            </p>
            <p className={styles.p}>+ Ghi chú: Nhập ghi chú (nếu có).</p>
            <p className={styles.p}>
              - Bước 3: Chọn “Thêm hoa hồng” để cập nhật dữ liệu về nhân viên/
              nhóm nhân viên được hưởng hoa hồng kế hoạch.
            </p>
            <p className={styles.p}>
              Nhân viên hay nhóm nhân viên được thiết lập hưởng hoa hồng kế
              hoạch sẽ được hiển thị trong danh sách Hoa hồng cá nhân, Hoa hồng
              nhóm dựa trên hình thức được cài đặt.
            </p>
            <h2 className={styles.h2}>3. Xem danh sách nhân viên</h2>

            <p className={styles.p}>
              Danh sách hoa hồng cá nhân sẽ là danh sách các cá nhân nhân viên
              được hưởng hoa hồng kế hoạch dựa trên chỉ tiêu mà công ty đã đề
              ra. Các cá nhân sẽ được thống kê theo dạng bảng với các trường
              thông tin được xây dựng như: Họ và tên, Chu kỳ, Tên kế hoạch, Hoa
              hồng, Đánh giá.
            </p>
            <p className={styles.p}>
              Mục đánh giá sẽ thể hiện nhân viên đó đạt hay không đạt KPI với kế
              hoạch mà mình tham gia. Thông qua đánh giá sẽ xác nhận được số hoa
              hồng được thưởng mà nhân viên đó nhận được. Dựa vào việc cài đặt
              hoa hồng kế hoạch mà mỗi kế hoạch sẽ xác định được mức thưởng khác
              nhau khi đạt hay không đạt KPI.
            </p>
            <p className={styles.p}>
              Cuối mỗi thông tin của nhân viên sẽ có 2 biểu tượng. Click vào
              biểu tượng chiếc bút sẽ là chức năng chỉnh sửa thông tin. Biểu mẫu
              điền thông tin được hiện ra và bạn chỉnh sửa thông tin theo nhu
              cầu, sau đó chọn “Lưu hoa hồng” để hệ thống cập nhật thông tin
              mới. Còn khi chọn biểu tượng thùng rác thì đây sẽ là chức năng
              xóa. Bạn sẽ có thể xóa nhân viên bất kỳ khỏi danh sách này khi xác
              nhận thao tác xóa.
            </p>
            <div className={styles.img}>
              <Image alt='/' src={'/hoa-hong-ca-nhan-a.png'} />
              <p className={styles.p_center}>Hoa hồng cá nhân</p>
            </div>
            <p className={styles.p}>
              Ngay trên bảng danh sách sẽ là thanh search. Với thanh tìm kiếm
              này, bạn sẽ dễ dàng hơn trong việc lọc danh sách nhân viên hưởng
              hoa hồng kế hoạch trong một tháng cụ thể. Lựa chọn THÁNG, NĂM muốn
              xem, hệ thống sẽ hiển thị kết quả ngay bên dưới. Để xem thông tin
              của một nhân viên cụ thể thì bạn chỉ cần CHỌN hoặc NHẬP TÊN NHÂN
              VIÊN đó vào ô tìm kiếm. Kết quả sẽ được trả lại ngay sau đó.
            </p>
            <p className={styles.p}>
              Hoa hồng nhóm sẽ là list các nhóm được hưởng hoa hồng kế hoạch mà
              công ty thiết lập. Các nhóm được thống kê theo bảng với các cột
              thông tin như: Nhóm nhân viên, Chu kỳ, Tên kế hoạch, Tiền thưởng
              và Đánh giá.
            </p>
            <p className={styles.p}>
              Mục đánh giá sẽ là phần xác nhận nhóm đó đạt kế hoạch hay không
              đạt kế hoạch. Điều này sẽ ảnh hưởng trực tiếp đến tiền thưởng hoa
              hồng sau này mà cả nhóm được nhận.
            </p>
            <p className={styles.p}>
              Cuối mỗi dòng thông tin của nhóm sẽ là biểu tượng chỉnh sửa và
              biểu tượng xóa. Với thao tác chỉnh sửa, click chọn biểu tượng
              chiếc bút, hệ thống sẽ hiển thị popup điền thông tin. Tiến hành
              nhập phần trăm hoa hồng của mỗi thành viên trong nhóm, mức phần
              trăm này sẽ quyết định tới số tiền thưởng sau này. Bên cạnh đó,
              bạn có thể thực hiện việc chỉnh sửa thông tin như Tên kế hoạch và
              Đánh giá. Cuối cùng chọn “Lưu cài đặt” để hệ thống cập nhật thông
              tin mới. Việc chỉnh sửa thông tin của hoa hồng nhóm là thao tác
              bắt buộc để hệ thống có thể tính được tiền hoa hồng kế hoạch của
              từng thành viên trong nhóm.
            </p>
            <p className={styles.p}>
              Còn nếu như muốn xóa nhóm bất kỳ khỏi danh sách thì bạn chỉ cần
              nhấp chuột vào biểu tượng thùng rác, chọn “Tiếp tục”, hệ thống sẽ
              xóa thông tin nhóm đó khỏi danh sách hoa hồng kế hoạch.
            </p>
            <p className={styles.p}>
              Trong trường hợp muốn lọc hay tra cứu nhanh thì bạn có thể dùng
              thanh search được cung cấp phía bên trên. Lựa chọn THÁNG, NĂM, hệ
              thống sẽ hiển thị danh sách các nhóm được hưởng hoa hồng kế hoạch
              theo thời gian đó. Còn nếu muốn xem chi tiết của một nhóm nhất
              định thì có thể chọn hoặc nhập tên nhóm đó trong ô tìm kiếm theo
              tên nhóm.
            </p>
            <p className={styles.p}>
              Tổng hoa hồng sẽ là mục thống kê toàn bộ nhân viên được hưởng hoa
              hồng kế hoạch trong tháng nhất định. Có thể coi đây chính là danh
              sách tổng của hoa hồng cá nhân và hoa hồng nhóm. Tất cả những nhân
              viên được hưởng hoa hồng kế hoạch đều sẽ được cập nhật trong bảng
              với số tiền được hiển thị cụ thể.
            </p>

            <p className={styles.p}>
              Những cá nhân được hưởng hoa hồng kế hoạch sẽ có số tiền dựa trên
              vào đánh giá về hoàn thiện kế hoạch và mức hoa hồng được thưởng
              khi đạt KPI của một kế hoạch nhất định do công ty thiết lập.{' '}
            </p>
            <p className={styles.p}>
              Ví dụ: Nhân viên A thực hiện kế hoạch B trong tháng 10 và được
              đánh giá là đạt KPI. Công ty thiết lập kế hoạch B được thưởng 20
              triệu đồng khi đạt KPI. Vậy số tiền hoa hồng của nhân viên A sẽ là
              20 triệu đồng.
            </p>
            <p className={styles.p}>
              Những cá nhân được hưởng hoa hồng kế hoạch theo nhóm thì sẽ có số
              tiền hoa hồng nhận được dựa trên phần trăm hoa hồng của hoa hồng
              nhóm nhận được.
            </p>
            <p className={styles.p}>
              Ví dụ: Nhóm C (gồm 4 người) hoàn thành kế hoạch D trong tháng 10
              và được đánh giá là đạt KPI. Công ty thiết lập kế hoạch D khi đạt
              KPI sẽ được thưởng 30 triệu đồng. Mỗi thành viên trong nhóm có
              phần trăm hoa hồng là 10% (tùy vào mức % hoa hồng được thiết lập,
              có thể mức % giữa các thành viên khác nhau).
            </p>
            <p className={styles.p}>
              Vậy, số tiền hoa hồng kế hoạch của mỗi người là: 10%*50.000.000=
              5.000.000 đồng.
            </p>
            <p className={styles.p}>
              Những nhân viên được hưởng cả hoa hồng cá nhân và hoa hồng nhóm
              thì ở mục tổng hoa hồng sẽ hiện tổng số tiền hoa hồng kế hoạch mà
              nhân viên đó nhận được ở 2 hình thức trên.
            </p>
            <p className={styles.p}>
              Thanh search phía trên bảng danh sách sẽ giúp bạn lọc và tìm kiếm
              nhanh hơn. Lựa chọn THÁNG, NĂM, hệ thống sẽ hiển thị những nhân
              viên được hưởng hoa hồng kế hoạch trong tháng đó với tên, chu kỳ
              và tổng tiền nhận được. CHỌN hoặc NHẬP TÊN NHÂN VIÊN bất kỳ trên ô
              tìm kiếm theo tên sẽ giúp bạn tìm kiếm thông tin của nhân viên đó
              nhanh hơn trong danh sách tổng hoa hồng kế hoạch.
            </p>
            <p className={styles.p}>
              Để quay trở về danh sách cài đặt hoa hồng ban đầu thì bạn chỉ cần
              click chọn “Quay lại”, hệ thống sẽ trở về giao diện các loại hoa
              hồng.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Huongdan
