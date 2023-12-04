import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
// import requestIp from 'request-ip'

export const getEducation = [
  { id: 0, value: 'Chưa cập nhật' },
  { id: 1, value: 'Trên Đại học' },
  { id: 2, value: 'Đại học' },
  { id: 3, value: 'Cao đẳng' },
  { id: 4, value: 'Trung cấp' },
  { id: 5, value: 'Đào tạo nghề' },
  { id: 6, value: 'Trung học phổ thông' },
  { id: 7, value: 'Trung học cơ sở' },
  { id: 8, value: 'Tiểu học' },
]

export const eduLabel = getEducation.map((e) => ({
  label: e?.value,

  value: e?.id,
}))

// export async function getServerSideProps({ req, query }) {
//   const clientIp = requestIp.getClientIp(req)
//   const allowedIPs = [
//     '171.255.69.80',
//     '14.162.144.184',
//     '222.255.236.80',
//     '123.24.206.25',
//     '118.70.126.231',
//     '115.79.62.130',
//     '125.212.244.247',
//     '43.239.223.11',
//     '43.239.223.12',
//     '27.3.150.230',
//     '125.212.244.247',
//     '42.118.114.172',
//     '43.239.223.60',
//     '192.168.1.26',
//     '162.158.62.160',
//     '118.70.185.222',
//     '118.70.126.231',
//     '117.4.243.120',
//     '118.70.126.138',
//     '14.248.82.205',
//     '118.70.126.138',
//     '14.232.208.241',
//     '210.245.75.51',
//     '123.24.142.145',
//     '14.235.183.184',
//     '113.185.41.209',
//     '43.239.223.187',
//     '104.28.222.75',
//     '104.28.254.74',
//     '104.28.222.73',
//     '104.28.254.73',
//   ]
//   // if (!allowedIPs.includes(clientIp)) {
//   //     // Nếu địa chỉ IP không nằm trong danh sách cho phép, chuyển hướng đến trang lỗi hoặc trang khác
//   //     return {
//   //         redirect: {
//   //             destination: '/404',
//   //             permanent: false,
//   //         },
//   //     };
//   // }
//   return {
//     props: {
//       clientIp,
//       query,
//     },
//   }
// }

export const getExperience = [
  { id: 0, value: 'Chưa cập nhật' },
  { id: 1, value: 'Chưa có kinh nghiệm' },
  { id: 2, value: 'Dưới 1 năm kinh nghiệm' },
  { id: 3, value: '1 năm' },
  { id: 4, value: '2 năm' },
  { id: 5, value: '3 năm' },
  { id: 6, value: '4 năm' },
  { id: 7, value: '5 năm' },
  { id: 8, value: 'Trên 5 năm' },
]

export const expLabel = getExperience.map((e) => ({
  label: e?.value,
  value: e?.id,
}))

export const getPosition = [
  { id: 0, value: 'Chưa cập nhật' },
  { id: 1, value: 'SINH VIÊN THỰC TẬP' },
  { id: 2, value: 'NHÂN VIÊN THỬ VIỆC' },
  { id: 9, value: 'NHÂN VIÊN PART TIME' },
  { id: 3, value: 'NHÂN VIÊN CHÍNH THỨC' },
  { id: 20, value: 'NHÓM PHÓ' },
  { id: 4, value: 'TRƯỞNG NHÓM' },
  { id: 12, value: 'PHÓ TỔ TRƯỞNG' },
  { id: 13, value: 'TỔ TRƯỞNG' },
  { id: 10, value: 'PHÓ BAN DỰ ÁN' },
  { id: 11, value: 'TRƯỞNG BAN DỰ ÁN' },
  { id: 5, value: 'PHÓ TRƯỞNG PHÒNG' },
  { id: 6, value: 'TRƯỞNG PHÒNG' },
  { id: 7, value: 'PHÓ GIÁM ĐỐC' },
  { id: 8, value: 'GIÁM ĐỐC' },
  { id: 14, value: 'PHÓ TỔNG GIÁM ĐỐC' },
  { id: 16, value: 'TỔNG GIÁM ĐỐC' },
  { id: 22, value: 'PHÓ TỔNG GIÁM ĐỐC TẬP ĐOÀN' },
  { id: 21, value: 'TỔNG GIÁM ĐỐC TẬP ĐOÀN' },
  { id: 18, value: 'PHÓ CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ' },
  { id: 19, value: 'CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ' },
  { id: 17, value: 'THÀNH VIÊN HỘI ĐỒNG QUẢN TRỊ' },
]

export const positionLabel = getPosition.map((p) => ({
  label: p?.value,
  value: p?.id,
}))

export function renderEdu(id) {
  let name = 'Chưa cập nhật'
  getEducation.find((item) => {
    if (item.id === id) {
      name = item.value
    }
  })

  return name
}

export function renderExp(id) {
  let name = 'Chưa cập nhật'
  getExperience.find((item) => {
    if (item.id === id) {
      name = item.value
    }
  })

  return name
}

export function renderPosition(id) {
  let name = 'Chưa cập nhật'
  getPosition.find((item) => {
    if (item.id === id) {
      name = item.value
    }
  })

  return name
}

export const getGender = ['Khác', 'Nam', 'Nữ']

export const genderLabel = getGender.map((g, index) => ({
  label: g,
  value: index,
}))

export const getMarried = ['Độc thân', 'Đã kết hôn']

export const marriedLabel = getMarried.map((g, index) => ({
  label: g,
  value: index,
}))

export const getSoftware = [
  { id: 'cc365', value: 'Chấm công 365' },
  { id: 'tl365', value: 'Tính lương 365' },
  { id: 'hr365', value: 'Quản trị nhân sự' },
  { id: 'vt365', value: 'Văn thư lưu trữ' },
  { id: 'ttnb365', value: 'Truyền thông văn hóa' },
  { id: 'tts365', value: 'Chuyển đổi văn bản thành giọng nói' },
  { id: 'lb365', value: 'Quản lý lịch biểu' },
  { id: 'crs365', value: 'CRM' },
  { id: 'bp365', value: 'Biên phiên dịch' },
  { id: 'dg365', value: 'Đánh giá năng lực nhân viên' },
  { id: 'kpi365', value: 'Quản lý KPI' },
  { id: 'dms365', value: 'DMS' },
  { id: 'cu365', value: 'Quản lý cung ứng' },
  { id: 'kvt365', value: 'Quản lý kho vật tư xây dụng' },
  { id: 'qlts365', value: 'Quản lý tài sản' },
]

export function renderNamePM(value) {
  let name = 'Chưa xác định'
  getSoftware.find((item) => {
    if (item.id === value) {
      name = item.value
    }
  })
  return name
}

export function formatDate(dateString) {
  const parts = dateString.split('/')
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`
  return formattedDate
}

export function validatePhone(value) {
  if (value) {
    return /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i.test(
      value
    )
  }
  return true
}

export function validateMail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(value)) {
    return true
  }

  return false
}

export function validateIP(value) {
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  if (ipRegex.test(value)) {
    return true
  }

  return false
}

export function ConvertIntToDate(timestamp) {
  let date = new Date(timestamp * 1000)
  let year = date.getFullYear()
  let month = ('0' + (date.getMonth() + 1)).slice(-2) // Tháng được đếm từ 0, nên cần cộng 1 và định dạng kích thước 2 chữ số
  let day = ('0' + date.getDate()).slice(-2) // Định dạng ngày kích thước 2 chữ số
  // let hours = ("0" + date.getHours()).slice(-2);
  // let minutes = ("0" + date.getMinutes()).slice(-2);
  // let seconds = ("0" + date.getSeconds()).slice(-2);
  let formattedDate = [
    day + '-' + month + '-' + year,
    year + '-' + month + '-' + day,
  ]
  return formattedDate
}

export function generateRandomString(length) {
  const characters =
    'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

// function call api
export const functionAPI = async (url, data = null) => {
  let configHeader = {
    headers: {},
  }

  if (Cookies.get('token_base365')) {
    configHeader.headers['Authorization'] = `Bearer ${Cookies.get(
      'token_base365'
    )}`
  }

  let configData = {}
  if (data) {
    configData = data
  }

  let response = ''

  try {
    const call = await axios.post(url, configData, configHeader)
    response = call.data.data
  } catch (error) {
    response = error.response
  }

  return response
}

// check login
export function CheckLogin() {
  const acc_token = Cookies.get('token_base365')
  const rf_token = Cookies.get('rf_token')
  const role = Cookies.get('role')
  const router = useRouter()
  if (role && acc_token && rf_token) {
    let redirectUrl = ''
    if (role === '1') {
      redirectUrl = '/'
    } else if (role === '2') {
      redirectUrl = '/'
    } else {
      redirectUrl = '/'
    }
    if (redirectUrl != window.location.pathname) {
      router.push(redirectUrl)
    }
  }
}

export function CheckLogin2() {
  const router = useRouter()

  useEffect(() => {
    const acc_token = () => {
      return Cookies.get('token_base365')
    }
    const rf_token = () => {
      return Cookies.get('rf_token')
    }
    const role = () => {
      return Cookies.get('role')
    }

    if (!role() && !acc_token() && !rf_token()) {
      router.push('/')
    }
  }, [])
}
