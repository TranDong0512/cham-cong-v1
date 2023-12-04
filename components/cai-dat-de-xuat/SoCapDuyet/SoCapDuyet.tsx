import instance from '@/components/hooks/axios.config'
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Image, Table, Row, Col, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import Constants from '../Constant/constant'
import { getCompIdCS } from '@/pages/api/BaseApi'
import ModalAddSCD from './modal/add/ModalAdd'
import { columns } from './columns'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/storeQLC'
import { useDispatch } from 'react-redux'
import { openModalDelete, openModalEdit, sendData } from '../reducer/reducer'
import ModalEditSCD from './modal/modalEdit'
import ModalDeleteSCD from './modal/modalDelete'
import SearchCustomize from '@/components/commons/tim-kiem'
import ModalSettingSCD from './modal/settingSCD'
export default function SoCapDuyet() {
  const com_id = getCompIdCS()
  const [openModalAddSCD, setOpenModalAddSCD] = useState(false)
  const dispatch = useDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [listUsers, setListUsers] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [data, setData] = useState([])
  const [hidden, setHidden] = useState(false)
  const load = useSelector((state: RootState) => state.tgd.updateSoCapDuyet)
  const setting = useSelector((state: RootState) => state.tgd.modalSettingSCD)
  const modalEdit = useSelector((state: RootState) => state.tgd.openModalEdit)

  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetcher = async () => {
          return await instance.post(Constants.listSettingPropose, {
            pageSize: 10000,
          })
        }
        const result = await fetcher()
        const data = result?.data?.data?.data?.map((item, index) => ({
          ...item,
          stt: (index + 1).toString(),
          key: item?.ep_id,
          label: item?.dexuat_name,
          value: item?.dexuat_id,
        }))
        setDataSearch(data)
        setData(data)
      } catch (err) {
        console.log(err)
      }
    }
    unFollow()
  }, [load])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: any, selected, selectedRows) => {
      if (selectedRows.length > 0) {
        const newArr = selectedRows?.map((item) => item?.ep_id)
        setListUsers(newArr)
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selectedRows.length > 0) {
        const newArr = dataSearch?.map((item) => item?.ep_id)
        setListUsers(newArr)
      }
    },
  }
  const onChange = (e) => {
    const valueInput = e.target.value
    if (valueInput !== '' || valueInput !== undefined) {
      const searchTerm = valueInput.toLowerCase()

      const filteredData = dataSearch.filter((item) => {
        return item.dexuat_name.toLowerCase().includes(searchTerm)
      })
      setData(filteredData)
    } else {
      setData(data)
    }
  }
  const closeModalAddSCD = () => {
    setOpenModalAddSCD(false)
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
            setOpenModalAddSCD(true)
          }}
          icon={<SettingOutlined style={{ color: '#fff' }} rev={'xxx'} />}>
          <span style={{ color: '#fff' }}>Cài đặt</span>
        </Button>
        {openModalAddSCD ? (
          <ModalAddSCD
            open={openModalAddSCD}
            onClose={closeModalAddSCD}
            setData={data}
          />
        ) : (
          <></>
        )}
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              style={{ width: '50%', height: '38px' }}
              placeholder='Tên loại đề xuất'
              onChange={onChange}></Input>
          </div>
        </Col>
      </Row>

      <div className='CustomerTable mt-16'>
        <Table
          locale={locale}
          columns={columns}
          dataSource={data}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <>
        {modalEdit ? (
          <ModalEditSCD
            setHidden={setHidden}
            setSelectedRowKeys={setSelectedRowKeys}
            setData={data}
          />
        ) : (
          <></>
        )}
      </>
      <>{setting ? <ModalSettingSCD></ModalSettingSCD> : <></>}</>

      <ModalDeleteSCD
        setHidden={setHidden}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </>
  )
}
