import { Button, Card, Checkbox, Col, Row, Select, Table } from "antd"
import styles from "./index.module.css"
import Image from "next/image"
import { MySeachBar } from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal"
import { MyTable } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table"
import { SearchOutlined } from "@ant-design/icons"
import _ from "lodash"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import {
  DuyetModal,
  HuyDuyetModal
} from "@/components/de-xuat/tam-ung-tien/modal"
import { POST_SS_VT } from "@/pages/api/BaseApi"
import { removeVietnameseTones } from "@/constants/style-constants"

// const mockdata = [
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504001",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: true
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504002",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: true
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504003",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: true
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504004",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: true
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504005",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: false
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504007",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: true
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504008",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: true
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504009",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: false
//   },
//   {
//     img: "/avatar.png",
//     name: "Hồ Mạnh Hùng",
//     id: "504010",
//     date: "10/5/2023",
//     amount: 5000000,
//     state: true
//   }
// ]

export default function TamUngTienPage({ listEmpAndDeXuat }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [selectAllState, setSelectAllState] = useState<boolean>()
  const [openDuyet, setOpenDuyet] = useState(false)
  const [openHuyDuyet, setOpenHuyDuyet] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [listEmp, setListEmp] = useState(listEmpAndDeXuat?.data?.listUser)
  const [listDeXuat, setListDeXuat] = useState<any[]>(listEmpAndDeXuat?.data?.listDeXuat?.map((dx, index) => {
    const avatar = listEmp?.find(e => e?.idQLC === dx?.id_user)?.avatarUser
    return {
      key: index,
      img: avatar ? `/${avatar}` : "/avatar.png",
      name: dx?.name_user,
      idQLC: dx?.id_user,
      idDeXuat: dx?._id,
      date: dx?.time_duyet || "- -",
      amount: Number(dx?.noi_dung?.tam_ung?.sotien_tam_ung) || 0,
      state: dx?.type_duyet === 5 ? true : false
    }
  }))

  const router = useRouter()
  useEffect(() => {
    const temp: any[] = []
    listDeXuat?.forEach((item: any) => {
      if (item?.state) {
        temp.push(item?.key)
      }
    })
    setSelectedRowKeys(temp)
  }, [])

  useEffect(() => {
    setSelectAllState(selectedRowKeys?.length === listDeXuat?.length)
  }, [selectedRowKeys])

  const columns = [
    {
      title: <p className={styles.colHeader}>Ảnh</p>,
      render: (record: any) => (
        <Image alt="/" src={record?.img} width={46} height={46} />
      ),
      align: "center"
    },
    {
      title: <p className={styles.colHeader}>Họ và tên (ID)</p>,
      render: (record: any) => (
        <div>
          <p>{record?.name}</p>
          <p>{record?.id}</p>
        </div>
      ),
      align: "center"
    },
    {
      title: <p className={styles.colHeader}>Ngày tạm ứng</p>,
      render: (record: any) => <p>{record?.date}</p>,
      align: "center"
    },
    {
      title: <p className={styles.colHeader}>Tiền tạm ứng</p>,
      render: (record: any) => (
        <p style={{ color: "red" }}>
          {new Intl.NumberFormat().format(record?.amount)} (VNĐ)
        </p>
      ),
      align: "center"
    },
    Table.SELECTION_COLUMN,
    {
      title: <p className={styles.colHeader}>Trạng thái</p>,
      render: (record: any) => (
        <p>{record?.state ? "Đã duyệt" : "Chưa duyệt"}</p>
      ),
      align: "center"
    },
    {
      title: <p className={styles.colHeader}>Ghi chú</p>,
      render: (record: any) => (
        <p
          style={{ color: "#4C5BD4", fontWeight: "500", cursor: "pointer" }}
          onClick={() => navigateToDetail(record?.idDeXuat)}
        >
          Xem chi tiết
        </p>
      ),
      align: "center"
    }
  ]

  const navigateToDetail = (id) => {
    router.push(`/chi-tiet-tam-ung/${id}`)
  }

  const SearchSelect = ({
    options,
    placeholder
  }: {
    options: any[]
    placeholder: string
  }) => (
    <Select
      optionFilterProp="label"
      size="large"
      style={{
        width: "100%",
        border: "1px solid #acacac",
        borderRadius: "10px",
        fontSize: "16px"
      }}
      suffixIcon={<SearchOutlined rev={undefined} />}
      options={options}
      placeholder={placeholder}
      // defaultValue={options[0] || undefined}
      showSearch
      listHeight={180}
    />
  )

  const months = _.range(1, 13, 1)

  const onCheckAll = () => {
    const allIds: any[] = listDeXuat?.map((item) => item?.key)
    selectedRowKeys?.length === listDeXuat?.length
      ? setSelectedRowKeys([])
      : setSelectedRowKeys(allIds)
  }
  return (
    <>
      <Card>
        <p className={styles.headerTxt}>Danh sách nhân viên tạm ứng tiền</p>
        <Row
          gutter={{ lg: 30, md: 15, sm: 20, xs: 20 }}
          justify={{ md: "end" }}
        >
          <Col lg={7} md={7} sm={12} xs={24} className={styles.col1}>
            <Select
              options={listDeXuat?.map((item) => ({
                label: `${item.id} - ${item.name}`,
                value: item.id,
                labelNoVN: removeVietnameseTones(
                  `${item?.id} - ${item?.name}`
                ),
              }))}
              placeholder="Tìm kiếm tên nhân viên"
              filterOption={(input, option) =>
                option?.label
                  ?.toLowerCase()
                  ?.indexOf(input.toLowerCase()) >= 0 ||
                option?.labelNoVN
                  ?.toLowerCase()
                  ?.indexOf(input.toLowerCase()) >= 0
              }
            />
          </Col>
          <Col lg={7} md={7} sm={12} xs={24} className={styles.col1}>
            <SearchSelect
              options={months?.map((item) => ({
                label: `Tháng ${item}`,
                value: `Tháng ${item}`
              }))}
              placeholder="Tìm theo tháng"
            />
          </Col>
          <Col lg={7} md={6} sm={12} xs={24} className={styles.col2}>
            <SearchSelect
              options={[
                { label: "Năm 2022", value: 2022 },
                { label: "Năm 2023", value: 2023 },
                { label: "Năm 2024", value: 2024 }
              ]}
              placeholder="Tìm theo năm"
            />
          </Col>
          <Col lg={3} md={4} sm={12} xs={24} className={styles.col2}>
            <Button
              size="large"
              style={{ backgroundColor: "#4C5BD4", borderRadius: "10px" }}
            >
              <p style={{ color: "#fff", padding: "0px 10px" }}>Thống kê</p>
            </Button>
          </Col>
        </Row>

        <Table
          className={`${styles.table} green-table`}
          rowClassName={styles.row}
          columns={columns}
          dataSource={listDeXuat}
          scroll={{ x: "max-content" }}
          rowKey={(record) => record?.key}
          pagination={{
            position: ["bottomCenter"]
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: (newRowKeys: any) => {
              setSelectedRowKeys(newRowKeys)

              if (selectedRowKeys?.length === listDeXuat?.length) {
                setSelectAllState(true)
              } else {
                setSelectAllState(false)
              }
            },
            columnWidth: 150,
            columnTitle: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <p style={{ color: "#fff" }}>Duyệt</p>
                <Checkbox
                  checked={selectAllState}
                  onChange={onCheckAll}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            ),
            onSelect: (record: any, selected: boolean) => {
              setSelectedRow(record)
              selected ? setOpenDuyet(true) : setOpenHuyDuyet(true)
            }
          }}
        />
      </Card>
      <DuyetModal
        open={openDuyet}
        setOpen={setOpenDuyet}
        selectedKeys={selectedRowKeys}
        setSelectedKeys={setSelectedRowKeys}
        selectedRow={selectedRow}
      />
      <HuyDuyetModal
        open={openHuyDuyet}
        setOpen={setOpenHuyDuyet}
        selectedKeys={selectedRowKeys}
        setSelectedKeys={setSelectedRowKeys}
        selectedRow={selectedRow}
      />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const listEmpAndDeXuat = await POST_SS_VT('api/vanthu/catedx/tamung', {

  }, context)


  return {
    props: {
      listEmpAndDeXuat
    }
  }
}