import React, { useState } from "react";
import { Col, Row, Table, Typography } from "antd";
import columnsModal from "./column";
import SelectOrganizeCustomize from "@/components/commons/co-cau-to-chuc";
import SearchNameUserCustomize from "@/components/commons/ten-nhan-vien";
import SelectPositionsCustomize from "@/components/commons/vi-tri";
import Constants from "@/components/cai-dat-de-xuat/Constant/constant";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { sendData } from "@/redux/reducer/white-list";
export default function Step1({ listUsers, setListUsers }) {
  const initialData = useSelector((state: RootState) => state.white_list.data);
  const [dataTable, setDataTable] = useState<any>([]);
  const [listOrganizeDetailId, setListOrganizeDetailId] = useState(null);
  const dispatch = useDispatch();
  const rowSelection = {
    onSelect: (record: any, selected, selectedRows) => {
      if (selectedRows.length > 0) {
        const newArr = selectedRows?.map((item) => item?.ep_id);
        setListUsers(newArr);
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
            <SelectOrganizeCustomize
              initialData={dataTable}
              setListOrganizeDetailId={setListOrganizeDetailId}
              setDataTable={setDataTable}
              ep_status={"Active"}
              href={Constants.settingConfirm_listUser}
            />
          </Col>
        </Row>
      </div>

      <div className="mt-8">
        <Typography.Text>Đã chọn:{listUsers.length}</Typography.Text>
      </div>

      <div className="CustomerTable mt-16">
        <Table
          locale={locale}
          rowSelection={{
            columnWidth: "48px",
            ...rowSelection,
          }}
          pagination={{
            pageSize: 5,
          }}
          columns={columnsModal}
          dataSource={dataTable}
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
}
