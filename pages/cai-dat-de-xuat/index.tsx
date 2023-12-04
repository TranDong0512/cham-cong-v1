import React, { useState, useEffect } from 'react'
import { CheckLogin2 } from '../../utils/function'
import { useRouter } from 'next/router'
import CaiDatDeXuat from '@/components/cai-dat-de-xuat'
import { Card } from 'antd'

export default function thoigianpheduyet() {
  CheckLogin2()
  const [narrow, setNarrow] = useState(false)
  const [currentPage, setCurrentPage] = useState('Tất cả')
  const [openSB, setOpenSB] = useState(false)
  const router = useRouter()
  useEffect(() => {
    window.addEventListener(
      'resize',
      function (event) {
        if (window.innerWidth >= 1024) {
          setOpenSB(true)
        } else if (window.innerWidth < 1024) {
          setOpenSB(false)
          setNarrow(false)
        } else if (window.innerWidth === 1024) {
          setNarrow(false)
        }
      },
      true
    )
  })
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setOpenSB(true)
    }
  }, [])
  return (
    <Card style={{ marginBottom: '60px' }}>
      <CaiDatDeXuat />
    </Card>
  )
}
