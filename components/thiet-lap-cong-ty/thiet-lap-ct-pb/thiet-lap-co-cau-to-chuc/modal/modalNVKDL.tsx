import { openNVKDLState } from "@/redux/reducer/thiet_lap_cong_ty";
import { RootState } from "@/redux/storeQLC";
import { Modal, Select, Table } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import instance from "@/components/hooks/axios.config";
export default function ModalNVKDLComponent() {
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState<any>();
  const [originalDataTable, setOriginalDataTable] = useState<any>();
  const open = useSelector((state: RootState) => state.setup.openNVKDLState);
  const listOriganizeDetailId = useSelector(
    (state: RootState) => state.setup.dataState
  );
  const handleCancel = () => {
    dispatch(openNVKDLState(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const object = {
          type_timekeep: 2,
          listOrganizeDetailId: listOriganizeDetailId,
        };
        const response = await instance.post(
          "api/qlc/managerUser/listEmUntimed",
          object
        );
        const newData = response?.data?.data?.data.map((item, index) => ({
          ...item,
          key: index + 1,
          label: item.userName,
          value: item.idQLC,
        }));
        setOriginalDataTable(newData);
        setDataTable(newData);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const onChange = (value) => {
    if (value !== undefined) {
      const dataSearch = originalDataTable?.filter(
        (item) => item.idQLC == value
      );
      setDataTable(dataSearch);
    } else {
      setDataTable(originalDataTable);
    }
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      align: "center",
      dataIndex: "idQLC",
      key: "idQLC",
    },
    {
      title: "Họ và tên",
      align: "center",
      dataIndex: "userName",
      key: "idQLC",
    },
    {
      align: "center",
      title: "Chức vụ",
      dataIndex: "positionName",
      key: "positionName",
    },
    {
      align: "center",
      title: "Lý do nghỉ",
      dataIndex: "ly_do_nghi",
      key: "ly_do_nghi",
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        wrapClassName="CustomerModal"
        footer={false}
        width={700}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#4c5bd4",
              padding: "12px 0",
              color: "white",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            <p style={{ paddingLeft: 12 }}>Danh sách nhân viên đi làm</p>
          </div>
        }
      >
        <div style={{ width: "100%", display: "flex" }}>
          <Select
            allowClear={true}
            showSearch
            placeholder="Chọn nhân viên"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            options={dataTable}
            style={{
              width: "90%",
              margin: "12px auto",
            }}
          />
        </div>
        <Table columns={columns} dataSource={dataTable} />
      </Modal>
    </>
  );
}
