import { Row, Col, Select, Button, Table, Form, Avatar } from "antd";
import Image from "next/image";
import styles from "./di-muon-ve-som-cpn.module.css";
import { filterUnique } from "../nhap-luong-co-ban/nhap-luong-co-ban";
import _, { filter } from "lodash";
import { useState, useEffect, useRef } from "react";
import { GET, POST, POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import dayjs from "dayjs";
import { ExportExcellButton } from "@/utils/ExportExccel";
import moment from "moment";
import { baseURL, getOrganizeDetail } from "@/utils/BaseApi";
import { removeVietnameseTones } from "@/constants/style-constants";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import type { Dayjs } from "dayjs";
import Cookies from "js-cookie";
import axios from "axios";
type RangeValue = [Dayjs | null, Dayjs | null] | null;
function secondsToMinutes(time) {
  return `${Math.floor(time / 60)} phút ${Math.floor(time % 60)} giây`;
}

export function CpmDiMuonVeSom({keyChildren}) {
  const [data, setData] = useState([]);
  const [filterParam, setFilterParam] = useState<any>({
    year: dayjs().year(),
    month: dayjs().month() + 1,
  });
  const [listCa, setListCa] = useState([]);
  const [listEmp, setListEmp] = useState([]);
  const [listPb, setListPb] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [epID, setEpID] = useState<any>();
  const [isThongKe, setIsThongKe] = useState(false);
  const [viTri, setViTri] = useState<any>([]);
  const [positions, setPositions] = useState<any>();
  const [selectedEmp, setSelectedEmp] = useState<any>();
  const [selectedDep, setSelectedDep] = useState<any>();
  form.setFieldsValue(filterParam);
  const com_id = getCompIdCS();
  const token = Cookies.get("token_base365");
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
      .catch((err) => { });
  }, []);
  useEffect(() => {
    const getCa = async () => {
      const res = await GET("api/qlc/shift/list");

      if (res?.result) {
        setListCa(res?.items);
      }
    };

    getCa();
  }, []);

  useEffect(() => {
    const getListPb = async () => {
      const res = await getOrganizeDetail();
      setListPb(res);
    };
    getListPb();
  }, []);

  useEffect(() => {
    form.resetFields()
    set_start_date(dayjs().startOf("month").format("YYYY/MM/DD"))
    set_end_date(dayjs().endOf("month").format("YYYY/MM/DD"))
    setSelectedEmp(null)
    setPositions(null)
    setSelectedDep(null)
    setValue(null)
  }, [keyChildren])

  useEffect(() => {
    const getListEmp = async () => {
      const object = {
        id_com: com_id,
        token: token,
        position_id: positions,
        listOrganizeDetailId: listPb.find(
          (item, index) => item.id == selectedDep
        )?.listOrganizeDetailId,
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
  }, [selectedDep, positions]);

  const columns: any[] = [
    {
      title: "Ảnh",
      align: "center",
      render: (record: any) => (
        <Avatar
          // src={`/${record?.info?.avatarUser}`}
          src={"/avt_365.png"}
          size={50}
          alt=""
        ></Avatar>
      ),
    },
    {
      title: "Họ và tên",
      align: "center",
      render: (record: any) => (
        <div style={{ textAlign: "left" }}>
          <p style={{ color: "#4C5BD4" }}>
            {" "}
            {record?.addition?.ep_id} - {record?.addition?.ep_name}
          </p>
        </div>
      ),
    },
    {
      title: "Phòng ban",
      render: (record: any) => (
        <div>{record?.user?.organizeDetailName || "Chưa cập nhật"}</div>
      ),
      align: "center",
    },
    {
      title: "Thời gian",
      align: "center",
      render: (record: any) => (
        <div>
          <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
            {record?.date &&
              dayjs(record?.date)?.format("DD-MM-YYYY HH:mm:ss A")}
          </p>
        </div>
      ),
    },
    {
      title: "Ca",
      align: "center",
      render: (record: any) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {record?.shift.shift_name}
        </p>
      ),
    },
    {
      title: "Muộn/sớm",
      align: "center",
      render: (record) => {
        return (
          <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
            {record?.addition?.early > 0 &&
              record?.addition?.late_second > 0 ? (
              <p>
                Đi muộn {secondsToMinutes(record?.addition?.late_second)} - Về
                sớm {secondsToMinutes(record?.addition?.early_second)}
              </p>
            ) : (
              <>
                {record?.addition?.early > 0 ? (
                  <p>
                    Về sớm {secondsToMinutes(record?.addition?.early_second)}
                  </p>
                ) : (
                  <>
                    {record?.addition?.late_second > 0 ? (
                      <p>
                        Đi muộn{" "}
                        {secondsToMinutes(record?.addition?.late_second)}
                      </p>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            )}
          </p>
        );
      },
    },
    {
      title: "Phạt",
      align: "center",
      render: (record: any) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {record?.pm_type_phat == 0 ? (
            <p>Phạt {record?.cong} công</p>
          ) : (
            <p>Phạt {record?.cong} VND</p>
          )}
        </p>
      ),
    },
  ];

  const [start_date, set_start_date] = useState<any>(
    dayjs().startOf("month").format("YYYY/MM/DD")
  );
  const [end_date, set_end_date] = useState<any>(
    dayjs().endOf("month").format("YYYY/MM/DD")
  );

  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        const com_id = Cookies.get("com_id");
        const token = Cookies.get("token_base365");

        const res = await POST_TL("api/tinhluong/congty/show_staff_late", {
          start_date: start_date,
          end_date: end_date,
          com_id: com_id,
          token: token,
          ep_id: selectedEmp,
          listOrgDetailId: listPb?.find((item) => item.id == selectedDep) //phòng ban
            ?.listOrganizeDetailId,
          position_id: positions,
        });

        if (res?.message == "success") {
          setData(res?.data);
        }
        setLoading(false);
      };
      if (keyChildren === '4') {
        getData();
      }
    } catch (error) { }
  }, [isThongKe, keyChildren]);

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

  return (
    <div>
      <Form form={form} className={styles.rowFirst} onFinish={onFinish}>
        <Row gutter={20}>
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

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Col
                  lg={3}
                  md={3}
                  sm={24}
                  xs={24}
                  className={`${styles.selects} ${styles.thongKe1}`}
                >
                  <Form.Item>
                    <Button
                      size="large"
                      htmlType="submit"
                      type="primary"
                      style={{ width: "100%", marginBottom: 12 }}
                    >
                      <p>Thống kê</p>
                    </Button>
                  </Form.Item>
                </Col>
                {/* <Col
                  lg={19}
                  md={18}
                  sm={24}
                  xs={24}
                  className={`${styles.button} ${styles.button1}`}
                >
                  <ExportExcellButton
                    fileHeaders={[
                      `Danh sách nhân viên đi muộn ${
                        moment().month() + 1
                      } - ${moment().year()}`,
                    ]}
                    fileName={`Danh sách nhân viên đi muộn ${
                      moment().month() + 1
                    } - ${moment().year()}`}
                    data={[
                      data
                        ? data.map((item) => [
                            item?.idQLC,
                            item?.info?.userName,
                            item?.info?.organizeDetail?.organizeDetailName
                              ? item?.info?.organizeDetail?.organizeDetailName
                              : "Chưa cập nhật",
                            moment(item?.lateData?.ts_date)?.format(
                              "YYYY-MM-DD"
                            ),
                            listCa?.filter(
                              (item) =>
                                item?.shift_id === item?.lateData?.shift_id
                            )?.[0]?.shift_name || "Chưa cập nhật",
                            ` ${
                              item?.lateData?.early_second > 0 && (
                                <p>
                                  Đi sớm
                                  {secondsToMinutes(
                                    item?.lateData?.early_second
                                  )}
                                </p>
                              )
                            }
                        ${
                          item?.lateData?.late_second > 0 && (
                            <p>
                              Đi muộn
                              {secondsToMinutes(item?.lateData?.late_second)}
                            </p>
                          )
                        }`,
                            ` ${
                              item?.moneyData?.cong
                                ? new Intl.NumberFormat("ja-JP").format(
                                    item?.moneyData?.cong
                                  )
                                : 0
                            }
                      ${item?.moneyData?.cong > 10 ? "VND" : "Công"}`,
                          ])
                        : [],
                    ]}
                    listkeys={[
                      "ID",
                      "Tên",
                      "Thời gian",
                      "Ca",
                      "Muộn/sớm",
                      "Phạt",
                    ]}
                    component={
                      <Button
                        size="large"
                        style={{ display: "flex", marginTop: "-10px" }}
                      >
                        <Image
                          src="/excel-icon-white.png"
                          width={24}
                          height={24}
                          alt=""
                          style={{ marginRight: "10px" }}
                        ></Image>
                        Xuất file thống kê
                      </Button>
                    }
                  />
                </Col> */}
              </div>
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
              <Button size="large" htmlType="submit" type="primary">
                <p>Thống kê</p>
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.rowSecond}>
          <Col lg={5} md={6} sm={9} className={styles.text}>
            <div className={styles.textTop}>Theo dõi đi muộn về sớm</div>
            <div className={styles.textBottom}>Quản lý nhân viên ra về</div>
          </Col>
          <Col lg={19} md={18} sm={15}>
            <ExportExcellButton
              fileHeaders={[
                `Danh sách nhân viên đi muộn ${moment().month() + 1
                } - ${moment().year()}`,
              ]}
              fileName={`Danh sách nhân viên đi muộn ${moment().month() + 1
                } - ${moment().year()}`}
              data={
                data
                  ? data.map((item) => [
                    item?.info?.idQLC,
                    item?.info?.userName,
                    item?.info?.organizeDetail?.organizeDetailName
                      ? item?.info?.organizeDetail?.organizeDetailName
                      : "Chưa cập nhật",
                    moment(item?.lateData?.ts_date)?.format("YYYY-MM-DD"),
                    listCa?.find(
                      (ca) => ca?.shift_id === item?.lateData?.shift_id
                    )?.shift_name || "Chưa cập nhật",
                    `${item?.lateData?.early_second > 0
                      ? `Đi sớm ${secondsToMinutes(
                        item?.lateData?.early_second
                      )}`
                      : ""
                    }
                    ${item?.lateData?.late_second > 0
                      ? `Đi muộn ${secondsToMinutes(
                        item?.lateData?.late_second
                      )}`
                      : ""
                    }`,
                    ` ${item?.moneyData?.cong
                      ? new Intl.NumberFormat("ja-JP").format(
                        item?.moneyData?.cong
                      )
                      : 0
                    }
                  ${item?.moneyData?.cong > 10 ? "VND" : "Công"}`,
                  ])
                  : []
              }
              listkeys={[
                "ID",
                "Tên",
                "Phòng ban",
                "Thời gian",
                "Ca",
                "Muộn/sớm",
                "Phạt",
              ]}
              component={
                <Button size="large" type="primary">
                  <p> Xuất file thống kê</p>
                </Button>
              }
            />
          </Col>
        </Row>
      </Form>
      <div className={styles.table}>
        <Table
          loading={loading}
          className={`green-table-bodyBorder`}
          columns={columns}
          dataSource={data}
          pagination={{ position: ["bottomCenter"] }}
          scroll={{ x: "max-content" }}
        ></Table>
      </div>
    </div>
  );
}
