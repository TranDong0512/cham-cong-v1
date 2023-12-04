import { ModalWrapper } from '@/components/modal/ModalWrapper'
import {
  MyInput,
  MyRating,
  MySelect,
  MyTextArea,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Rate,
  Select,
  Space,
  Upload,
  message,
} from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from './modal.module.css'
import { useEffect, Component } from 'react'
import { POST_HR } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import _ from 'lodash'
import { useRouter } from 'next/router'

const MyEditor = dynamic(() => import('../../commons/CkEditor'), {
  ssr: false,
})

export function AddNewStageModal({
  open,
  setOpen,
  data,
  setData,
}: {
  open: boolean
  setOpen: any
  data: any
  setData: any
}) {
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = () => {
    form.validateFields().then((value: any) => {
      // const beforeStageIndex = data.findIndex(
      //   (item: any) => item.title === value?.beforeStage
      // )
      // const newData = {
      //   title: value?.stageName,
      //   total: 0,
      //   required: false,
      //   bgColor: "#FFEDDA",
      //   textColor: "#474747"
      // }
      // let newArr = data?.slice(0, beforeStageIndex + 1)
      // newArr.push(newData)
      // const restData = data?.slice(beforeStageIndex + 1, data?.length)
      // newArr = [...newArr, ...restData]
      // setData(newArr)

      POST_HR('api/hr/recruitment/createProcess', value).then((res) => {
        if (res?.result === true) {
          setOpen(false)
          router.reload()
        }
      })
    })
  }

  const children = (
    <Form form={form}>
      {MyInput('Tên giai đoạn', 'Nhập tên giai đoạn', true, true, 'name')}
      {MySelect(
        'Chọn giai đoạn đứng trước',
        'Chọn giai đoạn đứng trước',
        true,
        true,
        'processBefore',
        data &&
          data
            ?.filter((item) => item?.id > 0)
            ?.map((item: any, index: number) => ({
              value: item?.id,
              label: item?.title,
            }))
      )}
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Thêm mới giai đoạn',
    'Thêm mới',
    () => onFinish()
  )
}

export function UpdateStageModal({
  open,
  setOpen,
  selectedStage,
  data,
}: {
  open: boolean
  setOpen: any
  selectedStage: any
  data: any
}) {
  const [form] = Form.useForm()
  const router = useRouter()

  const hanldeSubmit = () => {
    form.validateFields().then((value: any) => {
      POST_HR('api/hr/recruitment/updateProcess', {
        name: value['name'],
        processBefore: value['processBefore'],
        processInterviewId: selectedStage?.id,
      }).then((res) => {
        if (res?.result === true) {
          setOpen(false)
          router.reload()
        }
      })
    })
  }

  useEffect(() => {
    form.setFieldsValue(selectedStage)
  }, [form, selectedStage])

  const Child = () => (
    <Form form={form} initialValues={selectedStage}>
      {MyInput('Tên giai đoạn', 'Nhập tên giai đoạn', true, true, 'name')}
      {MySelect(
        'Chọn giai đoạn đứng trước',
        'Chọn giai đoạn đứng trước',
        true,
        true,
        'processBefore',
        data
          ?.filter((item) => item?.id > 0 && item?.id !== selectedStage?.id)
          ?.map((item) => ({
            key: item?.id,
            value: item?.id,
            label: item?.name,
          }))
      )}
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    <Child />,
    600,
    'Chỉnh sửa giai đoạn',
    'Cập nhật',
    hanldeSubmit
  )
}

export function ConfirmDeleteStageModal(
  open: boolean,
  setOpen: Function,
  onConfirm: Function
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
      <p style={{ marginTop: '20px' }}>
        Bạn có chắc muốn xóa giai đoạn này không? Dữ liệu liên quan đến giai
        đoạn phỏng vấn này sẽ bị xóa, Bạn có chắc muốn xóa giai đoạn phỏng vấn
        này không?
      </p>
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Xóa giai đoạn',
    'Xóa',
    onConfirm,
    true,
    true,
    false
  )
}

export function ConfirmDeleteAttendantModal(
  open: boolean,
  setOpen: Function,
  onConfirm: Function
) {
  const children = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Image alt="/" src={"/big-x.png"} width={50} height={50} /> */}
      <p style={{ marginTop: '20px' }}>
        {`Bạn có chắc muốn xóa ứng viên này không? Tất cả nội dung quy trình sẽ
        được lưu trữ ở "DỮ LIỆU ĐÃ XÓA GẦN ĐÂY" trong thời gian 5 ngày trước khi
        bị xóa vĩnh viễn.`}
      </p>
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Xóa ứng viên',
    'Xóa',
    onConfirm
  )
}

export function ChangeStageModal({
  open,
  setOpen,
  data,
  setData,
  draggedItem,
  dropCol,
  listEmpLabel,
}: {
  open: boolean
  setOpen: any
  data: any
  setData: any
  draggedItem: any
  dropCol: any
  listEmpLabel: any
}) {
  const [form] = Form.useForm()
  const [detailsCan, setDetailsCan] = useState({
    id: -1,
  })

  const router = useRouter()

  const onFinish = () => {
    form.validateFields().then((value: any) => {
      if (detailsCan?.id !== -1) {
        // console.log(form.getFieldValue('contentsend').get)
        const configValue = {
          ...value,
          epOffer: 112,
          timeSendCv: dayjs(form.getFieldValue('timeSendCv')).format(
            'YYYY-MM-DD'
          ),
          canId: detailsCan?.id,
          listSkill: JSON.stringify(value['listSkill']),
        }
        const fd = new FormData()
        Object.keys(configValue)?.forEach((key) => {
          fd.append(key, configValue[key])
        })
        switch (dropCol?.title) {
          case 'Trượt':
            // console.log("Trượt");
            fd.append('type', '1')
            POST_HR('api/hr/recruitment/FailJob', fd)
              .then((res) => {
                if (res?.result === true) {
                  setOpen(false)
                  router.reload()
                }
              })
              .catch((err) => console.error(err))
            break
          case 'Nhận việc':
            // console.log("Nhận việc");

            POST_HR('api/hr/recruitment/addCandidateGetJob', fd)
              .then((res) => {
                if (res?.result === true) {
                  setOpen(false)
                  router.reload()
                }
              })
              .catch((err) => console.error(err))
            break
          case 'Hủy':
            // console.log("Hủy");
            fd.append('status', '1')
            POST_HR('api/hr/recruitment/cancelJob', fd)
              .then((res) => {
                if (res?.result === true) {
                  setOpen(false)
                  router.reload()
                }
              })
              .catch((err) => console.error(err))
            break
          case 'Ký hợp đồng':
            // console.log("Ký hợp đồng");
            fd.append(
              'offerTime',
              dayjs(form.getFieldValue('offerTime')).format('YYYY-MM-DD')
            )

            POST_HR('api/hr/recruitment/contactJob', fd)
              .then((res) => {
                if (res?.result === true) {
                  setOpen(false)
                  router.reload()
                }
              })
              .catch((err) => console.error(err))
            break
          default:
            // Các giai đoạn customize
            fd.append('processInterviewId', dropCol?.id)
            fd.append('checkEmail', '1')
            POST_HR('api/hr/recruitment/scheduleInter', fd)
              .then((res) => {
                if (res?.result === true) {
                  setOpen(false)
                  router.reload()
                }
              })
              .catch((err) => console.error(err))
            break
        }
      }
    })
  }

  const Skills = ({
    name,
    title,
    required,
  }: {
    name: string
    title: string
    required: boolean
  }) => {
    return (
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restFields }) => (
              <Space
                key={key}
                direction='horizontal'
                align='center'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Form.Item name={[name, 'id']}></Form.Item>
                <Form.Item name={[name, 'skillName']} required={true}>
                  <Input placeholder='Tên kỹ năng' className={styles.input} />
                </Form.Item>

                <Form.Item name={[name, 'skillVote']} required={true}>
                  <Rate style={{ display: 'flex', alignItems: 'center' }} />
                </Form.Item>
                <Image
                  alt='/'
                  src={'/remove-icon.png'}
                  width={24}
                  height={24}
                  onClick={() => remove(name)}
                  style={{ marginLeft: '10px', marginBottom: '5px' }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button onClick={() => add()} className={styles.btn}>
                <p style={{ color: '#4C5BD4', marginRight: '10px' }}>+</p>
                <p style={{ color: '#4C5BD4' }}>Thêm kỹ năng</p>
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    )
  }

  useEffect(() => {
    if (draggedItem?.canId) {
      POST_HR('api/hr/recruitment/listCandi', {
        canId: draggedItem?.canId,
      })
        .then((res) => {
          console.log(res)
          if (_.isEmpty(res?.data?.[0]?.listSkill)) {
            setDetailsCan({
              ...res?.data?.[0],
              timeSendCv: dayjs(res?.data?.[0]?.createdAt?.substring(0, 10)),
            })
            form.setFieldsValue({
              ...res?.data?.[0],
              listSkill: [
                { skillName: '', skillVote: 0 },
                { skillName: '', skillVote: 0 },
              ],
              timeSendCv: dayjs(res?.data?.[0]?.createdAt?.substring(0, 10)),
            })
          } else {
            setDetailsCan({
              ...res?.data?.[0],
              timeSendCv: dayjs(res?.data?.[0]?.createdAt?.substring(0, 10)),
            })
            form.setFieldsValue({
              ...res?.data?.[0],
              timeSendCv: dayjs(res?.data?.[0]?.createdAt?.substring(0, 10)),
            })
          }
        })
        .catch((err) => console.error(err))
    }
  }, [form, draggedItem])

  const children = (
    <Form form={form}>
      {MyInput('Tên ứng viên', 'Nhập tên ứng viên', true, true, 'name')}
      {MyInput('Nguồn ứng viên', 'Nhập nguồn ứng viên', true, true, 'cvFrom')}
      {MySelect(
        'Tên nhân viên tuyển dụng',
        'Nhập tên nhân viên tuyển dụng',
        true,
        true,
        'userHiring',
        listEmpLabel
      )}
      {MySelect(
        'Vị trí tuyển dụng',
        'Nhập vị trí tuyển dụng',
        true,
        true,
        'recruitmentNewsId',
        [{ label: 'Nhân viên nhập liệu', value: 187 }]
      )}
      {/* {MyInput(
        "Thời gian gửi hồ sơ",
        "Nhập thời gian gửi hồ sơ",
        true,
        true,
        "timeSendCv"
      )} */}

      <Form.Item
        name={'timeSendCv'}
        label={<p>Thời gian gửi hồ sơ</p>}
        labelCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: 'Trường này là bắt buộc',
          },
        ]}>
        <DatePicker
          size='large'
          className={styles.datePicker}
          format={'YYYY-MM-DD'}
        />
      </Form.Item>

      <MyRating
        hasLabel={true}
        name='starVote'
        required={true}
        title='Đánh giá hồ sơ'
      />
      <Skills name='listSkill' title='' required={true} />
      {MyInput(
        'Mức lương mong muốn',
        'Nhập mức lương mong muốn',
        true,
        true,
        'resiredSalary'
      )}
      {MyInput('Mức lương thực', 'Nhập mức lương thực', true, true, 'salary')}
      {dropCol?.id || dropCol?.title === 'Nhận việc' ? (
        <>
          <Form.Item
            name={'interviewTime'}
            label={<p>Thời gian phỏng vấn</p>}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc',
              },
            ]}>
            <DatePicker
              size='large'
              className={styles.datePicker}
              format={'YYYY-MM-DD'}
            />
          </Form.Item>
          {MySelect(
            'Nhân viên phỏng vấn',
            'Chọn nhân viên phỏng vấn',
            true,
            true,
            'empInterview',
            listEmpLabel
          )}
        </>
      ) : (
        MyInput('Thời gian hẹn', 'dd/mm/YYYY', true, true, 'epOffer')
      )}
      {/* {MySelect(
        "Nhân viên tham gia",
        "Chọn nhân viên",
        true,
        true,
        "userHiring",
        listEmpLabel
      )} */}
      {dropCol?.title === 'Ký hợp đồng' ? (
        <Form.Item
          name={'offerTime'}
          label={<p>Thời gian ký hợp đồng</p>}
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: 'Trường này là bắt buộc',
            },
          ]}>
          <DatePicker
            size='large'
            className={styles.datePicker}
            format={'YYYY-MM-DD'}
          />
        </Form.Item>
      ) : (
        <></>
      )}
      <MyTextArea
        name='note'
        hasLabel={true}
        placeholder='Nhập ghi chú'
        required={true}
        title='Ghi chú'
      />
      {MyInput('Gửi email đến', 'Nhập email gửi đến', true, true, 'email')}
      <Form.Item required label={<p>Gửi email</p>} name={'isSentToParticipant'}>
        <Checkbox style={{ marginLeft: '20px' }}>
          <p>Gửi Email tới ứng viên</p>
        </Checkbox>
      </Form.Item>
      <MyEditor
        data={''}
        name='contentsend'
        onChange={() => null}
        required={false}
        title=''
        form={form}
      />
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Chuyển trạng thái',
    'Đồng ý',
    () => onFinish()
  )
}

export function AddNewCandiModal({
  open,
  setOpen,
  listEmpLabel,
}: {
  open: boolean
  setOpen: any
  listEmpLabel: any
}) {
  const [form] = Form.useForm()
  const [fileCv, setFileCv] = useState('cv')

  const defaultValue = {
    listSkill: [
      {
        skillName: '',
        skillVote: 0,
      },
      {
        skillName: '',
        skillVote: 0,
      },
    ],
  }

  const onFinish = () => {
    form.validateFields().then((value: any) => {
      const fileCvFormData = new FormData()
      fileCvFormData.append('file', fileCv)
      const formSubmit = {
        ...value,
        birthday: dayjs(form.getFieldValue('birthday')).format('YYYY-MM-DD'),
        timeSendCv: dayjs(form.getFieldValue('timeSendCv')).format(
          'YYYY-MM-DD'
        ),
        cv: JSON.stringify(fileCvFormData),
        listSkill: JSON.stringify(form.getFieldValue('listSkill')),
      }
      // console.log(fileCv)
      // console.log(formSubmit)
      // axios.toFormData(formSubmit)
      POST_HR('api/hr/recruitment/createCandidate', formSubmit).then((res) => {
        if (res?.result === true) {
          alert('Bạn đã thêm ứng viên thành công!')
          setOpen(false)
          form.resetFields()
        }
      })
    })
  }

  const Skills = ({
    name,
    title,
    required,
  }: {
    name: string
    title: string
    required: boolean
  }) => {
    return (
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restFields }) => (
              <Space
                key={key}
                direction='horizontal'
                align='center'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Form.Item name={[name, 'skillName']} required={true}>
                  <Input placeholder='Tên kỹ năng' className={styles.input} />
                </Form.Item>

                <Form.Item name={[name, 'skillVote']} required={true}>
                  <Rate style={{ display: 'flex', alignItems: 'center' }} />
                </Form.Item>
                <Image
                  alt='/'
                  src={'/remove-icon.png'}
                  width={24}
                  height={24}
                  onClick={() => remove(name)}
                  style={{ marginLeft: '10px', marginBottom: '5px' }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button onClick={() => add()} className={styles.btn}>
                <p style={{ color: '#4C5BD4', marginRight: '10px' }}>+</p>
                <p style={{ color: '#4C5BD4' }}>Thêm kỹ năng</p>
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    )
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    setFileCv(e?.fileList[0]?.originFileObj)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const children = (
    <Form form={form} initialValues={defaultValue}>
      {MyInput('Tên ứng viên', 'Nhập tên ứng viên', true, true, 'name')}
      {MyInput('Email', 'Nhập Email', true, true, 'email')}
      {/* {MyInput("Tài khoản", "Nhập số điện thoại", true, true, "phoneTK")} */}
      {MyInput('Số điện thoại', 'Nhập số điện thoại', true, true, 'phone')}
      {MySelect('Giới tính', 'Nhập Giới tính', true, true, 'gender', [
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 2 },
        { label: 'Khác', value: 3 },
      ])}
      <Form.Item
        name={'birthday'}
        label={<p>Ngày sinh</p>}
        labelCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: 'Trường này là bắt buộc',
          },
        ]}>
        <DatePicker
          size='large'
          className={styles.datePicker}
          format={'YYYY-MM-DD'}
        />
      </Form.Item>
      {MyInput('Quê quán', 'Nhập Quê quán', true, true, 'hometown')}
      {MySelect(
        'Trình độ học vấn',
        'Nhập Trình độ học vấn',
        true,
        true,
        'education',
        [
          { label: 'Tốt nghiệp cấp 3', value: 1 },
          { label: 'Tốt nghiệp đại học', value: 2 },
          { label: 'Khác', value: 3 },
        ]
      )}
      {MyInput('Trường học', 'Nhập Trường học', true, true, 'school')}
      {MySelect(
        'Kinh nghiệm làm việc',
        'Nhập Kinh nghiệm làm việc',
        true,
        true,
        'exp',
        [
          { label: 'Chưa có kinh nghiệm', value: 1 },
          { label: 'Kinh nghiệm dưới 1 năm', value: 2 },
          { label: 'Kinh nghiệm trên 1 năm', value: 3 },
        ]
      )}
      {MySelect(
        'Tình trạng hôn nhân',
        'Nhập Tình trạng hôn nhân',
        true,
        true,
        'isMarried',
        [
          { label: 'Chưa kết hôn', value: 1 },
          { label: 'Đã kết hôn', value: 2 },
        ]
      )}
      {MyInput('Địa chỉ', 'Nhập Địa chỉ', true, true, 'address')}
      {MyInput('Nguồn ứng viên', 'Nhập Nguồn ứng viên', true, true, 'cvFrom')}
      {MySelect(
        'Tên nhân viên tuyển dụng',
        'Nhập Tên nhân viên tuyển dụng',
        true,
        true,
        'userHiring',
        listEmpLabel
      )}
      {MySelect(
        'Tên nhân viên giới thiệu',
        'Chọn nhân viên giới thiệu',
        true,
        true,
        'userRecommend',
        listEmpLabel
      )}
      {MySelect('Vị trí', 'Chọn vị trí', true, true, 'recruitmentNewsId', [
        { label: 'Nhân viên nhập liệu', value: 187 },
        { label: 'TTS NodeJS', value: 188 },
        { label: 'PHP', value: 189 },
      ])}
      <Form.Item
        name={'timeSendCv'}
        label={<p>Thời gian gửi hồ sơ</p>}
        labelCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: 'Trường này là bắt buộc',
          },
        ]}>
        <DatePicker
          size='large'
          className={styles.datePicker}
          format={'YYYY-MM-DD'}
        />
      </Form.Item>
      <MyRating
        hasLabel={true}
        name='firstStarVote'
        required={false}
        title='Đánh giá hồ sơ'
      />
      <>
        <p style={{ marginBottom: '10px' }}>Kỹ năng:</p>
        <Skills name='listSkill' title='' required={true} />
      </>
      <Form.Item
        name={'cv'}
        label={<p>Tải lên tệp CV</p>}
        labelCol={{ span: 24 }}
        // required
        valuePropName='fileList'
        getValueFromEvent={normFile}>
        <Upload name='file' accept='*' beforeUpload={() => false}>
          <Button icon={<UploadOutlined rev={null} />}>Click to upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Thêm mới ứng viên',
    'Thêm mới',
    () => onFinish()
  )
}

export function ConfirmDeleteModal(
  open: boolean,
  setOpen: Function,
  name: string,
  data: any,
  setData: Function
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
      <p style={{ marginTop: '20px' }}>
        Bạn có chắc chắn muốn xóa chuyển công tác này không ?
      </p>
    </div>
  )

  const onConfirm = () => {
    setData(data?.filter((item: any) => item['name'] !== name))
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Xóa phòng ban',
    'Đồng ý',
    onConfirm
  )
}
