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
    console.log("data cu", data)
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
      width: data?.length ? "200px" : "150px",

    },
    {
      title: <p style={{ color: "#fff" }}>Họ tên (ID)</p>,
      render: (record: any) => (
        <p>
          {record?.ep_id} - {record?.ep_name}
        </p>
      ),
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Tổ chức</p>,
      render: (record: any) => {
        return <p>{record?.organizeDetailName || "Chưa cập nhật"}</p>;
      },
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Ngày tháng</p>,
      render: (record: any) => (
        <p>{moment(record?.ts_date)?.format("DD-MM-YYYY")}</p>
      ),
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Ca làm việc</p>,
      render: (record: any) => <p>{record?.shift_name || "Chưa cập nhật"}</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Thời gian làm việc (giờ)</p>,
      render: (record: any) => <p>{record?.hour_real || 0}</p>,
      align: "center",
      width: data?.length ? "300px" : "250px",
    },
    {
      title: <p style={{ color: "#fff" }}>Đi muộn (phút)</p>,
      render: (record: any) => <p>{record?.late || 0}</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Về sớm (phút)</p>,
      render: (record: any) => <p>{record?.early || 0}</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Công</p>,
      render: (record: any) => <p>{record?.num_to_calculate} công</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Tiền</p>,
      render: (record: any) => <p>{record?.num_to_money || 0} VNĐ</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Tiền theo giờ</p>,
      render: (record: any) => <p>{record?.money_per_hour || 0} VNĐ</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Phụ cấp ca</p>,
      render: (record: any) => <p>{record?.money_allowances || 0} VNĐ</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Cộng công</p>,
      render: (record: any) => <p>{record?.cong_xn_them || 0} công</p>,
      align: "center",
      width: data?.length ? "200px" : "150px",
    },
    {
      title: <p style={{ color: "#fff" }}>Cộng tiền</p>,
      render: (record: any) => (
        <p>{record?.tien_xn_them || record?.tientheogio_xn_them || 0} VNĐ</p>
      ),
      align: "center",
      width: data?.length ? "200px" : "150px",
    },


    {
      title: <p style={{ color: "#fff" }}>Chi tiết thời gian chấm công </p>,
      render: (record: any) => (
        <div style={{ display: "flex", overflow: "" }}>
          {record?.lst_time?.map((item, index) => (
            <p
              key={index}
              style={{ padding: "0px 20px", borderRight: "2px solid #000" }}
            >
              {moment(item)?.format("HH:mm:ss")}
            </p>
          ))}
        </div>
      ),
      align: "center",
      width: data?.length ? "200px" : "250px",
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
              onClick={() => handleXC(record)}
            >
              <SolutionOutlined /> <span>Xóa công</span>
            </div>
          </>
        );
      },
    },
  ];
  const check = (value) => {

    const data_new = listData.filter(e => e != value)
    setListData(data_new);

  }

  return (
    <>
      <div>
        <Table
          loading={loading}

          className={`table_xuat_cong`}
          columns={columns}
          dataSource={listData}
          sticky={true}
          scroll={{ x: data.length === 0 ? 0 : "max-content" }}
          // scroll={{ x: 2500 }}
          // scroll={{ x: "max-content" }}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 10,
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
          onClick={check}
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
