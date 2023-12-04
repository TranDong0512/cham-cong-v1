import { Button, Card, Table } from 'antd'
import styles from './index.module.css'
import { useState } from 'react'
import { IconLuong } from '@/components/lich-su/luong-hien-tai/icon/icon'
import { factory } from 'typescript'
import { POST_SS_TL, getCookieSS } from '@/pages/api/BaseApi'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import { positionLabel } from '@/utils/function'

export default function LuongHienTai({ salData }) {
  console.log(salData)
  const columnLuong = [
    {
      title: <p style={{ color: '#fff' }}>Lương cơ bản</p>,
      align: 'center',
      render: (record: any) => (
        <p style={{ color: '#FF5B4D' }}>
          {new Intl.NumberFormat().format(record?.sb_salary_basic) || 0} VNĐ
        </p>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Ngày áp dụng</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {record?.sb_time_up &&
            moment(record?.sb_time_up)?.format('DD-MM-YYYY')}
        </p>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Vị trí</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {positionLabel[
            salData?.info_dep_com?.user?.inForPerson?.employee?.position_id
          ]?.label || 'Chưa cập nhật'}
        </p>
      ),
    },
  ]
  const columnLuongHienTai = [
    {
      title: <p style={{ color: '#fff' }}>Mức lương hiện tại</p>,
      align: 'center',
      render: (record: any) => (
        <p style={{ color: '#FF5B4D' }}>
          {new Intl.NumberFormat().format(
            record?.sb_salary_basic - record?.sb_salary_bh
          ) || 'Chưa cập nhật'}{' '}
          VNĐ
        </p>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Ngày áp dụng</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {record?.sb_time_up &&
            moment(record?.sb_time_up)?.format('DD-MM-YYYY')}
        </p>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Vị trí</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {positionLabel[
            salData?.info_dep_com?.user?.inForPerson?.employee?.position_id
          ]?.label || 'Chưa cập nhật'}
        </p>
      ),
    },
  ]
  const columnDieuChinhLuong = [
    {
      title: <p style={{ color: '#fff' }}>Lương điều chỉnh</p>,
      align: 'center',
      render: (record: any) => (
        <p style={{ color: '#FF5B4D' }}>
          {new Intl.NumberFormat().format(record?.sb_salary_basic) || 0} VNĐ
        </p>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Ngày điều chỉnh</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {record?.sb_time_up &&
            moment(record?.sb_time_up)?.format('DD-MM-YYYY')}
        </p>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Vị trí</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {positionLabel[
            salData?.info_dep_com?.user?.inForPerson?.employee?.position_id
          ]?.label || 'Chưa cập nhật'}
        </p>
      ),
    },
  ]
  const colunmHopDong = [
    {
      title: <p style={{ color: '#fff' }}>Tên hợp đồng</p>,
      align: 'center',
      render: (record: any) => (
        <p style={{ color: '#FF5B4D' }}>{record?.con_name}</p>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Phần trăm hợp đồng</p>,
      align: 'center',
      render: (record: any) => <p>{record?.con_salary_persent || 0} %</p>,
    },
    {
      title: <p style={{ color: '#fff' }}>Ngày áp dụng</p>,
      align: 'center',
      render: (record: any) => (
        <p>
          {moment(record?.con_time_up).format('DD-MM-YYYY') || 'Chưa cập nhật'}
        </p>
      ),
    },
  ]
  const color: any = [
    {
      colorLeft: '#4c5bd4',
      colorRight: '#3E9FFC',
      colorCircleLeft: '#4C5BD4',
      colorCircleRight: '#3EA1FE',
      colorIcon: '#4c5bd4',
      colorText: '#4c5bd4',
      textTop: 'Lương',
      textBottom: 'Lương cơ bản',
      id: 'paint0_linear_460_104269',
    },
    {
      colorLeft: '#61B2FE',
      colorRight: '#61F1DB',
      colorCircleLeft: '#4AA7FF',
      colorCircleRight: '#42D778',
      colorIcon: '#4BA9FC',
      colorText: '#339DFA',
      textTop: 'Lương hiện tại',
      textBottom: 'Lương cập nhật mới nhất',
      id: 'paint0_linear_460_104155',
    },
    {
      colorLeft: '#FE5F48',
      colorRight: '#FEB801',
      colorCircleLeft: '#FE5C4B',
      colorCircleRight: '#FEBA01',
      colorIcon: '#FE5E49',
      colorText: '#FE6755',
      textTop: 'Thông tin hợp đồng',
      textBottom: 'Thông tin hợp đồng',
      id: 'paint0_linear_460_104327',
    },
    {
      colorLeft: '#FE5F48',
      colorRight: '#FEB801',
      colorCircleLeft: '#FE5C4B',
      colorCircleRight: '#FEBA01',
      colorIcon: '#FE5E49',
      colorText: '#FE6755',
      textTop: 'Lịch sử điều chỉnh lương',
      textBottom: 'Lịch sử điều chỉnh mức lương',
      id: 'paint0_linear_460_104327',
    },
  ]
  const [data, setData]: any = useState([
    salData?.info_basic_salary?.[salData?.info_basic_salary?.length - 1],
  ])
  const [column, setColumn]: any = useState(columnLuong)
  const [active, setActive]: any = useState('Luong')
  return (
    <div className={styles.container}>
      <div className={styles.textHeader}>Xin chào ...</div>
      <div className={styles.tabs}>
        <div
          className={styles.button}
          onClick={() => {
            setData([
              salData?.info_basic_salary?.[
                salData?.info_basic_salary?.length - 1
              ],
            ])
            setColumn(columnLuong)
            setActive('Luong')
          }}>
          {IconLuong({ actives: active === 'Luong', ...color[0] })}
        </div>
        <div
          className={`${styles.button} ${styles.buttonMiddle}`}
          style={{ marginLeft: '20px' }}
          onClick={() => {
            setData([
              salData?.info_basic_salary?.[
                salData?.info_basic_salary?.length - 1
              ],
            ])
            setColumn(columnLuongHienTai)
            setActive('LuongHienTai')
          }}>
          {IconLuong({ actives: active === 'LuongHienTai', ...color[1] })}
        </div>
        <div
          className={styles.button}
          onClick={() => {
            setData(salData?.info_contract)
            setColumn(colunmHopDong)
            setActive('HopDong')
          }}>
          {IconLuong({ actives: active === 'HopDong', ...color[2] })}
        </div>
        <div
          className={`${styles.button} ${styles.buttonEnd}`}
          onClick={() => {
            setData(salData?.info_basic_salary)
            setColumn(columnDieuChinhLuong)
            setActive('DieuChinhLuong')
          }}>
          {IconLuong({ actives: active === 'DieuChinhLuong', ...color[3] })}
        </div>
      </div>
      <div className={styles.table}>
        <Table
          className={`green-table-bodyBorder`}
          dataSource={data}
          columns={column}
          pagination={false}
          style={{ marginBottom: '20px' }}></Table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let salData = {}
  const cookie = getCookieSS(context)

  const decoded = jwtDecode(cookie)

  if (decoded) {
    console.log(decoded)
    const resSal = await POST_SS_TL(
      'api/tinhluong/nhanvien/qly_ho_so_ca_nhan',
      {
        ep_id: decoded?.['data']?.idQLC,
        cp: decoded?.['data']?.com_id,
      },
      context
    )

    if (resSal) {
      salData = resSal?.data
    }
  }

  return {
    props: {
      salData: salData,
    },
  }
}
