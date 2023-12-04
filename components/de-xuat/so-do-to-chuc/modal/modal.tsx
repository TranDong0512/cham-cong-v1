import { ModalWrapper } from "@/components/modal/ModalWrapper"
import {
  MyInput,
  MyTextArea
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal"
import { Form } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect } from "react"

export const UpdateNodeModal = ({
  open,
  setOpen,
  inputData
}: {
  open: boolean
  setOpen: any
  inputData: any
}) => {
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(inputData)
  }, [form, inputData])

  const PhongBan = () => (
    <>
      {MyInput(
        `Tên ${inputData?.type}`,
        `Nhập tên ${inputData?.type}`,
        true,
        true,
        "name"
      )}
      {MyInput("Trưởng phòng", "Nhập tên trưởng phòng ", true, true, "manager")}
      {MyInput(
        "Phó trưởng phòng",
        "Nhập tên phó trưởng phòng",
        true,
        true,
        "deputy"
      )}
      {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        true,
        true,
        "tong_nv"
      )}
      <MyTextArea
        name="desc"
        hasLabel={true}
        required
        placeholder=""
        title="Mô tả"
      />
    </>
  )

  const To = () => (
    <>
      {MyInput(
        `Tên phòng ban`,
        `Nhập tên ${inputData?.sort}`,
        true,
        true,
        "name",
        "",
        true
      )}
      {MyInput("Tên tổ", "Tên tổ ", true, true, "tp")}
      {MyInput("Tổ trưởng", "Nhập tên Tổ trưởng ", true, true, "tp")}
      {MyInput("Phó Tổ trưởng", "Nhập tên phó Tổ trưởng", true, true, "pp")}
      {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        true,
        true,
        "totalEmp"
      )}
      <MyTextArea
        name="desc"
        hasLabel={true}
        required
        placeholder=""
        title="Mô tả"
      />
    </>
  )

  const Nhom = () => (
    <>
      {MyInput(
        `Tên phòng ban`,
        `Nhập tên phòng ban`,
        true,
        true,
        "name",
        "",
        true
      )}
      {MyInput("Tên tổ", "Nhập tên tổ ", true, true, "tp", "", true)}
      {MyInput("Tên nhóm", "Nhập  Tên nhóm ", true, true, "tp")}
      {MyInput("Nhóm trưởng", "Nhập tên Nhóm trưởng ", true, true, "tp")}
      {MyInput("Nhóm phó", "Nhập tên Nhóm phó", true, true, "pp")}
      {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        true,
        true,
        "totalEmp"
      )}
      <MyTextArea
        name="desc"
        hasLabel={true}
        required
        placeholder=""
        title="Mô tả"
      />
    </>
  )

  const render = () => {
    switch (inputData?.type) {
      case "phòng ban":
        return <PhongBan />
      case "nhóm":
        return <Nhom />
      case "tổ":
        return <To />
      default:
        return <div></div>
    }
  }

  const children = <Form form={form}>{render()}</Form>

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    `Chỉnh sửa chi tiết ${inputData?.type}`,
    "Cập nhật",
    () => null,
    true,
    true
  )
}

export const DetailModal = ({
  open,
  setOpen,
  inputData
}: {
  open: boolean
  setOpen: any
  inputData: any
}) => {
  return ModalWrapper(
    open,
    setOpen,
    <p>{inputData?.desc}</p>,
    800,
    `Chi tiết mô tả ${inputData?.type}`,
    "",
    () => null,
    true,
    true,
    true,
    false,
    false
  )
}
