import { Button, Card, Col, DatePicker, Form, Row, Select, Table } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./xuat-cong.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { removeVietnameseTones } from "@/constants/style-constants";
import dayjs from "dayjs";
import { ExportExcellButton } from "@/utils/ExportExccel";
import { getOrganizeDetail } from "@/utils/BaseApi";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";

const listMonth = [
  { value: 1, label: "Tháng 1" },
  { value: 2, label: "Tháng 2" },
  { value: 3, label: "Tháng 3" },
  { value: 4, label: "Tháng 4" },
  { value: 5, label: "Tháng 5" },
  { value: 6, label: "Tháng 6" },
  { value: 7, label: "Tháng 7" },
  { value: 8, label: "Tháng 8" },
  { value: 9, label: "Tháng 9" },
  { value: 10, label: "Tháng 10" },
  { value: 11, label: "Tháng 11" },
  { value: 12, label: "Tháng 12" },
];
const listDaysVN = {
  1: "Hai",
  2: "Ba",
  3: "Tư",
  4: "Năm",
  5: "Sáu",
  6: "Bảy",
  7: "CN",
};

const listYear = [
  {
    value: `${Number(moment().format("YYYY")) - 1}`,
    label: `Năm ${Number(moment().format("YYYY")) - 1}`,
  },

  {
    value: `${moment().format("YYYY")}`,
    label: `Năm ${moment().format("YYYY")}`,
  },

  {
    value: `${Number(moment().format("YYYY")) + 1}`,
    label: `Năm ${Number(moment().format("YYYY")) + 1}`,
  },
];
export default function XuatCong({}) {
  const { RangePicker } = DatePicker;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [totalCong, setTotalCong] = useState(0);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const com_id = Cookies.get("com_id");
  const now = moment().format("YYYY-MM-DD");
  const oneMonthAgo = moment().startOf("month")?.format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(now);
  const currentUrlQlc = process.env.NEXT_PUBLIC_API;
  const [listEmpLabel, setListEmpLabel] = useState<any>();
  const formatDate = "DD-MM-YYYY";
  const [orgDetailList, setOrgDetailList] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState();
  const [params, setParams] = useState<any>({
    curPage: 1,
    start_date: startDate,
    end_date: endDate,
  });
  useEffect(() => {
    try {
      const fetcher = async () => {
        const object = {
          com_id: com_id,
          orgId: selectedOrg || undefined,
        };
        const response = await axios.post(
          `${currentUrlQlc}/api/qlc/employee/listEmpSimpleNoToken`,
          object
        );
        if (response?.status == 200) {
          const newData = response?.data.data.list?.map((emp, index) => ({
            label: emp?.idQLC + " - " + emp?.userName,
            value: emp?.idQLC,
            labelNoVN: removeVietnameseTones(
              `${emp?.idQLC} - ${emp?.userName}`
            ),
          }));
          setListEmpLabel(newData);
        }
      };
      fetcher();
    } catch (error) {}
  }, [selectedOrg]);

  // orgDetailList
  useEffect(() => {
    const getOrgDetail = async () => {
      const res = await getOrganizeDetail();

      setOrgDetailList(res);
    };

    getOrgDetail();
  }, []);

  const columns: any = [
    {
      title: "Ảnh",
      key: 1,
      render: (data) => {
        return (
          <>
            <div></div>
          </>
        );
      },
    },
    {
      title: "Họ tên (ID)",
      key: 2,
      render: (data) => {
        return (
          <>
            <div></div>
          </>
        );
      },
    },
    {
      title: "Tổ chức",
      key: 3,
      render: (data) => {
        return (
          <>
            <div></div>
          </>
        );
      },
    },
    {
      title: "Chi tiết thời gian chấm công",
      render: (ar) => {
        return <>ar</>;
      },
      //   children: [
      //     {
      //       title: "Age",
      //       dataIndex: "age",
      //       key: "age",
      //     },
      //     {
      //       title: "Age",
      //       dataIndex: "age",
      //       key: "age",
      //     },
      //   ],
    },
    {
      title: "Tổng giờ",
      key: 4,
      render: (data) => {
        return (
          <>
            <div></div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/data_cham_cong", {
        ...params,
        com_id: com_id,
      });

      if (res?.message === "success") {
        const temp = res?.data?.listData;
        console.log("temp", temp);
        setData(temp);
        setTotalPages(res?.data?.totalPages);
        setTotalCong(res?.data?.total);
        setLoading(false);
      }
    };
    getData();
  }, [params]);

  const onFinish = (val) => {
    if (val?.ep_id === "all") {
      setParams({
        start_date: val?.from?.format("YYYY-MM-DD"),
        end_date: val?.to?.format("YYYY-MM-DD"),
        ep_id: null,
      });
    }
    setParams({
      start_date: val?.from?.format("YYYY-MM-DD"),
      end_date: val?.to?.format("YYYY-MM-DD"),
      ep_id: val?.ep_id,
    });
  };
  return (
    <>
      <Card>
        <div className={styles.main}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className={styles.headText} style={{ color: "#474747" }}>
              Bảng công nhân viên
            </p>
          </div>
          <Form form={form} onFinish={onFinish}>
            <div style={{ margin: "20px 0px 20px 0px" }}>
              <Row gutter={[20, 10]}>
                <Col md={7}>
                  <Form.Item name={"organizeDetailId"}>
                    <Select
                      className={styles.phongBan}
                      placeholder="Chọn tổ chức"
                      size="large"
                      onChange={(val) => {
                        const selected = orgDetailList?.find(
                          (item) => item?.id === val
                        );
                        setSelectedOrg(selected?.listOrganizeDetailId);
                      }}
                      options={orgDetailList?.map((item) => ({
                        label: item?.organizeDetailName,
                        value: item?.id,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name={"ep_id"}>
                    <Select
                      options={[
                        { label: "Tất cả nhân viên", value: "all" },
                        ...(listEmpLabel ? listEmpLabel : []),
                      ]}
                      showSearch
                      filterOption={(input, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.indexOf(input.toLowerCase()) >= 0 ||
                        option?.labelNoVN
                          ?.toLowerCase()
                          ?.indexOf(input.toLowerCase()) >= 0
                      }
                      size="large"
                      placeholder="Tìm theo tên nhân viên"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                {/* <Col md={6}>
                  <Form.Item name="from" className={styles.input}>
                    <RangePicker
                      size="large"
                      format={"DD-MM-YYYY"}
                      defaultValue={[
                        dayjs(
                          `01/${dayjs().month() + 1}/${dayjs().year()}`,
                          formatDate
                        ),
                        dayjs(
                          `${dayjs().endOf("month")}/${
                            dayjs().month() + 1
                          }/${dayjs().year()}`,
                          formatDate
                        ),
                      ]}
                    />
                  </Form.Item>
                </Col> */}

                <Col md={4}>
                  <Form.Item name={"month"}>
                    <Select
                      options={listMonth}
                      showSearch
                      size="large"
                      placeholder={`Tháng ${moment().format("MM")}`}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col md={4}>
                  <Form.Item name={"year"}>
                    <Select
                      options={listYear}
                      showSearch
                      size="large"
                      placeholder={`Năm ${moment().format("YYYY")}`}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col xl={3} lg={3} md={4} sm={6} xs={12}>
                  <Button
                    className={styles.button}
                    htmlType="submit"
                    size="large"
                    onClick={() => null}
                  >
                    <p className={styles.txt}>Lọc</p>
                  </Button>
                </Col>

                <Col xl={4} lg={4} md={5} sm={7} xs={12}>
                  <div style={{ width: "100%" }}>
                    <ExportExcellButton
                      fileName={`Bảng xuât công từ ${moment(startDate).format(
                        "DD-MM-YYYY"
                      )} đến ${moment(endDate).format("DD-MM-YYYY")}`}
                      fileHeaders={[
                        `Bảng xuât công từ ${moment(startDate).format(
                          "DD-MM-YYYY"
                        )} đến ${moment(endDate).format("DD-MM-YYYY")}`,
                      ]}
                      listkeys={[
                        "Mã nhân viên",
                        "Họ và tên",
                        "Ngày tháng",
                        "Thứ",
                        "Công",
                        "Muộn(phút)",
                        "Sớm(phút)",
                        "Số giờ",
                        "Tổng thời gian",
                        "Dữ liệu chấm công",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                      ]}
                      data={
                        data
                          ? data?.map((item) => [
                              item?._id,
                              item?.user?.userName,
                              item?.at_time?.split("T")?.[0],
                              listDaysVN[
                                moment(item?.at_time?.split("T")?.[0])?.day()
                              ],
                              //cong
                              item?.dataCal?.num_to_calculate,
                              //muon
                              item?.dataCal?.late,
                              //som
                              item?.dataCal?.early,
                              //so  gio
                              (item?.totalTime / 60).toFixed(2),
                              // tổng thời gian
                              item?.totalTime?.toFixed(2) + " phút",
                              ...item?.data?.map((i) => {
                                return moment(i?.at_time)?.format("HH:mm:ss");
                              }),
                            ])
                          : []
                      }
                      component={
                        <Button
                          className={styles.button2}
                          size="large"
                          type="primary"
                          style={{ backgroundColor: "#34B171" }}
                        >
                          <p className={styles.textB}>Xuất file Excel</p>
                        </Button>
                      }
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
        <div>
          <Table
            scroll={{ x: "max-content" }}
            bordered
            size="middle"
            columns={columns}
            loading={loading}
          ></Table>
        </div>
      </Card>
    </>
  );
}
