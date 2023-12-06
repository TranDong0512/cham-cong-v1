import { POST } from '@/pages/api/BaseApi'
import styles from './sao-chep-lich.module.css'
import { Modal, Input, Checkbox, Button } from 'antd'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// const data = [
//   {
//     key: "1",
//     title: "Lịch làm việc tháng 6"
//   },
//   {
//     key: "2",
//     title: "Lịch làm việc test"
//   },
//   {
//     key: "3",
//     title: "Lịch làm việc test 2"
//   },
//   {
//     key: "4",
//     title: "Lịch làm việc test 3"
//   },
//   {
//     key: "5",
//     title: "Lịch làm việc test 4"
//   }
// ]

export function SaoChepLich(
  open: boolean,
  setOpen: Function,
  data: any[],
  dateFilter: any,
  setDataTotal: Function
) {
  const [listKeyCheck, setListKeyCheck]: any = useState([])
  const [listCyInMonth, setListCyInMonth]: any = useState(
    data?.map((cy) => ({ key: cy?.cy_id, title: cy?.cy_name }))
  )
  const [applyMonth, setApplyMonth]: any = useState('')
  const [applyYear, setApplyYear]: any = useState('')
  const router = useRouter()

  useEffect(() => {
    if (data?.length > 0) {
      setListCyInMonth(
        data.map((cy) => ({ key: cy?.cy_id, title: cy?.cy_name }))
      )
    } else {
      setListCyInMonth([])
    }
  }, [data])
  console.log(applyMonth)
  const handleSubmit = async () => {
    if (listKeyCheck.length > 0) {
      if (applyMonth !== '') {
        console.log(listKeyCheck)
        POST('api/qlc/cycle/copyList', {
          listIds: listKeyCheck.toString(),
          month: applyMonth,
        }).then((res) => {
          if (res?.result === true) {
            setDataTotal()
          }
        })
        window.alert("Thành công")
        //  Promise.all
        setOpen(false)
        // router.reload()
      } else {
        window.alert('Thieu ngay ap dung')
      }
    }
  }

  const onChange = (key: any) => {
    listKeyCheck.includes(key) === true
      ? setListKeyCheck(listKeyCheck.filter((data: any) => data !== key))
      : setListKeyCheck([...listKeyCheck, key])
  }
  const onChangeAll = () => {
    listKeyCheck.length === listCyInMonth.length
      ? setListKeyCheck([])
      : setListKeyCheck(listCyInMonth.map((cy) => cy.key))
  }
  const checked = (key: any): boolean =>
    listKeyCheck?.includes(key) === true ? true : false
  const checkedAll = (): boolean =>
    listKeyCheck?.length === listCyInMonth?.length ? true : false

  const List: any = (data: any) => (
    <>
      {data?.map((dt: any, index: number) => {
        return (
          <div key={index} className={styles.checkItem}>
            {dt.title}
            <Checkbox
              key={dt.key}
              checked={checked(dt.key)}
              onChange={() => onChange(dt.key)}></Checkbox>
          </div>
        )
      })}
    </>
  )
    
  
  return (
    <Modal
      open={open}
      onCancel={() =>{
        setApplyMonth()
        setListKeyCheck([])
        setOpen(false)}}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Sao chép lịch làm việc</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => {
            setApplyMonth()
            setListKeyCheck([])
            setOpen(false)}
          }
        />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyItem}>
          Chọn tháng áp dụng lịch làm việc
          <span style={{ color: 'red' }}>*</span>
          <Input
            value={applyMonth}
            onChange={(e) => setApplyMonth(e.target.value)}
            type='month'
            style={{ width: '100%' }}
            placeholder='Chọn tháng'></Input>
        </div>
        <div className={`${styles.bodyItem} ${styles.scrollbar}`}>
          <div className={styles.sticky}>
            <div>
              <p style={{ color: '#fff' }}>
                Lịch làm việc tháng {dateFilter?.substring(5)}/
                {dateFilter?.substring(0, 4)}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ color: '#fff' }}>Chọn tất cả </p>
              <Checkbox
                key={'All'}
                checked={checkedAll()}
                onChange={onChangeAll}
                style={{ marginLeft: '10px' }}></Checkbox>
            </div>
          </div>
          <div className={styles.checkbox_list}>{List(listCyInMonth)}</div>
        </div>
        <div className={styles.bodyItem}>
          <Button className={styles.button} onClick={handleSubmit}>
            <p className={styles.txt}>Lưu lại</p>
          </Button>
        </div>
        <div className={styles.Luuy}>
          Lưu ý: Những nhân viên đã được xét lịch làm việc trong tháng áp dụng
          sẽ không được cài đặt trong lịch làm việc sao chép này.
        </div>
      </div>
    </Modal>
  )
}
