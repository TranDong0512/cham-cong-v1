import HeaderSupport from "@/components/huong-dan-camera/header";
import HuongDanCamera from "@/components/huong-dan-camera";
import Footer from "@/components/footerQLC/FooterQLC";
import Meta from "@/components/meta/meta";
import Header from "@/components/header/Header";
const canonical = "https://hungha365.com/phan-mem-cham-cong/huong-dan-camera";
const title = "Hướng dẫn cài đặt Camera chấm công nhận diện khuôn mặt AI365";
const des =
    "Giải pháp chấm công nhận diện khuôn mặt tối ưu và tiện ích nhất từ Camera AI365. Hướng dẫn chi tiết cách cài đặt Camera chấm công nhận diện khuôn mặt từ Camera AI365.";
export default function CameraSupport() {
    return (
        <Meta title={title} canonical={canonical} des={des} isSeo={true}>
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
