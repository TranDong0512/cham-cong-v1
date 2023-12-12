import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Switch,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const currentUrlQlc = process.env.NEXT_PUBLIC_API;

interface Item {
  key: string;
  minute: number;
  content: string;
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
  const inputNode =
    inputType === "number" ? (
      <InputNumber style={{ width: "100%" }} />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Nhập ${title}!`,
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
export default function Notification() {
  const [openModal, setOpenModal] = useState<any>(false);
  const [checked, setChecked] = useState<any>(false);
  const [dataDisplay, setDataDisplay] = useState<any>();
  const [form] = Form.useForm();
  const currentToken = Cookies.get("token_base365");
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ minute: "", content: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const obj = {
        minute: row.minute,
        content: row.content,
        status: 1,
      };
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${currentUrlQlc}/api/qlc/NotifyTimekeeping/update`,
            obj,
            {
              headers: { Authorization: `Bearer ${currentToken}` },
            }
          );
          if (response.status === 200) {
            window.alert("Cài đặt thành công");
            setDataDisplay([obj]);
            setEditingKey("");
          }
        } catch (error) {}
      };
      fetchData();
    } catch (error) {}
  };

  const columns = [
    {
      title: "Số phút",
      dataIndex: "minute",
      width: "20%",
      editable: true,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      width: "60%",
      editable: true,
    },

    {
      title: "Hành động",
      width: "20%",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>

            <a
              onClick={cancel}
              style={{ color: "#1677ff", fontSize: 14, fontWeight: 400 }}
            >
              Hủy
            </a>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Sửa
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
        inputType: col.dataIndex === "minute" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onChange = (checked) => {
    if (checked === true) {
      setOpenModal(true);
      setChecked(true);
    }
    if (checked === false) {
      setChecked(false);
      try {
        const obj = {
          minute: dataDisplay[0].minute,
          content: dataDisplay[0].content,
          status: -1,
        };
        const fetchData = async () => {
          const response = await axios.post(
            `${currentUrlQlc}/api/qlc/NotifyTimekeeping/update`,
            obj,
            {
              headers: { Authorization: `Bearer ${currentToken}` },
            }
          );
          if (response.status === 200) {
            setChecked(false);
          }
        };
        fetchData();
      } catch (error) {}
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const check = () => {
    setChecked(true);
  };
  const unChecked = () => {
    setChecked(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${currentUrlQlc}/api/qlc/NotifyTimekeeping/getData`,
          {},
          {
            headers: { Authorization: `Bearer ${currentToken}` },
          }
        );
        if (response?.data.data.result == true) {
          if (response?.data?.data?.message.status === -1) {
            setChecked(false);
            setDataDisplay([]);
          }
          if (response?.data?.data?.message.status === 1) {
            setChecked(true);
            setDataDisplay([response?.data?.data?.message]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Row>
        <Col style={{ display: "flex", marginBottom: "24px" }} md={24}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#12DD00",
              },
            }}
          >
            <Switch onChange={onChange} checked={checked} />
          </ConfigProvider>

          <p
            style={{
              color: "#474747",
              fontSize: 16,
              fontWeight: 500,
              marginLeft: 12,
            }}
          >
            Mở thông báo chấm công
          </p>
        </Col>
        <Col>
          <p
            style={{
              color: "#474747",
              fontSize: 16,
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            (App chấm công sẽ gửi thông báo nhắc nhở nhân viên chấm công trước
            giờ chốt ca 5 phút)
          </p>
        </Col>
      </Row>

      {dataDisplay?.length != 0 && checked == true ? (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataDisplay}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
      ) : (
        <></>
      )}
      {openModal && (
        <ModalTBCC
          openModal={openModal && dataDisplay?.length == 0}
          closeModal={closeModal}
          unChecked={unChecked}
          check={check}
        ></ModalTBCC>
      )}
    </>
  );
}

function ModalTBCC({ openModal, closeModal, unChecked, check }) {
  const currentToken = Cookies.get("token_base365");
  const [form] = Form.useForm();
  const router = useRouter();
  form.setFieldValue("minute", 5);
  const resetModal = () => {
    closeModal();
    unChecked();
  };
  const onFinish = async (value) => {
    try {
      const obj = {
        minute: value.minute,
        content: value.content,
        status: 1,
      };
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${currentUrlQlc}/api/qlc/NotifyTimekeeping/update`,
            obj,
            {
              headers: { Authorization: `Bearer ${currentToken}` },
            }
          );
          if (response.status === 200) {
            window.alert("Cài đặt thành công");
            closeModal();
            check();
          }
        } catch (error) {}
      };
      fetchData();
    } catch (error) {}
  };
  return (
    <Modal
      title={
        <div
          style={{
            padding: "18px 0",
            backgroundColor: "#4c5bd4",
            borderRadius: "8px 8px 0 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
            Cài đặt thông báo chấm công
          </p>
        </div>
      }
      open={openModal}
      onCancel={resetModal}
      width={500}
      footer={null}
    >
      <div style={{ padding: "0 20px" }}>
        <Form form={form} onFinish={onFinish} autoComplete="off" name="basic">
          <Form.Item
            labelCol={{ span: 24 }}
            label="Thời gian thông báo (mặc định trước 5 phút)"
            name="minute"
            rules={[
              { required: true, message: "Vui lòng nhập thời gian thông báo!" },
            ]}
          >
            <InputNumber
              value={5}
              style={{ width: "100%" }}
              addonAfter="Phút"
            ></InputNumber>
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Nội dung thông báo"
            name="content"
            rules={[{ required: true, message: "Nhập nội dung thông báo!" }]}
          >
            <Input placeholder="Nhập nội dung thông báo!"></Input>
          </Form.Item>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Form.Item>
              <Button type="default" onClick={resetModal}>
                <p style={{ padding: "0 20px" }}>Hủy</p>
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                <p> Xác nhận</p>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
