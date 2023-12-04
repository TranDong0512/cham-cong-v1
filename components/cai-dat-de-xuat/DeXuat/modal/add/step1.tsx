import React, { useEffect, useState } from "react";
import { Col, Row, Select, Table, Typography } from "antd";
import columnsModal from "./column";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { getCompIdCS } from "@/pages/api/BaseApi";
import instance from "@/components/hooks/axios.config";
import Constants from "@/components/cai-dat-de-xuat/Constant/constant";
import { dataSelectAdd } from "@/components/cai-dat-de-xuat/reducer/reducer";
export default function Step1({ setListUsers, listUsers }) {
  const initialData = useSelector((state: RootState) => state.white_list.data);
  const [dataTable, setDataTable] = useState<any>([]);
  const [listOrganizeDetailId, setListOrganizeDetailId] = useState(null);
  // const [name, setName] = useState(null);
  const dispatch = useDispatch();
  const rowSelection = {
    onSelect: (record: any, selected, selectedRows) => {
      if (selectedRows.length > 0) {
        const newArr = selectedRows?.map((item) => item?.ep_id);
        setListUsers(newArr);
      } else {
        setListUsers([]);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selectedRows.length > 0) {
        const newArr = dataTable?.map((item) => item?.ep_id);
        setListUsers(newArr);
      } else {
        setListUsers([]);
      }
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
  };

  const com_id = getCompIdCS();
  const [listOrganizeType, setListOrganizeType] = useState([]);
  const [organizeType, setOrganizeType] = useState();

  useEffect(() => {
    const data_com_id = {
      com_id: com_id,
    };
    const fetcher = async () => {
      return await instance.post("api/qlc/organizeDetail/listAll", data_com_id);
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

  const handleSelectOrganizeType = async (e) => {
    const items = listOrganizeType?.filter((item) => item.id === e);
    setOrganizeType(e);
    dispatch(dataSelectAdd(e));
    setListOrganizeDetailId(items[0]?.listOrganizeDetailId);
    const fetcher = async () => {
      return await instance.post(Constants.settingConfirm_listUser, {
        ep_status: "Active",
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
  };
  let locale = {
    emptyText: (
      <span>
        <p style={{ color: "#ccc", fontSize: 16, fontWeight: "500" }}>
          Không có dữ liệu
        </p>
      </span>
    ),
  };
  return (
    <>
      <div className="mt-16">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
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
                  onSelect={handleSelectOrganizeType}
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
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
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
          </Col>
        </Row>
      </div>

      <div className="mt-8">
        <Typography.Text>Đã chọn:{listUsers.length}</Typography.Text>
      </div>

      <div className="CustomerTable mt-8">
        <>
          <Table
            locale={locale}
            rowSelection={{
              ...rowSelection,
            }}
            pagination={{
              pageSize: 5,
            }}
            columns={columnsModal}
            dataSource={dataTable}
            scroll={{ x: 600 }}
          />
        </>
      </div>
    </>
  );
}
