import React from 'react'
import { Tabs } from 'antd'
import styles from '../hoahongtien.module.css'
import Hoahongcanhan from './Hoahongcanhan'
import Hoahongnhom from './Hoahongnhom'
import { useRouter } from 'next/router'
import Tonghoahong from './Tonghoahong'
import Huongdan from './Huongdan'
//tabs
const onChange = (key) => {
}
const itemTabs = [
  {
    key: '1',
    label: `Hoa hồng cá nhân`,
    children: <Hoahongcanhan />,
  },
  ,
  // {
  //   key: '2',
  //   label: `Hoa hồng nhóm`,
  //   children: <Hoahongnhom />,
  // },
  {
    key: '3',
    label: `Tổng Hoa hồng`,
    children: <Tonghoahong />,
  },
  {
    key: '4',
    label: `Hướng dẫn`,
    children: <Huongdan />,
  },
]
const App = () => {
  const router = useRouter()
  return (
    <>
      <div className={styles.container_index}>
        <div className={styles.content}>
          <Tabs defaultActiveKey='1' items={itemTabs} onChange={onChange} destroyInactiveTabPane={true}/>
        </div>
      </div>
    </>
  )
}
export default App
