import React, { useEffect, useState } from 'react'
import styles from './mde.module.scss'
import Image from 'next/image'
import KhungSelect from './khung-select/khungselect'
import { GET, POST, getCompIdCS } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
import { Select } from 'antd'
import { removeVietnameseTones } from '@/constants/style-constants'

const ModalEdit = ({
  dataIP,
  dataWifi,
  show,
  setShowModalEdit,
  dataSelected,
  type,
  listEmp,
}) => {
  const showHideClassName = show
    ? `${styles.popup_edit} ${styles.popup_edit_b} `
    : `${styles.popup_edit}`
  const [listWifi, setList] = useState(dataWifi)
  const [listViTri, setListViTri] = useState([
    { vi_tri: '12.123, 12.8674', name: 'Tầng 1' },
    { vi_tri: '12.123, 12.8674', name: 'Tầng 2' },
    { vi_tri: '12.123, 12.8674', name: 'Tầng 3' },
  ])
  const [listIP, setListIP] = useState(dataIP)
  const [listShift, setListShift] = useState()
  const [data, setData] = useState(dataSelected)
  const [timeApply, setTimeApply] = useState(
    dataSelected?.time_start?.substring(11, 16)
  )
  const [dateApply, setDateApply] = useState(
    dataSelected?.time_start?.substring(0, 10)
  )
  const [timeEnd, setTimeEnd] = useState(
    dataSelected?.time_end?.substring(11, 16)
  )
  const [dateEnd, setDateEnd] = useState(
    dataSelected?.time_end?.substring(0, 10)
  )
  const [wifiAccess, setWifiAccess] = useState(
    dataSelected?.wifi_access?.arr_wifi_name?.trim()?.split(',')
  )
  const [locAccess, setLocAccess] = useState(dataSelected?.loc_access)
  const [ipAccess, setIpAccess] = useState(
    dataSelected?.ip_access?.arr_ip?.trim()?.split(',')
  )

  const [listEmpSelected, setListEmpSelected] = useState([])
  const [shiftAddSelected, setShiftAddSelected] = useState(null)


  const router = useRouter()

  useEffect(() => {
    setListIP(dataIP)
    setList(dataWifi)
  }, [dataIP, dataWifi])

  useEffect(() => {
    setData(dataSelected)
    setTimeApply(dataSelected?.time_start?.substring(11, 16))
    setDateApply(dataSelected?.time_start?.substring(0, 10))
    setTimeEnd(dataSelected?.time_end?.substring(11, 16))
    setDateEnd(dataSelected?.time_end?.substring(0, 10))
    setWifiAccess(
      dataSelected?.wifi_access?.arr_wifi_name?.trim()?.split(',') || []
    )
    setLocAccess(dataSelected?.loc_access || [])
    setIpAccess(dataSelected?.ip_access?.arr_ip?.trim()?.split(',') || [])
  }, [dataSelected])

  useEffect(() => {
    if (type === 'add') {
      let com_id = null
      com_id = getCompIdCS()
      com_id &&
        GET('api/qlc/shift/list').then((res) => {
          setListShift(res?.items)
        })
      
    }
  }, [])

  const handleChangeApplyTime = (e) => {
    setTimeApply(e.target.value)
  }
  const handleChangeApplyDate = (e) => {
    setDateApply(e.target.value)
  }
  const handleChangeEndTime = (e) => {
    setTimeEnd(e.target.value)
  }
  const handleChangeEndDate = (e) => {
    setDateEnd(e.target.value)
  }

  const handleSubmit = () => {
    // console.log('SUBMIT!')
    // console.log({
    //   ...dataSelected,
    //   time_start: `${dateApply}T${timeApply}:00.000Z`,
    //   time_end: `${dateEnd}T${timeEnd}:00.000Z`,
    //   wifi_access: wifiAccess?.join(','),
    //   loc_access: locAccess?.map((loc) => ({
    //     vi_tri: loc?.vi_tri,
    //     name: loc?.name,
    //   })),
    //   ip_access: ipAccess?.join(','),
    // })
    if (type !== "add") {
      const sendData = {
        user_id: dataSelected?.user_id,
        shift_id: dataSelected?.shift_id,
        wifi_access: wifiAccess?.join(','),
        loc_access: locAccess?.map((loc) => ({
          vi_tri: loc?.vi_tri,
          name: loc?.name,
        })),
        ip_access: ipAccess?.join(','),
        time_start: `${dateApply}T${timeApply}:00.000Z`,
        time_end: `${dateEnd}T${timeEnd}:00.000Z`,
      }
      dataSelected?.user_id &&
        POST('api/qlc/setIp/editPersonal', sendData).then((res) => {
          if (res?.result === true) {
            alert('Chỉnh sửa IP cho cá nhân thành công!')
            router.replace(router.asPath)
          }
        })
    } else {
      const sendData = {
        userIds: listEmpSelected,
        shift_id: shiftAddSelected, 
        wifi_access: wifiAccess?.join(','),
        loc_access: locAccess?.map((loc) => ({
          vi_tri: loc?.vi_tri,
          name: loc?.name,
        })),
        ip_access: ipAccess?.join(','),
        time_start: `${dateApply}T${timeApply}:00.000Z`,
        time_end: `${dateEnd}T${timeEnd}:00.000Z`,
      }
      listEmpSelected?.length > 0 && shiftAddSelected &&
        POST('api/qlc/setIp/createPersonal', sendData).then((res) => {
          if (res?.result === true) {
            alert('Thêm IP cho cá nhân thành công!')
            router.replace(router.asPath)
          }
        })
    }
  }

  return (
    <>
      <div className={`${showHideClassName} modalAddPersonalSettingIP`}>
        <div className={styles.popup_edit_main}>
          <div className={styles.popup_top}>
            <div className={styles.text_top}>
              {type === 'add' ? 'Thêm cài đặt' : 'Chỉnh sửa'}
            </div>
            <div
              className={styles.btn_close}
              onClick={() => setShowModalEdit(false)}
            >
              <Image src="/img/tabler_plus.png" width={24} height={24} alt="" />
            </div>
          </div>
          <div className={styles.khoi_nhap_wrapper}>
            {type === 'add' ? (
              <>
                <div className={styles.khoi_nhap}>
                  <div className={styles.label}>Nhân viên áp dụng</div>
                  <Select
                  className={styles.khung_input}
                    mode='multiple'
                    style={{
                      width: '100%',
                      pointerEvents: 'visibleFill',
                      fontSize: '16px',
                    }}
                    value={listEmpSelected}
                    placeholder="Chọn nhân viên áp dụng"
                    options={listEmp?.map((emp) => ({
                      value: emp?.idQLC,
                      label: `${emp?.idQLC} - ${emp?.userName}`,
                      labelNoVN: removeVietnameseTones(
                        `${emp?.idQLC} - ${emp?.userName}`
                      ),
                    }))
                  }
                  showSearch
                    onChange={(e, op) => {
                      setListEmpSelected(e)
                    }}
                    // optionFilterProp={'labelNoVN' || 'label'}
                    filterOption={(input, option) =>
                      option?.label
                        ?.toLowerCase()
                        ?.indexOf(input.toLowerCase()) >= 0 ||
                      option?.labelNoVN
                        ?.toLowerCase()
                        ?.indexOf(input.toLowerCase()) >= 0
                    }
                  />
                </div>
                <div className={styles.khoi_nhap}>
                  <div className={styles.label}>Ca làm việc</div>
                  <Select
                  className={styles.khung_input}
                    style={{
                      width: '100%',
                      pointerEvents: 'visibleFill',
                      fontSize: '16px',
                    }}
                    placeholder="Chọn ca làm việc"
                    value={shiftAddSelected}
                    onChange={(e) => {
                      setShiftAddSelected(e)
                    }}
                    options={listShift?.map((item) => ({
                      value: item?.shift_id,
                      label: item?.shift_name,
                    }))}
                  />
                </div>
              </>
            ) : (
              <div className={styles.khoi_nhap}>
                <div className={styles.label}>Ca làm việc</div>
                <div className={styles.khung_input}>
                  <input type="text" value={data?.infoShift?.shift_name} />
                </div>
              </div>
            )}
            <div className={styles.khoi_nhap}>
              <div className={styles.label}>Thời gian áp dụng</div>
              <div className={styles.khung_two}>
                <div className={styles.khung_input} style={{ width: '50%' }}>
                  <input
                    type="time"
                    value={timeApply}
                    onChange={handleChangeApplyTime}
                  />
                </div>
                <div className={styles.khung_input} style={{ width: '50%' }}>
                  <input
                    type="date"
                    value={dateApply}
                    onChange={handleChangeApplyDate}
                  />
                </div>
              </div>
            </div>
            <div className={styles.khoi_nhap}>
              <div className={styles.label}>Thời gian kết thúc</div>
              <div className={styles.khung_two}>
                <div className={styles.khung_input} style={{ width: '50%' }}>
                  <input
                    type="time"
                    value={timeEnd}
                    onChange={handleChangeEndTime}
                  />
                </div>
                <div className={styles.khung_input} style={{ width: '50%' }}>
                  <input
                    type="date"
                    value={dateEnd}
                    onChange={handleChangeEndDate}
                  />
                </div>
              </div>
            </div>
            <div className={styles.khoi_nhap}>
              <div className={styles.label}>Wifi chấm công</div>
              <KhungSelect
                key={0}
                data={listWifi}
                wifiSelected={wifiAccess}
                setWifiAccess={setWifiAccess}
                dataSelected={dataSelected}
                type={'wifi'}
              />
            </div>
            <div className={styles.khoi_nhap}>
              <div className={styles.label}>Vị trí chấm công</div>
              <KhungSelect
                key={1}
                data={listViTri}
                locSelected={locAccess}
                setLocAccess={setLocAccess}
                dataSelected={dataSelected}
                type={'loc'}
              />
            </div>
            <div className={styles.khoi_nhap}>
              <div className={styles.label}>IP</div>
              <KhungSelect
                key={2}
                data={listIP}
                ipSelected={ipAccess}
                setIpAccess={setIpAccess}
                dataSelected={dataSelected}
                type={'ip'}
              />
            </div>
          </div>
          <div className={styles.group_btn}>
            <div
              className={styles.btn_huy}
              onClick={() => setShowModalEdit(false)}
            >
              <div className={styles.text_huy}>Hủy</div>
            </div>
            <div className={styles.btn_luu} onClick={handleSubmit}>
              <div className={styles.text_luu}>{type === "add" ? "Thêm" : "Lưu"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalEdit
