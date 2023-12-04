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
  Rate,
  Select,
  Space,
} from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import styles from './modal.module.css'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { POST_HR } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import { DXFileInput } from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'

const MyEditor = dynamic(() => import('@/components/commons/CkEditor'), {
  ssr: false,
})

export function UpdateAttendantInfoModal({
  open,
  setOpen,
  data,
  setData,
  listEmpLabel,
}: {
  open: boolean
  setOpen: any
  data: any
  setData: any
  listEmpLabel: any
}) {
  const [form] = Form.useForm()
  const router = useRouter()
  const [file, setFile] = useState<any>()
  const id = router?.query?.id || null

  useEffect(() => {
    form.setFieldsValue({
      ...data,
      timeSendCv: dayjs(data?.timeSendCv?.substring(0, 10)),
    })
  }, [form, data])

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

  const hanldeSubmit = () => {
    form.validateFields().then((value: any) => {
      const body = {
        ...value,
        birthday: dayjs(value['birthday'])?.format('YYYY-MM-DD'),
        timeSendCv: dayjs(value['timeSendCv'])?.format('YYYY-MM-DD'),
        listSkill: JSON.stringify(value['listSkill']),
        candidateId: id,
      }

      const fd = new FormData()
      Object.keys(body).forEach((key) => {
        fd.append(key, body[key])
      })

      if (file) {
        fd.append('cv', file)
      }

      POST_HR('api/hr/recruitment/updateCandidate', fd).then((res) => {
        if (res?.result === true) {
          setOpen(false)
          router.reload()
        }
      })
    })
  }

  const children = (
    <Form form={form} initialValues={{ isSentToParticipant: 0 }}>
      {/* {MyInput("Tên ứng viên", "Nhập tên ứng viên", true, true, "name")}
      {MyInput("Email", "Nhập Email", true, true, "email")}
      {MyInput("Số điện thoại", "Nhập Số điện thoại", true, true, "phone")}
      {MySelect("Giới tính", "Nhập Giới tính", true, true, "gender")}
      {MyInput("Ngày sinh", "Nhập Ngày sinh", true, true, "birthday")}
      {MyInput("Quê quán", "Nhập Quê quán", true, true, "hometown")}
      {MySelect(
        "Trình độ học vấn",
        "Nhập Trình độ học vấn",
        true,
        true,
        "education"
      )}
      {MyInput("Trường học", "Nhập Trường học", true, true, "school")}
      {MySelect(
        "Kinh nghiệm làm việc",
        "Nhập tên nhân viên tuyển dụng",
        true,
        true,
        "exp"
      )}
      {MySelect(
        "Tình trạng hôn nhân",
        "Nhập tên nhân viên tuyển dụng",
        true,
        true,
        "isMarried"
      )}
      {MyInput("Địa chỉ", "Nhập Địa chỉ", true, true, "address")}
      {MyInput("Nguồn ứng viên", "Nhập nguồn ứng viên", true, true, "cvFrom")}
      {MySelect(
        "Tên nhân viên tuyển dụng",
        "Nhập tên nhân viên tuyển dụng",
        true,
        true,
        "userHiring"
      )}
      {MySelect(
        "Tên nhân viên giới thiệu",
        "Nhập tên nhân viên giới thiệu",
        true,
        true,
        "userRecommend"
      )}
      {MySelect(
        "Vị trí tuyển dụng",
        "Nhập vị trí tuyển dụng",
        true,
        true,
        "Recruitment"
      )}
      <Form.Item
        name={"timeSendCv"}
        label={<p>Thời gian gửi hồ sơ</p>}
        rules={[
          {
            required: true,
            message: "Trường này là bắt buộc"
          }
        ]}
      >
        <DatePicker className={styles.datePicker} size="large" />
      </Form.Item>
      <MyRating
        hasLabel={true}
        name="starVote"
        required={true}
        title="Đánh giá hồ sơ"
      />
      <Skills name="listSkill" title="" required={true} />
       */}
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
      {MyInput('Thời gian hẹn', 'dd/mm/YYYY', true, true, 'epOffer')}
      {/* {MySelect(
        "Nhân viên tham gia",
        "Chọn nhân viên",
        true,
        true,
        "userHiring",
        listEmpLabel
      )} */}

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

      <DXFileInput setFileData={setFile} label='Tải lên tệp CV' />
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    'Chỉnh sửa hồ sơ ứng viên',
    'Cập nhật',
    hanldeSubmit
  )
}
