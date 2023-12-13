import { SearchOutlined } from '@ant-design/icons'
import styles from './modal-them-nhan-vien.module.css'
import { Modal, Input, Button, Checkbox, Row, Col, Select } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ModalXacNhan } from '@/components/cham-cong/cong-chuan/modal-xac-nhan-cong-chuan'
import { POST } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import moment from 'moment'
import { COOKIE_KEY } from '@/pages'
import { getOrganizeDetail } from '@/utils/BaseApi'
import { error } from 'console'

// const data = [
//   {
//     key: "504000",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504001",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504002",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   }
// ]
const ModalList = (
  name: string,
  url: string,
  key: string,
  pb: string,
  onChange: Function,
  checked: Function
) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'space-between',
      borderBottom: '1px dotted #9F9F9F',
      paddingBottom: '10px',
      paddingTop: '10px',
    }}
    onClick={() => onChange(key)}>
    <Checkbox
      key={key}
      checked={checked(key)}
      onChange={() => onChange(key)}></Checkbox>
    <img src={url} alt='' style={{ marginLeft: '10px' }} />
    <div style={{ marginLeft: '10px' }}>
      <p style={{ fontSize: '18px' }}>{name}</p>
      <p style={{ fontSize: '16px' }}>{key}</p>
    </div>
    <div style={{ marginLeft: 'auto' }}>
      <p>{pb || 'Chưa cập nhật'}</p>
    </div>
  </div>
)

// const data = [
//   {
//     key: "504000",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504001",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504002",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   }
// ]
export function ThemNhanVien(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  cySelected: any,
  listEmp: any,
  listEmpInCy: any,
  setDataTotal?: Function
) {
  const [listKeyBefore, setListKeyBefore]: any = useState([])
  const [listKeyAfter, setListKeyAfter]: any = useState([])
  const [modalXacNhan, setModalXacNhan] = useState(false)
  const [listPb, setListPb] = useState([])

  useEffect(() => {
    const getOrg = async () => {
      const res = await getOrganizeDetail()
      setListPb(res)
    }
    getOrg()
  }, [])

  // let initData = []
  // if (_.isEmpty(listEmpInCy)) {
  //   initData = listEmp
  // } else {
  //   const temp = []
  //   listEmp?.forEach((item) => {
  //     const found = listEmpInCy?.find((cyItem) => cyItem?.ep_id === item?.ep_id)

  //     if (!found) {
  //       temp.push(item)
  //     }
  //   })

  //   initData = temp
  // }

  const [data, setData]: any = useState()
  const [filterdata, setFilterdata] = useState([])
  const [orgId, setOrgId] = useState(undefined)
  const [ep_id, setEpId] = useState(undefined)
  const [searchName, setSearchName] = useState('')
  const [searchOrg, setSearchOrg] = useState(undefined)
  const [checkbox, getCheckbox] = useState(false)
  console.log(cySelected)
  useEffect(() => {
    const getNoCyListEmp = async () => {
      const curMonth = moment(cySelected?.apply_month).format('YYYY-MM')

      const res = await POST('api/qlc/cycle/list_not_in_cycle', {
        apply_month: curMonth,
        organizeDetailId: orgId,
        ep_id: ep_id,
      })

      if (res?.result) {
        setData(res?.items)
        setFilterdata(res?.items)
      }
    }

    if (!_.isEmpty(cySelected)) {
      getNoCyListEmp()
    }
  }, [orgId, ep_id, cySelected])

  useEffect(() => {
    setOrgId(undefined)
  }, [open])

  const router = useRouter()

  // useEffect(() => {
  //   if (listEmp.length > 0) {
  //     setData(listEmp)
  //   } else {
  //     setData([])
  //   }
  // }, [listEmp])

  useEffect(() => {
    setListKeyBefore(listEmpInCy?.map((emp) => `${emp?.ep_id}`) || [])
    setListKeyAfter(listEmpInCy?.map((emp) => `${emp?.ep_id}`) || [])
  }, [listEmpInCy])

  const onChange = (key: any) => {
    listKeyAfter.includes(key) === true
      ? setListKeyAfter(listKeyAfter.filter((data: any) => data !== key))
      : setListKeyAfter([...listKeyAfter, key])
  }
  const checked = (key: any) =>
    listKeyAfter.includes(key) === true ? true : false
  const onClick = async () => {
    const sameValues: any = listKeyBefore.filter(
      (key) => listKeyAfter.indexOf(key) !== -1
    )
    const otherValuesBefore: any = listKeyBefore.filter(
      (key) => listKeyAfter.indexOf(key) === -1
    )
    const otherValuesAfter: any = listKeyAfter.filter(
      (key) => listKeyBefore.indexOf(key) === -1
    )
    if (sameValues.length === listKeyBefore) {
    } else {
      // Add employees to cycle when checked
      if (otherValuesAfter.length > 0) {
        // console.log(otherValuesAfter.join(","));
        const fd = new FormData()
        const curMonth = moment().format('YYYY-MM')
        fd.append('cy_id', cySelected?.cy_id)
        fd.append('list_id', otherValuesAfter.join(','))
        fd.append('curMonth', curMonth)
        POST(
          'api/qlc/cycle/add_employee',
          fd
          //  {
          //   cy_id: cySelected?.cy_id,
          //   list_id: otherValuesAfter.join(','),
          // }
        ).then((res) => {
          if (res?.result === true) {
            setModalXacNhan(true)
            setOpen(false)
            // router.replace(router.asPath)
            //router.reload()
            setDataTotal()
          } else {
            window.alert('Co loi khi them')
          }
        })
      }

      // Delete employee from cycle when unchecked
      // if (otherValuesBefore.length > 0) {
      //   // console.log(otherValuesBefore);

      //   otherValuesBefore.map((key) => {
      //     POST('api/qlc/cycle/delete_employee', {
      //       cy_id: cySelected?.cy_id,
      //       ep_id: key,
      //     }).then((res) => {
      //       if (res?.result === true) {
      //       }
      //     })
      //   })
      // }
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onCancel={() => {
          setSearchName('')
          setSearchOrg(undefined)
          setListKeyAfter([])
          getCheckbox(false)
          setOpen(false)
        }}
        width={800}
        style={{ height: '100vh' }}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <div className={styles.header}>
          <div></div>
          <div className={styles.textHead}>Thêm nhân viên mới</div>
          <Image
            alt='/'
            src={'/cross.png'}
            width={14}
            height={14}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.bodyItem}>
            <Select
              value={searchOrg}
              size='large'
              style={{ width: '100%' }}
              options={[
                { label: 'Tất cả phòng ban', value: 'all' },
                ...listPb?.map((item) => ({
                  label: item?.organizeDetailName,
                  value: item?.id,
                })),
              ]}
              placeholder='Chọn phòng ban'
              onChange={(e) => {
                setSearchName('')
                if (e === 'all') {
                  setOrgId(undefined)
                  setSearchOrg(undefined)
                } else {
                  const orgId = listPb?.find((item) => item?.id === e)
                  console.log(data)
                  setOrgId(orgId?.listOrganizeDetailId)
                  setSearchOrg(e)
                }
              }}
            />
            <Input
              value={searchName}
              style={{ fontSize: '16px', width: '100%', marginTop: '20px' }}
              prefix={
                <SearchOutlined rev={''} style={{ marginRight: '10px' }} />
              }
              size='large'
              onChange={(e) => {
                const keyword = e.target.value
                setSearchName(keyword)
                if (!keyword) {
                  setFilterdata(data)
                } else {
                  setFilterdata(
                    data?.filter((item) =>
                      item?.ep_name
                        ?.toLowerCase()
                        ?.includes(keyword?.toLowerCase())
                    )
                  )
                }
              }}
              placeholder='Nhập từ cần tìm'></Input>
          </div>
          <div className={styles.bodyItem}>
            <Row gutter={[40, 20]} style={{ alignItems: 'end' }}>
              <Col sm={16} xs={12}>
                <Row style={{ borderBottom: '1px #9F9F9F solid' }}>
                  <Col sm={6}>
                    <div
                      style={{
                        fontSize: '18px',
                        borderBottom: '2px blue solid',
                        color: '#4C5BD4',
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                      Nhân viên
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={8} xs={12}>
                <Checkbox
                  checked={checkbox}
                  onChange={(e) => {
                    getCheckbox(!checkbox)
                    if (e.target.checked === true) {
                      setListKeyAfter(data?.map((item) => item?.ep_id))
                    } else setListKeyAfter([])
                  }
                  }>
                  Chọn tất cả
                </Checkbox>
              </Col>
            </Row>
          </div>
          <div className={`${styles.bodyItem} ${styles.scrollbar}`}>
            {filterdata?.map((emp) =>
              ModalList(
                emp?.ep_name,
                emp?.ep_image,
                emp?.ep_id,
                emp?.dep_name,
                onChange,
                checked
              )
            )}
          </div>
          <div className={styles.hasButton}>
            <Button className={styles.button} onClick={onClick}>
              <p className={styles.txt}>Chọn</p>
            </Button>
          </div>
        </div>
      </Modal>
      {ModalXacNhan(
        modalXacNhan,
        setModalXacNhan,
        'Bạn đã thêm nhân viên thành công'
      )}
    </div>
  )
}
