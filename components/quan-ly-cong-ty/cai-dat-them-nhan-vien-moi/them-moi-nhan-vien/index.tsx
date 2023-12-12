import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Col, Form, Row, Input, DatePicker, Button, Modal } from "antd";
import { Select } from "antd";
import instance from "@/components/hooks/axios.config";
import { getCompIdCS } from "@/pages/api/BaseApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
+dayjs.extend(customParseFormat);

export default function ThemNguoiDung({ onOk, closeModalAdd, handleLoad }) {
  const com_id = getCompIdCS();
  const [form] = Form.useForm();
  const [setting, setSetting] = useState([]);
  const [selectOrganizeDetail, setSelectOrganizeDetail] = useState();
  const [list, setList] = useState([]);
  const [listOrganizeDetailId, setListOrganizeDetailId] = useState(null);
  const [listPo, setListPo] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [listDis, setListDis] = useState([]);
  const format = "DD/MM/YYYY";
  useEffect(() => {
    let data = {
      com_id: com_id,
    };
    const fetcher = async () => {
      return await instance.post("api/qlc/organizeDetail/listAll", data);
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();
        setList(data?.data?.data?.data);
        setSetting(data?.data?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    unFollow();
  }, []);
  useEffect(() => {
    let data = {
      com_id: com_id,
    };
    const fetcher = async () => {
      return await instance.post("api/qlc/positions/listAll", data);
    };
    const unFollow = async () => {
      try {
        const data = await fetcher();

        const newData = data?.data?.data?.data?.map((item, index) => ({
          key: index,
          label: item?.positionName,
          value: item?.id,
        }));
        setListPo(newData);
      } catch (err) {
        console.error(err);
      }
    };
    unFollow();
  }, []);
  useEffect(() => {
    fetch("/data/district.json")
      .then((res) => res.json())
      .then((d) => {
        setCity(d.city);
        setDistrict(d.district);
      });
  }, []);
  const handleSelect = async (e) => {};
  const handleSelect2 = async (e) => {
    const item = list.filter((item) => item.id === Number(e));

    if (item?.length > 0) {
      setListOrganizeDetailId(item[0]?.listOrganizeDetailId);
    }
    setSelectOrganizeDetail(e);
  };

  const handleSelectCity = (e) => {
    const dis = district.filter((dis) => dis.cit_parent === e);
    const newDis = dis?.map((d, index) => ({
      label: d.cit_name,
      value: d.cit_id,
      key: index,
    }));
    setListDis(newDis);
  };
  const [date, setDate] = useState<any>();
  const onChangeDate = (date, dateString) => {
    setDate(date);
  };
  const onFinish = async (value) => {
    const object = {
      phoneTK: value.TkSdt,
      userName: value.userName,
      phone: value.TkSdt,
      district_id: value.district_id,
      city_id: value.province_id,
      address: value.address,
      gender: value.gender,
      birthday: dayjs(date).format("YYYY-MM-DD"),
      listOrganizeDetailId: listOrganizeDetailId,
      organizeDetailId: selectOrganizeDetail,
      position_id: value.position_id,
      education: value.trinh_do_hv,
      married: value.tinh_trang_hon_nhan,
      experience: value.kinh_nghiem,
    };

    try {
      const fetcher = async () => {
        return await instance.post(
          "/api/qlc/managerUser/createUserNew",
          object
        );
      };
      const result = await fetcher();
      if (result?.data?.data?.result) {
        window.alert("Thêm mới người dùng thành công");
        form.resetFields();
        closeModalAdd();
        handleLoad(result.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  const validatePhoneNumber = (rule, value, callback) => {
    const phoneNumberRegex =
      /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i;

    if (value == "" || value == undefined) {
      callback("Tài khoản không được để trống");
    }
    if (!phoneNumberRegex.test(value)) {
      callback("Số điện thoại chỉ được từ 10 đến 11 số và không chứa ký tự");
    } else {
      callback();
    }
  };

  const AgeValidator = (rule, value, callback) => {
    if (value) {
      const selectedDate = value.$y;
      const currentYear = new Date().getFullYear();
      if (selectedDate == currentYear) {
        callback("Năm sinh không thể trùng với năm hiện tại.");
      }
    }
    if (value == "" || value == undefined) {
      callback("Năm sinh không được để trống");
    } else {
      callback();
    }
  };

  return (
    <>
      <Modal
        open={onOk}
        title={
          <div style={{ width: "100%", paddingTop: 20 }}>
            <div
              className={styles.title}
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              Thêm mới nhân viên
            </div>
          </div>
        }
        bodyStyle={{ padding: "20px 24px" }}
        width={850}
        footer={null}
        onCancel={closeModalAdd}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          form={form}
          size="small"
          name="form"
        >
          <Row gutter={[18, 18]}>
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Tài khoản (số điện thoại)"
                required
                name="TkSdt"
                rules={[
                  {
                    required: true,
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Nhập số điện thoại"
                  allowClear
                  type="number"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Họ và tên"
                required
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="text"
                  allowClear
                  placeholder="Họ và tên"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item label="Mật khẩu mặc định " required name="matKhau">
                <Input
                  size="large"
                  placeholder="hungha365"
                  allowClear
                  disabled
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Tỉnh thành"
                required
                name="province_id"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  allowClear
                  showSearch
                  onClear={() => {
                    form.setFieldsValue({
                      district_id: null,
                    });
                    setListDis([]);
                  }}
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onSelect={handleSelectCity}
                  virtual={false}
                  options={city?.map((c, index) => ({
                    label: c.cit_name,
                    value: c.cit_id,
                    key: index,
                  }))}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Quận huyện"
                required
                name="district_id"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
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
                  options={listDis}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Địa chỉ chi tiết"
                required
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Input size="large" allowClear placeholder="Nhập" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Giới tính"
                required
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  virtual={false}
                  options={[
                    {
                      label: "Nam",
                      value: 1,
                    },
                    {
                      label: "Nữ",
                      value: 2,
                    },
                    {
                      label: "Khác",
                      value: 3,
                    },
                  ]}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Ngày sinh"
                required
                name="birthday"
                rules={[
                  {
                    required: true,
                    validator: AgeValidator,
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  placeholder="dd/mm/yyyy"
                  style={{
                    width: "100%",
                  }}
                  format={format}
                  changeOnBlur
                  onChange={onChangeDate}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Trình độ học vấn"
                required
                name="trinh_do_hv"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  allowClear
                  showSearch
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  virtual={false}
                  size="large"
                  options={[
                    {
                      label: "Trên Đại học",
                      value: 1,
                    },
                    {
                      label: "Đại học",
                      value: 2,
                    },
                    {
                      label: "Cao đẳng",
                      value: 3,
                    },
                    {
                      label: "Trung cấp",
                      value: 4,
                    },
                    {
                      label: "Đào tạo nghề",
                      value: 5,
                    },
                    {
                      label: "Trung học phổ thông",
                      value: 6,
                    },
                    {
                      label: "Trung học cơ sở",
                      value: 7,
                    },
                    {
                      label: "Tiểu học",
                      value: 8,
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Tình trạng hôn nhân"
                required
                name="tinh_trang_hon_nhan"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  allowClear
                  showSearch
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  virtual={false}
                  size="large"
                  options={[
                    {
                      label: "Độc thân",
                      value: 1,
                    },
                    {
                      label: "Đã lập gia đình",
                      value: 2,
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Kinh nghiệm làm việc"
                required
                name="kinh_nghiem"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  allowClear
                  showSearch
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  virtual={false}
                  size="large"
                  options={[
                    {
                      label: "Chưa có kinh nghiệm",
                      value: 1,
                    },
                    {
                      label: "Dưới 1 năm kinh nghiệm",
                      value: 2,
                    },
                    {
                      label: "1 năm",
                      value: 3,
                    },
                    {
                      label: "2 năm",
                      value: 4,
                    },
                    {
                      label: "3 năm",
                      value: 5,
                    },
                    {
                      label: "4 năm",
                      value: 6,
                    },
                    {
                      label: "5 năm",
                      value: 7,
                    },
                    {
                      label: "Trên 5 năm",
                      value: 8,
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Tổ chức"
                name="organizeDetailId"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  onSelect={handleSelect2}
                  allowClear
                  showSearch
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  size="large"
                  options={[
                    ...setting.map((item, index) => ({
                      key: index,
                      label: item?.organizeDetailName,
                      value: item?.id,
                    })),
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label="Chức vụ"
                required
                name="position_id"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder=" Chọn chức vụ"
                  allowClear
                  showSearch
                  onSelect={handleSelect}
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  size="large"
                  options={listPo}
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                className="flex"
                style={{
                  width: "100%",
                  margin: "auto",
                  justifyContent: "space-around",
                  marginBottom: "20px",
                }}
              >
                <Button
                  htmlType="reset"
                  size="large"
                  style={{
                    backgroundColor: "#ccc",
                    color: "#333",
                    width: "100%",
                    minWidth: "200px",
                  }}
                  onClick={closeModalAdd}
                >
                  <p> Hủy</p>
                </Button>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item
                className="flex"
                style={{
                  width: "100%",
                  margin: "auto",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%", minWidth: "200px" }}
                >
                  <p>Lưu</p>
                </Button>
              </Form.Item>
            </Col>
          </div>
        </Form>
      </Modal>
    </>
  );
}
