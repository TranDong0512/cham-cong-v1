import Image from "next/image";
import style from "./modal.module.css";
import { Button, Modal } from "antd";

export const ConfirmModalDelete = ({
  open,
  setOpen,
  selectedRow,
}: {
  open: boolean;
  setOpen: any;
  selectedRow?: any;
}) => {
  const children = (
    <div style={{ padding: "20px 20px 0px 20px" }}>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p className={style.deleteTxt}>
        Bạn có chắc chắn muốn xoá cộng công của nhân viên này không ? Điều này
        sẽ gây ảnh hưởng đến lương những nhân viên đã đề xuất cộng công
      </p>
    </div>
  );

  const onConfirm = () => {
    // console.log(selectedRow);
  };

  return (
    <Modal
      bodyStyle={{ padding: "0px" }}
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      destroyOnClose={true}
      className={`delete-cong-cong-modal ${style.modal}`}
      footer={
        <div className={style.footer}>
          <Button className={style.cancelBtn} onClick={() => setOpen(false)}>
            <p className={style.txt}>Hủy</p>
          </Button>

          <Button
            className={`${style.okBtn}`}
            id="button"
            htmlType="submit"
            onClick={() => {
              onConfirm();
              setOpen(false)  
            }}
          >
            <p className={style.txt}>Đồng ý</p>
          </Button>
        </div>
      }
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: { display: "none" },
      }}
    >
      <div>{children}</div>
    </Modal>
  );
};

export const ConfirmModalChecked = ({
  open,
  setOpen,
  checkedAll,
  checkedRow,
  isCheckedRow,
  selectedKeys,
  setSelectedKeys,
  prevSelectedRowKeys,
  setIsOpenOkModal
}: {
  open: boolean;
  setOpen: any;
  checkedAll: any;
  checkedRow: any;
  isCheckedRow: boolean;
  selectedKeys: any;
  setSelectedKeys: any;
  prevSelectedRowKeys?: any;
  setIsOpenOkModal: Function
}) => {
  const children = (
    <div style={{ padding: "20px 20px 8px 20px", textAlign: "center" }}>
      {checkedAll ? (
        <p className={style.modalTxt}>Bạn có chắc chắn muốn chọn tất cả để cộng công nhân viên</p>
      ) : isCheckedRow ? (
        <p className={style.modalTxt}>
          Bạn có chắc muốn cộng công cho nhân viên <span className={style.nameTxt}>{checkedRow?.name}</span>
        </p>
      ) : (
        <></>
      )}
    </div>
  );

  const onConfirm = () => {
    // console.log("ok");
    setOpen(false);
    setIsOpenOkModal(true)
  };

  const onCancel = () => {
    if (checkedAll) {
      setSelectedKeys(prevSelectedRowKeys);
    } else {
      setSelectedKeys(
        selectedKeys?.filter((item: any) => item !== checkedRow?._id)
      );
    }
    setOpen(false);
  };

  return (
    <Modal
      bodyStyle={{ padding: "0px" }}
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      destroyOnClose={true}
      className={`checked-cong-cong-modal ${style.modalChecked}`}
      footer={
        <div className={style.footerChecked}>
          <Button className={style.cancelBtn} onClick={onCancel}>
            <p className={style.txt}>Hủy</p>
          </Button>
          <Button
            className={`${style.okBtn}`}
            id="button"
            htmlType="submit"
            onClick={() => {
              onConfirm();
              // setOpen(false)
            }}
          >
            <p className={style.txt}>Đồng ý</p>
          </Button>
        </div>
      }
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: { display: "none" },
      }}
    >
      <div>{children}</div>
    </Modal>
  );
};

export const OkModal = ({
  open,
  setOpen,
  checkedAll,
  checkedRow,
  isCheckedRow,
}: {
  open: boolean
  setOpen: any
  checkedAll: any;
  checkedRow: any;
  isCheckedRow: boolean;
}) => {
  const children = (
    <div style={{ padding: "20px 20px 8px 20px", textAlign: "center" }}>
      {checkedAll ? (
        <p className={style.modalTxt}>Tất cả nhân viên đã được cộng công</p>
      ) : isCheckedRow ? (
        <p className={style.modalTxt}>
          Nhân viên <span className={style.nameTxt}>{checkedRow?.name}</span> đã được cộng công
        </p>
      ) : (
        <></>
      )}
    </div>
  );

  return(
    <Modal
      bodyStyle={{ padding: "0px" }}
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      destroyOnClose={true}
      className={`checked-cong-cong-modal ${style.modalChecked}`}
      footer={
        <div className={style.footerChecked}>
          <Button
            className={`${style.okBtnModalOk}`}
            onClick={() => {
              setOpen(false)
            }}
          >
            <p className={style.txt}>OK</p>
          </Button>
        </div>
      }
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: { display: "none" },
      }}
    >
      <div>{children}</div>
    </Modal>
  )
}

