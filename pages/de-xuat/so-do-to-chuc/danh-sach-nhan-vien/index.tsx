import { POST_SS, getCompIdSS } from "@/pages/api/BaseApi";
import styles from "./index.module.css";
import { DanhSachNhanVienTable } from "@/components/de-xuat/so-do-to-chuc/table/Table";

export default function DanhSachNhanVien({
  listEmUntimed,
  listDepartments,
  listTeams,
  listGroups,
  type,
  id,
}) {
  return (
    <div>
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
  const type = context?.query?.type || null;
  const id = context?.query?.id || null;
  let com_id = null;
  com_id = getCompIdSS(context);

  const listEmUntimed = await POST_SS(
    "api/hr/organizationalStructure/listEmUntimed",
    {
      type_timekeep: 0,
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
