import React, { useEffect, useState } from 'react'
import styles from './ks.module.scss'
import Image from 'next/image'
const KhungSelect = ({
  data,
  wifiSelected,
  setWifiAccess,
  locSelected,
  setLocAccess,
  ipSelected,
  setIpAccess,
  dataSelected,
  type,
}) => {
  const [list, setList] = useState(data)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState([])

  //handle
  const handleOptionClick = (value) => {
    if (selected?.includes(value)) {
      setSelected(selected?.filter((val) => val !== value))
      switch (type) {
        case 'wifi':
          setWifiAccess(selected?.filter((val) => val !== value))
          break
        case 'loc':
          setLocAccess(selected?.filter((val) => val !== value))
          break
        case 'ip':
          setIpAccess(selected?.filter((val) => val !== value))
          break
        default:
          break
      }
    } else {
      setSelected([...selected, value])
      switch (type) {
        case 'wifi':
          setWifiAccess([...selected, value])
          break
        case 'loc':
          setLocAccess([...selected, value])
          break
        case 'ip':
          setIpAccess([...selected, value])
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    if (dataSelected?.user_id) {
      switch (type) {
        case 'wifi':
          setSelected(
            dataSelected?.wifi_access?.arr_wifi_name?.trim()?.split(',') || []
          )
          break
        case 'loc':
          setSelected(dataSelected?.loc_access || [])
          break
        case 'ip':
          setSelected(dataSelected?.ip_access?.arr_ip?.trim()?.split(',') || [])
          break
        default:
          setSelected([])
          break
      }
    }
  }, [dataSelected])

  const isWifiSelected = (value) => {
    if (selected?.length < 0) {
      return false
    }
    return selected?.includes(value)
  }

  const handleRemoveOption = (value) => {
    setSelected(selected?.filter((wifi) => wifi !== value))
    switch (type) {
      case 'wifi':
        setWifiAccess(selected?.filter((val) => val !== value))
        break
      case 'loc':
        setLocAccess(selected?.filter((val) => val !== value))
        break
      case 'ip':
        setIpAccess(selected?.filter((val) => val !== value))
        break
      default:
        break
    }
  }
  return (
    <>
      <div className={styles.khung_select}>
        <div
          className={styles.custom_select}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.select_single}>
            {selected?.length === 0 ? (
              <div className={styles.placeholder}>Chọn</div>
            ) : type !== 'wifi' ? (
              selected?.map((value, index) => (
                <div className={styles.khoi_the} key={index}>
                  <div className={styles.the}>
                    <div className={styles.text_input}>
                      {value?.name || value}
                    </div>
                    <Image
                      src="/img/plus-circle.png"
                      width={20}
                      height={20}
                      alt=""
                      onClick={() => handleRemoveOption(value)}
                    />
                  </div>
                </div>
              ))
            ) : (
              selected?.map((value, index) => {
                return (
                  <div className={styles.khoi_the} key={index}>
                    <div className={styles.the}>
                      <div className={styles.text_input}>{value}</div>
                      <Image
                        src="/img/plus-circle.png"
                        width={20}
                        height={20}
                        alt=""
                        onClick={() => handleRemoveOption(value)}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <div className={styles.icon}>
            <Image src="/img/arrow-down.png" width={16} height={16} alt="" />
          </div>
          {isOpen && type === 'wifi' ? (
            <div className={styles.options}>
              {list?.map((value, index) => {
                return (
                <div
                  key={index}
                  className={`${styles.option} ${
                    isWifiSelected(value) ? styles.selected : ''
                  }`}
                  onClick={() => handleOptionClick(value?.name_wifi)}
                >
                  {value?.name_wifi}
                </div>
              )})}
            </div>
          ) : isOpen && (
            <div className={styles.options}>
              {list?.map((value, index) => (
                <div
                  key={index}
                  className={`${styles.option} ${
                    isWifiSelected(value) ? styles.selected : ''
                  }`}
                  onClick={() => handleOptionClick(value)}
                >
                  {value?.name || value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default KhungSelect
