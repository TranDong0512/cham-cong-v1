import ThietLapViTri from "@/components/thiet-lap-cong-ty/thiet-lap-ct-pb/thiet-lap-vi-tri";
import { Card } from "antd";

import 'react-toastify/dist/ReactToastify.css';


export default function TLVT() {

  return (
    <>
      <div className="tc_wrap">
        <Card>
          
          <h2 style={{ fontSize: "22px", textAlign: 'center', margin: '10px 0 20px 0' }}>Thiết lập vị trí công ty</h2>
          <ThietLapViTri></ThietLapViTri>;
        </Card>
      </div>
    </>
  );
}
