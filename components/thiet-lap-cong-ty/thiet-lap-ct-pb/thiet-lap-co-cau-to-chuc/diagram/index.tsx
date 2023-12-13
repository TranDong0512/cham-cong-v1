import React, { useState, useEffect } from "react";
import styles from "./Diagram.module.scss";
import { Typography, Input, Tooltip } from "antd";
import { Tree } from "react-organizational-chart";

import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { TreeNode } from "react-organizational-chart";
const { Text } = Typography;
import { useDrag, useDrop } from "react-dnd";
import PopupDelete from "@/components/modal/Delete";
import ConfigSuccessDelete from "@/components/modal/Config";
import instance from "@/components/hooks/axios.config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import {
  dataState,
  openNVDLState,
  openNVKDLState,
  sendData,
  setOpenDrawer,
} from "@/redux/reducer/thiet_lap_cong_ty";
import { organizeDetail } from "@/components/thiet-lap-cong-ty/constant/constant";
import { toast } from "react-toastify";
import { updateOrganize } from "../../reducer/reducer";
import { updateDiagram } from "@/redux/reducer/diagram";
import checkRoleAdmin from "@/components/check-role";
import ModalNVDLComponent from "../modal/modalNVDL";
import ModalNVKDLComponent from "../modal/modalNVKDL";

interface NodeType {
  id?: number | undefined;
  parentId?: number | undefined;
  level?: number | undefined;
  name?: string | undefined;
  children?: NodeType[];
  isChildren?: boolean | undefined;
  onClick?: () => void;
  ep_num?: number | undefined;
  manager?: string;
  settingOrganizeName?: string;
  nv_di_lam?: string;
  nv_nghi?: string;
  listOrganizeDetailId?: any;
}
interface DataType {
  name?: string;
  children?: NodeType[];
}
export default function Diagram() {
  const [isLoad, setIsLoad] = useState(false);
  const isAdmin = checkRoleAdmin();
  const load = useSelector((state: RootState) => state.setup.update);
  const openModalDrawer = useSelector(
    (state: RootState) => state.setup.openDrawer
  );
  const openNVDL = useSelector((state: RootState) => state.setup.openNVDLState);
  const openNVKDL = useSelector(
    (state: RootState) => state.setup.openNVKDLState
  );

  const [data, setData] = useState<DataType>({
    name: "",
    children: [],
  });
  const dispatch = useDispatch();
  const [parentId, setParentId] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      return await instance.post(organizeDetail.list);
    };
    const unFollow = async () => {
      try {
        const data = await fetch();
        setData(data?.data?.data?.data);
      } catch (err) {
        console.error(err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad, load]);

  function Node({
    name,
    level,
    parentId,
    id,
    isChildren,
    onClick,
    ep_num,
    manager,
    nv_di_lam,
    nv_nghi,
    listOrganizeDetailId,
  }: NodeType) {
    const [showBorder, setShowBorder] = useState(() => {
      if (name) {
        return false;
      } else {
        return true;
      }
    });
    const [right, setRight] = useState(false);
    const [down, setDown] = useState(true);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
    const [organizeName, setOrganizeName] = useState(name);
    const [showEdit, setShowEdit] = useState(true);
    const [showCheck, setShowCheck] = useState(false);
    const isUpdateDiagram = useSelector(
      (state: RootState) => state.diagram.updateDiagram
    );
    const handleChange = (e) => {
      setOrganizeName(e.target.value);
    };

    const handlePressEnter = async () => {
      setShowBorder(false);
      setShowEdit(true);
      setShowCheck(false);
      setOrganizeName(organizeName);
      handleUpdate();
    };
    const handleUpdate = async () => {
      try {
        const fetch = async () => {
          return await instance.post("api/qlc/organizeDetail/update", {
            id: Number(id),
            organizeDetailName: organizeName,
          });
        };
        const result = await fetch();
        if (result?.data?.data?.result) {
          setShowEdit(true);
          setShowCheck(false);
          toast("Cập nhập thành công");
          setIsLoad(!isLoad);
        }
      } catch (err) {
        toast.error("Error: " + err?.response?.data?.error?.message);
      }
    };

    const handleClickEdit = () => {
      setShowBorder(true);
      setShowEdit(false);
      setShowCheck(true);
    };

    const move = async (item, monitor) => {
      if (id !== item.id) {
        let dataSend = {
          start_id: item.id,
          end_id: id,
        };
        try {
          const fetcher = async () => {
            return await instance.post("api/qlc/organizeDetail/swap", dataSend);
          };
          let result = await fetcher();
          if (result?.data?.data?.result) {
            setIsLoad(!isLoad);
            toast("Thay đổi vị trí thành công!");
          }
        } catch (err) {
          toast.error("Thay đổi vị trí thất bại!");
        }
      }
    };

    const handleCloseModalDelete = () => {
      setOpenModalDelete(false);
    };
    const updateDelete = useSelector(
      (state: RootState) => state.tlct.updateOrganize
    );
    const onOk = async (id) => {
      try {
        const fetch = async () => {
          return await instance.post(organizeDetail.delete, {
            id: Number(id),
          });
        };
        const result = await fetch();
        if (result?.data?.data?.result) {
          setOpenModalDelete(false);
          setIsLoad(!isLoad);
          toast("Xoá thành công");
          dispatch(updateOrganize(!updateDelete));
          dispatch(updateDiagram(!isUpdateDiagram));
        }
      } catch (err) {
        toast.error("Xoá thất bại công");
      }
    };
    const handleCloseConfig = () => {
      setOpenConfig(false);
    };
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "any",
      item: { id, level, parentId },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "any",
      drop: (item, monitor) => move(item, monitor),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));
    return (
      <div ref={drop}>
        <div
          className={styles.wrapper}
          ref={drag}
          style={{
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            border: "0.5px solid #cccccc",
            backgroundColor: isDragging ? "#ccc" : "transparent",
          }}
        >
          <div className=" h-30px ">
            {isAdmin ? (
              <div className="flex flex-end mb-8">
                {showEdit && level !== 0 ? (
                  <Tooltip title="Sửa">
                    <div
                      className={styles.iconTopOutline}
                      onClick={handleClickEdit}
                    >
                      <EditOutlined rev={"xx"} />
                    </div>
                  </Tooltip>
                ) : (
                  <></>
                )}
                {level !== 0 ? (
                  <Tooltip title="Xoá">
                    <div className={styles.iconTopOutline}>
                      <CloseOutlined
                        rev={"xxx"}
                        onClick={() => {
                          setOpenModalDelete(true);
                        }}
                      />
                    </div>
                  </Tooltip>
                ) : (
                  <></>
                )}
                <PopupDelete
                  open={openModalDelete}
                  close={handleCloseModalDelete}
                  onOK={() => onOk(id)}
                  user={organizeName}
                  company="Sơ đồ cơ cấu"
                />
                <ConfigSuccessDelete
                  open={openConfig}
                  close={handleCloseConfig}
                />
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="flex flex-center px-10  ">
            {!showEdit ? (
              <Tooltip title={organizeName}>
                <Input
                  placeholder="Nhập tên"
                  style={{
                    textAlign: "center",
                    color: "#000",
                    minWidth: "0",
                  }}
                  size="large"
                  value={organizeName}
                  onChange={handleChange}
                  onPressEnter={handlePressEnter}
                />
              </Tooltip>
            ) : (
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px dashed #ccc",
                  minWidth: "80%",
                }}
              >
                <Text>{organizeName}</Text>
              </div>
            )}

            {!showEdit ? (
              <CheckOutlined
                style={{
                  marginLeft: "8px",
                }}
                rev={"xxx"}
                onClick={handlePressEnter}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="mt-8">
            {level !== 0 ? (
              <div>
                <div style={{ marginBottom: 4 }}>
                  <Text>Lãnh đạo: {manager ? manager : "Chưa cập nhập"}</Text>
                </div>
                <div style={{ marginBottom: 4 }}>
                  <Text>Thành viên: {ep_num ? ep_num : "Chưa cập nhập"}</Text>
                </div>
                <div
                  style={{ marginBottom: 4 }}
                  onClick={() => {
                    dispatch(openNVDLState(true));
                    dispatch(dataState(listOrganizeDetailId));
                  }}
                >
                  <Text
                    style={{
                      borderBottom: "1px solid ",
                      cursor: "pointer",
                      color: "#616fe0",
                    }}
                  >
                    Nhân viên đi làm: {nv_di_lam ? nv_di_lam : "0"}
                  </Text>
                </div>
                <div
                  style={{ marginBottom: 4 }}
                  onClick={() => {
                    dispatch(openNVKDLState(true));
                    dispatch(dataState(listOrganizeDetailId));
                  }}
                >
                  <Text
                    style={{
                      borderBottom: "1px solid ",
                      cursor: "pointer",
                      color: "#616fe0",
                    }}
                  >
                    Nhân viên không đi làm: {nv_nghi ? nv_nghi : "0"}
                  </Text>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.plus_bottom_wrapper}>
            {level !== 0 ? (
              <div
                onClick={() => {
                  dispatch(setOpenDrawer(!openModalDrawer));
                  dispatch(sendData(id));
                }}
                className="font-size-12"
              >
                <Text
                  style={{
                    color: "#4d5cd4",
                  }}
                >
                  Xem chi tiết: <ArrowRightOutlined rev={"xxx"} />
                </Text>
              </div>
            ) : (
              <></>
            )}

            <div className="flex flex-end h-32px mr-8">
              {isChildren && level !== 0 ? (
                <>
                  {right ? (
                    <div
                      className={styles.iconBottomOutline}
                      onClick={() => {
                        if (level !== 0) {
                          setDown(!down);
                          setRight(!right);
                          onClick();
                        }
                      }}
                    >
                      <CaretRightOutlined rev={"xxx"} />
                    </div>
                  ) : (
                    <></>
                  )}
                  {down ? (
                    <div
                      className={styles.iconBottomOutline}
                      onClick={() => {
                        if (level !== 0) {
                          setDown(!down);
                          setRight(!right);
                          onClick();
                        }
                      }}
                    >
                      <CaretDownOutlined rev={"xxx"} />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function ChildrenRender({ data }) {
    const [hiddenStates, setHiddenStates] = useState<Array<boolean>>(
      new Array(data?.length).fill(true)
    );
    const handleClick = (index: number) => {
      const newHiddenStates = [...hiddenStates];
      newHiddenStates[index] = !newHiddenStates[index];
      setHiddenStates(newHiddenStates);
    };

    return (
      <React.Fragment>
        {data?.map((item, index) => (
          <TreeNode
            label={
              <Node
                level={item?.level}
                name={item?.name}
                parentId={item?.parentId}
                id={item?.id}
                onClick={() => handleClick(index)}
                isChildren={item?.children?.length > 0 ? true : false}
                ep_num={item?.ep_num}
                manager={item?.manager}
                settingOrganizeName={item?.settingOrganizeName}
                nv_di_lam={item?.nv_di_lam}
                nv_nghi={item?.nv_nghi}
                listOrganizeDetailId={item?.listOrganizeDetailId}
              />
            }
            key={index}
          >
            {item?.children && hiddenStates[index] && (
              <ChildrenRender data={item.children} />
            )}
          </TreeNode>
        ))}
      </React.Fragment>
    );
  }
  return (
    <>
      <div className={styles.transformWrapper}>
        <Tree
          label={
            <Node name={data?.name} level={0} parentId={0} isChildren={true} />
          }
        >
          {data?.children ? <ChildrenRender data={data?.children} /> : <></>}
        </Tree>
      </div>
      {openNVDL ? <ModalNVDLComponent></ModalNVDLComponent> : <></>}
      {openNVKDL ? <ModalNVKDLComponent></ModalNVKDLComponent> : <></>}
    </>
  );
}
