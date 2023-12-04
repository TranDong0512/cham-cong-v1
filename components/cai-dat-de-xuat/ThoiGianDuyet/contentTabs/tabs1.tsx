import React, { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { Col, Row, Table, InputNumber, Image, ConfigProvider } from "antd";
import { Select, Typography, Form, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import instance from "@/components/hooks/axios.config";
import { toast } from "react-toastify";
import Constants from "../../Constant/constant";
interface DataType {
  key?: string;
  name_cate_dx?: string;
  time?: number;
  address?: string;
  id_dx?: number;
}
const { Text } = Typography;

export default function Tabs1() {
  const [dataTable, setDataTable] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [options, setOptions] = useState([]);

  const backup = async (data) => {
    try {
      let dataSend = {
        id_dx: data.id_dx,
      };
      const fetcher = async () => {
        return await instance.post(
          Constants.setting_resetTimeSetting,
          dataSend
        );
      };
      const result = await fetcher();
      if (result?.status === 200) {
        toast.success(result?.data?.message);
        setLoad(!load);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  const [load, setLoad] = useState(false);
  const [timeNew, setTimeNew] = useState(0);

  const save = async (data) => {
    try {
      let dataSend = {
        id_dx: data.id_dx,
        time: timeNew,
      };
      const fetcher = async () => {
        return await instance.post(
          Constants.setting_updateTimeSetting,
          dataSend
        );
      };
      const result = await fetcher();
      if (result?.status === 200) {
        toast.success(result?.data?.message);
        handleClickSave(data?.stt);
        setLoad(!load);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  const [timeDx, setTimeDx] = useState(0);
  useEffect(() => {
    const unFollow = async () => {
      try {
        const fetcher = async () => {
          return await instance.post("api/vanthu/setting/fetchTimeSetting");
        };
        const data = await fetcher();
        const dataTable = data?.data?.time_dx?.map((item, index) => ({
          ...item,
          stt: index + 1,
          key: index,
        }));
        const options = data?.data?.time_dx?.map((item, index) => ({
          label: item?.name_cate_dx,
          value: item?.id_dx,
          key: index,
        }));
        setInitialData(dataTable);
        setDataTable(dataTable);
        setOptions(options);
      } catch (err) {
        console.log(err);
      }
    };
    unFollow();
  }, [load]);
  const onEnter = (e) => {
    const newValue = e.target.value;
    setTimeDx(newValue);
    if (newValue === "") {
      setDataTable(initialData);
    } else {
      let filteredData = initialData.filter((data) => {
        return data?.time === Number(newValue);
      });
      setDataTable(filteredData);
    }
  };
  const handleSelect = (e) => {
    const newData = initialData?.filter((item) => item.id_dx === e);
    setDataTable(newData);
  };
  const [hiddenStates, setHiddenStates] = useState<Array<boolean>>(
    new Array(dataTable?.length).fill(false)
  );
  const handleClickEdit = (index: number) => {
    const newHiddenStates = [...hiddenStates];
    newHiddenStates[index] = true;
    setHiddenStates(newHiddenStates);
  };
  const handleClickSave = (index: number) => {
    const newHiddenStates = [...hiddenStates];
    newHiddenStates[index] = false;
    setHiddenStates(newHiddenStates);
  };
  const handleChange = (value: number) => {
    setTimeNew(value);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
      width: 60,
    },
    {
      title: "Loại đề xuất",
      align: "center",
      dataIndex: "name_cate_dx",
      key: "name_cate_dx",
    },
    {
      title: "Thời gian",
      align: "center",
      dataIndex: "",
      key: "time",
      width: 260,
      render: (data) => {
        return (
          <div className="flex flex-center">
            {!hiddenStates[data?.stt] ? (
              <div>
                <Text>{data?.time !== 0 ? data?.time : "Chưa cập nhập"}</Text>
              </div>
            ) : (
              <InputNumber
                style={{
                  width: "100%",
                }}
                defaultValue={data?.time}
                onChange={handleChange}
                onPressEnter={() => save(data)}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Hành động",
      align: "center",
      dataIndex: "",
      key: "actions",
      width: 140,
      render: (data) => {
        return (
          <div className="flex flex-center">
            {hiddenStates[data?.stt] ? (
              <CheckOutlined
                rev={"xxx"}
                style={{
                  marginRight: "16px",
                }}
                onClick={() => save(data)}
              />
            ) : (
              <></>
            )}
            {!hiddenStates[data?.stt] ? (
              <div className="mr-8">
                <Image
                  alt="xxx"
                  onClick={() => {
                    handleClickEdit(data?.stt);
                  }}
                  preview={false}
                  src="/tlct/edit.svg"
                />
              </div>
            ) : (
              <></>
            )}

            <Image
              alt="xxx"
              preview={false}
              style={{
                width: "24px",
                height: "24px",
              }}
              src="/tlct/backup.png"
              onClick={() => backup(data)}
            />
          </div>
        );
      },
    },
  ];
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
      <div>
        <Text
          style={{
            fontSize: "16px",
            color: "#474747",
            fontWeight: "500",
          }}
        >
          Thời gian duyệt đề xuất
        </Text>

        <Text
          style={{
            marginTop: "8px",
            display: "block",
          }}
        >
          Là thời gian tối đa để lãnh đạo duyệt 1 trong 24h đề xuất của nhân
          viên tính từ thời điểm nhân viên tạo đề xuất.
        </Text>
      </div>
      <div className="mt-16">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={12}>
            <div>
              <div className="w768hidden mb-8">Loại đề xuất</div>
              <Select
                size="large"
                onSelect={handleSelect}
                className="w-100"
                allowClear
                showSearch
                onClear={() => setDataTable(initialData)}
                filterOption={(input, option: any) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Loại đề xuất"
                options={options}
              />
            </div>
          </Col>

          <Col xs={12} sm={12} md={12}>
            <div>
              <span className="w768hidden mb-8">Thời gian duyệt đề xuất</span>
              <InputNumber
                size="large"
                onPressEnter={onEnter}
                style={{
                  width: "100%",
                }}
                placeholder="Chọn thời gian duyệt"
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="CustomerTable mt-16">
        <Table
          locale={locale}
          key={0}
          columns={columns}
          dataSource={dataTable}
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
}
