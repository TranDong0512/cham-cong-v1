import { ModalWrapper } from "@/components/modal/ModalWrapper";
import {
  MyDatePicker,
  MyInput,
  MyInputPwd,
  MySelect,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import { POST, getCompIdCS } from "@/pages/api/BaseApi";
import {
  eduLabel,
  expLabel,
  genderLabel,
  getExperience,
  getPosition,
  marriedLabel,
  positionLabel,
} from "@/utils/function";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// export function AddNewEmpModal(open: boolean, setOpen: Function) {
//   const [listDepLabel, setListDepLabel]: any[] = useState([]);
//   const [listTeamLabel, setListTeamLabel]: any[] = useState([]);
//   const [listGrLabel, setListGrLabel]: any[] = useState([]);
//   const [grLabel, setGrLabel]: any[] = useState(listGrLabel);
//   const [comLabel, setComLabel]: any[] = useState({});
//   const [teamLabel, setTeamLabel] = useState<any>(listTeamLabel);
//   const [depFiler, setDepFilter] = useState<any>();
//   const [teamFiler, setTeamFilter] = useState<any>();

//   useEffect(() => {
//     if (depFiler) {
//       setTeamLabel(listTeamLabel?.filter((t) => t?.dep_id === depFiler));
//       form.setFieldValue("team_id", null);
//     }
//     if (teamFiler) {
//       setGrLabel(listGrLabel?.filter((g) => g?.team_id === teamFiler));
//       form.setFieldValue("gr_id", null);
//     }
//   }, [depFiler, teamFiler]);

//   const [form] = Form.useForm();
//   const router = useRouter();

//   const handleSubmit = () => {
//     form.validateFields().then((value) => {
//       POST("api/qlc/managerUser/create", { ...value, role: "0" })
//         .then((res) => {
//           if (res?.result === true) {
//             form.resetFields();
//             setOpen(false);
//             router.replace(router.asPath);
//           }
//         })
//         .catch((err) => console.error(err));
//     });
//   };

//   useEffect(() => {
//     let com_id = null;
//     com_id = getCompIdCS();
//     com_id !== null &&
//       POST("api/qlc/team/list", {
//         com_id: com_id,
//       }).then((res) => {
//         if (res?.result === true) {
//           setListTeamLabel(
//             res?.data?.map((team) => ({
//               label: team?.team_name,
//               value: team?.team_id,
//               dep_id: team?.dep_id,
//             }))
//           );
//         }
//       });

//     com_id !== null &&
//       POST("api/qlc/department/list", {
//         com_id: com_id,
//       }).then((res) => {
//         if (res?.result === true) {
//           setListDepLabel(
//             res?.items?.map((dep) => ({
//               label: dep?.dep_name,
//               value: dep?.dep_id,
//             }))
//           );
//         }
//       });

//     com_id !== null &&
//       POST("api/qlc/group/search", {
//         com_id: com_id,
//       }).then((res) => {
//         if (res?.result === true) {
//           setListGrLabel(
//             res?.data?.map((gr) => ({ label: gr?.gr_name, value: gr?.gr_id }))
//           );
//         }
//       });

//     POST("api/qlc/company/info", {}).then((res) => {
//       if (res?.result === true) {
//         setComLabel({ label: res?.data?.com_name, value: res?.data?.com_id });
//       }
//     });
//   }, []);

//   const positionLabel = getPosition?.map((p) => ({
//     label: p?.value,
//     value: p?.id,
//   }));

//   const expLabel = getExperience?.map((e) => ({
//     label: e?.value,
//     value: e?.id,
//   }));

//   const children = (
//     <Form form={form}>
//       <Row gutter={[20, 0]}>
//         <Col md={12} sm={24} xs={24}>
//           {MySelect("Công ty", "Chọn công ty", true, true, "com_id", [
//             comLabel,
//           ])}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MyInput("Họ và tên", "Nhập họ và tên", true, true, "userName")}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MyInput(
//             "Tài khoản đăng nhập",
//             "Nhập số điện thoại",
//             true,
//             true,
//             "phoneTK"
//           )}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MyInput("Số điện thoại", "Nhập số điện thoại", true, true, "phone")}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MyInput("Email", "Nhập email", true, true, "emailContact")}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MyInputPwd("Nhập mật khẩu", "Nhập mật khẩu", true, true, "password")}
//         </Col>

//         <Col md={12} sm={24} xs={24}>
//           {MyInput("Địa chỉ", "Nhập địa chỉ", true, true, "address")}
//         </Col>

//         <Col md={12} sm={24} xs={24}>
//           {MySelect(
//             "Giới tính",
//             "Chọn giới tính",
//             true,
//             true,
//             "gender",
//             genderLabel
//           )}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           <Form.Item
//             name={"birthday"}
//             rules={[
//               {
//                 required: true,
//                 message: `Vui lòng nhập ngày sinh của bạn!`,
//               },
//             ]}
//             label={<p>Ngày sinh</p>}
//             labelCol={{ span: 24 }}
//           >
//             <Input
//               type="date"
//               style={{ width: "100%", border: "1px solid #9F9F9F" }}
//               size="large"
//             />
//           </Form.Item>
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MySelect(
//             "Trình độ học vấn",
//             "Chọn trình độ học vấn",
//             true,
//             true,
//             "education",
//             eduLabel
//           )}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MySelect(
//             "Tình trạng hôn nhân",
//             "Chọn tình trạng hôn nhân",
//             true,
//             true,
//             "isMarried",
//             marriedLabel
//           )}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MySelect(
//             "Kinh nghiệm làm việc",
//             "Chọn kinh nghiệm làm việc",
//             true,
//             true,
//             "exp",
//             expLabel
//           )}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           <Form.Item
//             name={"start_working_time"}
//             rules={[
//               {
//                 required: true,
//                 message: `Vui lòng nhập ngày bắt đầu làm việc của bạn!`,
//               },
//             ]}
//             label={<p>Ngày bắt đầu làm việc</p>}
//             labelCol={{ span: 24 }}
//           >
//             <Input
//               type="date"
//               style={{ width: "100%", border: "1px solid #9F9F9F" }}
//               size="large"
//             />
//           </Form.Item>
//         </Col>

//         <Col md={12} sm={24} xs={24}>
//           {MySelect(
//             "Chức vụ",
//             "Chọn chức vụ",
//             true,
//             true,
//             "position_id",
//             positionLabel
//           )}
//         </Col>
//         <Col md={12} sm={24} xs={24}>
//           {MySelect(
//             "Tổ chức",
//             "Chọn tổ",
//             false,
//             true,
//             "team_id",
//             teamLabel,
//             null,
//             setTeamFilter
//           )}
//         </Col>
//       </Row>
//     </Form>
//   );

//   return ModalWrapper(
//     open,
//     setOpen,
//     children,
//     800,
//     "Thêm mới nhân viên",
//     "Thêm mới",
//     () => handleSubmit()
//   );
// }

export function EditEmpModal(
  open: boolean,
  setOpen: Function,
  comLabel: any,
  listDepLabel: any,
  listTeamLabel: any,
  listGrLabel: any,
  data?: any,
  setData?: Function,
  currentRow?: any
) {
  // const [detailEmp, setDetailEmp]: any = useState([])
  const [form] = Form.useForm();
  const router = useRouter();
  const [selectedPb, setSelectedPb] = useState();
  const [listTeam, setListTeam] = useState([]);

  useEffect(() => {
    setListTeam(listTeamLabel?.filter((item) => item?.dep_id === selectedPb));
  }, [selectedPb]);

  const handleSubmit = () => {
    const data = form.getFieldsValue();

    form.validateFields().then((value) => {
      POST("api/qlc/managerUser/edit", {
        ...data,
        ep_id: data.ep_id,
        ep_name: data.ep_name,
        ep_gender: data.ep_gender,
        married: data.ep_married,
        experience: data.ep_exp,
        phone: data.ep_phone,
        address: data.ep_address,
        education: data.ep_education,
        ep_birth_day: dayjs(data?.ep_birth_day)?.valueOf(),
        start_working_time: dayjs(data?.start_working_time)?.valueOf(),
        role: "0",
      })
        .then((res) => {
          if (res?.result) {
            setOpen(false);
            window.alert("Cập nhật thông tin thành công");
            router.reload();
          }
        })
        .catch((err) => console.error(err));
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        ep_birth_day: dayjs.unix(data?.ep_birth_day),
        start_working_time: data?.start_working_time
          ? dayjs.unix(data?.start_working_time)
          : null,
        created_at: dayjs.unix(data?.created_at),
      });
    }
  }, [data]);

  const children = (
    <Form
      form={form}
      preserve={false}
      initialValues={{
        ...data,
        ep_birth_day: dayjs.unix(data?.ep_birth_day),
        start_working_time: data?.start_working_time
          ? dayjs.unix(data?.start_working_time)
          : null,
        created_at: dayjs.unix(data?.created_at),
        com_name: comLabel.label,
      }}
    >
      <Row gutter={[20, 0]}>
        <Col md={12} sm={24} xs={24}>
          <Form.Item name={"ep_id"} label={<p>ID</p>} labelCol={{ span: 24 }}>
            <Input
              style={{
                width: "100%",
                border: "1px solid #9F9F9F",
                color: "#474747",
              }}
              size="large"
              disabled={true}
            />
          </Form.Item>
        </Col>

        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name={"com_name"}
            label={<p>Công ty</p>}
            labelCol={{ span: 24 }}
          >
            <Input
              style={{
                width: "100%",
                border: "1px solid #9F9F9F",
                color: "#474747",
              }}
              size="large"
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name={"ep_phoneTK"}
            label={<p>Tài khoản đăng nhập</p>}
            labelCol={{ span: 24 }}
          >
            <Input
              style={{
                width: "100%",
                border: "1px solid #9F9F9F",
                color: "#474747",
              }}
              size="large"
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput("Họ và tên1", "Nhập họ và tên", true, true, "ep_name")}
        </Col>
        {/* <Col md={12} sm={24} xs={24}>
          {MyInput(
            'Tài khoản đăng nhập',
            'Nhập số điện thoại',
            true,
            true,
            'ep_phoneTK'
          )}
        </Col> */}
        <Col md={12} sm={24} xs={24}>
          {MyInput(
            "Số điện thoại",
            "Nhập số điện thoại",
            true,
            true,
            "ep_phone"
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput("Địa chỉ", "Nhập địa chỉ", true, true, "ep_address")}
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name={"ep_birth_day"}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ngày sinh của bạn!`,
              },
            ]}
            label={<p>Ngày sinh</p>}
            labelCol={{ span: 24 }}
          >
            <DatePicker
              size="large"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Giới tính",
            "Chọn giới tính",
            true,
            true,
            "ep_gender",
            genderLabel
          )}
        </Col>

        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Trình độ học vấn",
            "Chọn trình độ học vấn",
            true,
            true,
            "ep_education",
            eduLabel
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Tình trạng hôn nhân",
            "Độc thân",
            false,
            true,
            "ep_married",
            marriedLabel
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Kinh nghiệm làm việc",
            "Chưa có kinh nghiệm",
            true,
            true,
            "ep_exp",
            expLabel
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {/* {MyInput("Ngày bắt đầu làm việc", "dd/MM/YYYY", true, true, "start_working_time")} */}
          <Form.Item
            name={"start_working_time"}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ngày bắt đầu làm việc của bạn!`,
              },
            ]}
            label={<p>Ngày bắt đầu làm việc</p>}
            labelCol={{ span: 24 }}
          >
            <DatePicker
              size="large"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        {/* <Col md={12} sm={24} xs={24}>
          {MySelect(
            'Phòng ban',
            'Chọn phòng ban',
            true,
            true,
            'dep_id',
            listDepLabel,
            null,
            (value) => setSelectedPb(value)
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            'Chức vụ',
            'Chọn chức vụ',
            true,
            true,
            'position_id',
            positionLabel
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            'Tổ',
            'Chọn tổ',
            false,
            true,
            'team_id',
            listTeam?.map((item) => ({
              label: item?.team_name,
              value: item?.team_id,
            }))
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect('Nhóm', 'Chọn nhóm', false, true, 'group_id', listGrLabel)}
        </Col> */}
      </Row>
    </Form>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    "Chỉnh sửa thông tin",
    "Cập nhật",
    handleSubmit,
    true,
    true,
    false
  );
}

export function SetRoleModal(open: boolean, setOpen: Function) {
  const [form] = Form.useForm();
  const [openSuccess, setOpenSuccess] = useState(false);

  const children = (
    <Form form={form}>
      <Form.Item
        name={"role"}
        rules={[
          {
            required: true,
            message: `Vui lòng nhập phân quyền tài khoản của bạn!`,
          },
        ]}
        label={<p>Phân quyền tài khoản</p>}
        labelCol={{ span: 24 }}
      >
        <Select
          style={{
            width: "100%",
            border: "1px solid #9F9F9F",
            borderRadius: "10px",
          }}
          options={[
            { label: "Admin (Toàn quyền)", value: 1 },
            { label: "Thành viên", value: 2 },
          ]}
          defaultValue={1}
          suffixIcon={
            <Image alt="/" src={"/down-icon.png"} width={14} height={14} />
          }
          size="large"
        />
      </Form.Item>
    </Form>
  );

  return (
    <>
      {ModalWrapper(
        open,
        setOpen,
        children,
        600,
        "Phân quyền",
        "Cập nhật",
        () => {
          setOpen(false);
          setOpenSuccess(true);
        },
        true,
        true,
        false
      )}
      <AddRoleSuccessModal open={openSuccess} setOpen={setOpenSuccess} />
    </>
  );
}

export const AddRoleSuccessModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: "center" }}>
      Tài khoản đã được phân quyền thành công
    </p>,
    450,
    "",
    "OK",
    () => setOpen(false),
    false,
    true,
    false,
    false,
    true
  );
};

export function DeleteEmpModal(
  open: boolean,
  setOpen: Function,
  name: string,
  currentRow: any
) {
  const router = useRouter();

  const handleSubmit = () => {
    if (currentRow?.idQLC) {
      POST("api/qlc/managerUser/del", {
        idQLC: currentRow.idQLC,
      }).then((res) => {
        console.log(res);
        if (res?.result === true) {
          setOpen(false);
          router.replace(router.asPath);
        } else {
          alert("Lỗi không xóa được nhân viên");
          setOpen(false);
        }
      });
    }
  };

  const children = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image alt="/" src={"/big-x.png"} width={50} height={50} />
      <p style={{ marginTop: "20px" }}>Bạn có chắc chắn muốn xóa nhân viên ?</p>
      <p>{name}</p>
    </div>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    "Xóa nhân viên",
    "Đồng ý",
    handleSubmit,
    true,
    true,
    false
  );
}
