import { DuyetQuaNhieuCap } from "@/components/de-xuat/cai-dat-duyet-phep/qua-nhieu-cap/DuyetQuaNhieuCap"
import styles from "./index.module.css"
import { Card, Tabs } from "antd"
import { DuyetQua1Cap } from "@/components/de-xuat/cai-dat-duyet-phep/qua-1-cap/DuyetQua1Cap"

export default function CaiDatLoaiHinhDuyetPhep() {
  const LIST_TABS = [
    {
      key: "1",
      label: "Duyệt đề xuất nghỉ phép qua nhiều cấp",
      children: <DuyetQuaNhieuCap />
    },
    {
      key: "2",
      label: "Duyệt đề xuất nghỉ phép qua 1 cấp",
      children: <DuyetQua1Cap />
    }
  ]
  return (
    <Card>
      <Tabs items={LIST_TABS} className="customTab" />
    </Card>
  )
}
