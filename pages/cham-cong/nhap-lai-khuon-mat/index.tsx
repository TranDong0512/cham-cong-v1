import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Select,
  Checkbox,
  Form,
  Modal,
  Avatar,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./nhap-lai-khuon-mat.module.css";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import classNames from "classnames";
import { POST, POST_SS, getCompIdCS, getCompIdSS } from "@/pages/api/BaseApi";
import Image from "next/image";
import { positionLabel } from "@/utils/function";
import { removeVietnameseTones } from "@/constants/style-constants";
import { getOrganizeDetail } from "@/utils/BaseApi";
interface DataType {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  room: string;
  position: string;
  email: string;
  phoneNumber: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: " ",
    align: "center",
    render: (record: any) => (
      <Avatar
        alt="/"
        src={record?.avatarUser || "/img/logo_com.png"}
        style={{ width: "46px", height: "46px" }}
      />
    ),
  },
  {
    title: <p style={{ color: "#fff" }}>Họ và tên</p>,
    render: (record: any) => (
      <a style={{ color: "black" }}>
        {record?.idQLC} - {record?.userName}
      </a>
    ),
    align: "center",
  },

  {
    title: <p style={{ color: "#fff" }}>Phòng ban</p>,
    render: (record: any) => (
      <p>{record?.detail?.organizeDetailName || "Chưa cập nhật"}</p>
    ),
    align: "center",
  },

  {
    title: <p style={{ color: "#fff" }}>Chức vụ</p>,
    render: (record: any) => <p>{record?.positionName || "Chưa cập nhật"}</p>,
    align: "center",
  },
  {
    title: <p style={{ color: "#fff" }}>Email</p>,
    render: (record: any) => <p>{record?.email || "Chưa cập nhật"}</p>,
    align: "center",
  },
  {
    title: <p style={{ color: "#fff" }}>Số điện thoại</p>,
    render: (record: any) => <p>{record?.phoneTK || "Chưa cập nhật"}</p>,
    align: "center",
  },
  Table.SELECTION_COLUMN,
];

export default function UpdateFace({ infoCom }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);
  const [alertModal, setAlertModal] = useState(false);
  const [type, setType] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const router = useRouter();
  const [listData, setListData] = useState([]);
  const [comLabel, setComLabel]: any = useState({});
  const [listDepLabel, setListDepLabel]: any = useState([]);
  const [empLabel, setEmpLabel] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [total, setTotal] = useState();
  const [param, setParam] = useState<any>({
    pageNumber: 1,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    const getListEmp = async () => {
      const com_id = getCompIdCS();
      const res = await POST("api/qlc/employee/listEmpSimpleNoToken", {
        com_id,
      });

      if (res?.result) {
        setEmpLabel(
          res?.list?.map((item) => ({
            label: `${item?.idQLC} - ${item?.userName}`,
            value: item?.idQLC,
            labelNoVN: removeVietnameseTones(
              `${item?.idQLC} - ${item?.userName}`
            ),
          }))
        );
      }
    };

    getListEmp();
  }, []);

  useEffect(() => {
    const getList = async () => {
      let com_id = null;
      com_id = getCompIdCS();
      const res = await POST("api/qlc/face/list", param);
      if (res?.result === true) {
        setListData(res?.data);
        setTotal(res?.count);
      }
    };

    getList();
  }, [param]);

  const handleUpdatePermissionForAUser = () => {
    if (selectedRowKeys) {
      if (window.confirm("Bạn có chắc chắn?")) {
        POST("api/qlc/face/add", {
          // putAllowFace: permit ? 1 : 0,
          list_id: `${selectedRowKeys?.toString()}`,
        }).then((res) => {
          if (res?.result === true) {
            // setAlertModal(true)
            window.alert("Cập nhật thành công");
            router.reload();
          }
        });
      }
    } else {
      window.alert("Chưa chọn nhân viên");
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setIndeterminate(false);
      if (selectedRowKeys.length === listData?.length) {
        setCheckAll(true);
        setType("checkAll");
        // setAlertModal(true)
      } else {
        setCheckAll(false);
        if (selectedRowKeys.length !== 0) {
          setIndeterminate(true);
        }
      }
      setSelectedRowKeys(selectedRowKeys);
    },
    // onSelect: (
    //   record: any,
    //   selected: any,
    //   selectedRows: any,
    //   nativeEvent: any
    // ) => {
    //   setSelectedRowKeys()
    // },
  };
  const onChangeAll = (e: CheckboxChangeEvent) => {
    setIndeterminate(false);
    if (e.target.checked === true) {
      setSelectedRowKeys(listData?.map((r) => r["_id"]));
      setType("checkAll");
      setCheckAll(e.target.checked);
    } else {
      setSelectedRowKeys([]);
      setType("noCheck");
      setCheckAll(e.target.checked);
    }
    // setAlertModal(true)
  };

  const [listOrg, setListOrg] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const res = await getOrganizeDetail();
      setListOrg(res);
    };

    getList();
  }, []);
  const onFinish = (value: any) => {
    const id = listOrg?.find(
      (item) => item?.id === value?.dep_id
    )?.listOrganizeDetailId;

    setParam({
      ...param,
      is_update: value?.is_update ? value?.is_update : false,
      dep_id: id,
      idQLC: value?.idQLC === "all" ? undefined : value?.idQLC,
    });
    console.log(param);
    setUpdated(value?.is_update ? value?.is_update : false);
  };

  return (
    <Card>
      <div className={styles.cardBody}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
          gutter={[0, 10]}
        >
          <Col xxl={9} xl={7} lg={10} md={24}>
            <p
              style={{ fontSize: "19px", fontWeight: "600" }}
              className={styles.changeSizeText}
            >
              Danh sách cập nhật khuôn mặt ({total || 0})
            </p>
          </Col>
        </Row>

        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 10]} style={{ marginBottom: "20px" }}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item name="dep_id">
                <Select
                  size="large"
                  allowClear={true}
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  placeholder="Phòng ban(tất cả)"
                  options={listOrg?.map((item) => ({
                    label: item?.organizeDetailName,
                    value: item?.id,
                  }))}
                  suffixIcon={<img src="/down-icon.png"></img>}
                />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item name="idQLC">
                <Select
                  showSearch
                  allowClear={true}
                  size="large"
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  placeholder="Nhập tên cần tìm"
                  options={[
                    { label: "Tất cả nhân viên", value: "all" },
                    ...empLabel,
                  ]}
                  // search without vietnamese tones
                  filterOption={(input, option) =>
                    option?.label
                      ?.toLowerCase()
                      ?.indexOf(input.toLowerCase()) >= 0 ||
                    option?.labelNoVN
                      ?.toLowerCase()
                      ?.indexOf(input.toLowerCase()) >= 0
                  }
                  suffixIcon={<img src="/down-icon.png"></img>}
                  listHeight={180}
                />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item name="is_update">
                <Select
                  size="large"
                  allowClear={true}
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  placeholder="Trạng thái cập nhật"
                  options={[
                    { label: "Đã cập nhật", value: false },
                    { label: "Chưa cập nhật", value: true },
                  ]}
                  defaultValue={false}
                  suffixIcon={<img src="/down-icon.png"></img>}
                />
              </Form.Item>
            </Col>
            <Col
              xl={3}
              lg={3}
              md={3}
              sm={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 8 }}
            >
              <Form.Item>
                <Button
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#4AA7FF",
                    border: "none",
                  }}
                  htmlType="submit"
                >
                  <p style={{ color: "#fff" }}>Lọc</p>
                </Button>
              </Form.Item>
            </Col>
            <Col
              xl={3}
              lg={3}
              md={3}
              sm={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 8 }}
            >
              <Form.Item>
                <Button
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#4AA7FF",
                    border: "none",
                  }}
                  onClick={handleUpdatePermissionForAUser}
                >
                  <p style={{ color: "#fff" }}>Duyệt</p>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Table
          className={`table_nhap_lai_khuon_mat`}
          columns={columns}
          sticky={true}
          scroll={{ x: 1024 }}
          pagination={{
            position: ["bottomCenter"],
            total: total,
            onChange(page, pageSize) {
              setParam({
                ...param,
                pageNumber: page,
              });
            },
          }}
          rowSelection={
            !updated && {
              ...rowSelection,
              columnTitle: (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  Quyền
                  <Checkbox
                    onChange={onChangeAll}
                    checked={checkAll}
                    indeterminate={indeterminate}
                  />
                </div>
              ),
              columnWidth: "100px",
              selectedRowKeys: selectedRowKeys,
            }
          }
          dataSource={listData}
          rowKey={(record: any) => record?.idQLC}
        />
      </div>
      {/* {modalNhapLaiMat(
        alertModal,
        setAlertModal,
        type === 'checkAll'
          ? 'Các tài khoản đã được cấp quyền nhận diện khuôn mặt'
          : type === 'checkOneTrue'
          ? 'Tài khoản đã được cấp quyền nhận diện khuôn mặt'
          : type === 'checkOneFalse'
          ? 'Tài khoản đã bỏ quyền nhận diện khuôn mặt'
          : 'Các tài khoản đã bỏ quyền nhận diện khuôn mặt',
        router
      )} */}
    </Card>
  );
}

export const getServerSideProps = async (context) => {
  const infoCom = await POST_SS("api/qlc/company/info", {}, context);
  let com_id = null;
  com_id = getCompIdSS(context);

  // const listDepartments = await POST_SS(
  //   'api/qlc/department/list',
  //   {
  //     com_id: com_id,
  //   },
  //   context
  // )

  return {
    props: {
      infoCom,
      // listDepartments,
    },
  };
};
