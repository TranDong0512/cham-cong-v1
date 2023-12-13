import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "./Diagram.module.scss";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Typography, Button, Input, Tooltip, Popover } from "antd";
import { Tree } from "react-organizational-chart";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
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
import Constant, {
    settingOrganize,
} from "@/components/thiet-lap-cong-ty/constant/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
import { toast } from "react-toastify";
import { getCompIdCS } from "@/pages/api/BaseApi";
interface NodeType {
    id?: number | undefined;
    parentId?: number | undefined;
    level?: number | undefined;
    name?: string | undefined;
    children?: NodeType[];
    isChildren?: boolean | undefined;
    organizeDetail_num?: number | undefined;
    onClick?: () => void;
}
interface DataType {
    name?: string;
    children?: NodeType[];
}
const ContentPopOver = (id) => {
    const com_id = getCompIdCS();
    const [detailCompany, setDetailCompany] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            return await instance.post("api/qlc/organizeDetail/listAll", {
                com_id: com_id,
                settingOrganizeId: id.id,
            });
        };
        const unFollow = async () => {
            try {
                const data = await fetch();
                setDetailCompany(data?.data?.data?.data);
            } catch (err) {
                alert("Error: " + err?.response?.data?.error?.message);
            }
        };
        unFollow();
    }, []);
    return (
        <div>
            <div className="flex flex-center">
                <Text>Danh sách đơn vị:</Text>
            </div>
            <div>
                {detailCompany?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="py-4"
                            style={{
                                color: "#4d5cd4",
                            }}
                        >
                            {item.organizeDetailName}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default function Diagram() {
    const [isLoad, setIsLoad] = useState(false);
    const load = useSelector((state: RootState) => state.setup.update);
    const dispatch = useDispatch();
    const [data, setData] = useState<DataType>({
        name: "",
        children: [],
    });

    useEffect(() => {
        const fetch = async () => {
            return await instance.post(Constant.settingOrganize_list);
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
    }, [isLoad, load]);

    function Node({
        name,
        level,
        parentId,
        id,
        isChildren,
        onClick,
        organizeDetail_num,
    }: NodeType) {
        const [right, setRight] = useState(false);
        const [down, setDown] = useState(true);
        const [openModalDelete, setOpenModalDelete] = useState(false);
        const [openConfig, setOpenConfig] = useState(false);
        const [organizeName, setOrganizeName] = useState(name);
        const [showEdit, setShowEdit] = useState(true);
        const handleChange = (e) => {
            setOrganizeName(e.target.value);
        };
        const [edit, setEdit] = useState("create");
        const [label, setLabel] = useState(1);

        const addNameToDataBelow = (id, parentId, level, organizeName) => {
            const addChildToParent = (node, id, parentId, organizeName) => {
                if (node.id === id && node.parentId === parentId) {
                    node.name = organizeName;
                    return true;
                }
                for (let i = 0; i < node?.children?.length; i++) {
                    if (
                        addChildToParent(
                            node.children[i],
                            id,
                            parentId,
                            organizeName
                        )
                    ) {
                        return true;
                    }
                }
                return false;
            };

            const newData = data?.children?.map((item) => {
                if (
                    item.id === id &&
                    item.level === level &&
                    item.parentId === parentId
                ) {
                    item.name = organizeName;
                } else {
                    addChildToParent(item, id, parentId, organizeName);
                }
                return item;
            });
            return newData;
        };
        const handleClickEdit = () => {
            setShowEdit(false);
            setEdit("update");
            setCanDrag(false);
        };
        const handlePressEnter = async () => {
            setShowEdit(true);
            setOrganizeName(organizeName);
            const newData = addNameToDataBelow(
                id,
                parentId,
                level,
                organizeName
            );
            let arr = {
                ...data,
                children: newData,
            };
            setData(arr);

            edit === "create" ? handleCreate() : handleUpdate();
        };
        const handleUpdate = async () => {
            try {
                const fetch = async () => {
                    return await instance.post(
                        "api/qlc/settingOrganize/update",
                        {
                            id: Number(id),
                            organizeName: organizeName,
                        }
                    );
                };
                const result = await fetch();
                if (result?.data?.data?.result) {
                    setShowEdit(true);
                    setIsLoad(!isLoad);
                    dispatch(update(!load));
                    // setCanDrag(true);
                    toast("Cập nhập thành công");
                }
            } catch (err) {
                toast.error("Cập nhập thất bại");
            }
        };
        const handleCreate = async () => {
            let valueSend;
            if (label === 1) {
                valueSend = {
                    organizeName: organizeName,
                    parentId: parentId,
                    level: level,
                };
            }
            if (label === 2) {
                valueSend = {
                    organizeName: organizeName,
                    parentId: id,
                    level: level + 1,
                };
            }
            try {
                const fetcher = async () => {
                    return await instance.post(
                        Constant.settingOrganize_create,
                        valueSend
                    );
                };
                const result = await fetcher();
                if (result?.data?.data?.result) {
                    setIsLoad(!isLoad);
                    dispatch(update(!load));
                    toast("Tạo mới thàng công");
                }
            } catch (err) {
                console.error("Error: " + err?.response?.data?.error?.message);
                toast.error("Tạo mới thất bại");
            }
        };

        const below = {
            id: findLargestId() + 1,
            parentId: id,
            level: level + 1,
            name: "",
            children: [],
        };
        const addNodeToDataBelow = (id, parentId, level) => {
            const addChildToParent = (node, id) => {
                if (node.id === id) {
                    node?.children?.push(below);
                    return true;
                }
                for (let i = 0; i < node?.children?.length; i++) {
                    if (addChildToParent(node?.children[i], id)) {
                        return true;
                    }
                }
                return false;
            };
            const newData = data?.children?.map((item) => {
                if (
                    item.id === id &&
                    item.level === level &&
                    item.parentId === parentId
                ) {
                    item?.children?.push(below);
                } else {
                    addChildToParent(item, id);
                }
                return item;
            });
            return newData;
        };
        const horizontal = {
            id: findLargestId() + 1,
            parentId: parentId,
            level: level,
            name: "",
            children: [],
        };
        const addNodeToDataHorizontal = (id, parentId, level) => {
            const addChildToParent = (node, parentId) => {
                if (node.id === parentId) {
                    node?.children?.push(horizontal);
                    return true;
                }
                for (let i = 0; i < node?.children?.length; i++) {
                    if (addChildToParent(node?.children[i], parentId)) {
                        return true;
                    }
                }
                return false;
            };
            const newData = data?.children?.map((item) => {
                if (item.id === parentId && item.level === level - 1) {
                    item?.children?.push(horizontal);
                } else {
                    addChildToParent(item, parentId);
                }
                return item;
            });
            return newData;
        };
        function findLargestId() {
            function findLargestIdRecursive(node) {
                let largestId = node?.id;

                if (node?.children && node?.children?.length > 0) {
                    for (const child of node?.children) {
                        const childLargestId = findLargestIdRecursive(child);
                        largestId = Math.max(largestId, childLargestId);
                    }
                }
                return largestId;
            }

            let largestId = 0;
            for (const node of data?.children) {
                const nodeLargestId = findLargestIdRecursive(node);
                largestId = Math.max(largestId, nodeLargestId);
            }

            return largestId;
        }

        const handlePlus = () => {
            if (organizeName !== "") {
                if (level === 0) {
                    let arr = {
                        ...data,
                        children: [...data?.children, below],
                    };
                    setData(arr);
                } else {
                    const newData = addNodeToDataBelow(id, parentId, level);

                    let arr = {
                        ...data,
                        children: newData,
                    };
                    setData(arr);
                }
                setLabel(1);
            } else {
                alert("Tên không được để trống");
            }
        };
        const handlePlusChildren = () => {
            if (organizeName !== "") {
                if (level === 1) {
                    let arr = {
                        ...data,
                        children: [...data?.children, horizontal],
                    };
                    setData(arr);
                } else {
                    const newData = addNodeToDataHorizontal(
                        id,
                        parentId,
                        level
                    );

                    let arr = {
                        ...data,
                        children: newData,
                    };
                    setData(arr);
                }
                setLabel(2);
            } else {
                alert("Tên không được để trống");
            }
        };

        function removeNodeById(data, idToRemove) {
            const newData = data.map((item) => {
                if (item.id === idToRemove) {
                    return null;
                }
                return {
                    ...item,
                    children: item.children
                        ? removeNodeById(item.children, idToRemove)
                        : [],
                };
            });

            return newData.filter((item) => item !== null);
        }

        const move = async (item, monitor) => {
            if (id !== item.id) {
                let dataSend = {
                    start_id: item.id,
                    end_id: id,
                };
                try {
                    const fetcher = async () => {
                        return await instance.post(
                            "api/qlc/settingOrganize/swap",
                            dataSend
                        );
                    };
                    let result = await fetcher();
                    if (result?.data?.data?.result) {
                        setIsLoad(!isLoad);
                        toast("Thay đổi vị trí thành công!");
                    }
                } catch (err) {
                    console.log(err);
                    toast.error("Thay đổi vị trí thất bại!");
                }
            }
        };

        const handleCloseModalDelete = () => {
            setOpenModalDelete(false);
        };
        const onOk = async (id) => {
            try {
                const fetch = async () => {
                    return await instance.post(settingOrganize.delete, {
                        id: Number(id),
                    });
                };
                const result = await fetch();
                if (result?.data?.data?.result) {
                    setOpenModalDelete(false);
                    setIsLoad(!isLoad);
                    dispatch(update(!isLoad));
                    toast("Xoá thàng công");
                }
            } catch (err) {
                console.error(err?.response?.data?.error?.message);
                toast.error("Xoá thất bại");
            }
        };
        const handleCloseConfig = () => {
            setOpenConfig(false);
        };
        const [canDrag, setCanDrag] = useState(true);
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "React.Node",
            item: { id },
            canDrag: false,
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
        const [isNew, setIsNew] = useState(() => {
            if (name === "") {
                return false;
            } else return true;
        });
        const [openPopOver, setOpenPopOver] = useState(false);

        return (
            <div className="h-120px">
                <div
                    ref={(node) => drag(drop(node))}
                    className={styles.wrapper}
                    style={{
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        border: "0.5px solid #cccccc",
                        backgroundColor: isDragging ? "#ccc" : "transparent",
                    }}
                >
                    <div className="flex flex-end h-30px ">
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
                                            if (organizeName === "") {
                                                const deleteItem =
                                                    removeNodeById(
                                                        data?.children,
                                                        id
                                                    );
                                                let arr = {
                                                    ...data,
                                                    children: deleteItem,
                                                };
                                                setData(arr);
                                            } else {
                                                setOpenModalDelete(true);
                                            }
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
                    <div className="flex mt-8 mb-8  flex-space-between">
                        <div className={styles.plus_left_wrapper}>
                            {level !== 0 ? (
                                <Tooltip title="Thêm ngang cấp">
                                    <div className={styles.plus_left}>
                                        <PlusOutlined
                                            rev={"xxx"}
                                            onClick={handlePlusChildren}
                                        />
                                    </div>
                                </Tooltip>
                            ) : (
                                <></>
                            )}
                        </div>
                        <>
                            {isNew ? (
                                <div className="w-100">
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
                                                paddingBottom: "4px",
                                                borderBottom: "1px dashed #ccc",
                                                minWidth: "100%",
                                                width: "100%",
                                                height: "40px",
                                            }}
                                        >
                                            <Tooltip title={organizeName}>
                                                {organizeName}
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                        <>
                            {!isNew ? (
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
                                <></>
                            )}
                        </>

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

                        <div className={styles.plus_right_wrapper}>
                            {level !== 0 ? (
                                <>
                                    <Tooltip title="Thêm ngang cấp">
                                        <div className={styles.plus_right}>
                                            <PlusOutlined
                                                rev={"xxx"}
                                                onClick={handlePlusChildren}
                                            />
                                        </div>
                                    </Tooltip>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div className={styles.plus_bottom_wrapper}>
                        <div className="flex flex-space-between h-32px mr-8 ml-16">
                            {level !== 0 ? (
                                <div
                                    onClick={() => {
                                        setOpenPopOver(!openPopOver);
                                    }}
                                    className="font-size-12 cursor-pointer"
                                >
                                    <Text
                                        style={{
                                            color: "#4d5cd4",
                                        }}
                                    >
                                        <Popover
                                            content={<ContentPopOver id={id} />}
                                        >
                                            <div>
                                                Số đơn vị trực thuộc:
                                                {organizeDetail_num}
                                            </div>
                                        </Popover>
                                    </Text>
                                </div>
                            ) : (
                                <></>
                            )}
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
                        <Tooltip title="Thêm dưới cấp">
                            {level !== 0 ? (
                                <div className={styles.plus_bottom}>
                                    <PlusOutlined
                                        rev={"xxx"}
                                        onClick={handlePlus}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </Tooltip>
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
                                organizeDetail_num={item?.organizeDetail_num}
                                isChildren={
                                    item?.children?.length > 0 ? true : false
                                }
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
                        <Node
                            name={data?.name}
                            level={0}
                            parentId={0}
                            isChildren={true}
                        />
                    }
                >
                    {data?.children ? (
                        <ChildrenRender data={data?.children} />
                    ) : (
                        <></>
                    )}
                </Tree>
            </div>
        </>
    );
}
