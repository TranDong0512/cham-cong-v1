import { ModalWrapper } from "@/components/modal/ModalWrapper"
import styles from "./CaiDatThoiGianDeXuat.module.css"
import { set } from "lodash"

export const UpdateSuccessModal = ({
  open,
  setOpen
}: {
  open: boolean
  setOpen: any
}) => {
  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: "center" }}>Bạn đã cập nhật thành công</p>,
    400,
    "",
    "OK",
    () => setOpen(false),
    false,
    true,
    false,
    false,
    true
  )
}
