import { useDrag } from "react-dnd"
import styles from "./DragableItem.module.css"
import Image from "next/image"
import { Popover, Rate } from "antd"
import { useRouter } from "next/router"
import avatarUser from "../../../../public/avatar.png"

export const DragableContainer = ({
  data,
  setModalOpen,
  setDropCol,
  setDragItem,
  currentCol,
  setOpenDeleteAttendantModal,
  setCanIdSelected,
  userHiringName
}: {
  data: any
  setModalOpen: any
  setDropCol: any
  setDragItem: any
  currentCol: string
  setOpenDeleteAttendantModal: any
  setCanIdSelected: any,
  userHiringName: any
}) => {
  const router = useRouter()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "any",
    item: { data, currentCol },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()

      if (dropResult && item) {
        setDragItem(item?.data)
        setDropCol(dropResult)
        setModalOpen(true)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))
  // console.log(data)

  const opacity = isDragging ? 0.4 : 1

  const PopoverContent = () => {
    const singleItem = (img: any, title: any, onclick: Function) => (
      <div style={{ display: "flex" }} onClick={() => onclick()}>
        <Image alt="/" src={img} width={24} height={24} />
        <p style={{ marginLeft: "5px" }}>{title}</p>
      </div>
    )

    return (
      <div style={{ padding: "10px" }}>
        <div style={{ marginBottom: "10px" }}>
          {singleItem("/edit-black.png", "Xem chi tiết", () =>
            router.push(`${router.pathname}/chi-tiet-ung-vien/${data?.canId}`)
          )}
        </div>
        {singleItem("/del-black.png", "Xóa hồ sơ", () => {
          setCanIdSelected(data?.canId)
          setOpenDeleteAttendantModal(true)
        })}
      </div>
    )
  }

  return (
    <div
      className={styles.profileWrapper}
      ref={drag}
      style={{ opacity: opacity }}
    >
      <div className={styles.firstSection}>
        <Image alt="/" src={avatarUser} width={52} height={52} />
        <div className={styles.txtSection}>
          <p>Tên: {data?.canName}</p>
          <p>SĐT: {data?.phone}</p>
          <p>{data?.title || data?.recruitmentNewsId || "Chưa cập nhật"}</p>
          <Rate
            defaultValue={data?.starVote}
            disabled
            style={{ fontSize: 15 }}
          />
        </div>
        <Popover content={<PopoverContent />}>
          <Image
            alt="/"
            src={"/v-3dots.png"}
            width={19}
            height={5}
            style={{ marginLeft: "auto" }}
          />
        </Popover>
      </div>
      <div>
        <p className={styles.secondSection}>
          Nhân viên thực hiện: {userHiringName}
        </p>
      </div>
    </div>
  )
}
