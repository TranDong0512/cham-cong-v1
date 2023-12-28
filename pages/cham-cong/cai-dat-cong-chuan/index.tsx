import CongchuanCty from "@/components/cham-cong/cong-chuan/cong-ty";
import CongchuanNhanVien from "@/components/cham-cong/cong-chuan/nhan-vien";
import { POST_SS } from "@/pages/api/BaseApi";
import { Card, Tabs, TabsProps } from "antd";
import moment from "moment";
import { useState } from "react";
import StickyBox from "react-sticky-box";

export default function InstallSecurityPage({ listCompanyWorkdays }) {
  const [keyChildren, setKeyChildren] = useState("1");

  const tabItems = [
    {
      key: "1",
      label: "Công ty",
      children: <CongchuanCty listCompanyWorkdays={listCompanyWorkdays} />,
    },
    {
      key: "2",
      label: "Nhân viên",
      children: <CongchuanNhanVien />,
    },
  ];

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: "#fff" }} />
    </StickyBox>
  );

  const onChange = (key: string) => {
    setKeyChildren(key);
    return true;
  };

  return (
    <>
      <Card style={{ marginBottom: 42 }}>
        <Tabs
          items={tabItems}
          renderTabBar={renderTabBar}
          onChange={onChange}
        />
      </Card>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const listCompanyWorkdays = await POST_SS(
    "api/qlc/companyworkday/detail",
    {
      month: moment().month() + 1,
      year: moment().year(),
    },
    context
  );

  return {
    props: {
      listCompanyWorkdays,
    },
  };
};
