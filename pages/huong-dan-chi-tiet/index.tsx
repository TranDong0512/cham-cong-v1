import HeaderSupport from "@/components/huong-dan-chi-tiet/header";
import HuongDanCamera from "@/components/huong-dan-chi-tiet";
import Footer from "@/components/footerQLC/FooterQLC";
import Meta from "@/components/meta/meta";
import Header from "@/components/header/Header";
const canonical = "https://hungha365.com/phan-mem-cham-cong/huong-dan-chi-tiet";
const title = "Giúp bạn tự cài đặt Camera AI365 chấm công nhanh chóng";
const des =
    "Hướng dẫn tùy chỉnh và sử dụng tính năng trên camera EZVIZ C6W và các sản phẩm tương tự. Cung cấp hướng dẫn cài đặt cấu hình cho Camera AI365 để tối ưu hóa chức năng chấm công.";
export default function CameraDetailSupport() {
    return (
        <Meta canonical={canonical} title={title} des={des} isSeo={true}>
            <div
                style={{
                    backgroundColor: "#F8F8FF",
                }}
            >
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        zIndex: "99999",
                    }}
                >
                    <Header />
                </div>
                <div
                    style={{
                        marginTop: "80px",
                    }}
                >
                    <HuongDanCamera />
                </div>
                <Footer />
            </div>
        </Meta>
    );
}
