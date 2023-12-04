import { mySelect } from '@/components/cham-cong/duyet-thiet-bi/duyet-thiet-bi'
import { ModalWrapper } from '@/components/modal/ModalWrapper'
import {
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { GET, POST_HR, getCompIdCS } from '@/pages/api/BaseApi'
import { positionLabel } from '@/utils/function'
import { Form, Select, Input } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const MyEditor = dynamic(() => import('../../../../commons/CkEditor'), {
  ssr: false,
})

export function UpdatePhongBanModal(
  open: boolean,
  setOpen: Function,
  data: any = [],
  setData: Function,
  selectedRow: any,
  companyLabel: any,
  listDepLabel: any
) {
  const [listNVGiamBienChe, setNVGiamBienChe]: any = useState([
    ...data?.map((x) => ({ label: x?.ep_name, value: x?.ep_id })),
  ])
  const [form] = Form.useForm()
  const [className, setClassName] = useState('')
  const router = useRouter()
  const onchangeName = (options: any) => {
    !options.value ? setClassName('hasColor') : setClassName('')
    // form.setFieldValue("room", options)
    // form.setFieldValue("position", options)
    // form.setFieldValue("company", options)
  }
  const [listShiftLabel, setListShiftLabel] = useState<any>([])
  useEffect(() => {
    const getListCa = async () => {
      const res = await GET('api/qlc/shift/list')
      // console.log(res)

      if (res?.result) {
        setListShiftLabel(
          res?.items?.map((item) => {
            return {
              value: `${item?.shift_id}`,
              label: item?.shift_name,
            }
          })
        )
      }
    }

    getListCa()
  }, [])
  useEffect(() => {
    let com_id = null
    com_id = getCompIdCS()
    form.setFieldValue('ep_id', selectedRow?.ep_id)
    form.setFieldValue('current_dep_id', selectedRow?.dep_name)
    form.setFieldValue('current_position', selectedRow?.position_name)
    form.setFieldValue('com_id', com_id)
    form.setFieldValue('created_at', selectedRow?.time?.substring(0, 10))
    form.setFieldValue('shift_id', selectedRow?.shift_id)
    form.setFieldValue('type', selectedRow?.type)
    form.setFieldValue('decision_id', selectedRow?.decision_id)
    form.setFieldValue('note', selectedRow?.note)
  }, [selectedRow])
  const handalUpdate = () => {
    form.validateFields().then((value) => {
      delete value['current_dep_id']
      delete value['current_position']
      // delete value['com_id']
      console.log(value)
      POST_HR('api/hr/personalChange/updateQuitJob', value).then((res) => {
        if (res?.result === true) {
          setOpen(false)
          router.replace(router.asPath)
        }
      })
    })
  }

  const children = (
    <div>
      <Form form={form} onFinish={handalUpdate}>
        <Form.Item
          name='ep_id'
          required={true}
          label={<p>{'Tên nhân viên'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            onChange={(options: any) => onchangeName(options)}
            placeholder={'Chọn tên nhân viên'}
            showSearch
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            optionFilterProp='label'
            options={listNVGiamBienChe}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='current_dep_id'
          required={true}
          label={<p>{'Phòng ban hiện tại'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            className={`${className}`}
            placeholder={'Chọn phòng ban'}
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            optionFilterProp='label'
            options={listDepLabel}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='current_position'
          required={true}
          label={<p>{'Chức vụ hiện tại'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            className={`${className}`}
            placeholder={'Chọn chức vụ'}
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            options={positionLabel}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='com_id'
          required={true}
          label={<p>{'Đơn vị công tác hiện tại'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            className={`${className}`}
            placeholder={'Chọn công ty'}
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            options={[companyLabel]}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='created_at'
          required={true}
          label={<p>{'Thời gian bắt đầu nghỉ'}</p>}
          labelCol={{ span: 24 }}>
          <Input
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            type='date'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='shift_id'
          required={true}
          label={<p>{'Chọn ca nghỉ'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            placeholder={'Chọn ca nghỉ'}
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            optionFilterProp='label'
            options={listShiftLabel}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='type'
          required={true}
          label={<p>{'Chọn hình thức'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            placeholder={'Chọn hình thức'}
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            options={[
              {
                label: 'Nghỉ cả ca',
                value: 1,
              },
              {
                label: 'Nghỉ giữa ca',
                value: 2,
              },
            ]}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='decision_id'
          required={false}
          label={<p>{'Chọn quy định'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            placeholder={'Chọn quy định'}
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            options={[
              {
                label: 'Quy định nghỉ cả ca',
                value: 1,
              },
              {
                label: 'Quy định nghỉ giữa ca',
                value: 2,
              },
            ]}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        <MyEditor
          data={selectedRow?.note || ''}
          onChange={() => null}
          title='Lý do'
          required={true}
          name='note'
          form={form}
        />
      </Form>
      {/* <Form form={form}>
        {MySelect("Tên nhân viên", "Chọn tên nhân viên", true, true)}
        {MySelect(
          "Phòng ban hiện tại",
          "Chọn phòng ban(Khi chọn tên nhân viên sẽ sinh ra phòng ban hiện tại của nhân viên đó)",
          true,
          true
        )}
        {MySelect(
          "Chức vụ hiện tại",
          "Chọn công ty(Khi chọn tên nhân viên sẽ sinh ra chức vụ hiện tại của nhân viên đó)",
          true,
          true
        )}
        {MySelect(
          "Đơn vị công tác hiện tại",
          "Chọn phòng ban(Khi chọn tên nhân viên sẽ sinh ra đơn vị công tác hiện tại của nhân viên đó)",
          true,
          true
        )}
        {MySelect("Thời gian bắt đầu nghỉ", "dd/MM/YYYY", true, true)}
        {MySelect("Chọn ca nghỉ", "Chọn ca nghỉ", true, true)}
        {MySelect("Hình thức", "Chọn hình thức", true, true)}
        {MySelect("Chọn quy định", "Chọn quy định", false, true)}
        <MyEditor
          data=""
          onChange={() => null}
          title="Lý do"
          required={true}
          name="emailHtml"
        />
      </Form> */}
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Chỉnh sửa giảm biên chế',
    'Cập nhật',
    handalUpdate
  )
}

export function ConfirmDeleteModal(
  open: boolean,
  setOpen: Function,
  name: string,
  data: any,
  setData: Function,
  selectedRow: any
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
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Bạn có chắc chắn muốn xóa giảm biên chế này không ?
      </p>
    </div>
  )

  const onConfirm = () => {
    POST_HR('api/hr/personalChange/deleteQuitJob', {
      ep_id: selectedRow?.ep_id,
    }).then((res) => {
      if (res?.result === true) {
        setOpen(false)
        setData(data.filter((x) => x !== selectedRow))
      }
    })
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    'Xóa giảm biên chế',
    'Đồng ý',
    onConfirm
  )
}

export function AddNewModal(
  open: boolean,
  setOpen: Function,
  setData: Function,
  listNV: any,
  setListNV: Function,
  companyLabel: any,
  listDepLabel: any
) {
  const [form] = Form.useForm()
  const [nvSelected, setNvSelected]: any = useState({})
  const router = useRouter()

  const [className, setClassName] = useState('')
  const onchangeName = (options: any) => {
    !options.value ? setClassName('hasColor') : setClassName('')
    // form.setFieldValue("room", options)
    // form.setFieldValue("position", options)
    // form.setFieldValue("company", options)
    setNvSelected(listNV.find((x) => x?.idQLC === options))
  }
  useEffect(() => {
    form.setFieldValue('ep_id', nvSelected?.idQLC)
    form.setFieldValue('current_dep_id', nvSelected?.dep_id)
    form.setFieldValue('current_position', nvSelected?.position_id)
    form.setFieldValue('com_id', nvSelected?.com_id)
  }, [nvSelected])
  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log(value)
      POST_HR('api/hr/personalChange/updateQuitJob', value).then((res) => {
        if (res?.result === true) {
          setOpen(false)
          router.replace(router.asPath)
        }
      })
    })
  }

  const [listShiftLabel, setListShiftLabel] = useState<any>([])
  useEffect(() => {
    const getListCa = async () => {
      const res = await GET('api/qlc/shift/list')
      // console.log(res)

      if (res?.result) {
        setListShiftLabel(
          res?.items?.map((item) => {
            return {
              value: `${item?.shift_id}`,
              label: item?.shift_name,
            }
          })
        )
      }
    }

    getListCa()
  }, [])

  const children = (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name='ep_id'
        required={true}
        label={<p>{'Tên nhân viên'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          onChange={(options: any) => onchangeName(options)}
          placeholder={'Chọn tên nhân viên'}
          showSearch
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          optionFilterProp='label'
          options={[
            ...listNV?.map((x) => ({
              label: x?.userName,
              value: x?.idQLC,
            })),
          ]}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='current_dep_id'
        required={true}
        label={<p>{'Phòng ban hiện tại'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          className={`${className}`}
          placeholder={'Chọn phòng ban'}
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          optionFilterProp='label'
          options={listDepLabel}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='current_position'
        required={true}
        label={<p>{'Chức vụ hiện tại'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          className={`${className}`}
          placeholder={'Chọn chức vụ'}
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          options={positionLabel}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='com_id'
        required={true}
        label={<p>{'Đơn vị công tác hiện tại'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          className={`${className}`}
          placeholder={'Chọn công ty'}
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          options={[companyLabel]}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='created_at'
        required={true}
        label={<p>{'Thời gian bắt đầu nghỉ'}</p>}
        labelCol={{ span: 24 }}>
        <Input
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          type='date'
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='shift_id'
        required={true}
        label={<p>{'Chọn ca nghỉ'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          placeholder={'Chọn ca nghỉ'}
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          optionFilterProp='label'
          options={listShiftLabel}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='type'
        required={true}
        label={<p>{'Chọn hình thức'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          placeholder={'Chọn hình thức'}
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          options={[
            {
              label: 'Nghỉ cả ca',
              value: 1,
            },
            {
              label: 'Nghỉ giữa ca',
              value: 2,
            },
          ]}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='decision_id'
        required={false}
        label={<p>{'Chọn quy định'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          placeholder={'Chọn quy định'}
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          options={[
            {
              label: 'Quy định nghỉ cả ca',
              value: 1,
            },
            {
              label: 'Quy định nghỉ giữa ca',
              value: 2,
            },
          ]}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      <MyEditor
        data=''
        onChange={() => null}
        title='Lý do'
        required={true}
        name='note'
        form={form}
      />
    </Form>
    // <Form form={form}>
    //   {MySelect("Tên nhân viên", "Chọn tên nhân viên", true, true)}
    //   {MySelect(
    //     "Phòng ban hiện tại",
    //     "Chọn phòng ban(Khi chọn tên nhân viên sẽ sinh ra phòng ban hiện tại của nhân viên đó)",
    //     true,
    //     true
    //   )}
    //   {MySelect(
    //     "Chức vụ hiện tại",
    //     "Chọn công ty(Khi chọn tên nhân viên sẽ sinh ra chức vụ hiện tại của nhân viên đó)",
    //     true,
    //     true
    //   )}
    //   {MySelect(
    //     "Đơn vị công tác hiện tại",
    //     "Chọn phòng ban(Khi chọn tên nhân viên sẽ sinh ra đơn vị công tác hiện tại của nhân viên đó)",
    //     true,
    //     true
    //   )}
    //   {MySelect("Thời gian bắt đầu nghỉ", "dd/MM/YYYY", true, true)}
    //   {MySelect("Chọn ca nghỉ", "Chọn ca nghỉ", true, true)}
    //   {MySelect("Hình thức", "Chọn hình thức", true, true)}
    //   {MySelect("Chọn quy định", "Chọn quy định", false, true)}
    //   <MyEditor
    //     data=""
    //     onChange={() => null}
    //     title="Lý do"
    //     required={true}
    //     name=""
    //   />
    // </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Thêm mới giảm biên chế',
    'Thêm mới',
    handleSubmit
  )
}
