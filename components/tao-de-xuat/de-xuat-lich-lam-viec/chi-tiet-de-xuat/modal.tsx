import { List, Modal } from 'antd'
import styles from './modal.module.css'
import { useEffect, useState } from 'react'
import { GET, POST } from '@/pages/api/BaseApi'

export const ModalDetailsLLV = ({ open, setOpen, data, shiftType }) => {
  const [month, setMonth] = useState<any>(dates(new Date(data?.[0]?.date)))
  const [listShifts, setListShifts] = useState([])
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

  useEffect(() => {
    const getData = async () => {
      const res = await GET('api/qlc/shift/list')

      if (res?.result) {
        setListShifts(res?.items)
      }
    }
    getData()
  }, [])

  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString('default', { year: 'numeric' })
    const month = date?.toLocaleString('default', { month: '2-digit' })
    const day = date?.toLocaleString('default', { day: '2-digit' })

    return [year, month, day].join('-')
  }

  const children = (
    <div>
      <List
        className={styles.list}
        header={
          <div className={styles.header}>
            <div className={styles.big}>
              <div className={styles.dayName}>Chủ nhật</div>
              <div className={styles.dayName}>Thứ hai</div>
              <div className={styles.dayName}>Thứ ba</div>
              <div className={styles.dayName}>Thứ tư</div>
              <div className={styles.dayName}>Thứ năm</div>
              <div className={styles.dayName}>Thứ sáu</div>
              <div className={styles.dayName}>Thứ bảy</div>
            </div>
            <div className={styles.small}>
              <div className={styles.dayName}>CN</div>
              <div className={styles.dayName}>T2</div>
              <div className={styles.dayName}>T3</div>
              <div className={styles.dayName}>T4</div>
              <div className={styles.dayName}>T5</div>
              <div className={styles.dayName}>T6</div>
              <div className={styles.dayName}>T7</div>
            </div>
          </div>
        }
        grid={{
          column: 7,
        }}
        dataSource={month?.map((d: any) => d)}
        renderItem={(item: any, index: number) => {
          // console.log(listCheck)
          // console.log(allCheck)
          return (
            <List.Item key={index}>
              <div className={styles.tableDetailsLLVItem}>
                {item?.getMonth() === new Date(data?.[0]?.date)?.getMonth() && (
                  <div className={styles.itemWrapper}>
                    <p className={styles.dateNumber}>{item?.getDate()}</p>
                    {data?.find(
                      (detail) => detail?.date === formatDate(item)
                    ) &&
                      data
                        ?.find((detail) => detail?.date === formatDate(item))
                        ?.shift_id?.split(',')
                        ?.map((shiftItem, index) => {
                          return (
                            <div key={index} className={styles.shiftItem}>
                              <p className={styles.shiftTxt}>
                                {listShifts &&
                                  listShifts?.find(
                                    (item: any) =>
                                      item?.shift_id?.toString() ===
                                      shiftItem?.toString()
                                  )?.shift_name}
                              </p>
                            </div>
                          )
                        })}
                  </div>
                )}
              </div>
            </List.Item>
          )
        }}
      />
    </div>
  )

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      destroyOnClose={true}
      footer={null}
      className={`modalTableDetailsLLV ${styles.modalDetailsLLV}`}>
      <div className={`tableDetailsLLVScrollCus ${styles.tableDetailsLLV}`}>
        {children}
      </div>
    </Modal>
  )
}
