import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import styles from "./nhan-vien.module.css";
import SelectOrganizeCustomize from "@/components/commons/co-cau-to-chuc/indexFix";
import SearchCustomize from "@/components/commons/tim-kiem";
import { useEffect, useState } from "react";
import instance from "@/components/hooks/axios.config";
import Constants from "@/components/cai-dat-de-xuat/Constant/constant";
import { GET, POST, getCompIdCS } from "@/pages/api/BaseApi";
import {
  CheckOutlined,
  CloseOutlined,
  FormOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { removeVietnameseTones } from "@/constants/style-constants";
import axios from "axios";
import { baseURL, getOrganizeDetail } from "@/utils/BaseApi";
import Cookies from "js-cookie";
const { RangePicker } = DatePicker;
interface Item {
  key: string;
  num_days: number;
  ep_id: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function CongchuanNhanVien() {
  const [viTri, setViTri] = useState<any>([]);
  const [positions, setPositions] = useState<any>();
  const [selectedEmp, setSelectedEmp] = useState<any>();
  const [selectedDep, setSelectedDep] = useState<any>();
  const [listCa, setListCa] = useState([]);
  const [listEmp, setListEmp] = useState([]);
  const [listPb, setListPb] = useState([]);
  const [apply_month, set_apply_month] = useState<any>(
    dayjs().format("YYYY-MM")
  );
  const com_id = getCompIdCS();
  const token = Cookies.get("token_base365");
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [call, setCall] = useState(false);
  const [isTK, setIsTK] = useState<any>(false);
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ num_days: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    const row = (await form.validateFields()) as Item;
    try {
      const object = {
        apply_month: `${apply_month}-01`,
        num_days: row.num_days,
        listUsers: [editingKey],
      };
      const response = await instance.post(
        "api/qlc/companyworkday/create_employee",
        object
      );
      if (response?.status == 200) {
        toast.success("Cập nhật công chuẩn thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEditingKey("");
        setCall(!call);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ep_id",
      editable: false,
    },
    {
      title: "Họ và tên",
      dataIndex: "userName",
      editable: false,
    },
    {
      title: "Phòng ban",
      dataIndex: "organizeDetailName",
      editable: false,
    },
    {
      title: "Công chuẩn",
      dataIndex: "num_days",
      editable: true,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              <CheckOutlined style={{ fontSize: 20, marginRight: "10%" }} />
            </Typography.Link>

            <span
              onClick={cancel}
              style={{ fontSize: "13px", fontWeight: "300", cursor: "pointer" }}
            >
              <CloseOutlined style={{ fontSize: 20 }} />
            </span>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            <FormOutlined style={{ fontSize: 20 }} />
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "num_days" ? "number" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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

  useEffect(() => {
    try {
      const getListPb = async () => {
        const res = await getOrganizeDetail();
        setListPb(res);
      };
      getListPb();
    } catch (error) {}
  }, []);

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
        };
        const res = await POST("api/qlc/managerUser/listUser", object);
        if (res?.result == true) {
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

  useEffect(() => {
    setLoading(true);
    try {
      const object = {
        apply_month: `${apply_month}-01`,
        pageSize: 100000,
        ep_id: selectedEmp,
        listOrgDetailId: listPb?.find((item) => item.id == selectedDep) //phòng ban
          ?.listOrganizeDetailId,
        position_id: positions,
      };
      const fetcher = async () => {
        const response = await instance.post(
          "api/qlc/companyworkday/get_list_workday",
          object
        );
        if (response?.status == 200) {
          const newData = response?.data.data.data.map((item, index) => ({
            ...item,
            key: item.ep_id,
          }));
          setData(newData);
          setLoading(false);
        }
      };
      fetcher();
    } catch (error) {
      setLoading(true);
    }
  }, [call, isTK]);

  const onChange = (date, dateString) => {
    set_apply_month(dateString);
  };

  return (
    <>
      <Card>
        <div className={styles.body}>
          <Form form={form} component={false}>
            <div
              className={styles.tieuDe}
              style={{
                borderBottom: "solid 1px #B6B6B6",
                fontSize: "20px",
                fontWeight: "600",
                color: "#474747",
              }}
            >
              Cài đặt công chuẩn của từng nhân viên
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="mt-16">
                <Button
                  size="large"
                  type="primary"
                  style={{ marginBottom: "20px" }}
                  icon={
                    <SettingOutlined style={{ color: "#fff" }} rev={"xxx"} />
                  }
                >
                  <span style={{ color: "#fff" }}> Cài đặt</span>
                </Button>
              </div>
            </div>
            <Row gutter={[20, { sm: 10, xs: 10 }]}>
              <Col lg={5} md={12} sm={12} xs={24} className={styles.selects}>
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

              <Col lg={5} md={12} sm={12} xs={24} className={styles.selects}>
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
              <Col lg={5} md={12} sm={12} xs={24} className={styles.selects}>
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
              <Col lg={5} md={12} sm={12} xs={24} className={styles.selects}>
                <DatePicker
                  onChange={onChange}
                  size="large"
                  picker="month"
                  placeholder="Chọn tháng năm!"
                  style={{ width: "100%" }}
                  defaultValue={dayjs()}
                />
              </Col>

              <Col
                lg={4}
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
                    onClick={() => setIsTK(!isTK)}
                  >
                    <p>Tìm kiếm</p>
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Table
              loading={loading}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </div>
      </Card>
    </>
  );
}
