import { Button, Col, Row, Select } from "antd";
import { Table } from "antd/lib";
import styles from './vitri.module.css'
import { PlusCircleOutlined, EnvironmentOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import GoogleMapComponent from "./GoogleMapComponent";
import { TYPE_ADD, TYPE_UPDATE } from "./GoogleMapComponent";
import ConfirmModal, { TYPE_DELETE } from "./Confirm";
import CallApi from "@/pages/api/call_api";
import Cookies from "js-cookie";
import Image from 'next/image'

export default function Vitri() {
  const [selectedRow, setSelectedRow] = useState({})
  const [showAddLocationForm, setShowAddLocationForm] = useState(false)
  const [showModifiedLocationForm, setShowModifiedLocationForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [dataSend, setDataSend] = useState({})
  const columns = [
    {
      title: 'STT', // Tiêu đề cột số thứ tự
      dataIndex: 'index', // Định danh dữ liệu
      key: 'index', // Khóa duy nhất
      render: (text, record, index) => index + 1,
      width: 10,
      align: 'center',
    },
    {
      title: 'Địa chỉ',
      key: "cor_location_name",
      dataIndex: "cor_location_name",
      align: "left",

      render: (text) => {
        return (
          <>
            <span className={styles.limit_text}><EnvironmentOutlined /> {text}</span>
          </>
        )
      }
    },
    {
      title: "Tọa dộ",
      dataIndex: "",
      key: "toa_do",
      align: "center",
      render: (record) => {
        if (!record.cor_long || !record.cor_lat) {
          return null;
        } else {
          return (
            <>
              <div className={styles.toa_do}>
                <p>
                  X: {record.cor_long}
                </p>
                <p>
                  Y: {record.cor_lat}
                </p>
              </div>
            </>
          )
        }
      }
    },
    {
      title: "Tùy chọn",
      dataIndex: "",
      key: 'actions',
      align: "center",

      render: (text, record) => {
        const handleModified = (e) => {
          setSelectedRow(e)
          setShowModifiedLocationForm(true)
        };

        const handleDelete = (e) => {
          setDataSend(e)
          setShowDelete(true)
        };

        return (
          <div className={styles.actions}>
            <span title="Chỉnh sửa" onClick={() => handleModified(text)}>
              <Image
                alt='/'
                src={'/add-icon.png'}
                width={28}
                height={28}
              />
            </span>
            <span title="Xoá" onClick={() => handleDelete(text)}>
              <Image
                alt='/'
                src={'/delete-icon.png'}
                width={28}
                height={28}
              />
            </span>
          </div>
        );
      }
    },
  ]

  useEffect(() => {
    const getData = async () => {
      const response = await CallApi.getListLocations({}, Cookies.get('token_base365'))
      console.log(response);

      setDataSource(response.data.data.list)
      setDataTable(response.data.data.list)
    }
    getData()
  }, [])

  const setDataReload = ((data) => {
    setDataSource(data[0])
    setDataTable(data[0])
  })

  const handelSelectLocation = (e) => {
    if (e === 0) {
      setDataTable(dataSource)
    } else {
      const newData = [...dataSource]?.filter(item => item.cor_id === e)

      setDataTable(newData)
    }

  }

  return (
    <>
      <div className={styles.header}>
        <p style={{ fontSize: '18px', fontWeight: '600' }}>Danh sách địa chỉ</p>
        <Button onClick={() => {
          setSelectedRow({});
          setShowAddLocationForm(true)
        }} type="primary" ><span style={{ color: 'white', fontWeight: '500' }}><PlusCircleOutlined /> Thêm mới</span></Button>
      </div>
      <div className={styles.search}>
        <span className={styles.searchLabel}>
          Tìm kiếm:
        </span>
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          className={styles.select_location}
          placeholder={'Nhập địa chỉ'}
          size="large"
          options={[
            { label: <>...</>, value: 0, key: 0 },
            ...dataSource?.map((item) => ({
              key: item.cor_id,
              label: item?.cor_location_name,
              value: item?.cor_id,
            })),
          ]}
          onSelect={handelSelectLocation}
        >
        </Select>
      </div>
      <div className="table_vitri">
        <Table scroll={{
          x: 'max-content',
        }}
          columns={columns}
          dataSource={dataTable}
          rowKey={(record, index) => index + 1}
        />
      </div>
      {GoogleMapComponent(
        showAddLocationForm,
        setShowAddLocationForm,
        TYPE_ADD,
        selectedRow,
        dataSource,
        setDataReload
      )}
      {GoogleMapComponent(
        showModifiedLocationForm,
        setShowModifiedLocationForm,
        TYPE_UPDATE,
        selectedRow,
        dataSource,
        setDataReload
      )}
      {ConfirmModal(
        showDelete,
        setShowDelete,
        TYPE_DELETE,
        dataSend,
        setDataReload
      )}
    </>
  )

}