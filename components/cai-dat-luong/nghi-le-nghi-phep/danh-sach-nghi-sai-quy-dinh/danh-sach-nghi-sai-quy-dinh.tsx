import { Table, Form, Button, Select, Row, Col } from "antd";
import styles from "./danh-sach-nghi-sai-quy-dinh.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import moment from "moment";
import { filterUnique } from "../../nhap-luong-co-ban/nhap-luong-co-ban";
import _, { filter } from "lodash";
import { GET, POST, POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { removeVietnameseTones } from "@/constants/style-constants";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import axios from "axios";
import { baseURL, getOrganizeDetail } from "@/utils/BaseApi";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import type { Dayjs } from "dayjs";
import { ExportExcel } from "@/utils/btnExcel";
import jwtDecode from "jwt-decode";

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const TableDanhSachNghiSaiQD = ({ data }: { data: any }) => {
  const columns: any = [
    {
      title: "Họ và Tên (ID)",
      align: "center",
      render: (record: any) => (
        <div className={styles.name}>
          <Image src={`/avt_365.png`} alt="" width={46} height={46} />
          <div className={styles.nameRight}>
            <p style={{ color: "#4c5bd4" }}>{record?.userName}</p>
            <p>{record?.ep_id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Tổ chức",
      align: "center",
      render: (record: any) => (
        <div>{record?.organizeDetailName || "Chưa cập nhật"}</div>
      ),
    },
    {
      title: "Thời gian áp dụng",
      align: "center",
      render: (record: any) => (
        <div>{record?.date && moment(record?.date)?.format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Ca",
      align: "center",
      render: (record: any) => <div>{record?.shift_name}</div>,
    },
    {
      title: "Phạt",
      align: "center",
      render: (record: any) => (
        <div style={{ color: "#FF5B4D" }}>
          {new Intl.NumberFormat().format(record?.phat) || 0} VNĐ
        </div>
      ),
    },
  ];
  return (
    <Table
      className={`green-table-bodyBorder ${styles.table}`}
      dataSource={data}
      columns={columns}
      pagination={{ position: ["bottomCenter"] }}
      scroll={{ x: "max-content" }}
    ></Table>
  );
};

export function CpmDanhSachNghiSaiQuyDinh({ keyChildren }) {
  const com_id = getCompIdCS();
  const token = Cookies.get("token_base365");
  const [listData, setListData] = useState([]);
  const [isThongKe, setIsThongKe] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<any>();
  const [viTri, setViTri] = useState<any>([]);
  const [listCa, setListCa] = useState([]);
  const [listPb, setListPb] = useState([]);
  const [positions, setPositions] = useState<any>();
  const [selectedDep, setSelectedDep] = useState<any>();
  const [listEmp, setListEmp] = useState([]);
  const [nameCty, setNameCty] = useState<any>();

  const [start_date, set_start_date] = useState<any>(
    dayjs().startOf("month").format("YYYY/MM/DD")
  );
  const [end_date, set_end_date] = useState<any>(
    dayjs().endOf("month").format("YYYY/MM/DD")
  );

  // ds vi tri
  useEffect(() => {
    axios
      .post(
        `${baseURL}api/qlc/positions/listAll`,
        { com_id: com_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setViTri(res?.data.data.data);
      })
      .catch((err) => {});
  }, []);
  // ds ca làm việc
  useEffect(() => {
    try {
      const getCa = async () => {
        const res = await GET("api/qlc/shift/list");
        if (res?.result) {
          setListCa(res?.items);
        }
      };
      getCa();
    } catch (error) {}
  }, []);
  // ds phòng ban
  useEffect(() => {
    try {
      const getListPb = async () => {
        const res = await getOrganizeDetail();
        setListPb(res);
      };
      getListPb();
    } catch (error) {}
  }, []);
  // ds nhanvien
  useEffect(() => {
    try {
      const getListEmp = async () => {
        const object = {
          id_com: com_id,
          token: token,
          position_id: positions,
          listOrganizeDetailId: listPb.find(
            (item, index) => item.id == selectedDep
          )?.listOrganizeDetailId,
          pageSize: 100000,
        };
        const res = await POST("api/qlc/managerUser/listUser", object);
        if (res.result == true) {
          const dataRes = res?.data;
          const newData = dataRes.map((item, index) => ({
            ...item,
            key: index + 1,
            value: item.ep_id,
            label: item.userName,
          }));
          setListEmp(newData);
        }
      };
      getListEmp();
    } catch (error) {}
  }, [selectedDep, positions]);
  //data table
  useEffect(() => {
    try {
      setNameCty(jwtDecode(Cookies.get("token_base365")));
      const getData = async () => {
        const res = await POST_TL(
          "api/tinhluong/congty/take_listuser_nghi_khong_phep",
          {
            start_date: start_date,
            end_date: end_date,
            com_id: com_id,
            token: token,
            ep_id: selectedEmp,
            listOrgDetailId: listPb?.find((item) => item.id == selectedDep) //phòng ban
              ?.listOrganizeDetailId,
            position_id: positions,
          }
        );

        if (res?.message == "success") {
          setListData(res?.data);
        }
      };
      getData();
    } catch (error) {}
  }, [isThongKe, keyChildren]);
  const [form] = Form.useForm();

  const onFinish = (value) => {
    setIsThongKe(!isThongKe);
  };

  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  let end_date_set = null;

  useEffect(() => {
    if (dates != null && dates[0]) {
      const month = dayjs(dates[0]).format("MM");
      const year = dayjs(dates[0]).format("YYYY");
      const dateInMonth = dayjs()
        .year(+year)
        .month(+month - 1);
      end_date_set = dateInMonth.endOf("month").format("DD");
    }
  }, [dates]);

  useEffect(() => {
    if (value != null && value) {
      set_start_date(value[0]?.format("YYYY/MM/DD"));
      set_end_date(value[1]?.format("YYYY/MM/DD"));
    }
  }, [dates]);
  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= +end_date_set;

    return !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  useEffect(() => {
    form.resetFields();
    set_start_date(dayjs().startOf("month").format("YYYY/MM/DD"));
    set_end_date(dayjs().endOf("month").format("YYYY/MM/DD"));
    setSelectedEmp(null);
    setPositions(null);
    setSelectedDep(null);
    setValue(null);
  }, [keyChildren]);
  console.log("listData", listData);
  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ year: moment().year(), month: moment().month() + 1 }}
      >
        <Row gutter={20} className={styles.rowFirst}>
          <Col lg={21} md={21} sm={24} xs={24}>
            <Row gutter={[20, { sm: 10, xs: 10 }]}>
              <Col lg={6} md={12} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={"room"}>
                  <Select
                    size="large"
                    placeholder="Chọn phòng ban"
                    onChange={(e) => setSelectedDep(e)}
                    options={[
                      { value: "all", label: "Tất cả phòng ban" },
                      ...listPb?.map((item) => ({
                        label: item?.organizeDetailName,
                        value: item?.id,
                      })),
                    ]}
                    suffixIcon={<img src="/search-black.png"></img>}
                  ></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={"position"}>
                  <Select
                    size="large"
                    showSearch
                    allowClear
                    placeholder={`Vị trí`}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    onChange={(e) => setPositions(e)}
                    options={[
                      ...viTri?.map((item) => ({
                        label: item?.positionName,
                        value: item?.id,
                      })),
                    ]}
                  ></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={"employee"}>
                  <Select
                    size="large"
                    placeholder="Chọn nhân viên"
                    showSearch
                    suffixIcon={<img src="/search-black.png"></img>}
                    onChange={(e) => setSelectedEmp(e)}
                    options={[
                      { label: "Tất cả nhân viên", value: "all" },
                      ...listEmp?.map((item) => ({
                        label: `${item?.ep_id} - ${item?.userName}`,
                        value: item?.ep_id,
                        labelNoVN: removeVietnameseTones(
                          `${item?.ep_id} - ${item?.userName}`
                        ),
                      })),
                    ]}
                    filterOption={(input, option: any) =>
                      option?.label
                        ?.toLowerCase()
                        ?.indexOf(input.toLowerCase()) >= 0 ||
                      option?.labelNoVN
                        ?.toLowerCase()
                        ?.indexOf(input.toLowerCase()) >= 0
                    }
                  ></Select>
                </Form.Item>
              </Col>

              <Col lg={6} md={12} sm={12} xs={24} className={styles.selects}>
                <RangePicker
                  size="large"
                  style={{ marginRight: 6 }}
                  value={dates || value}
                  disabledDate={disabledDate}
                  onCalendarChange={(val) => {
                    setDates(val);
                  }}
                  onChange={(val) => {
                    setValue(val);
                  }}
                  onOpenChange={onOpenChange}
                  changeOnBlur
                />
              </Col>

              <Col
                lg={3}
                md={3}
                sm={4}
                xs={9}
                className={`${styles.selects} ${styles.thongKe1}`}
              >
                <Form.Item>
                  <Button htmlType="submit" size="large" type="primary">
                    <p> Thống kê</p>
                  </Button>
                </Form.Item>
              </Col>
              {/* <Col
                lg={19}
                md={18}
                sm={15}
                xs={15}
                className={`${styles.button} ${styles.button1}`}
              >
                <Button size="large">
                  <Image
                    src="/excel-icon-white.png"
                    width={24}
                    height={24}
                    alt=""
                    style={{ marginRight: "10px" }}
                  ></Image>
                  Xuất file thống kê
                </Button>
              </Col> */}
            </Row>
          </Col>
          <Col
            lg={3}
            md={3}
            sm={4}
            xs={10}
            className={`${styles.selects} ${styles.thongKe2}`}
          >
            <Form.Item>
              <Button htmlType="submit" size="large" type="primary">
                <p> Thống kê</p>
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.rowSecond}>
          <Col lg={7} md={9} sm={11} className={styles.text}>
            <div className={styles.textTop}>
              Danh sách nhân viên nghỉ sai quy định
            </div>
            <div className={styles.textBottom}>
              Quản lý nhân viên nghỉ sai quy định
            </div>
          </Col>
          <Col
            lg={17}
            md={15}
            sm={13}
            // className={`${styles.button} ${styles.button2}`}
          >
            <ExportExcel
              title={`Danh sách nhân viên nghỉ phép ${start_date} đến ${end_date}`}
              columns={[
                { header: "Họ tên(ID)", key: "col1", width: 40 },
                { header: "Tổ chức", key: "col2", width: 40 },
                { header: "Thời gian áp dụng", key: "col3", width: 20 },
                { header: "Ca", key: "col4", width: 35 },
                { header: "Phạt", key: "col5", width: 25 },
              ]}
              data={
                listData
                  ? listData.map((item) => [
                      `${item?.userName} - ${item?.ep_id}`,
                      `${item?.organizeDetailName}`,
                      `${moment(item?.date).format("DD-MM-YYYY")}`,
                      `${item?.shift_name}`,
                      `${new Intl.NumberFormat("ja-JP").format(
                        item?.phat
                      )} VND`,
                    ])
                  : []
              }
              name={nameCty?.data.userName}
              nameFile={"Danh_sach_nhan_vien_nghi_sai_quy_dinh"}
              loading={false}
              type={1}
            ></ExportExcel>
          </Col>
        </Row>
      </Form>
      <div>
        <TableDanhSachNghiSaiQD data={listData} />
      </div>
    </div>
  );
}
