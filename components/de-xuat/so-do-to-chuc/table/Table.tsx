import { MyTable } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table";
import styles from "./Table.module.css";
import { mockdataDanhSachNV } from "./mockdata";
import { Button, Collapse, Dropdown, Input, Select, Space } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { escape } from "lodash";
import { ColumnType } from "antd/es/table";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const DropdownW = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="6"
    viewBox="0 0 9 6"
    fill="none"
  >
    <path d="M4.66987 6L0.339745 0L9 0L4.66987 6Z" fill="white" />
  </svg>
);

export function tableColumnTextFilterConfig<T>(
  listData: { label: any; value: any }[],
  isRendered: boolean
) {
  // const searchInputHolder: { current: Input | null } = { current: null }
  if (isRendered) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div
            style={{
              width: "180px",
              display: "block",
              padding: 0,
            }}
          >
            <Select options={listData} showSearch style={{ width: "100%" }} />
          </div>
        );
      },
      filterIcon: (filtered) => <DropdownW />,
    };
  } else {
    return;
    null;
  }
}

export const DanhSachNhanVienTable = ({
  type,
  listEmUntimed,
  listDepartments,
  listTeams,
  listGroups,
  id
}: {
  type: any;
  listEmUntimed: any;
  listDepartments: any;
  listTeams: any;
  listGroups: any;
  id: any
}) => {
  const [data, setData]: any = useState([]);
  const [listDepLabel, setListDepLabel]: any = useState(
    listDepartments?.items?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  );
  const [listTeamLabel, setTeamLabel]: any = useState(
    listTeams?.data?.map((team) => ({
      label: team?.team_name,
      value: team?.team_id,
    }))
  );
  const [listGrLabel, setListGrLabel]: any = useState(
    listGroups?.data?.map((group) => ({
      label: group?.gr_name,
      value: group?.gr_id,
    }))
  );

  useEffect(() => {
    switch (type) {
      case "company":
        setData(listEmUntimed?.filter(e => e?.com_id == id));
        break;
      case "phòng ban":
        setData(listEmUntimed?.filter((e) => e?.dep_id == id));
        break;

      case "tổ":
        setData(listEmUntimed?.filter((e) => e?.team_id == id));
        break;

      case "nhóm":
        setData(listEmUntimed?.filter((e) => e?.group_id == id));
        break;
      case "công ty con":
        setData(listEmUntimed?.filter((e) => e?.com_id == id));
        break;
      default:
        setData([]);
        break;
    }
  }, [type, listEmUntimed, id]);

  const columns = [
    {
      title: <p className={styles.headerTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>ID</p>,
      render: (record: any) => <p>{record?.idQLC}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Họ và tên</p>,
      render: (record: any) => <p>{record?.userName}</p>,
      align: "center",
    },
    {
      title: (
        <p className={styles.headerTxt}>
          {type === "company" ? "Công ty" : "Lý do"}
        </p>
      ),
      render: (record: any) => (
        <p>{type === "company" ? record?.Company : record?.ly_do_nghi ?? "Không nghỉ"}</p>
      ),
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any) => <p>{record?.dep_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        listDepLabel,
        type !== "phòng ban" && type !== "tổ" && type !== "nhóm"
      ),
    },
    {
      title: <p className={styles.headerTxt}>Tổ</p>,
      render: (record: any) => <p>{record?.team_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        listTeamLabel,
        type !== "tổ" && type !== "nhóm"
      ),
    },

    {
      title: <p className={styles.headerTxt}>Nhóm</p>,
      render: (record: any) => <p>{record?.group_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(listGrLabel, type !== "nhóm"),
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ</p>,
      render: (record: any) => <p>{record?.position_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        data?.map((item: any) => ({
          label: item?.position_id,
          value: item?.position_id,
        })),
        true
      ),
    },
    {
      title: <p className={styles.headerTxt}>Giới tính</p>,
      render: (record: any) => <p>{record?.gender}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Ngày sinh</p>,
      render: (record: any) => (
        <p>{dayjs.unix(record?.birthday).format("DD-MM-YYYY")}</p>
      ),
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Tình trạng hôn nhân</p>,
      render: (record: any) => <p>{record?.married}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        data?.map((item: any) => ({
          label: item.married,
          value: item.married,
        })),
        true
      ),
    },
    {
      title: <p className={styles.headerTxt}>Thông tin liên hệ</p>,
      render: (record: any) => (
        <p>
          {record?.phoneTK ||
            record?.phone ||
            record?.email ||
            record?.emailContact}
        </p>
      ),
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Ngày bắt đầu làm việc</p>,
      render: (record: any) => (
        <p>{dayjs.unix(record?.start_working_time).format("DD-MM-YYYY")}</p>
      ),
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Trình độ học vấn</p>,
      render: (record: any) => <p>{record?.education}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Kinh nghiệm làm việc</p>,
      render: (record: any) => <p>{record?.experience}</p>,
      align: "center",
    },
  ];

  return (
    <div className={styles.table}>
      <MyTable
        Footer={null}
        colunms={columns}
        data={data}
        hasRowSelect={false}
        onRowClick={() => null}
        onSelectChange={() => null}
        rowKey="id"
        selectedRowKeys={null}
      />
    </div>
  );
};

export const DanhSachNhanVienTimedTable = ({
  type,
  listEmUntimed,
  dataTimeSheet,
}: {
  type: any;
  listEmUntimed: any;
  dataTimeSheet: any;
}) => {
  const [data, setData]: any = useState(
    listEmUntimed?.map((emp) => {
      return {
        idQLC: emp?.idQLC,
        userName: emp?.userName,
        ly_do_nghi: "Không nghỉ",
        dep_id: emp?.inForPerson?.employee?.dep_id,
        team_id: emp?.inForPerson?.employee?.team_id,
        group_id: emp?.inForPerson?.employee?.group_id,
        gender: emp?.inForPerson?.account?.gender,
        birthday: dayjs(emp?.inForPerson?.account?.birthday).format(
          "YYYY-MM-DD"
        ),
        married: emp?.inForPerson?.account?.married,
        phoneTK: emp?.phone || emp?.phoneTK,
        start_working_time: dayjs(
          emp?.inForPerson?.employee?.start_working_time
        ).format("YYYY-MM-DD"),
        education: emp?.inForPerson?.account?.education,
        experience: emp?.inForPerson?.account?.experience,
      };
    })
  );

  const columns = [
    {
      title: <p className={styles.headerTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>ID</p>,
      render: (record: any) => <p>{record?.idQLC}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Họ và tên</p>,
      render: (record: any) => <p>{record?.userName}</p>,
      align: "center",
    },
    {
      title: (
        <p className={styles.headerTxt}>
          {type === "company" ? "Công ty" : "Lý do"}
        </p>
      ),
      render: (record: any) => (
        <p>{type === "company" ? record?.Company : record?.ly_do_nghi}</p>
      ),
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any) => <p>{record?.dep_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        data?.map((item: any) => ({
          label: item?.apartmentName,
          value: item?.apartmentName,
          key: item?.apartmentName,
        })),
        type !== "phòng ban" && type !== "tổ" && type !== "nhóm"
      ),
    },
    {
      title: <p className={styles.headerTxt}>Tổ</p>,
      render: (record: any) => <p>{record?.team_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        data?.map((item: any) => ({
          label: item?.tName,
          value: item?.tName,
          key: item?.tName,
        })),
        type !== "tổ" && type !== "nhóm"
      ),
    },

    {
      title: <p className={styles.headerTxt}>Nhóm</p>,
      render: (record: any) => <p>{record?.group_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        data?.map((item: any) => ({
          label: item?.group_id,
          value: item?.group_id,
          key: item?.group_id,
        })),
        type !== "nhóm"
      ),
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ</p>,
      render: (record: any) => <p>{record?.position_id || "Chưa cập nhật"}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        data?.map((item: any) => ({
          label: item?.position_id,
          value: item?.position_id,
          key: item?.position_id,
        })),
        true
      ),
    },
    {
      title: <p className={styles.headerTxt}>Giới tính</p>,
      render: (record: any) => <p>{record?.gender}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Ngày sinh</p>,
      render: (record: any) => <p>{record?.birthday}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Tình trạng hôn nhân</p>,
      render: (record: any) => <p>{record?.married}</p>,
      align: "center",
      width: 200,
      ...tableColumnTextFilterConfig(
        data?.map((item: any) => ({
          label: item?.married,
          value: item?.married,
          key: item?.married,
        })),
        true
      ),
    },
    {
      title: <p className={styles.headerTxt}>Thông tin liên hệ</p>,
      render: (record: any) => <p>{record?.phoneTK}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Ngày bắt đầu làm việc</p>,
      render: (record: any) => <p>{record?.start_working_time}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Trình độ học vấn</p>,
      render: (record: any) => <p>{record?.education}</p>,
      align: "center",
    },
    {
      title: <p className={styles.headerTxt}>Kinh nghiệm làm việc</p>,
      render: (record: any) => <p>{record?.experience}</p>,
      align: "center",
    },
  ];

  return (
    <div className={styles.table}>
      <MyTable
        Footer={null}
        colunms={columns}
        data={data}
        hasRowSelect={false}
        onRowClick={() => null}
        onSelectChange={() => null}
        rowKey="id"
        selectedRowKeys={null}
      />
    </div>
  );
};
