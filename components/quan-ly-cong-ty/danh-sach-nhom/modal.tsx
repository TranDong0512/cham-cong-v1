import { ModalWrapper } from "@/components/modal/ModalWrapper"
import { MySeachBar } from "../quan-ly-cong-ty-con/modal"
import { Checkbox, Table, Tabs } from "antd"
import Image from "next/image"
import { MyTable } from "../quan-ly-phong-ban/table/Table"
import { useState } from "react"
import styles from "./modal.module.css"
import InfiniteScroll from "react-infinite-scroll-component"

const mockdata = [
  {
    id: "504404",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504405",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504406",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504407",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  },
  {
    id: "504408",
    name: "Hồ Mạnh Hùng",
    img: "/avatar.png"
  }
]

export const AddEmpGroupModal = ({
  open,
  setOpen
}: {
  open: boolean
  setOpen: any
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const SingleItem = ({
    img,
    name,
    id
  }: {
    img: string
    name: string
    id: string
  }) => {
    const checked =
      selectedRowKeys?.find((item: any) => item === id) !== undefined
    return (
      <div className={styles.itemWrapper}>
        <div key={id}>
          <Checkbox
            className={styles.checbox}
            checked={checked}
            onChange={(e) => {
              const isChecked = e.target.checked

              setSelectedRowKeys(
                isChecked
                  ? [...selectedRowKeys, id]
                  : selectedRowKeys?.filter((item: any) => item !== id)
              )
            }}
          />
        </div>
        <div className={styles.infoWrapper}>
          <Image
            alt="/"
            src={img}
            width={46}
            height={46}
            style={{ marginRight: "10px" }}
          />
          <div>
            <p style={{ color: "#4C5BD4", fontSize: "18px" }}>{name}</p>
            <p>{id}</p>
          </div>
        </div>
      </div>
    )
  }

  const children = (
    <div>
      <div>
        <MySeachBar placeholder="Nhập từ cần tìm" name="" hasPrefix={true} />
      </div>
      <div>
        <Tabs
          items={[
            {
              key: "1",
              label: <p style={{ color: "#4C5BD4" }}>Nhân viên (32)</p>,
              children: (
                <div style={{ height: "60vh", overflowY: "scroll" }}>
                  {mockdata?.map((item) => (
                    <SingleItem
                      id={item?.id}
                      img={item?.img}
                      name={item?.name}
                      key={item?.id}
                    />
                  ))}
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    "Thêm nhân viên vào nhóm",
    "Thêm",
    () => null,
    true,
    true,
    false
  )
}

export const DeleteEmpFromGroup = ({
  open,
  setOpen,
  empData,
  type,
  groupName,
  onConfirm
}: {
  open: boolean
  setOpen: any
  empData: any
  type: string
  groupName: any
  onConfirm: () => void
}) => {
  const children = (
    <div>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p style={{ textAlign: "center" }}>
        Bạn có chắc chắn muốn xóa{" "}
        <span style={{ fontWeight: "600" }}>{empData?.name}</span> khỏi{" "}
        <span style={{ fontWeight: "600" }}>{groupName}</span>?
      </p>
    </div>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    `Xóa nhân viên khỏi ${type}`,
    "Đồng ý",
    onConfirm,
    true,
    true,
    false,
    true
  )
}
