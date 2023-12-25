import { Card, Tabs } from 'antd'
import styles from './di-muon-ve-som.module.css'
import { CpmDiMuonVeSom } from '@/components/cai-dat-luong/di-muon-ve-som/di-muon-ve-som'
import { CpmCaiDatDiMuonVeSom } from '@/components/cai-dat-luong/di-muon-ve-som/cai-dat-di-muon-ve-som/cai-dat-di-muon-ve-som'
import { CpmNghiSaiQuyDinh } from '@/components/cai-dat-luong/di-muon-ve-som/nghi-sai-quy-dinh/nghi-sai-quy-dinh'
import { CpmDanhSachNghiSaiQuyDinh } from '@/components/cai-dat-luong/di-muon-ve-som/danh-sach-nghi-sai-quy-dinh/danh-sach-nghi-sai-quy-dinh'
import {
  POST_SS,
  POST_SS_TL,
  POST_TL,
  getCompIdCS,
  getCompIdSS,
} from '@/pages/api/BaseApi'
import moment from 'moment'
import _, { set } from 'lodash'
import { useEffect, useState } from 'react'
import { DsKhongChoNghi } from '@/components/khong-cho-nghi'

export default function DiMuonVeSom() {
  const KEY_TL = 'key_tl'
  const [key, setKey] = useState(window.localStorage.getItem(KEY_TL) || '1')
  const [keyChildren, setKeyChildren] = useState('')

  const tabItems = [
    {
      key: '1',
      label: 'Cài đặt đi muộn về sớm',
      children: <CpmCaiDatDiMuonVeSom />,
    },
    {
      key: '2',
      label: 'Nghỉ sai quy định',
      children: <CpmNghiSaiQuyDinh />,
    },
    {
      key: '3',
      label: 'Danh sách nghỉ sai quy định',
      children: <CpmDanhSachNghiSaiQuyDinh keyChildren={keyChildren}/>,
    },
    {
      key: '4',
      label: 'Đi muộn về sớm',
      children: <CpmDiMuonVeSom keyChildren={keyChildren}/>,
    },
  ]

  return (
    <Card>
      <Tabs
        items={tabItems}
        defaultActiveKey={key}
        onChange={(key) => {
          setKeyChildren(key)
          window.localStorage.setItem(KEY_TL, key)
        }}
      />
    </Card>
  )
}
