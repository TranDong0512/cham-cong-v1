import { DragableContainer } from "../item/DragableItem"
import styles from "./DropableColumn.module.css"
import { useDrop } from "react-dnd"

export const DropableColumn = ({
  listItem,
  item,
  onDeleteClicked,
  setOpenModal,
  setDropCol,
  setDragItem,
  setOpenDeleteStageModal,
  setOpenDeleteAttendantModal,
  setOpenUpdateStage,
  setSelectedStage,
  setCanIdSelected,
  listEmpLabel
}: {
  item: any
  onDeleteClicked: (title: any) => void
  setOpenModal: any
  setDropCol: any
  setDragItem: any
  listItem: any
  setOpenDeleteStageModal: any
  setOpenDeleteAttendantModal: any
  setOpenUpdateStage: any
  setSelectedStage: any
  setCanIdSelected: any
  listEmpLabel: any
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "any",
    drop: () => item,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    canDrop: (data: any, monitor) => {
      const currentColIndx = listItem?.findIndex(
        (elm: any) => elm?.title === data?.currentCol
      )
      const dropColIndx = listItem?.findIndex(
        (elm: any) => elm?.title === item?.title
      )

      if (currentColIndx > dropColIndx) {
        return false
      } else {
        return true
      }
    }
  }))

  return (
    <div className={styles.singleWrapper} ref={drop}>
      <div
        style={{ backgroundColor: `${item.bgColor}` }}
        className={styles.headerTxt}
      >
        <div style={{ display: "flex" }}>
          <span style={{ color: `${item.textColor}` }}>{item.title}</span>
          {!item.required && (
            <p style={{ marginLeft: "5px" }}>
              (
              <span
                style={{ color: "#4C5BD4", marginRight: "5px" }}
                onClick={() => {
                  setSelectedStage(item)
                  setOpenUpdateStage(true)
                }}
              >
                Sửa
              </span>
              /
              <span
                style={{ color: "#4C5BD4", marginLeft: "5px" }}
                onClick={() => {
                  setSelectedStage(item)
                  setOpenDeleteStageModal(true)
                }}
              >
                Xóa
              </span>
              )
            </p>
          )}
        </div>
        <div>
          <p style={{ color: `${item.textColor}` }}>({item?.listCandidate?.length || 0} ứng viên)</p>
        </div>
      </div>
      {item?.listCandidate?.map((attd: any, index: number) => (
        <DragableContainer
          data={attd}
          key={index}
          setModalOpen={setOpenModal}
          setDragItem={setDragItem}
          setDropCol={setDropCol}
          currentCol={item?.title}
          setOpenDeleteAttendantModal={setOpenDeleteAttendantModal}
          setCanIdSelected={setCanIdSelected}
          userHiringName={listEmpLabel?.find(emp => emp?.value === attd?.userHiring)?.label || "Chưa cập nhật"}
        />
      ))}
    </div>
  )
}
