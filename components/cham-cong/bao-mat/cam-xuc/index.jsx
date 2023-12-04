import React, { useEffect, useState } from 'react'
import styles from './cx.module.scss'
import Image from 'next/image'
import { POST } from '@/pages/api/BaseApi'
import { Button, Form, Input, InputNumber } from 'antd'
import { useRouter } from 'next/router'
import { ModalWrapper } from '@/components/modal/ModalWrapper'
import { DeleteOutlined } from '@ant-design/icons'

const ModalAdd = ({ open, setOpen, reload, setReload }) => {
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = async () => {
    form.validateFields().then(async (val) => {
      const res = await POST('api/qlc/emotions/create', val)
      if (res?.result) {
        window.alert('Thêm mới cảm xúc thành công')
        // router.reload()
        form.resetFields()
        setOpen(false)
        setReload(!reload)
      }
    })
  }

  const children = (
    <Form form={form}>
      <Form.Item name={'min_score'} label='Từ' labelCol={{ span: 24 }} required>
        <InputNumber
          step={0.1}
          precision={2}
          size='large'
          min={0}
          max={10}
          placeholder='Từ'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={'max_score'}
        step={0.1}
        precision={2}
        label='Đến'
        required
        labelCol={{ span: 24 }}>
        <InputNumber
          size='large'
          min={0}
          max={10}
          placeholder='Đến'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={'emotion_detail'}
        required
        label='Thông tin cảm xúc'
        labelCol={{ span: 24 }}>
        <Input placeholder='Thông tin cảm xúc' style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    'Thêm mới cảm xúc',
    'Thêm mới',
    onFinish
  )
}

const CauHinh = () => {
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState(false)
  const [avgPass, setAvgPass] = useState()
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getToggleData = async () => {
      const res = await POST('api/qlc/emotions/getToggleEmotion', {})

      if (res?.result) {
        setChecked(res?.data?.emotion_active)
      }
    }

    getToggleData()
  }, [])

  const handleChange = async () => {
    const res = await POST('api/qlc/emotions/toggleOnOff', {})

    if (res?.result) {
      setChecked(res?.emotion_setting)
    }
  }

  const [listData, setListData] = useState([])

  useEffect(() => {
    const getList = async () => {
      const res = await POST('api/qlc/emotions/list', {})

      if (res?.result) {
        setListData(res?.list)
        setAvgPass(res?.list?.[0]?.avg_pass_score)
      }
    }

    getList()
  }, [reload])

  const onChangeAvg = async () => {
    const res = await POST('api/qlc/emotions/updateMinScore', {
      avg_score: avgPass,
    })

    if (res?.result) {
      window.alert('Cập nhật thành công')
      setReload(!reload)
    }
  }

  const SingleItem = ({ min, max, detail, id, reload, setReload }) => {
    const [minD, setMin] = useState(min)
    const [maxD, setMax] = useState(max)
    const [detailD, setDetail] = useState(detail)
    const router = useRouter()
    const onUpdate = async () => {
      console.log(minD + '-----------' + maxD, detailD)

      const res = await POST('api/qlc/emotions/update', {
        emotion_id: id,
        emotion_detail: detailD,
        min_score: minD,
        max_score: maxD,
      })

      if (res?.result) {
        window.alert('Cập nhật thông tin cảm xúc thành công')
        setReload(!reload)
      }
    }

    const onDelete = async () => {
      const res = await POST('api/qlc/emotions/delete', {
        emotion_id: id,
      })

      if (res?.result) {
        window.alert('Xoá thông tin cảm xúc thành công')
        setReload(!reload)
      }
    }

    return (
      <div className={styles.khoi_form} key={id}>
        <div className={styles.khoi_flex}>
          <div className={styles.form_left}>
            <div className={styles.khoi_label}>
              <div className={styles.left_text}>Thang điểm cảm xúc </div>
              <div className={styles.khoi_button_dele} onClick={onDelete}>
                {/* <Image src='/img/Xoa.png' height={20} width={20} alt='' /> */}
                <DeleteOutlined />
              </div>
            </div>
            <div className={styles.khoi_form_con}>
              <div className={styles.khoi_form_con_top}>
                <div className={styles.khoi_label_con}>
                  <div className={styles.label_con}>Điểm cảm xúc</div>
                </div>
                <div className={styles.khoi_input_con}>
                  <div className={styles.text_from}>Từ</div>
                  <input
                    type='text'
                    className={styles.text_number}
                    defaultValue={minD}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className={styles.khoi_input_con}>
                  <div className={styles.text_from}>Đến</div>
                  <input
                    type='text'
                    className={styles.text_number}
                    defaultValue={maxD}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.khoi_form_con_bottom}>
                <div className={styles.khoi_label_con}>
                  <div className={styles.label_con}>Nội dung hiển thị</div>
                </div>
                <div className={styles.khoi_input_con_2}>
                  <input
                    type='text'
                    placeholder='Tâm trạng của bạn đang rất tệ'
                    defaultValue={detailD}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button style={{ backgroundColor: '#4c5bd4' }} onClick={onUpdate}>
          <p style={{ color: '#fff' }}>Cập nhật</p>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className={styles.status}>
        <div className={styles.status_top}>
          <div className={styles.top_content}>
            <div className={styles.btn_hide}>
              <input
                type='checkbox'
                id='volumeCheckbox'
                className='toggle-switch'
                checked={checked}
                onChange={handleChange}
              />
              <label htmlFor='volumeCheckbox'></label>

              <style jsx>{`
                .toggle-switch {
                  display: none;
                }

                label {
                  display: inline-block;
                  width: 60px;
                  height: 30px;
                  border-radius: 15px;
                  background-color: gray;
                  position: relative;
                  transition: background-color 0.3s;
                  cursor: pointer;
                }

                label::before {
                  content: '';
                  position: absolute;
                  top: 1px;
                  left: 1px;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background-color: white;
                  transition: left 0.3s;
                }

                #volumeCheckbox:checked + label {
                  background-color: #12dd00;
                }

                #volumeCheckbox:checked + label::before {
                  left: 31px;
                }
              `}</style>
            </div>
            <div className={styles.status_text}>
              {`Nhân viên chấm công sẽ có 7 loại cảm xúc, bao gồm: tức giận, ghê sợ,lo sợ, buồn bã, bình thường, vui vẻ, ngạc nhiên, tổng 7 loại được được bạn định nghĩa bằng câu thoại bên dưới:`}
            </div>
          </div>
        </div>
        <div className={styles.status_form}>
          {listData?.map((item) => (
            <SingleItem
              min={item?.min_score}
              max={item?.max_score}
              detail={item?.emotion_detail}
              id={item?.emotion_id}
              reload={reload}
              setReload={setReload}
            />
          ))}
          <div className={styles.khoi_button_add}>
            <div
              className={styles.status_button}
              onClick={() => {
                if (listData.length >= 7) {
                  window.alert('Giới hạn là 7 thang điểm cảm xúc')
                } else {
                  setOpen(true)
                }
              }}>
              <Image src='/plus_circle.png' height={20} width={20} alt='' />
              <div className={styles.status_button_text}>Thêm thang điểm</div>
            </div>
          </div>
        </div>
        <div className={styles.status_bottom}>
          <div className={styles.form_left}>
            <div className={styles.khoi_label}>
              <div className={styles.left_text}>
                Điểm chuẩn cảm xúc ghi nhận công (nhân viên có mức điểm cảm xúc
                thấp hơn mức được cài đặt sẽ được yêu cầu chấm công lại)
              </div>
            </div>
            <div className={styles.khoi_form_con}>
              <div className={styles.khoi_form_con_bottom}>
                <div className={styles.khoi_label_con}>
                  <div className={styles.label_con}>Điểm cảm xúc</div>
                </div>
                <div className={styles.khoi_input_con_2}>
                  <input
                    type='number'
                    placeholder='0'
                    defaultValue={avgPass}
                    onChange={(v) => setAvgPass(v.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.khoi_button}>
          <div className={styles.btn_huy}>
            <div className={styles.btn_huy_text}>Hủy</div>
          </div>
          <div className={styles.btn_luu} onClick={onChangeAvg}>
            <div className={styles.btn_luu_text}>Lưu</div>
          </div>
        </div>
      </div>
      <ModalAdd
        open={open}
        setOpen={setOpen}
        reload={reload}
        setReload={setReload}
      />
    </>
  )
}

export default CauHinh
