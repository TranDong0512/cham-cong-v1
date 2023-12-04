import { Modal, Form, Input, Table, Button, Select } from "antd";
import styles from "./chinh-sua-phat-cong.module.css";
import Image from "next/image";
import { XoaThuongPhat } from "../xoa/xoa";
import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import { GET, POST_TL, POST_VT_CONG, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

export function ModalChinhSuaThuongPhatCong(
  open: boolean,
  setOpen: Function,
  rowSelectKey: any,
  setRowSelectKey: Function,
  selectedData: any
) {
  console.log("rowSelectKey", rowSelectKey);

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [xacNhanXoa, setXacNhanXoa] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const router = useRouter();
  const [listShift, setListShift] = useState<any>([]);
  const [cong, setCong] = useState<any>();
  const [day, setDay] = useState<any>(
    moment(rowSelectKey?.phatcong_time)?.format("YYYY-MM-DD")
  );
  const handleDay = (e) => {
    setDay(e.target.value);
  };
  useEffect(() => {
    let com_id = null;
    com_id = getCompIdCS();
    com_id &&
      POST_VT_CONG("api/vanthu/dexuat/empShiftInDay", {
        ep_id: rowSelectKey?.ep_id,
        day: day,
      }).then((res) => {
        setListShift(res.list);
      });
  }, [day, rowSelectKey]);

  useEffect(() => {
    if (selectedData && selectedData.tt_phat_cong.ds_phat_cong[0]) {
      const so_cong =
        selectedData.tt_phat_cong.ds_phat_cong[0].shifts?.num_to_calculate
          ?.$numberDecimal;
      setCong(so_cong);
    }
  }, [selectedData]);
  const onChange = (value: string) => {
    const so_cong = listShift.find(
      (item) => item.shift_id == value
    )?.num_to_calculate;
    setCong(so_cong);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    form.setFieldsValue({
      ...rowSelectKey,
      phatcong_time: moment(rowSelectKey?.phatcong_time)?.format("YYYY-MM-DD"),
    });
  }, [rowSelectKey]);

  const onFinish = async (value) => {
    const body = {
      ...value,
      id_phatcong: rowSelectKey?.id_phatcong,
    };

    const res = await POST_TL("api/tinhluong/congty/edit_phatcong", body);

    if (res?.message === "Cập nhật thành công") {
      window.alert("Sửa thưởng phạt thành công");
      setOpen(false);
      router.reload();
    } else {
      window.alert("Sửa thưởng phạt lỗi");
    }
  };

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
        <Form form={form} className={styles.bodyLeft} onFinish={onFinish}>
          <div>
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

            <Form.Item labelCol={{ span: 24 }} label={"Số công áp dụng"}>
              <Input disabled value={cong}></Input>
            </Form.Item>

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
                Cập nhật phạt
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className={styles.bodyRight}>
          {/* {!_.isEmpty(selectedData?.tt_thuong?.ds_thuong) && (
            <Table
              className={`green-table-bodyBorder`}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={selectedData?.tt_thuong?.ds_thuong}
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
                  title: <p style={{ color: "#fff" }}>Điều chỉnh</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setRowSelectKey(record);
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setSelectedRow(record);
                          setXacNhanXoa(true);
                        }}
                      />
                    </div>
                  ),
                },
              ]}
              rowClassName={(record, index) =>
                rowSelectKey?.pay_id === record?.pay_id &&
                rowSelectKey?.pay_status === 1
                  ? `${styles.select}`
                  : ``
              }
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
                  title: <p style={{ color: "#fff" }}>Điều chỉnh</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setRowSelectKey(record);
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setSelectedRow(record);
                          setXacNhanXoa(true);
                        }}
                      />
                    </div>
                  ),
                },
              ]}
              rowClassName={(record, index) =>
                rowSelectKey?.pay_id === record?.pay_id &&
                rowSelectKey?.pay_status === "phatcong"
                  ? `${styles.select}`
                  : ``
              }
            ></Table>
          )}
        </div>
      </div>
      {XoaThuongPhat(xacNhanXoa, setXacNhanXoa, selectedRow)}
    </Modal>
  );
}
