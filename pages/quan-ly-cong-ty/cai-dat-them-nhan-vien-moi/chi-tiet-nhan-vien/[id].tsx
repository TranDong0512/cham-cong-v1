import { useRouter } from "next/router";
import styles from "./index.module.css";
import { Avatar, Button, Card, Col, Row, Upload } from "antd";
import Image from "next/image";
import { POST, POST_SS } from "@/pages/api/BaseApi";
import { genderLabel, marriedLabel, renderExp } from "@/utils/function";
import moment from "moment";

export default function ChiTietNhanVien({ data }) {
  console.log("data", data);
  const router = useRouter();
  const param = router.query;
  const SingleItem = ({ title, data }: { title: string; data: string }) => {
    return (
      <div className={styles.singleItem}>
        <p className={styles.itemTitle}>{title}:</p>
        <p>{data}</p>
      </div>
    );
  };

  const onEditClicked = () => {
    // const splitted = router.pathname?.split("/")?.slice(0, -1)

    // let pathname = ""
    // splitted?.forEach(
    //   (item, index) => (pathname += index !== item?.length ? `${item}/` : item)
    // )
    router.push(
      `/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/chinh-sua-thong-tin/${param?.id}`
    );
  };
  return (
    <div className={styles.cardWrapper}>
      <Card className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.leftSection}>
            <div className={styles.avatar}>
              <Avatar
                alt="/"
                src={data?.avatarUser}
                style={{ width: 200, height: 200 }}
              />
              <Upload
                maxCount={1}
                beforeUpload={async (fileData: any) => {
                  console.log(fileData);

                  const fd = new FormData();
                  fd.append("idQLC", data?.idQLC);
                  fd.append("avatarUser", fileData);

                  const res = await POST(
                    "api/qlc/employee/updateEmpAvatar",
                    fd
                  );

                  if (res?.result) {
                    alert("Cập nhật thành công");
                    router.reload();
                  }
                }}
                showUploadList={false}
              >
                <span className={styles.editAvatar}>
                  <Image
                    src={"/editAvatar.png"}
                    alt=""
                    width={20}
                    height={20}
                  ></Image>
                </span>
              </Upload>
            </div>
            <p className={styles.id}>ID - {param?.id}</p>
          </div>
          <div className={styles.rightSection}>
            <p className={styles.name}>{data?.userName || "Chưa cập nhật"}</p>
            <p className={styles.companyName}>
              {data?.companyName?.userName || "Chưa cập nhật"}
            </p>
            <SingleItem
              data={data?.nameDeparment || "Chưa cập nhật"}
              title="Phòng ban"
            />
            <SingleItem
              data={renderExp(data?.experience)}
              title="Kinh nghiệm làm việc"
            />
            <SingleItem
              data={
                data?.start_working_time
                  ? moment.unix(data?.start_working_time).format("DD-MM-YYYY")
                  : "Chưa cập nhật"
              }
              title="Ngày bắt đầu làm việc"
            />
            <SingleItem
              data={data?.emailContact || "Chưa cập nhật"}
              title="Địa chỉ email"
            />
            <SingleItem
              data={data?.phoneTK || "Chưa cập nhật"}
              title="Số điện thoại"
            />
            <SingleItem
              data={
                data?.birthday
                  ? moment.unix(data?.birthday).format("DD-MM-YYYY")
                  : "Chưa cập nhật"
              }
              title="Ngày sinh"
            />
            <SingleItem
              data={
                genderLabel?.find((item) => item.value === data?.gender)?.label
              }
              title="Giới tính"
            />
            <SingleItem
              data={data?.address || "Chưa cập nhật"}
              title="Địa chỉ"
            />
            <SingleItem
              data={
                marriedLabel.find((item) => item.value === data?.married)?.label
              }
              title="Tình trạng hôn nhân"
            />
            <div className={styles.footer}>
              {/* <Button className={styles.btn} size='large'>
                <p className={styles.text} onClick={onEditClicked}>
                  Chỉnh sửa thông tin
                </p>
              </Button> */}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let data = {};
  const idQLC = context.query.id;
  const res = await POST_SS(
    "api/qlc/employee/info",
    {
      idQLC: idQLC,
    },
    context
  );

  if (res?.result) {
    data = res?.data;
  }

  return {
    props: {
      data: data,
    },
  };
};
