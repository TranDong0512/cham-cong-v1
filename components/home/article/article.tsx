import React, { useRef } from "react";
import styles from "./article.module.css";
import { Button, Image } from "antd";
import TilteBlog from "./title";
import ParagraphBlog from "./paragrap";
import Link from "next/link";

export default function Article({
    className,
    showMore,
    setShowmore,
}: {
    className: string;
    showMore: boolean;
    setShowmore: any;
}) {
    const title = (
        <h2 id="h1">
            Hướng dẫn sử dụng phần mềm chấm công bằng{" "}
            <Link href="/huong-dan-camera" className={styles.link}>
                camera AI365
            </Link>{" "}
            và app chat365
        </h2>
    );

    const paragraph = [
        {
            h2: (
                <h3>
                    1. Khách hàng chấm công qua{" "}
                    <Link href="/huong-dan-camera" className={styles.link}>
                        Camera AI365
                    </Link>{" "}
                    nhận diện khuôn mặt hoặc chấm công qua app chat365 (nhân
                    viên tải app chat365 về và chấm công tại mục tiện ích của
                    app)
                </h3>
            ),
            children: [
                {
                    p: (
                        <span>
                            + Hướng dẫn sử dụng chấm công bằng Camera AI365:
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                Tại đây
                            </Link>
                        </span>
                    ),
                },
                {
                    p: <span>+ Link tải app chat365: </span>,
                },
                {
                    img: (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "16px 0",
                                gap: "16px",
                            }}
                        >
                            <Link href="https://apps.apple.com/us/app/chat365-nh%E1%BA%AFn-tin-nhanh-ch%C3%B3ng/id1623353330 ">
                                <Image
                                    src="/mac.png"
                                    alt="Camera AI365 "
                                    preview={false}
                                />
                            </Link>
                            <Link href="https://play.google.com/store/apps/details?id=vn.timviec365.chat_365&hl=en_US">
                                <Image
                                    src="/window.png"
                                    alt="Camera AI365 "
                                    preview={false}
                                />
                            </Link>
                        </div>
                    ),
                },
                {
                    p: (
                        <span>
                            Cuộc cách mạng công nghệ đã mang đến cho nhân loại
                            một trí tuệ nhân tạo vượt thời gian và mọi giới hạn.
                            Đến nay AI đã được con người ứng dụng thành công vào
                            rất nhiều lĩnh vực trong đó có hoạt động chấm công.
                            Trong cuộc chạy đua công nghệ này, AI365 do đội ngũ
                            Hungha365.com phát triển chính là một sản phẩm công
                            nghệ đỉnh cao, dẫn đầu xu thế chấm công bằng AI.
                            Không chỉ phát triển một mà việc chấm công bằng
                            AI365 còn được ứng dụng qua 2 hình thức đó là chấm
                            công bằng{" "}
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                camera AI365
                            </Link>{" "}
                            và chấm công qua chat365. Cùng chúng tôi theo dõi
                            xem điều tuyệt vời nào mà Hungha365.com gửi đến cho
                            bạn qua hai hình thức chấm công này nhé.
                        </span>
                    ),
                },
            ],
        },
        {
            h2: (
                <h3>
                    2. Cuộc đột phá công nghệ với{" "}
                    <Link href="/huong-dan-camera" className={styles.link}>
                        Camera AI365
                    </Link>
                </h3>
            ),
            children: [
                {
                    p: (
                        <span>
                            Sự phát triển của nhân loại được đánh dấu chính xác
                            qua từng bước đi của công nghệ. Nhiều cuộc cách mạng
                            công nghệ đã bùng nổ để đạt tới thời kỳ phát triển
                            cực thịnh như hiện nay, ghi dấu bằng việc cho ra đời
                            bộ óc nhân tạo siêu trí tuệ để cải tiến công sức lao
                            động cho con người.
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Thừa nhận rằng AI đã có mặt ở rất nhiều lĩnh vực lớn
                            và đem lại các kết quả đáng kinh ngạc nhưng không ai
                            có thể ngờ tới rằng AI365 cũng được hình thành để
                            ứng dụng trực tiếp cho một lĩnh vực cực kỳ cần thiết
                            mà không mấy nhà đầu tư, phát triển có thể nghĩ đến
                            - chấm công và ứng dụng{" "}
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                camera AI365
                            </Link>{" "}
                            - chấm công nhận diện khuôn mặt đã ra đời trong sự
                            nỗ lực không ngừng nghỉ của đội ngũ Hungha365.com.
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Không phải là đơn vị duy nhất nghiên cứu và phát
                            triển sản phẩm công nghệ chấm công thông minh nhưng
                            Hungha365.com là đơn vị có được thành quả bứt phá
                            nhất. Với{" "}
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                camera AI365
                            </Link>{" "}
                            , các quy trình chấm công thô sơ, phức tạp đã bị
                            loại bỏ hoàn toàn. Tham vọng về một ứng dụng ghi
                            hình và chấm công khi nhân viên chỉ cần đi ngang qua
                            camera của đội ngũ đã trở thành hiện thực, cho kết
                            quả chấm công cực kỳ nhanh nhạy, dữ liệu chấm công
                            cũng ngay lập tức được chuyển tới phần mềm Tính
                            lương.
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Với cơ chế này, việc chấm công chỉ diễn ra trong một
                            giây, chấm dứt được tình trạng nhân viên phải xếp
                            hàng chờ chấm công rất lâu, đồng thời cũng hạn chế
                            rủi ro dễ thấy từ các ứng dụng, phương thức chấm
                            công thông thường, chẳng hạn như nhầm công, chấm
                            thiếu công ở hình thức chấm công qua ghi chép sổ
                            sách; chấm công không nhận diện được vân tay do máy
                            chấm công vân tay bị lỗi, nguy cơ chấm công muộn nếu
                            máy chấm công gặp trục trặc để lại rất nhiều phức
                            tạp cho khâu hậu xử lý.
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Bên cạnh khả năng chấm công siêu nhanh,{" "}
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                camera AI365
                            </Link>{" "}
                            còn phát triển tính năng cực kỳ thú vị - truyền dữ
                            liệu khuôn mặt chấm công thành giọng nói. Hệ thống
                            chấm công đã cập nhật khuôn mặt của từng tài khoản
                            nhân viên, sau đó nhân viên chấm công tại camera
                            AI365, dữ liệu khuôn mặt được ghi nhận để tính lương
                            và đồng thời tên của nhân viên cũng được đọc để xác
                            nhận đã chấm công thành công. Hungha365.com chính là
                            đơn vị đầu tiên xây dựng được mô hình này.
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Ngoài ra, người dùng cũng có sự lựa chọn thứ hai để
                            chấm công tiện ích, đó chính là hình thức chấm công
                            qua App Chat365.
                        </span>
                    ),
                },
            ],
        },
        {
            h2: <h3>3. Chấm công khuôn mặt siêu tiện ích qua Chat365</h3>,
            children: [
                {
                    p: (
                        <span>
                            Xưa nay, hoạt động chấm công tính lương tại các
                            doanh nghiệp vốn được coi là khâu cồng kềnh và phải
                            mất nhiều thời gian để xử lý. Không bằng lòng với
                            điều bị coi là hiển nhiên đó, Hungha365.com đã bắt
                            tay vào nghiên cứu nhiều các ứng dụng khác nhau để
                            phục vụ tối ưu quy trình chấm công - tính lương.
                            Cùng với{" "}
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                camera AI365
                            </Link>{" "}
                            , chúng tôi cung cấp đến người dùng một ứng dụng thứ
                            hai có chức năng tương tự - chấm công bằng nhận diện
                            khuôn mặt, đó chính là tiện ích Chấm công qua
                            chat365.
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Việc cài đặt chấm công cực kỳ đơn giản, doanh nghiệp
                            sẽ tạo tài khoản trên hệ sinh thái Hungha365.com.
                            Toàn bộ nhân viên tạo tài khoản nhân viên theo địa
                            chỉ ID của doanh nghiệp. Mỗi tài khoản này đều sẽ
                            được đồng bộ với tài khoản chat365.
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Doanh nghiệp hướng dẫn nhân viên tải app chat365
                            trên cả 2 nền tảng về máy theo đường dẫn:,
                        </span>
                    ),
                },
                {
                    img: (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "16px 0",
                                gap: "16px",
                            }}
                        >
                            <Link href="https://apps.apple.com/us/app/chat365-nh%E1%BA%AFn-tin-nhanh-ch%C3%B3ng/id1623353330 ">
                                <Image
                                    src="/mac.png"
                                    alt="Camera AI365 "
                                    preview={false}
                                />
                            </Link>
                            <Link href="https://play.google.com/store/apps/details?id=vn.timviec365.chat_365&hl=en_US">
                                <Image
                                    src="/window.png"
                                    alt="Camera AI365 "
                                    preview={false}
                                />
                            </Link>
                        </div>
                    ),
                },
                {
                    p: (
                        <span>
                            Sau khi đăng nhập, nhân viên chỉ việc truy cập vào
                            mục tiện ích của app chat365, chọn tiện ích chấm
                            công để tiến hành chấm công. ,
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Việc chấm công nhận diện khuôn mặt trên app chat365
                            cũng được diễn ra cực kỳ nhanh chóng. AI365 được ứng
                            dụng vào tiện ích này với cơ chế chống chấm công giả
                            mạo khuôn mặt, bắt buộc phải là người dùng thật chấm
                            công và đúng khuôn mặt đã được cập nhật dữ liệu
                            trong tài khoản mới chấm được công. ,
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Ở phía nhân viên, tiện ích chấm công này đảm bảo mỗi
                            nhân viên có thể tự chủ động chấm công trên máy cá
                            nhân của mình mà không cần phải xếp hàng chờ đợi như
                            hình thức chấm công vân tay, dữ liệu chấm công được
                            ghi nhận chính xác, đem đến sự yên tâm trong việc
                            kiểm soát công lương.,
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            Còn về phía công ty, sử dụng tiện ích chấm công trên
                            chat365 sẽ giúp công ty kiểm soát được tất cả các
                            trường hợp cố ý chấm công gian lận như giả mạo khuôn
                            mặt. Việc kiểm soát giờ chấm công vào và chấm công
                            ra của nhân viên cực kỳ nghiêm ngặt do hệ thống cho
                            phép tài khoản công ty có thể cài đặt giới hạn địa
                            chỉ IP, chống tình trạng nhân viên có thể chấm công
                            từ xa.
                        </span>
                    ),
                },
            ],
        },
        {
            h2: (
                <h3>
                    4. Lợi ích thiết thực đến từ{" "}
                    <Link href="/huong-dan-camera" className={styles.link}>
                        Camera AI365
                    </Link>
                </h3>
            ),
            children: [
                {
                    p: (
                        <span>
                            Sự lựa chọn thông minh sẽ tạo ra quy trình thông
                            minh và kết quả hơn mong đợi. Điều đó đúng với các
                            doanh nghiệp khi chọn sử dụng ứng dụng{" "}
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                camera AI365
                            </Link>{" "}
                            . Dù chấm công bằng hình thức nào thì người dùng vẫn
                            sẽ nhận được trọn vẹn những lợi ích sau đây:
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            - Kiểm soát và quản lý ra vào tại các cổng Kiểm soát{" "}
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            - Quản lý chấm công và quản lý danh sách nhân viên
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            - Nhận diện tự động xác thực thông tin, lưu trữ dữ
                            liệu trên hệ thống
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            - Hỗ trợ tính năng cảnh báo, đảm bảo an toàn an ninh{" "}
                        </span>
                    ),
                },
                {
                    p: (
                        <span>
                            - Tổng hợp, thống kê báo cáo theo thời gian thực
                        </span>
                    ),
                },
                {
                    p: <span>- Hỗ trợ tính năng đăng ký từ xa</span>,
                },
                {
                    p: (
                        <span>
                            - Đảm bảo tính linh hoạt, khả năng tích hợp các phần
                            mềm quản lý khác{" "}
                        </span>
                    ),
                },
                {
                    p: (
                        <span style={{ fontSize: "18px" }}>
                            Nếu doanh nghiệp của bạn vẫn đang loay hoay tìm kiếm
                            công nghệ thích hợp để ứng dụng vào hoạt động chấm
                            công của công ty thì Chấm công bằng AI365 tại
                            Hungha365.com sẽ là lựa chọn tuyệt vời nhất. Bạn có
                            thể chọn một trong hai hình thức{" "}
                            <Link
                                href="/huong-dan-camera"
                                className={styles.link}
                            >
                                camera AI365
                            </Link>{" "}
                            hoặc tiện ích chấm công tại app Chat365 hoặc kết hợp
                            cả hai tùy theo chế độ cài đặt và nhu cầu sử dụng
                            của doanh nghiệp. Hungha365 hứa hẹn sẽ tiếp tục cải
                            tiến ứng dụng để đạt tới những tiện ích tuyệt vời
                            hơn nữa, xứng đáng trở thành đối tác tin cậy của bạn
                            và là đơn vị cung cấp phần mềm số 1 Việt Nam trong
                            lĩnh vực chấm công.{" "}
                        </span>
                    ),
                },
            ],
        },
    ];
    return (
        <div
            className={className}
            style={{
                height: `${showMore ? "max-content" : "1600px"}`,
                overflow: "hidden",

            }}
        >
            <TilteBlog title={title} />

            <div className="fix-font-size-cc">
                <ParagraphBlog paragraph={paragraph} />

            </div>

        </div>
    );
}
