import { Button, Col, Form, Image, Popover, Row, Select } from "antd";
import { MyTable } from "../../quan-ly-phong-ban/table/Table";
import { MySeachBar, MySelect } from "../../quan-ly-cong-ty-con/modal";
import styles from "./AllNhanVien.module.css";
import { useEffect, useState } from "react";

import { DeleteEmpModal, EditEmpModal, SetRoleModal } from "../modal/modal";
import { useRouter } from "next/router";
import { AddButton } from "@/components/commons/Buttons";
import { EDIT_ICON, KEY_ICON, TRASH_ICON } from "./icons";
import dayjs from "dayjs";
import { getPosition } from "@/utils/function";
import Avatar from "antd/es/avatar/avatar";
import { POST, getCompIdCS } from "@/pages/api/BaseApi";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { removeVietnameseTones } from "@/constants/style-constants";
import { CSVLink } from "react-csv";
import { getOrganizeDetail, getSettingOrganize } from "@/utils/BaseApi";
import ThemNguoiDung from "../them-moi-nhan-vien";

export function AllNhanVien({
  // listStaffs,
  openAddNew,
  setOpenAddNew,
  infoCom,
}: {
  // listStaffs: any
  openAddNew?: any;
  setOpenAddNew?: Function;
  infoCom: any;
}) {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [openSetRole, setOpenSetRole] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [data, setData] = useState([]);
  const [listStaffs, setListStaffs] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [openModalAdd, setOpenModalAdd] = useState<any>(false);
  const [load, setLoad] = useState<any>(false);

  const closeModalAdd = () => {
    setOpenModalAdd(false);
  };
  const [comLabel, setComLabel]: any = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  });
  const [param, setParam] = useState({
    curPage: 1,
    type: 0,
    ep_id: undefined,
    listOrganizeDetailId: undefined,
    pageSize: 10,
  });
  const [total, setTotal] = useState();
  const [listEmpLabel, setListEmpLabel] = useState<any>();
  const [selectedOrg, setSelectedOrg] = useState();
  // useEffect(() => {
  //   setData(listStaffs)
  //   setListEmpLabel(
  //     listStaffs?.map((e) => ({
  //       label: `${e?.ep_name} - ${e?.ep_id}`,
  //       value: e?.ep_id,
  //       labelNoVN: removeVietnameseTones(`${e?.ep_name}(${e?.ep_id})`),
  //     }))
  //   )
  // }, [listStaffs])

  useEffect(() => {
    const getListEmps = async () => {
      const com_id = getCompIdCS();

      if (com_id) {
        const res = await POST("api/qlc/employee/listEmpSimpleNoToken", {
          com_id: com_id,
          orgId: selectedOrg || undefined,
        });

        if (res?.result) {
          setListEmpLabel(
            res?.list?.map((e) => ({
              label: `${e?.idQLC} - ${e?.userName}`,
              value: e?.idQLC,
              labelNoVN: removeVietnameseTones(`${e?.userName}(${e?.idQLC})`),
            }))
          );
        }
      }
    };

    getListEmps();
  }, [selectedOrg, load]);
  // const [orgId, setOrgId] = useState()
  const [listOrg, setListOrg] = useState([]);
  const [listDetail, setListDetail] = useState([]);

  // useEffect(() => {
  //   const getList = async () => {
  //     const res = await getSettingOrganize()
  //     setListOrg(res)
  //   }

  //   getList()
  // }, [])
  // console.log(orgId)

  useEffect(() => {
    const getOrg = async () => {
      const res = await getOrganizeDetail();
      setListDetail(res);
    };
    getOrg();
  }, []);

  useEffect(() => {
    const getListEmps = async () => {
      const com_id = getCompIdCS();

      if (com_id) {
        const res = await POST("api/qlc/managerUser/listAllFilter", param);

        if (res?.result) {
          setListStaffs(res?.items);
          setTotal(res?.total);
        }
      }
    };

    getListEmps();
  }, [param, load]);
  const handleLoad = (data) => {
    setLoad(data);
  };
  const CustomPopover = ({ data }: { data: any }) => {
    const SingleItem = ({
      title,
      icon,
      onClick,
      isBlue,
    }: {
      title: string;
      icon: any;
      onClick: (event: any) => void;
      isBlue: boolean;
    }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={(event) => onClick(event)}
      >
        {icon}
        <p
          style={{ marginLeft: "10px", color: isBlue ? "#4C5BD4" : "#FF5B4D" }}
        >
          {title}
        </p>
      </div>
    );

    return (
      <div style={{ padding: "5px 15px" }}>
        <SingleItem
          icon={<EDIT_ICON />}
          title="Chỉnh sửa thông tin tài khoản"
          onClick={(event) => {
            event.stopPropagation();
            console.log(data);
            setSelectedData(data);
            setOpenEdit(true);
          }}
          isBlue={true}
        />
        <SingleItem
          icon={<KEY_ICON />}
          title="Phân quyền"
          onClick={(event) => {
            event.stopPropagation();
            setOpenSetRole(true);
          }}
          isBlue={true}
        />
        {/* <SingleItem
          icon={<TRASH_ICON />}
          title='Xóa thành viên'
          onClick={(event) => {
            event.stopPropagation()
            setOpenDelete(true)
          }}
          isBlue={false}
        /> */}
      </div>
    );
  };
  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }));

  const render0ToPhone = (input) => {
    if (!input) return "Chưa cập nhật";
    const condition = input?.startsWith("0");
    return condition ? input : "0" + input;
  };

  const columns = [
    {
      title: <p className="tableHeader">Ảnh</p>,
      render: (rc) => (
        <img
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
          }}
          src={"/img/logo_com.png"}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = "/img/logo_com.png";
          }}
        />
      ),
    },
    {
      title: <p className="tableHeader">Họ và tên</p>,
      render: (record: any) => (
        <p
          style={{ color: "#4C5BD4", cursor: "pointer" }}
          onClick={() => onRowClicked(record?.ep_id)}
        >
          {record?.ep_name || "Chưa cập nhật"} - {record?.ep_id}
        </p>
      ),
    },
    {
      title: <p className="tableHeader">SĐT</p>,
      render: (record: any) => (
        <p>{render0ToPhone(record?.phone || record?.ep_phone)}</p>
      ),
    },
    {
      title: <p className="tableHeader">Email</p>,
      render: (record: any) => (
        <p>{record?.ep_emailContact || record?.ep_email || "Chưa cập nhật"}</p>
      ),
    },
    {
      title: <p className="tableHeader">Phòng ban</p>,
      render: (record: any) => (
        <p>{record?.dep_name ? record?.dep_name : "Chưa cập nhật"}</p>
      ),
    },
    {
      title: <p className="tableHeader">Chức vụ</p>,
      render: (record: any) => (
        <p>
          {positionLabel?.find((p) => p?.value === record?.position_id)
            ?.label || "Chưa cập nhật"}
        </p>
      ),
    },
    {
      title: <p className="tableHeader">Tùy chỉnh</p>,
      render: (record: any) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Popover
            content={<CustomPopover data={record} />}
            placement="bottomRight"
            onOpenChange={(e) => {
              setCurrentRow(record);
            }}
            trigger={["click"]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Image alt="/" src={"/3dots.png"} width={3} height={15} />
              <p style={{ marginLeft: "5px", color: "#4C5BD4" }}>Tùy chỉnh</p>
            </div>
          </Popover>
        </div>
      ),
    },
  ];

  const onRowClicked = (id: any) => {
    router.push(`${router.pathname}/chi-tiet-nhan-vien/${id}`);
  };

  const [form] = Form.useForm();

  const onFinish = async (value) => {
    const body = {
      ...value,
      ep_id: value?.ep_id === "all" ? undefined : value?.ep_id,
    };

    if (value?.orgDetail) {
      const data = listDetail?.find((item) => item?.id === value?.orgDetail);

      body["listOrganizeDetailId"] = data?.listOrganizeDetailId;
    }

    setParam({
      ...param,
      ...body,
    });

    const res = await POST("api/qlc/managerUser/listAllFilter", param);

    if (res?.result) {
      setData(res?.items);
    }
  };
  const [selectedKey, setSelectedKey] = useState([]);
  const [delOpen, setDelOpen] = useState(false);

  const ModalDel = (open, setOpen) => {
    const onConfirm = async () => {
      console.log(selectedKey);
      const res = await POST("api/qlc/managerUser/delListUsers", {
        listIds: selectedKey?.toString(),
      });

      if (res?.result) {
        window.alert("Xóa thành công");
        router.reload();
      }
    };

    return ModalWrapper(
      open,
      setOpen,
      <p style={{ fontWeight: "bold", textAlign: "center" }}>
        Bạn có chắc muốn xóa?
      </p>,
      450,
      "Xóa nhân viên",
      "Xác nhận",
      onConfirm
    );
  };

  return (
    <div>
      <div>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col md={8} sm={12} xs={24}>
              <Form.Item name={"orgDetail"}>
                <Select
                  onChange={(val) => {
                    const selected = listDetail?.find(
                      (item) => item?.id === val
                    );

                    setSelectedOrg(selected?.listOrganizeDetailId);
                  }}
                  options={listDetail?.map((item) => ({
                    label: item?.organizeDetailName,
                    value: item?.id,
                  }))}
                  size="large"
                  placeholder="Chọn tổ chức"
                  style={{
                    width: "100%",
                    border: "1px solid #ACACAC",
                    borderRadius: "10px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col md={8} sm={12} xs={24}>
              <Form.Item name={"ep_id"}>
                <Select
                  options={[
                    { label: "Tất cả nhân viên", value: "all" },
                    ...(listEmpLabel ? listEmpLabel : []),
                  ]}
                  size="large"
                  placeholder="Chọn nhân viên"
                  showSearch
                  onChange={(e) => {
                    form.resetFields(["type"]);
                  }}
                  // optionFilterProp={'labelNoVN' || 'label'}
                  filterOption={(input, option) =>
                    option?.label
                      ?.toLowerCase()
                      ?.indexOf(input.toLowerCase()) >= 0 ||
                    option?.labelNoVN
                      ?.toLowerCase()
                      ?.indexOf(input.toLowerCase()) >= 0
                  }
                  style={{
                    width: "100%",
                    border: "1px solid #ACACAC",
                    borderRadius: "10px",
                  }}
                />
              </Form.Item>
            </Col>

            <Col md={8} sm={12} xs={24}>
              <Form.Item name={"type"} initialValue={0}>
                <Select
                  size="large"
                  defaultValue={0}
                  style={{
                    width: "100%",
                    border: "1px solid #ACACAC",
                    borderRadius: "10px",
                  }}
                  onChange={(e) => {
                    form.resetFields(["ep_id", "dep_id"]);
                  }}
                  options={[
                    {
                      value: 0,
                      label: "Tất cả",
                    },
                    {
                      value: 1,
                      label: "Nhân viên chưa nhập lương cơ bản",
                    },
                    {
                      value: 2,
                      label: "Nhân viên chưa cập nhật khuôn mặt",
                    },
                    {
                      value: 3,
                      label: "Tài khoản nhân viên trùng",
                    },
                    {
                      value: 4,
                      label: "Nhân viên chưa có phòng ban",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              md={0}
              sm={0}
              xs={24}
              lg={12}
              xl={6}
              xxl={0}
              style={{ marginTop: "10px" }}
            ></Col>

            <Col md={4} sm={4} xs={24} style={{}}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: "100%", minWidth: 200 }}
              >
                <p style={{ color: "#fff" }}>Tìm kiếm</p>
              </Button>
            </Col>
            <Col md={12} sm={4} xs={24} style={{}}></Col>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "430px",
              }}
            >
              <Col md={12} sm={24} xs={24}>
                <Button
                  size="large"
                  style={{
                    backgroundColor: "#1677ff",
                    width: "100%",
                    marginBottom: 28,
                  }}
                  onClick={() => setOpenModalAdd(true)}
                >
                  <p style={{ color: "#fff" }}>Thêm mới nhân viên</p>
                </Button>
              </Col>
              <Col
                md={12}
                sm={24}
                xs={24}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  size="large"
                  style={{
                    backgroundColor: "red",
                    width: "100%",
                  }}
                  onClick={() => setDelOpen(true)}
                >
                  <p style={{ color: "#fff" }}>Xóa</p>
                </Button>
              </Col>
            </div>

            <Col md={4} sm={8} xs={24} style={{}}>
              <CSVLink
                filename="Danh sách nhân viên trong công ty"
                data={[
                  [
                    "id",
                    "Tên nhân viên",
                    "Số điện thoại",
                    "Email",
                    "Phòng ban",
                    "Chức vụ",
                  ],

                  ...(data
                    ? data?.map((item) => [
                        item?.ep_id,
                        item?.ep_name,
                        item?.ep_phone,
                        item?.ep_email,
                        item?.dep_name,
                        positionLabel.find(
                          (pos) => pos?.value === item?.position_id
                        )?.label,
                      ])
                    : []),
                  ,
                ]}
              >
                {/* <Button
                  size='large'
                  style={{ backgroundColor: 'green', marginLeft: '10px' }}>
                  <p style={{ color: '#fff' }}>Xuất file excel</p>
                </Button> */}
              </CSVLink>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <MyTable
          colunms={columns}
          data={listStaffs}
          onRowClick={() => null}
          hasRowSelect={true}
          onSelectChange={(newKey) => setSelectedKey(newKey)}
          selectedRowKeys={selectedKey}
          rowKey="ep_id"
          Footer={null}
          pagination={{
            total: total,
            pageSize: param?.pageSize,
            onChange(page, pageSize) {
              console.log(pageSize);
              setParam({
                ...param,
                curPage: page,
                pageSize: pageSize,
              });
            },
          }}
        />
      </div>

      {openModalAdd && (
        <ThemNguoiDung
          onOk={openModalAdd}
          closeModalAdd={closeModalAdd}
          handleLoad={handleLoad}
        ></ThemNguoiDung>
      )}
      {EditEmpModal(
        openEdit,
        setOpenEdit,
        { label: infoCom?.data?.com_name, value: infoCom?.data?.com_id },
        [],
        [],
        [],
        selectedData,
        setData,
        currentRow
      )}
      {SetRoleModal(openSetRole, setOpenSetRole)}
      {DeleteEmpModal(
        openDelete,
        setOpenDelete,
        currentRow ? currentRow["name"] : "",
        currentRow
      )}
      {ModalDel(delOpen, setDelOpen)}
    </div>
  );
}
