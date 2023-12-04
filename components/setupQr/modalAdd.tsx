import { Button, Image, Modal, Table, Input } from "antd";
import styles from "./styles.module.scss";
import { useState } from "react";
import instance from "../hooks/axios.config";
export default function ModalAddQr({
  iniId,
  name,
  open,
  update,
  close,
  setUpdate,
}) {
  const [value, setValue] = useState(iniId ? name : null);
  const [required, setRequired] = useState(false);
  const handleChange = (e) => {
    setRequired(false);
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (value === undefined || value === "" || value === undefined) {
      setRequired(true);
    } else {
      const create = async () => {
        return await instance.post("api/qlc/qrCode/create", {
          QRCodeName: value,
        });
      };
      const updateData = async () => {
        return await instance.post("/api/qlc/qrCode/update", {
          QRCodeName: value,
          id: iniId,
        });
      };
      try {
        if (iniId) {
          const result = await updateData();
          if (result?.data?.data?.result) {
            alert("Chỉnh sửa thành công");
            setUpdate(!update);
            close();
          }
        } else {
          const result = await create();
          if (result?.data?.data?.result) {
            alert("Thêm mới thành công");
            setUpdate(!update);
            close();
          }
        }
      } catch (err) {
        alert("Thêm mới thất bại");

        console.log(err);
      }
    }
  };
  return (
    <Modal
      open={open}
      onCancel={close}
      closable={false}
      width={600}
      destroyOnClose={true}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.headerText}>Thêm mới QR</p>
        </div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          preview={false}
          height={14}
          style={{ marginRight: "20px", cursor: "pointer" }}
          onClick={close}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.inputHeader}>
          Tên QR <span style={{ color: "red" }}>*</span>
        </p>
        <div className={styles.inputWrapper}>
          <Input
            size="large"
            placeholder="Nhập tên QR"
            onChange={handleChange}
            value={value}
          />
          <div>
            {required ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                }}
              >
                Trường này không được bỏ trống
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            size="large"
            htmlType="submit"
            className={styles.addNewBtn}
            type="primary"
            onClick={handleSubmit}
          >
            <p className={styles.btnText}>{iniId ? "Cập nhập" : "Thêm mới"}</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
