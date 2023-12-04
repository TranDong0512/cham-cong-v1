import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  List,
  Divider,
  Skeleton,
  Tabs,
  Table,
  Popover,
} from "antd";
import styles from "./modal-danh-sach-nhan-su.module.css";
import Image from "next/image";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { spawn } from "child_process";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { ModalThietLapBaoHiemNhanVien } from "../modal-thiet-lap/modal-thiet-lap";
import { ModalThemMoiNhomBaoHiem } from "../modal-them-moi-nhom-bao-hiem/modal-them-moi-nhom-bao-hiem";
import { ModalChinhSua } from "../modal-chinh-sua/modal-chinh-sua";
import { ModalThemNhanVien2 } from "../modal-them-nhan-vien-2/modal-them-nhan-vien-2";
import Toastify from "toastify-js";
import { POST_TL } from "@/pages/api/BaseApi";
import moment from "moment";
import { useRouter } from "next/router";

interface Staff {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  room: string;
  position: string;
  email: string;
  ID: string;
  policy: string;
  fromDate: string;
  toDate: string;
  insuranceMoney: string;
}

interface Group {
  name: string;
  quantity: string;
  fromDate: string;
  toDate: string;
  tax: string;
  id: string;
}

const ConfirmModal1 = ({
  openFilterStaffDeleteClick,
  setOpenFilterStaffDeleteClick,
  record,
}: {
  openFilterStaffDeleteClick: boolean;
  setOpenFilterStaffDeleteClick: any;
  record: any;
}) => {
  const router = useRouter();
  const onConfirm = async () => {
    // xoa
    const res = await POST_TL("api/tinhluong/congty/delete_nv_insrc", {
      cl_id: record?.cls_detail?.cls_id,
    });

    if (res?.message === "success") {
      Toastify({
        text: "Xóa thành công",
        className: "info",
        style: {
          background: "red",
        },
      }).showToast();

      setOpenFilterStaffDeleteClick(false);
      router.reload();
    } else {
      Toastify({
        text: "Xóa khong thành công",
        className: "info",
        style: {
          background: "red",
        },
      }).showToast();
    }
  };

  let children: React.ReactNode = <></>;
  children = (
    <div style={{ padding: "20px 20px 0px 20px" }}>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p style={{ textAlign: "center", fontSize: "16px" }}>
        Bạn có chắc chắn muốn xóa bảo hiểm của nhân viên này?
      </p>
    </div>
  );

  return ModalWrapper(
    openFilterStaffDeleteClick,
    setOpenFilterStaffDeleteClick,
    children,
    500,
    "",
    "Đồng ý",
    onConfirm,
    false,
    false
  );
};

const ConfirmModal2 = ({
  openFilterGroupDeleteClick,
  setOpenFilterGroupDeleteClick,
}: {
  openFilterGroupDeleteClick: boolean;
  setOpenFilterGroupDeleteClick: any;
}) => {
  const onConfirm = () => {
    setOpenFilterGroupDeleteClick(false);
  };
  let children: React.ReactNode = <></>;
  children = (
    <div style={{ padding: "20px 20px 0px 20px" }}>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p style={{ textAlign: "center", fontSize: "16px" }}>
        Bạn có chắn muốn xóa nhóm bảo hiểm này?
      </p>
    </div>
  );

  return ModalWrapper(
    openFilterGroupDeleteClick,
    setOpenFilterGroupDeleteClick,
    children,
    500,
    "",
    "Đồng ý",
    onConfirm,
    false,
    false
  );
};

const ItemDropdown = (
  title: string,
  key: string,
  onClick: (keySelect: string) => void
) => {
  return (
    <>
      <a className={styles.Dropdown} onClick={() => onClick(key)}>
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0 5px 0",
            fontSize: "16px",
          }}
        >
          {title}
        </div>
      </a>
    </>
  );
};

const ItemDropdown2 = (
  title: string,
  key: string,
  onClick: (keySelect: string) => void
) => {
  return (
    <>
      <a className={styles.DropdownDel} onClick={() => onClick(key)}>
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0 5px 0",
            fontSize: "16px",
          }}
        >
          {title}
        </div>
      </a>
    </>
  );
};

export function ModalDanhSachNhanSu({
  openFilterListClick,
  setOpenFilterListClick,
  listEmp,
  insureSelected,
  listEmpSelected,
  setListEmpSelected,
  // setOpenFilterAddClick,
  listEmpInsrc,
  setListEmpInsrc,
}: {
  openFilterListClick: boolean;
  setOpenFilterListClick: any;
  listEmp: any;
  insureSelected: any;
  listEmpSelected: any;
  setListEmpSelected: Function;
  // setOpenFilterAddClick: Function
  listEmpInsrc: any;
  setListEmpInsrc: Function;
}) {
  const [key, setKey] = useState("");
  const [openFilterStaffDeleteClick, setOpenFilterStaffDeleteClick] =
    useState(false);
  const [openFilterGroupDeleteClick, setOpenFilterGroupDeleteClick] =
    useState(false);
  const [openFilterStaffSettingClick, setOpenFilterStaffSettingClick] =
    useState(false);
  const [openAddGroupClick, setOpenAddGroupClick] = useState(false);
  const [openAddStaffGroupClick, setOpenAddStaffdGroupClick] = useState(false);
  const [openSettingStaffGroupClick, setOpenSettingStaffGroupClick] =
    useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedEmp, setSelectedEmp] = useState();

  const columns: ColumnsType<Staff> = [
    {
      title: "Ảnh",
      align: "center",
      render: (record) => (
        <div>
          <Row>
            <Col>
              <Image
                src={"/avt_365.png"}
                alt=""
                height={46}
                width={46}
                style={{ display: "flex", alignItems: "center" }}
              />
            </Col>
          </Row>
        </div>
      ),
      width: 86,
    },
    {
      title: "Họ và tên (ID, Phòng ban)",
      align: "center",
      render: (record) => (
        <div
          style={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "16px" }}>{record?.userName}</span>
          <span style={{ fontSize: "16px" }}>ID: {record?.idQLC}</span>
        </div>
      ),
      width: 319,
    },
    {
      title: "Áp dụng từ ngày",
      render: (record: any) => {
        return (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            <div>
              {record?.cls_detail?.cls_day
                ? moment(record?.cls_detail?.cls_day)?.format("DD-MM-YYYY")
                : "Chưa cập nhật"}
            </div>
          </div>
        );
      },
      align: "center",
      width: 213,
    },
    {
      title: "Đến ngày",
      render: (record: any) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>
            {record?.cls_detail?.cls_day_end
              ? new Date(record?.cls_detail?.cls_day_end) >
                new Date("2022-01-01")
                ? record?.cls_detail?.cls_day_end
                : "Chưa cập nhật"
              : "Chưa cập nhật"}
          </div>
        </div>
      ),
      align: "center",
      width: 213,
    },
    // {
    //   title: 'Tiền bảo hiểm',
    //   render: (record) => (
    //     <div
    //       style={{
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         fontSize: '16px',
    //       }}>
    //       <div>{record?.cls_salary}</div>
    //     </div>
    //   ),
    //   align: 'center',
    //   width: 201,
    // },
    {
      title: "Chức năng",
      render: (record) => (
        <div>
          <Image
            src={"/trash-2.svg"}
            alt=""
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setKey(record?.idQLC);
              setSelectedEmp(record);
              setOpenFilterStaffDeleteClick(true);
            }}
          ></Image>
        </div>
      ),
      align: "center",
      width: 117,
    },
  ];

  const items1 = [
    {
      key: "1",
      label: "Thêm nhân viên",
    },
    {
      key: "2",
      label: "Chỉnh sửa",
    },
  ];

  const items2 = [
    {
      key: "3",
      label: "Xóa nhóm bảo hiểm",
    },
  ];

  const handleClickFilter = (keySelect: string) => {
    // setKeyFilterGroup(keySelect)
    if (keySelect === "3") setOpenFilterGroupDeleteClick(true);
    else if (keySelect === "1") {
      setOpenAddStaffdGroupClick(true);
    } else if (keySelect === "2") {
      setOpenSettingStaffGroupClick(true);
    }
  };
  const content1 = (
    <div style={{ padding: "5px" }}>
      {items1.map((data) => {
        return ItemDropdown(data.label, data.key, handleClickFilter);
      })}
    </div>
  );

  const content2 = (
    <div style={{ padding: "5px" }}>
      {items2.map((data) => {
        return ItemDropdown2(data.label, data.key, handleClickFilter);
      })}
    </div>
  );

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const LIST_TABS = [
    {
      key: "1",
      label: "Nhân viên (" + listEmpInsrc?.length + ")",
      children: (
        <div style={{ marginBottom: "20px" }}>
          <Table
            className={`table_danhSachNhanVien`}
            columns={columns}
            pagination={false}
            dataSource={listEmpInsrc}
            scroll={{ x: "1160px", y: "567px" }}
            bordered
            rowKey={(record: any) => record?.idQLC}
          />
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={openFilterListClick}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      className={`modal_danhSachNhanVien`}
    >
      <div className={styles.crossImage}>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpenFilterListClick(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={`${styles.bodyItem} ${styles.titleContainer}`}>
          <div className={styles.titleItem}>
            <span
              style={{
                display: "block",
                color: "#474747",
                fontFamily: "Roboto",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "136%",
              }}
            >
              {insureSelected?.cl_name}
            </span>

            {activeTab === "1" ? (
              <span
                style={{
                  display: "block",
                  color: "#B2B2B2",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "136%",
                }}
              >
                Danh sách nhân viên bảo hiểm
              </span>
            ) : (
              <span
                style={{
                  display: "block",
                  color: "#B2B2B2",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "136%",
                }}
              >
                Danh sách nhóm bảo hiểm
              </span>
            )}
          </div>

          {/* <div className={styles.titleButon}>
            {activeTab === '1' ? (
              <Button
                className={styles.extraBTn}
                onClick={() => setOpenFilterAddClick(true)}>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '136%',
                  }}>
                  + Thêm nhân viên
                </span>
              </Button>
            ) : (
              <Button
                className={styles.extraBTn2}
                onClick={() => setOpenAddGroupClick(true)}>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '136%',
                  }}>
                  + Thêm nhóm bảo hiểm
                </span>
              </Button>
            )}
          </div> */}
        </div>

        <div>
          <Tabs
            defaultActiveKey="1"
            items={LIST_TABS}
            onChange={handleTabChange}
            className={`modal_tabdanhsachnhansu`}
          />
        </div>
      </div>
      {ConfirmModal1({
        openFilterStaffDeleteClick,
        setOpenFilterStaffDeleteClick,
        record: selectedEmp,
      })}
      {/* {ConfirmModal2({
        openFilterGroupDeleteClick,
        setOpenFilterGroupDeleteClick,
      })} */}
      {ModalThietLapBaoHiemNhanVien({
        openFilterStaffSettingClick,
        setOpenFilterStaffSettingClick,
        key,
      })}
      {/* {ModalThemMoiNhomBaoHiem({ openAddGroupClick, setOpenAddGroupClick })} */}
      {/* {ModalChinhSua({
        openSettingStaffGroupClick,
        setOpenSettingStaffGroupClick,
      })} */}
      {/* {ModalThemNhanVien2({
        openAddStaffGroupClick,
        setOpenAddStaffdGroupClick,
      })} */}
      {/* {ModalThemNhanVien({
        openFilterAddClick,
        setOpenFilterAddClick,
        setOpenFilterNextClick,
        setActiveTabGroup,
        listEmp,
        insureSelected,
        listEmpSelected,
        setListEmpSelected
      })} */}
      {/* {ModalThoiGianApDung({
        open: openFilterNextClick,
        setOpen: setOpenFilterNextClick,
        activeTabGroup,
        modalKey,
        // listStaff,
        insureSelected,
        // idNV
      })} */}
    </Modal>
  );
}
