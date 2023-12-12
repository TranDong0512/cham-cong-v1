import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Switch,
} from "antd";
import styles from "./modal.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { MyInput, MySelect } from "../quan-ly-cong-ty-con/modal";
import { GET, POST } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import { ModalXacNhan } from "@/components/cham-cong/cong-chuan/modal-xac-nhan-cong-chuan";

export const TYPE_ADD = "add";
export const TYPE_UPDATE = "update";

const THEO_SO_CA = 1;
const THEO_TIEN = 2;
const THEO_GIO = 3;

export function AddCaModal(
  open: boolean,
  setOpen: Function,
  type: string,
  data?: any,
  setData?: Function,
  selectedShift?: any
) {
  const [form] = Form.useForm();
  const [showMore, setShowMore] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] =
    useState<Number>(THEO_SO_CA);
  const [modalXacNhan, setModalXacNhan] = useState(false);
  const router = useRouter();

  const setOpenModal = () => {
    setOpen(false);
    form.resetFields();
  };
  useEffect(() => {
    console.log("selectedShift", selectedShift);
    form.setFieldsValue(selectedShift);
    setSelectedPayMethod(selectedShift?.shift_type);
  }, [form, selectedShift]);

  const handleSubmit = () => {
    // update
    if (type === TYPE_UPDATE && selectedShift !== 0) {
      // console.log({...form.getFieldsValue(), shift_id: selectedShift.shift_id})
      POST("api/qlc/shift/edit", {
        ...form.getFieldsValue(),
        shift_type: selectedPayMethod,
        shift_id: selectedShift.shift_id,
        over_night: checked ? 1 : 0,
        nums_day: nums_day ? nums_day : selectedShift.nums_day,
      })
        .then((res) => {
          if (res?.result === true) {
            window.alert("Sửa ca làm việc thành công");
            router.reload();
          }
        })
        .catch((err) => console.error(err));
    }
    if (type === TYPE_ADD) {
      // create
      // console.log({...form.getFieldsValue(), shift_type: 1})
      POST("api/qlc/shift/create", {
        ...form.getFieldsValue(),
        shift_type: selectedPayMethod,
        over_night: checked ? 1 : 0,
        nums_day: nums_day,
      }).then((res) => {
        if (res?.result === true) {
          window.alert("Thêm ca làm việc thành công");
          router.reload();
        }
      });
    }
  };

  const SelectPaymentMethodBtn = ({
    type,
    title,
  }: {
    type: Number;
    title: string;
  }) => {
    return (
      <div
        className={styles.btn}
        style={{
          backgroundColor: selectedPayMethod === type ? "#4C5BD4" : "#fff",
        }}
        onClick={() => setSelectedPayMethod(type)}
      >
        <p
          className={styles.text}
          style={{
            color: selectedPayMethod === type ? "#fff" : "",
          }}
        >
          {title}
        </p>
      </div>
    );
  };

  const [checked, setChecked] = useState<any>(false);
  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  const [nums_day, setNums_day] = useState<any>();
  const handleInputNumber = (value) => {
    setNums_day(value);
  };
  useEffect(() => {
    if (selectedShift?.over_night == 1) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selectedShift]);
  return (
    <div>
      <Modal
        className="bannerQLC modalThemLLV"
        open={open}
        onCancel={() => setOpenModal}
        width={600}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose={true}
      >
        <div className={styles.header}>
          <div></div>
          <p className={styles.headerText}>
            {type === TYPE_ADD ? "Thêm ca làm việc" : "Sửa ca làm việc"}
          </p>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            style={{ marginRight: "20px" }}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={`quan_ly_ca_body ${styles.body}`}>
          <Form
            form={form}
            initialValues={
              selectedShift || {
                shift_name: "",
                start_time: "",
                end_time: "",
                num_to_calculate: 1,
                shift_type: 1,
                nums_day: "",
              }
            }
          >
            {MyInput(
              "Tên ca làm việc",
              "Nhập tên ca làm việc",
              true,
              true,
              "shift_name"
            )}
            <Row gutter={30} className={styles.negativeMargin15}>
              <Col sm={12} xs={24}>
                <Form.Item
                  name="start_time"
                  rules={[{ required: true, message: "Chọn giờ vào ca" }]}
                  label={<p>{"Giờ vào ca (check in)"}</p>}
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    style={{
                      fontSize: "16px",
                      padding: "6px",
                      width: "100%",
                      display: "flex",
                    }}
                  ></Input>
                </Form.Item>
              </Col>
              <Col sm={12} xs={24}>
                <Form.Item
                  name="end_time"
                  rules={[{ required: true, message: "Chọn giờ hết ca" }]}
                  label={<p>{"Giờ hết ca (check out)"}</p>}
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    // style={{
                    //   fontSize: "16px",
                    //   padding: "6px",
                    //   width: "100%",
                    // }}
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <p
              className={styles.title}
              onClick={() => setShowMore(!showMore)}
              style={{ cursor: "pointer" }}
            >
              Cài đặt giới hạn thời gian
            </p>
            {showMore && (
              <div style={{ marginTop: "10px" }}>
                <Form.Item
                  name="start_time_latest"
                  label={<p>{"Ghi nhận check in sớm nhất (không bắt buộc)"}</p>}
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    style={{
                      fontSize: "16px",
                      padding: "6px",
                      width: "100%",
                    }}
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="end_time_earliest"
                  label={
                    <p>{"Ghi nhận check out muộn nhất (không bắt buộc)"}</p>
                  }
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    style={{
                      fontSize: "16px",
                      padding: "6px",
                      width: "100%",
                    }}
                  ></Input>
                </Form.Item>
              </div>
            )}

            {type == TYPE_ADD && (
              <>
                <Form.Item name="over_night">
                  <Switch defaultChecked={checked} onChange={onChange} />{" "}
                  <span>Ca qua ngày</span>
                </Form.Item>

                <div style={{ margin: "8px 0" }}>
                  {checked ? (
                    <>
                      <Form.Item
                        name="nums_day"
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "Nhập khoảng ngày áp dụng!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          size="large"
                          placeholder="Điền khoảng ngày áp dụng"
                          onChange={handleInputNumber}
                          min={2}
                          max={365}
                        ></InputNumber>
                      </Form.Item>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}

            {type == TYPE_UPDATE && (
              <>
                <Form.Item name="over_night">
                  <Switch checked={checked} onChange={onChange} />{" "}
                  <span>Ca qua ngày</span>
                </Form.Item>

                <div style={{ margin: "8px 0" }}>
                  {checked ? (
                    <>
                      <Form.Item name="nums_day" labelCol={{ span: 24 }}>
                        <InputNumber
                          style={{ width: "100%" }}
                          size="large"
                          placeholder="Điền khoảng ngày áp dụng"
                          onChange={handleInputNumber}
                          min={2}
                          max={365}
                        ></InputNumber>
                      </Form.Item>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}

            <p style={{ marginBottom: "10px" }}>
              Chọn ca thuộc loại hình nào để tính công cuối tháng
            </p>
            <Row gutter={30} className={styles.negativeMargin15}>
              <Col sm={12} xs={24}>
                <SelectPaymentMethodBtn
                  type={THEO_SO_CA}
                  title="Tính công theo số ca"
                />
                <SelectPaymentMethodBtn
                  type={THEO_GIO}
                  title="Tính công theo số giờ"
                />
              </Col>
              <Col sm={12} xs={24}>
                <SelectPaymentMethodBtn
                  type={THEO_TIEN}
                  title="Tính công theo tiền"
                />
              </Col>
            </Row>
            {selectedPayMethod === THEO_SO_CA ? (
              MySelect(
                "Số công tương ứng",
                "Chọn ca làm việc",
                true,
                true,
                "num_to_calculate",
                [
                  { label: "0.25 công / 1 ca", value: 0.25 },
                  { label: "0,5 công / 1 ca", value: 0.5 },
                  { label: "1 công / 1 ca", value: 1 },
                  { label: "3 công / 1 ca", value: 3 },
                ]
              )
            ) : selectedPayMethod === THEO_TIEN ? (
              MyInput(
                "Số tiền tương ứng",
                "Nhập số tiền tương ứng",
                true,
                true,
                "num_to_money",
                "number"
              )
            ) : selectedPayMethod === THEO_GIO ? (
              <Form.Item
                label="Số tiền theo giờ"
                labelCol={{ span: 24 }}
                name={"money_per_hour"}
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Nhập số tiền theo giờ"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  controls={false}
                  addonAfter={"VND"}
                />
              </Form.Item>
            ) : (
              <div></div>
            )}
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                htmlType="submit"
                className={styles.addNewBtn}
                size="large"
                onClick={handleSubmit}
              >
                <p className={styles.btnText}>
                  {type === TYPE_ADD ? "Thêm ca " : "Cập nhật"}
                </p>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {ModalXacNhan(
        modalXacNhan,
        setModalXacNhan,
        type === TYPE_ADD
          ? "Bạn đã thêm ca làm việc thành công "
          : "Bạn đã cập nhật ca làm việc thành công"
      )}
    </div>
  );
}

export function ConfirmDeleteShiftModal(
  open: boolean,
  setOpen: Function,
  onConfirm: Function
) {
  const children = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image alt="/" src={"/big-x.png"} width={50} height={50} />
      <p style={{ marginTop: "20px" }}>Bạn chắc chắn muốn xóa ca?</p>
    </div>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    "Xóa ca làm việc",
    "Xóa",
    onConfirm
  );
}
