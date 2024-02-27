import { POST } from "@/pages/api/BaseApi";
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const listDevices = [
  { value: "all", label: "Tất cả thiết bị" },
  {
    value: "web",
    label: "CameraAI365",
  },
  {
    value: "app",
    label: "Appchat365",
  },
  { value: "qr", label: "QRChat365" },
];

export const EditChiTietModal = ({
  open,
  setOpen,
  selectedRow,
  setRecall,
  recall,
}) => {
  const [param, setParam] = useState({
    orgId: undefined,
    posId: undefined,
    idQLC: undefined,
    shiftId: undefined,
    wfId: undefined,
    loId: undefined,
    ipId: undefined,
  });
  console.log("selectedRow", selectedRow);
  const [form] = Form.useForm();
  const [listOrg, setListOrg] = useState([]);
  const [listPos, setListPos] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listShifts, setListShifts] = useState([]);
  const [listip, setListIps] = useState([]);
  const [listLoc, setListLoc] = useState([]);
  const [listWifi, setListWifi] = useState([]);
  useEffect(() => {
    form.setFieldsValue({
      ...selectedRow?.detail,
      start_time: dayjs(selectedRow?.detail?.start_time),
      end_time: dayjs(selectedRow?.detail?.end_time),
      list_shifts: selectedRow?.detail.list_shifts?.length == 0 ? 'Tất cả ca làm việc' : selectedRow?.detail?.list_shifts?.map(
        (item) => `${item?.id}-${item?.type_shift}`
      ),
      list_emps:
        selectedRow?.list_emps?.length == 0
          ? 'Tất cả nhân viên'
          : selectedRow?.list_emps?.map((item, index) => (item.idQLC)),
      list_pos:
        selectedRow?.detail?.list_pos?.length == 0
          ? 'Tất cả chức vụ'
          : selectedRow?.list_pos?.map((item, index) => ({
            label: item?.positionName,
            value: item?.id,
          })),
      list_wifi:
        selectedRow?.detail?.list_wifi.length != 0
          ? selectedRow?.detail?.list_wifi?.map((item, index) => (item))
          : selectedRow?.detail?.type_wifi == 2
            ? 'Tất cả wifi đã được lưu'
            : selectedRow?.detail?.type_wifi == 3
              ? "Tất cả wifi"
              : null,

      list_loc:
        selectedRow?.detail?.list_loc?.length != 0
          ? selectedRow?.list_loc?.map((item, index) => (item.cor_id))
          : selectedRow?.detail?.type_loc == 2
            ? "Tất cả vị trí đã được lưu"
            : selectedRow?.detail?.type_loc == 3
              ? "Tất cả vị trí"
              : null,

      list_device: selectedRow?.detail?.list_device?.length != 0 ?
        selectedRow?.detail.list_device?.map((item) => item)
        : 'Tất cả thiết bị',

    });
  }, [selectedRow]);

  useEffect(() => {
    const getData = async () => {
      const res = await POST("api/qlc/timekeeping/filterComp", {});

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
      <Col sm={12} xs={24}>
        <Form.Item
          style={{ marginRight: "20px" }}
          name={name}
          rules={[{ required: true, message: `${textReq}` }]}
          label={
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>{label}</p>
          }
          labelCol={{ span: 24 }}
          initialValue={selectedRow.detail.type_loc}
        >
          <Select
            mode={"multiple"}
            showSearch
            allowClear
            value={name}
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
      <Col sm={12} xs={24}>
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
    console.log("value", value)
    console.log("value?.list_shifts?.length", value?.list_shifts?.length)
    const data = {
      setting_id: selectedRow?.detail?.setting_id,
      ...value,

      list_emps: value?.list_emps?.includes('all') ? [] : value?.list_emps,

      list_pos: value?.list_pos?.includes('all') ? [] : value?.list_pos,

      start_time: value?.start_time
        ? dayjs(value?.start_time)?.format("YYYY-MM-DD")
        : undefined,
      end_time: value?.end_time
        ? dayjs(value?.end_time)?.format("YYYY-MM-DD")
        : undefined,
      list_shifts: !Array.isArray(value?.list_shifts?.length) ? [] : value?.list_shifts?.includes("all") ? [] : value?.list_shifts?.map(shift => {
        const [id, type_shift] = shift.split('-');
        return {
          id: parseInt(id),
          type_shift: parseInt(type_shift)
        };
      })
    };
    console.log("data", data);
    const res = await POST("api/qlc/settingTimesheet/edit", data);

    if (res?.result) {
      window.alert("Sửa thành công");
      setRecall(!recall);
      form.resetFields();
      setOpen(false);
    }
  };
  return (
    <Modal
      open={open}
      width={800}
      footer={null}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
    >
      <Form form={form} onFinish={onFinish} style={{ padding: "20px" }}>
        <Row>
          <Col sm={12} xs={24}>
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
            // initialValue={selectedRow.detail.listDevices}
            >
              <Input
                style={{
                  border: "1px solid #ACACAC",
                  borderRadius: "10px",
                  width: "100%",
                }}
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
            multiple={false}
            textReq={"Chọn phòng ban"}
          />
          <SelectBlock
            label={"Chức vụ"}
            name={"list_pos"}
            placeholder={"Tìm theo vị trí"}
            list={[
              { label: "Tất cả chức vụ", value: "all" },
              ...listPos?.map((item) => ({
                label: item?.positionName,
                value: item?.id,
              })),
            ]}
            onChange={(val) => {
              setParam({ ...param, posId: val });
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
              { label: "Tất cả ca làm việc", value: "all" },
              ...listShifts?.map((item) => ({
                label: `${item?.shift_name} - ${item?.type === 1 ? "CA VAO" : "CA RA"
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
              { label: "Tất cả vị trí", value: "Tất cả vị trí" },
              { label: "Tất cả vị trí đã được lưu", value: "Tất cả vị trí đã được lưu" },
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
              { label: "Tất cả wifi", value: "Tất cả wifi" },
              { label: "Tất cả wifi đã được lưu", value: "Tất cả wifi đã được lưu" },
              ...listWifi?.map((item) => ({
                label: item?.name_wifi,
                value: item?.id,
              })),
            ]}
            onChange={() => null}
            textReq={"Chọn wifi áp dụng"}
          />
          {/* <SelectBlock
            label={'Vị trí'}
            name={'list_loc'}
            placeholder={'Tìm theo vị trí'}
            list={listLoc?.map((item) => ({
              label: item?.cor_location_name,
              value: item?.cor_id,
            }))}
            onChange={() => null}
          />
          <SelectBlock
            label={'IP'}
            name={'list_ip'}
            placeholder={'Tìm theo IP'}
            list={listip?.map((item) => ({
              label: item?.ip_access,
              value: item?.id_acc,
            }))}
            onChange={() => null}
          /> */}

          <SelectBlock
            label={"Thiết bị"}
            name={"list_device"}
            placeholder={"Tìm theo thiết bị"}
            list={listDevices}
            onChange={() => null}
            textReq={"Chọn thiết bị áp dụng"}
          />
          <Col sm={12} xs={24}>
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
    </Modal>
  );
};
