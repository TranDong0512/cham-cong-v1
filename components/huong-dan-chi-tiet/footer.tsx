import React, { useState } from "react";
import styles from "./footer.module.scss";
import { Button, Image } from "antd";
import Link from "next/link";
export default function TableOfContents() {
    const [openDropDown, setOpenDropDown] = useState(true);
    const [extend, setExtend] = useState(false);
    return (
        <div className={styles.tableofcontents}>
            <div className={styles.left}>
                <img
                    src="../img/table_of_contents.png"
                    alt="hungha365"
                    className={styles.img_than_1024}
                />
                <img
                    src="../img/table_of_contents_1024.png"
                    alt="hungha365"
                    style={{ display: "none" }}
                    className={styles.img_1024}
                />
                <img
                    src="../img/table_of_contents_768.png"
                    alt="hungha365"
                    style={{ display: "none" }}
                    className={styles.img_768}
                />
                <img
                    src="../img/table_of_contents_414.png"
                    alt="hungha365"
                    style={{ display: "none" }}
                    className={styles.img_414}
                />
                <div className="cursor-pointer">
                    <div className={styles.item}>
                        <div className={styles.item_img}>
                            <img
                                src="../img/arrow-square-down.png"
                                alt="hungha365"
                            />
                        </div>
                        <div className={styles.text}>
                            <a
                                style={{
                                    color: "#000",
                                }}
                                href="#h1"
                            >
                                1. Tại sao nên sử dụng hình thức chấm công nhận
                                diện khuôn mặt?
                            </a>
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer">
                    <div className={styles.item}>
                        <div className={styles.item_img}>
                            <img
                                src="../img/arrow-square-down.png"
                                alt="hungha365"
                            />
                        </div>
                        <div className={styles.text}>
                            <a
                                style={{
                                    color: "#000",
                                }}
                                href="#h2"
                            >
                                2. Giải pháp chấm công nhận diện khuôn mặt tối
                                ưu từ Camera AI365
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div
                        className={styles.item_img}
                        onClick={() => setOpenDropDown(!openDropDown)}
                    >
                        {openDropDown ? (
                            <img
                                src="../img/arrow-square-down_2.png"
                                alt="hungha365"
                            />
                        ) : (
                            <img
                                src="../img/arrow-square-down_3.png"
                                alt="hungha365"
                            />
                        )}
                    </div>
                    <div className="cursor-pointer">
                        <div
                            className={styles.text}
                            style={{
                                color: openDropDown ? "#4C5BD4" : "#474747",
                            }}
                        >
                            <a
                                style={{
                                    color: "#000",
                                }}
                                href="#h3"
                            >
                                3. Hướng dẫn cài đặt chấm công bằng Camera AI365
                            </a>
                        </div>
                    </div>
                </div>
                {openDropDown && (
                    <div
                        style={{
                            marginLeft: "8px",
                        }}
                    >
                        <div className={styles.item}>
                            <div className={styles.item_img}>
                                <img
                                    src="../img/arrow-square-down.png"
                                    alt="hungha365"
                                />
                            </div>
                            <div className={styles.text}>
                                3.1 Mua Camera AI365 ở đâu?.
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item_img}>
                                <img
                                    src="../img/arrow-square-down.png"
                                    alt="hungha365"
                                />
                            </div>
                            <div className={styles.text}>
                                3.2 Hướng dẫn cài đặt Camera AI365
                            </div>
                        </div>
                    </div>
                )}
                <div className="cursor-pointer">
                    <div className={styles.item}>
                        <div className={styles.item_img}>
                            <img
                                src="../img/arrow-square-down.png"
                                alt="hungha365"
                            />
                        </div>
                        <div className={styles.text}>
                            <a
                                style={{
                                    color: "#000",
                                }}
                                href="#h4"
                            >
                                4. Lưu ý khi cài đặt chấm công bằng Camera AI365
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right_wrap}>
                <div
                    className={
                        extend
                            ? styles.right
                            : `${styles.right} ${styles.active}`
                    }
                >
                    <div className={styles.top}>
                        <div className={styles.fl}>
                            <span>
                                Ngày nay ứng dụng máy chấm công nhận diện khuôn
                                mặt trở thành một xu hướng thị trường đang phát
                                triển mạnh mẽ. So với các hình thức chấm công
                                truyền thống như ghi chép, vân tay, …, chấm công
                                bằng nhận diện khuôn mặt đại diện cho một sự
                                tiến bộ lớn trong việc kiểm soát quy trình vào
                                ra và đảm bảo tính bảo mật cho doanh nghiệp. Tuy
                                nhiên đó chưa phải là giới hạn cuối cùng, với sự
                                nỗ lực không ngừng nghỉ của những bộ óc sáng
                                tạo, đội ngũ hungha365.com đã đưa nền công nghệ
                                này lên một bước tiến mới đỉnh cao mang tên
                                "Camera chấm công nhận diện khuôn mặt AI365".
                                Với sản phẩm công nghệ được đánh giá là “đi
                                trước thời đại” này, hungha365.com tự hào là nhà
                                cung cấp giải pháp toàn diện cho hệ thống quản
                                lý doanh nghiệp, hỗ trợ đắc lực cho doanh nghiệp
                                tối ưu hiệu quả công tác quản lý công, lương
                                chính xác tuyệt đối.
                            </span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h2 id="h1">
                                1. Tại sao nên sử dụng hình thức chấm công nhận
                                diện khuôn mặt?
                            </h2>
                        </div>
                        <div className={styles.desc}>
                            <div className={styles.fl}>
                                <span>
                                    Việc sử dụng hình thức chấm công nhận diện
                                    khuôn mặt là một ứng dụng tiên tiến trong
                                    lĩnh vực quản lý chấm công, và nó đem lại
                                    nhiều lợi ích quan trọng. Trong các phương
                                    pháp sinh trắc học dùng để định danh người
                                    dùng, bao gồm vân tay, mống mắt và gương
                                    mặt, chấm công bằng nhận diện gương mặt đang
                                    được coi là một trong những phương pháp hiện
                                    đại và hiệu quả nhất.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Nguyên tắc hoạt động của giải pháp chấm công
                                    nhận diện khuôn mặt là khá đơn giản. Mỗi
                                    nhân viên cần đăng ký hình ảnh khuôn mặt của
                                    họ vào hệ thống. Khi họ thực hiện việc chấm
                                    công, phần mềm sẽ tự động so sánh hình ảnh
                                    khuôn mặt này với dữ liệu trong máy chủ, sử
                                    dụng các thiết bị như máy chấm công nhận
                                    diện gương mặt, Face ID trên điện thoại hoặc
                                    camera AI. Kết quả, hoạt động chấm công được
                                    thực hiện một cách tự động và nhanh chóng.
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd1.jpg"
                                    alt="hungha365.com"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    So với các thiết bị chấm công truyền thống,
                                    giải pháp chấm công bằng nhận diện gương mặt
                                    có tính bảo mật và chính xác cao hơn nhiều.
                                    Máy chỉ nhận diện cho những người đã được
                                    đăng ký trong hệ thống, và khuôn mặt là một
                                    đặc điểm biometric khó có thể bị làm giả.
                                    Điều này giúp nâng cao mức độ an toàn và
                                    đáng tin cậy trong việc quản lý thời gian
                                    làm việc của nhân viên.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    {" "}
                                    Ngoài ra, giải pháp chấm công nhận diện
                                    khuôn mặt còn giúp giảm bớt nhiều phiền toái
                                    mà nhân viên thường gặp phải khi sử dụng các
                                    thiết bị chấm công truyền thống. Không còn
                                    tình trạng mất thẻ, thẻ chấm công hỏng hoặc
                                    bị mờ xước, chip từ bị ảnh hưởng bởi nước,
                                    hoặc vân tay bị xước hoặc bẩn. Đơn giản chỉ
                                    cần đưa khuôn mặt vào phạm vi camera của máy
                                    chấm công, và thiết bị sẽ nhanh chóng nhận
                                    diện và xác nhận thông tin chấm công. Điều
                                    này giúp tối ưu hóa quá trình chấm công và
                                    tạo điều kiện thuận lợi cho cả nhân viên và
                                    người quản lý.
                                </span>
                            </div>{" "}
                        </div>
                        <div className={styles.title}>
                            <h2 id="h2">
                                2. Một số lợi ích hệ thống chuyển đổi số AI365.
                            </h2>
                        </div>
                        <div className={styles.desc}>
                            <div className={styles.fl}>
                                <span>
                                    Hòa mình vào cuộc cách mạng công nghệ, hệ
                                    sinh thái hungha365 không giới hạn mình
                                    trong bất kỳ lĩnh vực cụ thể nào. Ngoài việc
                                    tập trung vào lĩnh vực tuyển dụng và việc
                                    làm trực tuyến, hungha365 đã mang đến một
                                    diện mạo mới cho doanh nghiệp bằng việc cung
                                    cấp một giải pháp toàn diện cho vận hành và
                                    quản trị doanh nghiệp.
                                </span>
                            </div>{" "}
                            <div className={styles.fl}>
                                <span>
                                    Hướng đến hàng ngàn doanh nghiệp, từ những
                                    tên tuổi lớn đến những doanh nghiệp nhỏ,
                                    hoạt động trong nhiều lĩnh vực khác nhau
                                    trên thị trường, chúng tôi đã xây dựng và
                                    phát triển một hệ thống chấm công đột phá,
                                    với những tính năng ưu việt và hiện đại đến
                                    từ Camera AI365. Điều này đã loại bỏ hoàn
                                    toàn những rào cản truyền thống trong việc
                                    quản lý thời gian làm việc của nhân viên.
                                </span>
                            </div>{" "}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd2.jpg"
                                    alt="Camera AI365 được xây dựng và phát triển bởi hungha365"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Với sự ra đời của Camera AI365, quá trình
                                    chấm công đã được tinh chỉnh một cách hiệu
                                    quả hơn bao giờ hết. Không còn giới hạn về
                                    số lượng người cùng chấm công, chỉ cần khuôn
                                    mặt của bạn xuất hiện trong trường quay của
                                    Camera AI365, bạn sẽ được ghi nhận công ngay
                                    lập tức, không mất thêm bất cứ thao tác gì.
                                    Điều này giúp gia tăng tốc độ chấm công và
                                    tối ưu hóa thời gian làm việc của mọi người.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Không còn tình trạng xếp hàng dài chờ đợi.
                                    Thay vào đó, nhân viên có thể được chấm công
                                    nhanh chóng, và doanh nghiệp có khả năng dễ
                                    dàng quản lý thời gian làm việc của nhân sự.
                                    Tất cả điều này mang lại lợi ích lớn cho
                                    hiệu suất công việc và quản trị tổ chức.
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd3.jpg"
                                    alt="Camera AI365 được xây dựng và phát triển bởi hungha365"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Ngoài ra, một điểm đặc biệt đến từ Camera
                                    AI365 đó chính là việc tối ưu các thao tác
                                    cài đặt và tạo ra một nhận diện hoàn toàn
                                    mới khi chấm công. Camera AI365 sẽ phối hợp
                                    trực tiếp với hệ thống chấm công trên máy
                                    tính. Bạn chỉ cần kết nối Camera AI365 với
                                    dây mạng, dây nguồn và đăng nhập tài khoản
                                    công ty, hệ thống sẽ tự động kết nối vào loa
                                    của máy tính. Khi Camera AI365 quét khuôn
                                    mặt nhân viên, hệ thống sẽ tự động nhận diện
                                    tên nhân viên lên màn hình máy tính và đọc
                                    tên nhân viên trên loa. Đây là một giải pháp
                                    hỗ trợ tiện ích tối ưu giúp cho việc chấm
                                    công trở nên tiện lợi và nhanh chóng, một
                                    điểm tiện ích bổ sung so với các dòng chấm
                                    công nhận diện khuôn mặt khác.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Khi bạn áp dụng Camera AI365 để thực hiện
                                    việc chấm công trong doanh nghiệp của mình,
                                    điều này đồng nghĩa với việc bạn đang tạo ra
                                    một sự thay đổi vĩnh viễn trong cách nhân
                                    viên của bạn ghi nhận thời gian làm việc.
                                    Điều này có nghĩa rằng, nhân viên không cần
                                    phải nhớ hoặc lo lắng về việc thực hiện quy
                                    trình chấm công hàng ngày, vì từ nay, quá
                                    trình này sẽ hoàn toàn tự động.
                                </span>
                            </div>
                        </div>
                        <div className={styles.title}>
                            <h2 id="h3">
                                3. Hướng dẫn cài đặt chấm công bằng Camera AI365
                            </h2>
                        </div>

                        <h3 className={styles.text_header}>
                            3.1. Mua Camera AI365 ở đâu?
                        </h3>
                        <div className={styles.desc}>
                            <div className={styles.fl}>
                                <span>
                                    Quý khách hàng có thể lựa chọn giải pháp phù
                                    hợp với nhu cầu của mình khi sử dụng sản
                                    phẩm camera của chúng tôi.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Nếu quý khách hàng đã sở hữu một chiếc
                                    camera, bạn có thể dễ dàng tích hợp công
                                    nghệ AI365 của chúng tôi vào hệ thống của
                                    mình. Sau khi mua camera, bạn chỉ cần liên
                                    hệ với chúng tôi thông qua tài khoản HHP
                                    trên ứng dụng chat365 để được hướng dẫn cụ
                                    thể về cách tích hợp AI365. Chúng tôi hỗ trợ
                                    tích hợp AI365 cho nhiều loại camera hỗ trợ
                                    phát qua phương thức RTSP, chẳng hạn như
                                    EZVIZ C6W và nhiều loại khác. Điều này giúp
                                    bạn tận dụng được tiềm năng tối ưu từ camera
                                    của mình với công nghệ AI tiên tiến.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Nếu bạn muốn tiết kiệm thời gian và công
                                    sức, bạn cũng có thể mua trực tiếp các sản
                                    phẩm camera AI365 của chúng tôi. Chỉ cần
                                    cung cấp địa chỉ wifi của công ty, chúng tôi
                                    sẽ đảm bảo rằng camera của bạn sẽ được kết
                                    nối và hoạt động một cách chính xác.
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd4.jpg"
                                    alt="Mua camera AI365 ở đâu?"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Chúng tôi cung cấp thông tin chi tiết về sản
                                    phẩm camera, bao gồm hình ảnh và giá cả, để
                                    bạn dễ dàng lựa chọn. Quý khách hàng có thể
                                    mua sản phẩm trực tuyến và sử dụng dịch vụ
                                    chuyển phát nhanh hoặc đến trực tiếp văn
                                    phòng của chúng tôi tại địa chỉ: Số 1 Đường
                                    Trần Nguyên Đán, KĐT Định Công, Hoàng Mai,
                                    Hà Nội.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Liên hệ với chúng tôi thông qua tài khoản
                                    HHP trên ứng dụng chat365 để biết thêm chi
                                    tiết và hỗ trợ tốt nhất cho nhu cầu của bạn.
                                    Chúng tôi luôn sẵn sàng để đáp ứng và hỗ trợ
                                    quý khách hàng một cách tận tâm.
                                </span>
                            </div>
                        </div>

                        <h3 className={styles.text_header}>
                            3.2. Hướng dẫn cài đặt Camera AI365
                        </h3>
                        <div className={styles.desc}>
                            <div className={styles.fl}>
                                <span>
                                    Để cài đặt Camera AI365 cho doanh nghiệp của
                                    bạn, bạn cần thực hiện một loạt các bước
                                    quan trọng sau đây.
                                </span>
                            </div>

                            <div className={styles.fl}>
                                <span>
                                    Bước 1: Cài đặt wifi cho tiện ích chấm công
                                    Camera AI365. Dưới đây là hướng dẫn chi
                                    tiết: Trước hết, truy cập trang web chính
                                    thức của hungha365.com để đăng ký tài khoản
                                    công ty của bạn. Nếu bạn đã có tài khoản
                                    công ty trên trang web này, bạn có thể tiến
                                    hành cài đặt wifi của doanh nghiệp bạn ngay
                                    lập tức.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Bước tiếp theo là vào mục "chamcong" trên
                                    trang web hungha365.com, nơi bạn sẽ tìm thấy
                                    phần cài đặt wifi. Nhấp vào phần này để bắt
                                    đầu quá trình cài đặt.
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd5.jpg"
                                    alt=" Phần cài đặt wifi trong mục chấm công"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Sau đó, bạn cần nhấn vào tùy chọn "IP”. Khi
                                    bạn thực hiện điều này, hệ thống sẽ hiển thị
                                    chi tiết về hộp tên IP và địa chỉ IP.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Cuối cùng, nhập địa chỉ IP của mạng công ty
                                    của bạn vào hộp thích hợp.
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd6.jpg"
                                    alt="Nhập địa chỉ IP vào hộp thông tin thích hợp"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Nhớ kiểm tra kỹ các thông tin và đảm bảo
                                    rằng bạn đã nhập chính xác địa chỉ IP của
                                    mạng. Sau khi hoàn tất các bước này, bạn sẽ
                                    đã cài đặt wifi thành công cho tiện ích chấm
                                    công Camera AI365 trong doanh nghiệp của
                                    bạn.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Bước 2: Cài đặt tiện ích Camera AI365 trên
                                    máy tính của bạn.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Đầu tiên, hãy tải ứng dụng Chamcong 365 hoặc
                                    Chat365 vào máy tính của bạn. Mục tiêu của
                                    bạn ở đây là truy cập vào công cụ chấm công.
                                    Nếu bạn chọn tải ứng dụng Chat365, công cụ
                                    chấm công sẽ được tích hợp sẵn trong ứng
                                    dụng này.
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd7.jpg"
                                    alt="Tải ứng dụng, phần mềm hỗ trợ công cụ chấm công"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Sau khi đã tải ứng dụng về máy, hãy mở ứng
                                    dụng và thực hiện đăng ký hoặc đăng nhập vào
                                    tài khoản công ty của bạn.
                                </span>
                            </div>
                            <div className={styles.fl}>
                                <span>
                                    Tiếp theo, bạn sẽ thấy một màn hình xuất
                                    hiện với một URL. Tại đây, bạn sẽ cần nhập
                                    địa chỉ RTSP theo công thức sau:
                                    rtsp://[tên]:[mật khẩu]@[địa chỉ IP của
                                    camera]:[port]/ Sau khi đã nhập thông tin
                                    đúng, hãy nhấn vào nút "Connect" để bắt đầu
                                    quá trình chấm công. Điều này sẽ giúp bạn
                                    truy cập vào hệ thống chấm công và sử dụng
                                    tiện ích Camera AI365 trên máy tính của mình
                                    một cách dễ dàng.
                                </span>
                            </div>
                        </div>
                        <div className={styles.title}>
                            <h2 id="h4">
                                4. Lưu ý khi cài đặt chấm công bằng Camera
                                AI365.
                            </h2>
                        </div>

                        <div className={styles.desc}>
                            <div className={styles.tl}>
                                <span>
                                    Quý khách hàng nên lưu ý rằng khi mua sản
                                    phẩm EZVIZ C6W, có sẵn hai phương thức để
                                    tùy chỉnh và sử dụng các tính năng của
                                    camera này. Quý khách có thể tải và cài đặt
                                    phần mềm EZVIZ PC Studio Software trên máy
                                    tính cá nhân (PC) hoặc tải ứng dụng EZVIZ
                                    trên App Store để sử dụng trên điện thoại di
                                    động (Mobile).
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd8.jpg"
                                    alt="Sản phẩm camera  EZVIZ C6W"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.tl}>
                                <span>
                                    Trường hợp quý khách sử dụng các sản phẩm
                                    khác, chúng tôi khuyến nghị quý khách tham
                                    khảo hướng dẫn từ nhà sản xuất hoặc liên hệ
                                    với chúng tôi thông qua ứng dụng chat365 để
                                    nhận được sự hỗ trợ cụ thể. Chúng tôi luôn
                                    sẵn sàng đưa ra các gợi ý phù hợp với nhu
                                    cầu của quý khách.
                                </span>
                            </div>
                            <div className={styles.tl}>
                                <span>
                                    Nếu quý khách có nhu cầu xem camera từ xa,
                                    quý khách nên liên hệ trực tiếp với chúng
                                    tôi để chúng tôi có thể hỗ trợ quý khách cấu
                                    hình và thiết lập. Điều này đặc biệt quan
                                    trọng để đảm bảo rằng quý khách có thể sử
                                    dụng camera một cách hiệu quả và an toàn.
                                </span>
                            </div>
                            <div className={styles.tl}>
                                <span>
                                    Để đảm bảo quá trình chấm công diễn ra suôn
                                    sẻ và không gặp khó khăn, chúng tôi luôn cố
                                    gắng đảm bảo rằng máy tính sử dụng để chấm
                                    công và camera là hai thành phần hoàn hảo
                                    kết hợp với nhau. Tuy nhiên, đôi khi có thể
                                    xảy ra tình huống mà nguồn mạng giữa chúng
                                    không tương thích, gây ra sự cố trong quá
                                    trình chấm công.
                                </span>
                            </div>
                            <div className={styles.tl}>
                                <span>
                                    Để khắc phục vấn đề này, chúng tôi đã phát
                                    triển các giải pháp linh hoạt. Chúng tôi sẽ
                                    làm việc với nhà cung cấp dịch vụ mạng của
                                    quý khách, để đảm bảo rằng cả hai công cụ
                                    chấm công có thể hoạt động cùng nhau hiệu
                                    quả, tránh gây ra sự cố và gián đoạn không
                                    mong muốn trong quá trình chấm công của quý
                                    khách. Chúng tôi cam kết luôn đặt sự thuận
                                    tiện và hiệu quả của quý khách hàng lên hàng
                                    đầu và sẽ cố gắng để giải quyết mọi vấn đề
                                    liên quan đến chấm công.
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "16px 0",
                                }}
                            >
                                <Image
                                    src="/alert/hd9.jpg"
                                    alt="Hungha365 luôn đảm bảo sản phẩm đạt hiệu quả tuyệt đối"
                                    preview={false}
                                />
                            </div>
                            <div className={styles.tl}>
                                <span>
                                    Chúng tôi sẽ thực hiện quy trình này thông
                                    qua ứng dụng UltraViewer để đảm bảo tính
                                    hiệu quả và đáng tin cậy trong việc kết nối
                                    từ xa. Điều này đảm bảo rằng chúng tôi có
                                    thể duyệt qua quá trình một cách suôn sẻ và
                                    hiệu quả mà không gặp phải bất kỳ sự cản trở
                                    nào.
                                </span>
                            </div>
                            <div className={styles.tl}>
                                <span>
                                    Nhìn chung, sự kết hợp giữa công nghệ nhận
                                    diện khuôn mặt và trí tuệ nhân tạo trong
                                    Camera chấm công nhận diện khuôn mặt AI365
                                    hứa hẹn là một cách tiếp cận hiện đại và
                                    đáng tin cậy để giúp doanh nghiệp quản lý và
                                    kiểm soát nhân viên một cách hiệu quả và
                                    thông minh hơn. Điều này đồng nghĩa với việc
                                    tạo ra một hệ sinh thái quản trị vượt trội
                                    giúp doanh nghiệp phát triển và thịnh vượng
                                    trong thời đại số hóa ngày nay.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "24px",
                    }}
                >
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => {
                            setExtend(!extend);
                        }}
                    >
                        <span
                            style={{
                                color: "#fff",
                            }}
                        >
                            Xem thêm
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
