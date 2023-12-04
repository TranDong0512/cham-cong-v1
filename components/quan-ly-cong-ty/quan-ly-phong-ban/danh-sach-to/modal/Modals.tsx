import { ModalWrapper } from '@/components/modal/ModalWrapper'
import {
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { DELETE, POST } from '@/pages/api/BaseApi'
import { Form } from 'antd'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from './Modals.module.scss'
import { useRouter } from 'next/router'

export function EditToModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function,
  selectedRow?: any
) {
  const [form] = Form.useForm()
  const router = useRouter()

  useEffect(() => {
    form.setFieldsValue({ team_name: selectedRow?.team_name })
  }, [form, selectedRow])

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      POST(`api/qlc/team/edit`, {
        ...value,
        dep_id: selectedRow?.dep_id,
        team_id: selectedRow?.team_id,
      })
        .then((response) => {
          if (response?.result === true) {
            router.reload()
          }
        })
        .catch((error) => console.error(error))
    })
  }

  const children = (
    <Form form={form} initialValues={selectedRow}>
      {/* {MySelect('Công ty', 'Chọn công ty', true, true, 'com_id', [
        { label: 'Công ty thanh toán Hưng Hà 2', value: 3312 },
      ])} */}
      {/* {MyInput("Tổ trưởng", "Bùi Văn Huy", false, false, "teamLeader")} */}
      {/* {MyInput(
        "Phó tổ trưởng",
        "Nguyễn Khánh Đức",
        false,
        true,
        "teamSubLeader"
      )} */}
      {/* {MySelect('Phòng ban', 'Chọn phòng ban', true, true, 'dep_id', [
        { label: 'Phòng kỹ thuật', value: 1 },
      ])} */}
      {MyInput('Tên tổ', 'Nhập tên tổ', true, true, 'team_name')}
      {/* total_emp can not update */}
      {/* {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        false,
        true,
        "total_emp",
        "number"
      )} */}
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Chỉnh sửa tổ',
    'Cập nhật',
    // () => null
    handleSubmit
  )
}

export function ConfirmDeleteModal(
  open: boolean,
  setOpen: Function,
  name: string,
  data?: any,
  setData?: Function,
  selectedRow?: any
) {
  const children = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image alt='/' src={'/big-x.png'} width={50} height={50} />
      <p style={{ marginTop: '20px' }}>Bạn có chắc chắn muốn xóa {name} ?</p>
    </div>
  )

  const onConfirm = () => {
    // a row has selected
    if (selectedRow) {
      // console.log(selectedRow)

      //close modal
      setOpen(false)

      // delete seletedRow
      DELETE('api/qlc/team/del', { team_id: selectedRow.team_id })
        .then((res) => {
          // update data after deletion
          setData && setData(data?.filter((item: any) => item !== selectedRow))
        })
        .catch((err) => console.error(err))

      // alert OK
      // code show alert
    }
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    'Xóa tổ',
    'Đồng ý',
    onConfirm
  )
}

export function AddNewToModal(
  open: boolean,
  setOpen: Function,
  listDeps: any[],
  data?: any,
  setData?: Function,
  comLabel?: any,
  listDepLabel?: any
) {
  const [form] = Form.useForm()
  const router = useRouter()
  console.log(comLabel)
  const handleSubmit = () => {
    // console.log(form.getFieldsValue())
    // model "Confirm" popup
    // code for popup confirm

    //close modal
    form.validateFields().then((value) => {
      // add data
      POST(`api/qlc/team/create`, value).then((res) => {
        router.reload()
      })
    })
  }

  const children = (
    <Form form={form}>
      {MySelect(
        'Công ty',
        'Chọn công ty',
        true,
        true,
        'com_id',
        comLabel && [comLabel]
      )}
      {/* {MyInput("Tổ trưởng", "Bùi Văn Huy", false, false, "teamLeader")} */}
      {/* {MyInput(
        "Phó tổ trưởng",
        "Nguyễn Khánh Đức",
        false,
        true,
        "teamSubLeader"
      )} */}
      {MySelect('Phòng ban', 'Kỹ thuật', true, true, 'dep_id', listDeps)}
      {MyInput('Tên tổ', 'Nhập tên tổ', true, true, 'team_name')}
      {/* undefined properties total_emp */}
      {/* {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        false,
        true,
        "total_emp",
        "number"
      )} */}
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Thêm mới tổ',
    'Thêm mới',
    handleSubmit
  )
}
