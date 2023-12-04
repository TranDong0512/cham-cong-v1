import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  List,
  Checkbox,
  Tabs,
  Avatar,
} from 'antd'
import styles from './them-nhan-vien.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { Search } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { POST_TL } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

export function ModalThemNhanVien(
  open: boolean,
  setOpen: Function,
  key: any,
  info: any,
  taxSelected: any
) {
  const tabsList = [
    {
      key: '1',
      label: `Nhân viên (${info?.length})`,
    },
  ]
  const [idNV, setIdNV] = useState(Array<Number>)
  const [checkButton, setCheckButton] = useState('1')
  const [selectAll, setSelectAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const router = useRouter()
  const hanelSubmit = async () => {
    idNV.map(async (checkid) => {
      info.map(async (nv) => {
        if (nv.id === checkid) {
          // console.log(
          //  taxSelected?.cl_id,
          //   taxSelected?.cl_com,
          //   nv?.id,
          //   dayjs().format('YYYY-MM-[01T00:00:00.000]Z'),
          //   dayjs().format('YYYY-MM-[01T00:00:00.000]Z')
          // )
          await POST_TL('api/tinhluong/congty/them_nv_nhom_other_money', {
            cls_id_cl: taxSelected?.cl_id,
            cls_id_com: taxSelected?.cl_com,
            cls_id_user: nv?.id,
            cls_day: dayjs().format('YYYY-MM-[01T00:00:00.000]Z'),
            cls_day_end: dayjs().format('YYYY-MM-[01T00:00:00.000]Z'),
          }).then((res) => {})
        }
      })
    })
    router.replace(router.asPath)
  }
  // console.log(idNV)
  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectAll(true)
      setSelectedItems(info.map((item) => item.key))
      setIdNV(info.map((x) => x.id))
    } else {
      setSelectAll(false)
      setSelectedItems([])
      setIdNV([])
    }
  }
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={710}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm nhân viên nhóm thuế</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Input
          size='large'
          className={styles.nameCT}
          placeholder='nhập từ cần tìm'
          type='text'
          prefix={<Search />}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tabs
            className={`tab_themNhanVienPhucLoi`}
            items={tabsList}
            onChange={(activekey) => setCheckButton(activekey)}
          />
          <Checkbox
            className={styles.checkbox}
            onChange={handleSelectAllChange}
            checked={selectAll}>
            <p>Chọn tất cả</p>
          </Checkbox>
        </div>
        <List
          className={styles.list}
          dataSource={info}
          rowKey={(item: any) => item?.key}
          renderItem={(item, index) => (
            <List.Item>
              <div className={styles.the}>
                <Checkbox
                  className={styles.checkbox}
                  checked={selectedItems.includes(item.key)}
                  onChange={(e) => {
                    // Update the selected items' keys state based on the checkbox's checked status.
                    if (e.target.checked) {
                      setSelectedItems([...selectedItems, item.key])
                      setIdNV([...idNV, item.id])
                    } else {
                      setSelectedItems(
                        selectedItems.filter((key) => key !== item.key)
                      )
                      setIdNV(idNV.filter((x) => x !== item.id))
                    }
                  }}></Checkbox>
                <Avatar
                  src={item.url}
                  style={{ width: '46px', height: '46px', margin: 'auto' }}
                />
                <div className={styles.info}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.id}>{item.id}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
        <div className={styles.khungbutton}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            <p className={styles.textbutton1}>Huỷ</p>
          </button>
          <Button className={styles.button2}>
            <p className={styles.textbutton2} onClick={hanelSubmit}>
              Thêm nhân viên
            </p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
