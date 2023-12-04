import { ModalWrapper } from '@/components/modal/ModalWrapper'
import {
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { Form, Select, Input } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from './modal.module.css'
import { useState } from 'react'
import { POST, POST_HR, getCompIdCS } from '@/pages/api/BaseApi'
import { useEffect } from 'react'
import { positionLabel } from '@/utils/function'

const MyEditor = dynamic(() => import('../../../../commons/CkEditor'), {
  ssr: false,
})

export function UpdatePhongBanModal(
  open: boolean,
  setOpen: Function,
  data: any,
  setData: Function,
  selectedRow: any
) {
  const [listEmpQuitJobNew, setListEmpQuitJobNew]: any[] = useState([])
  const [form] = Form.useForm()
  const [className, setClassName] = useState('')
  const onchangeName = (options: any) => {
    !options.value ? setClassName('hasColor') : setClassName('')
    // form.setFieldValue("room", options);
    // form.setFieldValue("position", options);
    // form.setFieldValue("company", options);
  }
  const [depLabel, setDepLabel] = useState<any>([])
  const [comLabel, setComLabel] = useState<any>({})

  useEffect(() => {
    let com_id = null
    com_id = getCompIdCS()
    com_id !== null &&
      POST('api/qlc/department/list', {
        com_id: com_id,
      }).then((res) => {
        if (res?.result === true) {
          setDepLabel(
            res?.items?.map((dep) => ({
              label: dep?.dep_name,
              value: dep?.dep_id,
            }))
          )
        }
      })
    POST('api/qlc/company/info', {}).then((res) => {
      if (res?.result === true) {
        setComLabel({ label: res?.data?.com_name, value: res?.data?.com_id })
      }
    })
  }, [])

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      delete value['current_dep_id']
      delete value['current_position']
      delete value['com_id']
      // console.log(value)
      POST_HR('api/hr/personalChange/updateQuitJobNew', value).then((res) => {
        if (res?.result === true) {
          POST_HR('api/hr/personalChange/getListQuitJobNew', {
            page: 1,
            pageSize: 20,
          }).then((response) => setData(response?.data))
          setOpen(false)
        }
      })
    })
  }

  useEffect(() => {
    if (data?.length > 0) {
      setListEmpQuitJobNew([
        ...data?.map((empQuit) => ({
          label: empQuit?.ep_name,
          value: empQuit?.ep_id,
        })),
      ])
    }
  }, [data])

  useEffect(() => {
    let com_id = null
    com_id = getCompIdCS()
    form.setFieldValue('ep_id', selectedRow?.ep_id)
    form.setFieldValue('com_id', com_id)
    form.setFieldValue('current_dep_id', selectedRow?.dep_name)
    form.setFieldValue('current_position', selectedRow?.position_name)
    form.setFieldValue('created_at', selectedRow?.time?.substring(0, 10))
    form.setFieldValue('note', selectedRow?.note)
  }, [form, selectedRow])

  const children = (
    <div>
      <Form
        form={form}
        initialValues={{ ...selectedRow }}
        onFinish={handleSubmit}>
        <Form.Item
          name='ep_id'
          required={true}
          label={<p>{'Tên nhân viên'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            onChange={(options: any) => onchangeName(options)}
            placeholder={'Chọn nhân viên'}
            showSearch
            optionFilterProp='label'
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            options={listEmpQuitJobNew}
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
            options={depLabel}
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
            options={[comLabel]}
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

        <MyEditor
          data={selectedRow?.note ?? ''}
          onChange={() => null}
          title='Ghi chú'
          required={false}
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
        {MySelect("Thời gian nghỉ", "dd/MM/YYYY", true, true)}
        <MyEditor
          data=""
          onChange={() => null}
          title="Ghi chú"
          required={false}
          name=""
        />
      </Form> */}
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Chỉnh sửa nghỉ việc',
    'Cập nhật',
    handleSubmit
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
        Bạn có chắc chắn muốn xóa nghỉ việc này không ?
      </p>
    </div>
  )

  const onConfirm = () => {
    if (selectedRow) {
      POST_HR('api/hr/personalChange/deleteQuitJobNew', {
        ep_id: selectedRow?.ep_id,
      }).then((res) => {
        if (res?.result === true) {
          setData(data?.filter((item) => item !== selectedRow))
          setOpen(false)
        }
      })
    }
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    'Xóa nghỉ việc',
    'Đồng ý',
    onConfirm
  )
}

export function AddNewModal(
  open: boolean,
  setOpen: Function,
  setData: Function,
  listEmp: any,
  setListEmp: Function
) {
  const [empSelected, setEmpSelected]: any = useState({})
  const [form] = Form.useForm()
  const [className, setClassName] = useState('')
  const onchangeName = (options: any) => {
    !options.value ? setClassName('hasColor') : setClassName('')
    // form.setFieldValue("room", options);
    // form.setFieldValue("position", options);
    // form.setFieldValue("company", options);
    console.log(options)
    setEmpSelected(listEmp.find((emp) => emp?.idQLC === options))
  }

  useEffect(() => {
    form.setFieldValue('ep_id', empSelected?.idQLC)
    form.setFieldValue('com_id', empSelected?.com_id)
    form.setFieldValue('current_dep_id', empSelected?.dep_id)
    form.setFieldValue('current_position', empSelected?.position_id)
  }, [form, empSelected])

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log(value)
      POST_HR('api/hr/personalChange/updateQuitJobNew', value).then((res) => {
        if (res?.result === true) {
          setEmpSelected({})
          form.resetFields()
          setOpen(false)
          setListEmp(listEmp.filter((emp) => emp !== empSelected))
          POST_HR('api/hr/personalChange/getListQuitJobNew', {
            page: 1,
            pageSize: 20,
          }).then((response) => setData(response?.data))
        }
      })
    })
  }

  const [depLabel, setDepLabel] = useState<any>([])
  const [comLabel, setComLabel] = useState<any>({})

  useEffect(() => {
    let com_id = null
    com_id = getCompIdCS()
    com_id !== null &&
      POST('api/qlc/department/list', {
        com_id: com_id,
      }).then((res) => {
        if (res?.result === true) {
          setDepLabel(
            res?.items?.map((dep) => ({
              label: dep?.dep_name,
              value: dep?.dep_id,
            }))
          )
        }
      })
    POST('api/qlc/company/info', {}).then((res) => {
      if (res?.result === true) {
        setComLabel({ label: res?.data?.com_name, value: res?.data?.com_id })
      }
    })
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
          placeholder={'Chọn nhân viên'}
          showSearch
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          optionFilterProp='label'
          options={[
            ...listEmp?.map((item) => ({
              label: item?.userName,
              value: item?.idQLC,
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
          options={depLabel}
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
          options={[comLabel]}
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

      <MyEditor
        data=''
        onChange={() => null}
        title='Ghi chú'
        required={false}
        name='note'
        form={form}
      />
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Thêm mới nghỉ việc',
    'Thêm mới',
    handleSubmit
  )
}
