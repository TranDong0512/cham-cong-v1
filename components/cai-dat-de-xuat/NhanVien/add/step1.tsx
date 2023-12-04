import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table, Typography } from 'antd'
import columnsModal from './column'
import SelectOrganizeCustomize from '@/components/commons/co-cau-to-chuc'
import Constants from '@/components/cai-dat-de-xuat/Constant/constant'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/storeQLC'
export default function Step1({ listUsers, setListUsers }) {
  const initialData = useSelector((state: RootState) => state.white_list.data)
  const [dataTable, setDataTable] = useState<any>([])
  const [listOrganizeDetailId, setListOrganizeDetailId] = useState(null)
  const dispatch = useDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const [all, setAll] = useState(true)
  useEffect(() => {
    const unFollow = () => {
      setSelectedRowKeys([])
      setListUsers([])
    }
    unFollow()
  }, [dataTable])
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: any, selected, selectedRows) => {
      const newArr = selectedRows?.map((item) => item?.ep_id)
      setAll(true)
      setListUsers(newArr)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const newArr = selectedRows?.map((item) => item?.ep_id)
      setListUsers(newArr)
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
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
  const hidden = () => {
    if (dataTable?.length > 0) return true
    else return false
  }
  const handleSelectAll = () => {
    setAll(false)
    const index = dataTable?.map((item, index) => index)
    const newArr = dataTable?.map((item, index) => item?.ep_id)
    setListUsers(newArr)
    setSelectedRowKeys(index)
  }
  const handleCancelSelectAll = () => {
    setAll(true)
    setListUsers([])
    setSelectedRowKeys([])
  }
  return (
    <>
      <div className='mt-16'>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <SelectOrganizeCustomize
              initialData={dataTable}
              setListOrganizeDetailId={setListOrganizeDetailId}
              setDataTable={setDataTable}
              ep_status={'Active'}
              href={Constants.settingConfirm_listUser}
            />
          </Col>
        </Row>
      </div>

      <div
        className='flex mt-16 flex-align-center gap-10'
        style={{ padding: '20px' }}>
        <div>
          <p>Đã chọn:{listUsers.length}</p>
        </div>
        {hidden() ? (
          <div style={{ marginLeft: '10px' }}>
            {all ? (
              <Button size='large' type='primary' onClick={handleSelectAll}>
                <p> Chọn tất cả</p>
              </Button>
            ) : (
              <Button
                size='large'
                type='primary'
                onClick={handleCancelSelectAll}>
                <p> Bỏ chọn tất cả</p>
              </Button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className='CustomerTable mt-16'>
        <Table
          locale={locale}
          rowSelection={{
            columnWidth: '48px',
            ...rowSelection,
          }}
          // pagination={{
          //     pageSize: 5,
          // }}
          columns={columnsModal}
          dataSource={dataTable}
          scroll={{ x: 600 }}
        />
      </div>
    </>
  )
}
