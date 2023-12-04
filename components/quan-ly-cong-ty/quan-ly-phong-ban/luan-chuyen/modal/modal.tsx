import { ModalWrapper } from '@/components/modal/ModalWrapper'
import {
  MyDatePicker,
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import { Form, Select } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { POST_HR, getCompIdCS } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'

const Editor = dynamic(() => import('../../../../commons/CkEditor'), {
  ssr: false,
})

export function UpdatePhongBanModal(
  open: boolean,
  setOpen: Function,
  data: any,
  setData: Function,
  selectedRow: any,
  listDepLabel: any,
  infoCom: any,
  listTeamLabel: any,
  listGrLabel: any
) {
  const [form] = Form.useForm()
  const [className, setClassName] = useState('')
  const [companyLabel, setCompanyLabel] = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  })
  const [listEmpTranferLabel, setListEmpTranferLabel]: any = useState(
    data?.map((emp) => ({ label: emp?.userName, value: emp?.ep_id }))
  )

  const router = useRouter()

  const onchangeName = (options: any) => {
    !options.value ? setClassName('hasColor') : setClassName('')
    // form.setFieldValue("position", options);
  }

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   created_at: dayjs(form.getFieldValue("created_at")).format(
      //     "YYYY-MM-DD"
      //   ),
      // });

      POST_HR('api/hr/personalChange/updateTranferJob', {
        ...value,
        created_at: dayjs(form.getFieldValue('created_at')).format(
          'YYYY-MM-DD'
        ),
      }).then((res) => {
        if (res?.result === true) {
          setOpen(false)
          router.reload()
        }
      })
    })
  }

  useEffect(() => {
    const cDId = listDepLabel?.find((dep) => {
      if (dep?.label === selectedRow?.old_dep_name) {
        return dep?.value
      }
    })
    const nCId =
      companyLabel?.label === selectedRow?.new_com_name
        ? companyLabel?.value
        : undefined
    const nTId = listTeamLabel?.find((team) => {
      if (team?.label === selectedRow?.team_name) {
        return team?.value
      }
    })
    const nGId = listGrLabel?.find((gr) => {
      if (gr?.label === selectedRow?.gr_name) {
        return gr?.value
      }
    })
    const nDId = listDepLabel?.find((dep) => {
      if (dep?.label === selectedRow?.new_dep_name) {
        return dep?.value
      }
    })
    let com_id = null
    com_id = getCompIdCS()

    form.setFieldsValue({
      ep_id: selectedRow?.ep_id,
      current_dep_id: cDId,
      update_dep_id: nDId,
      com_id: com_id,
      new_com_id: nCId,
      new_team_id: nTId,
      new_group_id: nGId,
      created_at: dayjs(selectedRow?.created_at),
      mission: selectedRow?.mission,
      note: selectedRow?.note,
    })
  }, [form, selectedRow])

  const children = (
    <div>
      <Form form={form} className={`luan_chuyen`} onFinish={handleSubmit}>
        {MySelect(
          'Đơn vị công tác hiện tại',
          'Chọn công ty',
          true,
          true,
          'com_id',
          [companyLabel]
        )}
        {MySelect(
          'Phòng ban hiện tại',
          'Chọn phòng ban',
          true,
          true,
          'current_dep_id',
          listDepLabel
        )}
        <Form.Item
          name='ep_id'
          required={true}
          label={<p>{'Tên nhân viên'}</p>}
          labelCol={{ span: 24 }}>
          <Select
            onChange={(options: any) => onchangeName(options)}
            placeholder={'Chọn nhân viên'}
            style={{
              width: '100%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
            }}
            optionFilterProp="label"
            options={listEmpTranferLabel}
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
            options={[
              {
                label: 'Nhân viên',
                value: 1,
              },
              {
                label: 'Trưởng phòng',
                value: 2,
              },
            ]}
            suffixIcon={
              <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
            }
            size='large'
          />
        </Form.Item>
        {MySelect(
          'Đơn vị công tác mới',
          'Chọn công ty',
          true,
          true,
          'new_com_id',
          [companyLabel]
        )}
        {MySelect(
          'Phòng ban mới',
          'Chọn phòng ban',
          true,
          true,
          'update_dep_id',
          listDepLabel
        )}
        {MySelect('Chọn tổ', 'Chọn tổ', false, true, 'new_team_id', [
          ...listTeamLabel,
        ])}
        {MySelect('Chọn nhóm', 'Chọn nhóm', false, true, 'new_group_id', [
          ...listGrLabel,
        ])}
        {MySelect(
          'Chức vụ mới',
          'Chọn chức vụ mới',
          true,
          true,
          'update_position',
          [
            { label: 'Nhân viên', value: 1 },
            { label: 'Tổ trưởng', value: 2 },
          ]
        )}
        {MyDatePicker(
          'Thời gian luân chuyển công tác',
          'YYYY-MM-DD',
          true,
          true,
          'created_at'
        )}
        {MySelect(
          'Chọn quy định',
          'Chọn quy định',
          false,
          true,
          'decision_id',
          [
            { label: 'Quy định tăng chức', value: 1 },
            { label: 'Quy định chuyển công tác', value: 2 },
          ]
        )}
        <Editor
          data={selectedRow?.mission ?? ''}
          onChange={() => null}
          required={true}
          title='Nhiệm vụ công tác mới'
          name='mission'
          form={form}
        />
        <Editor
          data={selectedRow?.note ?? ''}
          onChange={() => null}
          required={false}
          title='Ghi chú'
          name='note'
          form={form}
        />
      </Form>
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Chỉnh sửa luân chuyển công tác',
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
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Bạn có chắc chắn muốn xóa chuyển công tác này không ?
      </p>
    </div>
  )

  const onConfirm = () => {
    POST_HR('api/hr/personalChange/deleteTranferJob', {
      ep_id: selectedRow?.ep_id,
    }).then((res) => {
      if (res?.result === true) {
        setData(data.filter((item) => item !== selectedRow))
        setOpen(false)
      }
    })
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    'Xóa luân chuyển công tác',
    'Đồng ý',
    onConfirm
  )
}

export function AddNewModal(
  open: boolean,
  setOpen: Function,
  setData: Function,
  listEmp: any,
  listDepLabel: any,
  listTeam: any,
  listGr: any
) {
  const [form] = Form.useForm()
  const [className, setClassName] = useState('')
  const [empSelected, setEmpSelected]: any = useState({})
  const router = useRouter()

  const onchangeName = (options: any) => {
    !options.value ? setClassName('hasColor') : setClassName('')
    // form.setFieldValue("position", options);
    setEmpSelected(listEmp.find((emp) => emp?.idQLC === options))
  }

  useEffect(() => {
    if (empSelected?.idQLC) {
      form.setFieldValue('current_dep_id', empSelected?.dep_id)
      form.setFieldValue('current_position', empSelected?.position_id)
    }
  }, [form, empSelected])

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   created_at: dayjs(form.getFieldValue("created_at")).format(
      //     "YYYY-MM-DD"
      //   ),
      //   com_id: 1763,
      // });
      let com_id = null
      com_id = getCompIdCS()
      com_id !== null &&
        POST_HR('api/hr/personalChange/updateTranferJob', {
          ...value,
          created_at: dayjs(form.getFieldValue('created_at')).format(
            'YYYY-MM-DD'
          ),
          com_id: com_id,
        }).then((res) => {
          if (res?.result === true) {
            setOpen(false)
            router.reload()
          }
        })
    })
  }

  const children = (
    <Form form={form} onFinish={handleSubmit}>
      {/* {MySelect(
        "Đơn vị công tác hiện tại",
        "Chọn công ty",
        true,
        true,
        "com_id",
        [{ label: "Công ty thanh toán Hưng Hà", value: 3312 }]
      )} */}
      {MySelect(
        'Phòng ban hiện tại',
        'Chọn phòng ban',
        true,
        true,
        'current_dep_id',
        listDepLabel
      )}
      <Form.Item
        name='ep_id'
        required={true}
        label={<p>{'Tên nhân viên'}</p>}
        labelCol={{ span: 24 }}>
        <Select
          onChange={(options: any) => onchangeName(options)}
          placeholder={'Chọn nhân viên'}
          style={{
            width: '100%',
            border: '1px solid #9F9F9F',
            borderRadius: '10px',
          }}
          optionFilterProp="label"
          options={listEmp?.map((emp) => ({
            label: emp?.userName,
            value: emp?.idQLC,
          }))}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      {/* {MySelect("Tên nhân viên", "Chọn tên nhân viên", true, true,'name',[{ value: 'jack', label: 'Jack',key:'1' },{ value: 'lucy', label: 'Lucy', key:'2' }])} */}
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
          options={[
            { label: 'Nhân viên', value: 1 },
            { label: 'Trưởng phòng', value: 2 },
          ]}
          suffixIcon={
            <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
          }
          size='large'
        />
      </Form.Item>
      {/* {MySelect(
        "Chức vụ hiện tại",
        "Khi chọn tên nhân viên sẽ sinh ra chức vụ hiện tại của nhân viên đó",
        true,
        true,
        'position',[{ value: 'jack', label: 'Jack',key:'1' },{ value: 'lucy', label: 'Lucy',key:'2' }]
      )} */}
      {MySelect(
        'Đơn vị công tác mới',
        'Chọn công ty',
        true,
        true,
        'new_com_id',
        [{ label: 'Công ty thanh toán snowmoon', value: 1763 }]
      )}
      {MySelect(
        'Phòng ban mới',
        'Chọn phòng ban',
        true,
        true,
        'update_dep_id',
        listDepLabel
      )}
      {MySelect(
        'Chọn tổ',
        'Chọn tổ',
        false,
        true,
        'new_team_id',
        listTeam?.map((team) => ({
          label: team?.team_name,
          value: team?.team_id,
        }))
      )}
      {MySelect(
        'Chọn nhóm',
        'Chọn nhóm',
        false,
        true,
        'new_group_id',
        listGr?.map((group) => ({ label: group?.gr_name, value: group?.gr_id }))
      )}
      {MySelect(
        'Chức vụ mới',
        'Chọn chức vụ mới',
        true,
        true,
        'update_position',
        [
          { label: 'Nhân viên', value: 1 },
          { label: 'Tổ trưởng', value: 2 },
        ]
      )}
      {MyDatePicker(
        'Thời gian luân chuyển công tác',
        'YYYY-MM-DD',
        true,
        true,
        'created_at'
      )}
      {MySelect('Chọn quy định', 'Chọn quy định', false, true, 'decision_id', [
        { label: 'Quy định tăng chức', value: 1 },
        { label: 'Quy định chuyển công tác', value: 2 },
      ])}
      <Editor
        data=''
        onChange={() => null}
        required={true}
        title='Nhiệm vụ công tác mới'
        name='mission'
        form={form}
      />
      <Editor
        data=''
        onChange={() => null}
        required={false}
        title='Ghi chú'
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
    'Thêm mới luân chuyển công tác',
    'Thêm mới',
    handleSubmit
  )
}
