import React, { useEffect, createContext, useState } from "react";
import instance from "@/components/hooks/axios.config";
import dynamic from "next/dynamic";
import ModalAddNewPosition from "./Modal/them-moi-vi-tri";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import Constant from "../../constant/constant";
import checkRoleAdmin from "@/components/check-role";
const Organizational = dynamic(() => import("./TreeNodeRender"), {
  ssr: false,
});
export const DiagramContext = createContext({});

export default function ThietLapViTri() {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };
  const [data, setData] = useState<any>({});
  const isLoad = useSelector((state: RootState) => state.setup.update);
  const [isNew, setIsNew] = useState(false);
  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetch = async () => {
          return await instance.post(Constant.positions_list);
        };
        const data = await fetch();
        let list = data?.data?.data?.data;
        if (list.children.length > 0) {
          setIsNew(true);
        }
        setData(list);
      } catch (err) {
        alert("Error: " + err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad]);
  const isAdmin = checkRoleAdmin();
  return (
    <div id="ThietLapCtPb" className="mb-24">
      <div className="flex flex-space-between">
        {isAdmin ? (
          <div
            style={{
              backgroundColor: "#4c5bd4",
            }}
            onClick={() => setOpenModalAdd(true)}
            className="w-120px mb-16  font-size-16 text-align-center p-10 border-radius-4 color-white cursor-pointer"
          >
            Thêm vị trí
          </div>
        ) : (
          <></>
        )}
      </div>
      <ModalAddNewPosition
        isNew={isNew}
        open={openModalAdd}
        close={handleCloseModalAdd}
      />
      <DiagramContext.Provider value={data}>
        <Organizational />
      </DiagramContext.Provider>
    </div>
  );
}
