import instance from "@/components/hooks/axios.config";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { getCompIdCS } from "@/pages/api/BaseApi";
import Constants from "@/components/cai-dat-de-xuat/Constant/constant";

export default function SelectOrganizeCustomize({
    initialData,
    setDataTable,
    setListOrganizeDetailId,
    ep_status,
    href,
}) {
    const com_id = getCompIdCS();
    const [listOrganizeType, setListOrganizeType] = useState([]);
    const [organizeType, setOrganizeType] = useState();
    useEffect(() => {
        const data_com_id = {
            com_id: com_id,
        };
        const fetcher = async () => {
            return await instance.post(
                "api/qlc/organizeDetail/listAll",
                data_com_id
            );
        };
        const unFollow = async () => {
            try {
                const data = await fetcher();

                setListOrganizeType(data?.data?.data?.data);
            } catch (err) {
                console.error(err);
            }
        };
        unFollow();
    }, []);

    const [dataFull, setDataFull] = useState<any>();
    // useEffect(() => {
    //     const data_com_id = {
    //         com_id: com_id,
    //         pageSize: 10000,
    //         ep_status: "Active",
    //     };
    //     const fetcher = async () => {
    //         return await instance.post(
    //             Constants.settingConfirm_listUser,
    //             data_com_id
    //         );
    //     };
    //     const unFollow = async () => {
    //         try {
    //             const data = await fetcher();
    //             const newData = data?.data?.data?.data?.map((item, index) => ({
    //                 ...item,
    //                 stt: index + 1,
    //                 key: index,
    //             }));
    //             setDataFull(newData);
    //             setDataTable(newData);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     unFollow();
    // }, []);
    const handleSelectOrganizeType = async (e) => {
        if (e) {
            const items = listOrganizeType?.filter((item) => item.id === e);
            setOrganizeType(e);
            setListOrganizeDetailId(items[0]?.listOrganizeDetailId);
            const fetcher = async () => {
                return await instance.post(href, {
                    ep_status: ep_status,
                    listOrganizeDetailId: items[0]?.listOrganizeDetailId,
                });
            };
            try {
                const data = await fetcher();
                const newData = data?.data?.data?.data?.map((item, index) => ({
                    ...item,
                    stt: index + 1,
                    key: index,
                }));
                setDataTable(newData);
            } catch (err) {
                console.error(err);
            }
        } else {
            setDataTable(dataFull);
        }
    };

    return (
        <div>
            <span>Tên tổ chức </span>
            <div
                style={{
                    border: "1px solid rgb(217, 217, 217)",
                    borderRadius: "8px",
                }}
                className="mt-8"
            >
                <Select
                    value={organizeType}
                    size="large"
                    onChange={handleSelectOrganizeType}
                    allowClear
                    showSearch
                    bordered={false}
                    onClear={() => {
                        setOrganizeType(null);
                        setDataTable(initialData);
                        setListOrganizeDetailId(null);
                    }}
                    filterOption={(input, option: any) =>
                        (option?.label ?? "").includes(input)
                    }
                    placeholder="Chọn"
                    style={{
                        width: "100%",
                    }}
                    options={[
                        ...listOrganizeType.map((item) => ({
                            key: item.id,
                            label: item?.organizeDetailName,
                            value: item?.id,
                        })),
                    ]}
                />
            </div>
        </div>
    );
}
