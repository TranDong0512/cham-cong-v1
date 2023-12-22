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
  Form,
} from "antd";
import styles from "./modal-them-moi-chinh-sach-bao-hiem.module.css";
import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";
import { ItemList } from "./ItemList/ItemList";
import { useState, useEffect } from "react";
import { POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

const ImageToggle = ({
  value,
  setFsData,
  fsData,
}: {
  value: string;
  fsData: string;
  setFsData: Function;
}) => {
  const [currentImage, setCurrentImage] = useState("/checkbox-design-1.svg");

  useEffect(() => {
    if (fsData !== "") {
      if (fsData === value) {
        setCurrentImage("/checkbox-design-1.svg");
      } else {
        setCurrentImage("/checkbox-design-2.svg");
      }
    }
  }, [fsData]);

  const handleImageToggle = () => {
    if (currentImage === "/checkbox-design-1.svg") {
      setFsData(value);
    } else {
      setFsData("");
    }
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={handleImageToggle}
    >
      <Image
        src={currentImage}
        alt=""
        width={24}
        height={24}
        style={{ marginRight: "10px" }}
      />
      <span>{value}</span>
    </div>
  );
};

export function ModalCongThuc(
  open: boolean,
  setOpen: Function,
  form: any,
  insureSelected?: any,
  openModalAdd?: boolean

) {
  const [fsData, setFsData]: any = useState("");
  const [listCt, setListCt]: any[] = useState([]);
  const [fsRepica, setFsRepica]: any = useState("");

  const ListFormula = [
    {
      key: "1",
      luong_co_ban: "luong_co_ban",
      muc_luong_co_ban: "Mức lương cơ bản",
    },
    {
      key: "2",
      luong_co_ban: "luong_co_ban",
      muc_luong_co_ban: "Mức lương cơ bản",
    },
    {
      key: "3",
      luong_co_ban: "luong_co_ban",
      muc_luong_co_ban: "Mức lương cơ bản",
    },
    {
      key: "4",
      luong_co_ban: "luong_co_ban",
      muc_luong_co_ban: "Mức lương cơ bản",
    },
    {
      key: "5",
      luong_co_ban: "luong_co_ban",
      muc_luong_co_ban: "Mức lương cơ bản",
    },
    {
      key: "6",
      luong_co_ban: "luong_co_ban",
      muc_luong_co_ban: "Mức lương cơ bản",
    },
  ];
  const options = [
    { label: "Hằng số", value: "Hằng số" },
    { label: "Công thức", value: "Công thức" },
  ];
  const handleSetFormula = (decreptionAdd: string) => {
    setFsRepica(fsRepica + ` ${decreptionAdd}`);
  };

  useEffect(() => {
    if (insureSelected?.cl_id) {
      form.setFieldsValue(insureSelected);
      setListCt(insureSelected?.TinhluongFormSalary);
      setFsData(`${insureSelected?.TinhluongFormSalary?.[0]?.fs_data}`);
    }
  }, [insureSelected, open]);

  useEffect(() => {
    if (listCt?.length > 0) {
      form.setFieldValue("fs_name", listCt?.[0]?.fs_name);
      let repica = "";
      listCt?.map((ct, index) => {
        if (index === listCt?.length - 1) {
          repica += `${ct?.fs_repica}`;
        } else {
          repica += `${ct?.fs_repica} `;
        }
      });
      setFsRepica(repica);
    }
  }, [listCt, open]);

  useEffect(() => {
    form.resetFields()
    setFsRepica('');
    setFsData('')
  }, [openModalAdd])

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false)
        setFsRepica('');
        setFsData('')
        form.setFieldValue('fs_name', '')
      }}
      width={700}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      className={`modal_congthuc`}
    >
      <div className={styles.header}>
        <div className={styles.textHead}>Công thức</div>
        <div className={styles.crossImage}>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => {
              setOpen(false)
              setFsRepica('')
              setFsData('')
              form.setFieldValue('fs_name', '')
            }}
          />
        </div>
      </div>
      <Form
        form={form}
        initialValues={{ fs_name: "", fs_data: "", fs_repica: "" }}
      >
        <div className={styles.addFormula}>Thêm công thức</div>
        <div className={styles.formBody}>
          <div className={styles.formItem1}>
            <Form.Item name={"fs_name"}>
              <Input
                className={styles.inputForm}
                placeholder="Nhập tên công thức"
                prefix={<MenuOutlined rev={""} />}
              />
            </Form.Item>

            <Form.Item name={"fs_data"}>
              <div className={styles.option}>
                <div style={{ display: "flex", flex: "1" }}>
                  <input
                    type="radio"
                    className={styles.nut}
                    value="1"
                    id="hangso"
                    name="drone"
                    onChange={(e) => {
                      setFsData(e.target.value);
                    }}
                    checked={fsData === "1" ? true : false}
                  ></input>
                  <label className={styles.hs}>Hằng số</label>
                </div>
                <div style={{ display: "flex", flex: "1" }}>
                  <input
                    type="radio"
                    className={styles.nut}
                    value="2"
                    id="congthuc"
                    name="drone"
                    onChange={(e) => {
                      setFsData(e.target.value);
                    }}
                    checked={fsData === "2" ? true : false}
                  ></input>
                  <label className={styles.hs}>Công thức</label>
                </div>
              </div>
            </Form.Item>
          </div>

          <Form.Item name={"fs_repica"}></Form.Item>
          <div className={styles.formItem2}>
            <Input.TextArea
              className={styles.textAreaItem}
              placeholder="Nhập miêu tả"
              value={fsRepica}
              onChange={(e) => setFsRepica(e.target.value)}
            ></Input.TextArea>
          </div>

          <div className={styles.formItem3}>
            <div className={styles.ListFormula}>
              {ListFormula.map((item, index) => (
                <ItemList
                  key={index}
                  luong_co_ban={item.luong_co_ban}
                  muc_luong_co_ban={item.muc_luong_co_ban}
                  handleSetFormula={handleSetFormula}
                />
              ))}
            </div>
          </div>

          <div className={styles.buttonAddFormula}>
            <Button
              className={styles.Button2}
              onClick={() => {
                form.setFieldValue("fs_data", fsData);
                form.setFieldValue("fs_repica", fsRepica);
                setOpen(false);
              }}
            >
              <p className={styles.txt}>Thêm công thức</p>
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export function ModalThemMoiChinhSachBaoHiem(open: boolean, setOpen: Function) {
  const [form] = Form.useForm();
  const [next, setNext] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    // setOpen(false);
    // console.log(form.getFieldsValue());
    form.validateFields().then((value) => {
      let com_id = null;
      com_id = getCompIdCS();

      com_id !== null &&
        POST_TL("api/tinhluong/congty/insert_category_insrc", {
          com_id: com_id,
          ...value,
          fs_data:
            form.getFieldValue("fs_data") !== ""
              ? Number(form.getFieldValue("fs_data"))
              : undefined,
        }).then((res) => {
          if (res?.message === "success") {
            setOpen(false);
            router.reload();
          }
        });
    });
  };

  return (
    <Modal
      open={open}
      width={600}
      closable={false}
      onCancel={() => {
        setOpen(false);
      }}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div className={styles.textHead}>Thêm mới chính sách bảo hiểm</div>
        <div className={styles.crossImage}>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
      <div className={styles.body}>
        <Form
          form={form}
          initialValues={{
            cl_name: "",
            cl_note: "",
          }}
        >
          <div className={styles.bodyItem}>
            <span style={{ fontSize: "16px" }}>
              Tên chính sách bảo hiểm <span style={{ color: "red" }}>*</span>
            </span>
            <Form.Item
              name={"cl_name"}
              rules={[{ required: true, message: "Nhập tên bảo hiểm!" }]}
            >
              <Input
                style={{ fontSize: "16px", border: "1px solid #9F9F9F" }}
                placeholder="Nhập tên bảo hiểm"
              ></Input>
            </Form.Item>
          </div>
          <div className={styles.bodyItem}>
            <span style={{ fontSize: "16px" }}>Miêu tả chính sách</span>
            <Form.Item name={"cl_note"}>
              <Input.TextArea
                placeholder="Nhập miêu tả"
                className={styles.textArea}
                style={{ fontSize: "16px" }}
              ></Input.TextArea>
            </Form.Item>
          </div>
        </Form>
        <Button className={styles.ButtonContinue} onClick={() => setNext(true)}>
          <span style={{ color: "#4C5BD4" }}>
            <strong
              style={{ marginRight: "5px" }}
              className={styles.buttonThietLap}
            >
              Thiết lập công thức
            </strong>
            <Image src="/right-arrow.svg" alt="" width={17.4} height={13} />
          </span>
        </Button>
        {ModalCongThuc(next, setNext, form, null, open)}
        <div className={styles.hasButton}>
          <Button className={styles.Button} onClick={handleSubmit}>
            <p className={styles.txt} style={{ color: "#FFF" }}>
              Lưu
            </p>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
