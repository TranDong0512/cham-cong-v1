import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  Form,
  Select,
  Skeleton,
  InputNumber,
} from "antd";
const { Option } = Select;
import styles from "./modal-thiet-lap.module.css";
import Image from "next/image";
import type { SelectProps } from "antd";
import { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import moment from "moment";

export function ModalThietLapBaoHiemNhanVien(
  open: boolean,
  setOpen: Function,
  key: any,
  onChangeKey: (key1: string) => void
) {
  const [form] = Form.useForm();
  const Save = () => {
    setOpen(false);
  };
  const [monthFrom, setMonthFrom] = useState("");
  const [monthTo, setMonthTo] = useState("");
  const [typeOfInsurance, setTypeOfInsurance] = useState("");
  const [selectInsurance, setSelectInsurance] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const handleSubmit = async () => {
    // const isFieldsFilled1 = form.getFieldValue('monthFrom')
    // const isFieldsFilled2 = form.getFieldValue('monthTo')
    // const isFieldsFilled3 = form.getFieldValue('insurance')
    // if (isFieldsFilled1 !== undefined && isFieldsFilled3 !== undefined) {
    //   setMonthFrom(isFieldsFilled1)
    //   setMonthTo(isFieldsFilled2)
    //   setTypeOfInsurance(isFieldsFilled3)
    //   setOpen(false)
    //   onChangeKey('3')
    // }
    const values = form.getFieldsValue();

    const com_id = getCompIdCS();
    const obbj = {
      cls_day:
        moment(values?.monthFrom)?.format("YYYY-MM-DD") + "T00:00:00.000+07:00",
      cls_day_end: values?.monthTo
        ? moment(values?.monthTo)?.format("YYYY-MM-DD") + "T00:00:00.000+07:00"
        : "",
      cls_id_cl: values?.insurance,
      cls_id_com: com_id,
      cls_id_user: key?.idQLC,
    };

    if (selectedType === 3) obbj["salaryBH"] = values?.money;

    const res = await POST_TL("api/tinhluong/congty/them_nv_nhom_insrc", obbj);
    if (res?.message === "success") {
      window.alert("Thêm nhân viên vào bảo hiểm thành công");
      setOpen(false);
    }
  };

  const defaultInsrc = [
    { value: 3, label: "Nhập tiền bảo hiểm" },
    {
      value: 4,
      label: "BHXH tính theo lương cơ bản",
    },
    {
      value: 5,
      label: "BHXH tính theo lương nhập vào",
    },
  ];

  useEffect(() => {
    const getListInsrc = async () => {
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/takeinfo_insrc", {
        cl_com: com_id,
      });

      setSelectInsurance([
        ...defaultInsrc,
        ...res?.tax_list?.map((item) => ({
          label: item?.cl_name,
          value: item?.cl_id,
        })),
      ]);
    };

    getListInsrc();
  }, []);

  return (
    <Modal
      open={open}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      className={`modal_thiet_lap`}
    >
      <div className={styles.header}>
        <div className={styles.textHead}>Bảo hiểm nhân viên</div>
        <div className={styles.crossImage}>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>

      <div className={styles.body}>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <div>
            <Row>
              <Col>
                <Image
                  src={"/avt_365.png"}
                  alt=""
                  height={50}
                  width={50}
                  style={{ margin: "10px 10px 10px 10px" }}
                />
              </Col>
              <Col
                style={{
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ color: "#4C5BD4", fontSize: "16px" }}>
                  {key?.userName}
                </div>
                <div style={{ fontSize: "16px" }}>ID: {key?.idQLC} </div>
              </Col>
            </Row>
          </div>
          <Form.Item
            rules={[
              { required: true, message: "Bắt buộc điền tháng áp dụng!" },
            ]}
            name="monthFrom"
          >
            <div className={styles.bodyItem}>
              <span style={{ fontSize: "16px" }}>
                Áp dụng từ tháng <span style={{ color: "red" }}>*</span>
              </span>
              <Input
                required
                type="month"
                style={{ width: "100%", fontSize: "16px" }}
                placeholder="Chọn tháng"
              ></Input>
            </div>
          </Form.Item>
          <Form.Item name="monthTo">
            <div className={styles.bodyItem}>
              <span style={{ fontSize: "16px" }}>
                Đến tháng (Không bắt buộc)
              </span>
              <Input
                type="month"
                style={{ width: "100%", fontSize: "16px" }}
                placeholder="Chọn tháng"
              ></Input>
            </div>
          </Form.Item>
          {selectedType === 3 && (
            <>
              <div style={{ fontSize: "16px" }}>
                Tiền bảo hiểm<span style={{ color: "red" }}>*</span>
              </div>
              <Form.Item
                name="money"
                label=""
                rules={[
                  { required: true, message: "Bắt buộc điền tiền bảo hiểm!" },
                ]}
              >
                <InputNumber
                  size="large"
                  placeholder="Nhập tiền bảo hiểm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </>
          )}
          <div style={{ fontSize: "16px" }}>
            Loại bảo hiểm <span style={{ color: "red" }}>*</span>
          </div>
          <Form.Item
            name="insurance"
            label=""
            rules={[
              { required: true, message: "Bắt buộc điền loại bảo hiểm!" },
            ]}
          >
            <Select
              style={{ width: "100%", fontSize: "16px" }}
              placeholder="Chọn loại bảo hiểm"
              className={`${styles.selectYeah} select_thietLap`}
              onChange={(e) => setSelectedType(e)}
              options={selectInsurance}
              suffixIcon={
                <Image src="/suffixIcon_1.svg" alt="" width={14} height={14} />
              }
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.hasButton}>
              <Button className={styles.ButtonWhite} onClick={Save}>
                <p style={{ color: "#4C5BD4", fontSize: "18px" }}>Hủy</p>
              </Button>
              <Button
                className={styles.Button}
                htmlType="submit"
                onClick={handleSubmit}
              >
                <p className={styles.txt}>Lưu</p>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
