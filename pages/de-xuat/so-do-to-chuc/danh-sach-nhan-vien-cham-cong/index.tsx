import { POST_SS, getCompIdSS } from "@/pages/api/BaseApi";
import styles from "./index.module.css";
import { DanhSachNhanVienTable, DanhSachNhanVienTimedTable } from "@/components/de-xuat/so-do-to-chuc/table/Table";

export default function DanhSachNhanVienChamCong({
  //  listEmUntimed, type 
  listEmUntimed,
  listDepartments,
  listTeams,
  listGroups,
  type,
  id,
  }) {
  return (
    <div>
      {/* <DanhSachNhanVienTimedTable type={type} listEmUntimed={listEmUntimed?.listUser} dataTimeSheet={listEmUntimed?.dataTimeSheet} /> */}
      <DanhSachNhanVienTable
        id={id}
        type={type}
        listEmUntimed={listEmUntimed?.listEmployee}
        listDepartments={listDepartments}
        listTeams={listTeams}
        listGroups={listGroups}
        />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  // const type = context?.query?.type || null

  // const listEmUntimed = await POST_SS(
  //   "api/qlc/timekeeping/com/success",
  //   {
  //     com_id: 3312,
  //     inputOld: "2023-02-28T00:00:00.000+07:00",
  //     inputNew: "2023-04-01T00:00:00.000+07:00",
  //   },
  //   context
  // );

  const type = context?.query?.type || null;
  const id = context?.query?.id || null;
  let com_id = null;
  com_id = getCompIdSS(context);

  const listEmUntimed = await POST_SS(
    "api/hr/organizationalStructure/listEmUntimed",
    {
      type_timekeep: 1,
    },
    context,
    "hr"
  );

  const listTeams = await POST_SS(
    "api/qlc/team/list",
    {
      com_id: com_id,
    },
    context
  );

  const listDepartments = await POST_SS(
    "api/qlc/department/list",
    {
      com_id: com_id,
    },
    context
  );

  const listGroups = await POST_SS(
    "api/qlc/group/search",
    {
      com_id: com_id,
    },
    context
  );

  return {
    props: {
      listEmUntimed,
      listDepartments,
      listTeams,
      listGroups,
      type,
      id,
    },
  };
};
