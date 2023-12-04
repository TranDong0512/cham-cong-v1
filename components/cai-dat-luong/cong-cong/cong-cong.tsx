import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Table,
} from "antd";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import styles from "./cong-cong.module.css";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  ConfirmModalChecked,
  ConfirmModalDelete,
  OkModal,
} from "./modal/modal";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import _ from "lodash";
import { positionLabel } from "@/utils/function";
import { removeVietnameseTones } from "@/constants/style-constants";
import { filterUnique } from "../nhap-luong-co-ban/nhap-luong-co-ban";
import { POST, POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import dayjs from "dayjs";

function MyTable({
  loading,
  columns,
  data,
  onRowClick,
  hasRowSelect,
  selectedRowKeys,
  setSelectedRowKeys,
  rowKey,
  Footer,
  onChangeAll,
  checkAll,
  setCheckAll,
  setSelectedRow,
  setIsOpenCheckedModal,
  setIsCheckedRow,
  pagination,
}: {
  loading: any;
  columns: any;
  data: any;
  onRowClick: (record: any, index: number | undefined) => void;
  hasRowSelect: boolean;
  selectedRowKeys: any;
  setSelectedRowKeys: Function;
  rowKey: string;
  Footer: ReactNode;
  onChangeAll?: any;
  checkAll?: any;
  setCheckAll: Function;
  setSelectedRow: Function;
  setIsOpenCheckedModal: Function;
  setIsCheckedRow: Function;
  pagination: {};
}) {
  return (
    <Table
      loading={loading}
      style={{ marginTop: "30px" }}
      columns={columns}
      dataSource={data}
      className={`green-table ${styles.table} cusScrollTable`}
      rowClassName={styles.row}
      rowKey={rowKey}
      pagination={{ position: ["bottomCenter"], ...pagination }}
      scroll={{ x: "max-content" }}
      rowSelection={
        hasRowSelect
          ? {
              selectedRowKeys,
              onChange: (newRowKeys: any) => {
                setSelectedRowKeys(newRowKeys);
                if (selectedRowKeys?.length === data.length) {
                  setCheckAll(true);
                } else {
                  setCheckAll(false);
                }
              },
              columnWidth: "60px",
              columnTitle: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ color: "#fff", whiteSpace: "nowrap" }}>
                    Cộng công
                  </p>
                  <Checkbox
                    onChange={onChangeAll}
                    checked={checkAll}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              ),
              onSelect: (record: any, selected: boolean) => {
                setSelectedRow(record);
                if (selected) {
                  setIsOpenCheckedModal(true);
                  setIsCheckedRow(true);
                } else {
                  setIsOpenCheckedModal(false);
                  setIsCheckedRow(false);
                }
              },
            }
          : undefined
      }
      onRow={(record, index) => {
        return {
          onClick: () => onRowClick(record, index),
        };
      }}
      footer={() => Footer}
    />
  );
}

export const MySearchBar = ({
  placeholder,
  name,
  hasPrefix,
  className,
}: {
  placeholder: string;
  name: string;
  hasPrefix: boolean;
  className?: string;
}) => (
  <Form.Item className={className}>
    <Input
      placeholder={placeholder}
      suffix={
        !hasPrefix && (
          <Image alt="/" src={"/search-black.png"} width={24} height={24} />
        )
      }
      prefix={
        hasPrefix && (
          <Image
            style={{ marginRight: "10px" }}
            alt="/"
            src={"/search-black.png"}
            width={24}
            height={24}
          />
        )
      }
      style={{ width: "100%" }}
      size="large"
    />
  </Form.Item>
);

export const CongCong = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const com_id = getCompIdCS();
  const [listEmp, setListEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [param, setParam] = useState({
    curPage: 1,
    com_id: com_id,
    end_date: dayjs()?.format("YYYY-MM-DD"),
    start_date: dayjs().subtract(1, "month")?.format("YYYY-MM-DD"),
    ep_id: undefined,
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();

  const [form] = Form.useForm();

  useEffect(() => {
    const getDataCC = async () => {
      setLoading(true);
      const res = await POST_TL(
        "api/tinhluong/congty/list_user_cong_cong",
        param
      );

      if (res?.message === "success") {
        setData(res?.data?.list_dexuat);
        setTotal(res?.data?.total);
        setLoading(false);
      }
    };

    getDataCC();
  }, [param]);

  useEffect(() => {
    const getListEmp = async () => {
      const com_id = getCompIdCS();
      const res = await POST("api/qlc/employee/listEmpSimpleNoToken", {
        com_id: com_id,
      });

      if (res?.result) {
        setListEmp(
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

  const columns = [
    {
      title: <p className={styles.tableHeaderTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>,
      key: "index",
    },
    {
      title: <p className={styles.tableHeaderTxt}>ID</p>,
      render: (record: any) => <p>{record?.idQLC}</p>,
      key: "_id",
    },
    {
      title: <p className={styles.tableHeaderTxt}>Họ và tên</p>,
      render: (record: any) => <p>{record?.userName}</p>,
      key: "name",
    },
    {
      title: <p className={styles.tableHeaderTxt}>Phòng ban</p>,
      render: (record: any) => <p>{record?.dep_name || "Chưa cập nhật"}</p>,

      key: "dep_id",
    },
    {
      title: <p className={styles.tableHeaderTxt}>Chức vụ</p>,
      render: (record: any) => (
        <p>
          {positionLabel.find((item) => item?.value === record?.pos_id)?.label}
        </p>
      ),
      key: "position_id",
    },
    {
      title: <p className={styles.tableHeaderTxt}>Ca ghi nhận công</p>,
      render: (record: any) => <p>{record?.noi_dung?.xac_nhan_cong?.ca_xnc}</p>,
      key: "shift_id",
    },
    {
      title: <p className={styles.tableHeaderTxt}>Thời gian ghi nhận công</p>,
      render: (record: any) => (
        <p>
          {record?.noi_dung?.xac_nhan_cong?.time_vao_ca} -{" "}
          {record?.noi_dung?.xac_nhan_cong?.time_het_ca}
        </p>
      ),
      key: "accept_time",
    },
    {
      title: <p className={styles.tableHeaderTxt}>Ngày ghi nhận</p>,
      render: (record: any) => (
        <p>
          {record?.noi_dung?.xac_nhan_cong?.time_xnc &&
            moment(record?.noi_dung?.xac_nhan_cong?.time_xnc)?.format(
              "DD-MM-YYYY"
            )}
        </p>
      ),
      key: "accept_date",
    },
    {
      title: <p className={styles.tableHeaderTxt}>Người xét duyệt</p>,
      render: (record: any) =>
        record?.userDuyet?.map((item) => (
          <p key={item?.idQLC}>
            {item?.idQLC} - {item?.userName}
          </p>
        )),
      // key: 'reviewer_id',
    },
    {
      title: <p className={styles.tableHeaderTxt}>Ghi chú</p>,
      render: (record: any) => <p>{record?.noi_dung?.xac_nhan_cong?.ly_do}</p>,
      key: "note",
    },
    // Table.SELECTION_COLUMN,
    // {
    //   title: <p className={styles.tableHeaderTxt}>Xóa</p>,
    //   render: (record: any) => {
    //     let api = 'api/qlc/settingSalary/addWorkingDay/delete/'
    //     api += record?._id
    //     return (
    //       <Image
    //         src={'/trash-2.svg'}
    //         alt=''
    //         width={24}
    //         height={24}
    //         style={{ cursor: 'pointer' }}
    //         onClick={() => setIsOpenDeleteModal(true)}></Image>
    //     )
    //   },
    //   key: 'action',
    // },
  ];

  const hanldeSubmit = (value) => {
    const month = value?.month;
    const year = value?.year;
    const start = dayjs(`${year}-${month}`).format("YYYY-MM-DD");
    const end = dayjs(`${year}-${month}`).add(1, "month").format("YYYY-MM-DD");
    setParam({
      ...param,
      ep_id: value?.ep_id === "all" ? undefined : value?.ep_id,
      start_date: start,
      end_date: end,
    });
  };
  return (
    <div>
      <Card className={`${styles.customCard} noPaddingTable`}>
        <div className={styles.topSection}>
          <p className={styles.headerText}>
            Danh sách nhân viên ghi nhận cộng công
          </p>
        </div>
        <Form
          form={form}
          onFinish={hanldeSubmit}
          initialValues={{
            ...param,
            month: dayjs(param?.end_date)?.month() + 1,
            year: dayjs(param?.end_date)?.year(),
          }}
        >
          <Row gutter={[15, 0]} className={styles.searchNav}>
            <Col
              xxl={4}
              xl={6}
              lg={5}
              md={5}
              sm={4}
              xs={24}
              className={styles.cusSearch}
            >
              <Form.Item name={"month"}>
                <Select
                  showSearch
                  suffixIcon={<SearchOutlined rev={undefined} />}
                  placeholder="Nhập tháng"
                  optionFilterProp="month"
                  options={[
                    {
                      value: 1,
                      label: "Tháng 1",
                    },
                    {
                      value: 2,
                      label: "Tháng 2",
                    },
                    {
                      value: 3,
                      label: "Tháng 3",
                    },
                    {
                      value: 4,
                      label: "Tháng 4",
                    },
                    {
                      value: 5,
                      label: "Tháng 5",
                    },
                    {
                      value: 6,
                      label: "Tháng 6",
                    },
                    {
                      value: 7,
                      label: "Tháng 7",
                    },
                    {
                      value: 8,
                      label: "Tháng 8",
                    },
                    {
                      value: 9,
                      label: "Tháng 9",
                    },
                    {
                      value: 10,
                      label: "Tháng 10",
                    },
                    {
                      value: 11,
                      label: "Tháng 11",
                    },
                    {
                      value: 12,
                      label: "Tháng 12",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              xxl={4}
              xl={6}
              lg={5}
              md={5}
              sm={4}
              xs={24}
              className={styles.cusSearch}
            >
              <Form.Item name={"year"}>
                <Select
                  suffixIcon={<SearchOutlined rev={undefined} />}
                  showSearch
                  placeholder="Nhập năm"
                  optionFilterProp="year"
                  options={[
                    {
                      value: `${dayjs().year() - 1}`,
                      label: `Năm ${dayjs().year() - 1}`,
                    },
                    {
                      value: `${dayjs().year()}`,
                      label: `Năm ${dayjs().year()}`,
                    },
                    {
                      value: `${dayjs().year() + 1}`,
                      label: `Năm ${dayjs().year() + 1}`,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              xxl={6}
              xl={8}
              lg={10}
              md={10}
              sm={12}
              xs={24}
              className={styles.cusSearch}
            >
              <Form.Item name={"ep_id"}>
                <Select
                  suffixIcon={<SearchOutlined rev={undefined} />}
                  showSearch
                  allowClear
                  placeholder="Nhập tên tìm kiếm"
                  // optionFilterProp='name'
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
                    {
                      label: "Tất cả",
                      value: "all",
                      labelNoVN: "tat ca",
                    },
                    ...listEmp,
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              xxl={3}
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={10}
              className={`${styles.btnCus}`}
            >
              <Form.Item>
                <Button className={styles.btn} htmlType="submit" id="submit">
                  <p className={styles.btnText}>Thống kê</p>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* table */}
        <MyTable
          loading={loading}
          columns={columns}
          data={data}
          onRowClick={(record, index) => null}
          hasRowSelect={false}
          Footer={null}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          rowKey={"_id"}
          onChangeAll={null}
          checkAll={checkAll}
          setCheckAll={setCheckAll}
          setSelectedRow={null}
          setIsCheckedRow={null}
          pagination={{
            total: total,
            onChange(page, pageSize) {
              setParam({ ...param, curPage: page });
            },
          }}
          setIsOpenCheckedModal={null}
        />
      </Card>
      {/* {ConfirmModalDelete({
        open: isOpenDeleteModal,
        setOpen: setIsOpenDeleteModal,
        selectedRow,
      })}
      {ConfirmModalChecked({
        open: isOpenCheckedModal,
        setOpen: setIsOpenCheckedModal,
        checkedAll: checkAll,
        checkedRow,
        isCheckedRow,
        selectedKeys: selectedRowKeys,
        setSelectedKeys: setSelectedRowKeys,
        prevSelectedRowKeys,
        setIsOpenOkModal,
      })}
      {OkModal({
        open: isOpenOkModal,
        setOpen: setIsOpenOkModal,
        checkedAll: checkAll,
        checkedRow,
        isCheckedRow,
      })} */}
    </div>
  );
};
