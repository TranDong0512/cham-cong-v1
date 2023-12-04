import Image from 'next/image'
import styles from './gioi-han-ip.module.css'
import React, { useState, useEffect } from 'react'
import {
  AddNewIPModal,
  ConfirmIPModal,
  TYPE_ADD,
  TYPE_UPDATE,
} from './modals/modals'
import { AddButton } from '@/components/commons/Buttons'
import moment from 'moment'
import { POST } from '@/pages/api/BaseApi'
import axios from 'axios'

export function GioiHanIP({
  listIps,
  router,
}: {
  listIps: any[]
  router: any
}) {
  const [openAddNew, setOpenAddNew] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [list, setList] = useState(listIps)
  const [reload, setReload] = useState(false)
  const [curIp, setCurIp] = useState()

  useEffect(() => {
    const getData = async () => {
      const res = await POST('api/qlc/SetIp/get', {})
      setList(res?.data)
    }

    getData()
  }, [reload])

  const [selectedRow, setSelectedRow] = useState<any>()

  const singleWifiIitem = (item: any, index: number) => (
    <div key={index} className={styles.wifiItem}>
      <div className={styles.topSection}>
        <div className={styles.info}>
          <Image
            alt='/'
            src={'/wifi-icon.png'}
            width={42}
            height={42}
            style={{ marginRight: '10px' }}
          />
          <div>
            <p style={{ marginBottom: '5px', color: '#4C5BD4' }}>
              Tên IP Mạng : {item?.from_site}
            </p>
            <p>Địa chỉ IP: {item?.ip_access}</p>
          </div>
        </div>
        <div className={styles.btnGroup}>
          <Image
            alt='/'
            src={'/add-icon.png'}
            width={24}
            height={24}
            onClick={() => {
              setSelectedRow(item)
              setOpenUpdate(true)
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt='/'
            src={'/delete-icon.png'}
            width={24}
            height={24}
            onClick={() => {
              setSelectedRow(item)
              setOpenConfirm(true)
            }}
          />
        </div>
      </div>
      <div>
        <p className={styles.updateTxt}>
          Cập nhật:{' '}
          {moment.unix(item?.created_time)?.format('DD-MM-YYYY HH:mm:ss')}
        </p>
      </div>
    </div>
  )

  useEffect(() => {
    const getIP = async () => {
      try {
        const res = await axios.get('https://geolocation-db.com/json/')

        if (res?.status === 200) {
          setCurIp(res?.data?.IPv4)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getIP()
  }, [])

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.headerTxt} style={{ marginBottom: '20px' }}>
          Danh sách IP mạng cho phép chấm công trên website bằng tài khoản nhân
          viên
        </p>
        {AddButton('Thêm địa chỉ IP', () => setOpenAddNew(true))}
      </div>
      <div>
        {list && list?.map((item, index) => singleWifiIitem(item, index))}
      </div>
      {AddNewIPModal(openAddNew, setOpenAddNew, TYPE_ADD, reload, setReload, {
        ip_access: curIp,
      })}
      {AddNewIPModal(
        openUpdate,
        setOpenUpdate,
        TYPE_UPDATE,
        reload,
        setReload,
        selectedRow
      )}
      {ConfirmIPModal(
        openConfirm,
        setOpenConfirm,
        selectedRow?.id_acc,
        list,
        setList
      )}
    </div>
  )
}
