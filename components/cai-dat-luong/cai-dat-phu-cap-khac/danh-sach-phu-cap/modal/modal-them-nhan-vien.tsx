import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  List,
  Checkbox,
  Tabs,
  Avatar,
} from "antd";
import styles from "./modal-them-nhan-vien.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { Search } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { POST_TL } from "@/pages/api/BaseApi";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { removeVietnameseTones } from "@/constants/style-constants";
const { TextArea } = Input;

const infoNV = [
  {
    key: "1",
    name: "Nguyen Van A",
    id: "12345",
    url: "/Ellipse1125.png",
  },
  {
    key: "2",
    name: "Nguyen Van A",
    id: "12345",
    url: "/Ellipse1125.png",
  },
  {
    key: "3",
    name: "Nguyen Van A",
    id: "12345",
    url: "/Ellipse1125.png",
  },
  {
    key: "4",
    name: "Nguyen Van A",
    id: "12345",
    url: "/Ellipse1125.png",
  },
];
export function ModalThemNhanVien(
  open: boolean,
  setOpen: Function,
  listEmp: any,
  choose: any
) {
  const onClick = () => {
    setOpen(false);
  };
  const info = listEmp?.map((emp, index) => {
    return {
      key: `${index + 1}`,
      name: emp?.userName,
      id: emp?.idQLC,
      url: emp?.avatarUser,
      nameWithOutVN: removeVietnameseTones(`${emp?.idQLC} - ${emp?.userName}`),
    };
  });
  const [listData, setListData] = useState(info);

  const [ND, setND] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [idNV, setIdNV] = useState(Array<Number>);
  const [form] = Form.useForm();
  const router = useRouter();

  const handelSubmit = async () => {
    form.validateFields().then((value) => {
      idNV?.map(async (id) => {
        await POST_TL("api/tinhluong/congty/them_nv_nhom", {
          cls_id_cl: choose?.cl_id,
          cls_id_com: choose?.cl_com,
          cls_id_user: id,
          cls_day: dayjs(value["cls_day"]).format("YYYY-MM-DDT00:00:00.000"),
          cls_day_end: value["cls_day_end"]
            ? dayjs(value["cls_day_end"]).format("YYYY-MM-DDT00:00:00.000")
            : "",
        }).then((res) => {
          if (res?.message === "success") {
            router.reload();
          }
        });
      });
      alert("Thêm nhân viên vào danh sách phụ cấp thành công!");
      // router.replace(router.asPath)
      setOpen(false);
    });
  };
  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectAll(true);
      setSelectedItems(infoNV.map((item) => item.key));
      setIdNV(listData?.map((x) => x.id));
    } else {
      setSelectAll(false);
      setSelectedItems([]);
      setIdNV([]);
    }
  };
  const tabList = [
    {
      key: "1",
      label: "Nhân viên",
      children: "",
    },
  ];
  const [checkButton, setCheckButton] = useState("1");
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={710}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm nhân viên</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Input
          className={styles.nameCT}
          placeholder="Nhập từ cần tìm"
          type="text"
          prefix={<Search />}
          onChange={(e) => {
            const keyword = e.target.value;
            setListData(
              keyword
                ? info?.filter(
                    (item) =>
                      item?.name
                        ?.toLowerCase()
                        ?.includes(keyword?.toLowerCase()) ||
                      item?.nameWithOutVN
                        ?.toLowerCase()
                        ?.includes(keyword?.toLowerCase())
                  )
                : info
            );
          }}
        />
        <Tabs
          items={tabList}
          onChange={(activekey) => setCheckButton(activekey)}
          className={`tab_themNhanVienPhucLoi`}
        />
        <div className={styles.tatca}>
          <Checkbox onChange={handleSelectAllChange} checked={selectAll}>
            <p className={styles.texttatca}>Tất cả nhân viên</p>
          </Checkbox>
        </div>
        <List
          className={styles.list}
          dataSource={listData}
          rowKey={(item: any) => item?.key}
          renderItem={(item, index) => (
            <List.Item>
              <div className={styles.the}>
                <Checkbox
                  className={styles.checkbox}
                  checked={selectedItems.includes(item.key)}
                  onChange={(e) => {
                    // Update the selected items' keys state based on the checkbox's checked status.
                    if (e.target.checked) {
                      setSelectedItems([...selectedItems, item.key]);
                      setIdNV([...idNV, item?.id]);
                    } else {
                      setSelectedItems(
                        selectedItems.filter((key) => key !== item.key)
                      );
                      setIdNV(idNV.filter((x) => x !== item.id));
                    }
                  }}
                ></Checkbox>
                <Avatar
                  src={item.url}
                  style={{ width: "46px", height: "46px", margin: "auto" }}
                />
                <div className={styles.info}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.id}>{item.id}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
        <Form form={form} className="mc">
          <Form.Item
            style={{ marginBottom: "20px" }}
            name="cls_day"
            label={
              <div style={{ display: "flex", marginBottom: "5px", gap: "5px" }}>
                <p className={styles.text}>Thời điểm áp dụng</p>
                <p className={styles.dau}>*</p>
              </div>
            }
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Nhập thời điểm áp dụng" }]}
          >
            <Input
              style={{ border: "1px solid #9F9F9F", borderRadius: "5px" }}
              size="large"
              type="date"
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "20px" }}
            name="cls_day_end"
            label={
              <div style={{ display: "flex", marginBottom: "5px", gap: "5px" }}>
                <p className={styles.text}>Kết thúc (Không bắt buộc)</p>
              </div>
            }
            labelCol={{ span: 24 }}
          >
            <Input
              style={{ border: "1px solid #9F9F9F", borderRadius: "5px" }}
              size="large"
              type="date"
            />
          </Form.Item>
        </Form>
        <div className={styles.khungbutton}>
          <Button className={styles.button} onClick={handelSubmit}>
            <p className={styles.textbutton}>Thêm mới</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
