import { Popover, Card, Row, Col, Button, Select, Form } from "antd";
import { useState, useEffect } from "react";
import styles from "./chinh-sach-bao-hiem.module.css";
import { EditOutlined, SlidersOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import {
  ModalThemNhanVien,
  ModalThoiGianApDung,
} from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/modal-them-nhan-vien/modal-them-nhan-vien";
import { ModalDanhSachNhanSu } from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/modal-danh-sach-nhan-su/modal-danh-sach-nhan-su";
import { ModalChinhSuaChinhSachBaoHiem } from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/modal-chinh-sua-chinh-sach-bao-hiem/modal-chinh-sua-chinh-sach-bao-hiem";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

const ConfirmModal = ({
  openFilterDeleteClick,
  setOpenFilterDeleteClick,
  insureSelected,
}: {
  openFilterDeleteClick: boolean;
  setOpenFilterDeleteClick: any;
  insureSelected: any;
}) => {
  const router = useRouter();

  const onConfirm = () => {
    POST_TL("api/tinhluong/congty/delete_insrc", {
      cl_id: insureSelected?.cl_id,
    }).then((res) => {
      if (res?.result) {
        setOpenFilterDeleteClick(false);
        router.reload();
      }
    });
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
        Bạn có chắc chắn muốn xóa cài đặt này?
      </p>
      <p style={{ textAlign: "center", fontSize: "16px" }}>
        Điều này có thể ảnh hưởng đến lương nhân viên đã cài đặt trước đó
      </p>
    </div>
  );

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

const ItemDropdown = (
  title: string,
  url: string,
  key: any,
  record: any,
  onClick: (keySelect: any, record: any) => void
) => {
  return (
    <>
      <a className={styles.Dropdown} onClick={() => onClick(key, record)}>
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0 5px 0",
          }}
        >
          <Image
            src={url}
            alt="/"
            style={{ marginRight: "10px" }}
            width={24}
            height={24}
          />
          {title}
        </div>
      </a>
    </>
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
    url: "/list.png",
  },
];

const items2 = [
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

interface YourData {
  key: string;
  mieu_ta: string;
  cong_thuc_tinh: string;
}

export const ChinhSachBaoHiem = ({
  listInsurance,
  listEmp,
}: {
  listInsurance: any;
  listEmp: any;
}) => {
  const [openFilterDeleteClick, setOpenFilterDeleteClick] =
    useState<boolean>(false);
  const [openFilterAddClick, setOpenFilterAddClick] = useState<boolean>(false);
  const [openFilterListClick, setOpenFilterListClick] =
    useState<boolean>(false);
  const [openFilterNextClick, setOpenFilterNextClick] =
    useState<boolean>(false);
  const [openFilterSettingClick, setOpenFilterSettingClick] =
    useState<boolean>(false);
  const [modalNext, setNext] = useState<boolean>(false);
  const [activeTabGroup, setActiveTabGroup] = useState<boolean>(false);
  const [key, setKey] = useState("");

  const [listEmpSelected, setListEmpSelected]: any = useState([]);
  const [data, setData]: any = useState(
    listInsurance?.tax_list?.map((ins) => ({
      ...ins,
      key: `${ins?.cl_id}`,
      title: ins?.cl_name,
      mieu_ta: ins?.cl_note,
      cong_thuc_tinh: ins?.TinhluongFormSalary?.map(
        (ct) => `${ct?.fs_repica} `
      ),
    }))
  );
  const [insureSelected, setInsureSelected]: any = useState({});
  const [listEmpInsrc, setListEmpInsrc]: any[] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (insureSelected?.cl_id) {
      let com_id = undefined;
      com_id = getCompIdCS();
      com_id &&
        POST_TL("api/tinhluong/congty/take_list_nv_insrc", {
          cls_id_cl: insureSelected?.cl_id,
          cls_id_com: com_id,
        }).then((res) => {
          if (res?.message === "success") {
            console.log("CHECK SUCCESS DEFAULT INSR 1");
            console.log(res?.listUserFinal);
            setListEmpInsrc(res?.listUserFinal);
          }
        });
    }
  }, [insureSelected]);

  const handleClickFilter = (keySelect: any, record: any) => {
    if (keySelect === "4") {
      setOpenFilterDeleteClick(true);
    } else if (keySelect === "1") {
      setOpenFilterAddClick(true);
    } else if (keySelect === "2") {
      setOpenFilterListClick(true);
    } else if (keySelect === "3") {
      setOpenFilterSettingClick(true);
    }
    setKey(keySelect);
    setInsureSelected(record);
  };
  const content = (cls_id: any, title: String) => (
    <div style={{ padding: "5px" }}>
      {items.map((data) => {
        return ItemDropdown(
          data.label,
          data.url,
          data.key,
          { cl_id: cls_id, cl_name: title },
          handleClickFilter
        );
      })}
    </div>
  );

  const content2 = (record: any) => {
    return (
      <div style={{ padding: "5px" }}>
        {items2.map((data) => {
          return ItemDropdown(
            data.label,
            data.url,
            data.key,
            record,
            handleClickFilter
          );
        })}
      </div>
    );
  };

  const titleModal = (
    title: string,
    data: any,
    content: React.ReactNode
  ): React.ReactNode => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color: "#fff", fontSize: "18px" }}>{title}</span>
      <div style={{ marginLeft: "auto", marginRight: 0 }}>
        <Popover content={content}>
          <SlidersOutlined
            style={{ color: "#fff", fontSize: "24px" }}
            size={30}
          />
        </Popover>
      </div>
    </div>
  );

  const renderRows = (dataBHXHMoi: YourData[]): JSX.Element[] => {
    let rows: JSX.Element[] = [];
    dataBHXHMoi.forEach((item: any, index: number) => {
      rows.push(
        <Col
          className={`${styles.col} table_chinhsachbaohiem`}
          style={{ marginTop: "20px" }}
        >
          <Card
            title={titleModal(item?.title, item, content2(item))}
            style={{ height: "100%", border: "1px solid #4C5BD4" }}
          >
            <Form.Item>
              <EditOutlined rev={""} />
              <div
                style={{
                  marginLeft: "10px",
                  display: "inline",
                  fontSize: "16px",
                }}
              >
                Miêu tả
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                {item.mieu_ta}
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={"/add-desktop.svg"}
                  alt={""}
                  width={24}
                  height={24}
                />
                <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                  Công thức tính
                </div>
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                {item.cong_thuc_tinh}
              </div>
            </Form.Item>
          </Card>
        </Col>
      );
    });

    return rows;
  };
  return (
    <div style={{ margin: "-4px 6px 6px 6px" }}>
      <Row gutter={[20, 40]} className={styles.rowMain}>
        <Col className={`${styles.col} table_chinhsachbaohiem`}>
          <Card
            title={titleModal(
              "Nhập tiền bảo hiểm",
              "",
              content(3, "Nhập tiền bảo hiểm")
            )}
            style={{ height: "100%", border: "1px solid #4C5BD4" }}
          >
            <Form.Item>
              <EditOutlined rev={""} />
              <div
                style={{
                  marginLeft: "10px",
                  display: "inline",
                  fontSize: "16px",
                }}
              >
                Miêu tả
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                Nhập trực tiếp tiền bảo hiểm cho nhân viên
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className={`${styles.buttonCopy} ${styles.button}`}
                  onClick={() => {
                    setOpenFilterAddClick(true);
                    setInsureSelected({
                      cl_id: 3,
                      cl_name: "Nhập tiền bảo hiểm",
                    });
                  }}
                >
                  <div style={{ fontSize: "18px" }}>Nhập tiền bảo hiểm</div>
                </Button>
              </div>
            </Form.Item>
          </Card>
        </Col>

        <Col className={`${styles.col} table_chinhsachbaohiem`}>
          <Card
            title={titleModal(
              "BHXH Tính theo lương cơ bản",
              "",
              content(4, "BHXH Tính theo lương cơ bản")
            )}
            style={{ height: "100%", border: "1px solid #4C5BD4" }}
          >
            <Form.Item>
              <EditOutlined rev={""} />
              <div
                style={{
                  marginLeft: "10px",
                  display: "inline",
                  fontSize: "16px",
                }}
              >
                Miêu tả
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                Bảo hiểm xã hội được tính theo mức lương cơ bản mà công ty chi
                trả cho cá nhân đó.
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={"/add-desktop.svg"}
                  alt={""}
                  width={24}
                  height={24}
                />
                <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                  Công thức tính
                </div>
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                Lương cơ bản * 10.5%
              </div>
            </Form.Item>
          </Card>
        </Col>

        <Col className={`${styles.col} table_chinhsachbaohiem`}>
          <Card
            title={titleModal(
              "BHXH Tính theo lương nhập vào",
              "",
              content(5, "BHXH Tính theo lương nhập vào")
            )}
            style={{ height: "100%", border: "1px solid #4C5BD4" }}
          >
            <Form.Item>
              <EditOutlined rev={""} />
              <div
                style={{
                  marginLeft: "10px",
                  display: "inline",
                  fontSize: "16px",
                }}
              >
                Miêu tả
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                Bảo hiểm xã hội sẽ tính theo mức lương của từng cá nhân do công
                ty nhập vào (có thể là mức tối thiểu vùng)
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={"/add-desktop.svg"}
                  alt={""}
                  width={24}
                  height={24}
                />
                <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                  Công thức tính
                </div>
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                Lương nhập vào * 10.5%
              </div>
            </Form.Item>
          </Card>
        </Col>
        {data && renderRows(data)}
      </Row>
      {ConfirmModal({
        openFilterDeleteClick,
        setOpenFilterDeleteClick,
        insureSelected,
      })}
      {ModalThemNhanVien({
        openFilterAddClick,
        setOpenFilterAddClick,
        setOpenFilterNextClick,
        // setActiveTabGroup,
        listEmp,
        insureSelected,
        listEmpSelected,
        setListEmpSelected,
      })}
      {ModalThoiGianApDung({
        open: openFilterNextClick,
        setOpen: setOpenFilterNextClick,
        activeTabGroup,
        modalKey: listEmpSelected,
        // listStaff,
        insureSelected,
        // idNV
      })}
      {ModalDanhSachNhanSu({
        openFilterListClick,
        setOpenFilterListClick,
        listEmp,
        insureSelected,
        listEmpSelected,
        setListEmpSelected,
        // setOpenFilterAddClick,
        listEmpInsrc,
        setListEmpInsrc,
      })}
      {ModalChinhSuaChinhSachBaoHiem({
        openFilterSettingClick,
        setOpenFilterSettingClick,
        insureSelected,
      })}
    </div>
  );
};
