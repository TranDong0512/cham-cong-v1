import React, { useEffect, useState } from "react";
import { Button, Form, Select, Row, Col, Input, Checkbox } from "antd";
import { Modal, Typography, Upload, message, Image } from "antd";
import type { FormInstance } from "antd/es/form";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeQLC";
import instance from "@/components/hooks/axios.config";
import Constant, { organizeDetail } from "../../../constant/constant";
import { update } from "@/redux/reducer/thiet_lap_cong_ty";
import ResultSearch from "./resultSearch";
import type { UploadProps } from "antd";
import { setArr } from "@/redux/reducer/thiet_lap_cong_ty";
import { getCompIdCS } from "@/pages/api/BaseApi";
import { toast } from "react-toastify";
import { updateOrganize } from "../../reducer/reducer";
const { Text } = Typography;
interface SelectType {
  parentId?: string;
  level?: string;
  listOrganizeDetailId?: [];
  id?: number;
}
export default function ThemCoCau({ close, open }) {
  const [showLine, setShowLie] = useState(true);
  const [dataSelect, setDataSelect] = useState([]);
  const isLoad = useSelector((state: RootState) => state.tlct.updateOrganize);
  const isLoadUpdate = useSelector((state: RootState) => state.setup.update);

  const formRef = React.useRef<FormInstance>(null);

  // const props: UploadProps = {
  //     name: "file",
  //     action: "",
  //     headers: {
  //         authorization: "authorization-text",
  //     },

  //     onChange(info) {
  //         if (info.file.status !== "uploading") {
  //             console.log(info.file, info.fileList);
  //         }
  //         if (info.file.status === "done") {
  //             message.success(`${info.file.name} Update thành công`);
  //         } else if (info.file.status === "error") {
  //             message.error(`${info.file.name} file upload failed.`);
  //         }
  //     },
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    const unFollow = async () => {
      const fetcher = async () => {
        return await instance.post(organizeDetail.listAll, {
          com_id: com_id,
        });
      };

      try {
        const data = await fetcher();
        setDataSelect(data?.data?.data?.data);
      } catch (err) {
        console.log(err?.response?.data?.error?.message);
      }
    };
    unFollow();
  }, [isLoad]);
  const handleSubmit = async ({
    organizeDetailName,
    label,
    value_0,
    content = [],
  }) => {
    let valueSend;
    console.log(content);
    if (label === 1) {
      selected?.listOrganizeDetailId.pop();

      valueSend = {
        parentId: selected?.parentId,
        level: selected?.level,
        listOrganizeDetailId: selected?.listOrganizeDetailId,
      };
    }
    if (label === 2) {
      valueSend = {
        parentId: selected?.id,
        level: selected?.level + 1,
        listOrganizeDetailId: selected?.listOrganizeDetailId,
      };
    }

    const listUsersPositions = {
      listUsersPositions: managerUser || [],
    };

    try {
      const fetcher = async () => {
        return await instance.post(Constant.organizeDetail_create, {
          organizeDetailName: organizeDetailName,
          content: [
            {
              key: "Mô tả",
              value: value_0,
            },
            ...base64,
            ...content,
          ],
          ...valueSend,
        });
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
      let id = result?.data?.data?.data?.id;

      const result2 = await fetcher2();
      const listUsers = {
        listUsers: managerUser,
        organizeDetailId: id,
        listOrganizeDetailId: list,
      };
      const result3 = await fetcher3();
      if (
        result?.data?.data?.result &&
        result2?.data?.data?.result &&
        result3?.data?.data?.result
      ) {
        formRef.current?.resetFields();
        dispatch(updateOrganize(!isLoad));
        dispatch(update(!isLoadUpdate));
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
  const com_id = getCompIdCS();
  const [selected, setSelected] = useState<SelectType>();
  const handleSelect = (e) => {
    const item = dataSelect?.filter((item) => item.id === e);
    setSelected(item[0]);
  };

  const data: any = [
    {
      label: "Text",
      value: "Text",
    },
    {
      label: "Ảnh",
      value: "Img",
    },
  ];

  const [typeInputs, setTypeInputs] = useState(["Text"]);

  const handleSelectOptionsInput = (type, index) => {
    const updatedTypeInputs = [...typeInputs];
    updatedTypeInputs[index] = index >= 0 ? type : "Text";
    setTypeInputs(updatedTypeInputs);
  };

  const [result, setResult] = useState(false);
  const [managerUser, setManagerUser] = useState([]);
  const [base64, setBase64] = useState<any>([]);
  const handleFileChange = (info) => {
    if (info.file.status === "done" && info.file.originFileObj) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Data: string | ArrayBuffer = e.target.result;
        setBase64((prev) => [
          ...prev,
          {
            key: valueTitle,
            type: 1,
            value: base64Data,
          },
        ]);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };
  const [valueTitle, setValueTitle] = useState("");
  const setValueTitleFC = (e) => {
    setShowLie(false);
    setValueTitle(e.target.value);
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      onSuccess("Ok");
    } catch (err) {
      onError("Tải thất bại");
    }
  };
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
            label="Tên cấp tổ chức "
            name="organizeDetailName"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input placeholder="Nhập" size="large" />
          </Form.Item>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={8} sm={8}>
              <Form.Item initialValue={1} name="label">
                <Select
                  placeholder="Chọn"
                  virtual={false}
                  options={[
                    {
                      label: "Ngang cấp",
                      value: 1,
                    },
                    {
                      label: "Dưới cấp",
                      value: 2,
                    },
                  ]}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={16} sm={16}>
              <Form.Item name="select">
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
                  onSelect={handleSelect}
                  options={[
                    ...dataSelect?.map((item) => ({
                      label: item.organizeDetailName,
                      key: item.id,
                      value: item.id,
                    })),
                  ]}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex mb-8 ">
            <div
              style={{
                borderBottom: "1px dashed #ccc",
              }}
            >
              Mô tả
            </div>
          </div>
          <Form.Item name={"value_0"}>
            <Input placeholder="Nhập" size="large" />
          </Form.Item>

          <Form.List name="content">
            {(fields, { add, remove }) => {
              const customAdd = () => {
                const updatedTypeInputs = [...typeInputs];
                updatedTypeInputs.push("Text");
                setTypeInputs(updatedTypeInputs);
                add();
              };
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
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
                                onChange={setValueTitleFC}
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
                        <div className="mt-6 mb-6">
                          <Row gutter={[16, 16]}>
                            <Col xs={16} md={16} sm={16}>
                              <Form.Item name={[name, "value"]}>
                                {typeInputs[key] === "Text" ? (
                                  <Input placeholder="Nhập" size="large" />
                                ) : (
                                  <></>
                                )}
                              </Form.Item>
                              <div
                                style={{
                                  marginTop: "-38px",
                                  marginBottom: "10px",
                                }}
                              >
                                {typeInputs[key] === "Img" ? (
                                  <Upload
                                    customRequest={uploadImage}
                                    onChange={handleFileChange}
                                    accept=".jpg, .jpeg, .png"
                                  >
                                    <Button
                                      icon={<UploadOutlined rev={"xxx"} />}
                                      size="large"
                                    >
                                      Tải ảnh lên
                                    </Button>
                                  </Upload>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Col>
                            <Col xs={8} md={8} sm={8}>
                              <Select
                                size="large"
                                defaultValue={"Text"}
                                style={{
                                  width: "100%",
                                }}
                                options={data}
                                onSelect={(e) =>
                                  handleSelectOptionsInput(e, key)
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                      </div>
                    );
                  })}
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
                        onClick={() => customAdd()}
                      >
                        <span className="color-white">Thêm thông tin</span>
                      </Button>
                    </div>
                  </div>
                </>
              );
            }}
          </Form.List>
          <Form.Item>
            <ResultSearch
              result={result}
              setResult={setResult}
              setManagerUser={setManagerUser}
            />
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
              <span className="color-white">Thêm</span>
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
