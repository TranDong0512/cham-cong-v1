import PopupBackup from "@/components/modal/Backup";
import instance from "@/components/hooks/axios.config";
import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { useDispatch } from "react-redux";
import { openModalDeleteHTD, updateHTD } from "../reducer/reducer";
export default function ModalDeleteHTD({ setHidden, setSelectedRowKeys }) {
    const dispatch = useDispatch();
    const open = useSelector(
        (state: RootState) => state.tgd.openModalDeleteHTD
    );
    const update = useSelector((state: RootState) => state.tgd.updateHTD);
    const data = useSelector((state: RootState) => state.tgd.data);
    const close = () => {
        dispatch(openModalDeleteHTD(false));
    };
    const handleDelete = async (id: any, type: any) => {
        try {
            const response = await instance.post(
                "api/qlc/settingConfirm/updateAllSettingConfirmType",
                {
                    confirm_type: 0,
                    listUsers: data,
                }
            );
            if (response.data?.data?.result) {
                dispatch(updateHTD(!update));
                dispatch(openModalDeleteHTD(false));
                setHidden(false);
                setSelectedRowKeys([]);
                toast.success("Khôi phục cài đặt HTD thành công");
            }
        } catch (error) {
            toast.error(error?.response?.data?.error?.message);
        }
    };
    return (
        <PopupBackup
            open={open}
            close={close}
            user={"nhân viên"}
            company={"Hình thức duyệt"}
            onOK={handleDelete}
        />
    );
}
