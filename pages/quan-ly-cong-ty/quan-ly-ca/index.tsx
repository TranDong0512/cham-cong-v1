import { Button, Card, Col, Row, Select } from "antd";
import styles from "./index.module.css";
import Image from "next/image";
import {
  AddCaModal,
  ConfirmDeleteShiftModal,
  TYPE_ADD,
  TYPE_UPDATE,
} from "@/components/quan-ly-cong-ty/quan-ly-ca/modal";
import { useState } from "react";
import { MySelect } from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import { useRouter } from "next/router";
import { DELETE, GET, POST } from "@/pages/api/BaseApi";
import { useEffect } from "react";
import { PAGE_DOMAIN } from "@/components/bodyFrameNs/bodyFrame";

export default function QuanLyCaLamViecPage() {
  const router = useRouter();

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [listShifts, setListShifts] = useState<any>([]);
  const [filterList, setFilterList] = useState([]);
  const [shiftIdSelected, setShiftIdSelected] = useState(0);
  const [company, setCompany]: any = useState({});
  // console.log(shiftIdSelected)

  useEffect(() => {
    GET("api/qlc/shift/list")
      .then((res) => {
        // console.log(res);
        setListShifts(res?.items);
        setFilterList(res?.items);
      })
      .catch((err) => console.error(err));
    POST("api/qlc/company/info", {}).then((res) => {
      if (res?.result === true) {
        setCompany({ value: res?.data?.com_id, label: res?.data?.com_name });
      }
    });
  }, []);

  const handleSubmitDelete = () => {
    if (shiftIdSelected) {
      // console.log(shiftIdSelected);
      // expected: delete by shif_id | reality: delete all
      POST(`api/qlc/shift/delete`, { shift_id: shiftIdSelected })
        .then((res) => {
          if (res?.result === true) {
            alert(res.message);
            setListShifts(
              listShifts.filter((item) => item.shift_id !== shiftIdSelected)
            );
            router.reload();
            setIsOpenDel(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const SingleItem = ({
    name,
    from,
    to,
    shift_id,
  }: {
    name: string;
    from: string;
    to: string;
    shift_id: number;
  }) => {
    const [hover, setHover] = useState(false);

    const FunctionalBtn = ({
      img,
      title,
      onclick,
    }: {
      img: string;
      title: string;
      onclick: () => void;
    }) => (
      <div style={{ display: "flex" }} onClick={onclick}>
        <Image alt="/" src={img} width={24} height={24} />
        <p style={{ marginLeft: "10px", color: "#fff" }}>{title}</p>
      </div>
    );

    return (
      <Col
        className={styles.itemWrapper}
        style={{ display: "flex", flexDirection: "column" }}
        // onClick={() => setIsOpenUpdate(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!hover ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.caNameWrapper}>
              <p className={styles.nameText}>{name}</p>
            </div>
            <div>
              <p className={styles.timeText}>
                {from} - {to}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.functionGroupWrapper}>
            <div className={styles.functionGroup}>
              <div style={{ marginRight: "20px" }}>
                <FunctionalBtn
                  img="/edit-w.png"
                  title="Sửa"
                  onclick={() => {
                    setShiftIdSelected(shift_id);
                    setIsOpenUpdate(true);
                  }}
                />
              </div>
              <FunctionalBtn
                img="/trash-w.png"
                title="Xóa"
                onclick={() => {
                  setShiftIdSelected(shift_id);
                  setIsOpenDel(true);
                }}
              />
            </div>
          </div>
        )}
      </Col>
    );
  };

  return (
    <div className={styles.main}>
      <Card>
        <div className={styles.topSection}>
          <p className={styles.headerText}>Quản lý ca làm việc</p>
          <Button
            type="primary"
            className={styles.btn}
            onClick={() => router.push(`/cham-cong/cai-dat-lich-lam-viec`)}
          >
            <p className={styles.btnText}>Lịch làm việc</p>
          </Button>
        </div>
        {/* <div className={styles.selectSection}>
          {MySelect(
            '',
            'Chọn công ty',
            false,
            false,
            'com_id',
            [company],
            company?.value
          )}
        </div> */}
        <div className={styles.selectSection}>
          <Select
            size="large"
            placeholder="Tìm theo tên ca làm việc"
            style={{
              border: "1px solid #ACACAC",
              borderRadius: "10px",
              width: "100%",
            }}
            showSearch
            optionFilterProp="label"
            options={listShifts?.map((item) => ({
              label: item?.shift_name,
              value: item?.shift_id,
            }))}
            allowClear
            onChange={(v) =>
              setFilterList(
                v
                  ? listShifts?.filter((item) => v === item?.shift_id)
                  : listShifts
              )
            }
          />
        </div>
        <Row className={styles.listCaWrapper} gutter={0}>
          <Col
            className={styles.addCaBTn}
            onClick={() => {
              setShiftIdSelected(0);
              setIsOpenAdd(true);
            }}
          >
            <Image alt="/" src={"/plus.png"} width={60} height={60} />
            <p className={styles.addText}>Thêm ca</p>
          </Col>
          {filterList?.map((item, indx) => (
            <SingleItem
              key={indx}
              name={item?.shift_name}
              from={item?.start_time}
              to={item?.end_time}
              shift_id={item?.shift_id}
            />
          ))}
        </Row>
        {AddCaModal(
          isOpenAdd,
          setIsOpenAdd,
          TYPE_ADD,
          listShifts,
          setListShifts
        )}
        {AddCaModal(
          isOpenUpdate,
          setIsOpenUpdate,
          TYPE_UPDATE,
          listShifts,
          setListShifts,
          listShifts &&
            listShifts.find((shift) => shift.shift_id === shiftIdSelected)
        )}
        {ConfirmDeleteShiftModal(isOpenDel, setIsOpenDel, handleSubmitDelete)}
      </Card>
    </div>
  );
}
