import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  Select,
  Table,
} from "antd";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
//   import ModalAddQr from "./modalAdd";
import instance from "../hooks/axios.config";
import { DELETE, POST, getCompIdCS, getCompIdSS } from "@/pages/api/BaseApi";
// import type { ColumnsType } from "antd/es/table";
import { listDevices, EditChiTietModal } from "./editModal";

export default function ChamCongQR({keyChildren}) {
  const [listOrg, setListOrg] = useState([]);
  const [listPos, setListPos] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listShifts, setListShifts] = useState([]);
  const [listip, setListIps] = useState([]);
  const [listLoc, setListLoc] = useState([]);
  const [listWifi, setListWifi] = useState([]);
  const [listQRCode, setListQRCode] = useState([]);
  const [reload, setReload] = useState([]);
  const [recall, setRecall] = useState(false);
  const [update, setUpdate] = useState(false);
  const [InitId, setInitId] = useState();
  const [initName, setInitName] = useState();
  const [param, setParam] = useState({
    orgId: undefined,
    posId: undefined,
    idQLC: undefined,
    shiftId: undefined,
    wfId: undefined,
    loId: undefined,
    ipId: undefined,
    QRId: undefined,
  });

  useEffect(() => {
    const getData = async () => {
      const res = await POST("api/qlc/timekeeping/filterComp", param);
      if (res?.result) {
        setListOrg(res?.listOrg);
        setListPos(res?.listPos);
        setListUsers(res?.listUsers);
        setListShifts(res?.listShifts);
        setListIps(res?.listIp);
        setListLoc(res?.listLoc);
        setListWifi(res?.listWifi);
      }

      const res1 = await POST("api/qlc/qrCode/listAll", param);

      if (res1?.result) {
        setListQRCode(res1?.data);
      }
    };

    getData();
  }, [param]);

  function getGMTOffset() {
    const now = new Date();
    const offsetMinutes = now.getTimezoneOffset();

    // Convert the offset to hours and minutes
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMinutesPart = Math.abs(offsetMinutes % 60);

    // Determine if it's a positive or negative offset
    const sign = offsetMinutes > 0 ? "-" : "+";

    // Format the offset as "+HH:mm" or "-HH:mm"
    const formattedOffset = `${sign}${String(offsetHours).padStart(
      2,
      "0"
    )}:${String(offsetMinutesPart).padStart(2, "0")}`;

    return formattedOffset;
  }

  const [gmtString, setGmtString] = useState(getGMTOffset());
  const [form] = Form.useForm();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const res = await POST("api/qlc/qrCode/listSettingTrackingQR", {});
      setListData(res?.data);
    };

    getList();
  }, [recall]);

  useEffect(() => {
    form.resetFields()
  }, [keyChildren])

  const SelectBlock = ({
    name,
    label,
    placeholder,
    list,
    onChange,
    multiple = true,
    textReq,
  }) => {
    return (
      <Col sm={6} xs={24}>
        <Form.Item
          style={{ marginRight: "20px" }}
          name={name}
          rules={[{ required: true, message: `${textReq}` }]}
          label={
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>{label}</p>
          }
          labelCol={{ span: 24 }}
        >
          <Select
            mode={multiple && "multiple"}
            showSearch
            allowClear
            optionFilterProp="label"
            style={{ border: "1px solid #ACACAC", borderRadius: "10px" }}
            size="large"
            placeholder={placeholder}
            options={list}
            onChange={(val) => onChange(val)}
          />
        </Form.Item>
      </Col>
    );
  };

  const SelectDate = ({ name, placeholder, label, onChange, textReq }) => {
    return (
      <Col sm={6} xs={24}>
        <Form.Item
          style={{ marginRight: "20px" }}
          name={name}
          rules={[{ required: true, message: `${textReq}` }]}
          label={
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>{label}</p>
          }
          labelCol={{ span: 24 }}
        >
          <DatePicker
            allowClear
            style={{
              border: "1px solid #ACACAC",
              borderRadius: "10px",
              width: "100%",
            }}
            size="large"
            placeholder={placeholder}
            format={"DD-MM-YYYY"}
          />
        </Form.Item>
      </Col>
    );
  };

  const onFinish = async (value) => {
    const data = {
      // ...value,
      name: value.setting_name,
      list_org: value?.list_org,
      list_shifts: value?.list_shifts?.includes("all")
        ? []
        : value?.list_shifts?.map((item) => ({
            id: Number(item?.split("-")?.[0]),
            type_shift: Number(item?.split("-")?.[1]),
          })),

      list_pos: value?.list_pos?.includes("all") ? [] : value?.list_pos,
      listUsers: value?.list_emps?.includes("all") ? [] : value?.list_emps,
      start_time: value?.start_time
        ? dayjs(value?.start_time)?.format("YYYY-MM-DD")
        : undefined,
      end_time: value?.end_time
        ? dayjs(value?.end_time)?.format("YYYY-MM-DD")
        : undefined,
      QRCode_id: value?.QRCode_id,
      // list_device: value?.list_device,
      // list_device: [1],
      list_ip:
        value.list_wifi?.includes("Save") ||
        value.list_wifi?.includes("allSave")
          ? null
          : value.list_wifi,
      list_loc:
        value.list_loc.includes("Save") || value.list_loc.includes("allSave")
          ? null
          : value.list_loc,

      type_ip: value.list_wifi?.includes("Save")
        ? 3
        : value.list_wifi?.includes("allSave")
        ? 2
        : null,
      type_loc: value.list_loc.includes("Save")
        ? 3
        : value.list_loc.includes("allSave")
        ? 2
        : null,
    };
    const res = await POST("api/qlc/qrCode/SettingTrackingQR", data);

    if (res?.result) {
      window.alert("Thêm thành công");
      setRecall(!recall);
      form.resetFields();
    }
  };

  const delSetting = async (item) => {
    const id = item?.id;

    if (id >= 0) {
      if (window.confirm("Bạn có chắc muốn xóa cài đặt này?")) {
        const res = await POST("api/qlc/qrCode/deleteSettingTrackingQR", {
          id: id,
        });
        window.alert("Xóa thành công");
        setRecall(!recall);
      }
    }
  };
  // Hàm lấy tên từ id
  const getNamePos = (id) => {
    for (let i = 0; i < listPos.length; i++) {
      if (listPos[i].id === id) {
        return listPos[i].positionName;
      }
    }
  };

  const getNameOrg = (id) => {
    for (let i = 0; i < listOrg.length; i++) {
      if (listOrg[i].id === id) {
        return listOrg[i].organizeDetailName;
      }
    }
  };


  const getNameShift = (id) => {
    for (let i = 0; i < listShifts.length; i++) {
      if (listShifts[i].shift_id === id) {
        return listShifts[i].shift_name;
      }
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const unFollow = async () => {
      const fetcher = async () => {
        return await instance.post("/api/qlc/qrCode/listAll");
      };
      try {
        const result = await fetcher();
        const datas = result?.data?.data?.data?.map((data, index) => ({
          ...data,
          stt: index + 1,
          label: data.QRCodeName,
          value: data.id,
        }));
        setData(datas);
      } catch (err) {}
    };
    unFollow();
  }, []);


  const [showModalEdit, setShowModalEdit] = useState(false);
  const [personalSettingSelected, setPersonalSettingSelected] = useState({});
  return (
    <div>
      <div className={styles.chi_tiet}>
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col sm={6} xs={24}>
              <Form.Item
                name={"setting_name"}
                style={{ marginRight: "20px" }}
                rules={[{ required: true, message: "Nhập tên cài đặt" }]}
                label={
                  <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                    Tên cài đặt
                  </p>
                }
                labelCol={{ span: 24 }}
              >
                <Input
                  style={{ border: "1px solid #ACACAC", borderRadius: "10px" }}
                  size="large"
                  placeholder="Tên cài đặt"
                />
              </Form.Item>
            </Col>
            <SelectBlock
              label={"Phòng ban"}
              name={"list_org"}
              placeholder={"Tìm theo phòng ban"}
              list={listOrg?.map((item) => ({
                label: item?.organizeDetailName,
                value: item?.id,
              }))}
              onChange={(val) => {
                const selected = listOrg?.find((item) => item?.id === val);
                setParam({ ...param, orgId: selected?.listOrganizeDetailId });
              }}
              multiple={true}

              textReq={"Chọn phòng ban"}
            />
            <SelectBlock
              label={"Chức vụ"}
              name={"list_pos"}
              placeholder={"Chọn chức vụ"}
              list={[
                { label: "Tất cả chức vụ", value: "all" },
                ...listPos?.map((item) => ({
                  label: item?.positionName,
                  value: item?.id,
                })),
              ]}
              onChange={(val) => {
                let pos = val;
                if (val?.includes("all")) pos = [];
                setParam({ ...param, posId: pos });
                form.resetFields(["list_emps", "list_shifts"]);
              }}
              textReq={"Chọn chức vụ"}
            />
            <SelectBlock
              label={"Họ và tên"}
              name={"list_emps"}
              placeholder={"Tìm theo id nhân viên"}
              list={[
                { label: "Tất cả nhân viên", value: "all" },
                ...listUsers?.map((item) => ({
                  label: `${item?.userName} - ${item?.idQLC}`,
                  value: item?.idQLC,
                })),
              ]}
              onChange={(val) => {
                setParam({ ...param, idQLC: val });
              }}
              textReq={"Chọn nhân viên"}
            />
            <SelectDate
              label={"Thời gian bắt đầu"}
              name={"start_time"}
              onChange={() => null}
              placeholder={"DD/MM/YYYY"}
              textReq={"Chọn thời gian bắt đầu"}
            />
            <SelectDate
              label={"Thời gian kết thúc"}
              name={"end_time"}
              onChange={() => null}
              placeholder={"DD/MM/YYYY"}
              textReq={"Chọn thời gian kết thúc"}
            />
            <SelectBlock
              label={"Ca làm việc"}
              name={"list_shifts"}
              placeholder={"Tìm theo ca làm việc"}
              list={[
                { label: "Tất cả các ca", value: "all" },
                ...listShifts?.map((item) => ({
                  label: `${item?.shift_name} - ${
                    item?.type === 1 ? "CA VAO" : "CA RA"
                  }`,
                  value: `${item?.shift_id}-${item?.type}`,
                })),
              ]}
              onChange={() => null}
              textReq={"Chọn ca làm việc"}
            />

            <SelectBlock
              label={"Vị trí"}
              name={"list_loc"}
              placeholder={"Tìm theo vị trí"}
              list={[
                { label: "Tất cả vị trí", value: "Save" },
                { label: "Tất cả vị trí đã được lưu", value: "allSave" },
                ...listLoc?.map((item) => ({
                  label: item?.cor_location_name,
                  value: item?.cor_id,
                })),
              ]}
              onChange={() => null}
              textReq={"Chọn vị trí áp dụng"}
            />

            <SelectBlock
              label={"Wifi"}
              name={"list_wifi"}
              placeholder={"Tìm theo Wifi"}
              list={[
                { label: "Tất cả wifi", value: "Save" },
                { label: "Tất cả wifi đã được lưu", value: "allSave" },
                ...listWifi?.map((item) => ({
                  label: item?.name_wifi,
                  value: item?.id,
                })),
              ]}
              onChange={() => null}
              textReq={"Chọn wifi áp dụng"}
            />

            <Col sm={6} xs={24}>
              <Form.Item
                name={"QRCode_id"}
                style={{ marginRight: "20px" }}
                rules={[{ required: true, message: "Chọn mã QR áp dụng" }]}
                label={
                  <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                    QR Code
                  </p>
                }
                labelCol={{ span: 24 }}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="label"
                  style={{ border: "1px solid #ACACAC", borderRadius: "10px" }}
                  size="large"
                  placeholder={"Chọn QRCode"}
                  options={data}
                ></Select>
              </Form.Item>
            </Col>

            {/* <SelectBlock
              label={"Thiết bị"}
              name={"list_device"}
              placeholder={"Tìm theo thiết bị"}
              list={listDevices}
              onChange={() => null}
              textReq={"Chọn thiết bị áp dụng"}
            /> */}
            <Col sm={6} xs={24}>
              <Form.Item
                label={<p style={{ fontWeight: "bold", fontSize: "18px" }}></p>}
                labelCol={{ span: 24 }}
              >
                <Button
                  htmlType="submit"
                  size="large"
                  style={{
                    backgroundColor: "#4c5bd4",
                    border: "1px solid #ACACAC",
                    width: "50%",
                  }}
                >
                  <p style={{ color: "#fff" }}>Áp dụng</p>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className={styles.khoi_under}>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên cài đặt</th>
                <th>Mã QR</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Thời gian áp dụng</th>
                <th>Thời gian kết thúc</th>
                {/* <th>ID</th> */}
                <th>Họ và tên</th>
                <th>Ca làm việc</th>
                <th>Vị trí</th>
                <th>Wifi</th>
                {/* <th>IP</th> */}
                {/* <th>Thiết bị</th> */}
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>
                      <img src={item?.QRCodeUrl} alt="Image" />
                    </td>
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_org?.map((p) => (
                              <p>{getNameOrg(p)}</p>
                            ))}
                          </div>
                        }
                      >
                        {item?.list_org?.length > 0 ? " Xem thêm" : "Tất cả"}
                      </Popover>
                    </td>
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_pos?.map((p) => (
                              <p>{getNamePos(p)}</p>
                            ))}
                          </div>
                        }
                      >
                        {item?.list_pos?.length > 0 ? " Xem thêm" : "Tất cả"}
                      </Popover>
                    </td>
                    <td>
                      {item?.start_time &&
                        dayjs(item?.start_time?.replace("Z", gmtString)).format(
                          "DD/MM/YYYY"
                        )}
                    </td>
                    <td>
                      {item?.end_time &&
                        dayjs(item?.end_time?.replace("Z", gmtString)).format(
                          "DD/MM/YYYY"
                        )}
                    </td>
                    {/* <td>{item?.user_id}</td> */}
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_userName?.map((p) => (
                              <p>{p}</p>
                            ))}
                          </div>
                        }
                      >
                        {item?.listUsers?.length > 0 ? " Xem thêm" : "Tất cả"}
                      </Popover>
                    </td>
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_shifts?.map((p) => (
                              <p>{`${getNameShift(p?.id)} - ${
                                p?.type_shift === 1 ? "CA VAO" : "CA RA"
                              }`}</p>
                            ))}
                          </div>
                        }
                      >
                        {item?.list_shifts?.length > 0 ? " Xem thêm" : "Tất cả"}
                      </Popover>
                    </td>

                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_loc?.length > 0 ? (
                              <>
                                {item?.list_loc?.map((p) => (
                                  <p>{p?.cor_location_name}</p>
                                ))}
                              </>
                            ) : (
                              <>
                                {item?.type_loc == 2 ? (
                                  <>
                                    {listLoc?.map((v) => (
                                      <p>{v?.cor_location_name}</p>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p>Tất cả vị trí</p>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        }
                      >
                        {item?.list_loc?.length > 0
                          ? " Xem thêm"
                          : item?.type_loc == 2
                          ? "Tất cả vị trí được lưu"
                          : "Tất cả"}
                      </Popover>
                    </td>


                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_name_wifi?.map((p) => (
                              <p>{p}</p>
                            ))}
                          </div>
                        }
                      >
                        {item?.list_name_wifi?.length > 0
                          ? " Xem thêm"
                          : "Tất cả"}
                      </Popover>
                    </td>

                    {/* <td>
                      <Popover
                        content={ 
                          <div style={{ padding: "10px" }}>
                            {item?.list_device.length > 0 ? (
                              <>
                                {item?.list_device
                                  .map((item) => deviceMapping[item])
                                  .join(" - ")}
                              </>
                            ) : (
                              <p>Tất cả thiết bị</p>
                            )}
                          </div>
                        }
                      >
                        {item?.list_device.length > 0
                          ? "Xem thêm"
                          : "Tất cả thiết bị"}
                      </Popover>
                    </td> */}
                    {/* <td>
                              <Popover
                                content={
                                  <div style={{ padding: '10px' }}>
                                    {item?.list_ip?.map((p) => (
                                      <p>{p?.ip_access}</p>
                                    ))}
                                  </div>
                                }>
                                {item?.list_ip?.length > 0 ? ' Xem thêm' : 'Tất cả'}
                              </Popover>
                            </td> */}
                    <td>
                      <div
                        className={styles.actions}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          className={styles.edit}
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            setPersonalSettingSelected(item);
                            setShowModalEdit(true);
                          }}
                        >
                          <Image
                            src="/img/edit-2.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </div>
                        <div
                          className={styles.del}
                          onClick={() => delSetting(item)}
                        >
                          <Image
                            src="/img/fluent_delete-16-filled.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div>
                <Table columns={columns} dataSource={data} />
            </div> */}
      <EditChiTietModal
        open={showModalEdit}
        selectedRow={personalSettingSelected}
        setOpen={setShowModalEdit}
        recall={recall}
        setRecall={setRecall}
      />
    </div>
  );
}
