import React, { useEffect } from "react";
import styles from "./index.module.css";
import { NhapLuongCoBan } from "@/components/cai-dat-luong/nhap-luong-co-ban/nhap-luong-co-ban";
import {
  POST,
  POST_SS,
  POST_SS_TL,
  POST_TL,
  getCompIdCS,
  getCompIdSS,
} from "@/pages/api/BaseApi";
import _ from "lodash";
import moment from "moment";
export default function CaiDatNhapLuongCoBan({
  data,
  listPb,
  listIds,
  temp,
  total,
}) {
  return (
    <div>
      <NhapLuongCoBan
      // initData={data}
      // listPb={listPb}
      // listIds={listIds}
      // total={total}
      />
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   let com_id = null
//   com_id = getCompIdSS(context)
//   const currentTime = moment().format('YYYY-MM-DD')
//   const currentMonth = moment().month() + 1

//   const formatedMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth

//   const nextMonth = moment().add(1, 'months').month() + 1
//   const formatedNextMonth = nextMonth >= 10 ? nextMonth : '0' + nextMonth
//   const finalData: any[] = []

//   const resp = await Promise.all([
//     POST_SS_TL(
//       'api/tinhluong/congty/show_bangluong_nv',
//       {
//         com_id: com_id,
//         month: currentMonth,
//         year: moment().year(),
//         start_date: `${moment().year()}/${formatedMonth}/01`,
//         end_date: `${moment().year()}/${formatedNextMonth}/01`,
//         // start_date: `2023/10/01`,
//         // end_date: `2023/11/01`,
//         skip: 0,
//       },
//       context
//     ),
//     POST_SS('api/qlc/department/list', { com_id: com_id }, context),
//   ])

//   const res = resp?.[0]
//   const listPbRes = resp?.[1]

//   if (res) {
//     res?.listUser?.forEach((item, index) => {
//       const foundData = res?.listResult?.find((r) => r?.ep_id === item?.idQLC)
//       let lla = {}
//       if (!foundData) {
//         lla = res?.list_luong_am?.find((r) => r?.ep_id === item?.idQLC)
//       }

//       finalData.push({
//         ...item,
//         ...foundData,
//         ...lla,
//       })
//     })
//   }

//   // get list phong ban

//   return {
//     props: {
//       data: finalData,
//       listPb: listPbRes?.items || [],
//       temp: res,
//       total: res?.luong_tong_cong_ty,
//     },
//   }
// }
