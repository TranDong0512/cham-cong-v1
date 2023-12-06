import { useRouter } from "next/router";
import { Card, Avatar, Table, Input, Select, Row, Col, Form } from "antd";
import styles from "./[id].module.css";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { ModalThemMoiLuong } from "@/components/cai-dat-luong/nhap-luong-co-ban/chi-tiet-nhan-vien/modal/modal-them-moi-luong/modal-them-moi-luong";
import {
  ModalXoa,
  ModalXoaCon,
} from "@/components/cai-dat-luong/nhap-luong-co-ban/chi-tiet-nhan-vien/modal/modal-xoa";
import { ModalChinhSuaLuongCoBan } from "@/components/cai-dat-luong/nhap-luong-co-ban/chi-tiet-nhan-vien/modal/modal-chinh-sua-luong-co-ban/modal-chinh-sua-luong-co-ban";
import { ModalThemHopDong } from "@/components/cai-dat-luong/nhap-luong-co-ban/chi-tiet-nhan-vien/modal/modal-them-hop-dong-lam-viec/modal-them-hop-dong-lam-viec";
import { ModalChinhSuaHopDong } from "@/components/cai-dat-luong/nhap-luong-co-ban/chi-tiet-nhan-vien/modal/modal-chinh-sua-hop-dong/modal-chinh-sua-hop-dong";
import { IconSelect } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { POST, POST_SS_TL, POST_TL, getCompIdSS } from "@/pages/api/BaseApi";
import {
  MyDatePicker,
  MyInput,
  MySelect,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import moment from "moment";
import dayjs from "dayjs";
import { genderLabel, getPosition, marriedLabel } from "@/utils/function";
import { toast } from "react-toastify";

export default function ChiTietNhanVien({ detailInfo }) {
  console.log("detailInfo", detailInfo);
  const [infoSal, setInfoSal] = useState(
    detailInfo?.info_basic_salary?.sort(function (a, b) {
      const a1 = moment(a?.sb_time_up)?.valueOf();
      const b1 = moment(b?.sb_time_up)?.valueOf();
      return a1 > b1 ? -1 : a1 < b1 ? 1 : 0;
    })
  );
  const router = useRouter();
  const [form] = Form.useForm();
  const [modalChinhSuaHopDong, setModalChinhSuaHopDong] = useState(false);
  const [modalXoa, setModalXoa] = useState(false);
  const [modalGioiThieu, setModalGioiThieu] = useState(false);
  const [modalText, setModalText] = useState(true);
  const [modalChinhSuaThongTinCaNhan, setModalChinhSuaThongTinCaNhan] =
    useState(false);
  const [modalThongTinCaNhan, setModalThongTinCaNhan] = useState(true);
  const [modalThemMoiLuong, setModalThemMoiLuong] = useState(false);
  const [modalChinhSuaLuongCoBan, setModalChinhSuaLuongCoBan] = useState(false);
  const [modalThemHopDong, setModalThemHopDong] = useState(false);
  const [modalXoaCon, setModalXoaCon] = useState(false);
  const [ND, setND] = useState(
    detailInfo?.info_dep_com?.user?.inForPerson?.employee?.ep_description
  );
  const [selectedBasicSalRow, setSelectedBasicSalRow] = useState();
  const [selectedCon, setSelectedCon] = useState();

  const [formDefaultValue, setFormDefaultValue] = useState({
    userName: detailInfo?.info_dep_com?.user?.userName,
    birthday: dayjs.unix(
      detailInfo?.info_dep_com?.user?.inForPerson?.account?.birthday
    ),
    dep_id: detailInfo?.info_dep_com?.user?.inForPerson?.employee?.dep_id,
    address: detailInfo?.info_dep_com?.user?.address,
    phone: detailInfo?.info_dep_com?.user?.phone,
    st_bank: detailInfo?.info_emp_start?.st_bank,
    idQLC: detailInfo?.info_dep_com?.user?.idQLC,
    st_stk: detailInfo?.info_emp_start?.st_stk,
    gender: detailInfo?.info_dep_com?.user?.inForPerson?.account?.gender,
    startWorkingTime: dayjs.unix(
      detailInfo?.info_dep_com?.user?.inForPerson?.employee?.start_working_time
    ),
    email: detailInfo?.info_dep_com?.user?.email,
    married: detailInfo?.info_dep_com?.user?.inForPerson?.account?.married,

    // tl_date: moment(detailInfo?.info_dep_com?.info_emp_start?.st_time)?.format(
    //   'YYYY-MM-DD'
    // ),
  });

  const handleInputChange = (event: any) => {
    setND(event.target.value);
  };

  const chucnang1 = (x: any) => {
    return (
      <>
        <div className={styles.chucnang}>
          <div
            onClick={() => {
              setSelectedBasicSalRow(x);
              setModalChinhSuaLuongCoBan(true);
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
              setSelectedBasicSalRow(x);
              setModalXoa(true);
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
      </>
    );
  };

  const chucnang2 = (x: any) => {
    return (
      <>
        <div className={styles.chucnang}>
          <div
            onClick={() => {
              setSelectedCon(x);
              setModalChinhSuaHopDong(true);
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
              setSelectedCon(x);
              setModalXoaCon(true);
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
      </>
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: "Lương cơ bản",
      align: "center",
      render: (record: any) => (
        <p className={styles.texts}>
          {record?.sb_salary_basic &&
            new Intl.NumberFormat("ja-JP").format(record?.sb_salary_basic)}{" "}
          VNĐ
        </p>
      ),
    },
    {
      title: "Lương đóng bảo hiểm",
      align: "center",
      render: (record: any) => (
        <p className={styles.texts}>
          {record?.sb_salary_bh &&
            new Intl.NumberFormat("ja-JP").format(record?.sb_salary_bh)}{" "}
          VNĐ
        </p>
      ),
    },
    {
      title: "Phụ cấp đóng bảo hiểm",
      align: "center",
      render: (record: any) => (
        <p className={styles.texts}>
          {" "}
          {record?.sb_pc_bh &&
            new Intl.NumberFormat("ja-JP").format(record?.sb_pc_bh)}{" "}
          VNĐ
        </p>
      ),
    },
    {
      title: "Tăng/giảm lương",
      render: (record, _, index) => (
        <p
          style={{
            color: `${
              record?.sb_salary_basic - infoSal?.[index + 1]?.sb_salary_basic >=
              0
                ? "green"
                : "red"
            }`,
          }}
        >
          {infoSal?.[index + 1]
            ? new Intl.NumberFormat().format(
                record?.sb_salary_basic - infoSal?.[index + 1]?.sb_salary_basic
              ) + " VNĐ"
            : "0 VNĐ"}
        </p>
      ),
    },
    {
      title: "Thời gian áp dụng",
      align: "center",
      render: (record: any) => (
        <p className={styles.textc}>
          {record?.sb_time_up &&
            moment(record?.sb_time_up)?.format("DD-MM-YYYY")}
        </p>
      ),
    },
    {
      title: "Chức năng",
      align: "center",
      render: (record: any) => chucnang1(record),
    },
  ];

  const columns2: ColumnsType<any> = [
    {
      title: "Hợp đồng nhân viên",
      render: (record) => <p className={styles.textc}>{record?.con_name}</p>,
    },
    {
      title: "Ngày thực hiện",
      align: "center",
      render: (record) => (
        <p className={styles.textc}>
          {record?.con_time_up &&
            moment(record?.con_time_up)?.format("DD-MM-YYYY")}
        </p>
      ),
    },
    {
      title: "Ngày hết hạn",
      align: "center",
      render: (record) => (
        <p className={styles.textc}>
          {moment(record?.con_time_end)?.year() < 2018
            ? "--"
            : moment(record?.con_time_end)?.format("DD-MM-YYYY")}
        </p>
      ),
    },
    {
      title: "% lương",
      align: "center",
      render: (record: any) => (
        <p className={styles.textc}>{record?.con_salary_persent || 0} %</p>
      ),
    },
    {
      title: "Tệp đính kèm",
      render: (record) => (
        <p className={styles.textc}>{record?.con_file || "Chưa cập nhật"} </p>
      ),
    },
    {
      title: "Chức năng",
      align: "center",
      render: (record: any) => chucnang2(record),
    },
  ];

  const { TextArea } = Input;

  const FormItemWrapper = ({ Comp }: { Comp: any }) => {
    return (
      <Col sm={12} xs={24} style={{ padding: "0 -10px" }}>
        {Comp}
      </Col>
    );
  };

  //handle form change
  const onFinish = async (value) => {
    const res = await POST("api/qlc/employee/updateInfoEmployeeComp", {
      ...value,
      birthday: value?.birthday?.valueOf(),
      startWorkingTime: value?.startWorkingTime?.valueOf(),
      // married: value?.married?.toString(),
    });
    if (res?.result) {
      window.alert("Chỉnh sửa thông tin thành công");
      router.replace(router.asPath);
    }
  };

  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }));

  const handleSaveDescriptionEmp = () => {
    setModalGioiThieu(false);
    setModalText(true);
  };
  return (
    <>
      <Card
        className={`card_chitietnv ${styles.card}`}
        cover={
          <div className={styles.header}>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <img
                  src={detailInfo?.info_dep_com?.user?.avatarUser}
                  style={{ width: "100px", height: "100px" }}
                />
                <div className={styles.thechua}>
                  <button className={styles.button1}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M9 2.99989H6.1875C4.42709 2.99989 3 4.42698 3 6.18739V11.8124C3 13.5728 4.42709 14.9999 6.1875 14.9999H11.8125C13.5729 14.9999 15 13.5728 15 11.8124V8.99989M13.8107 6.31054L14.625 5.49622C15.2108 4.91043 15.2108 3.96069 14.625 3.37491C14.0392 2.78912 13.0894 2.78912 12.5036 3.37492L11.6893 4.18922M13.8107 6.31054L9.28346 10.8378C9.07406 11.0472 8.80736 11.1899 8.51697 11.248L6.31067 11.6893L6.75193 9.48297C6.81001 9.19259 6.95274 8.92589 7.16213 8.71649L11.6893 4.18922M13.8107 6.31054L11.6893 4.18922"
                        stroke="#4C5BD4"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <p className={styles.name}>
                  {detailInfo?.info_dep_com?.user?.userName}
                </p>
                <p className={styles.vitri}>
                  {
                    positionLabel?.find(
                      (p) =>
                        p?.value ===
                        detailInfo?.info_dep_com?.user?.inForPerson?.employee
                          ?.position_id
                    )?.label
                  }
                </p>
              </div>
            </div>
          </div>
        }
      >
        <div style={{ padding: "0px" }}>
          <div className={styles.gioithieu}>
            <div className={styles.khungtitle}>
              <p className={styles.title}>Giới thiệu</p>
              {
                !modalGioiThieu ? <>
                  <button
                    style={{ border: "none" }}
                    onClick={() => {
                      setModalGioiThieu(true), setModalText(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 3.9979H7.1875C5.42709 3.9979 4 5.42499 4 7.1854V16.8104C4 18.5708 5.42709 19.9979 7.1875 19.9979H16.8125C18.5729 19.9979 20 18.5708 20 16.8104V11.9979M18.4142 8.4121L19.5 7.32634C20.281 6.54529 20.281 5.27897 19.5 4.49792C18.7189 3.71687 17.4526 3.71688 16.6715 4.49794L15.5858 5.58367M18.4142 8.4121L12.3779 14.4485C12.0987 14.7277 11.7431 14.918 11.356 14.9954L8.41422 15.5838L9.00257 12.642C9.08001 12.2548 9.27032 11.8992 9.54951 11.62L15.5858 5.58367M18.4142 8.4121L15.5858 5.58367"
                        stroke="#4C5BD4"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </> : <></>
              }
            </div>
            {modalText ? <p className={styles.thanhtich}>{ND}</p> : <></>}
            {modalGioiThieu ? (
              <div className={styles.formgioithieu}>
                <TextArea
                  style={{ resize: "none" }}
                  className={styles.inputgioithieu}
                  rows={5}
                  onChange={handleInputChange}
                  value={ND}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className={styles.buttonb1}
                    onClick={() => {
                      setModalGioiThieu(false), setModalText(true), setND('');
                    }}
                  >
                    <p className={styles.textb1}>Huỷ</p>
                  </button>
                  <button
                    className={styles.buttonb2}
                    onClick={handleSaveDescriptionEmp}
                  >
                    <p className={styles.textb2}>Lưu thông tin</p>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className={styles.khungtt}>
              <p className={styles.title2}>Thông tin cá nhân</p>
              <div
                style={{
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {
                  !modalChinhSuaThongTinCaNhan ? <>
                    <button
                      style={{ border: "none", background: "#fff" }}
                      onClick={() => {
                        setModalThongTinCaNhan(false);
                        setModalChinhSuaThongTinCaNhan(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 3.9979H7.1875C5.42709 3.9979 4 5.42499 4 7.1854V16.8104C4 18.5708 5.42709 19.9979 7.1875 19.9979H16.8125C18.5729 19.9979 20 18.5708 20 16.8104V11.9979M18.4142 8.4121L19.5 7.32634C20.281 6.54529 20.281 5.27897 19.5 4.49792C18.7189 3.71687 17.4526 3.71688 16.6715 4.49794L15.5858 5.58367M18.4142 8.4121L12.3779 14.4485C12.0987 14.7277 11.7431 14.918 11.356 14.9954L8.41422 15.5838L9.00257 12.642C9.08001 12.2548 9.27032 11.8992 9.54951 11.62L15.5858 5.58367M18.4142 8.4121L15.5858 5.58367"
                          stroke="#4C5BD4"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </> : <></>
                }
              </div>
            </div>

            {modalThongTinCaNhan ? (
              <div className={styles.chitietTT}>
                <div className={styles.chitiet1}>
                  <p>
                    Họ và tên:{" "}
                    {detailInfo?.info_dep_com?.user?.userName ||
                      "Chưa cập nhật"}
                  </p>
                  <p>
                    Sinh ngày:{" "}
                    {detailInfo?.info_dep_com?.user?.inForPerson?.account
                      ?.birthday
                      ? moment
                          .unix(
                            detailInfo?.info_dep_com?.user?.inForPerson?.account
                              ?.birthday
                          )
                          ?.format("DD-MM-YYYY")
                      : "Chưa cập nhật"}
                  </p>
                  <p>
                    Địa chỉ:{" "}
                    {detailInfo?.info_dep_com?.user?.address || "Chưa cập nhật"}
                  </p>
                  <p>
                    Số điện thoại:{" "}
                    {detailInfo?.info_dep_com?.user?.phone || "Chưa cập nhật"}
                  </p>
                  <p>
                    Ngân hàng nhận lương:{" "}
                    {detailInfo?.info_emp_start?.st_bank || "Chưa cập nhật"}
                  </p>
                  <p>
                    Số tài khoản ngân hàng:{" "}
                    {detailInfo?.info_emp_start?.st_stk || "Chưa cập nhật"}
                  </p>
                </div>
                <div className={styles.chitiet1}>
                  <p>
                    Giới tính:{" "}
                    {
                      genderLabel.find(
                        (item) =>
                          item.value ===
                          detailInfo?.info_dep_com?.user?.inForPerson?.account
                            ?.gender
                      )?.label
                    }
                  </p>
                  <p>
                    Mã nhân viên:{" "}
                    {detailInfo?.info_dep_com?.user?.idQLC || "Chưa cập nhật"}
                  </p>
                  <p>
                    Chức vụ:{" "}
                    {positionLabel?.[
                      `${detailInfo?.info_dep_com?.user?.inForPerson?.employee?.position_id}`
                    ]?.label || "Chưa cập nhật"}
                  </p>

                  <p>
                    Ngày bắt đầu làm:
                    {detailInfo?.info_dep_com?.user?.inForPerson?.employee
                      ?.start_working_time != 0 ? (
                      <span>
                        {moment
                          .unix(
                            detailInfo?.info_dep_com?.user?.inForPerson
                              ?.employee?.start_working_time
                          )
                          ?.format("DD-MM-YYYY") || "Chưa cập nhật"}
                      </span>
                    ) : (
                      <span>Chưa cập nhật</span>
                    )}
                  </p>

                  <p>
                    Email:{" "}
                    {detailInfo?.info_dep_com?.user?.email || "Chưa cập nhật"}
                  </p>
                  <p>
                    Bắt đầu tính lương:{" "}
                    {detailInfo?.info_dep_com?.info_emp_start?.st_time ||
                      "Chưa cập nhật"}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {modalChinhSuaThongTinCaNhan ? (
              <div style={{ width: "100%", marginBottom: "20px" }}>
                <div className={styles.khungchinhsua}>
                  <Form
                    initialValues={formDefaultValue}
                    form={form}
                    onFinish={onFinish}
                  >
                    <Row gutter={[20, 0]}>
                      <FormItemWrapper
                        Comp={MyInput(
                          "Họ và tên",
                          "Họ và tên",
                          true,
                          true,
                          "userName"
                        )}
                      />

                      <FormItemWrapper
                        Comp={MySelect(
                          "Giới tính",
                          "Giới tính",
                          true,
                          true,
                          "gender",
                          genderLabel
                        )}
                      />

                      <FormItemWrapper
                        Comp={MyDatePicker(
                          "Ngày sinh",
                          "Ngày sinh",
                          true,
                          true,
                          "birthday"
                        )}
                      />

                      <FormItemWrapper
                        Comp={MyInput(
                          "Mã nhân viên",
                          "",
                          true,
                          true,
                          "idQLC",
                          "",
                          true
                        )}
                      />

                      <FormItemWrapper
                        Comp={MySelect(
                          "Tình trạng hôn nhân",
                          "Tình trạng hôn nhân",
                          true,
                          true,
                          "married",
                          marriedLabel
                        )}
                      />

                      <FormItemWrapper
                        Comp={MyInput("Địa chỉ", "", true, true, "address")}
                      />

                      <FormItemWrapper
                        Comp={MyInput("Số điện thoại", "", true, true, "phone")}
                      />

                      <FormItemWrapper
                        Comp={MyInput("Email", "", false, true, "email")}
                      />

                      <FormItemWrapper
                        Comp={MyDatePicker(
                          "Ngày bắt đầu làm việc",
                          "",
                          true,
                          true,
                          "startWorkingTime",
                          ""
                        )}
                      />

                      <FormItemWrapper
                        Comp={MyInput(
                          "Ngân hàng nhận lương",
                          "Nhập tên ngân hàng",
                          false,
                          true,
                          "st_bank"
                        )}
                      />

                      <FormItemWrapper
                        Comp={MyInput(
                          "Tài khoản ngân hàng",
                          "Tài khoản ngân hàng",
                          false,
                          true,
                          "st_stk"
                        )}
                      />
                    </Row>

                    <div
                      className={styles.button}
                      style={{ marginTop: "10px" }}
                    >
                      <button
                        className={styles.buttonhuy}
                        onClick={() => {
                          setModalThongTinCaNhan(true);
                          setModalChinhSuaThongTinCaNhan(false);
                          form.resetFields()
                        }}
                      >
                        <p className={styles.huy}>Huỷ</p>
                      </button>
                      <button className={styles.buttonluu} type="submit">
                        <p className={styles.luu}>Lưu thông tin</p>
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className={styles.luongcoban}>
              <div className={styles.titleLuongCoBan}>
                <p className={styles.title3}>Lương cơ bản</p>
                <button
                  className={styles.buttonThemLuong}
                  onClick={() => setModalThemMoiLuong(true)}
                >
                  <p className={styles.text1}>+</p>
                  <p className={styles.text1}>Thêm lương</p>
                </button>
              </div>
              <Table
                className={`table_danhsachnhanvienthue ${styles.table}`}
                dataSource={infoSal}
                columns={columns}
                pagination={false}
                scroll={{ x: "max-content" }}
                bordered={true}
              />
            </div>
            <div className={styles.luongcoban}>
              <div className={styles.titleLuongCoBan}>
                <p className={styles.title3}>Hợp đồng làm việc</p>
                <button
                  className={styles.buttonThemLuong}
                  onClick={() => setModalThemHopDong(true)}
                >
                  <p className={styles.text1}>+</p>
                  <p className={styles.text1}>Thêm hợp đồng</p>
                </button>
              </div>
              <Table
                className={`table_danhsachnhanvienthue ${styles.table}`}
                dataSource={detailInfo?.info_contract}
                columns={columns2}
                pagination={false}
                scroll={{ x: 1088 }}
                bordered={true}
              />
            </div>
          </div>
        </div>
      </Card>

      {ModalThemMoiLuong(
        modalThemMoiLuong,
        setModalThemMoiLuong,
        "1",
        detailInfo
      )}
      {ModalXoa(modalXoa, setModalXoa, selectedBasicSalRow)}
      {ModalChinhSuaLuongCoBan(
        modalChinhSuaLuongCoBan,
        setModalChinhSuaLuongCoBan,
        selectedBasicSalRow
      )}
      {ModalThemHopDong(modalThemHopDong, setModalThemHopDong, detailInfo)}
      {ModalChinhSuaHopDong(
        modalChinhSuaHopDong,
        setModalChinhSuaHopDong,
        selectedCon
      )}
      {ModalXoaCon(modalXoaCon, setModalXoaCon, selectedCon)}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const emp_id = context?.query?.id;
  let com_id = null;
  com_id = getCompIdSS(context);

  const res = await POST_SS_TL(
    "api/tinhluong/nhanvien/qly_ho_so_ca_nhan",
    {
      ep_id: emp_id,
      cp: com_id,
    },
    context
  );

  return {
    props: {
      detailInfo: res?.data || {},
    },
  };
};
