import styles from "./nghi-sai-quy-dinh.module.css";
import {
  Row,
  Col,
  Select,
  Button,
  Table,
  Form,
  Checkbox,
  Input,
  Modal,
  InputNumber,
} from "antd";
import Image from "next/image";

import { useEffect, useState } from "react";
import { XoaNghiSaiQuyDinh, XoaThanhCongNghiSaiQuyDinh } from "./modal/xoa/xoa";
import { ChinhSuaThanhCongNghiSaiQuyDinh } from "./modal/chinh-sua/chinhsua";
import moment from "moment";
import { GET, POST, POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import _ from "lodash";

const CaiDatMucPhat = (listCaPhat, type) => {
  const [listCa, setListCa] = useState([]);
  const [selectedCa, setSelectedCa] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const getListCa = async () => {
      const res = await GET("api/qlc/shift/list");
      if (res?.result) {
        setListCa(res?.items);
      }
    };

    getListCa();
  }, []);

  useEffect(() => {
    form.resetFields()
  }, [type])

  const onFinish = async (value) => {
    if (!_.isEmpty(selectedCa)) {
      const com_id = getCompIdCS();
      for (let i = 0; i < selectedCa?.length; i++) {
        const res = await POST_TL("api/tinhluong/congty/insert_phat_ca", {
          pc_com: com_id,
          pc_shift: selectedCa?.[i],
          pc_money: value?.money,
          pc_time: value?.date,
          pc_type: 1,
        });

        router.reload();
      }
    }
  };
  return (
    <>
      {type ? (
        <>
          <div className={styles.middle}>
            <div className={styles.containerCheckbox}>
              {listCa &&
                listCa?.map((data: any, index: number) => (
                  <div key={index} className={styles.checkbox}>
                    <Checkbox
                      className={styles.iconCheckbox}
                      onChange={(e) => {
                        const check = e.target.checked;

                        setSelectedCa(
                          check
                            ? [...selectedCa, data?.shift_id]
                            : selectedCa?.filter(
                                (item) => item !== data?.shift_id
                              )
                        );
                      }}
                    />
                    <div className={styles.textCheckbox}>
                      <div style={{ color: "#4C5BD4" }}>{data?.shift_name}</div>
                      <div>
                        {data?.start_time} - {data?.end_time}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.containerInput}>
              <Form form={form} onFinish={onFinish}>
                <Form.Item
                  name={"money"}
                  label="Nhập mức tiền phạt"
                  rules={[
                    { required: true, message: "Trường này là bắt buộc" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <InputNumber
                    size="large"
                    placeholder="Nhập số tiền phạt"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    controls={false}
                    style={{ width: "100%" }}
                    suffix={<div>VNĐ</div>}
                  ></InputNumber>
                </Form.Item>
                <Form.Item
                  name={"date"}
                  label="Chọn ngày bắt đầu áp dụng mức phạt"
                  rules={[
                    { required: true, message: "Trường này là bắt buộc" },
                  ]}
                  labelCol={{ span: 24 }}
                >
                  <Input
                    size="large"
                    type="date"
                    placeholder="Nhập số tiền phạt"
                  ></Input>
                </Form.Item>
                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button className={styles.button} htmlType="submit">
                    Áp dụng
                  </Button>
                </Form.Item>
              </Form>
              <div className={styles.textInput}>
                <Image src={"/alert.png"} alt="" width={24} height={24} />
                <p className={styles.Luuy}>
                  Lưu ý: Mức phạt sẽ được áp dụng từ ngày được chọn, điều này có
                  thể ảnh hưởng đến kết quả tính lương của các tháng trước. Vui
                  lòng chắc chắn về mốc thời gian áp dụng mức phạt.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const TableNghiSaiQuyDinh = (
  setChiTiet: any,
  listPhat: any,
  setCurrentRow: (record: any) => void
) => {
  const columns: any = [
    {
      key: "1",
      title: "Ca làm việc",
      align: "center",
      render: (record: any) => (
        <div className={styles.textInTable}>
          <div style={{ color: "#4C5BD4" }}>{record?.shift_name}</div>
          <div>{`Từ: ${record?.start_time} - Đến: ${record?.end_time}`}</div>
        </div>
      ),
    },
    {
      key: "2",
      title: "Mức phạt đang áp dụng",
      align: "center",
      render: (record: any) => (
        <div>
          {record?.pc_money
            ? new Intl.NumberFormat("ja-JP")?.format(record?.pc_money)
            : 0}{" "}
          VND
        </div>
      ),
    },
    {
      key: "3",
      title: "Ngày bắt đầu áp dụng",
      align: "center",
      render: (record: any) => (
        <div>
          {record?.pc_time && moment(record?.pc_time)?.format("DD-MM-YYYY")}
        </div>
      ),
    },
    {
      key: "4",
      title: "Xem chi tiết",
      render: (record: any) => (
        <div
          style={{ color: "#4C5BD4", cursor: "pointer" }}
          onClick={() => {
            setCurrentRow(record);
            setChiTiet(true);
          }}
        >
          Xem mức phạt
        </div>
      ),
      align: "center",
    },
  ];
  return (
    <Table
      className={`green-table-bodyBorder`}
      dataSource={listPhat}
      columns={columns}
      pagination={{ position: ["bottomCenter"] }}
      scroll={{ x: "max-content" }}
    ></Table>
  );
};
const ModalChiTiet = (open: any, setOpen: any, data: any) => {
  const [xoa, setXoa] = useState(false);
  const router = useRouter();
  const [xoaThanhCong, setXoaThanhCong] = useState(false);
  const [chinhSua, setChinhSua] = useState(true);
  const [chinhSuaThanhCong, setChinhSuaThanhCong] = useState(false);
  const [inputMoney, setInputMoney] = useState(null);

  useEffect(() => {
    setInputMoney(data?.pc_money)
    setChinhSua(true)
  }, [open, data])

  const onUpdate = async () => {
    const res = await POST_TL("api/tinhluong/congty/update_phat_ca", {
      pc_money: inputMoney,
      pc_shift: data?.pc_shift,
      pc_time: data?.pc_time,
      pc_type: data?.pc_type,
      pc_id: data?.pc_id,
    });

    if (res?.message === "success") {
      // router.replace(router.)
      setChinhSua(true);
      setChinhSuaThanhCong(true);
      router.reload();
    }
  };

  return (
    <Modal
      className={styles.modal}
      open={open}
      onCancel={() => {
        setInputMoney(null)  
        setOpen(false)
      }}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => {
            setInputMoney(null)   
            setOpen(false)
          }}
          className={styles.crossImage}
        />
      </div>
      <div className={styles.modalBody}>
        <p className={styles.textModal}>
          Danh sách mức phạt qua từng thời điểm
        </p>
        <Table
          className={`green-table-bodyBorder ${styles.table_chitiet}`}
          pagination={false}
          dataSource={[data]}
          columns={[
            {
              title: "Mức phạt",
              align: "center",
              render: (record: any) => (
                <div className={styles.money}>
                  {chinhSua ? (
                    <p className={styles.input}>
                      {record?.pc_money
                        ? new Intl.NumberFormat("ja-JP").format(
                            record?.pc_money
                          )
                        : 0}{" "}
                      VNĐ
                    </p>
                  ) : (
                    <Input
                      size="large"
                      type="number"
                      className={styles.input}
                      value={inputMoney}
                      onChange={(e) => setInputMoney(e.target.value)}
                      style={{
                        padding: "2px 5px 0 5px",
                        color: "#474747",
                        fontFamily: '"Roboto", sans-serif',
                      }}
                      defaultValue={record?.pc_money}
                    />
                  )}
                </div>
              ),
            },
            {
              title: "Thời điểm phạt",
              align: "center",
              render: (record: any) => (
                <p>
                  {record?.pc_time &&
                    moment(record?.pc_time)?.format("DD-MM-YYYY")}
                </p>
              ),
            },
            {
              title: "Chức năng",
              align: "center",
              render: (record: any) => (
                <div className={styles.actionGroup}>
                  {chinhSua ? (
                    <Image
                      alt="/"
                      src={"/edit-square.png"}
                      width={24}
                      height={24}
                      onClick={() => setChinhSua(false)}
                    />
                  ) : (
                    <Image
                      alt="/"
                      src={"/save.png"}
                      width={24}
                      height={24}
                      onClick={onUpdate}
                    />
                  )}
                  <div className={styles.divider}></div>
                  <Image
                    alt="/"
                    src={"/delete-icon.png"}
                    width={24}
                    height={24}
                    onClick={() => setXoa(true)}
                  />
                </div>
              ),
            },
          ]}
        ></Table>
        <div className={styles.textInput}>
          <Image src={"/alert.png"} alt="" width={24} height={24} />
          <p className={styles.Luuy}>
            Lưu ý: Mức phạt sẽ áp dụng theo ngày được chọn, việc xóa mức phạt có
            thể ảnh hưởng đến kết quả tính lương của các tháng trước. Hãy chắc
            chắn về mốc phạt được áp dụng sau khi xóa.
          </p>
        </div>
      </div>
      {XoaNghiSaiQuyDinh(
        xoa,
        setXoa,
        setXoaThanhCong,
        "Bạn có muốn xóa mức phạt này ?",
        data
      )}
      {XoaThanhCongNghiSaiQuyDinh(
        xoaThanhCong,
        setXoaThanhCong,
        "Xóa mức phạt thành công"
      )}
      {ChinhSuaThanhCongNghiSaiQuyDinh(
        chinhSuaThanhCong,
        setChinhSuaThanhCong,
        "Chỉnh sửa mức phạt thành công"
      )}
    </Modal>
  );
};
const onClick = (caiDatMucPhat: boolean, setCaiDatMucPhat: Function) => {
  setCaiDatMucPhat(!caiDatMucPhat);
};
export function CpmNghiSaiQuyDinh() {
  const [form] = Form.useForm();
  const [caiDatMucPhat, setCaiDatMucPhat] = useState(false);
  const [chiTiet, setChiTiet] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [listCaPhat, setListCaPhat] = useState([]);
  const [year, setYear] = useState(moment().year());
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getNghiSaiComp = async () => {
      const com_id = getCompIdCS();

      const res = await POST_TL("api/tinhluong/congty/takeinfo_phat_ca_com", {
        pc_com: com_id,
        year: year,
      });

      if (res?.data) {
        setListCaPhat(res?.listPhatCa);
      }
    };

    getNghiSaiComp();
  }, [year, reload]);

  return (
    <div>
      <Row align={"bottom"} gutter={[0, { sm: 20 }]}>
        <Col lg={12} md={15} sm={24} xs={24} className={styles.text}>
          <div className={styles.textTop}>Nghỉ sai quy định</div>
          <div className={styles.textBottom}>
            Nghỉ không có đơn xin phép hoặc có đơn xin phép nhưng bị sếp “hủy
            đơn”
          </div>
        </Col>
        <Col lg={12} md={9} sm={24} xs={24}>
          <Row
            gutter={20}
            justify={"end"}
            align={"bottom"}
            className={styles.rightHeader}
          >
            <Col lg={10} md={12} sm={8} xs={13}>
              <Form.Item>
                <Select
                  size="large"
                  placeholder="Chọn năm"
                  options={_.range(2021, 2025, 1).map((item) => ({
                    label: `Năm ${item}`,
                    value: item,
                  }))}
                  onChange={(val) => setYear(val)}
                  suffixIcon={<img src="/search-black.png"></img>}
                ></Select>
              </Form.Item>
            </Col>
            <Col lg={7} md={12} sm={6} xs={11}>
              <Form.Item>
                <Button
                  size="large"
                  className={styles.installButton}
                  onClick={() => onClick(caiDatMucPhat, setCaiDatMucPhat)}
                >
                  Cài đặt mức phạt
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <div>{CaiDatMucPhat(listCaPhat, caiDatMucPhat)}</div>
      <div className={styles.table}>
        {TableNghiSaiQuyDinh(setChiTiet, listCaPhat, setCurrentRow)}
      </div>
      {ModalChiTiet(chiTiet, setChiTiet, currentRow)}
    </div>
  );
}
