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
import type { UploadProps } from "antd";
import { setArr } from "@/redux/reducer/thiet_lap_cong_ty";
import { getCompIdCS } from "@/pages/api/BaseApi";
import { toast } from "react-toastify";
import ResultSearch from "./resultSearch";
import { updateDiagram } from "@/redux/reducer/diagram";
import {
  openModalAdd,
  openModalAddCoCau,
  updateOrganize,
} from "../../reducer/reducer";
const { Text } = Typography;

export default function ThemCoCauCaoNhat() {
  const [showLine, setShowLie] = useState(true);
  const open = useSelector((state: RootState) => state.tlct.openModalAddCoCau);
  const isLoad = useSelector((state: RootState) => state.diagram.updateDiagram);
  const isUpdateOrg = useSelector(
    (state: RootState) => state.tlct.updateOrganize
  );
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const props: UploadProps = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} Update thành công`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
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
          key: "Mô tả",
          value: value_0,
        },
        ...content,
      ],
      level: 1,
      parentId: 0,
      listOrganizeDetailId: [],
    };

    try {
      const fetcher = async () => {
        return await instance.post(Constant.organizeDetail_create, valueSend);
      };
      const fetcher3 = async () => {
        return await instance.post(
          Constant.organizeDetail_addListUser,
          listUsers
        );
      };
      const result = await fetcher();
      let listOrganizeDetailId = result?.data?.data?.data?.listOrganizeDetailId;
      let organizeDetailId = result?.data?.data?.data?.id;

      const listUsers = {
        listUsers: managerUser,
        organizeDetailId: organizeDetailId,
        listOrganizeDetailId: listOrganizeDetailId,
      };
      const result3 = await fetcher3();
      if (result?.data?.data?.result && result3?.data?.data?.result) {
        formRef.current?.resetFields();
        setResult(false);
        toast(result?.data?.data?.message);
        dispatch(updateDiagram(!isLoad));
        dispatch(updateOrganize(!isUpdateOrg));
        dispatch(openModalAdd(false));
        dispatch(openModalAddCoCau(false));
      } else {
        toast.error(result?.data?.data?.error?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  const handleCloseModal = () => {
    formRef.current?.resetFields();
    setResult(false);
    dispatch(openModalAdd(false));
    dispatch(openModalAddCoCau(false));
  };
  const [managerUser, setManagerUser] = useState([]);
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
            label="Tên tổ chức "
            name="organizeDetailName"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input placeholder="Nhập" size="large" />
          </Form.Item>

          <div
            style={{
              borderBottom: "1px dashed #ccc",
            }}
            className="mb-4 max-w-100 font-size-16"
          >
            Mô tả
          </div>

          <Form.Item name={"value_0"}>
            <Input.TextArea
              style={{
                minHeight: "100px",
              }}
              placeholder="Thêm mô tả"
              size="large"
            />
          </Form.Item>
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
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
