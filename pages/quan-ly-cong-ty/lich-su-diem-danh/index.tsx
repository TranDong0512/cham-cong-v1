import { removeVietnameseTones } from "@/constants/style-constants";
import { GET, POST } from "@/pages/api/BaseApi";
import { ExportExcellButton } from "@/utils/ExportExccel";
import { ExportExcel } from "@/utils/btnExcel";
import { EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Table,
} from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function LichSuChamCong() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState();
  const [listEmp, setListEmp] = useState([]);
  const [listPb, setListPb] = useState([]);
  const [reload, setReload] = useState(false);
  const [listDataExcel, setListDataExcel] = useState([]);
  const [note, setNote] = useState("")
  const [note1, setNote1] = useState("abc")
  const [nameCty, setNameCty] = useState<any>();
  const URL = process.env.NEXT_PUBLIC_BASE_URL + "/timviec365";
  const [param, setParam] = useState<any>({
    curPage: 1,
    start_time: dayjs(),
    end_time: dayjs(),
  });

  useEffect(() => {
    const getListEmp = async () => {
      const res = await POST("api/qlc/timekeeping/getListEmpSimple", {});

      if (res?.result) {
        setListEmp(
          res?.data?.map((item) => ({
            label: `${item?.idQLC} - ${item?.userName}`,
            value: item?.idQLC,
            labelNoVN: removeVietnameseTones(
              `${item?.userName}(${item?.idQLC})`
            ),
          }))
        );
      }
    };

    getListEmp();
  }, []);

  useEffect(() => {
    const getListPb = async () => {
      const res = await POST("api/qlc/department/list", {});

      if (res?.result) {
        setListPb(
          res?.items?.map((item) => ({
            label: item?.dep_name,
            value: item?.dep_id,
          }))
        );
      }
    };

    getListPb();
  }, []);
  const [loading, setLoading] = useState(true);
  const [loadExcel, setLoadExcel] = useState(true);
  useEffect(() => {
    try {
      const getList = async () => {
        setLoadExcel(true);
        const res = await POST("api/qlc/timekeeping/getHistoryCheckin", {
          start_time: dayjs(),
          end_time: dayjs(),
          pageSize: 100000000,
        });

        if (res?.result) {
          setListDataExcel(res?.data);
          setLoadExcel(false);
        }
      };

      getList();
    } catch (error) { }
  }, []);

  useEffect(() => {
    try {
      setNameCty(jwtDecode(Cookies.get("token_base365")));
      const getList = async () => {
        setLoading(true);
        const res = await POST("api/qlc/timekeeping/getHistoryCheckin", param);

        if (res?.result) {
          setList(res?.data);
          setCount(res?.total);
          setLoading(false);
        }
      };

      getList();
    } catch (error) { }
  }, [param, reload]);

  // xuất excel luôn lấy tất

  useEffect(() => {
    try {
      setNameCty(jwtDecode(Cookies.get("token_base365")));
      const getList = async () => {
        setLoading(true);
        const res = await POST("api/qlc/timekeeping/getHistoryCheckin", {
          ...param,
          pageSize: 100000000
        });

        if (res?.result) {
          setListDataExcel(res?.data);
          setLoadExcel(false);
        }
      };

      getList();
    } catch (error) { }
  }, [param, reload]);

  const onFinish = (value) => {
    setParam({
      ...param,
      ep_id: value?.ep_id === "all" ? undefined : value?.ep_id,
      dep_id: value?.dep_id === "all" ? undefined : value?.dep_id,
      start_time: dayjs(value?.start_time),
      end_time: dayjs(value?.end_time),
    });
  };

  const [form] = Form.useForm();

  //get lít ca
  const [listCa, setListCa] = useState([]);
  useEffect(() => {
    try {
      const getListca = async () => {
        const res = await GET("api/qlc/shift/list");

        if (res?.result) {
          setListCa(res?.items);
        }
      };

      getListca();
    } catch (error) { }
  }, []);

  const [selectedCa, setSelectedCa] = useState();

  const cols: any = [
    {
      title: <p>Ảnh</p>,
      render: (record) => (
        <Avatar alt="/" src={`${URL}/${record?.image}`} size={50} />
      ),
      align: "center",
    },
    {
      title: <p>Họ và tên</p>,
      render: (record) => (
        <p>
          {record?.ep_id} - {record?.userName}
        </p>
      ),
      align: "center",
    },
    {
      title: <p>Tổ chức</p>,
      render: (record) => <p>{record?.dep?.organizeDetailName}</p>,
      align: "center",
    },
    {
      title: <p>Ca làm việc</p>,
      render: (record) => <p>{record?.shift_name}</p>,
      align: "center",
    },
    {
      title: <p>Thời gian chấm công</p>,
      render: (record) => (
        <>
          <p style={{ fontWeight: "bold" }}>
            {moment(record?.at_time).format("HH:mm:ss ")}
          </p>
          <p>{moment(record?.at_time).format("DD-MM-YYYY")}</p>
        </>
      ),
      align: "center",
    },
    {
      title: <p>Thiết bị chấm công</p>,
      render: (record) => <p>{record?.device}</p>,
      align: "center",
    },
    {
      title: <p>Vị trí</p>,
      render: (record) => <p>{record?.ts_location_name || "Chưa cập nhật"}</p>,
      align: "center",
    },
    {
      title: "Ghi chú",
      render: (record, index) => (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <p>{record?.note}</p>
          <Popover
            key={index}
            trigger={["click"]}
            // visible={record?.note}
            // onVisibleChange={(e) => {
            //   console.log("check voafffffffffffffffffffffffffff")
            // }}
            content={
              <div
                style={{
                  padding: "20px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Ghi chú
                </p>
                <Input

                  placeholder="Nhập nội dung"
                  defaultValue={record?.note}
                  onChange={(e) => setNote(e?.target?.value)}


                />
                <Button
                  size="large"
                  style={{ marginTop: "10px" }}
                  type="primary"
                  onClick={async () => {
                    // handle update
                    const res = await POST("api/qlc/timekeeping/updateNote", {
                      sheet_id: record?.sheet_id,
                      note: note,
                    });
                    console.log("res", res)
                    if (res?.result) {
                      Toastify({
                        text: `${res?.message || "Cập nhật thành công"}`,
                        className: "info",
                        style: {
                          background:
                            "linear-gradient(to right, #00b09b, #96c93d)",
                          padding: " 0 20px",
                        },
                      }).showToast();

                      setReload(!reload);
                    } else {
                      Toastify({
                        text: `${res?.message || "Cập nhật thất bại"}`,
                        className: "info",
                        style: {
                          background: "red",
                          padding: " 0 20px",
                        },
                      }).showToast();
                    }
                  }}
                >
                  <p>Cập nhật</p>
                </Button>
              </div>
            }
          >
            <EditOutlined />
          </Popover>
        </div>
      ),
    },
    {
      title: "Chỉnh sửa",
      render: (record, index) => (

        <Popover
          key={index}
          trigger={["click"]}
          content={
            <div
              style={{
                padding: "20px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Chỉnh sửa ca
              </p>
              <Select
                size="large"
                placeholder="Chọn ca"
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="label"
                onChange={(val) => setSelectedCa(val)}
                options={listCa?.map((item) => ({
                  label: item?.shift_name,
                  value: item?.shift_id,
                }))}
              />
              <Button
                size="large"
                style={{ marginTop: "10px" }}
                type="primary"
                onClick={async () => {
                  // handle update
                  const res = await POST("api/qlc/shift/updateTimesheet", {
                    sheet_id: record?.sheet_id,
                    shift_id: selectedCa,
                  });

                  if (res?.result) {
                    Toastify({
                      text: "Sửa thành công!",
                      className: "info",
                      style: {
                        background:
                          "linear-gradient(to right, #00b09b, #96c93d)",
                        padding: " 0 20px",
                      },
                    }).showToast();

                    setReload(!reload);
                  } else {
                    Toastify({
                      text: "Sửa lỗi!",
                      className: "info",
                      style: {
                        background: "red",
                        padding: " 0 20px",
                      },
                    }).showToast();
                  }
                }}
              >
                <p>Cập nhật</p>
              </Button>
            </div>
          }
        >
          <EditOutlined />
        </Popover>
      ),
    },
  ];
  return (
    <Card
      title={<h2 style={{ color: "#fff" }}>Danh sách lịch sử điểm danh </h2>}
    >
      <Form form={form} initialValues={param} onFinish={onFinish}>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={6}>
            <Form.Item name={"ep_id"}>
              <Select
                size="large"
                placeholder="Tìm theo tên nhân viên"
                showSearch
                filterOption={(input, option) =>
                  option?.label
                    ?.toString()
                    ?.toLowerCase()
                    ?.indexOf(input.toLowerCase()) >= 0 ||
                  option?.labelNoVN
                    ?.toLowerCase()
                    ?.indexOf(input.toLowerCase()) >= 0
                }
                options={[
                  { label: "Tất cả nhân viên", value: "all" },
                  ...listEmp,
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Form.Item
              name={"start_time"}
              label={<p style={{ fontWeight: "bold" }}>Từ</p>}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Thời gian bắt đầu"
                size="large"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Form.Item
              name={"end_time"}
              label={<p style={{ fontWeight: "bold" }}>Đến</p>}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Thời gian kết thúc"
                size="large"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={4} xl={3}>
            <Button
              size="large"
              style={{ backgroundColor: "blue", width: "100%" }}
              htmlType="submit"
            >
              <p
                style={{
                  color: "#fff",
                  width: "max-content",
                  margin: "0 auto",
                }}
              >
                Tìm kiếm
              </p>
            </Button>
          </Col>
          <Col xs={24} sm={24} md={4} xl={2}>
            <ExportExcel
              title={`Danh sách lịch sử điểm danh`}
              columns={[
                { header: "Mã NV", key: "col1", width: 15 },
                { header: "Tên nhân viên", key: "col1", width: 35 },
                { header: "Ca làm việc", key: "col2", width: 35 },
                { header: "Thời gian điểm danh", key: "col3", width: 30 },
                { header: "Địa điểm", key: "col4", width: 50 },
                { header: "Thiết bị", key: "col7", width: 15 },
                { header: "Ghi chú", key: "col7", width: 30 },
              ]}
              data={
                listDataExcel
                  ? listDataExcel?.map((item) => [
                    item?.ep_id,
                    item?.userName,
                    item?.shift_name,
                    moment(item?.at_time).format("DD-MM-YYYY HH:mm:ss"),
                    item?.ts_location_name,
                    item?.device,
                    item?.note,
                  ])
                  : []
              }
              name={nameCty?.data.userName}
              nameFile={"Danh_sach_diem_danh"}
              loading={loadExcel}
              type={1}
            ></ExportExcel>
          </Col>
        </Row>
      </Form>

      <Table
        columns={cols}
        dataSource={list}
        loading={loading}
        rowKey={(record, idex) => {
          return idex;
        }}
        scroll={{ x: "2000px" }}
        pagination={{
          current: param?.curPage,
          position: ["bottomCenter"],
          showSizeChanger: false,
          total: count,
          onChange(page, pageSize) {
            setParam({
              ...param,
              curPage: page,
            });
          },
          // pageSize: 20,
        }}
        style={{
          marginTop: "20px",
          border: "1px solid #ACACAC",
          borderRadius: "10px",
        }}
      />
    </Card>
  );
}
