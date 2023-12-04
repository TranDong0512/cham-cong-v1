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
import styles from "./modal-danh-sach-nhan-vien.module.css";
import Image from "next/image";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { spawn } from "child_process";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { ModalChinhSuaNhanVien } from "@/components/cai-dat-luong/cai-dat-phuc-loi/modal-chinh-sua-nhan-vien/modal-chinh-sua-nhan-vien";
import { POST_TL } from "@/pages/api/BaseApi";
import moment from "moment";
import { useRouter } from "next/router";

const ConfirmModal = ({
  openFilterDeleteClick,
  setOpenFilterDeleteClick,
  id_cl,
  id_user,
  ListStaff,
  setListStaff,
}: {
  openFilterDeleteClick: boolean;
  setOpenFilterDeleteClick: any;
  id_cl: any;
  id_user: any;
  ListStaff: any;
  setListStaff: any;
}) => {
  const router = useRouter();
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
      <p style={{ textAlign: "center" }}>
        Bạn có chắc muốn xóa phúc lợi của nhân viên này?
      </p>
    </div>
  );
  const onConfirm = () => {
    if (id_user) {
      POST_TL("api/tinhluong/congty/delete_nv_nhom", {
        cls_id_cl: id_cl,
        cls_id_user: id_user,
      }).then((res) => {
        if (res?.data) {
          setListStaff(ListStaff.filter((data) => data.idQLC !== id_user));
          setOpenFilterDeleteClick(false);
        }
      });
    }
  };
  return ModalWrapper(
    openFilterDeleteClick,
    setOpenFilterDeleteClick,
    children,
    500,
    "",
    "Đồng ý",
    onConfirm,
    false,
    false
  );
};

export function ModalDanhSachNhanVien({
  openFilterListClick,
  setOpenFilterListClick,
  id,
  listPhongBan,
  choosen,
}: {
  openFilterListClick: boolean;
  setOpenFilterListClick: any;
  id: any;
  listPhongBan: any;
  choosen: any;
}) {
  const [openFilterDeleteClick, setOpenFilterDeleteClick] = useState(false);
  const [openFilterSettingClick, setOpenFilterSettingClick] = useState(false);
  const [ListStaff, setListStaff]: any = useState();
  const [empSelected, setEmpSelected] = useState<any>({});
  const [id_user, setIdUser] = useState("");
  useEffect(() => {
    if (id) {
      POST_TL("api/tinhluong/congty/take_list_nv_nhom", { cls_id_cl: id }).then(
        (res) => {
          if (res?.message === "success") {
            setListStaff(
              res?.listUserFinal.map((data: any) => {
                const temp = res?.detailClass?.find(
                  (item) => item?.cls_id_user === data?.idQLC
                );
                return { ...data, ...temp, detail: res?.detail };
              })
            );
          }
        }
      );
    }
  }, [id]);
  const columns: any = [
    {
      title: "Ảnh",
      align: "center",
      render: (record) => (
        <Image
          src={`/avt_365.png`}
          alt=""
          height={46}
          width={46}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ),
    },
    {
      title: "Họ và tên (ID)",
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
    },
    {
      title: "Phòng ban",
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
          <span style={{ fontSize: "16px" }}>
            {record?.organizeDetail?.organizeDetailName}
          </span>
        </div>
      ),
    },
    {
      title: "Áp dụng từ tháng",
      render: (record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>{moment(record?.cls_day).format("DD/MM/YYYY")}</div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Đến tháng",
      render: (record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>
            {new Date(record?.cls_day_end) > new Date("2020-01-01")
              ? moment(record?.cls_day_end).format("DD/MM/YYYY")
              : "Chưa cập nhật"}
          </div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Tiền phúc lợi",
      render: (record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: "#FF5B4D",
          }}
        >
          <div>{record?.detail?.cl_salary || 0} VNĐ</div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Chức năng",
      render: (record) => (
        <div>
          <Image
            src={"/edit-blue-2.svg"}
            alt=""
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEmpSelected(record);
              setOpenFilterSettingClick(true);
            }}
          ></Image>
          <Image
            src={"/vector-255.svg"}
            alt=""
            width={1}
            height={24}
            style={{
              strokeWidth: "1px",
              stroke: "#D9D9D9",
              margin: "0px 10px 0px 10px",
            }}
          ></Image>
          <Image
            src={"/trash-2.svg"}
            alt=""
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenFilterDeleteClick(true);
              setIdUser(record?.idQLC);
              setEmpSelected(record);
            }}
          ></Image>
        </div>
      ),
      align: "center",
      width: "150px",
    },
  ];

  return (
    <Modal
      open={openFilterListClick}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      className={`modal_danhSachNhanVienPhucLoi`}
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
        <div className={`${styles.bodyItem}`}>
          <span className={styles.titleList}>
            Danh sách nhân viên hưởng Phúc lợi {choosen?.cl_name}
          </span>
        </div>
        <div className={`${styles.bodyItem}`}>
          <Table
            className={`table_danhSachNhanVien`}
            columns={columns}
            pagination={false}
            dataSource={ListStaff}
            scroll={{ x: "1140px" }}
            bordered
          />
          {ConfirmModal({
            openFilterDeleteClick,
            setOpenFilterDeleteClick,
            id_cl: id,
            id_user: id_user,
            ListStaff,
            setListStaff,
          })}
          {ModalChinhSuaNhanVien({
            openFilterSettingClick,
            setOpenFilterSettingClick,
            key: empSelected,
          })}
        </div>
      </div>
    </Modal>
  );
}
