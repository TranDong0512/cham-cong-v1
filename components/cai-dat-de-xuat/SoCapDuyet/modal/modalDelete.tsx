import PopupBackup from "@/components/modal/Backup";
import instance from "@/components/hooks/axios.config";
import React from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { useDispatch } from "react-redux";
import { openModalDelete, updateSoCapDuyet } from "../../reducer/reducer";
export default function ModalDeleteSCD({ setHidden, setSelectedRowKeys }) {
    const dispatch = useDispatch();
    const setOpenModalDelete = useSelector(
        (state: RootState) => state.tgd.openModalDelete
    );
    const update = useSelector(
        (state: RootState) => state.tgd.updateSoCapDuyet
    );
    const data = useSelector((state: RootState) => state.tgd.data);
    const closeDeleteModal = () => {
        dispatch(openModalDelete(false));
    };
    const handleConfirmDelete = async () => {
        try {
            const response = await instance.post(
                "api/qlc/settingConfirm/updateAllSettingConfirmLevel",
                {
                    confirm_level: 0,
                    listUsers: data,
                }
            );
            if (response?.data?.data?.result) {
                dispatch(updateSoCapDuyet(!update));
                dispatch(openModalDelete(false));
                setHidden(false);
                setSelectedRowKeys([]);
                toast.success("Khôi phục cài đặt thành công");
            }
        } catch (err) {
            toast.error(err?.response?.data?.error?.message);
        }
    };

    return (
        <PopupBackup
            open={setOpenModalDelete}
            close={closeDeleteModal}
            user={""}
            company={"Số cấp duyệt"}
            onOK={handleConfirmDelete}
        />
    );
}
