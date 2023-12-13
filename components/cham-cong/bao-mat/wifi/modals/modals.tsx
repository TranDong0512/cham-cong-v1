import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import styles from "./modals.module.css";
import Image from "next/image";
import { DELETE, POST } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export const TYPE_ADD = "add";
export const TYPE_UPDATE = "update";

export function AddNewWifiModal(
  open: boolean,
  setOpen: Function,
  type: string,
  selectedRow: any,
  list: any,
  setList: any,
  reload: any,
  setReload: any
) {
  const [form] = Form.useForm();
  const [listLoc, setListLoc] = useState([]);
  // const [curIp, setCurIp] = useState();
  useEffect(() => {
    const getListLoc = async () => {
      const ress = await POST("api/qlc/location/list", {});

      if (ress?.result) {
        setListLoc(ress?.list);
      }
    };
    getListLoc();
  }, []);

  // useEffect(() => {
  //   const getIP = async () => {
  //     try {
  //       const res = await axios.get("https://geolocation-db.com/json/");

  //       if (res?.status === 200) {
  //         setCurIp(res?.data?.IPv4);
  //         form.setFieldValue("ip_access", res?.data?.IPv4);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getIP();
  // }, []);

  useEffect(() => {
    form.setFieldsValue({ ...selectedRow })
  }, [open])

  const onFinish = async (value: any) => {
    if (value) {
      if (type === TYPE_ADD) {
        const res = await POST("api/qlc/settingWifi/create", value);
        if (res?.result) {
          // setList([res?.tracking, ...list])
          setOpen(false);
          // router.reload()
          setReload(!reload);
        }
      } else {
        const body = {
          ...selectedRow,
          ...value,
        };

        const res = await POST("api/qlc/settingWifi/update", body);

        if (res?.result) {
          setOpen(false);
          // router.reload()
          setReload(!reload);
          // const editItemIndex = list?.findIndex(
          //   (item: any) => item?.wifi_id === selectedRow?.wifi_id
          // )

          // const newArr = list
          // newArr[editItemIndex] = body

          // setList(newArr)
          // setOpen(false)
        } else {
          window.alert(res?.message || "Có lỗi xảy ra");
        }
      }
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields()
        setOpen(false)
      }
      }
      width={600}
      closable={false}
      destroyOnClose={true}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <p className={styles.headerText}>
          {type === TYPE_ADD ? "Thêm mới wifi" : "Cập nhật thông tin wifi"}
        </p>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          style={{ marginRight: "20px" }}
          onClick={() => {
            form.resetFields()
            setOpen(false)
          }
          }
        />
      </div>
      <div className={styles.body}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={
            type === TYPE_UPDATE
              ? { ...selectedRow, id_loc: Number.parseInt(selectedRow?.id_loc) }
              : null
          }
        >
          <p className={styles.inputHeader}>
            Tên Wifi <span style={{ color: "red" }}>*</span>
          </p>
          <Form.Item
            name="name_wifi"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input size="large" placeholder="Nhập tên  wifi" />
          </Form.Item>
          <p className={styles.inputHeader}>
            Địa chỉ IP <span style={{ color: "red" }}>*</span>
          </p>
          <Form.Item
            name="ip_access"
            rules={[
              { required: true, message: "Trường này là bắt buộc" },
              {
                pattern: /^[0-9.]+$/,
                message: "Vui lòng chỉ nhập số và dấu chấm",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Nhập IP"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <p className={styles.inputHeader}>
            Tọa độ <span style={{ color: "red" }}>*</span>
          </p>
          <Form.Item
            name="id_loc"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Select
              size="large"
              placeholder="Nhập tọa độ"
              options={listLoc?.map((item) => ({
                label: item?.cor_location_name,
                value: item?.cor_id,
              }))}
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              htmlType="submit"
              className={styles.addNewBtn}
              type="primary"
            >
              <p className={styles.btnText}>
                {type === TYPE_ADD ? "Thêm mới" : "Cập nhật"}
              </p>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

// pop up

export function ConfirmModal(
  open: boolean,
  setOpen: Function,
  selectedRow: any,
  list: any,
  setList: any
) {
  const onYes = async () => {
    const res = await POST("api/qlc/settingWifi/delete", {
      id: selectedRow?.id,
    });

    if (res?.result === true) {
      setList(list?.filter((item: any) => item?.id !== selectedRow?.id));
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={450}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.confirmBody}>
        <Image alt="/" src={"/big-x.png"} width={50} height={50} />
        <p className={styles.alertText}>Hành động xóa không thể phục hồi.</p>
        <p>Bạn có chắc chắn muốn xóa?</p>
        <div className={styles.btnGroup}>
          <Button
            className={styles.abortBtn}
            size="large"
            onClick={() => setOpen(false)}
          >
            Hủy
          </Button>
          <Button className={styles.confirmBtn} size="large" onClick={onYes}>
            <p className={styles.text}>Đồng ý</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
