import { Card, Col, Form, Rate, Row } from "antd";
import styles from "./[id].module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UpdateAttendantInfoModal } from "@/components/danh-sach-ung-vien/thong-tin-ung-vien/modal/modal";
import { BackButton } from "@/components/bodyFrameNs/bread-crump/BreadCrump";
import { useRouter } from "next/router";
import { POST_HR, POST_SS, POST_SS_HR, getCompIdSS } from "@/pages/api/BaseApi";
import dayjs from "dayjs";
import _ from "lodash";

export default function ChiTietUngVien({ listEmp, data }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [detailsCan, setDetailsCan]: any = useState({
    ...data?.data?.[0],
    timeSendCv: dayjs(data?.data?.[0]?.createdAt).format("YYYY-MM-DD HH:mm A"),
  });
  const [starVote, setStarVote]: any = useState(data?.data?.[0]?.starVote);
  const [listEmpLabel, setListEmpLabel]: any = useState(
    listEmp?.items?.map((emp) => ({ label: emp?.userName, value: emp?.idQLC }))
  );

  const router = useRouter();

  const headerText = (title: string) => (
    <p className={styles.headerTxt}>{title}</p>
  );


  const item = (title: string, data: string) => (
    <p style={{ marginBottom: "10px" }}>
      {title}: {data}
    </p>
  );

  const rating = (title: string, rating: number) => (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <p style={{ marginRight: "30px" }}>{title}: </p>
      <Rate
        value={rating}
        onChange={(e) => setStarVote(e)}
        // disabled
        style={{ display: "flex", alignItems: "center" }}
      />
    </div>
  );

  const ratingRow = (title: string, rating: number, index?: number) => (
    <Row
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      key={index && index}
    >
      <Col span={12}>
        <p style={{ marginRight: "10px" }}>{title}: </p>
      </Col>
      <Col span={12}>
        <Rate
          defaultValue={rating}
          // disabled
          style={{ display: "flex", alignItems: "center" }}
        />
      </Col>
    </Row>
  );

  return (
    <>
      <div className={styles.btnBack} onClick={() => router.back()}>
        <Image alt="/" src={"/left-arrow.png"} width={17} height={13} />
        <p className={styles.txt}>Danh sách ứng viên</p>
      </div>
      <Row gutter={{ sm: 20, xs: 0 }} className={styles.main}>
        <Col md={12} sm={24}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <p className={styles.txt}>
                Chi tiết hồ sơ ứng viên {detailsCan?.name}
              </p>
              <Image
                onClick={() => setOpenEdit(true)}
                alt="/"
                src={"/edit-w.png"}
                width={30}
                height={30}
                className={styles.img}
              />
            </div>
            <div>
              <div className={styles.sectionWrapper}>
                {headerText("Thông tin ứng viên")}
                {item("Mã ứng viên", detailsCan?.id)}
                {item("Tên ứng viên", detailsCan?.name)}
                {item("Email", detailsCan?.email)}
                {item("Số điện thoại", detailsCan?.phone)}
                {item("Giới tính", detailsCan?.gender)}
                {item("Ngày sinh", detailsCan?.birthday?.substring(0, 10))}
                {item("Quê quán", detailsCan?.hometown)}
                {item("Trình độ học vấn", detailsCan?.education)}
                {item("Trường đại học", detailsCan?.school)}
                {item("Kinh nghiệm làm việc", detailsCan?.exp)}
                {item("Tình trạng hôn nhân", detailsCan?.isMarried)}
                {item("Địa chỉ", detailsCan?.address)}
              </div>
              <div className={styles.middleWrapper}>
                <div className={styles.sectionWrapper}>
                  {headerText("Thông tin tuyển dụng")}
                  {item("Nguồn ứng viên", detailsCan?.cvFrom)}
                  {item("Vị trí ứng tuyển", detailsCan?.Title)}
                  {item("Nhân viên tuyển dụng", detailsCan?.userHiring)}
                </div>
              </div>
              <div className={styles.sectionWrapper}>
                {headerText("Quá trình tuyển dụng")}
                {item("Thời gian nhận hồ sơ", detailsCan?.timeSendCv)}
                {item("Giai đoạn chuyển", "Nhận hồ sơ")}
                {item("Nhân viên tuyển dụng", detailsCan?.NvTuyenDung)}
                {rating("Đánh giá hồ sơ", starVote)}
                <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                  {detailsCan?.listSkill?.length > 0 &&
                    detailsCan?.listSkill?.map((skill, index) => {
                      return ratingRow(
                        skill?.skillName,
                        skill?.skillVote,
                        index
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={12} sm={24} style={{ width: "100%" }}>
          <Image
            className={styles.imgcv}
            alt="/"
            src={detailsCan?.cv ? `/${detailsCan?.cv}` : "/cv.png"}
            width={0}
            height={0}
            sizes="100vh"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              marginTop: "-5px",
            }}
          />
        </Col>
      </Row>

      <UpdateAttendantInfoModal
        data={detailsCan}
        open={openEdit}
        setData={setDetailsCan}
        setOpen={setOpenEdit}
        listEmpLabel={listEmpLabel}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);

  let canId = context?.query?.id || null;

  const data = await POST_SS_HR("api/hr/recruitment/listCandi", {
    canId: Number(canId),
  }, context);
  // .then((res) => {
  //   if (res?.result === true) {
  //     setStarVote(res?.data?.[0]?.starVote);

  // setDetailsCan({
  //   ...res?.data?.[0],
  //   timeSendCv: dayjs(res?.data?.[0]?.createdAt).format("YYYY-MM-DD HH:mm A"),
  // });
  //   }
  // })

  const listEmp = await POST_SS(
    "api/qlc/managerUser/list",
    {
      com_id: com_id,
    },
    context
  );

  return {
    props: {
      listEmp,
      data,
    },
  };
};
