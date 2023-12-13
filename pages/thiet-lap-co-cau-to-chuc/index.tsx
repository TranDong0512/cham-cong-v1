import ThietLapCoCauToChuc from "@/components/thiet-lap-cong-ty/thiet-lap-ct-pb/thiet-lap-co-cau-to-chuc";
import { Card } from "antd";

export default function TLCCTC() {
  return (
    <>
      <Card>
      <h2 style={{fontSize: "22px", textAlign: 'center', margin: '10px 0 20px 0'}}>Thiết lập cơ cấu tổ chức</h2>
        <ThietLapCoCauToChuc></ThietLapCoCauToChuc>;
      </Card>
    </>
  );
}
