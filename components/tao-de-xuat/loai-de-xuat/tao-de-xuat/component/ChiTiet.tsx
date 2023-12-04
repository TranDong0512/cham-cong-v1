import Image from 'next/image'

import styles from './ChiTiet.module.css'
import { Button, Form, Input, Select, Upload } from 'antd'
import { POST_VT } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'

export const GroupButton = (
  admin: boolean,
  type: number,
  overtime: boolean,
  typeRef?: any,
  dimensions?: any,
  className?: any
) => {
  const router = useRouter()
  const duyetDx = async (type, text) => {
    const id = router?.query?.['id']
    console.log(overtime)

    const res = await POST_VT('api/vanthu/editdx/edit_active', {
      _id: id,
      type: type,
    })
    console.log(res)
    alert(text)

    router.reload()
  }

  return (
    <>
      {type === 1 ? (
        <div className={styles.overTimeText} style={{ width: '100%' }}>
          <Image
            src={'/clearCircle-red.png'}
            alt=''
            width={20}
            height={20}></Image>
          <p>Đã từ chối</p>
        </div>
      ) : type === 3 ? (
        <div className={styles.overTimeText} style={{ width: '100%' }}>
          <Image
            src={'/clearCircle-red.png'}
            alt=''
            width={20}
            height={20}></Image>
          <p>Đã từ chối</p>
        </div>
      ) : overtime ? (
        <div className={styles.overTimeText}>
          <Image
            src={'/clearCircle-red.png'}
            alt=''
            width={20}
            height={20}></Image>
          <p>Đề xuất quá hạn duyệt</p>
        </div>
      ) : (
        <>
          {/* tiep nhan btn */}
          {type === 0 && (
            <>
              <div
                className={styles.companyAcceptText}
                onClick={() => duyetDx(6, 'Tiếp nhận đề xuất thành công')}>
                <Image
                  src={'/abortNew.png'}
                  alt=''
                  width={20}
                  height={20}></Image>
                <p>Đang chờ tiếp nhận</p>
              </div>
              <Button
                className={styles.acceptButton}
                onClick={() => duyetDx(6, 'Tiếp nhận đề xuất thành công')}>
                <Image
                  src={'/checkCircle.png'}
                  alt=''
                  width={20}
                  height={20}></Image>
                <p>Tiếp nhận</p>
              </Button>
            </>
          )}
          {/* accepted btn */}
          {type === 5 && (
            // <div className={styles[`${className}`]}>
            <div className={styles.acceptText}>
              <Image
                src={'/approveNew.png'}
                alt=''
                width={20}
                height={20}></Image>
              <p>Đã chấp thuận</p>
            </div>
            // </div>
          )}
          {/* wait for comp */}
          {type === 11 && (
            <div className={styles.companyAcceptText}>
              <Image
                src={'/abortNew.png'}
                alt=''
                width={20}
                height={20}></Image>
              <p>Đang chờ công ty duyệt !</p>
            </div>
          )}
          {type === 10 && (
            <div
              className={styles.companyAcceptText}
              style={{
                border: '1px solid red',
                borderRadius: '20px',
                marginBottom: '20px',
              }}>
              <Image
                src={'/abortNew.png'}
                alt=''
                width={20}
                height={20}></Image>
              <p>Chờ lãnh đạo còn lại duyệt !</p>
            </div>
          )}
          {/* render accept button */}
          {admin && (type === 7 || type === 10) && (
            <Button
              className={styles.acceptButton}
              onClick={() => duyetDx(1, 'Duyệt đề xuất thành công')}>
              <Image
                src={'/checkCircle.png'}
                alt=''
                width={20}
                height={20}></Image>
              <p>Chấp thuận</p>
            </Button>
          )}
          {/* render deny button */}
          {admin && !(type === 5) && !(type === 10) && (
            <Button
              className={styles.clearButton}
              onClick={() => duyetDx(2, 'Từ chối đề xuất thành công')}>
              <Image
                src={'/clearCircle.png'}
                alt=''
                width={20}
                height={20}></Image>
              <p>Từ chối</p>
            </Button>
          )}
          {/* render del btn */}
          {admin && (type === 5 || type === 10) && (
            <Button
              className={styles.clearButton}
              onClick={() => duyetDx(6, 'Hủy ')}>
              <Image
                src={'/clearCircle.png'}
                alt=''
                width={20}
                height={20}></Image>
              <p>Hủy duyệt</p>
            </Button>
          )}
        </>
      )}
      <Button className={styles.clearButton}>
        <Image src={'/clearCircle.png'} alt='' width={20} height={20}></Image>
        <p>Xóa đề xuất</p>
      </Button>
    </>
  )
}

export const MyInputMoney = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string
) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
      labelCol={{ span: 24 }}>
      <Input
        placeholder={placeholder}
        size='large'
        type='number'
        suffix={<p>VNĐ</p>}></Input>
    </Form.Item>
  )
}

export const MyInputFile = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string
) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
      labelCol={{ span: 24 }}>
      <Upload
        className={styles.containerUpload}
        style={{ width: '100%' }}
        showUploadList>
        <div className={styles.upload}>
          <p>{placeholder}</p>
          <Image alt='/' src={'/pon.png'} width={15} height={15} />
        </div>
      </Upload>
    </Form.Item>
  )
}
export const MyTime = (
  title: string,
  required: boolean,
  hasLabel: boolean,
  name: string
) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
      labelCol={{ span: 24 }}>
      <Input
        size='large'
        type='time'
        style={{ border: '1px solid #9F9F9F', width: '100%' }}
      />
    </Form.Item>
  )
}
export const MyDate = (
  title: string,
  required: boolean,
  hasLabel: boolean,
  name: string
) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
      labelCol={{ span: 24 }}>
      <Input
        size='large'
        type='date'
        style={{ border: '1px solid #9F9F9F', width: '100%' }}
      />
    </Form.Item>
  )
}

export const MySelectAcp = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string = '',
  options: Array<any> = [],
  defaultValue?: any
) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
      labelCol={{ span: 24 }}>
      <Select
        optionFilterProp="label"
        size='large'
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        suffixIcon={
          <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
        }
        mode='multiple'
        style={{
          width: '100%',
          border: '1px solid #9F9F9F',
          borderRadius: '10px',
        }}
      />
    </Form.Item>
  )
}
export function DeXuatCongCongFooter(creat: Function, cancel: Function) {
  return (
    <div className={styles.footer}>
      <Form.Item>
        <Button className={styles.buttonLeft} onClick={() => cancel()}>
          <p>Hủy</p>
        </Button>
      </Form.Item>
      <Form.Item>
        <Button className={styles.buttonRight} onClick={() => creat()}>
          <p>Tạo đề xuất</p>
        </Button>
      </Form.Item>
    </div>
  )
}
