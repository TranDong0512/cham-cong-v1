import React, { useEffect, useState } from 'react'
import { Checkbox, InputNumber, Select, Switch, Typography } from 'antd'
import instance from '@/components/hooks/axios.config'

export default function Step2({
  setInputChange,
  setValueSelect,
  setListConfirm,
  setInputTime,
  displayTime,
  displayType,
  displayLevel,
  onSwitch,
}) {
  const [numberPropose, setNumberPropose] = useState()
  const [check, setCheck] = useState(false)
  const [listOptions, setListOptions] = useState([])
  const [propose, setPropose] = useState([])

  const handleSetLevel = (e) => {
    setValueSelect(e)
  }
  const onChange = (e) => {
    setInputChange(e)
  }
  const changeTime = (e) => {
    setInputTime(e)
  }
  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetcher = async () => {
          return await instance.post('api/vanthu/setting/fetchTimeSetting')
        }
        const data = await fetcher()

        const options = data?.data?.time_dx?.map((item, index) => ({
          label: item?.name_cate_dx,
          value: item?.id_dx,
          key: item?.id_dx,
        }))
        setNumberPropose(data?.data?.time_dx?.length)
        setListOptions(options)
      } catch (err) {
        console.log(err)
      }
    }
    unFollow()
  }, [])

  const handleSelect = (value) => {
    setPropose(value)
    if (value) {
      setListConfirm(value)
    } else setCheck(false)
  }
  const handleCheckboxChange = async (e) => {
    const { checked } = e.target
    if (checked === true) {
      const arrayOfNumbers = listOptions?.map((item) => item.key)
      setListConfirm(arrayOfNumbers)
      setPropose(arrayOfNumbers)
      setCheck(true)
    } else {
      setPropose([])
      setListConfirm([])
      setCheck(false)
    }
  }

  return (
    <>
      <div className='mt-16'>
        <div className='mt-16'>
          <Typography.Text>Danh sách đề xuất</Typography.Text>
        </div>
        <div style={{ display: 'flex', margin: '8px 0' }}>
          <Checkbox
            type='checkbox'
            checked={check}
            onChange={handleCheckboxChange}>
            Chọn tất cả
          </Checkbox>
        </div>
        <div className='mt-8'>
          <Select
            placeholder='Chọn'
            mode='multiple'
            value={propose}
            onChange={handleSelect}
            onClear={() => {
              setCheck(false)
              setValueSelect(null)
            }}
            allowClear
            showSearch
            style={{
              width: '100%',
            }}
            filterOption={(input, option: any) =>
              (option?.label ?? '').includes(input)
            }
            size='large'
            options={listOptions}
          />
        </div>
        <div
          className='mt-16'
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Switch
            defaultChecked={false}
            onChange={() => onSwitch('disLevel')}
            size='small'
          />
          <p style={{ marginLeft: 8 }}>Không thay đổi</p>
        </div>
        {displayLevel ? (
          <>
            <div className='mt-8'>
              <Typography.Text>Số cấp duyệt</Typography.Text>
            </div>

            <div className='mt-8'>
              <InputNumber
                placeholder='Nhập số cấp duyệt'
                size='large'
                style={{ width: '100%' }}
                onChange={onChange}></InputNumber>
            </div>
          </>
        ) : (
          <></>
        )}

        <div
          className='mt-16'
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Switch
            defaultChecked={false}
            onChange={() => onSwitch('disType')}
            size='small'
          />
          <p style={{ marginLeft: 8 }}>Không thay đổi</p>
        </div>
        {displayType ? (
          <>
            <div className='mt-8'>
              <Typography.Text>Hình thức duyệt</Typography.Text>
            </div>
            <div className='mt-8'>
              <Select
                placeholder='Chọn'
                onSelect={handleSetLevel}
                allowClear
                showSearch
                filterOption={(input, option: any) =>
                  (option?.label ?? '').includes(input)
                }
                size='large'
                style={{
                  width: '100%',
                }}
                options={[
                  {
                    label: 'Duyệt đồng thời',
                    value: 1,
                  },
                  {
                    label: 'Duyệt lần lượt',
                    value: 2,
                  },
                  {
                    label: 'Duyệt đồng thời và lần lượt',
                    value: 3,
                  },
                ]}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <div
          className='mt-16'
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Switch
            defaultChecked={false}
            onChange={() => onSwitch('disTime')}
            size='small'
          />
          <p style={{ marginLeft: 8 }}>Không thay đổi</p>
        </div>

        {displayTime ? (
          <>
            <div className='mt-8'>
              <Typography.Text>Giới hạn thời gian</Typography.Text>
            </div>
            <div className='mt-8'>
              <InputNumber
                placeholder='Nhập thời gian'
                size='large'
                style={{ width: '100%' }}
                addonAfter='Giờ'
                onChange={changeTime}></InputNumber>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
