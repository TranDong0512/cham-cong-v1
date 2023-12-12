import React, { useEffect, useState } from "react";
import styles from "./ct.module.scss";
import Image from "next/image";
import ModalEdit from "./modal-edit/modaledit";
import ModalConfirm from "./modal-confirm/modalconfirm";
import { DELETE, POST, getCompIdCS, getCompIdSS } from "@/pages/api/BaseApi";
import { positionLabel } from "@/utils/function";
import dayjs from "dayjs";
import ModalSuccess from "./modal-success/modalsuccess";
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
} from "antd";
import { EditChiTietModal, listDevices } from "./edit-Modal/editModal";

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

const ChiTiet = ({ listIPs, listWifis, listEmps }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [personalSettingSelected, setPersonalSettingSelected] = useState({});
  const [gmtString, setGmtString] = useState(getGMTOffset());

  const [param, setParam] = useState({
    orgId: undefined,
    posId: undefined,
    idQLC: undefined,
    shiftId: undefined,
    wfId: undefined,
    loId: undefined,
    ipId: undefined,
  });
  const [listOrg, setListOrg] = useState([]);
  const [listPos, setListPos] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listShifts, setListShifts] = useState([]);
  const [listip, setListIps] = useState([]);
  const [listLoc, setListLoc] = useState([]);
  const [listWifi, setListWifi] = useState([]);
  const [recall, setRecall] = useState(false);
  // const [dataPb, setDataPb] = useState()
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
    };

    getData();
  }, [param]);

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

  const [form] = Form.useForm();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await POST("api/qlc/settingTimesheet/list", {});
      setListData(res?.data);
    };

    getList();
  }, [recall]);

  const onFinish = async (value) => {
    if (dayjs(value.start_time) > dayjs(value.end_time)) {
      window.alert("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
      return;
    } else {
      const data = {
        ...value,
        list_shifts: value?.list_shifts?.includes("all")
          ? []
          : value?.list_shifts?.map((item) => ({
              id: Number(item?.split("-")?.[0]),
              type_shift: Number(item?.split("-")?.[1]),
            })),
        list_pos: value?.list_pos?.includes("all") ? [] : value?.list_pos,
        list_emps: value?.list_emps?.includes("all") ? [] : value?.list_emps,
        start_time: value?.start_time
          ? dayjs(value?.start_time)?.format("YYYY-MM-DD")
          : undefined,
        end_time: value?.end_time
          ? dayjs(value?.end_time)?.format("YYYY-MM-DD")
          : undefined,
        list_device: value?.list_device?.includes("all")
          ? []
          : value?.list_device,
        list_wifi:
          value.list_wifi?.includes("Save") ||
          value.list_wifi?.includes("allSave")
            ? null
            : value.list_wifi,
        type_wifi: value.list_wifi?.includes("Save")
          ? 3
          : value.list_wifi?.includes("allSave")
          ? 2
          : null,
        list_loc:
          value.list_loc.includes("Save") || value.list_loc.includes("allSave")
            ? null
            : value.list_loc,
        type_loc: value.list_loc.includes("Save")
          ? 3
          : value.list_loc.includes("allSave")
          ? 2
          : null,
      };

      const res = await POST("api/qlc/settingTimesheet/add", data);

      if (res?.result) {
        window.alert("Thêm thành công");
        setRecall(!recall);
        form.resetFields();
      }
    }
  };

  const delSetting = async (item) => {
    const setting_id = item?.detail?.setting_id;

    if (setting_id >= 0) {
      if (window.confirm("Bạn có chắc muốn xóa cài đặt này?")) {
        const res = await POST("api/qlc/settingTimesheet/del", {
          setting_id: setting_id,
        });

        if (res?.result) {
          window.alert("Xóa thành công");
          setRecall(!recall);
        }
      }
    }
  };

  return (
    <>
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
              // list = {[
              //   { label: "Tất cả phòng ban", value: "all" },
              //   ...listOrg?.map((item) => ({
              //     label: item?.organizeDetailName,
              //     value: item?.id,
              //   }))
              // ]}
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

            <SelectBlock
              label={"Thiết bị"}
              name={"list_device"}
              placeholder={"Tìm theo thiết bị"}
              list={listDevices}
              onChange={() => null}
              textReq={"Chọn thiết bị áp dụng"}
            />
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
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Thời gian áp dụng</th>
                <th>Thời gian kết thúc</th>
                <th>Họ và tên</th>
                <th>Ca làm việc</th>
                <th>Vị trí</th>
                <th>Wifi</th>
                <th>Thiết bị</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.detail?.setting_name}</td>
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_org?.map((p) => (
                              <p>{p?.organizeDetailName}</p>
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
                              <p>{p?.positionName}</p>
                            ))}
                          </div>
                        }
                      >
                        {item?.list_pos?.length > 0 ? " Xem thêm" : "Tất cả"}
                      </Popover>
                    </td>
                    <td>
                      {item?.detail?.start_time &&
                        dayjs(
                          item?.detail?.start_time?.replace("Z", gmtString)
                        ).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {item?.detail?.end_time &&
                        dayjs(
                          item?.detail?.end_time?.replace("Z", gmtString)
                        ).format("DD/MM/YYYY")}
                    </td>
                    {/* <td>{item?.user_id}</td> */}
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_emps?.map((p) => (
                              <p>
                                {p?.userName} - {p?.idQLC}
                              </p>
                            ))}
                          </div>
                        }
                      >
                        {item?.list_emps?.length > 0 ? " Xem thêm" : "Tất cả"}
                      </Popover>
                    </td>
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_shifts?.map((p) => (
                              <p>{`${p?.shift_name} - ${
                                p?.type_shift === 1 ? "CA VÀO" : "CA RA"
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
                                {item?.detail.type_loc == 2 ? (
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
                          : item?.detail.type_loc == 2
                          ? "Tất cả vị trí được lưu"
                          : "Tất cả"}
                      </Popover>
                    </td>
                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.list_wifi.length > 0 ? (
                              <>
                                {item?.list_wifi?.map((p) => (
                                  <p>{p?.name_wifi}</p>
                                ))}
                              </>
                            ) : (
                              <>
                                {item?.detail.type_wifi == 2 ? (
                                  <>
                                    {listWifi?.map((v) => (
                                      <p>{v?.name_wifi}</p>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p>Tất cả wifi</p>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        }
                      >
                        {item?.list_wifi?.length > 0
                          ? " Xem thêm"
                          : item?.detail.type_wifi == 2
                          ? "Tất cả vị trí được lưu"
                          : "Tất cả"}
                      </Popover>
                    </td>

                    <td>
                      <Popover
                        content={
                          <div style={{ padding: "10px" }}>
                            {item?.detail.list_device.length > 0 ? (
                              <>
                                {item?.detail.list_device
                                  .map((item) => item)
                                  .join(" - ")}
                              </>
                            ) : (
                              <p>Tất cả thiết bị</p>
                            )}
                          </div>
                        }
                      >
                        {item?.detail.list_device.length > 0
                          ? "Xem thêm"
                          : "Tất cả thiết bị"}
                      </Popover>
                    </td>
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
      {showModalEdit && (
        <EditChiTietModal
          open={showModalEdit}
          selectedRow={personalSettingSelected}
          setOpen={setShowModalEdit}
          recall={recall}
          setRecall={setRecall}
        />
      )}
    </>
  );
};

export default ChiTiet;
