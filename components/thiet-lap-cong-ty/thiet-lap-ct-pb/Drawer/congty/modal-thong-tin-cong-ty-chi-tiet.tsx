import React, { useEffect, useState } from "react";
import { Button, Image, Table, Typography, Descriptions, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import {
  sendData,
  setOpenDrawer,
  setOpenModalCompany,
  setOpenModalDepartments,
  update,
} from "@/redux/reducer/thiet_lap_cong_ty";
import ModalAddNewPosition from "@/components/thiet-lap-cong-ty/Modal/them-co-cau/them-co-cau";
import instance from "@/components/hooks/axios.config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import { getCompIdCS } from "@/pages/api/BaseApi";
import Link from "next/link";
const { Text } = Typography;
interface DataType {
  key: React.Key;
  name: string;
}
export default function ThongTinCongTy() {
  const dispatch = useDispatch();
  const updateData = useSelector((state: RootState) => state.setup.update);
  const data = useSelector((state: RootState) => state.setup.sendData);
  const close = useSelector((state: RootState) => state.setup.openDrawer);
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhân viên",
      key: "userName",
      render: (data) => {
        return (
          <div>
            <a href={`/quan-ly-nhan-vien?ep_id=${data.ep_id}`}>
              <Text
                style={{
                  color: "#4C5BD4",
                  cursor: "pointer",
                }}
                // onClick={() => {
                //     dispatch(setOpenModalCompany(false));
                //     dispatch(setOpenModalDepartments(true));
                //     dispatch(
                //         sendData({
                //             id: data?.id,
                //             name: data?.name,
                //         })
                //     );
                // }}
              >
                {data?.userName}
              </Text>
            </a>
          </div>
        );
      },
    },
    {
      title: "ID",
      dataIndex: "ep_id",
      align: "center",
      key: "ep_id",
    },
    {
      title: "Chức vụ",
      dataIndex: "positionName",
      align: "center",
      key: "positionName",
    },
  ];
  const [disabled, setDisabled] = useState(true);
  // const [dataInput, setDataInput] = useState(data.name);
  const [dataInput, setDataInput] = useState("data.name");
  const handleChange = (e) => {
    // setDataInput(e.target.value);
  };
  const handleEnter = () => {
    setDisabled(true);
  };
  const [openModalAddNewRank, setOpenModalAddNewRank] = useState(false);
  const handleCloseModalAddNewRank = () => {
    setOpenModalAddNewRank(false);
  };
  const [dataRes, setDataRes] = useState<any>([]);
  const com_id = getCompIdCS();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const unFollow = async () => {
      const fetch = async () => {
        return await instance.post("api/qlc/organizeDetail/listAll", {
          id: data,
          com_id: com_id,
        });
      };
      const fetchUser = async (listOrganizeDetailId) => {
        return await instance.post("api/qlc/managerUser/listUser ", {
          listOrganizeDetailId: listOrganizeDetailId,
          ep_status: "Active",
          pageSize: 1000,
        });
      };
      const dataRes = await fetch();
      let info = dataRes?.data?.data?.data[0];
      setDataRes(info);
      const user = await fetchUser(info?.listOrganizeDetailId);
      const newUser = user?.data?.data?.data?.map((item, index) => ({
        ...item,
        key: index,
      }));
      setUser(newUser);
    };
    unFollow();
  }, [data]);

  // const handleDelete = async () => {
  //     try {
  //         const fetcher = async () => {
  //             return await instance.post("api/qlc/organizeDetail/delete", {
  //                 // id: data.id,
  //             });
  //         };
  //         const result = await fetcher();
  //         if (result?.statusText === "    OK") {
  //             alert("Xóa thành công");
  //             dispatch(update(!updateData));
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };
  return (
    <div>
      <div className="flex flex-space-between mb-16 flex-align-center">
        <div className="flex flex-align-center">
          <div>
            {/* <Input
                            bordered={false}
                            value={dataRes?.organizeDetailName}
                            disabled={disabled}
                            onChange={handleChange}
                            onPressEnter={handleEnter}
                            suffix={
                                <div className="flex">
                                    <div className="ml-8 cursor-pointer">
                                        <Image
                                            src="/img/qlc_edit.png"
                                            alt="Tìm việc 365"
                                            onClick={() => setDisabled(false)}
                                            preview={false}
                                        />
                                    </div>
                                    <div className="ml-8 cursor-pointer">
                                        <Image
                                            src="/img/qlc_delete.png"
                                            onClick={handleDelete}
                                            alt="Tìm việc 365"
                                            preview={false}
                                        />
                                    </div>
                                </div>
                            }
                        /> */}
            <Text>{dataRes?.organizeDetailName}</Text>
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(setOpenDrawer(!close));
          }}
        >
          <Image
            width={28}
            src="/img/close_b5.png"
            alt="Tìm việc 365"
            preview={false}
          />
        </div>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
        }}
      >
        <div
          className="pt-16 px-16"
          style={{
            borderBottom: "1px solid #ccc",
            minHeight: "300px",
          }}
        >
          <div className="mb-8">
            <Text>Thông tin chi tiết:</Text>
          </div>

          <Descriptions
            labelStyle={{
              width: "160px",
            }}
            column={1}
            items={dataRes?.content?.map((item, index) => ({
              key: index,
              label: item.key,
              children: item.value,
            }))}
          />
        </div>
        <div className="flex m-16 flex-align-center flex-space-between">
          <div>DANH SÁCH ĐƠN VỊ TRỰC THUỘC</div>
          {/* <Button
                        className="flex flex-align-center"
                        icon={
                            <Image
                                preview={false}
                                src="/img/add_blue.png"
                                alt="Tìm việc 365"
                            />
                        }
                        size="large"
                        style={{
                            backgroundColor: "#E4E7FF",
                            color: "#4C5BD4",
                        }}
                        onClick={() => setOpenModalAddNewRank(true)}
                    >
                        Thêm cơ cấu
                    </Button> */}
        </div>
        <ModalAddNewPosition
          data={dataRes?.settingOrganizeId}
          open={openModalAddNewRank}
          close={handleCloseModalAddNewRank}
        />
        <div className="min-h-400">
          <Table
            columns={columns}
            dataSource={user}
            style={{
              height: "100%",
            }}
            pagination={{
              pageSize: 5,
            }}
            // onRow={(record: any, rowIndex) => {
            //     return {
            //         onClick: () => {
            //             dispatch(
            //                 sendData({
            //                     id: record?.id,
            //                     name: record?.name,
            //                 })
            //             );
            //         },
            //     };
            // }}
          />
        </div>
      </div>
    </div>
  );
}
