import React, { useEffect, useState } from "react";
import { Button, Form, Select, Row, Col, Input, Checkbox } from "antd";
import { Modal, Typography, Upload, message, Image } from "antd";
import type { FormInstance } from "antd/es/form";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import instance from "@/components/hooks/axios.config";
import Constant from "../../../constant/constant";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
import ResultSearch from "./resultSearch";
import type { UploadProps } from "antd";
import { setArr } from "@/redux/reducer/thiet_lap_cong_ty";
import { getCompIdCS } from "@/pages/api/BaseApi";
import { toast } from "react-toastify";
const { Text } = Typography;

export default function ThemCoCau({ close, open }) {
  const [showLine, setShowLie] = useState(true);
  const [useSelect, setUserSelect] = useState([]);
  const [dataSelect1, setDataSelect1] = useState([]);
  const [dataSelect2, setDataSelect2] = useState([]);
  const isLoad = useSelector((state: RootState) => state.setup.update);
  const [parentId, setParentId] = useState([]);
  const [settingOrganizeId, setSettingOrganizeId] = useState();
  const formRef = React.useRef<FormInstance>(null);
  const [base64, setBase64] = useState<string>();

  const props: UploadProps = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} Update thành công`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const dispatch = useDispatch();
  const arr = useSelector((state: RootState) => state.setup.arr);
  const handleSubmit = async ({
    organizeDetailName,
    key_0,
    value_0,
    content = [],
  }) => {
    const valueSend = {
      organizeDetailName: organizeDetailName,
      content: [
        {
          key: key_0,
          value: value_0,
        },
        ...content,
      ],
      level: level,
      settingOrganizeId: settingOrganizeId,
      parentId: parentId,
      useSelect: useSelect,
      listOrganizeDetailId: listOrganizeDetailId,
    };
    const listUsersPositions = {
      listUsersPositions: arr || [],
    };

    try {
      const fetcher = async () => {
        return await instance.post(Constant.organizeDetail_create, valueSend);
      };
      const fetcher2 = async () => {
        return await instance.post(
          Constant.positions_createUsersPositions,
          listUsersPositions
        );
      };
      const fetcher3 = async () => {
        return await instance.post(
          Constant.organizeDetail_addListUser,
          listUsers
        );
      };
      const result = await fetcher();
      let list = result?.data?.data?.data?.listOrganizeDetailId;
      const result2 = await fetcher2();
      const listUsers = {
        listUserIdNew: arr,
        level: level + 1,
        listOrganizeDetailId: list,
      };
      const result3 = await fetcher3();
      if (
        result?.data?.data?.result &&
        result2?.data?.data?.result &&
        result3?.data?.data?.result
      ) {
        formRef.current?.resetFields();
        dispatch(update(!isLoad));
        dispatch(setArr([]));
        setResult(false);
        toast(result?.data?.data?.message);
      } else {
        toast.error(result?.data?.data?.error?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  const handleCloseModal = () => {
    formRef.current?.resetFields();
    dispatch(setArr([]));
    setResult(false);
    close();
  };
  const [level, setLevel] = useState(0);
  const [listOrganizeDetailId, setListOrganizeDetailId] = useState([]);
  useEffect(() => {
    const unFollow = async () => {
      const fetcher = async () => {
        return await instance.post("api/qlc/settingOrganize/listAllChoose");
      };

      try {
        const data = await fetcher();
        setDataSelect1(data?.data?.data?.data);
      } catch (err) {
        console.log(err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad]);
  const [showChoose, setShowChoose] = useState(true);
  const com_id = getCompIdCS();
  const handleSelect1 = async (e) => {
    const item: any = dataSelect1.filter((data) => {
      return data.id === Number(e);
    });
    setSettingOrganizeId(e);
    if (item[0]?.level === 1 && item[0]?.parentId === 0) {
      setShowChoose(false);
    } else {
      const id = item[0]?.parentId;
      setShowChoose(true);

      const fetcher = async () => {
        return await instance.post(Constant.organizeDetail_listAll, {
          settingOrganizeId: id,
          com_id: com_id,
        });
      };
      try {
        const data = await fetcher();
        setDataSelect2(data?.data?.data?.data);
      } catch (err) {
        alert("Error: " + err?.response?.data?.error?.message);
      }
      setLevel(item[0]?.level);
    }
  };
  const handleSelect2 = (e) => {
    const item: any = dataSelect2.filter((data) => {
      return data.id === Number(e);
    });
    setParentId(e);
    setListOrganizeDetailId(item[0]?.listOrganizeDetailId);
  };
  const [typeInput, setTypeInput] = useState("Text");
  const handleSelectOptionsInput = (e) => {
    setTypeInput(e);
  };
  const [result, setResult] = useState(false);

  return (
    <Modal
      open={open}
      onCancel={handleCloseModal}
      wrapClassName="CustomerModal"
      footer={false}
    >
      <div
        className="px-24 py-16"
        style={{
          backgroundColor: "#4C5BD4",
        }}
      >
        <Text className="color-white font-size-16">Thêm cơ cấu tổ chức</Text>
      </div>
      <div className="p-16">
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          ref={formRef}
          size="small"
        >
          <Form.Item
            required
            rules={[{ required: true, message: "Không được để trống" }]}
            name="settingOrganizeId"
          >
            <Select
              placeholder="Chọn"
              allowClear
              showSearch
              filterOption={(input, option: any) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              virtual={false}
              onSelect={handleSelect1}
              options={dataSelect1?.map((d, index) => ({
                label: d?.organizeName,
                value: d?.id,
                key: d?.id,
              }))}
              size="large"
            />
          </Form.Item>
          {showChoose ? (
            <Form.Item
              label="Thuộc"
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
              required
              name="parentId"
            >
              <Select
                placeholder="Chọn"
                allowClear
                showSearch
                filterOption={(input, option: any) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onSelect={handleSelect2}
                virtual={false}
                options={dataSelect2?.map((d, index) => ({
                  label: d?.organizeDetailName,
                  value: d?.id,
                  key: d?.id,
                }))}
                size="large"
              />
            </Form.Item>
          ) : (
            <></>
          )}
          <Form.Item
            required
            label="Tên cấp tổ chức "
            name="organizeDetailName"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input placeholder="Nhập" size="large" />
          </Form.Item>
          <div>
            <div className="flex mb-8 ">
              <div>
                <Form.Item
                  name={"key_0"}
                  style={{
                    marginBottom: "-4px",
                  }}
                >
                  <Input
                    bordered={false}
                    placeholder="Thêm tiêu đề"
                    onChange={() => setShowLie(false)}
                    style={{
                      borderBottom: showLine ? "1px dashed #ccc" : "none",
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item name={"value_0"}>
              <Input placeholder="Nhập" size="large" />
            </Form.Item>
          </div>
          <Form.List name="content">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
                    <div className="flex mb-8 flex-space-between">
                      <div>
                        <Form.Item
                          name={[name, "key"]}
                          style={{
                            marginBottom: "-20px",
                          }}
                        >
                          <Input
                            bordered={false}
                            placeholder="Thêm tiêu đề"
                            onChange={() => setShowLie(false)}
                            style={{
                              borderBottom: showLine
                                ? "1px dashed #ccc"
                                : "none",
                            }}
                          />
                        </Form.Item>
                      </div>
                      <div
                        className="cursor-pointer flex"
                        onClick={() => remove(name)}
                      >
                        <Text
                          style={{
                            color: "#FF3333",
                          }}
                          className="mr-4"
                        >
                          Xóa
                        </Text>
                        <Image
                          src="/thiet_lap_cong_ty/delete.svg"
                          preview={false}
                          alt="xxx"
                        />
                      </div>
                    </div>
                    <Row gutter={[16, 16]}>
                      <Col xs={16} md={16} sm={16}>
                        <Form.Item name={[name, "value"]}>
                          {typeInput === "Text" ? (
                            <Input placeholder="Nhập" size="large" />
                          ) : (
                            <></>
                          )}
                          {typeInput === "Img" ? (
                            <Upload {...props}>
                              <Button
                                icon={<UploadOutlined rev={"xxx"} />}
                                size="large"
                              >
                                Click to Upload
                              </Button>
                            </Upload>
                          ) : (
                            <></>
                          )}
                        </Form.Item>
                      </Col>
                      <Col xs={8} md={8} sm={8}>
                        <Select
                          size="large"
                          defaultValue={"Text"}
                          style={{
                            width: "100%",
                          }}
                          options={[
                            {
                              label: "Text",
                              value: "Text",
                            },
                            {
                              label: "Ảnh",
                              value: "Img",
                            },
                          ]}
                          onSelect={handleSelectOptionsInput}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
                <div className="flex flex-end">
                  <div className="max-w-160">
                    <Button
                      icon={
                        <Image
                          src="/img/plus.png"
                          alt="Tìm việc 365"
                          preview={false}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      }
                      block
                      size="large"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        backgroundColor: "#FF8642",
                      }}
                      onClick={() => add()}
                    >
                      Thêm thông tin
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Form.List>
          <Form.Item>
            <ResultSearch result={result} setResult={setResult} />
          </Form.Item>

          <div className="flex mt-16 flex-center">
            <Button
              className="min-w-120 mx-10"
              size="large"
              onClick={handleCloseModal}
            >
              Hủy
            </Button>
            <Button
              className="min-w-120 mx-10"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
