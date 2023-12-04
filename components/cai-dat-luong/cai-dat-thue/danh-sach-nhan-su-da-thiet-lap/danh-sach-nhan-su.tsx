import React, { useState } from "react";
import styles from "./da-duyet.module.css";
import Image from "next/image";
import { title } from "process";
import { ColumnsType } from "antd/es/table";
import { ModalChinhSua } from "./modal/modal-chinh-sua";
import { Logo } from "../danh-sach-nhan-su-chua-thiet-lap/anh";
type PaginationPosition = "top" | "bottom" | "both";

import {
  Avatar,
  List,
  Radio,
  Space,
  Card,
  Select,
  Input,
  Table,
  Form,
  Row,
  Col,
  Button,
} from "antd";
import Select2 from "react";

import { ModalXoa } from "./modal/modal-xoa";
import moment from "moment";
import { POST_TL } from "@/pages/api/BaseApi";
type PaginationAlign = "start" | "center" | "end";
const dataMonth = [
  {
    value: "1",
    label: "Tháng 1",
  },
  {
    value: "2",
    label: "Tháng 2",
  },
  {
    value: "3",
    label: "Tháng 3",
  },
  {
    value: "4",
    label: "Tháng 4",
  },
  {
    value: "5",
    label: "Tháng 5",
  },
  {
    value: "6",
    label: "Tháng 6",
  },
  {
    value: "7",
    label: "Tháng 7",
  },
  {
    value: "8",
    label: "Tháng 8",
  },
  {
    value: "9",
    label: "Tháng 9",
  },
  {
    value: "10",
    label: "Tháng 10",
  },
  {
    value: "11",
    label: "Tháng 11",
  },
  {
    value: "12",
    label: "Tháng 12",
  },
];
const dataYear = [
  {
    value: "1",
    label: "Năm 2022",
  },
  {
    value: "2",
    label: "Năm 2023",
  },
  {
    value: "3",
    label: "Năm 2024",
  },
];
const dataPhongBan = [
  {
    value: "1",
    label: "Phòng ban (tất cả)",
  },
  {
    value: "2",
    label: "Kỹ thuật",
  },
  {
    value: "3",
    label: "Biên tập",
  },
  {
    value: "4",
    label: "Kinh doanh",
  },
  {
    value: "5",
    label: "Đề án",
  },
  {
    value: "6",
    label: "Phòng Seo",
  },
  {
    value: "7",
    label: "Phòng đào tạo",
  },
  {
    value: "8",
    label: "Phòng sáng tạo",
  },
];
const dataNhanVien = [
  {
    value: "1",
    label: "Tất cả nhân viên",
  },
  {
    value: "2",
    label: "(147310)Phạm Xuân Nguyên Khôi",
  },
  {
    value: "3",
    label: "(131845) Phùng Ngọc Anh",
  },
  {
    value: "4",
    label: "(147310) Phạm Xuân Nguyên Khôi",
  },
  {
    value: "5",
    label: "(147310) Phạm Xuân Nguyên Khôi",
  },
  {
    value: "6",
    label: "(147310) Phạm Xuân Nguyên Khôi",
  },
];
const dataa = [
  {
    key: "1",
    title: "Hoàng Minh Anh",
    url: "/Ellipse1125.png",
    id: "135239",
    viTri: "Phòng nhân sự",
  },
  {
    key: "2",
    title: "xyz",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "3",
    title: "xin chào",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "4",
    title: "Hoàng Minh Anh",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "5",
    title: "abc",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "6",
    title: "Hoàng Minh Anh",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "7",
    title: "Hoàng Minh Anh",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "8",
    title: "Hoàng Minh Anh",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "9",
    title: "Hoàng Minh Anh",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "10",
    title: "Hoàng Minh Anh",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
  {
    key: "11",
    title: "Hoàng Minh Anh",
    id: "135239",
    viTri: "Phòng nhân sự",
    url: "/Ellipse1125.png",
  },
];
interface DataType2 {
  key: String;
  info: any;
  CST: String;
  CT: String;
  ADTN: String;
  DN: String;
  TT: String;
}

export const DaDuyet: any = ({
  listEmpHasTax,
  listDepLabel,
  listEmpLabel,
  listTax,
}: {
  listEmpHasTax: any;
  listDepLabel: any;
  listEmpLabel: any;
  listTax: any;
}) => {
  const [position, setPosition] = useState<PaginationPosition>("bottom");
  const [align, setAlign] = useState<PaginationAlign>("center");
  const [modalAdd, setModalAdd]: any = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [modalXoa, setModalXoa] = useState(false);
  const [empSelected, setEmpSelected] = useState<any>({});
  const [key, setKey] = useState("");

  const [data, setData] = useState<any[]>(
    listEmpHasTax?.list_us?.map((tax, index) => {
      return {
        ...tax,
        key: index,
        title: tax?.Detail?.userName,
        id: tax?.Detail?.idQLC,
        viTri: tax?.organizeDetail?.organizeDetailName || "Chưa cập nhật",
        url: tax?.Detail?.[0]?.avatarUser
          ? `/${tax?.Detail?.[0]?.avatarUser}`
          : "/anhnhanvien.png",
      };
    })
  );
  const [totalData, setTotalData] = useState(
    listEmpHasTax?.list_us?.map((tax, index) => {
      return {
        ...data?.[index],
        key: index,
        // info: {thongTin},
        CST: tax?.TinhluongListClass?.[0]?.cl_name,
        CT: tax?.TinhluongFormSalary?.[0]?.fs_repica,
        ADTN: moment(tax?.cls_day).format("YYYY-MM-DD"),
        DN: moment(tax?.cls_day_end).format("YYYY-MM-DD"),
        TT: "Chưa cập nhật",
      };
    })
  );

  const chinhsua = (data: any) => {
    // console.log(data.key)
    return (
      <div className={styles.chucnang}>
        <div
          onClick={() => {
            setKey(data.key);
            setModalAdd(true);
            setEmpSelected(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M12.5 3.9979H7.6875C5.92709 3.9979 4.5 5.42499 4.5 7.1854V16.8104C4.5 18.5708 5.92709 19.9979 7.6875 19.9979H17.3125C19.0729 19.9979 20.5 18.5708 20.5 16.8104V11.9979M18.9142 8.4121L20 7.32634C20.781 6.54529 20.781 5.27897 20 4.49792C19.2189 3.71687 17.9526 3.71688 17.1715 4.49794L16.0858 5.58367M18.9142 8.4121L12.8779 14.4485C12.5987 14.7277 12.2431 14.918 11.856 14.9954L8.91422 15.5838L9.50257 12.642C9.58001 12.2548 9.77032 11.8992 10.0495 11.62L16.0858 5.58367M18.9142 8.4121L16.0858 5.58367"
              stroke="#4C5BD4"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="20"
            viewBox="0 0 1 20"
            fill="none"
          >
            <path d="M0.5 0V20" stroke="#D9D9D9" />
          </svg>
        </div>
        <div
          onClick={() => {
            setModalXoa(true);
            setEmpSelected(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M3.5 6H5.5H21.5"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.5 6V20C19.5 20.5304 19.2893 21.0391 18.9142 21.4142C18.5391 21.7893 18.0304 22 17.5 22H7.5C6.96957 22 6.46086 21.7893 6.08579 21.4142C5.71071 21.0391 5.5 20.5304 5.5 20V6M8.5 6V4C8.5 3.46957 8.71071 2.96086 9.08579 2.58579C9.46086 2.21071 9.96957 2 10.5 2H14.5C15.0304 2 15.5391 2.21071 15.9142 2.58579C16.2893 2.96086 16.5 3.46957 16.5 4V6"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5 11V17"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.5 11V17"
              stroke="#FF5B4D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: "Họ và Tên (ID, Phòng ban)",
      render: (record: any, index: number) => (
        <div key={index} className={styles.info}>
          <div className={styles.khungavata}>
            <Avatar
              src={record?.url}
              style={{ width: "46px", height: "46px", margin: "auto" }}
            />
          </div>
          <div className={styles.infotext}>
            <p className={styles.title}>{record?.title}</p>
            <p>ID: {record?.id}</p>
            <p>{record?.viTri}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Chính sách thuế",

      render: (record: any) => <p className={styles.textnd}>{record?.CST}</p>,
      align: "center",
    },
    {
      title: "Cách tính",
      render: (record: any) => <p className={styles.textnd}>{record?.CT}</p>,
      align: "center",
    },
    {
      title: "Áp dụng từ ngày",
      render: (record: any) => <p className={styles.textnd}>{record?.ADTN}</p>,
      align: "center",
    },
    {
      title: "Đến ngày",
      render: (record: any) => <p className={styles.textnd}>{record?.DN}</p>,
      align: "center",
    },
    {
      title: "Tiền thuế",
      render: (record: any) => <p className={styles.textnd}>{record?.TT}</p>,
      align: "center",
    },
    {
      title: "Chức năng",
      align: "center",
      render: (record: any) => chinhsua(record),
    },
  ];

  const [form] = Form.useForm();
  return (
    <>
      <div className={styles.tieuDe}>
        <h2 className={styles.titletieude}>
          Danh sách nhân sự đã thiết lập thuế
        </h2>
      </div>
      <Form form={form} className={styles.rowFirst}>
        <Row gutter={20}>
          <Col lg={21} md={21} sm={24} xs={24}>
            <Row gutter={[20, { sm: 10, xs: 10 }]}>
              <Col
                lg={6}
                md={7}
                sm={12}
                xs={24}
                className={styles.selects}
              ></Col>
              <Col lg={6} md={7} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={"ep_id"}>
                  <Select
                    // defaultValue={listEmpLabel?.[0]?.value}
                    showSearch
                    suffixIcon={<Logo />}
                    filterOption={(input, option: any) =>
                      option?.label
                        ?.toLowerCase()
                        ?.indexOf(input.toLowerCase()) >= 0 ||
                      option?.labelNoVN
                        ?.toLowerCase()
                        ?.indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Tìm nhân viên"
                    options={listEmpLabel}
                  />
                </Form.Item>
              </Col>
              <Col lg={6} md={5} sm={10} xs={24} className={styles.selects}>
                <Form.Item name={"month"}>
                  <Select
                    labelInValue
                    defaultValue={`Tháng ${moment().month() + 1}`}
                    suffixIcon={<Logo />}
                    showSearch
                    options={dataMonth}
                  />
                </Form.Item>
              </Col>
              <Col lg={6} md={5} sm={10} xs={24} className={styles.selects}>
                <Form.Item name={"year"}>
                  <Select
                    optionFilterProp="children"
                    defaultValue={`Năm ${moment().year()}`}
                    suffixIcon={<Logo />}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    showSearch
                    options={dataYear}
                  />
                </Form.Item>
              </Col>
              <Col
                lg={3}
                md={3}
                sm={4}
                xs={9}
                className={`${styles.selects} ${styles.thongKe1}`}
              >
                <Button>Thống kê</Button>
              </Col>
            </Row>
          </Col>
          <Col
            lg={3}
            md={3}
            sm={4}
            xs={10}
            className={`${styles.selects} ${styles.thongKe2}`}
          >
            <Button>Thống kê</Button>
          </Col>
        </Row>
      </Form>
      <div>
        <Table
          className={`table_luongcoban ${styles.table}`}
          pagination={{
            position: ["bottomCenter"],
          }}
          columns={columns}
          dataSource={totalData}
          scroll={{ x: 1300 }}
        />
      </div>
      {ModalChinhSua(
        modalAdd,
        setModalAdd,
        setModalNext,
        totalData,
        key,
        empSelected,
        listTax
      )}
      {ModalXoa(modalXoa, setModalXoa, empSelected)}
    </>
  );
};
