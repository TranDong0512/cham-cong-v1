import React, { useEffect, useState } from "react";
import { Button, Card, Tabs } from "antd";
import styles from "./index.module.css";
import { DanhSachPhuCap } from "@/components/cai-dat-luong/cai-dat-phu-cap-khac/danh-sach-phu-cap/danh-sach-phu-cap";
import { PhuCapTheoCa } from "@/components/cai-dat-luong/cai-dat-phu-cap-khac/phu-cap-theo-ca/phu-cap-theo-ca";
import { GET_SS, POST_SS, POST_SS_TL, getCompIdSS } from "@/pages/api/BaseApi";
import Cookies from "js-cookie";

export default function CaiDatThue(
  {
    // listPhuCap,
    // listPhuCapTheoCa,
    // listPhongBan,
    // listNhanVien,
    // listEmpX,
    // listShift,
  }
) {
  let com_id = Cookies.get("com_id");
  let currentToken = Cookies.get("token_base365");
  const [listPhuCap, setListPhuCap] = useState<any>();
  const [listPhuCapTheoCa, setListPhuCapTheoCa] = useState<any>();
  const [listPhongBan, setListPhongBan] = useState<any>();
  const [listNhanVien, setListNhanVien] = useState<any>();
  const [listEmpX, setListEmpX] = useState<any>();
  const [listShift, setListShift] = useState<any>();

  let context = {
    req: {
      cookies: {
        token_base365: currentToken,
      },
    },
  };
  useEffect(() => {
    try {
      const fetchData = async () => {
        const listRes = await Promise.all([
          await POST_SS_TL(
            "api/tinhluong/congty/take_phuc_loi",
            {
              companyId: com_id,
            },
            context
          ),
          POST_SS("api/qlc/department/list", { com_id: com_id }, context),
          POST_SS_TL(
            "api/tinhluong/congty/list_em",
            {
              com_id: com_id,
            },
            context
          ),
          POST_SS(
            "api/qlc/managerUser/list",
            {
              com_id: com_id,
            },
            context
          ),
          GET_SS("api/qlc/shift/list", context),
        ]);

        setListPhuCap(listRes?.[0]?.data?.list_welfa ?? []);
        setListPhuCapTheoCa(listRes?.[0]?.data?.wf_shift ?? []);
        setListEmpX(listRes?.[4]);
        setListNhanVien(listRes?.[3]?.items ?? []);
        setListPhongBan(listRes?.[1]?.items);
        setListShift(listRes?.[4]?.items ?? []);
      };
      fetchData();
    } catch (error) {}
  }, []);
  return (
    <div>
      <DanhSachPhuCap
        listPhuCap={listPhuCap}
        listPhongBan={listPhongBan}
        listNhanVien={listNhanVien}
        listEmpX={listEmpX}
      />
      <PhuCapTheoCa listPhuCapTheoCa={listPhuCapTheoCa} listShift={listShift} />
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   let com_id = null;

//   com_id = getCompIdSS(context);
//   const listRes = await Promise.all([
//     await POST_SS_TL(
//       "api/tinhluong/congty/take_phuc_loi",
//       { companyId: com_id },
//       context
//     ),
//     POST_SS("api/qlc/department/list", { com_id: com_id }, context),
//     POST_SS_TL("api/tinhluong/congty/list_em", { id_com: com_id }, context),
//     POST_SS(
//       "api/qlc/managerUser/list",
//       {
//         com_id: com_id,
//       },
//       context
//     ),
//     GET_SS("api/qlc/shift/list", context),
//   ]);
//   return {
//     props: {
//       listEmpX: listRes?.[4],
//       listPhuCap: listRes?.[0]?.data?.list_welfa ?? [],
//       listPhuCapTheoCa: listRes?.[0]?.data?.wf_shift ?? [],
//       listNhanVien: listRes?.[2]?.data?.listUser ?? [],
//       listShift: listRes?.[4]?.items ?? [],
//     },
//   };
// };
