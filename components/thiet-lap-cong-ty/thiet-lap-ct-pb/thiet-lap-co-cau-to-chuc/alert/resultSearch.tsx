import React, { useEffect, useState, useContext } from "react";
import { Input, Image, Typography, Table, Select, Form, Button } from "antd";
const { Text } = Typography;
import instance from "@/components/hooks/axios.config";
import type { TableRowSelection } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import SelectUser from "../../../Modal/chon-thanh-vien";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { setArr, update } from "@/redux/reducer/thiet_lap_cong_ty";
import Constant from "@/components/thiet-lap-cong-ty/constant/constant";
import Cookies from "js-cookie";
import { getCompIdCS } from "@/pages/api/BaseApi";

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

export default function ResultSearch({ result, setResult, setManagerUser }) {
  const isLoad = useSelector((state: RootState) => state.setup.update);
  const columns: any = [
    {
      dataIndex: "",
      align: "left",
      title: "Tên",
      key: "name",
      render: (user) => (
        <div
          style={{
            gap: "10px",
          }}
          className="flex flex-align-center"
        >
          <div className="h-30px w-30px">
            <Image
              preview={false}
              width={30}
              height={30}
              src={
                user?.ep_image !== null && user.ep_image !== ""
                  ? // Cần fix
                    user?.ep_image
                  : "/avt_365.png"
              }
              style={{
                borderRadius: "50%",
              }}
            />
          </div>

          <div className="flex flex-wrap">
            <div>
              <Text
                style={{
                  color: "#4C5BD4",
                }}
              >
                {user?.ep_name}
              </Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      dataIndex: "ep_id",
      align: "center",
      title: "Id",
      key: "Id",
    },
    {
      dataIndex: "dep_name",
      align: "center",
      title: "Vị trí",
      key: "sdt",
      render: (data) => {
        return <div>{data ? data : "Chưa cập nhập"}</div>;
      },
    },
  ];
  const [dataUse, setDataUse] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [valueInput, setValueInput] = useState([]);
  const [length, setLength] = useState(0);
  useEffect(() => {
    const fetcher = async () => {
      return await instance.post(Constant.managerUser_list);
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();
        console.log(data?.data?.data);
        const option = data?.data?.data?.items?.map((item) => ({
          ep_name: item.ep_name,
          ep_image: item.ep_image,
          dep_name: item.dep_name,
          ep_id: item.ep_id,
          ep_phone: item.ep_phone,
          key: item.ep_id,
        }));
        setDataUse(option);
        setDataTable(option);
      } catch (err) {
        alert("Error: " + err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad]);

  const onChange = (e) => {
    const newValue = e.target.value;
    const filteredData = dataUse.filter((data) => {
      return data.ep_name.toLowerCase().includes(newValue.toLowerCase());
    });
    setDataTable(filteredData);
    setValueInput(newValue);
  };

  const rowSelection = {
    onSelect: (record: any, selected, selectedRows) => {
      const listName = selectedRows?.map(
        (item): { ep_name?: string } => item?.ep_name
      );
      setValueInput(listName);
      setLength(listName.length);
      const listId = selectedRows?.map(
        (item): { ep_id?: number } => item?.ep_id
      );
      setManagerUser(listId);
    },
    onSelectAll: (selected, selectedRows) => {
      const listName = selectedRows?.map(
        (item): { ep_name?: string } => item?.ep_name
      );
      setValueInput(listName);
      setLength(listName.length);
      const listId = selectedRows?.map(
        (item): { ep_id?: number } => item?.ep_id
      );
      setManagerUser(listId);
    },
  };

  return (
    <div>
      <div>
        <Text>Lãnh đạo ({length})</Text>
      </div>
      <Input
        size="large"
        prefix={<SearchOutlined rev={"xxx"} />}
        onFocus={() => {
          setResult(true);
        }}
        value={valueInput}
        onChange={onChange}
        placeholder="Tìm kiếm theo tên hoặc email"
      />
      {result ? (
        <div
          style={{
            borderRadius: " 6px",
            border: "1px solid rgba(76, 91, 212, 0.43)",
            maxHeight: "200px",
            height: "200px",
            overflow: "auto",
          }}
          className="mt-6 p-2"
        >
          <Table
            bordered={false}
            pagination={false}
            rowSelection={{ ...rowSelection }}
            dataSource={dataTable}
            columns={columns}
            rowClassName="editable-row"
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
