import { Card, Tabs, TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import { Wifi } from "@/components/cham-cong/bao-mat/wifi/wifi";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GioiHanIP } from "@/components/cham-cong/bao-mat/gioi-han-ip/gioi-han-ip";
import Head from "next/head";
import { POST, POST_SS, getCompIdSS } from "@/pages/api/BaseApi";
import { useState } from "react";
import CauHinh from "@/components/cham-cong/bao-mat/cam-xuc";
import ChiTiet from "@/components/cham-cong/bao-mat/chi-tiet/chitiet";
import SetupQR from "@/components/setupQr";
import ChamCongQR from "@/components/cham-cong-bang-QR/index";

import Notification from "@/components/cham-cong/bao-mat/notification";
export default function InstallSecurityPage({ listWifi, listIps, listEmps }) {
  // const { setHasBanner } = useContext(HasBannerContext)
  // setHasBanner(true)
  const router = useRouter();
  const [wifiList, setWifiList] = useState(listWifi);
  const [ipList, setIpList] = useState(listIps);

  const tabItems = [
    {
      key: "1",
      label: "Wifi",
      children: <Wifi />,
    },
    {
      key: "2",
      label: "QR",
      children: <SetupQR />,
    },
    {
      key: "3",
      label: "Vị trí",
      children: <div></div>,
    },
    // {
    //   key: '3',
    //   label: 'IP',
    //   children: <GioiHanIP listIps={ipList} router={router} />,
    // },
    {
      key: "4",
      label: "Chi tiết",
      children: (
        <ChiTiet listIPs={listIps} listWifis={listWifi} listEmps={listEmps} />
      ),
    },
    {
      key: "5",
      label: "Cảm xúc",
      children: <CauHinh />,
    },

    {
      key: "6",
      label: "Chấm công QR",
      children: <ChamCongQR />,
    },
    {
      key: "7",
      label: "Thông báo chấm công",
      children: <Notification />,
    },
  ];

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: "#fff" }} />
    </StickyBox>
  );

  const onChange = (key: string) => {
    if (key === "3") {
      router.push(`/cai-dat-vi-tri`);
    }
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
  let listWifi = [];
  let listIps = [];
  let listEmps = [];

  let com_id = undefined;
  com_id = getCompIdSS(context);
  console.log("");
  const [resWifi, resIp, resEmp] = await Promise.all([
    await POST_SS("api/qlc/TrackingWifi/list", {}, context),
    await POST_SS("api/qlc/Setip/get", {}, context),
    await POST_SS(
      "api/qlc/Employee/listEmpSimpleNoToken",
      { com_id: com_id },
      context
    ),
  ]);

  if (resWifi?.result) {
    listWifi = resWifi?.items;
  }
  if (resIp?.result) {
    listIps = resIp?.data;
  }

  if (resEmp?.result) {
    listEmps = resEmp?.list;
  }
  return {
    props: {
      listWifi: listWifi,
      listIps: listIps,
      listEmps: listEmps,
    },
  };
};
