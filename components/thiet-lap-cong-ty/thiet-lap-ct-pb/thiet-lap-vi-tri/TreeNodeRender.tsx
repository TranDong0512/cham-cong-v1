import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "./Diagram.module.css";
import { LockOutlined, MinusOutlined } from "@ant-design/icons";
import { Typography, Image, Input, Radio } from "antd";
import { Tree } from "react-organizational-chart";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
const { Text } = Typography;
import { TreeNode } from "react-organizational-chart";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
interface DataType {
    name?: string;
    comName?: string;
    id?: number;
    settingOrganizeId?: string;
    children?: DataType[] | undefined;
    percent?: number;
    level?: number;
}

import { useDrag, useDrop } from "react-dnd";
import instance from "@/components/hooks/axios.config";
import Constant from "../../constant/constant";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
import ConfigSuccessDelete from "@/components/modal/Config";
import PopupDelete from "@/components/modal/Delete";
import ThayTheViTri from "./Modal/thay-the-vi-tri";
import ModalNewPosition from "./Modal/them-vi-tri";
import checkRoleAdmin from "@/components/check-role";
const DiagramRender: React.FC = () => {
    const [data, setData] = useState<any>({});
    const isLoad = useSelector((state: RootState) => state.setup.update);
    const [load, setLoad] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const isAdmin = checkRoleAdmin();
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
    }, [isLoad, load]);
    const ChildrenRender = (props: {
        data: any;
        name?: string;
        cardTitle?: string | undefined;
        level?: number | undefined;
        id?: number | undefined;
        settingOrganizeId?: string | undefined;
        isChildren?: DataType[] | undefined;
    }) => {
        const [openModalAdd, setOpenModalAdd] = useState(false);
        const handleCloseModalAdd = () => {
            setOpenModalAdd(false);
        };
        const [openModalReplace, setOpenModalReplace] = useState(false);
        const handleCloseModalReplace = () => {
            setOpenModalReplace(false);
        };
        const [openModalDelete, setOpenModalDelete] = useState(false);
        const handleCloseModalDelete = () => {
            setOpenModalDelete(false);
        };
        const dispatch = useDispatch();
        const onOk = async (id) => {
            try {
                const fetch = async () => {
                    return await instance.post("api/qlc/positions/delete", {
                        id: Number(id),
                    });
                };
                const result = await fetch();
                if (result?.data?.data?.result) {
                    toast("Xoá thành công");
                    dispatch(update(!isLoad));
                    setOpenModalDelete(false);
                }
            } catch (err) {
                toast.error(err?.response?.data?.error?.message);
            }
        };
        const [openModalConfig, setOpenModalConfig] = useState(false);
        const handleCloseModalConfig = () => {
            setOpenModalConfig(false);
        };

        const move = async (item, monitor) => {
            if (props?.id !== item.id) {
                let dataSend = {
                    start_id: item?.id,
                    end_id: props?.id,
                };
                try {
                    const fetcher = async () => {
                        return await instance.post(
                            "api/qlc/positions/swap",
                            dataSend
                        );
                    };
                    let result = await fetcher();
                    if (result?.data?.data?.result) {
                        dispatch(update(!isLoad));
                        toast("Thay đổi vị trí thành công!");
                    }
                } catch (err) {
                    toast.error("Thay đổi vị trí thất bại!");
                }
            }
        };
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "React.Node",
            item: { id: props?.id },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));
        const [{ isOver }, drop] = useDrop(() => ({
            accept: "React.Node",
            drop: (item, monitor) => move(item, monitor),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }));
        return (
            <div className="flex flex-center flex-align-center">
                <div
                    ref={(node) => drag(drop(node))}
                    className={styles.cardKpi}
                >
                    <div className={styles.cardTitle}>
                        <Text
                            style={{
                                color: "#4c5bd4",
                            }}
                            className={styles.cardCompanyTitleText}
                        >
                            {props.name}
                        </Text>
                    </div>

                    <div className={styles.cardLink}>
                        <div>
                            {" "}
                            {isAdmin ? (
                                <div className="flex mt-10 flex-space-between flex-align-center">
                                    <div
                                        className="flex flex-align-center cursor-pointer"
                                        onClick={() => setOpenModalAdd(true)}
                                    >
                                        <div>
                                            <Image
                                                src="/gh_ip/plus.svg"
                                                width={18}
                                                height={18}
                                                alt="xxx"
                                                preview={false}
                                            />
                                        </div>

                                        <div className="ml-4">Thêm cấp</div>
                                    </div>
                                    <div
                                        className="flex ml-10 flex-align-center cursor-pointer"
                                        onClick={() =>
                                            setOpenModalReplace(true)
                                        }
                                    >
                                        <div>
                                            <Image
                                                src="/gh_ip/xoay.svg"
                                                width={18}
                                                height={18}
                                                alt="xxx"
                                                preview={false}
                                            />
                                        </div>

                                        <div className="ml-4">Thay thế</div>
                                    </div>
                                    
                                    <div
                                        className="flex ml-10 flex-align-center cursor-pointer"
                                        onClick={() => setOpenModalDelete(true)}
                                    >
                                        <div>
                                            <Image
                                                src="/gh_ip/delete.svg"
                                                width={18}
                                                height={18}
                                                alt="xxx"
                                                preview={false}
                                            />
                                        </div>

                                        <div className="ml-4">Xoá</div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>

                        <ModalNewPosition
                            level={props?.level}
                            open={openModalAdd}
                            close={handleCloseModalAdd}
                        />
                        <ThayTheViTri
                            id={props?.id}
                            name={props?.name}
                            open={openModalReplace}
                            close={handleCloseModalReplace}
                        />
                        <PopupDelete
                            open={openModalDelete}
                            close={handleCloseModalDelete}
                            onOK={() => onOk(props?.id)}
                            user={props.name}
                            company="Sơ đồ chức vụ"
                        />
                        <ConfigSuccessDelete
                            open={openModalConfig}
                            close={handleCloseModalConfig}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const CompanyRender = (data: {
        name?: string | undefined;
        id?: string | undefined;
    }) => (
        <div
            className="w-100 max-w-360 px-30 py-40 m-auto"
            style={{
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                border: "0.5px solid #cccccc",
            }}
        >
            <div>
                <h4 className={styles.comTitle}>{data.name}</h4>
            </div>
        </div>
    );

    const TreeRender = (props: { data: DataType[] | undefined }) => {
        return (
            <React.Fragment>
                {props.data?.map((item, index) => (
                    <TreeNode
                        label={
                            <ChildrenRender
                                name={item?.name}
                                data={item}
                                id={item?.id}
                                level={item?.level}
                                settingOrganizeId={item?.settingOrganizeId}
                                isChildren={item.children}
                            />
                        }
                        key={index}
                    >
                        {item.children && <TreeRender data={item.children} />}
                    </TreeNode>
                ))}
            </React.Fragment>
        );
    };

    return (
        <div className={styles.transformWrapper}>
            <Tree label={<CompanyRender name={data?.name} />}>
                {data?.children && <TreeRender data={data?.children} />}
            </Tree>
        </div>
    );
};
export default DiagramRender;
