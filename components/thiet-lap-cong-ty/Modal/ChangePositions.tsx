import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, Select } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { toast } from "react-toastify";
import { managerUser, positions } from "../constant/constant";
import SelectPositionsCustomize from "@/components/commons/vi-tri";
import { updateUser } from "@/redux/reducer/update";
import { getCompIdCS } from "@/pages/api/BaseApi";

const ChangePositions = ({ open, onClose, data }) => {
  const [position_id, setPosition_id] = useState(data?.po_id);
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.update.updateUser);
  const setDataTable = (value) => {
    return;
  };
  const handleSubmit = async () => {
    try {
      const fetcher = async () => {
        return await instance.post(managerUser.changeOrganizeDetail, {
          ep_id: data.ep_id,
          position_id: position_id,
        });
      };
      const result = await fetcher();
      if (result?.data?.data?.result) {
        dispatch(updateUser(!isLoad));
        onClose();
        toast.success("Thay đổi vị trí thành công");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  const handleClose = () => {
    onClose();
  };

  const com_id = getCompIdCS();
  const [listPositions, setListPositions] = useState([]);
  const [valueSelect, setValueSelect] = useState();
  useEffect(() => {
    let data = {
      com_id: com_id,
    };
    const fetcher = async () => {
      return await instance.post(positions.listAll, data);
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();
        const newData = data?.data?.data?.data?.map((item) => ({
          key: item.level,
          label: item?.positionName,
          value: item?.id,
        }));
        setListPositions(newData);
      } catch (err) {
        console.error(err);
      }
    };
    unFollow();
  }, []);
  const [initialData, setInitialData] = useState<any>();
  const handleSelectPosition = async (e) => {
    setPosition_id(e);
    setValueSelect(e);
    const items = listPositions.filter((item) => item.value === Number(e));
    const listOrganizeDetailName = initialData?.filter(
      (item) => item.positionName === items[0]?.label
    );
    setDataTable(listOrganizeDetailName);
  };
  return (
    <Modal
      open={open}
      wrapClassName="CustomerModal"
      footer={false}
      onCancel={handleClose}
    >
      <div
        className="px-24 py-16"
        style={{
          backgroundColor: "#4C5BD4",
        }}
      >
        <Text className="color-white font-size-16">Thay đổi vị trí</Text>
      </div>
      <div className=" p-24">
        <div>
          <span>Vị trí</span>
          <div className="mt-8">
            <Select
              placeholder="Chọn"
              style={{
                width: "100%",
              }}
              onSelect={handleSelectPosition}
              value={valueSelect}
              defaultValue={data?.position_id}
              allowClear
              showSearch
              onClear={() => {
                setDataTable ? setDataTable(initialData) : null;
                setPosition_id(null);
                setValueSelect(null);
              }}
              filterOption={(input, option: any) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              size="large"
              options={listPositions}
            />
          </div>
        </div>

        <div className="flex mt-24 flex-center">
          <Button
            className="min-w-120 mx-10"
            size="large"
            onClick={handleClose}
          >
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
export default ChangePositions;
