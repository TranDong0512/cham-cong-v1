import React, { useState, useEffect, createContext } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Image,
  Typography,
  Radio,
  Select,
  Row,
  Col,
  Tabs,
} from "antd";
const { Text } = Typography;
import type { TabsProps } from "antd";

import instance from "@/components/hooks/axios.config";
import type { TableRowSelection } from "antd/es/table/interface";
import type { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { useDispatch } from "react-redux";
import { setListPm, update } from "@/redux/reducer/thiet_lap_cong_ty";

interface DataType {
  key: string;
  name?: string;
  age?: number;
}
export default function ModalAddNewSF({ id, close, open }) {
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên phần mềm",
      dataIndex: "",
      key: "name",
      render: (data) => (
        <div className="flex flex-align-center">
          <Image
            alt="xxx"
            preview={false}
            width={52}
            height={52}
            src={data?.img === null ? data.img : "/gh_ip/app.svg"}
          />
          <div className="ml-16">
            <Text>{data?.app_name}</Text>
          </div>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.setup.listPm);
  const isUpdate = useSelector((state: RootState) => state.setup.update);

  useEffect(() => {
    const unFollow = async () => {
      const fetcher = async () => {
        return await instance.post("api/qlc/AppUsers/list");
      };
      const result = await fetcher();
      const list = result?.data?.data?.data?.map((data) => ({
        ...data,
        key: data.app_id,
      }));
      setData(list);
    };
    unFollow();
  }, []);
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //     `selectedRowKeys: ${selectedRowKeys}`,
      //     "selectedRows: ",
      //     selectedRows
      // );
    },
    onSelect: (record: any, selected, selectedRows) => {
      const isOk = list.filter((data) => data === record?.app_id);
      if (isOk.length === 0 && selected) {
        const newList = [...list, record.app_id];
        dispatch(setListPm(newList));
      }
      if (isOk.length > 0 && !selected) {
        const newList = list.filter((item) => item !== record.app_id);
        dispatch(setListPm(newList));
        console.log(newList);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const qlns = data?.filter((data) => data.app_type === 1);
  const gv = data?.filter((data) => data.app_type === 2);
  const qlnb = data?.filter((data) => data.app_type === 3);
  const bh = data?.filter((data) => data.app_type === 4);
  const pm = data?.filter((data) => data.app_type === 5);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Quản lý nhân sự",
      children: (
        <div className="p-16">
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={qlns}
            pagination={false}
            bordered
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Giao việc",
      children: (
        <div className="p-16">
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={gv}
            pagination={false}
            bordered
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "Quản lý nội bộ",
      children: (
        <div className="p-16">
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={qlnb}
            pagination={false}
            bordered
          />
        </div>
      ),
    },
    {
      key: "4",
      label: "Bán hàng",
      children: (
        <div className="p-16">
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            pagination={false}
            dataSource={bh}
            bordered
          />
        </div>
      ),
    },
    {
      key: "5",
      label: "Phần mềm theo ngành nghề",
      children: (
        <div className="p-16">
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={pm}
            pagination={false}
            bordered
          />
        </div>
      ),
    },
  ];
  const handleSubmit = async () => {
    try {
      const fetcher = async () => {
        return await instance.post("qlc/AppUsers/create", {
          ep_id: id,
          listApp: list,
        });
      };
      const result = await fetcher();
      if (result.statusText === "OK") {
        alert("Cập nhập phần mềm thành côngs");
        dispatch(update(isUpdate));
        close();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={close}
      wrapClassName="CustomerModal"
      footer={false}
    >
      <div
        className="px-24 py-16"
        style={{
          backgroundColor: "#4C5BD4",
        }}
      >
        <Text className="color-white font-size-16">Thêm phần mềm</Text>
      </div>
      <div className="mt-8 px-10">
        <Tabs
          defaultActiveKey="1"
          items={items}
          style={{
            width: "100%",
          }}
        />

        <div className="flex pb-16 flex-center">
          <Button className="min-w-120 mx-10" size="large" onClick={close}>
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
}
