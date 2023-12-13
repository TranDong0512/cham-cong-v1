import styles from "./home.module.css";
export const LIST_ACTIONS: any = [
  {
    key: "10",
    // title: 'Quản lý công ty',
    title: (
      <div className={styles.headerText}>
        Phần mềm chấm công AI365 chấm công bằng{" "}
        <a className={styles.link}>APP chat365</a> hoặc {""}
        <a className={styles.link} href="/phan-mem-cham-cong/huong-dan-camera">
          camera AI365
        </a>
      </div>
    ),
    steps: [
      // {
      //   title: 'Cài đặt quản lý công ty con',
      //   url: 'quan-ly-cong-ty/quan-ly-cong-ty-con',
      //     required: false,
      // },
      // {
      //   title: 'Thiết lập công ty: Cơ cấu, tổ chức, vị trí',
      //   url: 'https://hungha365.com/thiet-lap-cong-ty-con-phong-ban',
      //   required: false,
      //   isDirect: true,
      // },
      {
        title: "Thiết lập cơ cấu tổ chức",
        url: "thiet-lap-co-cau-to-chuc",
        required: false,
      },
      {
        title: "Thiết lập vị trí",
        url: "thiet-lap-vi-tri",
        required: false,
      },
      // {
      //   title: 'Sơ đồ tổ chức',
      //   url: 'https://hungha365.com/thiet-lap-cong-ty-con-phong-ban',
      //   required: false,
      // },
      {
        title: "Thêm/xóa nhân viên",
        url: "quan-ly-cong-ty/cai-dat-them-nhan-vien-moi",
        required: false,
      },

      {
        title: "Danh sách ứng viên",
        url: "https://hungha365.com/phan-mem-nhan-su/quan-ly-tuyen-dung/danh-sach-ung-vien",
        required: false,
        isDirect: true,
      },
      {
        title: "Nâng cao",
        url: "https://hungha365.com/phan-mem-nhan-su/quan-ly-chung",
        required: false,
        isDirect: true,
      },
    ],
  },
  {
    key: "1",
    title: "Thiết lập chấm công",
    steps: [
      {
        title: "Cài đặt: wifi, vị trí, QR, cảm xúc, thông báo chấm công",
        url: "cham-cong/cai-dat-bao-mat",
        required: false,
      },
      {
        title: "Cài đặt quản lý ca làm việc",
        url: "quan-ly-cong-ty/quan-ly-ca",
        required: false,
      },
      {
        title: "Cài đặt lịch làm việc của tháng",
        url: "cham-cong/cai-dat-lich-lam-viec",
        required: false,
      },

      {
        title: "Cài đặt công chuẩn của tháng",
        url: "cham-cong/cai-dat-cong-chuan",
        required: false,
      },
      {
        title: "Cho phép cập nhật lại khuôn mặt",
        url: "cham-cong/nhap-lai-khuon-mat",
        required: false,
      },
      {
        title: "Danh sách bắt buộc đi làm",
        url: "cham-cong/bat-buoc-di-lam",
        required: false,
      },
      // {
      //   title: 'Duyệt theo thiết bị mới khi chấm công',
      //   url: 'cham-cong/duyet-thiet-bi',
      //   required: false,
      // },
      {
        title: "Xuất công",
        url: "cham-cong/xuat-cong",
        required: false,
      },
      {
        title: "Lịch sử điểm danh",
        url: "quan-ly-cong-ty/lich-su-diem-danh",
        required: false,
      },
      {
        title: "Chấm công bằng camera",
        url: "cham-cong/cham-cong-cong-ty",
        required: false,
      },
    ],
  },
  {
    key: "4",
    title: "Cài đặt lương",
    steps: [
      {
        title: "Cài đặt nhập lương cơ bản",
        url: "cai-dat-luong/nhap-luong-co-ban",
        required: false,
      },
      {
        title: "Cài đặt thiết lập đi muộn - về sớm",
        url: "cai-dat-luong/di-muon-ve-som",
        required: false,
      },
      {
        title: "Cài đặt bảo hiểm",
        url: "cai-dat-luong/cai-dat-bao-hiem",
        required: false,
      },
      {
        title: "Cài đặt phúc lợi",
        url: "cai-dat-luong/cai-dat-phuc-loi",
        required: false,
      },
      {
        title: "Cài đặt phụ cấp khác",
        url: "cai-dat-luong/cai-dat-phu-cap-khac",
        required: false,
      },
      {
        title: "Cài đặt thuế",
        url: "cai-dat-luong/cai-dat-thue",
        required: false,
      },
      {
        title: "Cộng công",
        url: "cai-dat-luong/cong-cong",
        required: false,
      },
      {
        title: "Thưởng/phạt",
        url: "cai-dat-luong/thuong-phat",
        required: false,
      },
      {
        title: "Hoa hồng",
        url: "cai-dat-luong/hoa-hong",
        required: false,
      },
      // {
      //   title: 'Xuất lương',
      //   url: 'https://hungha365.com/tinh-luong/cong-ty/trang-chu',
      //   required: false,
      //   isDirect: true,
      // },
      // {
      //   title: 'Nâng cao',
      //   url: '',
      //   required: false,
      // },
    ],
  },
  {
    key: "3",
    title: "Cài đặt đề xuất",
    steps: [
      {
        title: "Đơn xin nghỉ phép",
        url: "de-xuat/cai-dat-loai-hinh-duyet-phep",
        required: false,
      },
      {
        title: "Cộng công",
        url: "de-xuat/cai-dat-loai-hinh-duyet-phep",
        required: false,
      },
      {
        title: "Lịch làm việc",
        url: "de-xuat/cai-dat-loai-hinh-duyet-phep",
        required: false,
      },
      {
        title: "Tăng ca",
        url: "de-xuat/cai-dat-loai-hinh-duyet-phep",
        required: false,
      },
      {
        title: "Hoa hồng",
        url: "de-xuat/cai-dat-loai-hinh-duyet-phep",
        required: false,
      },
      // {
      //   title: 'Cài đặt thời gian duyệt đề xuất',
      //   url: 'de-xuat/cai-dat-thoi-gian-duyet-de-xuat',
      //     required: false,
      // },
      // {
      //   title: 'Tạm ứng tiền',
      //   url: 'de-xuat/tam-ung-tien',
      //   required: false,
      // },
    ],
  },
];

export const LIST_ACTIONS_EMP = [
  {
    key: "0",
    title: "Chấm công bằng camera công ty",
    steps: [],
  },
  {
    key: "1",
    title: "Chấm công bằng nhận diện khuôn mặt",
    steps: [
      {
        title: "Chamcong365",
        icon: "/ql_chamcong.png",
        url: "cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/cham-cong-365",
      },
      {
        title: "Chat365",
        icon: "/ql_chat.png",
        url: "cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/chat-365",
      },
      {
        title: "PC365 NHAN VIEN",
        icon: "/ql_pcnv.png",
        url: "cham-cong-nhan-vien/cham-cong-bang-nhan-dien-khuon-mat/pc-365-nhan-vien",
      },
    ],
  },
  // {
  //   key: '2',
  //   title: 'Chấm công bằng tài khoản công ty',
  //   steps: [
  //     {
  //       title: 'Chấm công bằng tài khoản công ty',
  //       icon: '',
  //       url: '/cham-cong-nhan-vien/cc-bang-tai-khoan-cong-ty',
  //     },
  //   ],
  // },

  {
    key: "2",
    title: "Tạo đề xuất",
    steps: [
      {
        title: "Loại đề xuất",
        icon: "",
        url: "tao-de-xuat/loai-de-xuat",
      },
    ],
  },
  {
    key: "3",
    title: "Cập nhật dữ liệu khuôn mặt",
    steps: [
      {
        title: "Cập nhật dữ liệu khuôn mặt",
        icon: "",
        url: "cap-nhat-du-lieu-khuon-mat",
      },
      {
        title: "Cập nhật dữ liệu khuôn mặt video",
        icon: "",
        url: "cap-nhat-du-lieu-khuon-mat-video",
      },
    ],
  },
  {
    key: "4",
    title: "Lịch sử",
    steps: [
      {
        title: "Chấm công",
        icon: "",
        url: "lich-su/cham-cong",
      },
      {
        title: "Lương hiện tại",
        icon: "",
        url: "lich-su/luong-hien-tai",
      },
      {
        title: "Bảng xuất công cá nhân",
        icon: "",
        url: "lich-su/xuat-cong-ca-nhan",
      },
    ],
  },
  {
    key: "5",
    title: "Tính lương",
    steps: [
      {
        title: "Xem bảng công",
        icon: "",
        url: "quan-ly/nhan-vien",
      },
      {
        title: "Xem bảng lương",
        icon: "",
        url: "quan-ly/tinh-luong",
      },
      {
        title: "Xem lịch làm việc cá nhân",
        icon: "",
        url: "quan-ly/lich-lam-viec",
      },
    ],
  },
];
