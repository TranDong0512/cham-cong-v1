import { Card, Tabs } from "antd";
import styles from "./index.module.css";
import { AddButton } from "@/components/commons/Buttons";
import { AllNhanVien } from "@/components/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/all/AllNhanVien";
import { useState } from "react";
// import { AddNewEmpModal } from "@/components/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/modal/modal";
import { NhanVienChoDuyet } from "@/components/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/cho-duyet/NhanVienChoDuyet";
import { useRouter } from "next/router";
import {
  POST,
  POST_SS,
  getCompIdSS,
  getCurrentToken,
} from "@/pages/api/BaseApi";
import { useEffect } from "react";

export default function CaiDatThemNhanVienMoiPage({
  listStaffs,
  infoCom,
  listTeams,
  listDepartments,
  listGroups,
  listAllPending,
}) {
  const temp = getCurrentToken();
  const [openAddNew, setOpenAddNew] = useState(false);
  const [data, setData] = useState(listStaffs?.items);
  const [activeKey, setActiveKey] = useState("1");
  const [pendingList, setPendingList] = useState(
    listAllPending?.result ? listAllPending?.items : []
  );

  const [comLabel, setComLabel]: any = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  });

  const router = useRouter();
  const LIST_TABS = [
    {
      key: "1",
      label: ` Toàn bộ nhân viên (${data?.length || 0})`,
      children: (
        <AllNhanVien
          // listStaffs={data}
          openAddNew={openAddNew}
          setOpenAddNew={setOpenAddNew}
          infoCom={infoCom}
        />
      ),
    },
    {
      key: "2",
      label: `Nhân viên chờ duyệt (${pendingList?.length || 0})`,
      children: (
        <NhanVienChoDuyet listStaffs={pendingList} comLabel={comLabel} />
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Tabs
          defaultActiveKey={router.query.key?.toString()}
          items={LIST_TABS}
          onChange={(activeKey: string) => setActiveKey(activeKey)}
          // tabBarExtraContent={
          //   activeKey === '1' && (
          //     <div className={styles.extraBTn}>
          //       {AddButton('Thêm mới nhân viên', () => setOpenAddNew(true))}
          //     </div>
          //   )
          // }
        />
      </Card>
      {/* {AddNewEmpModal(openAddNew, setOpenAddNew)} */}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);

  const res = await Promise.all([
    await POST_SS(
      "api/qlc/managerUser/listAllFilter",
      {
        com_id: com_id,
      },
      context
    ),
    await POST_SS("api/qlc/company/info", {}, context),
    await POST_SS("api/qlc/managerUser/listAllPending", {}, context),
  ]);

  return {
    props: {
      listStaffs: res?.[0],
      infoCom: res?.[0],
      listAllPending: res?.[1],
    },
  };
};
