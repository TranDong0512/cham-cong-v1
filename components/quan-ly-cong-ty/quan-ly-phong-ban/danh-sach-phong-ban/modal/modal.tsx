import { ModalWrapper } from '@/components/modal/ModalWrapper'
import {
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { Form } from 'antd'
import Image from 'next/image'
import styless from './modal_ds_phong_ban.module.scss'
import { useEffect } from 'react'
import { DELETE, POST } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'

export function UpdatePhongBanModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function,
  selectedRow?: any
) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(selectedRow)
  }, [form, selectedRow])

  const handleSubmit = () => {
    // console.log({...form.getFieldsValue(), dep_id: selectedRow?.dep_id})
    // console.log("update a department!")

    //close modal
    setOpen(false)

    POST('api/qlc/department/edit', {
      ...form.getFieldsValue(),
      dep_id: selectedRow?.dep_id,
    })
      .then((res) => {
        // console.log(res?.message)

        // update data after edit successful
        // POST("api/qlc/department/list", {}).then((res) => {
        //   setData && setData(res?.data);
        // });
        setData &&
          setData(
            data.map((item) => {
              if (item === selectedRow) {
                return form.getFieldsValue()
              }
              return item
            })
          )
      })
      .catch((err) => console.error(err))
  }

  const children = (
    <div>
      <Form form={form} initialValues={selectedRow}>
        {/* {MySelect("Công Ty", "Chọn công ty", true, true)} */}
        {MyInput('Tên phòng ban', 'Nhập tên phòng ban', true, true, 'dep_name')}
        {/* {MySelect(
          "Trưởng phòng",
          "Nhập tên trưởng phòng",
          false,
          true,
          "manager_id",
          [
            { label: "Lại Thị Trang", value: 1 },
            { label: "Bùi Văn Huy", value: 2 }
          ]
        )}
        {MyInput("Phó phòng", "Nhập tên phó phòng", true, true, "subLeader")}
        {MyInput(
          "Số lượng nhân viên",
          "Nhập số lượng nhân viên",
          false,
          true,
          "dep_order",
          "number"
        )} */}
      </Form>
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Chỉnh sửa phòng ban',
    'Cập nhật',
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
    console.log('delete a department!')
    setOpen(false)
    DELETE('api/qlc/department/del', { dep_id: selectedRow?.dep_id })
      .then((res) => {
        setData && setData(data?.filter((item: any) => item !== selectedRow))
      })
      .catch((error) => console.log(error))
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    'Xóa phòng ban',
    'Đồng ý',
    onConfirm,
    true,
    true,
    false
  )
}

export function AddNewModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function,
  comLabel?: any
) {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSubmit = () => {
    // console.log(form.getFieldsValue());
    setOpen(false)
    form.validateFields().then((value) => {
      POST('api/qlc/department/create', value).then((res) => {
        router.reload()
      })
    })
  }

  const children = (
    <Form form={form} className={`${styless.addform}`}>
      {MySelect(
        'Công Ty',
        'Chọn công ty',
        true,
        true,
        'com_id',
        comLabel && [comLabel]
      )}
      {MyInput('Tên phòng ban', 'Nhập tên phòng ban', true, true, 'dep_name')}
      {/* {MySelect(
        "Trưởng phòng",
        "Nhập tên trưởng phòng",
        false,
        true,
        "manager_id",
        [
          { label: "Lại Thị Trang", value: 1 },
          { label: "Bùi Văn Huy", value: 2 }
        ]
      )}
      {MyInput("Phó phòng", "Nhập tên phó phòng", true, true, "subLeader")}
      {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        false,
        true,
        "dep_order",
        "number"
      )} */}
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Thêm mới phòng ban',
    'Thêm mới',
    handleSubmit
  )
}
