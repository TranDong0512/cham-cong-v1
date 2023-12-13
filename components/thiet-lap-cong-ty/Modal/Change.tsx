import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, Select } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { getCompIdCS } from "@/pages/api/BaseApi";
import { toast } from "react-toastify";
import { managerUser } from "../constant/constant";
import { updateUser } from "@/redux/reducer/update";

const ChangeDepartment = ({ open, onClose }) => {
  const [selectSettingOrganize, setSelectSettingOrganize] = useState();
  const [setting, setSetting] = useState([]);
  const [listOrganizeDetailId, setListOrganizeDetailId] = useState(null);
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.update.updateUser);
  const [organizeDetailId, setOrganizeDetailId] = useState();
  const dataOld = useSelector((state: RootState) => state.setup.dataOld);
  const dataUser: {
    ep_id?: string;
    organizeDetailId?: string;
  } = useSelector((state: RootState) => state.setup.sendData);
  const com_id = getCompIdCS();
  useEffect(() => {
    let data = {
      com_id: com_id,
    };
    const fetcher = async () => {
      return await instance.post("api/qlc/organizeDetail/listAll", data);
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();
        setSetting(data?.data?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    unFollow();
  }, []);
  const handleSelect = async (e) => {
    const items = setting?.filter((item) => item.id === e);
    setSelectSettingOrganize(e);
    setOrganizeDetailId(items[0].id);
    setListOrganizeDetailId(items[0]?.listOrganizeDetailId);
  };

  const handleSubmit = async () => {
    try {
      const fetcher = async () => {
        return await instance.post(managerUser.changeOrganizeDetail, {
          ep_id: dataUser?.ep_id,
          organizeDetailId: organizeDetailId,
          listOrganizeDetailId: listOrganizeDetailId,
        });
      };

      const result = await fetcher();
      if (result?.data?.data?.result) {
        dispatch(updateUser(!isLoad));
        onClose();
        toast.success("Luân chuyển thành công");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  return (
    <Modal
      open={open}
      wrapClassName="CustomerModal"
      footer={false}
      onCancel={onClose}
    >
      <div
        className="px-24 py-16"
        style={{
          backgroundColor: "#4C5BD4",
        }}
      >
        <Text className="color-white font-size-16">Luân chuyển phòng/ban</Text>
      </div>
      <div className=" p-24">
        <div className="flex flex-align-center flex-wrap">
          <div className="mb-8">Tên tổ chức</div>
          <Select
            value={selectSettingOrganize}
            defaultValue={dataOld?.organizeDetailName}
            size="large"
            onSelect={handleSelect}
            allowClear
            showSearch
            onClear={() => setSelectSettingOrganize(null)}
            filterOption={(input, option: any) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            placeholder="Chọn"
            options={[
              ...setting?.map((item) => ({
                key: item.id,
                label: item?.organizeDetailName,
                value: item?.id,
              })),
            ]}
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="flex mt-24 flex-center">
          <Button className="min-w-120 mx-10" size="large" onClick={onClose}>
            Hủy
          </Button>
          <Button
            className="min-w-120 mx-10"
            type="primary"
            size="large"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Thêm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ChangeDepartment;
