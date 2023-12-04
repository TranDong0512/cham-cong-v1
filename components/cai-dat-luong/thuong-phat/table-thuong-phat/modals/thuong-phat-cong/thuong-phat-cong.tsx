import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Radio,
  Table,
  Button,
  Select,
  Row,
  Col,
} from "antd";
import styles from "./thuong-phat-cong.module.css";
import Image from "next/image";
import moment from "moment";
import _ from "lodash";
import {
  GET,
  POST_TL,
  POST_VT,
  POST_VT_CONG,
  getCompIdCS,
} from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

export function ModalThemThuongPhatCong(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  rowSelectKey: any,
  setRowSelectKey: Function,
  selectedData: any
) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const router = useRouter();
  const [listShift, setListShift] = useState<any>([]);
  const [cong, setCong] = useState<any>();
  const [day, setDay] = useState<any>();
  const [valueChange, setValueChange] = useState<any>();
  const handleDay = (e) => {
    setDay(e.target.value);
  };
  useEffect(() => {
    let com_id = null;
    com_id = getCompIdCS();
    com_id &&
      POST_VT_CONG("api/vanthu/dexuat/empShiftInDay", {
        ep_id: Number(selectedData?.inforUser.idQLC),
        day: day,
      }).then((res) => {
        setListShift(res.list);
      });
  }, [day]);
  const onChange = (value: string) => {
    setValueChange(value);
    const so_cong = listShift.find((item) => item.shift_id == value)
      ?.num_to_calculate.$numberDecimal;
    setCong(so_cong);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = async (value) => {
    const body = {
      ...value,
      ep_id: selectedData?.inforUser?.idQLC,
      com_id: selectedData?.inforUser?.inForPerson?.employee?.com_id,
    };

    const res = await POST_TL("api/tinhluong/congty/phatcong", body);

    if (res?.message === "success") {
      window.alert("Thêm phạt thành công");
      setOpen(false);
      router.reload();
      // router.replace(router.asPath)
    }
  };

  const onConFirm = async (id_phatcong) => {
    const res = await POST_TL("api/tinhluong/congty/xoaphatcong", {
      id_phatcong: id_phatcong,
    });
    if (res?.message === "success") {
      window.alert("Xóa phạt công thành công");
      setOpen(false);
      router.reload();
    } else {
      window.alert("Xóa phạt công thất bại");
    }
  };
  let total = 0;
  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        localStorage.removeItem("userSelect");
      }}
      width={1200}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Phạt công</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => {
            setOpen(false);
            localStorage.removeItem("userSelect");
          }}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish} style={{ flex: "auto" }}>
          <div className={styles.bodyLeft}>
            <Form.Item
              className={styles.formItem}
              name={"phatcong_time"}
              labelCol={{ span: 24 }}
              label={"Ngày áp dụng"}
              rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
            >
              <Input
                type="date"
                size="large"
                onChange={(e) => handleDay(e)}
              ></Input>
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name={"phatcong_shift"}
              labelCol={{ span: 24 }}
              label={"Chọn ca phạt"}
              rules={[{ required: true, message: "Vui lòng chọn ca" }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onChange={onChange}
                filterOption={filterOption}
                placeholder="Chọn ca làm việc"
                options={[
                  { value: "all", label: "Cả ngày" },
                  ...listShift?.map((item, index) => ({
                    value: item.shift_id,
                    label: item.shift_name,
                  })),
                ]}
              ></Select>
            </Form.Item>

            {valueChange !== "all" ? (
              <Form.Item labelCol={{ span: 24 }} label={"Chi tiết phạt công"}>
                <Input
                  disabled
                  value={cong == undefined ? "Số công: " : `Số công: ${cong}`}
                ></Input>
              </Form.Item>
            ) : (
              <>
                <Col>
                  <p style={{ marginBottom: 8 }}>Chi tiết phạt công</p>
                  {listShift?.map((item, index) => {
                    total += Number(item.num_to_calculate.$numberDecimal);
                    return (
                      <div>
                        <Col
                          span={24}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 12,
                          }}
                        >
                          <Col span={11}>
                            <Input
                              disabled
                              value={item.shift_name}
                              style={{ width: "100%" }}
                            ></Input>
                          </Col>

                          <Col span={11}>
                            <Input
                              disabled
                              value={
                                "Số công: " +
                                item.num_to_calculate.$numberDecimal
                              }
                              style={{ width: "100%" }}
                            ></Input>
                          </Col>
                        </Col>
                      </div>
                    );
                  })}
                </Col>

                <Form.Item labelCol={{ span: 24 }} label={"Tổng số công"}>
                  <Input disabled value={"Tổng số công: " + total}></Input>
                </Form.Item>
              </>
            )}

            <Form.Item
              className={styles.formItem}
              name={"ly_do"}
              labelCol={{ span: 24 }}
              label={"Lý do"}
              rules={[{ required: true, message: "Nhập lý do phạt" }]}
            >
              <TextArea></TextArea>
            </Form.Item>

            <Form.Item className={styles.formButton}>
              <Button size="large" htmlType="submit">
                Thêm phạt
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className={styles.bodyRight}>
          {/* {!_.isEmpty(selectedData?.tt_phat_cong?.ds_phat_cong) && (
            <Table
              className={`green-table-bodyBorder`}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={selectedData?.tt_phat_cong?.ds_phat_cong}
              columns={[
                {
                  title: <p style={{ color: "#fff" }}>Tiền thưởng</p>,
                  align: "center",
                  render: (record) => (
                    <p style={{ color: "#34B171" }}>
                      {record?.pay_price || 0} VNĐ
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
                  align: "center",
                  render: (record) => (
                    <p>
                      {record?.pay_day &&
                        moment(record?.pay_day)?.format("DD-MM-YYYY")}
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Lý do</p>,
                  align: "center",
                  render: (record) => <p>{record?.pay_case}</p>,
                },
                {
                  title: <p style={{ color: "#fff" }}>Điều chỉnh thưởng</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setNext(true);
                          setOpen(false);
                          setRowSelectKey(record);
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                        onClick={() => onConFirm(record?.pay_id)}
                      />
                    </div>
                  ),
                },
              ]}
            ></Table>
          )} */}
          {!_.isEmpty(selectedData?.tt_phat_cong?.ds_phat_cong) && (
            <Table
              className={`green-table-bodyBorder ${styles.tableBottom}`}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={selectedData?.tt_phat_cong?.ds_phat_cong}
              columns={[
                {
                  title: <p style={{ color: "#fff" }}>Công phạt</p>,
                  align: "center",
                  render: (record) => (
                    <p style={{ color: "#FF5B4D" }}>
                      {record?.shifts.shift_name} -{" "}
                      {record?.shifts.num_to_calculate.$numberDecimal} công
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
                  align: "center",
                  render: (record) => (
                    <p>
                      {" "}
                      {record?.phatcong_time &&
                        moment(record?.phatcong_time)?.format("DD-MM-YYYY")}
                    </p>
                  ),
                },
                {
                  title: <p style={{ color: "#fff" }}>Lý do</p>,
                  align: "center",
                  render: (record) => <p>{record?.ly_do}</p>,
                },
                {
                  title: <p style={{ color: "#fff" }}>Điều chỉnh phạt</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setNext(true);
                          setOpen(false);
                          setRowSelectKey(record);
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                        onClick={() => onConFirm(record?.id_phatcong)}
                      />
                    </div>
                  ),
                },
              ]}
            ></Table>
          )}
        </div>
      </div>
    </Modal>
  );
}
