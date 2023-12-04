import { AddButton } from '@/components/commons/Buttons'
import styles from './index.module.css'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { UpdateNodeModal } from '@/components/de-xuat/so-do-to-chuc/modal/modal'
import { POST_SS } from '@/pages/api/BaseApi'

const OChart = dynamic(
  () => import('@/components/de-xuat/so-do-to-chuc/chart/Chart'),
  { ssr: false }
)

export default function SoDoToChuc({ infoCompany }) {
  const [onOpenEdit, setOnOpenEdit] = useState(false)
  const [editInitData, setEditInitData] = useState()

  return (
    <div>
      {/* {AddButton("Thêm mới", () => null)} */}
      <div>
        <OChart infoCompany={infoCompany} />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let infoCompany = {}
  const res = await POST_SS(
    'api/hr/organizationalStructure/detailInfoCompany',
    {},
    context,
    'hr'
  )

  if (res?.result === true) {
    infoCompany = res?.infoCompany
  }

  return {
    props: {
      infoCompany,
    },
  }
}
