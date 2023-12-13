import ThemCoCau from "./modal/them-co-cau";
import React, { useEffect, createContext, useState } from "react";
import instance from "@/components/hooks/axios.config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { PlusOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import Alert from "./alert";
import { Button, Drawer } from "antd";
import { useDispatch } from "react-redux";
import { openModalAdd } from "../reducer/reducer";
import ThemCoCauCaoNhat from "./alert/them-co-cau";
import checkRoleAdmin from "@/components/check-role";
import { setOpenDrawer } from "@/redux/reducer/thiet_lap_cong_ty";
import { setTabsPosition } from "@/redux/reducer/white-list";
import ThongTinCongTy from "../Drawer/congty/modal-thong-tin-cong-ty-chi-tiet";
import ThongTinPhongBan from "../Drawer/modal-thong-tin-pb";
import ThongTinNhanVien from "../Drawer/nhan-vien/modal-thong-tin-nv";
import styles from "../../../stylesTabs/styles.module.scss";
const DiagramNoSSR = dynamic(() => import("./diagram/index"), {
  ssr: false,
});

export default function ThietLapCoCauToChuc() {
  const [openModalAddNewRank, setOpenModalAddNewRank] = useState(false);
  const handleCloseModalAddNewRank = () => {
    setOpenModalAddNewRank(false);
  };
  const isLoad = useSelector((state: RootState) => state.diagram.updateDiagram);

  const dispatch = useDispatch();
  const openAlert = useSelector((state: RootState) => state.tlct.openModalAdd);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      return await instance.post("api/qlc/organizeDetail/check");
    };
    const unFollow = async () => {
      try {
        const data = await fetch();
        setCheck(true);
      } catch (err) {
        dispatch(openModalAdd(true));
        setCheck(false);
      }
    };
    unFollow();
  }, [isLoad]);

  const onCloseAlert = () => {
    dispatch(openModalAdd(false));
  };
  const isAdmin = checkRoleAdmin();

  const openModalCompany = useSelector(
    (state: RootState) => state.setup.openModalCompany
  );
  const openModalDrawer = useSelector(
    (state: RootState) => state.setup.openDrawer
  );
  const openModalDepartment = useSelector(
    (state: RootState) => state.setup.openModalDepartment
  );
  const openModalUser = useSelector(
    (state: RootState) => state.setup.openModalUser
  );
  const onClose = () => {
    dispatch(setOpenDrawer(!openModalDrawer));
  };
  const activeTabs = useSelector(
    (state: RootState) => state.white_list.tabsPosition
  );

  return (
    <div>
      <div id="ThietLapCtPb" style={{ marginTop: 12 }}>
        <div className="flex mb-24 flex-space-between">
          {isAdmin ? (
            <Button
              size="large"
              type="primary"
              onClick={() => {
                if (check) {
                  setOpenModalAddNewRank(true);
                } else dispatch(openModalAdd(true));
              }}

            >
              <span style={{ color: 'white' }}><PlusOutlined rev={"xxx"}/> Thêm cơ cấu</span>
            </Button>
          ) : (
            <></>
          )}
        </div>
        {openModalAddNewRank && (
          <ThemCoCau
            open={openModalAddNewRank}
            close={handleCloseModalAddNewRank}
          />
        )}

        {check ? <DiagramNoSSR /> : <></>}
        <Alert open={openAlert} onClose={onCloseAlert} />
        <ThemCoCauCaoNhat />
        <Drawer
          closeIcon={false}
          placement="right"
          onClose={onClose}
          width={600}
          open={openModalDrawer}
          style={{ marginTop: '52px'}}
        >
          {openModalCompany ? <ThongTinCongTy /> : <></>}
          {openModalDepartment ? <ThongTinPhongBan /> : <></>}
          {openModalUser ? <ThongTinNhanVien /> : <></>}
        </Drawer>
      </div>
    </div>
  );
}
