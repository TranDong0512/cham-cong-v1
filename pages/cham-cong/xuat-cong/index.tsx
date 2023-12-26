import { Card, Input, Row, Col, Button, Form, Select, DatePicker } from "antd";
import "./xuat-cong.module.css";
import styles from "./xuat-cong.module.css";
import {
  POST,
  POST_SS,
  POST_TL,
  getCompIdCS,
  getCompIdSS,
} from "@/pages/api/BaseApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { useRouter } from "next/router";
import { xuatCong } from "@/components/cham-cong/xuat-cong/xuat-cong-cpn";
import { ExportExcellButton } from "@/utils/ExportExccel";
import { ExportExcel } from "@/utils/btnExcel/index";
import { removeVietnameseTones } from "@/constants/style-constants";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
export interface DataType {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  date: string;
  time: string;
}

const listDaysVN = {
  1: "Hai",
  2: "Ba",
  3: "Tư",
  4: "Năm",
  5: "Sáu",
  6: "Bảy",
  7: "CN",
};

export default function XuatCong({ comData, listDepartments, listEmp }) {
  const [loading, setLoading] = useState(true);
  const [comLabel, setComLabel] = useState({
    label: comData?.data?.com_name,
    value: comData?.data?.com_id,
  });
  const [listDepLabel, setListDepLabel] = useState(
    listDepartments?.items?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  );
  const [listEmpLabel, setListEmpLabel] = useState(
    listEmp?.list?.map((emp) => ({
      label: emp?.idQLC + " - " + emp?.userName,
      value: emp?.idQLC,
      labelNoVN: removeVietnameseTones(`${emp?.idQLC} - ${emp?.userName}`),
      // avatarUser: emp?.avatarUser,
    }))
  );
  const [totalPages, setTotalPages] = useState();
  const [totalCong, setTotalCong] = useState(0);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const now = moment().format("YYYY-MM-DD");
  const oneMonthAgo = moment().startOf("month")?.format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(now);
  const [nameCty, setNameCty] = useState<any>();
  const [params, setParams] = useState<any>({
    curPage: 1,
    start_date: startDate,
    end_date: endDate,
  });

  useEffect(() => {
    form.setFieldValue("from", dayjs(startDate));
    form.setFieldValue("to", dayjs(endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    setNameCty(jwtDecode(Cookies.get("token_base365")));
    const getData = async () => {
      setLoading(true);
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/data_xuat_cong", {
        ...params,
        com_id: com_id,
      });

      if (res?.message === "success") {
        const finalData = [];

        const temp = res?.data;

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
        start_date: val?.from
          ?.format("YYYY-MM-DD")
          .toString()
          .replace(/-/g, "/"),
        end_date: val?.to?.format("YYYY-MM-DD").toString().replace(/-/g, "/"),
        ep_id: null,
      });
    }
    setParams({
      start_date: val?.from?.format("YYYY-MM-DD"),
      end_date: val?.to?.format("YYYY-MM-DD"),
      ep_id: val?.ep_id,
    });
  };

  const [listDep, setListDep] = useState([]);
  console.log(
    "data",
    data[0].lst_time.map((item) => moment(item)?.format("HH:mm:ss")).join(", ")
  );
  return (
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
              <Col xl={15} sm={24} xs={24}>
                <Row gutter={[20, 10]}>
                  <Col xl={12} sm={12} xs={24}>
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
                </Row>
              </Col>
              <Col xl={9} sm={24} xs={24}>
                <Row gutter={20}>
                  <Col xl={12} lg={12} className={styles.Pre}>
                    <Row gutter={20}>
                      <Col
                        span={5}
                        className={styles.text}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p> Từ</p>
                      </Col>
                      <Col span={19}>
                        <Form.Item name="from" className={styles.input}>
                          <DatePicker size="large" format={"DD-MM-YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={12} lg={12} className={styles.Pre}>
                    <Row gutter={20}>
                      <Col
                        span={5}
                        className={styles.text}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p>Đến</p>
                      </Col>
                      <Col span={19}>
                        <Form.Item name="to" className={styles.input}>
                          <DatePicker size="large" format={"DD-MM-YYYY"} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row
              gutter={[20, 10]}
              justify={{ ["sm"]: "end" }}
              className={styles.row2}
            >
              <Col xl={12} sm={12} md={12} xs={24} className={styles.After}>
                <Row gutter={20}>
                  <Col
                    span={2}
                    className={styles.text}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Từ
                  </Col>
                  <Col span={22}>
                    <Form.Item name="from" className={styles.input}>
                      <DatePicker size="large" format={"DD-MM-YYYY"} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xl={12} sm={12} md={12} xs={24} className={styles.After}>
                <Row gutter={20}>
                  <Col
                    span={2}
                    className={styles.text}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Đến
                  </Col>
                  <Col span={22}>
                    <Form.Item name="to" className={styles.input}>
                      <DatePicker size="large" format={"DD-MM-YYYY"} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xl={16} lg={4} md={5} sm={7} xs={12}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {totalCong > 0 && `Tổng công trong tháng:  ${totalCong}`}
                </p>
              </Col>
              <Col xl={4} lg={4} md={5} sm={7} xs={12}>
                <Button
                  className={styles.button}
                  htmlType="submit"
                  size="large"
                  onClick={() => null}
                >
                  <p className={styles.txt} style={{ color: "#fff" }}>
                    Lọc
                  </p>
                </Button>
              </Col>
              <Col xl={4} lg={4} md={5} sm={7} xs={12}>
                <ExportExcel
                  title={`BẢNG XUẤT CÔNG TỪ ${moment(startDate).format(
                    "DD-MM-YYYY"
                  )} đến ${moment(endDate).format("DD-MM-YYYY")}`}
                  columns={[
                    { header: "Mã nhân viên", key: "col1", width: 20 },
                    { header: "Họ và tên", key: "col2", width: 35 },
                    { header: "Phòng ban", key: "col2", width: 55 },
                    { header: "Ngày tháng", key: "col3", width: 20 },
                    { header: "Ca làm việc", key: "col4", width: 35 },
                    {
                      header: "Thời gian làm việc (giờ)",
                      key: "col5",
                      width: 25,
                    },
                    { header: "Đi muộn (phút)", key: "col6", width: 15 },
                    { header: "Về sớm (phút)", key: "col7", width: 15 },
                    { header: "Công", key: "col8", width: 15 },
                    { header: "Tiền", key: "col9", width: 20 },
                    { header: "Tiền theo giờ", key: "col10", width: 15 },
                    { header: "Cộng công", key: "col11", width: 15 },
                    { header: "Cộng tiền", key: "col12", width: 15 },
                    {
                      header: "Phạt tiền (đi muộn về sớm)",
                      key: "col13",
                      width: 27,
                    },
                    {
                      header: "Phạt công (đi muộn về sớm)",
                      key: "col14",
                      width: 27,
                    },
                    { header: "Phạt công (khác)", key: "col15", width: 20 },
                    {
                      header: "Chi tiết ",
                      key: "col16",
                      width: 10,
                    },
                  ]}
                  data={
                    data
                      ? data?.map((item) => [
                          item?.ep_id || "Chưa cập nhật",
                          item?.ep_name || "Chưa cập nhật",
                          item?.organizeDetailName || "Chưa cập nhật",
                          moment(item?.ts_date)?.format("DD-MM-YYYY"),
                          item?.shift_name || "Chưa cập nhật",
                          `${item?.hour_real || 0}`,
                          `${item?.late || 0} `,
                          `${item?.early || 0}`,
                          `${item?.num_to_calculate || 0} công`,
                          `${item?.num_to_money || 0} VNĐ`,
                          `${item?.money_per_hour || 0} VNĐ`,
                          `${item?.cong_xn_them || 0} công`,
                          `${
                            item?.tien_xn_them || item?.tientheogio_xn_them || 0
                          } VNĐ`,
                          `${item?.phat_tien_muon || 0} VNĐ`,
                          `${item?.phat_cong_muon || 0} công`,
                          `${item?.phat_cong_khac || 0} công`,
                          ...item?.lst_time?.map((i) => {
                            return moment(i)?.format("HH:mm:ss");
                          }),
                        ])
                      : []
                  }
                  name={nameCty?.data.userName}
                  nameFile={"Bang_cong_nhan_vien"}
                  loading={loading}
                  type={2}
                ></ExportExcel>
              </Col>
            </Row>
          </div>
        </Form>
        <div>
          {xuatCong(data, totalPages, params, setParams, listDep, loading)}
        </div>
      </div>
    </Card>
  );
}

export const getServerSideProps = async (context) => {
  const curMonth = moment().month() + 1;
  const curDay = moment().date();
  const curYear = moment().year();
  let com_id = null;
  com_id = getCompIdSS(context);

  const res = await Promise.all([
    POST_SS("api/qlc/company/info", {}, context),
    POST_SS("api/qlc/department/list", { com_id: com_id }, context),
    POST_SS(
      "api/qlc/employee/listEmpSimpleNoToken",
      { com_id: com_id },
      context
    ),
  ]);

  return {
    props: {
      comData: res[0],
      listDepartments: res[1],
      listEmp: res[2],
      // listEmpTimekeeping,
    },
  };
};
