import styles from "./index.module.css";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Card, Table, Button, Popover } from "antd";
import Image from "next/image";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { ModalThemMoiNhanVien } from "@/components/cai-dat-luong/cai-dat-phuc-loi/modal-them-moi-nhan-vien/modal-them-moi-nhan-vien";
import { ModalDanhSachNhanVien } from "@/components/cai-dat-luong/cai-dat-phuc-loi/modal-danh-sach-nhan-vien/modal-danh-sach-nhan-vien";
import { ModalThemMoiPhucLoi } from "@/components/cai-dat-luong/cai-dat-phuc-loi/modal-them-moi-phuc-loi/modal-them-moi-phuc-loi";
import { ModalChinhSuaPhucLoi } from "@/components/cai-dat-luong/cai-dat-phuc-loi/modal-chinh-sua-phuc-loi/modal-chinh-sua-phuc-loi";
import { getCompIdSS, POST_SS, POST_SS_TL, POST_TL } from "@/pages/api/BaseApi";
import moment from "moment";
import { useRouter } from "next/router";
import { removeVietnameseTones } from "@/constants/style-constants";

const ConfirmModal = (
  openFilterDeleteClick: boolean,
  setOpenFilterDeleteClick: any,
  id: any
) => {
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
      <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa Phúc lợi này?</p>
    </div>
  );

  const router = useRouter();
  const onConfirm = () => {
    POST_TL("api/tinhluong/congty/delete_phuc_loi", { cl_id: id }).then(
      (res) => {
        if (res?.data) {
          router.replace(router.asPath);
          setOpenFilterDeleteClick(false);
        }
      }
    );
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

const items = [
  {
    key: "1",
    label: "Thêm nhân viên",
    url: "/addPeople.png",
  },
  {
    key: "2",
    label: "Danh sách nhân viên",
    url: "/order_light.png",
  },
  {
    key: "3",
    label: "Chỉnh sửa",
    url: "/edit_light.svg",
  },
  {
    key: "4",
    label: "Xóa",
    url: "/delete-icon.png",
  },
];

export default function CaiDatPhucLoi({
  listPhucLoi,
  listNhanVien,
  listPhongBan,
}) {
  const [openFilterAddClick, setOpenFilterAddClick] = useState<boolean>(false);
  const [openFilterAddWelfareClick, setOpenFilterAddWelfareClick] =
    useState<boolean>(false);
  const [openFilterSettingWelfareClick, setOpenFilterSettingWelfareClick] =
    useState<boolean>(false);
  const [openFilterDeleteClick, setOpenFilterDeleteClick] =
    useState<boolean>(false);
  const [openFilterListClick, setOpenFilterListClick] =
    useState<boolean>(false);
  const [choosen, setChoosen]: any = useState();
  const [key, setKey] = useState("");
  const [data, setData] = useState(listPhucLoi);

  const ItemDropdown = (title: String, key: any) => {
    if (key === "4")
      return (
        <>
          <a onClick={() => setOpenFilterDeleteClick(true)}>
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0 5px 0",
              }}
            >
              <Image
                src={"/delete-icon.png"}
                alt="/"
                style={{ marginRight: "10px" }}
                width={24}
                height={24}
              />
              <span className={styles.DropdownDel} style={{ fontSize: "16px" }}>
                {title}
              </span>
            </div>
          </a>
        </>
      );
    if (key === "3")
      return (
        <>
          <a
            onClick={() => {
              setOpenFilterSettingWelfareClick(true);
            }}
          >
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0 5px 0",
              }}
            >
              <Image
                src={"/edit_light.svg"}
                alt="/"
                style={{ marginRight: "10px" }}
                width={24}
                height={24}
              />
              <span className={styles.Dropdown} style={{ fontSize: "16px" }}>
                {title}
              </span>
            </div>
          </a>
        </>
      );
    if (key === "2")
      return (
        <>
          <a
            onClick={() => {
              setOpenFilterListClick(true);
              choosen &&
                POST_TL("api/tinhluong/congty/take_list_nv_nhom", {
                  cls_id_cl: choosen.cl_id,
                }).then((res) => {});
            }}
          >
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0 5px 0",
              }}
            >
              <Image
                src={"/order_light.png"}
                alt="/"
                style={{ marginRight: "10px" }}
                width={24}
                height={24}
              />
              <span className={styles.Dropdown} style={{ fontSize: "16px" }}>
                {title}
              </span>
            </div>
          </a>
        </>
      );
    return (
      <>
        <a
          onClick={() => {
            setOpenFilterAddClick(true);
          }}
        >
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "5px 0 5px 0",
            }}
          >
            <Image
              src={"/addPeople.png"}
              alt="/"
              style={{ marginRight: "10px" }}
              width={24}
              height={24}
            />
            <span className={styles.Dropdown} style={{ fontSize: "16px" }}>
              {title}
            </span>
          </div>
        </a>
      </>
    );
  };

  const content = (
    <div style={{ padding: "5px" }}>
      {items.map((data) => {
        return ItemDropdown(data.label, data.key);
      })}
    </div>
  );

  const columns: any = [
    {
      title: (
        <div style={{ marginLeft: "20px", fontWeight: "500" }}>
          Tên phúc lợi
        </div>
      ),
      align: "left",
      render: (record) => (
        <div>
          <div
            style={{ color: "#4C5BD4", fontSize: "16px", marginLeft: "20px" }}
          >
            {record?.cl_name}
          </div>
          <div></div>
        </div>
      ),
    },
    {
      title: <div style={{ fontWeight: "500" }}>Tiền phúc lợi</div>,
      render: (record) => (
        <div style={{ color: "#FF5B4D", fontSize: "16px" }}>
          {record?.cl_salary || 0} VNĐ
        </div>
      ),
      align: "center",
    },
    {
      title: <div style={{ fontWeight: "500" }}>Loại thu nhập</div>,
      render: (record) => (
        <div style={{ fontSize: "16px" }}>
          {record?.cl_type_tax === 0
            ? "Thu nhập miễn thuế"
            : "Thu nhập chịu thuế"}
        </div>
      ),
      align: "center",
    },
    {
      title: <div style={{ fontWeight: "500" }}>Áp dụng từ tháng</div>,
      render: (record) => (
        <div style={{ fontSize: "16px" }}>
          {moment(record?.cl_day).format("MM/YYYY")}
        </div>
      ),
      align: "center",
    },
    {
      title: <div style={{ fontWeight: "500" }}>Đến tháng</div>,
      render: (record) => (
        <div style={{ fontSize: "16px" }}>
          {moment(record?.cl_day_end)?.year() < 2018
            ? "---"
            : moment(record?.cl_day_end).format("DD-MM-YYYY")}
        </div>
      ),
      align: "center",
    },
    {
      title: <div style={{ fontWeight: "500" }}>Tùy chỉnh</div>,
      render: (record) => (
        <div style={{ fontSize: "16px", marginRight: "20px" }}>
          <Popover content={content}>
            <Image
              onMouseMove={() => {
                setChoosen(record);
              }}
              src="/status_list.png"
              alt="/"
              width={24}
              height={24}
            />
          </Popover>
        </div>
      ),
      align: "center",
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Card className={styles.card}>
        <div className={styles.tieuDe}>
          <span
            style={{ fontSize: "20px", fontWeight: "700", color: "#474747" }}
          >
            Danh sách phúc lợi
          </span>
          <Button
            className={`${styles.extraBTn}`}
            onClick={() => {
              setOpenFilterAddWelfareClick(true);
            }}
          >
            <div className={styles.plus}>+</div>
            <div className={styles.buttonPlusText}>Thêm phúc lợi</div>
          </Button>
        </div>

        <div>
          <Table
            className={`table_phucloi2`}
            pagination={{ position: ["bottomCenter"] }}
            columns={columns}
            dataSource={data}
            scroll={{ x: "max-content" }}
            bordered
          />
        </div>
      </Card>
      {ConfirmModal(
        openFilterDeleteClick,
        setOpenFilterDeleteClick,
        choosen?.cl_id
      )}
      {ModalThemMoiNhanVien(
        openFilterAddClick,
        setOpenFilterAddClick,
        choosen?.cl_id,
        listNhanVien
      )}
      {ModalDanhSachNhanVien({
        openFilterListClick,
        setOpenFilterListClick,
        id: choosen?.cl_id,
        listPhongBan,
        choosen,
      })}
      {ModalThemMoiPhucLoi(
        openFilterAddWelfareClick,
        setOpenFilterAddWelfareClick,
        data,
        setData
      )}
      {ModalChinhSuaPhucLoi(
        openFilterSettingWelfareClick,
        setOpenFilterSettingWelfareClick,
        choosen
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);

  const res = await Promise.all([
    POST_SS_TL(
      "api/tinhluong/congty/take_phuc_loi",
      { companyId: com_id },
      context
    ),
    POST_SS_TL("api/tinhluong/congty/list_em", { id_com: com_id }, context),
    POST_SS("api/qlc/department/list", { com_id: com_id }, context),
  ]);

  return {
    props: {
      listPhucLoi: res?.[0]?.data?.list_welf ?? [],
      listNhanVien:
        res?.[1]?.data?.listUser?.map((item) => ({
          ...item,
          userNameWithOutVN: removeVietnameseTones(
            `${item?.idQLC} - ${item?.userName}`
          ),
        })) ?? [],
      listPhongBan: res?.[2]?.data ?? [],
    },
  };
};
