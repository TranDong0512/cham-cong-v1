import {
  Modal,
  Form,
  Select,
  Input,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import Image from "next/image";
import styles from "./modal.module.css";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import moment from "moment";
import { useRouter } from "next/router";

export const ModalXoaCaiDaiDMVS = (
  open: boolean,
  setOpen: Function,
  selectedRow: any,
  reload: boolean,
  setReload: (a: boolean) => void
) => {
  const router = useRouter();
  const onDel = async () => {
    const res = await POST_TL("api/tinhluong/congty/delete_phat_muon", {
      pm_id: selectedRow?.["pm_id"],
    });

    if (res?.data) {
      setReload(!reload);
      // router.replace(router.asPath)
      window.alert("Xóa thành công");
      setOpen(false);
    }
  };

  return (
    <Modal
      className={styles.widthModal}
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "16px",
          color: "#474747",
        }}
      >
        <Image
          alt="/"
          width={50}
          height={50}
          src={"/big-x.png"}
          style={{ marginBottom: "20px" }}
        />
        <p style={{ textAlign: "center" }}>
          Việc xóa tùy chọn có thể ảnh hưởng đến kết quả tính lương của các
          tháng trước. Bạn có chắc chắn muốn xóa tùy chọn này!
        </p>
        <div style={{ marginTop: "20px" }}>
          <Button
            style={{
              padding: "5px 40px 5px 40px",
              height: "auto",
              backgroundColor: "white",
            }}
            onClick={() => setOpen(false)}
          >
            <p style={{ color: "#4C5BD4", fontSize: "18px" }}>Hủy</p>
          </Button>
          <Button
            style={{
              marginLeft: "20px",
              padding: "5px 30px 5px 30px",
              height: "auto",
              backgroundColor: "#4C5BD4",
            }}
            onClick={onDel}
          >
            <p style={{ color: "white", fontSize: "18px" }}>Đồng ý</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const ModalUpDateCaiDatDiMuonVeSom = (
  open: boolean,
  setOpen: Function,
  selectedRow: any,
  reload: boolean,
  setReload: (a: boolean) => void,
  listCa: any[]
) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const initialValues = {
    ...selectedRow,
    pm_time_begin: moment(selectedRow?.pm_time_begin)?.format("YYYY-MM"),
    pm_time_end: moment(selectedRow?.pm_time_end)?.format("YYYY-MM"),
  };

  const onFinish = async (value) => {
    if (value) {
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/update_phat_muon", {
        ...value,
        pm_monney: parseInt(value?.pm_monney),
        pm_id_com: com_id,
        pm_id: selectedRow?.pm_id,
      });

      if (res?.data) {
        // router.replace(router.asPath)
        window.alert("Cập nhật thành công");
        setReload(!reload);
        setOpen(false);
      }
    }
  };

  return (
    <Modal
      className={styles.modal}
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Chỉnh sửa mức phạt đi muộn về sớm</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
          <Form.Item
            name="pm_type"
            label="Lý do phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Select
              placeholder="Chọn lí do"
              size="large"
              options={[
                {
                  label: "Phạt đi muộn",
                  value: 1,
                },
                {
                  label: "Phạt về sớm",
                  value: 2,
                },
              ]}
              suffixIcon={<img src="/down-icon.png"></img>}
            ></Select>
          </Form.Item>
          <Form.Item
            name="pm_shift"
            label="Ca làm việc áp dụng"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Select
              placeholder="Tất cả các ca"
              options={listCa?.map((item) => ({
                label: item?.shift_name,
                value: item?.shift_id,
              }))}
              size="large"
              suffixIcon={<img src="/down-icon.png"></img>}
            ></Select>
          </Form.Item>
          <Form.Item
            name="pm_minute"
            label="Số phút áp dụng mức phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Input
              placeholder="Nhập số phút"
              type="number"
              size="large"
            ></Input>
          </Form.Item>
          <Form.Item
            name="pm_type_phat"
            label="Loại phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Select
              placeholder="Chọn phương thức"
              size="large"
              options={[
                { value: 1, label: "Phạt tiền / ca" },
                {
                  value: 0,
                  label: "Phạt công/ ca ",
                },
              ]}
              suffixIcon={<img src="/down-icon.png"></img>}
            ></Select>
          </Form.Item>
          <Form.Item
            name="pm_monney"
            label="Số tiền hoặc công phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <InputNumber
              placeholder="Nhập số tiền hoặc công phạt"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              size="large"
            ></InputNumber>
          </Form.Item>
          <Form.Item
            name="pm_time_begin"
            label="Thời gian bắt đầu áp dụng    "
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Input type="month" size="large"></Input>
            {/* <DatePicker picker='month' /> */}
          </Form.Item>
          <Form.Item
            name="pm_time_end"
            label="Thời gian kết thúc"
            labelCol={{ span: 24 }}
          >
            <Input type="month" size="large"></Input>
          </Form.Item>
          <Form.Item className={styles.formButton}>
            <Button htmlType="submit" className={styles.button}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export const ModalCaiDatDiMuonVeSom = (
  open: boolean,
  setOpen: Function,
  data: any,
  setData: any,
  listCa: any[],
  reload: boolean,
  setReload: any
) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (value) => {
    if (value) {
      const comp_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/insert_phat_muon", {
        ...value,
        pm_id_com: comp_id,
      });

      if (res?.data) {
        window.alert("Thêm mới thành công");
        setOpen(false);
        setReload(!reload);
      }
    }
  };

  return (
    <Modal
      className={styles.modal}
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      destroyOnClose
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm mới mức phạt đi muộn về sớm</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="pm_type"
            label="Lý do phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Select
              placeholder="Chọn lí do"
              size="large"
              suffixIcon={<img src="/down-icon.png"></img>}
              options={[
                { value: 1, label: "Phạt đi muộn" },
                { value: 2, label: "Phạt về sớm" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            name="pm_shift"
            label="Ca làm việc áp dụng"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Select
              placeholder="Tất cả các ca"
              size="large"
              suffixIcon={<img src="/down-icon.png"></img>}
              options={
                listCa &&
                listCa?.map((item) => ({
                  value: item?.shift_id,
                  label: item?.shift_name,
                }))
              }
            ></Select>
          </Form.Item>
          <Form.Item
            name="pm_minute"
            label="Số phút áp dụng mức phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Input
              placeholder="Nhập số phút"
              type="number"
              size="large"
            ></Input>
          </Form.Item>
          <Form.Item
            name="pm_type_phat"
            label="Loại phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Select
              placeholder="Chọn phương thức"
              size="large"
              suffixIcon={<img src="/down-icon.png"></img>}
              options={[
                { value: 1, label: "Phạt tiền / ca" },
                {
                  value: 0,
                  label: "Phạt công/ ca ",
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            name="pm_monney"
            label="Số tiền hoặc công phạt"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <InputNumber
              placeholder="Nhập số tiền hoặc công phạt"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              size="large"
            ></InputNumber>
          </Form.Item>
          <Form.Item
            name="pm_time_begin"
            label="Thời gian bắt đầu áp dụng    "
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Trường này là bắt luộc" }]}
          >
            <Input type="month" size="large"></Input>
            {/* <DatePicker
              picker='month'
              style={{ width: '100%' }}
              placeholder='Chọn tháng'
              size='large'
            /> */}
          </Form.Item>
          <Form.Item
            name="pm_time_end"
            label="Thời gian kết thúc"
            labelCol={{ span: 24 }}
          >
            <Input type="month" size="large"></Input>
          </Form.Item>
          <Form.Item className={styles.formButton}>
            <Button htmlType="submit" className={styles.button}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
