import { Button, Modal, Select, Typography } from "antd";
import { useState } from "react";
import instance from "@/components/hooks/axios.config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { openModalEditHTD, updateHTD } from "../reducer/reducer";
import Constants from "../Constant/constant";

const { Text } = Typography;

export default function ModalHinhThucDuyet({ setSelectedRowKeys, setHidden }) {
  const isUpdateSCD = useSelector((state: RootState) => state.tgd.updateHTD);
  const open = useSelector((state: RootState) => state.tgd.openModalEditHTD);
  const ep_id = useSelector((state: RootState) => state.tgd.data);
  const dataOld = useSelector(
    (state: RootState) => state.tgd.dataOld?.confirm_type
  );
  const [typeEdit, setTypeEdit] = useState(dataOld);

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(openModalEditHTD(false));
  };
  const handleSelectType = async (e) => {
    setTypeEdit(e);
  };
  const handleUpdate = async () => {
    try {
      const response = await instance.post(
        Constants.updateAllSettingConfirmType,
        {
          confirm_type: typeEdit,
          listUsers: ep_id,
        }
      );
      if (response.data?.data?.result) {
        dispatch(updateHTD(!isUpdateSCD));
        setSelectedRowKeys([]);
        dispatch(openModalEditHTD(false));
        setHidden(false);
        toast("Cập nhập thành công");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
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
        <Text className="color-white font-size-16">Hình thức duyệt</Text>
      </div>

      <div className="p-24">
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn"
          onSelect={handleSelectType}
          defaultValue={dataOld}
          allowClear
          showSearch
          filterOption={(input, option: any) =>
            (option?.label ?? "").includes(input)
          }
          size="large"
          options={[
            {
              label: "Duyệt đồng thời",
              value: 1,
            },
            {
              label: "Duyệt lần lượt",
              value: 2,
            },
            {
              label: "Duyệt đồng thời và lần lượt",
              value: 3,
            },
          ]}
        />
        <div className="flex mt-24 flex-center">
          <Button className="min-w-120 mx-10" size="large" onClick={onClose}>
            Hủy
          </Button>
          <Button
            className="min-w-120 mx-10"
            type="primary"
            size="large"
            htmlType="submit"
            onClick={handleUpdate}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
}
