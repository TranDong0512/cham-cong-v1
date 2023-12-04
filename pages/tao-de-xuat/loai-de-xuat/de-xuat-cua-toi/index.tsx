import { ButtonDeXuatCuaToi } from '@/components/tao-de-xuat/loai-de-xuat/de-xuat-cua-toi/icons/icon-de-xuat'
import styles from './index.module.css'
import { Col, Row } from 'antd'
import { useState } from 'react'
import { ToiGuiDi } from '@/components/tao-de-xuat/loai-de-xuat/de-xuat-cua-toi/toi-gui-di/toi-gui-di'
import { GuiDenToi } from '@/components/tao-de-xuat/loai-de-xuat/de-xuat-cua-toi/gui-den-toi/gui-den-toi'
import { DangTheoDoi } from '@/components/tao-de-xuat/loai-de-xuat/de-xuat-cua-toi/dang-theo-doi/dang-theo-doi'
import { POST_SS_VT } from '@/pages/api/BaseApi'

export default function DeXuatCuaToi({ dxFrom, dxTo, dxFollow, listDuyet }) {
  const [active, setActive] = useState('1')
  // console.log(listDuyet)
  return (
    <div className={styles.body}>
      <Row gutter={[{lg:30, md: 20, sm: 20}, {md:20, sm: 20}]} className={styles.header}>
        <Col md={8} sm={12} xs={24} onClick={() => setActive('1')}>
          {ButtonDeXuatCuaToi(
            active === '1' ? 'active' : 'normal',
            '1',
            dxFrom?.length || 0
          )}
        </Col>
        <Col md={8} sm={12} xs={24} onClick={() => setActive('2')}>
          {ButtonDeXuatCuaToi(
            active === '2' ? 'active' : 'normal',
            '2',
            dxTo?.length || 0
          )}
        </Col>
        <Col md={8} sm={12} xs={24} onClick={() => setActive('3')}>
          {ButtonDeXuatCuaToi(
            active === '3' ? 'active' : 'normal',
            '3',
            dxFollow?.length || 0
          )}
        </Col>
      </Row>
      <div className='deXuatCuaToiTable'>
        {active === '1' ? (
          <ToiGuiDi dxFrom={dxFrom} listDuyet={listDuyet}></ToiGuiDi>
        ) : active === '2' ? (
          <GuiDenToi dxTo={dxTo}></GuiDenToi>
        ) : (
          <DangTheoDoi dxFollow={dxFollow}></DangTheoDoi>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let dxFrom: any[] = []
  let dxTo: any[] = []
  let dxFollow: any[] = []
  let listDuyet: any[] = []

  const resApi = await Promise.all([
    POST_SS_VT('api/vanthu/DeXuat/user_send_deXuat_All', { type: 1 }, context),
    POST_SS_VT('api/vanthu/DeXuat/deXuat_send_user', { type: 1 }, context),
    POST_SS_VT('api/vanthu/DeXuat/deXuat_follow', { type: 1 }, context),
    POST_SS_VT('api/vanthu/dexuat/showadd', {}, context),
  ])
  console.log(resApi)
  if (resApi?.[0]?.result) {
    dxFrom = resApi?.[0]?.data
  }

  if (resApi?.[1]?.result) {
    dxTo = resApi?.[1]?.data
  }

  if (resApi?.[2]?.result) {
    dxFollow = resApi?.[2]?.data
  }

  if (resApi?.[3]?.result) {
    listDuyet = resApi?.[3]?.listUsersDuyet
  }

  return {
    props: {
      dxFrom: dxFrom,
      dxTo: dxTo,
      dxFollow: dxFollow,
      listDuyet: listDuyet,
    },
  }
}
