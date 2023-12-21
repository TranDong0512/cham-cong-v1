import {
  Card,
  Row,
  Col,
  Form,
  Select,
  Button,
  InputNumber,
  Input,
  DatePicker,
  Popover,
} from "antd";
import styles from "./index.module.css";
import { TableThuongPhat } from "@/components/cai-dat-luong/thuong-phat/table-thuong-phat/table-thuong-phat";
import Image from "next/image";
import {
  GET,
  POST,
  POST_SS_TL,
  POST_TL,
  POST_VT_CONG,
  getCompIdCS,
  getCompIdSS,
} from "@/pages/api/BaseApi";
import moment from "moment";
import _ from "lodash";
import { useEffect, useState } from "react";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import { Router, useRouter } from "next/router";
import { removeVietnameseTones } from "@/constants/style-constants";
import { ExportExcellButton } from "@/utils/ExportExccel";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { ExportExcel } from "@/utils/btnExcel";

export default function ThuongPhat({ tpList, listPb, res }) {
  const [filterParam, setFilterParam] = useState<any>({
    year: moment().year(),
    month: moment().month() + 1,
    userName: "all",
  });
  const [listData, setListData] = useState(tpList);
  const [nameCty, setNameCty] = useState<any>();

  const [form] = Form.useForm();
  useEffect(() => {
    setNameCty(jwtDecode(Cookies.get("token_base365")));
    const getData = async () => {
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/take_thuong_phat", {
        month: filterParam?.month,
        year: filterParam?.year,
        id_com: com_id,
      });

      let finalData = [];
      finalData = res?.data?.data_final;

      //phong ban filter
      if (filterParam?.dep_id && filterParam?.dep_id !== "all") {
        finalData = finalData?.filter(
          (item: any) =>
            item?.inforUser?.inForPerson?.employee?.dep_id ===
            filterParam?.dep_id
        );
      }
      // name filter
      if (filterParam?.userName && filterParam?.userName !== "all") {
        finalData = finalData?.filter(
          (item: any) => item?.inforUser?.idQLC === filterParam?.userName
        );
      } else if (localStorage.getItem("userSelect")) {
        const userSelect = localStorage.getItem("userSelect");
        finalData = finalData?.filter(
          (item: any) => item.inforUser?.userName == userSelect
        );
        localStorage.removeItem("userSelect");
      }

      setListData(finalData);
    };

    getData();
  }, [filterParam]);
  const onFinish = (value) => {
    setFilterParam(value);
  };
  const [pbList, setPbList] = useState([]);
  // get data phong ban, nhan vien
  useEffect(() => {
    const com_id = Cookies.get("com_id");
    const getDataPb = async () => {
      const res = await POST("api/qlc/organizeDetail/listAll", { com_id });
      if (res?.result) {
        setPbList(
          res?.data?.map((item) => ({
            label: item?.organizeDetailName,
            value: item?.id,
          }))
        );
      }
    };

    getDataPb();
  }, []);
  const [openInsert, setOpenInsert] = useState(false);
  const [openInsertCong, setOpenInsertCong] = useState(false);
  const [typePop, setTypePop] = useState<any>(false);
  const content = (
    <div style={{ padding: "8px 14px" }}>
      <p
        onClick={() => {
          setTypePop(1);
          setOpenInsert(true);
        }}
        style={{
          cursor: "pointer",
          paddingBottom: 4,
          borderBottom: "1px solid black",
        }}
      >
        Thưởng phạt tiền
      </p>

      <p
        onClick={() => {
          setTypePop(2);
          setOpenInsertCong(true);
        }}
        style={{ cursor: "pointer", marginTop: 4 }}
      >
        Phạt công
      </p>
    </div>
  );
  return (
    <>
      <Card>
        <div className={styles.textHeader}>
          <p className={styles.textHeaderTop}>
            {`Danh sách thưởng phạt nhân viên tháng ${filterParam?.month}/
              ${filterParam?.year}`}
          </p>
          <p style={{ color: "#666" }}>
            Quản lý theo dõi thưởng, phạt nhân viên
          </p>
        </div>
        <Form form={form} onFinish={onFinish} initialValues={filterParam}>
          <Row gutter={[20, 10]} justify={"end"}>
            <Col lg={14} md={12} sm={24} xs={24}>
              <Row gutter={[20, 10]}>
                <Col sm={12} xs={24}>
                  <Form.Item name={"dep_id"} style={{ width: "100%" }}>
                    <Select
                      className={styles.select}
                      size="large"
                      placeholder="Chọn phòng ban"
                      options={[{ label: "Tất cả", value: "all" }, ...pbList]}
                      suffixIcon={
                        <Image
                          src={"/search-black.png"}
                          alt={""}
                          width={24}
                          height={24}
                        />
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col sm={12} xs={24}>
                  <Form.Item name={"userName"}>
                    <Select
                      className={styles.select}
                      size="large"
                      showSearch
                      placeholder="Nhập tên tìm kiếm"
                      options={
                        tpList && [
                          { label: "Tất cả", value: "all" },
                          ...tpList?.map((item) => ({
                            label: `${item?.inforUser?.idQLC} - ${item?.inforUser?.userName}`,
                            value: item?.inforUser?.idQLC,
                            labelNoVN: removeVietnameseTones(
                              `${item?.inforUser?.idQLC} - ${item?.inforUser?.userName}`
                            ),
                          })),
                        ]
                      }
                      filterOption={(input, option) =>
                        option?.label
                          ?.toString()
                          ?.toLowerCase()
                          ?.indexOf(input.toLowerCase()) >= 0 ||
                        option?.labelNoVN
                          ?.toLowerCase()
                          ?.indexOf(input.toLowerCase()) >= 0
                      }
                      suffixIcon={
                        <Image
                          className={styles.selectDrop}
                          src={"/down-arrow.png"}
                          alt={""}
                          width={9}
                          height={6}
                        />
                      }
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col lg={10} md={12} sm={24} xs={24}>
              <Row gutter={[20, 10]} justify={"end"}>
                <Col sm={9} xs={24}>
                  <Form.Item name={"year"}>
                    <Select
                      className={styles.select}
                      size="large"
                      showSearch
                      placeholder="Chọn năm"
                      options={_.range(2018, moment().year() + 1)?.map(
                        (item) => ({
                          label: `Năm ${item}`,
                          value: item,
                        })
                      )}
                      suffixIcon={
                        <Image
                          src={"/search-black.png"}
                          alt={""}
                          width={24}
                          height={24}
                        />
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col sm={9} xs={24}>
                  <Form.Item name={"month"}>
                    <Select
                      className={styles.select}
                      size="large"
                      showSearch
                      placeholder="Chọn tháng"
                      options={_.range(1, 13)?.map((item) => ({
                        label: `Tháng ${item}`,
                        value: item,
                      }))}
                      suffixIcon={
                        <Image
                          src={"/search-black.png"}
                          alt={""}
                          width={24}
                          height={24}
                        />
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col sm={6} xs={8}>
                  <Form.Item>
                    <Button
                      className={styles.buttonTop}
                      size="large"
                      htmlType="submit"
                      style={{ width: "max-content" }}
                    >
                      Thống kê
                    </Button>
                  </Form.Item>
                </Col>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                  className={styles.wrap}
                >
                  <Col
                    md={11}
                    sm={7}
                    style={{ minWidth: "max-content" }}
                    className={styles.wrap_btn}
                  >
                    <Popover content={content} title={null}>
                      <Button
                        size="large"
                        type="primary"
                        style={{ width: "100%" }}
                        // onClick={() => setOpenInsert(true)}
                      >
                        <p style={{ color: "#fff" }}>Thêm mới thưởng phạt</p>
                      </Button>
                    </Popover>
                  </Col>
                  <Col
                    md={11}
                    sm={7}
                    style={{ minWidth: "max-content" }}
                    className={styles.wrap_btn}
                  >
                    {/* <ExportExcellButton
                      fileHeaders={[
                        `Danh sách thưởng phạt tháng ${
                          moment().month() + 1
                        } ${moment().year()}`,
                      ]}
                      data={
                        listData
                          ? listData?.map((item) => [
                              `${item?.inforUser?.userName} - ${item?.inforUser?.idQLC}`,
                              `Thưởng: ${item?.tt_thuong?.tong_thuong} VNĐ`,
                              `Phạt: ${item?.tt_phat?.tong_phat} VNĐ`,
                            ])
                          : []
                      }
                      listkeys={["Họ tên(ID)", "Thưởng", "Phạt"]}
                      fileName={`Danh sách thưởng phạt tháng ${
                        moment().month() + 1
                      } ${moment().year()}`}
                      component={
                        <Button size="large" className={styles.buttonBottom}>
                          <Image
                            src={"/layers_light.png"}
                            alt={""}
                            width={24}
                            height={24}
                          ></Image>
                          <p style={{ marginLeft: "10px" }}>
                            Xuất file thống kê
                          </p>
                        </Button>
                      }
                    /> */}
                    <ExportExcel
                      title={`Danh sách thưởng phạt tháng ${
                        moment().month() + 1
                      } ${moment().year()}`}
                      columns={[
                        { header: "Họ tên(ID)", key: "col1", width: 45 },
                        { header: "Thưởng", key: "col1", width: 30 },
                        { header: "Phạt", key: "col2", width: 30 },
                      ]}
                      data={
                        listData
                          ? listData?.map((item) => [
                              `${item?.inforUser?.userName} - ${item?.inforUser?.idQLC}`,
                              `Thưởng: ${item?.tt_thuong?.tong_thuong} VNĐ`,
                              `Phạt: ${item?.tt_phat?.tong_phat} VNĐ`,
                            ])
                          : []
                      }
                      name={nameCty?.data.userName}
                      nameFile={"Danh_sach_thuong_phat"}
                      loading={false}
                      type={1}
                    ></ExportExcel>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
        </Form>
        <div className={styles.table}>
          <TableThuongPhat tpList={listData} />
        </div>
      </Card>

      {typePop == 1 && openInsert && (
        <Modal openInsert={openInsert} setOpenInsert={setOpenInsert} />
      )}

      {typePop == 2 && openInsertCong && (
        <ModalCong
          openInsertCong={openInsertCong}
          setOpenInsertCong={setOpenInsertCong}
        />
      )}
    </>
  );
}

const Modal = ({
  setOpenInsert,
  openInsert,
}: {
  setOpenInsert: Function;
  openInsert: boolean;
}) => {
  const [form2] = Form.useForm();
  const [listEmp, setListEmp] = useState([]);
  const [listFilterEmp, setListFilterEmp] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await POST("api/qlc/managerUser/listAll", {});
      if (res?.result) {
        const temp = res?.items?.map((item) => ({
          label: `${item?.ep_id}-${item?.ep_name}`,
          value: item?.ep_id,
          labelNoVN: removeVietnameseTones(`${item?.ep_id}-${item?.ep_name}`),
        }));
        setListEmp(temp);
        setListFilterEmp(temp);
      }
    };

    getList();
  }, []);
  const router = useRouter();
  const onFinishAdd = async () => {
    const val = form2.getFieldsValue();
    const com_id = getCompIdCS();
    const selectDate = dayjs(val?.pay_day);
    const body = {
      ...val,
      pay_day: selectDate?.format("YYYY-MM-DD"),
      pay_month: selectDate?.month() + 1,
      pay_year: selectDate?.year(),
      pay_id_com: com_id,
    };

    const res = await POST_TL("api/tinhluong/congty/insert_thuong_phat", body);

    if (res?.message === "success") {
      window.alert("Thêm thưởng/phạt thành công");
      router.reload();
    }
  };

  const children = (
    <>
      <Form form={form2}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc",
            },
          ]}
          label="Nhân viên"
          name={"pay_id_user"}
          labelCol={{ span: 24 }}
        >
          <Select
            options={listFilterEmp}
            size="large"
            showSearch
            placeholder="Tìm tên nhân viên"
            filterOption={(input, option) =>
              option?.label
                ?.toString()
                ?.toLowerCase()
                ?.indexOf(input.toLowerCase()) >= 0 ||
              option?.labelNoVN?.toLowerCase()?.indexOf(input.toLowerCase()) >=
                0
            }
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc",
            },
          ]}
          label="Loại thưởng phạt"
          name={"pay_status"}
          labelCol={{ span: 24 }}
        >
          <Select
            size="large"
            style={{ width: "100%" }}
            options={[
              {
                label: "Thưởng",
                value: 1,
              },
              {
                label: "Phạt",
                value: 2,
              },
            ]}
            placeholder="Loại thưởng phạt"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc",
            },
          ]}
          label="Số tiền"
          name={"pay_price"}
          labelCol={{ span: 24 }}
        >
          <InputNumber
            addonAfter={"VND"}
            size="large"
            style={{ width: "100%" }}
            placeholder="Nhập số tiền"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc",
            },
          ]}
          label="Thời gian"
          name={"pay_day"}
          labelCol={{ span: 24 }}
        >
          <DatePicker size="large" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Lý do" name={"pay_case"} labelCol={{ span: 24 }}>
          <TextArea size="large" rows={5} placeholder="Nhập lý do" />
        </Form.Item>
      </Form>
    </>
  );
  return ModalWrapper(
    openInsert,
    setOpenInsert,
    children,
    600,
    "Thêm mới thưởng phạt",
    "Thêm mới",
    onFinishAdd
  );
};

///////////////////////////////////////////////
const ModalCong = ({
  setOpenInsertCong,
  openInsertCong,
}: {
  setOpenInsertCong: Function;
  openInsertCong: boolean;
}) => {
  const [form3] = Form.useForm();
  const [listEmp, setListEmp] = useState([]);
  const [listFilterEmp, setListFilterEmp] = useState([]);
  const [listShift, setListShift] = useState<any>([]);
  const [cong, setCong] = useState<any>();
  const com_id = Cookies.get("com_id");
  const router = useRouter();
  const [day, setDay] = useState<any>();
  const [epId, setEpId] = useState<any>();

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const getList = async () => {
      const res = await POST("api/qlc/managerUser/listAll", {});
      if (res?.result) {
        const temp = res?.items?.map((item) => ({
          label: `${item?.ep_id}-${item?.ep_name}`,
          value: item?.ep_id,
          labelNoVN: removeVietnameseTones(`${item?.ep_id}-${item?.ep_name}`),
        }));
        setListEmp(temp);
        setListFilterEmp(temp);
      }
    };

    getList();
  }, []);

  useEffect(() => {
    let com_id = null;
    com_id = getCompIdCS();
    com_id &&
      epId &&
      POST_VT_CONG("api/vanthu/dexuat/empShiftInDay", {
        ep_id: Number(epId),
        day: day,
      }).then((res) => {
        setListShift(res.list);
      });
  }, [day, epId]);
  const onFinishAdd = async () => {
    const val = form3.getFieldsValue();
    const arrShift = [];
    if (val.list_shift_phatcong == "all") {
      listShift.map((item) => {
        return arrShift.push(item.shift_id);
      });
    } else {
      arrShift.push(Number(val.list_shift_phatcong));
    }
    const body = {
      ...val,
      com_id: com_id,
      list_shift_phatcong: arrShift,
    };
    const res = await POST_TL("api/tinhluong/congty/phatcong", body);
    if (res?.message === "success") {
      window.alert("Thêm phạt thành công");
      router.reload();
      // router.replace(router.asPath)
    }
  };

  const [valueChange, setValueChange] = useState<any>();
  const handleDay = (e) => {
    setDay(e.target.value);
  };

  const onChangeShift = (value: string) => {
    setValueChange(value);
    const so_cong = listShift.find((item) => item.shift_id == value)
      ?.num_to_calculate.$numberDecimal;
    setCong(so_cong);
  };

  const onChangeEmp = (value: string) => {
    setEpId(value);
  };
  let total = 0;
  const children = (
    <Form form={form3}>
      <Form.Item
        className={styles.formItem}
        name={"ep_id"}
        labelCol={{ span: 24 }}
        label={"Nhân viên áp dụng"}
        rules={[{ required: true, message: "Chọn nhân viên áp dụng!" }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          onChange={onChangeEmp}
          filterOption={filterOption}
          placeholder="Chọn nhân viên áp dụng"
          options={listEmp}
        ></Select>
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        name={"phatcong_time"}
        labelCol={{ span: 24 }}
        label={"Ngày áp dụng"}
        rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
      >
        <Input type="date" size="middle" onChange={(e) => handleDay(e)}></Input>
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        name={"list_shift_phatcong"}
        labelCol={{ span: 24 }}
        label={"Chọn ca phạt"}
        rules={[{ required: true, message: "Vui lòng chọn ca" }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          onChange={onChangeShift}
          filterOption={filterOption}
          placeholder="Chọn ca làm việc"
          options={[
            { value: "all", label: "Cả ngày" },
            ...listShift?.map((item, index) => ({
              value: item.shift_id,
              label: item.shift_name,
            })),
          ]}
        ></Select>
      </Form.Item>

      {valueChange !== "all" ? (
        <Form.Item labelCol={{ span: 24 }} label={"Chi tiết phạt công"}>
          <Input
            disabled
            value={cong == undefined ? "Số công: " : `Số công: ${cong}`}
          ></Input>
        </Form.Item>
      ) : (
        <>
          <Col>
            <p style={{ marginBottom: 8 }}>Chi tiết phạt công</p>
            {listShift?.map((item, index) => {
              total += Number(item.num_to_calculate.$numberDecimal);
              return (
                <div>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <Col span={11}>
                      <Input
                        disabled
                        value={item.shift_name}
                        style={{ width: "100%" }}
                      ></Input>
                    </Col>

                    <Col span={11}>
                      <Input
                        disabled
                        value={
                          "Số công: " + item.num_to_calculate.$numberDecimal
                        }
                        style={{ width: "100%" }}
                      ></Input>
                    </Col>
                  </Col>
                </div>
              );
            })}
          </Col>

          <Form.Item labelCol={{ span: 24 }} label={"Tổng số công"}>
            <Input disabled value={"Tổng số công: " + total}></Input>
          </Form.Item>
        </>
      )}

      <Form.Item
        className={styles.formItem}
        name={"ly_do"}
        labelCol={{ span: 24 }}
        label={"Lý do"}
        rules={[{ required: true, message: "Nhập lý do phạt" }]}
      >
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  );

  return ModalWrapper(
    openInsertCong,
    setOpenInsertCong,
    children,
    600,
    "Thêm mới phạt công",
    "Thêm mới",
    onFinishAdd
  );
};

export const getServerSideProps = async (context) => {
  const tpList: any[] = [];
  let com_id = null;
  com_id = getCompIdSS(context);

  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();

  const res = await POST_SS_TL(
    "api/tinhluong/congty/take_thuong_phat",
    {
      month: currentMonth,
      year: currentYear,
      id_com: com_id,
    },
    context
  );

  const listPbRes = await POST("api/qlc/department/list", {
    com_id: com_id,
  });

  return {
    props: {
      tpList: res?.data?.data_final || [],
      listPb: listPbRes?.items || [],
      res: res,
    },
  };
};
