import { POST } from "@/pages/api/BaseApi";
import { Card, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

export default function DanhSachBatBuocLam() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState();
  const [param, setParam] = useState({ curPage: 1 });

  useEffect(() => {
    const getData = async () => {
      const res = await POST("api/qlc/employee/listForceWork", param);

      if (res?.result) {
        setList(res?.list);
        setTotal(res?.total);
        setLoading(false);
      }
    };

    getData();
  }, [param]);

  const cols: any = [
    {
      title: <p>Tên nhân viên</p>,
      render: (record) => (
        <p>
          {record?.id_user} - {record?.name_user}
        </p>
      ),
      align: "center",
    },
    {
      title: <p>Tên đề xuất</p>,
      render: (record) => <p>{record?.name_dx}</p>,
      align: "center",
    },
    {
      title: <p>Thời gian bắt đầu nghỉ - kết thúc nghỉ</p>,
      render: (record) => (
        <p>
          {record?.noi_dung?.nghi_phep?.nd?.map((item, indx) => (
            <p>
              {item?.bd_nghi} - {item?.kt_nghi}
            </p>
          ))}
        </p>
      ),
      align: "center",
    },
    {
      title: <p>Lý do</p>,
      render: (record) => <p>{record?.noi_dung?.nghi_phep?.ly_do}</p>,
      align: "center",
    },

    {
      title: <p>Thời gian tạo</p>,
      render: (record) => (
        <p>
          {record?.time_create &&
            moment(record?.time_create * 1000).format("HH:mm:ss DD-MM-YYYY")}
        </p>
      ),
      align: "center",
    },
    {
      title: <p>Thời gian từ chối</p>,
      render: (record) => (
        <p>
          {record?.time_create &&
            moment(record?.time_duyet).format("HH:mm:ss DD-MM-YYYY")}
        </p>
      ),
      align: "center",
    },
    {
      title: <p>Người duyệt</p>,
      render: (record) => (
        <div>
          {record?.info_duyet?.map((item, index) => (
            <p key={index}>
              {item?.idQLC} - {item?.userName}
            </p>
          ))}
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <Card title={<p>Danh sách bắt buộc đi làm</p>}>
      <Table
        columns={cols}
        bordered
        dataSource={list}
        scroll={{ x: "max-content" }}
        pagination={{
          total: total,
          pageSize: 20,
          showSizeChanger: false,
          position: ["bottomCenter"],
          onChange(page, pageSize) {
            setParam({ ...param, curPage: page });
          },
        }}
      />
    </Card>
  );
}
