import { Card, Tabs } from "antd";
import styles from "./index.module.css";
import { DanhSachUngVien } from "@/components/danh-sach-ung-vien/DanhSachUngVien";
import { POST_HR, POST_SS, POST_SS_HR, getCompIdSS } from "@/pages/api/BaseApi";

export default function QuanLyUngVien({
  listCandidatesOnProcess,
  // listCandidates,
  listEmp
}) {
  // const LIST_TABS = [
  //   {
  //     key: "1",
  //     label: "Danh sách ứng viên",
  //     children: <DanhSachUngVien listCandidatesOnProcess={listCandidatesOnProcess} />
  //   }
  // ]
  // console.log(listCandidatesOnProcess);
  return (
    <div>
      <Card>
        <p className={styles.headerTxt}>Danh sách ứng viên</p>
        <DanhSachUngVien
          listCandidatesOnProcess={listCandidatesOnProcess}
          // listCandidates={listCandidates}
          listEmp={listEmp}
        />
      </Card>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);

  const listCandidatesOnProcess = await POST_SS_HR(
    "api/hr/recruitment/getListProcess",
    {},
    context
  );

  // const listCandidates = await POST_SS_HR(
  //   "api/hr/recruitment/listCandi",
  //   {},
  //   context
  // );

  const listEmp = await POST_SS('api/qlc/managerUser/list', {
    com_id: com_id
  }, context)

  return {
    props: {
      listCandidatesOnProcess,
      // listCandidates,
      listEmp
    },
  };
};
