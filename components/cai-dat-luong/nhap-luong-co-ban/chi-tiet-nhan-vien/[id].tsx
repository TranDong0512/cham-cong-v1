import { useRouter } from 'next/router'
import { Card, Avatar, Table, Input, Select } from 'antd'
import styles from './[id].module.css'
import { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
import { ModalXoa } from './modal/modal-xoa'
import { ModalGioiThieu } from './modal/modal-gioi-thieu/modal-gioi-thieu'
import { ModalThemMoiLuong } from './modal/modal-them-moi-luong/modal-them-moi-luong'
import { ModalChinhSuaLuongCoBan } from './modal/modal-chinh-sua-luong-co-ban/modal-chinh-sua-luong-co-ban'
import { ModalThemHopDong } from './modal/modal-them-hop-dong-lam-viec/modal-them-hop-dong-lam-viec'
import { ModalChinhSuaHopDong } from './modal/modal-chinh-sua-hop-dong/modal-chinh-sua-hop-dong'
const info = [
  {
    id: '12345',
    name: 'nguyen van a',
    url: 'chitiet.png',
    chucvu: 'nhanvien',
    thanhtich: 'nhan vien xuat sac',
    ngaysinh: '20-7-1998',
    phongban: 'bien tap',
    diachi: 'ha noi',
    sdt: '12345',
    nganhang: 'chua cap nhat',
    stk: '1234',
    gioitinh: 'nam',
    ngaybatdaulam: '03/05/2022',
    email: '@gmail.com',
    batdautinhluong: 'tu ngay bat dau lam viec',
    luongcoban: '7000 VND',
    luongdongbaohiem: '5000 VND',
    phucapdongbaohiem: '1000 VND',
    timeapdung: '16/3/2022',
    hopdongnhanvien: 'thu viec',
    ngaythuchien: '29/06/2022',
    ngayhethan: '29/08/2022',
    luong: '80%',
    tinhtranghonnhan: 'FA',
  },
]
export default function ChiTietNhanVien() {
  const router = useRouter()
    // return (
    //   <>
    //    {info.map((data) => {
    //       if (data.id === router.query?.id) {
    //         const [modalChinhSuaHopDong, setModalChinhSuaHopDong] =
    //           useState(false)
    //         const [modalXoa, setModalXoa] = useState(false)
    //         const [modalGioiThieu, setModalGioiThieu] = useState(false)
    //         const [modalChinhSuaThongTinCaNhan, setModalChinhSuaThongTinCaNhan] =
    //           useState(false)
    //         const [modalThongTinCaNhan, setModalThongTinCaNhan] = useState(true)
    //         const [modalThemMoiLuong, setModalThemMoiLuong] = useState(false)
    //         const [modalChinhSuaLuongCoBan, setModalChinhSuaLuongCoBan] =
    //           useState(false)
    //         const [modalThemHopDong, setModalThemHopDong] = useState(false)
    //         const chucnang1 = (x: any) => {
    //           return (
    //             <>
    //               <div className={styles.chucnang}>
    //                 <div onClick={() => setModalChinhSuaLuongCoBan(true)}>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="25"
    //                     height="24"
    //                     viewBox="0 0 25 24"
    //                     fill="none"
    //                   >
    //                     <path
    //                       d="M12.5 3.9979H7.6875C5.92709 3.9979 4.5 5.42499 4.5 7.1854V16.8104C4.5 18.5708 5.92709 19.9979 7.6875 19.9979H17.3125C19.0729 19.9979 20.5 18.5708 20.5 16.8104V11.9979M18.9142 8.4121L20 7.32634C20.781 6.54529 20.781 5.27897 20 4.49792C19.2189 3.71687 17.9526 3.71688 17.1715 4.49794L16.0858 5.58367M18.9142 8.4121L12.8779 14.4485C12.5987 14.7277 12.2431 14.918 11.856 14.9954L8.91422 15.5838L9.50257 12.642C9.58001 12.2548 9.77032 11.8992 10.0495 11.62L16.0858 5.58367M18.9142 8.4121L16.0858 5.58367"
    //                       stroke="#4C5BD4"
    //                       stroke-width="1.2"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                   </svg>
    //                 </div>
    //                 <div>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="1"
    //                     height="20"
    //                     viewBox="0 0 1 20"
    //                     fill="none"
    //                   >
    //                     <path d="M0.5 0V20" stroke="#D9D9D9" />
    //                   </svg>
    //                 </div>
    //                 <div onClick={() => setModalXoa(true)}>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="25"
    //                     height="24"
    //                     viewBox="0 0 25 24"
    //                     fill="none"
    //                   >
    //                     <path
    //                       d="M3.5 6H5.5H21.5"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                     <path
    //                       d="M19.5 6V20C19.5 20.5304 19.2893 21.0391 18.9142 21.4142C18.5391 21.7893 18.0304 22 17.5 22H7.5C6.96957 22 6.46086 21.7893 6.08579 21.4142C5.71071 21.0391 5.5 20.5304 5.5 20V6M8.5 6V4C8.5 3.46957 8.71071 2.96086 9.08579 2.58579C9.46086 2.21071 9.96957 2 10.5 2H14.5C15.0304 2 15.5391 2.21071 15.9142 2.58579C16.2893 2.96086 16.5 3.46957 16.5 4V6"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                     <path
    //                       d="M10.5 11V17"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                     <path
    //                       d="M14.5 11V17"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                   </svg>
    //                 </div>
    //               </div>
    //             </>
    //           )
    //         }

    //         const chucnang2 = (x: any) => {
    //           return (
    //             <>
    //               <div className={styles.chucnang}>
    //                 <div onClick={() => setModalChinhSuaHopDong(true)}>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="25"
    //                     height="24"
    //                     viewBox="0 0 25 24"
    //                     fill="none"
    //                   >
    //                     <path
    //                       d="M12.5 3.9979H7.6875C5.92709 3.9979 4.5 5.42499 4.5 7.1854V16.8104C4.5 18.5708 5.92709 19.9979 7.6875 19.9979H17.3125C19.0729 19.9979 20.5 18.5708 20.5 16.8104V11.9979M18.9142 8.4121L20 7.32634C20.781 6.54529 20.781 5.27897 20 4.49792C19.2189 3.71687 17.9526 3.71688 17.1715 4.49794L16.0858 5.58367M18.9142 8.4121L12.8779 14.4485C12.5987 14.7277 12.2431 14.918 11.856 14.9954L8.91422 15.5838L9.50257 12.642C9.58001 12.2548 9.77032 11.8992 10.0495 11.62L16.0858 5.58367M18.9142 8.4121L16.0858 5.58367"
    //                       stroke="#4C5BD4"
    //                       stroke-width="1.2"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                   </svg>
    //                 </div>
    //                 <div>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="1"
    //                     height="20"
    //                     viewBox="0 0 1 20"
    //                     fill="none"
    //                   >
    //                     <path d="M0.5 0V20" stroke="#D9D9D9" />
    //                   </svg>
    //                 </div>
    //                 <div onClick={() => setModalXoa(true)}>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="25"
    //                     height="24"
    //                     viewBox="0 0 25 24"
    //                     fill="none"
    //                   >
    //                     <path
    //                       d="M3.5 6H5.5H21.5"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                     <path
    //                       d="M19.5 6V20C19.5 20.5304 19.2893 21.0391 18.9142 21.4142C18.5391 21.7893 18.0304 22 17.5 22H7.5C6.96957 22 6.46086 21.7893 6.08579 21.4142C5.71071 21.0391 5.5 20.5304 5.5 20V6M8.5 6V4C8.5 3.46957 8.71071 2.96086 9.08579 2.58579C9.46086 2.21071 9.96957 2 10.5 2H14.5C15.0304 2 15.5391 2.21071 15.9142 2.58579C16.2893 2.96086 16.5 3.46957 16.5 4V6"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                     <path
    //                       d="M10.5 11V17"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                     <path
    //                       d="M14.5 11V17"
    //                       stroke="#FF5B4D"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                     />
    //                   </svg>
    //                 </div>
    //               </div>
    //             </>
    //           )
    //         }
    //         const data1: any = [
    //           {
    //             luongcb: `${data.luongcoban}`,
    //             luongdongbaohiem: `${data.luongdongbaohiem}`,
    //             phucapdongbaohiem: `${data.phucapdongbaohiem}`,
    //             timeapdung: `${data.timeapdung}`
    //           }
    //         ]
    //         const columns: ColumnsType<any> = [
    //           {
    //             title: "Lương cơ bản",
    //             dataIndex: "luongcb",
    //             key: "luongcb"
    //           },
    //           {
    //             title: "Lương đóng bảo hiểm",
    //             dataIndex: "luongdongbaohiem",
    //             key: "luongdongbaohiem"
    //           },
    //           {
    //             title: "Phụ cấp đóng bảo hiểm",
    //             dataIndex: "phucapdongbaohiem",
    //             key: "phucapdongbaohiem"
    //           },
    //           {
    //             title: "Tăng/giảm lương",
    //             dataIndex: "",
    //             key: ""
    //           },
    //           {
    //             title: "Thời gian áp dụng",
    //             dataIndex: "timeapdung",
    //             key: "timeapdung"
    //           },
    //           {
    //             title: "Chức năng",
    //             dataIndex: "",
    //             key: "",
    //             render: (record: any) => chucnang1(record)
    //           }
    //         ]
    //         const data2: any = [
    //           {
    //             hopdongnhanvien: `${data.hopdongnhanvien}`,
    //             ngaythuchien: `${data.ngaythuchien}`,
    //             ngayhethan: `${data.ngayhethan}`,
    //             luong: `${data.luong}`
    //           }
    //         ]
    //         const columns2: ColumnsType<any> = [
    //           {
    //             title: "Hợp đồng nhân viên",
    //             dataIndex: "hopdongnhanvien",
    //             key: "hopdongnhanvien"
    //           },
    //           {
    //             title: "Ngày thực hiện",
    //             dataIndex: "ngaythuchien",
    //             key: "ngaythuchien"
    //           },
    //           {
    //             title: "Ngày hết hạn",
    //             dataIndex: "ngayhethan",
    //             key: "ngayhethan"
    //           },
    //           {
    //             title: "% lương",
    //             dataIndex: "luong",
    //             key: "luong"
    //           },
    //           {
    //             title: "Tệp đính kèm",
    //             dataIndex: "",
    //             key: ""
    //           },
    //           {
    //             title: "Chức năng",
    //             dataIndex: "",
    //             key: "",
    //             render: (record: any) => chucnang2(record)
    //           }
    //         ]
    //         const handleChange = (value: string) => {
    //           console.log(`selected ${value}`)
    //         }
    //         return (
    //           <Card
    //             style={{ borderRadius: "45px" }}
    //             cover={
    //               <div className={styles.header}>
    //                 <div style={{ display: "flex" }}>
    //                   <div style={{ display: "flex" }}>
    //                     <Avatar
    //                       src={data.url}
    //                       style={{ width: "100px", height: "100px" }}
    //                     />
    //                     <div className={styles.thechua}>
    //                       <button className={styles.button1}>
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="18"
    //                           height="18"
    //                           viewBox="0 0 18 18"
    //                           fill="none"
    //                         >
    //                           <path
    //                             d="M9 2.99989H6.1875C4.42709 2.99989 3 4.42698 3 6.18739V11.8124C3 13.5728 4.42709 14.9999 6.1875 14.9999H11.8125C13.5729 14.9999 15 13.5728 15 11.8124V8.99989M13.8107 6.31054L14.625 5.49622C15.2108 4.91043 15.2108 3.96069 14.625 3.37491C14.0392 2.78912 13.0894 2.78912 12.5036 3.37492L11.6893 4.18922M13.8107 6.31054L9.28346 10.8378C9.07406 11.0472 8.80736 11.1899 8.51697 11.248L6.31067 11.6893L6.75193 9.48297C6.81001 9.19259 6.95274 8.92589 7.16213 8.71649L11.6893 4.18922M13.8107 6.31054L11.6893 4.18922"
    //                             stroke="#4C5BD4"
    //                             stroke-width="1.2"
    //                             stroke-linecap="round"
    //                             stroke-linejoin="round"
    //                           />
    //                         </svg>
    //                       </button>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <p className={styles.name}>{data.name}</p>
    //                     <p className={styles.vitri}>{data.chucvu}</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             }
    //           >
    //             <div style={{ padding: "0 10px" }}>
    //               <div className={styles.gioithieu}>
    //                 <div className={styles.khungtitle}>
    //                   <p className={styles.title}>Giới thiệu</p>
    //                   <button
    //                     style={{ border: "none" }}
    //                     onClick={() => setModalGioiThieu(true)}
    //                   >
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       width="24"
    //                       height="24"
    //                       viewBox="0 0 24 24"
    //                       fill="none"
    //                     >
    //                       <path
    //                         d="M12 3.9979H7.1875C5.42709 3.9979 4 5.42499 4 7.1854V16.8104C4 18.5708 5.42709 19.9979 7.1875 19.9979H16.8125C18.5729 19.9979 20 18.5708 20 16.8104V11.9979M18.4142 8.4121L19.5 7.32634C20.281 6.54529 20.281 5.27897 19.5 4.49792C18.7189 3.71687 17.4526 3.71688 16.6715 4.49794L15.5858 5.58367M18.4142 8.4121L12.3779 14.4485C12.0987 14.7277 11.7431 14.918 11.356 14.9954L8.41422 15.5838L9.00257 12.642C9.08001 12.2548 9.27032 11.8992 9.54951 11.62L15.5858 5.58367M18.4142 8.4121L15.5858 5.58367"
    //                         stroke="#4C5BD4"
    //                         stroke-width="1.2"
    //                         stroke-linecap="round"
    //                         stroke-linejoin="round"
    //                       />
    //                     </svg>
    //                   </button>
    //                 </div>
    //                 <p className={styles.thanhtich}>{data.thanhtich}</p>
    //               </div>
    //               <div>
    //                 <div className={styles.khungtt}>
    //                   <p className={styles.title2}>Thông tin cá nhân</p>
    //                   <div style={{ padding: "0 20px" }}>
    //                     <button
    //                       style={{ border: "none", background: "#fff" }}
    //                       onClick={() => {
    //                         setModalThongTinCaNhan(false)
    //                         setModalChinhSuaThongTinCaNhan(true)
    //                       }}
    //                     >
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="24"
    //                         height="24"
    //                         viewBox="0 0 24 24"
    //                         fill="none"
    //                       >
    //                         <path
    //                           d="M12 3.9979H7.1875C5.42709 3.9979 4 5.42499 4 7.1854V16.8104C4 18.5708 5.42709 19.9979 7.1875 19.9979H16.8125C18.5729 19.9979 20 18.5708 20 16.8104V11.9979M18.4142 8.4121L19.5 7.32634C20.281 6.54529 20.281 5.27897 19.5 4.49792C18.7189 3.71687 17.4526 3.71688 16.6715 4.49794L15.5858 5.58367M18.4142 8.4121L12.3779 14.4485C12.0987 14.7277 11.7431 14.918 11.356 14.9954L8.41422 15.5838L9.00257 12.642C9.08001 12.2548 9.27032 11.8992 9.54951 11.62L15.5858 5.58367M18.4142 8.4121L15.5858 5.58367"
    //                           stroke="#4C5BD4"
    //                           stroke-width="1.2"
    //                           stroke-linecap="round"
    //                           stroke-linejoin="round"
    //                         />
    //                       </svg>
    //                     </button>
    //                   </div>
    //                 </div>

    //                 {modalThongTinCaNhan ? (
    //                   <div className={styles.chitietTT}>
    //                     <div className={styles.chitiet1}>
    //                       <p>Họ và tên: {data.name}</p>
    //                       <p>Sinh ngày: {data.ngaysinh}</p>
    //                       <p>Phòng ban: {data.phongban}</p>
    //                       <p>Địa chỉ: {data.diachi}</p>
    //                       <p>Số điện thoại: {data.sdt}</p>
    //                       <p>Ngân hàng nhận lương: {data.nganhang}</p>
    //                       <p>Số tài khoản ngân hàng: {data.stk}</p>
    //                     </div>
    //                     <div className={styles.chitiet1}>
    //                       <p>Giới tính: {data.gioitinh}</p>
    //                       <p>Mã nhân viên: {data.id}</p>
    //                       <p>Chức vụ: {data.chucvu}</p>
    //                       <p>Ngày bắt đầu làm: {data.ngaybatdaulam}</p>
    //                       <p>Email: {data.email}</p>
    //                       <p>Bắt đầu tính lương: {data.batdautinhluong}</p>
    //                     </div>
    //                   </div>
    //                 ) : (
    //                   <></>
    //                 )}
    //                 {modalChinhSuaThongTinCaNhan ? (
    //                   <div style={{ width: "100%" }}>
    //                     <div className={styles.khungchinhsua}>
    //                       <div className={styles.chinhsua}>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Họ và tên</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.name}
    //                             className={styles.input}
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Ngày sinh</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             type="date"
    //                             defaultValue={data.ngaysinh}
    //                             className={styles.input}
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Tình trạng hôn nhân</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Select
    //                             defaultValue={data.tinhtranghonnhan}
    //                             className={styles.input}
    //                             onChange={handleChange}
    //                             options={[
    //                               { value: "Đã kết hôn", label: "Đã kết hôn" },
    //                               {
    //                                 value: "Độc thân đến già",
    //                                 label: "Độc thân đến già"
    //                               }
    //                             ]}
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Số điện thoại</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.sdt}
    //                             className={styles.input}
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>
    //                               Ngày bắt đầu làm việc
    //                             </p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.ngaybatdaulam}
    //                             className={styles.input}
    //                             disabled
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>
    //                               Ngân hàng nhận lương
    //                             </p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             placeholder="Nhập tên ngân hàng"
    //                             className={styles.input}
    //                           />
    //                         </form>
    //                       </div>
    //                       <div className={styles.chinhsua}>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Giới tính</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Select
    //                             defaultValue={data.gioitinh}
    //                             onChange={handleChange}
    //                             className={styles.input}
    //                             options={[
    //                               { value: "Nam", label: "Nam" },
    //                               { value: "Nữ", label: "Nữ" },
    //                               {
    //                                 value: "Giới tính khác",
    //                                 label: "Giới tính khác"
    //                               }
    //                             ]}
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Mã nhân viên</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.id}
    //                             className={styles.input}
    //                             disabled
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Địa chỉ</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.diachi}
    //                             className={styles.input}
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Email</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.email}
    //                             className={styles.input}
    //                             disabled
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>Bắt đầu tính lương</p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.batdautinhluong}
    //                             className={styles.input}
    //                             type="data"
    //                           />
    //                         </form>
    //                         <form action="" style={{ marginBottom: "20px" }}>
    //                           <div
    //                             style={{ display: "flex", marginBottom: "5px" }}
    //                           >
    //                             <p className={styles.text}>
    //                               Số tài khoản ngân hàng
    //                             </p>
    //                             <p className={styles.dau}>*</p>
    //                           </div>
    //                           <Input
    //                             defaultValue={data.stk}
    //                             className={styles.input}
    //                           />
    //                         </form>
    //                       </div>
    //                     </div>
    //                     <div className={styles.button}>
    //                       <button
    //                         className={styles.buttonhuy}
    //                         onClick={() => {
    //                           setModalThongTinCaNhan(true)
    //                           setModalChinhSuaThongTinCaNhan(false)
    //                         }}
    //                       >
    //                         <p className={styles.huy}>Huỷ</p>
    //                       </button>
    //                       <button className={styles.buttonluu}>
    //                         <p className={styles.luu}>Lưu thông tin</p>
    //                       </button>
    //                     </div>
    //                   </div>
    //                 ) : (
    //                   <></>
    //                 )}

    //                 <div className={styles.luongcoban}>
    //                   <div className={styles.titleLuongCoBan}>
    //                     <p className={styles.title3}>Lương cơ bản</p>
    //                     <button
    //                       className={styles.buttonThemLuong}
    //                       onClick={() => setModalThemMoiLuong(true)}
    //                     >
    //                       <p className={styles.text1}>+</p>
    //                       <p className={styles.text1}>Thêm lương</p>
    //                     </button>
    //                   </div>
    //                   <Table
    //                     className={`table_bangluong ${styles.table}`}
    //                     dataSource={data1}
    //                     columns={columns}
    //                     pagination={false}
    //                     scroll={{ x: 1088 }}
    //                     bordered={true}
    //                   />
    //                 </div>
    //                 <div className={styles.luongcoban}>
    //                   <div className={styles.titleLuongCoBan}>
    //                     <p className={styles.title3}>Hợp đồng làm việc</p>
    //                     <button
    //                       className={styles.buttonThemLuong}
    //                       onClick={() => setModalThemHopDong(true)}
    //                     >
    //                       <p className={styles.text1}>+</p>
    //                       <p className={styles.text1}>Thêm hợp đồng</p>
    //                     </button>
    //                   </div>
    //                   <Table
    //                     className={`table_bangluong ${styles.table}`}
    //                     dataSource={data2}
    //                     columns={columns2}
    //                     pagination={false}
    //                     scroll={{ x: 1088 }}
    //                     bordered={true}
    //                   />
    //                 </div>
    //                 {/* {ModalThemMoiLuong(
    //                   modalThemMoiLuong,
    //                   setModalThemMoiLuong,
    //                   data?.id,
    //                   data
    //                 )} */}
    //                 {/* {ModalXoa(modalXoa, setModalXoa)} */}
    //                 {ModalGioiThieu(
    //                   modalGioiThieu,
    //                   setModalGioiThieu,
    //                   data.thanhtich
    //                 )}
    //                 {ModalChinhSuaLuongCoBan(
    //                   modalChinhSuaLuongCoBan,
    //                   setModalChinhSuaLuongCoBan,
    //                   data
    //                 )}
    //                 {/* {ModalThemHopDong(modalThemHopDong, setModalThemHopDong)} */}
    //                 {ModalChinhSuaHopDong(
    //                   modalChinhSuaHopDong,
    //                   setModalChinhSuaHopDong,
    //                   data
    //                 )}
    //               </div>
    //             </div>
    //           </Card>
    //         )
    //       }
    //     })}
    //   </>
    // )

  return <></>
}
