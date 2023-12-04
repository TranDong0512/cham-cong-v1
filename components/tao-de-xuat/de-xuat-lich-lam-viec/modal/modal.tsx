import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  List,
  Menu,
  MenuProps,
  Modal,
  Space,
  TimePicker,
} from 'antd'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from './modal.module.css'
import _, { first } from 'lodash'
import Image from 'next/image'
import dayjs, { Dayjs } from 'dayjs'
import { POST_VT } from '@/pages/api/BaseApi'

const TYPE_NOTFULL = 'T2-T6'
const TYPE_MALFULL = 'T2-T7'
const TYPE_FULL = 'T2-CN'

function dates(current: any) {
  let month = new Array()
  let m = current.getMonth()
  current.setDate(current.getDate() - current.getDay())
  do {
    const date = new Date(current)
    date.setHours(7)
    month.push(date)
    current.setDate(current.getDate() + 1)
    //console.log(current)
  } while (current.getMonth() <= m || current.getDay() != 0)
  return month
}
function filterDate(item: Date, type: Number) {
  switch (type) {
    case 3:
      return true
    case 2:
      return item.getDay() === 0 ? false : true
    case 1:
      return item.getDay() === 0 || item.getDay() === 6 ? false : true
  }
}

export const MyTimePicker = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string,
  type?: any | '',
  bgColor?: string | '',
  disabled: boolean = false,
  handleChange?: Function
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
      label={hasLabel && <p>{title}</p>}
      labelCol={{ span: 24 }}>
      <TimePicker
        use12Hours
        format='hh:mm A'
        onChange={(value, timeStr) =>
          handleChange && handleChange(value, timeStr)
        }
        minuteStep={5}
        changeOnBlur={true}
        style={{
          border: '1px solid #9F9F9F',
          width: '100%',
          backgroundColor: `${bgColor}`,
        }}
        // placeholder={placeholder}
        disabled={disabled}
      />
    </Form.Item>
  )
}

export function TableLich({
  current,
  setCurrent,
  listCheck,
  setListCheck,
  openCheck,
  setOpenCheck,
  allCheck,
  setAllCheck,
  shiftLabel,
  data,
  form,
  isBlur,
  weekType,
  shiftType,
  listShiftSelected,
  listHours,
  setListHours,
  isAddHour,
  setIsAddHour,
  modalOkConfirm,
  setModalOkConfirm,
}: {
  current: any
  setCurrent: Function
  listCheck: any
  setListCheck: Function
  openCheck: any
  setOpenCheck: Function
  allCheck: any
  setAllCheck: Function
  shiftLabel: any
  data: any
  form: any
  isBlur: any
  weekType: any
  shiftType: any
  listShiftSelected: any
  listHours: any[]
  setListHours: Function
  isAddHour: boolean
  setIsAddHour: Function
  modalOkConfirm: boolean
  setModalOkConfirm: Function
}) {
  const [firstDate, setFirstDate]: any = useState(new Date(data?.apply_month))
  const [hourStartShift, setHourStartShift] = useState<Dayjs | null>(null)
  const [hourEndShift, setHourEndShift] = useState<Dayjs | null>(null)
  const [month, setMonth]: any = useState(
    dates(
      new Date(
        Number(data?.apply_month?.substring(0, 4)),
        Number(data?.apply_month?.substring(5, 7)) - 1,
        1
      )
    )
  )

  // const [date, setDate]:any = useState(new Date(2023,6,1))
  //console.log(new Date(data?.apply_month))

  const router = useRouter()

  // console.log(openCheck)

  const addHour = () => {
    hourStartShift &&
      hourEndShift &&
      setListHours([
        ...listHours,
        {
          time: `${hourStartShift} - ${hourEndShift}`,
        },
      ])
    setHourStartShift(null)
    setHourEndShift(null)
    form.setFieldValue('table-time-start-shift', null)
    form.setFieldValue('table-time-end-shift', null)
  }

  const removeHour = (index) => {
    setListHours(listHours?.filter((hour, i) => i !== index))
  }

  useEffect(() => {
    if (data?.apply_month) {
      setFirstDate(new Date(data?.apply_month))
      setMonth(
        dates(
          new Date(
            Number(data?.apply_month?.substring(0, 4)),
            Number(data?.apply_month?.substring(5, 7)) - 1,
            1
          )
        )
      )
      setCurrent(new Date(data?.apply_month))
    }
  }, [data])

  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString('default', { year: 'numeric' })
    const month = date?.toLocaleString('default', { month: '2-digit' })
    const day = date?.toLocaleString('default', { day: '2-digit' })

    return [year, month, day].join('-')
  }

  const Calender = (dates: any) => (
    <div className={styles.day}>
      <div>
        <List
          className={styles.list}
          header={
            <div className={styles.header}>
              <div className={styles.dayname}> CN</div>
              <div className={styles.dayname}>Thứ 2</div>
              <div className={styles.dayname}>Thứ 3</div>
              <div className={styles.dayname}>Thứ 4</div>
              <div className={styles.dayname}>Thứ 5</div>
              <div className={styles.dayname}>Thứ 6</div>
              <div className={styles.dayname}>Thứ 7</div>
            </div>
          }
          grid={{
            column: 7,
          }}
          dataSource={dates.map((d: any) => d)}
          renderItem={(item: any, index: number) => {
            const handleChangeCurrentDate = (e) => {
              isBlur ? null : setCurrent(item)
            }
            // console.log(listCheck)
            // console.log(allCheck)
            return (
              <List.Item key={index} style={{ padding: '10px 0' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <span
                    onClick={(e) => handleChangeCurrentDate(e)}
                    className={`${styles.cover} circleDate ${
                      styles[
                        _.isEqual(
                          `${item?.getDate()} ${item?.getMonth()}`,
                          `${current?.getDate()} ${current?.getMonth()}`
                        )
                          ? 'active'
                          : item >= firstDate &&
                            item.getMonth() ===
                              Number(data?.apply_month?.substring(5, 7) - 1) &&
                            filterDate(item, weekType)
                          ? 'choose'
                          : item.getMonth() ===
                              Number(data?.apply_month?.substring(5, 7) - 1) &&
                            filterDate(item, weekType)
                          ? 'overDay'
                          : item.getMonth() ===
                            Number(data?.apply_month?.substring(5, 7) - 1)
                          ? 'normal'
                          : 'disable'
                      ]
                    } ${
                      styles[
                        allCheck[formatDate(item)] &&
                        allCheck[formatDate(item)].length > 0
                          ? 'circleActive'
                          : 'circleBase'
                      ]
                    } `}>
                    <span className={styles.dateTxt}>{item.getDate()}</span>
                    <i className={styles.iconX}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='39'
                        height='30'
                        viewBox='0 0 39 26'
                        fill='none'>
                        <path
                          d='M36.4727 2L2.09766 24'
                          stroke='#FF3221'
                          strokeWidth='4'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M2.09766 2L36.4727 24'
                          stroke='#FF3221'
                          strokeWidth='4'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </i>
                  </span>
                  <span
                    className={`${
                      styles[
                        allCheck[formatDate(item)] &&
                        allCheck[formatDate(item)].length > 0 &&
                        _.isEqual(
                          `${item?.getDate()} ${item?.getMonth()}`,
                          `${current?.getDate()} ${current?.getMonth()}`
                        )
                          ? 'count_red'
                          : allCheck[formatDate(item)] &&
                            allCheck[formatDate(item)].length > 0
                          ? 'count_base'
                          : 'count_none'
                      ]
                    }`}>
                    {allCheck[formatDate(item)] &&
                      allCheck[formatDate(item)].length}
                  </span>
                </div>
              </List.Item>
            )
          }}
        />
      </div>
    </div>
  )
  const checkCa = () => {
    const handleSelectShift = async (key: string) => {
      listCheck?.includes(key)
        ? setListCheck(listCheck.filter((d: any) => d !== key))
        : setListCheck([...listCheck, key])
    }

    const checked = (key: any): boolean => listCheck?.includes(key)

    const checkComponent = (key: string, content: string) => (
      <li key={key}>
        <Checkbox
          key={key}
          className={styles.checkbox}
          onChange={() => handleSelectShift(key)}
          checked={checked(key)}></Checkbox>
        <span>{content}</span>
      </li>
    )

    return (
      <div style={{ marginTop: '20px' }}>
        {shiftType === 1 ? (
          <>
            <div className={styles.checkCaHeaderTxt}>
              Ca làm việc trong ngày {current?.getDate()}-
              {current?.getMonth() + 1}-{current?.getFullYear()}
            </div>
            <div>
              <ul className={styles.listli}>
                {shiftLabel?.map((d: any, index: number) =>
                  checkComponent(d?.value, d?.label)
                )}
              </ul>
            </div>
          </>
        ) : (
          <div className={styles.footerContent}>
            <div className={styles.checkCaHeaderTxt}>
              Thời gian làm việc trong ngày {current?.getDate()}-
              {current?.getMonth() + 1}-{current?.getFullYear()}
            </div>

            <div className={styles.footerListHour}>
              <div>
                {listHours?.map((time, index) => {
                  return (
                    <div key={index} className={styles.hourItem}>
                      <span>{`Thời gian làm việc ${index + 1} : ${
                        time?.time
                      }`}</span>
                      <i
                        className={styles.removeIcon}
                        onClick={() => removeHour(index)}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'>
                          <g clip-path='url(#clip0_1697_141552)'>
                            <circle cx='12' cy='12' r='12' fill='#FF5B4D' />
                            <path
                              d='M7 7L17 17'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                            />
                            <path
                              d='M17 7L7 17'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_1697_141552'>
                              <rect width='24' height='24' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </i>
                    </div>
                  )
                })}
              </div>
              <Divider className={styles.divider} />
              {/* <Button></Button> */}
              {isAddHour ? (
                <Form.Item style={{ marginTop: '20px', marginBottom: '0' }}>
                  {MyTimePicker(
                    'Thời gian bắt đầu',
                    '',
                    false,
                    true,
                    'table-time-start-shift',
                    '',
                    undefined,
                    false,
                    handleChangeHourStartShift
                  )}
                  {MyTimePicker(
                    'Thời gian kết thúc',
                    '',
                    false,
                    true,
                    'table-time-end-shift',
                    '',
                    undefined,
                    false,
                    handleChangeHourEndShift
                  )}
                  <div className={styles.btnFooterWrapper}>
                    <Button
                      onClick={() => setIsAddHour(false)}
                      className={styles.btnFooterCancelHour}>
                      <p style={{ color: '#4C5BD4' }}>Hủy</p>
                    </Button>
                    <Button
                      onClick={() => addHour()}
                      className={styles.btnFooterAddHour}>
                      <p style={{ color: '#fff' }}>Thêm</p>
                    </Button>
                  </div>
                </Form.Item>
              ) : (
                <Button
                  className={styles.btnConfirmAddHour}
                  onClick={() => setIsAddHour(true)}>
                  Thêm thời gian làm việc
                </Button>
              )}
            </div>

            <div className={styles.footerAddHour}></div>
          </div>
        )}
      </div>
    )
  }

  const handleSubmit = () => {
    // change typical allCheck data from {"2023-06-02": [12,13]} to [{date: "2023-06-02", shift_id: "12,13"}]
    const details = Object.entries(allCheck)
      .filter(
        (item) =>
          new Date(item[0]).getMonth() + 1 ===
          Number(data?.apply_month?.substring(5, 7))
      )
      .map((item: any) => {
        if (shiftType === 1) {
          if (item[1]?.length > 0) {
          return {
            date: item[0],
            shift_id: item[1]?.join(','),
          }
        }
        } else {
          return {
            date: item[0],
            hours: item[1]?.map((time) => time['time']),
          }
        }
      })
    // console.log(JSON.stringify([{ type: shiftType, data: details }]))
    // console.log({
    //   name_dx: form?.getFieldValue("name_dx"),
    //   id_user_duyet: form?.getFieldValue("id_user_duyet")?.join(","),
    //   id_user_theo_doi: form?.getFieldValue("id_user_theo_doi")?.join(","),
    //   ly_do: form?.getFieldValue("ly_do"),
    //   thang_ap_dung: dayjs(form?.getFieldValue("thang_ap_dung")).unix(),
    //   ngay_bat_dau: dayjs(form?.getFieldValue("ngay_bat_dau")).unix(),
    //   ngay_lam_viec: JSON.stringify([{ type: shiftType, data: details }]),
    //   ca_lam_viec: listShiftSelected?.join(","),
    // });
    form.validateFields().then((value) => {
      console.log(value)

      // Call api for create a new calendar for this employee
      !isBlur &&
        POST_VT('api/vanthu/dexuat/De_Xuat_Lich_Lam_Viec', {
          name_dx: form?.getFieldValue('name_dx'),
          id_user_duyet: form?.getFieldValue('id_user_duyet')?.join(','),
          id_user_theo_doi: form?.getFieldValue('id_user_theo_doi')?.join(','),
          ly_do: form?.getFieldValue('ly_do'),
          thang_ap_dung: dayjs(form?.getFieldValue('thang_ap_dung')).unix(),
          ngay_bat_dau: dayjs(form?.getFieldValue('ngay_bat_dau')).unix(),
          ngay_lam_viec: JSON.stringify([{ type: shiftType, data: details?.filter(item => item != null) }]),
          ca_lam_viec: listShiftSelected?.join(','),
          lich_lam_viec: value['lich_lam_viec'],
        }).then((res) => {
          if (res?.result === true) {
            setModalOkConfirm(true)
          }
        })
    })
  }

  const handleChangeHourStartShift = (value, timeStr) => {
    setHourStartShift(timeStr)
  }

  const handleChangeHourEndShift = (value, timeStr) => {
    setHourEndShift(timeStr)
  }

  return (
    <div className={`${styles.tableContent} tableLLV`}>
      <div className={`${styles['tableHeaderHour']}`}>
        <div className={styles.tableHeaderTxt}>
          Tháng {data?.apply_month?.substring(5, 7)}/
          {data?.apply_month?.substring(0, 4)}
        </div>
        {shiftType === 1 ? (
          <></>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button className={styles.btnHeaderHour} onClick={handleSubmit}>
              <p className={styles.buttonTxt}>Gửi đề xuất</p>
            </Button>
          </div>
        )}
      </div>
      <div>{Calender(month)}</div>
      <div style={{ fontSize: '16px' }}>{openCheck && checkCa()}</div>
      {shiftType === 1 ? (
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Button className={styles.btnFooterShift} onClick={handleSubmit}>
            <p className={styles.buttonTxt}>Gửi đề xuất</p>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export const MyMenuThemeColorMultiCheckbox = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string = '',
  options: Array<any> = [],
  values: any[] = [],
  setValues: any,
  openKeys: any,
  setOpenChange: any
) => {
  type MenuItem = Required<MenuProps>['items'][number]

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  const items: MenuItem[] = [
    getItem(placeholder, '1', <></>, [
      ...options?.map((op, index) =>
        getItem(
          op?.label,
          op?.value,
          <Checkbox
            key={index}
            id={op?.value}
            onClick={(e: any) => {
              e.stopPropagation()
              if (values?.includes(e?.target?.id)) {
                setValues(values?.filter((v) => v !== e?.target?.id))
              } else {
                setValues([...values, e?.target?.id])
              }
            }}
            checked={values.includes(op?.value)}></Checkbox>
        )
      ),
    ]),
  ]

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p>{title}</p>}
      labelCol={{ span: 24 }}>
      <Menu
        className={`${styles.menuSelect} multiSelectShift`}
        mode='inline'
        openKeys={openKeys}
        onOpenChange={setOpenChange}
        style={{ width: '100%' }}
        items={items}
      />
    </Form.Item>
  )
}

export const ModalOkConfirm = ({
  open,
  setOpen,
}: {
  open: any
  setOpen: any
}) => {
  const router = useRouter()
  const children = (
    <div style={{ padding: '20px 30px 8px 30px', textAlign: 'center' }}>
      <p className={styles.modalTxt}>Tạo thành công đề xuất lịch làm việc</p>
    </div>
  )

  return (
    <Modal
      bodyStyle={{ padding: '0px' }}
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      destroyOnClose={true}
      className={`${styles.modalChecked} ${styles.modalOkConfirm} modalAlertChose`}
      footer={
        <div className={styles.footerChecked}>
          <Button
            className={`${styles.okBtnModalOk}`}
            onClick={() => {
              setOpen(false)
              router.replace(router.asPath)
            }}>
            <p className={styles.txt}>OK</p>
          </Button>
        </div>
      }
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{
        style: { display: 'none' },
      }}>
      <div>{children}</div>
    </Modal>
  )
}

export const ModalAlertChooseShift = ({
  open,
  setOpen,
}: {
  open: any
  setOpen: any
}) => {
  const children = (
    <div style={{ padding: '20px 30px 8px 30px', textAlign: 'center' }}>
      <div className={styles.headerAlertContent}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'>
          <path
            d='M12 8V12M12 16H12.01M2 8.52274V15.4773C2 15.7218 2 15.8441 2.02763 15.9592C2.05213 16.0613 2.09253 16.1588 2.14736 16.2483C2.2092 16.3492 2.29568 16.4357 2.46863 16.6086L7.39137 21.5314C7.56432 21.7043 7.6508 21.7908 7.75172 21.8526C7.84119 21.9075 7.93873 21.9479 8.04077 21.9724C8.15586 22 8.27815 22 8.52274 22H15.4773C15.7218 22 15.8441 22 15.9592 21.9724C16.0613 21.9479 16.1588 21.9075 16.2483 21.8526C16.3492 21.7908 16.4357 21.7043 16.6086 21.5314L21.5314 16.6086C21.7043 16.4357 21.7908 16.3492 21.8526 16.2483C21.9075 16.1588 21.9479 16.0613 21.9724 15.9592C22 15.8441 22 15.7218 22 15.4773V8.52274C22 8.27815 22 8.15586 21.9724 8.04077C21.9479 7.93873 21.9075 7.84119 21.8526 7.75172C21.7908 7.6508 21.7043 7.56432 21.5314 7.39137L16.6086 2.46863C16.4357 2.29568 16.3492 2.2092 16.2483 2.14736C16.1588 2.09253 16.0613 2.05213 15.9592 2.02763C15.8441 2 15.7218 2 15.4773 2H8.52274C8.27815 2 8.15586 2 8.04077 2.02763C7.93873 2.05213 7.84119 2.09253 7.75172 2.14736C7.6508 2.2092 7.56432 2.29568 7.39137 2.46863L2.46863 7.39137C2.29568 7.56432 2.2092 7.6508 2.14736 7.75172C2.09253 7.84119 2.05213 7.93873 2.02763 8.04077C2 8.15586 2 8.27815 2 8.52274Z'
            stroke='#E8811A'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p className={styles.modalTxt}>Vui lòng chọn ca làm việc</p>
      </div>
    </div>
  )

  return (
    <Modal
      bodyStyle={{ padding: '0px' }}
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      destroyOnClose={true}
      className={`${styles.modalChecked} modalAlertChose`}
      footer={
        <div className={styles.footerChecked}>
          <Button
            className={`${styles.okBtnModalOk}`}
            onClick={() => {
              setOpen(false)
            }}>
            <p className={styles.txt}>OK</p>
          </Button>
        </div>
      }
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{
        style: { display: 'none' },
      }}>
      <div>{children}</div>
    </Modal>
  )
}

export const ModalAlertChooseTimeApply = ({
  open,
  setOpen,
}: {
  open: any
  setOpen: any
}) => {
  const children = (
    <div style={{ padding: '20px 30px 8px 30px', textAlign: 'center' }}>
      <div className={styles.headerAlertContent}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'>
          <path
            d='M12 8V12M12 16H12.01M2 8.52274V15.4773C2 15.7218 2 15.8441 2.02763 15.9592C2.05213 16.0613 2.09253 16.1588 2.14736 16.2483C2.2092 16.3492 2.29568 16.4357 2.46863 16.6086L7.39137 21.5314C7.56432 21.7043 7.6508 21.7908 7.75172 21.8526C7.84119 21.9075 7.93873 21.9479 8.04077 21.9724C8.15586 22 8.27815 22 8.52274 22H15.4773C15.7218 22 15.8441 22 15.9592 21.9724C16.0613 21.9479 16.1588 21.9075 16.2483 21.8526C16.3492 21.7908 16.4357 21.7043 16.6086 21.5314L21.5314 16.6086C21.7043 16.4357 21.7908 16.3492 21.8526 16.2483C21.9075 16.1588 21.9479 16.0613 21.9724 15.9592C22 15.8441 22 15.7218 22 15.4773V8.52274C22 8.27815 22 8.15586 21.9724 8.04077C21.9479 7.93873 21.9075 7.84119 21.8526 7.75172C21.7908 7.6508 21.7043 7.56432 21.5314 7.39137L16.6086 2.46863C16.4357 2.29568 16.3492 2.2092 16.2483 2.14736C16.1588 2.09253 16.0613 2.05213 15.9592 2.02763C15.8441 2 15.7218 2 15.4773 2H8.52274C8.27815 2 8.15586 2 8.04077 2.02763C7.93873 2.05213 7.84119 2.09253 7.75172 2.14736C7.6508 2.2092 7.56432 2.29568 7.39137 2.46863L2.46863 7.39137C2.29568 7.56432 2.2092 7.6508 2.14736 7.75172C2.09253 7.84119 2.05213 7.93873 2.02763 8.04077C2 8.15586 2 8.27815 2 8.52274Z'
            stroke='#E8811A'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p className={styles.modalTxt}>Vui lòng chọn tháng áp dụng</p>
      </div>
    </div>
  )

  return (
    <Modal
      bodyStyle={{ padding: '0px' }}
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      destroyOnClose={true}
      className={`${styles.modalChecked} modalAlertChose modalAlertChoseTime`}
      footer={
        <div className={styles.footerChecked}>
          <Button
            className={`${styles.okBtnModalOk}`}
            onClick={() => {
              setOpen(false)
            }}>
            <p className={styles.txt}>OK</p>
          </Button>
        </div>
      }
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{
        style: { display: 'none' },
      }}>
      <div>{children}</div>
    </Modal>
  )
}
