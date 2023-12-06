import {
  Card,
  Table,
  Input,
  Select,
  Button,
  Avatar,
  Row,
  Col,
  Modal,
  Form,
  DatePicker,
} from "antd";
import styles from "./nhap-luong-co-ban.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Logo } from "../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { IconDown } from "../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { IconEX } from "../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import _ from "lodash";
import { ModalNhapLuongCoBan } from "./modal/nhap-luong-co-ban";
import moment from "moment";
import { getPosition } from "@/utils/function";
import { ExportExcellButton } from "@/utils/ExportExccel";
import { getOrganizeDetail, getSettingOrganize } from "@/utils/BaseApi";
import { POST, POST_SS, POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { PAGE_DOMAIN } from "@/components/bodyFrameNs/bodyFrame";
import { removeVietnameseTones } from "@/constants/style-constants";
import dayjs from "dayjs";

export const filterUnique = (input: any[], name: string) => {
  const uniqueIds: any[] = [];

  return input?.filter((element) => {
    const isDuplicate = uniqueIds?.includes(element?.[name]);

    if (!isDuplicate) {
      uniqueIds?.push(element?.[name]);

      return true;
    }

    return false;
  });
};

export const NhapLuongCoBan = ({}: // initData,
// listPb,
// listIds,
// total,
{
  // initData: any[]
  // listPb: any[]
  // listIds: any[]
  // total: Number
}) => {
  // const [total, setTotal] = useState()
  const [data, setData] = useState<any[]>();
  const [date, setDate] = useState<String>();
  const router = useRouter();
  const [listData, setListData] = useState(data);
  const [nhapluongcoban, setModalnhapluongcoban] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listEmp, setListEmp] = useState([]);
  const [total, setTotal] = useState();
  const renderMonth = _.range(1, 13, 1).map((item) => ({
    label: `Tháng ${item}`,
    value: item,
  }));

  const renderYear = _.range(2020, 2025, 1).map((item) => ({
    label: `Năm ${item}`,
    value: item,
  }));
  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }));

  const [orgList, setOrgList] = useState([]);
  const [orgDetailList, setOrgDetailList] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState();
  // useEffect(() => {
  //   const getOrgList = async () => {
  //     const res = await getSettingOrganize()
  //     setOrgList(res)
  //   }

  //   getOrgList()
  // }, [])
  const com_id = getCompIdCS();
  const POSTFIX = "T00:00:00.000+00:00";
  const SEPERATOR = "-";
  const [param, setParam] = useState<any>({
    com_id: com_id,
    month: moment().month() + 1,
    year: moment().year(),
    start_date:
      moment().year() +
      SEPERATOR +
      (moment().month() + 1) +
      SEPERATOR +
      "01" +
      POSTFIX,
    end_date: moment().format("YYYY-MM-DD") + POSTFIX,
    skip: 0,
  });

  useEffect(() => {
    const getDataLuong = async () => {
      setLoading(true);
      const res = await POST_TL("api/tinhluong/congty/show_bl_byday", param);
      if (res?.data === true) {
        let finalData = [];
        res?.listUser?.forEach((item, index) => {
          const foundData = res?.listResult?.find(
            (r) => r?.ep_id === item?.idQLC
          );
          let lla = {};
          if (!foundData) {
            lla = res?.list_luong_am?.find((r) => r?.ep_id === item?.idQLC);
          }
          finalData.push({
            ...item,
            ...foundData,
            ...lla,
          });

          setData(finalData);
          setListData(finalData);
          setTotal(res?.luong_tong_cong_ty);
          setLoading(false);
        });
      }
    };
    getDataLuong();
  }, [param]);

  useEffect(() => {
    const getOrgDetail = async () => {
      const res = await getOrganizeDetail();

      setOrgDetailList(res);
    };

    getOrgDetail();
  }, []);

  useEffect(() => {
    const getListEmp = async () => {
      const com_id = getCompIdCS();
      const res = await POST("api/qlc/employee/listEmpSimpleNoToken", {
        com_id: com_id,
        orgId: selectedOrg || undefined,
      });

      if (res?.result) {
        setListEmp(res?.list);
      }
    };

    getListEmp();
  }, [selectedOrg]);

  const formatMoney = (val) => new Intl.NumberFormat().format(val) + " VNĐ";

  const columns: any = [
    {
      title: "Ảnh",
      dataIndex: "",
      key: "",
      render: (record: any) => (
        <Avatar
          src={record?.avatarUser}
          style={{ width: "46px", height: "46px" }}
        />
      ),
    },
    {
      title: "Họ và Tên (ID)",
      dataIndex: "",
      render: (record: any) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            width: "260px",
          }}
        >
          <div>
            <p className={styles.textname}>{record?.userName}</p>
            <p className={styles.text}>ID: {record?.idQLC}</p>
          </div>
          <div
            className={`chinhsua ${styles.editInfo}`}
            onMouseDown={(event) => {
              if (event.button === 1) {
                window.open(
                  `https://hungha365.com${PAGE_DOMAIN}cai-dat-luong/nhap-luong-co-ban/chi-tiet-nhan-vien/${record?.idQLC}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              } else {
                router.push(
                  `${router.pathname}/chi-tiet-nhan-vien/${record?.idQLC}`
                );
              }
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
                d="M12.75 3.99985H7.9375C6.17709 3.99985 4.75 5.42694 4.75 7.18735V16.8123C4.75 18.5728 6.17709 19.9998 7.9375 19.9998H17.5625C19.3229 19.9998 20.75 18.5728 20.75 16.8123V11.9998M19.1642 8.41405L20.25 7.32829C21.031 6.54724 21.031 5.28092 20.25 4.49988C19.4689 3.71883 18.2026 3.71883 17.4215 4.49989L16.3358 5.58563M19.1642 8.41405L13.1279 14.4504C12.8487 14.7296 12.4931 14.9199 12.106 14.9974L9.16422 15.5857L9.75257 12.644C9.83001 12.2568 10.0203 11.9012 10.2995 11.622L16.3358 5.58563M19.1642 8.41405L16.3358 5.58563"
                stroke="#4C5BD4"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Phòng ban",
      render: (record) => (
        <p className={styles.text}>
          {record?.organizeDetail?.organizeDetailName || "Chưa cập nhật"}{" "}
        </p>
      ),
    },
    {
      title: "Chức vụ",
      key: "chucVu",
      render: (record) => (
        <p className={styles.text}>
          {record?.pos?.positionName || "Chưa cập nhật"}
        </p>
      ),
    },
    {
      title: "Lương cơ bản",
      key: "luongCB",
      render: (record) => (
        <p style={{ color: "#FF5B4D" }} className={styles.text}>
          {record?.luong_co_ban
            ? new Intl.NumberFormat("ja-JP").format(record?.luong_co_ban)
            : 0}{" "}
          VND
        </p>
      ),
    },
    {
      title: "Hợp đồng áp dụng",
      key: "HDApDung",
      render: (record) => (
        <p className={styles.text}>
          {record?.phan_tram_hop_dong || 0} % Lương cơ bản{" "}
        </p>
      ),
    },

    {
      title: "Công chuẩn",
      render: (record) => (
        <p className={styles.text}>{record?.cong_chuan || 0} </p>
      ),
    },
    {
      title: "Công thực",
      render: (record) => (
        <p className={styles.text}>{record?.cong_thuc || 0} </p>
      ),
    },
    {
      title: "Công sau phạt",
      render: (record) => (
        <p className={styles.text}>{record?.cong_sau_phat || 0} </p>
      ),
    },
    {
      title: "Công theo tiền",
      render: (record) => (
        <p className={styles.text}>{record?.cong_theo_tien || 0} </p>
      ),
    },
    {
      title: "Công được ghi nhận",
      render: (record) => (
        <p className={styles.text}>{record?.cong_ghi_nhan || 0} </p>
      ),
    },
    {
      title: "Công nghỉ phép",
      render: (record) => (
        <p className={styles.text}>{record?.cong_nghi_phep || 0} </p>
      ),
    },
    {
      title: "Tổng công nhận",
      render: (record) => (
        <p className={styles.text}>{record?.tong_cong_nhan || 0} </p>
      ),
    },
    {
      title: "Lương thực",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.luong_thuc || 0)} </p>
      ),
    },
    {
      title: "Lương theo giờ",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.tongTienTheoGio || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Lương đóng bảo hiểm",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.luong_bao_hiem || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Phạt đi muộn/về sớm theo công",
      render: (record) => (
        <p className={styles.text}>{record?.cong_phat_di_muon_ve_som || 0} </p>
      ),
    },
    {
      title: "Phạt đi muộn/về sớm theo tiền",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.tien_phat_muon || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Hoa hồng",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.tong_hoa_hong || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Tạm ứng",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.tien_tam_ung || 0)} </p>
      ),
    },
    {
      title: "Thưởng",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.thuong || 0)} </p>
      ),
    },
    {
      title: "Thưởng nghỉ lễ",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.luong_nghi_le || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Phạt",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.phat || 0)} </p>
      ),
    },
    {
      title: "Nghỉ sai quy định",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.phat_nghi_sai_quy_dinh || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Phúc lợi",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.tien_phuc_loi || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Phụ cấp",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.tien_phu_cap || 0)} </p>
      ),
    },
    {
      title: "Phụ cấp theo ca",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.phu_cap_theo_ca || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Bảo hiểm",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.tong_bao_hiem || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Tiền khác",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.tien_khac || 0)} </p>
      ),
    },
    {
      title: "Tổng lương",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.tong_luong || 0)} </p>
      ),
    },
    {
      title: "Thuế",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.thue || 0)} </p>
      ),
    },
    {
      title: "Tổng lương thực nhận",
      render: (record) => (
        <p className={styles.text}>
          {formatMoney(record?.tien_thuc_nhan || 0)}{" "}
        </p>
      ),
    },
    {
      title: "Tổng lương đã trả",
      render: (record) => (
        <p className={styles.text}>{formatMoney(record?.luong_da_tra || 0)} </p>
      ),
    },
    // {
    //   title: 'Liên hệ',
    //   dataIndex: '',
    //   key: '',
    //   render: (record: any) => (
    //     <div>
    //       <p>{record?.phone}</p>
    //       <p>{record.email || record?.emailContact}</p>
    //       <p>{record.address}</p>
    //     </div>
    //   ),
    // },
  ];

  // useEffect(() => {
  //   const countToital = () => {
  //     let temp = 0
  //     initData?.forEach((item) => {
  //       if (item?.luong_thuc > 0) {
  //         temp += item?.luong_thuc
  //       }
  //       if (item?.idQLC === 10001160) {
  //         console.log(item)
  //       }

  //       if (item?.luong_thuc <= 0) {
  //         console.log(item)
  //       }
  //     })
  //     console.log(temp)
  //   }

  //   countToital()
  // }, [initData])

  // const [selectedOrgId, setSelectedOrgId] = useState()

  const selectRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    const com_id = getCompIdCS();
    let body: any = { com_id: com_id };

    if (value?.ep_id && value?.ep_id !== "all") {
      body["ep_id"] = value?.ep_id;
    } else body["ep_id"] = undefined;
    if (value?.organizeDetailId) {
      const organizeDetailId = orgDetailList?.find(
        (item) => item?.id === value?.organizeDetailId
      )?.listOrganizeDetailId;
      if (organizeDetailId?.length >= 2) {
        body["organizeDetailId"] = organizeDetailId;
      }
    }
    body = {
      ...param,
      ...body,
      start_date: value?.start_date?.format("YYYY-MM-DD") + POSTFIX,
      end_date: value?.end_date?.format("YYYY-MM-DD") + POSTFIX,
      month: dayjs(value?.end_date)?.month() + 1,
      year: dayjs(value?.end_date)?.year(),
    };
    setParam(body);
  };
  return (
    <Card style={{ padding: "-10px -10px" }}>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <p className={styles.title}>Danh sách nhân viên</p>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            ...param,
            start_date: dayjs(param?.start_date),
            end_date: dayjs(param?.end_date),
          }}
        >
          <Row gutter={24} className={styles.form}>
            <Col
              xl={4}
              md={4}
              xs={24}
              className={styles.col1}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <p style={{ fontWeight: '600', margin: '0px 10px' }}>Từ</p> */}
              <Form.Item name={"start_date"} style={{ width: "100%" }}>
                {/* <Input
                  type='date'
                  className={styles.time}
                  onChange={(e) => setDate(e.target.value)}
                  size='large'
                /> */}
                {/* <Select
                  options={renderMonth}
                  size='large'
                  style={{ width: '100%' }}
                /> */}
                <DatePicker
                  size="large"
                  placeholder="Ngày bắt đầu"
                  format={"DD/MM/YYYY"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col
              xl={4}
              md={4}
              xs={24}
              className={styles.col1}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <p style={{ fontWeight: '600', margin: '0px 10px' }}>Đến</p> */}
              <Form.Item name={"end_date"} style={{ width: "100%" }}>
                {/* <Input
                  type='date'
                  className={styles.time}
                  onChange={(e) => setDate(e.target.value)}
                  size='large'
                /> */}
                <DatePicker
                  size="large"
                  placeholder="Ngày bắt đầu"
                  format={"DD/MM/YYYY"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            {/* <Col xl={4} md={4} xs={24} sm={12} className={styles.col}>
              <Form.Item>
                <Select
                  className={styles.phongBan}
                  placeholder='Chọn cơ cấu'
                  suffixIcon={<Logo />}
                  size='large'
                  options={[
                    { label: 'Tất cả', value: 'all' },
                    ...orgList?.map((item) => ({
                      label: item?.organizeName,
                      value: item?.id,
                    })),
                  ]}
                  onChange={(value) => {
                    form.resetFields(['orgDetail'])
                    setSelectedOrgId(value)
                  }}
                />
              </Form.Item>
            </Col> */}
            <Col xl={8} md={4} xs={24} sm={12} className={styles.col}>
              <Form.Item name={"organizeDetailId"}>
                <Select
                  ref={selectRef}
                  className={styles.phongBan}
                  placeholder="Chọn tổ chức"
                  suffixIcon={<Logo />}
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
            <Col xl={8} md={6} xs={24} sm={12} className={styles.col}>
              <Form.Item name={"ep_id"}>
                <Select
                  className={styles.phongBan}
                  defaultValue="Tất cả nhân viên"
                  placeholder="Tìm kiếm theo tên nhân viên"
                  suffixIcon={<Logo />}
                  showSearch
                  size="large"
                  options={[
                    { label: "Tất cả nhân viên", value: "all" },
                    ...listEmp?.map((item) => ({
                      label: `${item?.idQLC} - ${item?.userName}`,
                      value: item?.idQLC,
                      labelNoVN: removeVietnameseTones(
                        `${item?.idQLC} - ${item?.userName}`
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
                />
              </Form.Item>
            </Col>
            <Col>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ margin: "10px 0px" }}
              >
                <p>Tìm kiếm</p>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Row gutter={24} className={styles.button}>
        <Col xl={5} sm={8} md={12} xs={24} className={styles.time2}>
          <Input type="date" />
        </Col>
        <Col xl={5} sm={8} md={12} xs={24} className={styles.time2}>
          <Input type="date" />
        </Col>
        <Col xl={12} sm={8} md={6} xs={13} className={styles.colbutton}>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            Tổng lương công ty:{" "}
            {new Intl.NumberFormat().format(Number(total) || 0)} VNĐ
          </p>
        </Col>
        <Col xl={5} sm={8} md={6} xs={13} className={styles.colbutton}>
          <Button
            className={styles.button1}
            icon={<IconDown />}
            onClick={() => setModalnhapluongcoban(true)}
          >
            <p className={styles.textB}>Nhập lương cơ bản</p>
          </Button>
        </Col>
        <Col xl={5} sm={8} md={6} xs={13} className={styles.colbutton}>
          <ExportExcellButton
            fileHeaders={[`Bảng lương tháng ${moment().month() + 1}`]}
            fileName={`Bảng lương tháng ${moment().month() + 1}`}
            listkeys={[
              // 'Id',
              "Tên",
              // 'Email',
              "Số điện thoại",
              "Địa chỉ",
              "Phòng ban",
              "Chức vụ",
              "Lương cơ bản",
              "Phần trăm hợp đồng",
              "Công chuẩn",
              "Công thực",
              "Công sau phạt",
              "Công theo tiền",
              "Công ghi nhận",
              "Công nghỉ phép",
              "Tổng công nhận",
              "Lương thực",
              "Lương sau phạt",
              "Lương bảo hiểm",
              "Tiền phạt muộn",
              "Công phạt đi muộn về sớm",
              "Tổng hoa hồng",
              "Tiền tạm ứng",
              "Thưởng",
              "Lương nghỉ lễ",
              "Phạt",
              "Tiền phạt nghỉ không phép",
              "Phạt nghỉ sai quy định",
              "Tiền phúc lợi",
              "Tiền phụ cấp",
              "Tiền phụ cấp theo ca",
              "Tổng bảo hiểm",
              "Tiền khác",
              "Tổng lương",
              "Thuế",
              "Lương theo giờ",
              "Tiền thực nhận",
              "Lương đã trả",
            ]}
            data={
              data
                ? data?.map((item) => [
                    item?.userName,
                    // item?.email,
                    item?.phone || item?.phoneTK,
                    item?.address,
                    item?.department?.[0]?.dep_name || "Chưa cập nhật",
                    positionLabel?.[item?.inForPerson?.employee?.position_id]
                      ?.label,
                    item?.luong_co_ban || 0 || 0,
                    item?.phan_tram_hop_dong || 0,
                    item?.cong_chuan || 0,
                    item?.cong_thuc || 0,
                    item?.cong_sau_phat || 0,
                    item?.cong_theo_tien || 0,
                    item?.cong_ghi_nhan || 0,
                    item?.cong_nghi_phep || 0,
                    item?.tong_cong_nhan || 0,
                    item?.luong_thuc || 0,
                    item?.luong_sau_phat || 0,
                    item?.luong_bao_hiem || 0,
                    item?.tien_phat_muon || 0,
                    item?.cong_phat_di_muon_ve_som || 0,
                    item?.tong_hoa_hong || 0,
                    item?.tien_tam_ung || 0,
                    item?.thuong || 0,
                    item?.luong_nghi_le || 0,
                    item?.phat || 0,
                    item?.tien_phat_nghi_khong_phep || 0,
                    item?.phat_nghi_sai_quy_dinh || 0,
                    item?.tien_phuc_loi || 0,
                    item?.tien_phu_cap || 0,
                    item?.phu_cap_theo_ca || 0,
                    item?.tong_bao_hiem || 0,
                    item?.tien_khac || 0,
                    item?.tong_luong || 0,
                    item?.thue || 0,
                    item?.tongTienTheoGio || 0,
                    item?.tien_thuc_nhan || 0,
                    item?.luong_da_tra || 0,
                  ])
                : []
            }
            component={
              <Button className={styles.button2} icon={<IconEX />}>
                <p className={styles.textB}>Xuất file lương cơ bản</p>
              </Button>
            }
          />
        </Col>
      </Row>

      <div>
        <Table
          loading={loading}
          className={`table_danhsachnhanvienthue ${styles.table}`}
          columns={columns}
          dataSource={listData}
          pagination={{
            position: ["bottomCenter"],
          }}
          scroll={{ x: "max-content" }}
        />
      </div>
      {ModalNhapLuongCoBan(nhapluongcoban, setModalnhapluongcoban)}
    </Card>
  );
};
