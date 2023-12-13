import React, { useEffect, createContext, useState } from "react";
import instance from "@/components/hooks/axios.config";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import Constant, { organizeDetail } from "../../../constant/constant";

import dynamic from "next/dynamic";
const DiagramNoSSR = dynamic(() => import("../diagram/index"), {
  ssr: false,
});

export default function TreeNodeContent() {
  const isLoad = useSelector((state: RootState) => state.setup.update);
  const [data, setData] = useState<{ name: string; children: [] }>({
    name: "",
    children: [],
  });
  useEffect(() => {
    const fetch = async () => {
      return await instance.post(organizeDetail.list);
    };
    const unFollow = async () => {
      try {
        const data = await fetch();
        setData(data?.data?.data?.data);
      } catch (err) {
        alert("Error: " + err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad]);
  return (
    <>
      {data?.name ? (
        <div>
          <DiagramNoSSR />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
