import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Table } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { Select, Typography } from 'antd'
import instance from '@/components/hooks/axios.config'
import { getCompIdCS } from '@/pages/api/BaseApi'
import SelectOrganizeCustomize from '@/components/commons/co-cau-to-chuc/indexFix'
import ModalHinhThucDuyet from './modaEdit'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/storeQLC'
import SearchCustomize from '@/components/commons/tim-kiem'
import { columns } from './columns'
import ModalDeleteHTD from './modalDelete'
import ModalAddHTD from './add/ModalAdd'
import Constants from '../Constant/constant'
import ModalSettingHTD from './modalSettingHTD'

export default function HinhThucDuyet() {
  const com_id = getCompIdCS()
  const dispatch = useDispatch()
  const update = useSelector((state: RootState) => state.tgd.updateHTD)
  const [hidden, setHidden] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [dataUse, setDataUse] = useState<any>([])
  const [dataTable, setDataTable] = useState<any>([])
  const [position_id, setPosition_id] = useState<any>('')
  const [confirmType, setConfirmType] = useState<any>()
  const [listOrganizeDetailId, setListOrganizeDetailId] = useState(null)
  const [name, setName] = useState('')
  const [openModalAddHTD, setOpenModalAddHTD] = useState(false)
  const modalEdit = useSelector(
    (state: RootState) => state.tgd.openModalEditHTD
  )
  const setting = useSelector((state: RootState) => state.tgd.modalSettingHTD)

  useEffect(() => {
    const data_com_id = {
      com_id: com_id,
      pageSize: 10000,
      ep_status: 'Active',
    }
    const fetcher = async () => {
      return await instance.post(Constants.settingConfirm_listUser, data_com_id)
    }
    const unFollow = async () => {
      try {
        const data = await fetcher()
        const newData = data?.data?.data?.data?.map((item, index) => ({
          ...item,
          stt: index + 1,
          key: index,
        }))
        setDataUse(newData)
        setDataTable(newData)
      } catch (err) {
        console.error(err)
      }
    }
    unFollow()
  }, [update])

  const handleSelectConfirmType = async (e) => {
    setConfirmType(e)
  }
  const searchEmployee = async () => {
    const value = {
      com_id: com_id,
      ep_status: 'Active',
      userName: name,
      confirm_type: confirmType,
      listOrganizeDetailId: listOrganizeDetailId ? listOrganizeDetailId : null,
      position_id: position_id,
      pageSize: 10000,
    }
    const fetcher = async () => {
      return await instance.post(Constants.settingConfirm_listUser, {
        ep_status: 'Active',
        pageSize: 10000,
        ...value,
      })
    }
    if (
      listOrganizeDetailId?.length > 0 ||
      position_id ||
      name ||
      confirmType
    ) {
      try {
        const data = await fetcher()
        const newData = data?.data?.data?.data?.map((item, index) => ({
          ...item,
          stt: index + 1,
          key: index,
        }))
        setDataTable(newData)
      } catch (err) {
        console.error(err)
      }
    }
  }
  const closeModalAddHTD = () => {
    setOpenModalAddHTD(false)
  }

  let locale = {
    emptyText: (
      <span>
        <p style={{ color: '#ccc', fontSize: 16, fontWeight: '500' }}>
          Không có dữ liệu
        </p>
      </span>
    ),
  }
  return (
    <>
      <div className='mb-16'>
        <Button
          size='large'
          type='primary'
          style={{ marginBottom: '20px' }}
          onClick={() => {
            setOpenModalAddHTD(true)
          }}
          icon={<SettingOutlined style={{ color: '#fff' }} rev={'xxx'} />}>
          <span style={{ color: '#fff' }}> Cài đặt</span>
        </Button>
        {openModalAddHTD && (
          <ModalAddHTD open={openModalAddHTD} onClose={closeModalAddHTD} />
        )}
      </div>
      <div className='mt-16'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={16} md={16} xl={16} xxl={16}>
            <SelectOrganizeCustomize
              initialData={dataUse}
              setListOrganizeDetailId={setListOrganizeDetailId}
              setDataTable={setDataTable}
              ep_status={'Active'}
              href={Constants.settingConfirm_listUser}
              setNameUser={setName}
              setPosition_id={setPosition_id}
            />
          </Col>
          <Col xs={24} sm={8} md={8} xl={4} xxl={4}>
            <div>
              <span className='mb-8 display-block'>Hình thức duyệt</span>
              <Select
                placeholder='Chọn'
                onSelect={handleSelectConfirmType}
                allowClear
                showSearch
                onClear={() => {
                  setConfirmType(null)
                  setDataTable(dataUse)
                }}
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
          </Col>

          <Col
            xs={24}
            sm={8}
            md={8}
            xl={4}
            xxl={4}
            style={{
              margin: 'auto',
            }}>
            <SearchCustomize searchEmployee={searchEmployee} />
          </Col>
        </Row>
      </div>
      <div className='CustomerTable mt-16'>
        <Table
          locale={locale}
          key={0}
          columns={columns}
          dataSource={dataTable}
          scroll={{ x: 1024 }}
        />
      </div>
      <>
        {modalEdit ? (
          <ModalHinhThucDuyet
            setSelectedRowKeys={setSelectedRowKeys}
            setHidden={setHidden}
          />
        ) : (
          <></>
        )}
      </>
      <>{setting ? <ModalSettingHTD></ModalSettingHTD> : <></>}</>

      <ModalDeleteHTD
        setSelectedRowKeys={setSelectedRowKeys}
        setHidden={setHidden}
      />
    </>
  )
}
