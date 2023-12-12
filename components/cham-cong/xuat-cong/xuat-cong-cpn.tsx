import "./xuat-cong-cpn.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import moment from "moment";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SettingOutlined, SolutionOutlined } from "@ant-design/icons";
import PhatCong from "./phatcong";
import XoaCong from "./delete_cong";
import XoaLichLamViec from "./delete_llv";
export function xuatCong(
  data: any,
  totalPages: number,
  param: any,
  setParam: any,
  listDeps: any[],
  loading: boolean
) {
  const [listData, setListData] = useState<any>();
  useEffect(() => {
    setListData(data);
  }, [data]);
  const handleListData = (newData) => {
    setListData([...newData]);
  };
  const [openPC, setOpenPC] = useState<any>(false);
  const [openXC, setOpenXC] = useState<any>(false);
  const [openLLV, setOpenLVV] = useState<any>(false);
  const [valueSelect, setValueSelect] = useState<any>();
  const handleLVV = (dataSelect) => {
    setOpenLVV(true);
    setValueSelect(dataSelect);
  };
  const handleCloseLLV = () => {
    setOpenLVV(false);
  };
  const handleXC = (dataSelect) => {
    setOpenXC(true);
    setValueSelect(dataSelect);
  };
  const handleCloseXC = () => {
    setOpenXC(false);
  };
  const handleOpenPc = (dataSelect) => {
    setOpenPC(true);
    setValueSelect(dataSelect);
  };
  const handleClosePC = () => {
    setOpenPC(false);
  };
  const columns: ColumnsType<any> = [
    {
      title: <p style={{ color: "#fff" }}>Ảnh</p>,
      dataIndex: "url",
      align: "center",
      render: (record) => (
        <Image
          src={record?.user?.avatarUser || "/img/logo_com.png"}
          alt="/"
          width={46}
          height={46}
        />
      ),
      width: 100,
    },
    {
      title: <p style={{ color: "#fff" }}>Họ tên (ID)</p>,
      render: (record: any) => (
        <p>
          {record?._id} - {record?.user?.userName}
        </p>
      ),
      align: "center",
    },
    {
      title: <p style={{ color: "#fff" }}>Phòng ban</p>,
      render: (record: any) => {
        return (
          <p>{record?.organizeDetail?.organizeDetailName || "Chưa cập nhật"}</p>
        );
      },
      align: "center",
    },
    {
      title: <p style={{ color: "#fff" }}>Ngày tháng</p>,
      render: (record: any) => (
        <p>{moment(record?.at_time?.split("T")?.[0])?.format("DD-MM-YYYY")}</p>
      ),
      align: "center",
    },
    {
      title: <p style={{ color: "#fff" }}>Chi tiết thời gian chấm công </p>,
      render: (record: any) => (
        <div style={{ display: "flex", overflow: "scroll" }}>
          {record?.data?.map((item, index) => (
            <p
              key={index}
              style={{ padding: "0px 20px", borderRight: "2px solid #000" }}
            >
              {moment(item?.at_time)?.format("HH:mm:ss")}
            </p>
          ))}
        </div>
      ),
      align: "center",
    },
    {
      title: <p style={{ color: "#fff" }}>Chi tiết cộng công</p>,
      render: (record: any) => {
        if (record?.dexuat) {
          console.log(record?.dexuat);
        }
        return (
          <div style={{ display: "flex", width: "200px" }}>
            {record?.dexuat?.map((item, index) => (
              <Tooltip key={index} title={item?.name_dx}>
                <Link
                  href={`https://hungha365.com/van-thu-luu-tru/trang-quan-ly-de-xuat/${item?._id}`}
                  style={{
                    color: "#000",
                    fontSize: "16px",
                    textDecoration: "underline",
                    width: "max-content",
                    marginRight: "10px",
                    borderRight: "1px solid #000",
                    paddingRight: "10px",
                  }}
                  target="_blank"
                >
                  {item?.noi_dung?.xac_nhan_cong?.time_vao_ca} -
                  {item?.noi_dung?.xac_nhan_cong?.time_het_ca}
                </Link>
              </Tooltip>
            ))}
          </div>
        );
      },
      align: "center",
      width: "500px",
    },
    {
      title: "Hành động",
      width: 200,
      align: "center",
      render: (record) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
              onClick={() => handleOpenPc(record)}
            >
              <SettingOutlined />
              <span>Phạt công</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
              onClick={() => handleXC(record)}
            >
              <SolutionOutlined /> <span>Xóa công</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleLVV(record)}
            >
              <SolutionOutlined /> <span>Xóa lịch làm việc</span>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ overflowX: "scroll" }}>
        <Table
          loading={loading}
          className={`table_xuat_cong`}
          columns={columns}
          dataSource={listData}
          sticky={true}
          scroll={data.length == 0 ? { x: 2000 } : { x: "max-content" }}
          pagination={{
            position: ["bottomCenter"],
            // total: totalPages,
            // onChange(page, pageSize) {
            //   setParam({ ...param, curPage: page })
            // },
          }}
          rowKey={(record) => record?.["sheet_id"]}
        ></Table>
      </div>
      {openPC && (
        <PhatCong
          openPC={openPC}
          handleClosePC={handleClosePC}
          data={valueSelect}
          handleListData={handleListData}
          dataSource={data}
        ></PhatCong>
      )}

      {openXC && (
        <XoaCong
          openXC={openXC}
          handleCloseXC={handleCloseXC}
          data={valueSelect}
        ></XoaCong>
      )}

      {openLLV && (
        <XoaLichLamViec
          openLLV={openLLV}
          handleCloseLLV={handleCloseLLV}
          data={valueSelect}
        ></XoaLichLamViec>
      )}
    </>
  );
}
