import { Avatar, Button, Col, Row } from 'antd'
import styles from './chi-tiet-xin-tang-ca.module.css'
import { useState } from 'react'
const fakeData =
{
    name: 'Nguyen Van A',
    nhomdexuat: 'du an',
    capnhat: '2 ngay truoc',
    phongban: 'phong 1',
    chucvu: 'nhanvienchinhthuc',
    duanthamgia: 'figma',
    lydothamgia: 'thayok',
    time: '07:27 AM',
    date: '07-04-2023',
    ca: 'Ca chiều 7TR < LƯƠNG <= 10TR',
    timeOT: '18-06-2023',
    phanquyen: 1,
    chapthuan: 2
}
const nguoiTheoDoi = [
    {
        id: '12345',
        url: '/avata.png',
        name: 'Nguyen Van A',
    }
]
export const ChiTietXinTangCa: React.FC = () => {
    const [indexinfoCHapNhan, setIndexInfoChapNhan] = useState(0)
    const [indexinfoTuChoi, setIndexInfoTuChoi] = useState(0)
    const lanhDaoDuyet = [
        {
            id: '12345',
            url: '/avata.png',
            name: 'Nguyen Van A',
            time: '22:04 PM',
            date: '22-04-2023',
            chapthuan: indexinfoCHapNhan,
            tuchoi: indexinfoTuChoi
        },
        {
            id: '12345',
            url: '/avata.png',
            name: 'Nguyen Van B',
            time: '22:04 PM',
            date: '22-04-2023',
            chapthuan: 0
        },
    ]
    const [checkChapThuan, setCheckChapThuan] = useState(true)
    const [chapThuan, setChapThuan] = useState(false)
    const [tuChoi, setTuChoi] = useState(false)
    const [hetHan, setHetHan] = useState(false)
    const infochapnhan = () => {
        return (
            lanhDaoDuyet.map((x, index) => {
                if (x.chapthuan === 1) {
                    return (
                        <div className={styles.nguoitao} key={index}>
                            <div className={styles.iconnguoitao}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 12L11 14L15.5 9.5M9.2019 20.6009C9.52965 20.5575 9.86073 20.6464 10.1218 20.8475L11.3251 21.7708C11.7228 22.0764 12.2761 22.0764 12.6727 21.7708L13.9215 20.812C14.1548 20.6331 14.4492 20.5542 14.7403 20.5931L16.3024 20.7986C16.799 20.8642 17.2779 20.5875 17.4701 20.1242L18.0712 18.6709C18.1834 18.3987 18.3989 18.1832 18.6711 18.0709L20.1243 17.4698C20.5876 17.2787 20.8643 16.7988 20.7987 16.3021L20.601 14.7966C20.5576 14.4688 20.6465 14.1377 20.8476 13.8766L21.7709 12.6733C22.0764 12.2755 22.0764 11.7222 21.7709 11.3256L20.812 10.0767C20.6332 9.84339 20.5543 9.54896 20.5932 9.25785L20.7987 7.69568C20.8643 7.19902 20.5876 6.72015 20.1243 6.52793L18.6711 5.92684C18.3989 5.81462 18.1834 5.59907 18.0712 5.32685L17.4701 3.87356C17.279 3.41024 16.799 3.13358 16.3024 3.19913L14.7403 3.40468C14.4492 3.44468 14.1548 3.36579 13.9226 3.18802L12.6738 2.22916C12.2761 1.92361 11.7228 1.92361 11.3262 2.22916L10.0774 3.18802C9.84407 3.36579 9.54965 3.44468 9.25856 3.40691L7.69647 3.20136C7.19984 3.1358 6.721 3.41246 6.52879 3.87578L5.92884 5.32907C5.81552 5.60018 5.59998 5.81573 5.32889 5.92906L3.87568 6.52904C3.41238 6.72126 3.13574 7.20013 3.20129 7.69679L3.40683 9.25897C3.4446 9.55007 3.36572 9.8445 3.18796 10.0767L2.22915 11.3256C1.92362 11.7233 1.92362 12.2767 2.22915 12.6733L3.18796 13.9222C3.36683 14.1555 3.44571 14.4499 3.40683 14.741L3.20129 16.3032C3.13574 16.7999 3.41238 17.2787 3.87568 17.471L5.32889 18.0721C5.60109 18.1843 5.81663 18.3998 5.92884 18.672L6.5299 20.1253C6.721 20.5887 7.20096 20.8653 7.69758 20.7998L9.2019 20.6009Z" stroke="#70BE28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p className={styles.textinfo} style={{ marginBottom: '0' }}>{x.time}, {x.date} <span className={styles.name}>{x.name}</span> vừa duyệt đề xuất</p>
                        </div>
                    )
                }
                if (x.tuchoi) {
                    return (
                        <div className={styles.nguoitao} key={index}>
                            <div className={styles.iconnguoitao}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 9L15 15" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 9L9 15" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="12" cy="12" r="9" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p className={styles.textinfo} style={{ marginBottom: '0' }}>{x.time}, {x.date} <span className={styles.name}>{x.name}</span> vừa từ chối đề xuất</p>
                        </div>
                    )
                }
            })
        )
    }
    const checkDuyet = () => {
        if (fakeData.chapthuan === lanhDaoDuyet.length) {
            return (
                <div className={styles.buttonxet}>
                    <Button className={styles.buttonDuocDuyet}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15.5 9.5M9.2019 20.6009C9.52965 20.5575 9.86073 20.6464 10.1218 20.8475L11.3251 21.7708C11.7228 22.0764 12.2761 22.0764 12.6727 21.7708L13.9215 20.812C14.1548 20.6331 14.4492 20.5542 14.7403 20.5931L16.3024 20.7986C16.799 20.8642 17.2779 20.5875 17.4701 20.1242L18.0712 18.6709C18.1834 18.3987 18.3989 18.1832 18.6711 18.0709L20.1243 17.4698C20.5876 17.2787 20.8643 16.7988 20.7987 16.3021L20.601 14.7966C20.5576 14.4688 20.6465 14.1377 20.8476 13.8766L21.7709 12.6733C22.0764 12.2755 22.0764 11.7222 21.7709 11.3256L20.812 10.0767C20.6332 9.84339 20.5543 9.54896 20.5932 9.25785L20.7987 7.69568C20.8643 7.19902 20.5876 6.72015 20.1243 6.52793L18.6711 5.92684C18.3989 5.81462 18.1834 5.59907 18.0712 5.32685L17.4701 3.87356C17.279 3.41024 16.799 3.13358 16.3024 3.19913L14.7403 3.40468C14.4492 3.44468 14.1548 3.36579 13.9226 3.18802L12.6738 2.22916C12.2761 1.92361 11.7228 1.92361 11.3262 2.22916L10.0774 3.18802C9.84407 3.36579 9.54965 3.44468 9.25856 3.40691L7.69647 3.20136C7.19984 3.1358 6.721 3.41246 6.52879 3.87578L5.92884 5.32907C5.81552 5.60018 5.59998 5.81573 5.32889 5.92906L3.87568 6.52904C3.41238 6.72126 3.13574 7.20013 3.20129 7.69679L3.40683 9.25897C3.4446 9.55007 3.36572 9.8445 3.18796 10.0767L2.22915 11.3256C1.92362 11.7233 1.92362 12.2767 2.22915 12.6733L3.18796 13.9222C3.36683 14.1555 3.44571 14.4499 3.40683 14.741L3.20129 16.3032C3.13574 16.7999 3.41238 17.2787 3.87568 17.471L5.32889 18.0721C5.60109 18.1843 5.81663 18.3998 5.92884 18.672L6.5299 20.1253C6.721 20.5887 7.20096 20.8653 7.69758 20.7998L9.2019 20.6009Z" stroke="#70BE28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className={styles.textDuocDuyet}>Đã chấp thuận</p>
                    </Button>
                </div>
            )
        }
    }
    const phanquyen = () => {
        if (fakeData.phanquyen === 1) {
            return (
                <div>
                    {/* trạng thái chờ duyệt */}
                    {checkChapThuan ? (
                        <div className={styles.buttonxet}>
                            <Button className={styles.buttonChapThuan} onClick={() => { setChapThuan(true), setCheckChapThuan(false), setIndexInfoChapNhan(1) }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M7 13L10 16L17 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textChapThuan}>Chấp thuận</p>
                            </Button>
                            <Button className={styles.buttonTuChoi} onClick={() => { setTuChoi(true), setCheckChapThuan(false), setIndexInfoTuChoi(1) }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textTuChoi}>Từ chối</p>
                            </Button>
                            <Button className={styles.buttonXoaDeXuat}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textXoaDeXuat}>Xóa đề xuất</p>
                            </Button>
                        </div>
                    ) : (<></>)}
                    {/* trạng thái đã duyệt */}
                    {chapThuan ? (
                        <div className={styles.buttonxet}>
                            <Button className={styles.buttonDaChapThuan}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 12L11 14L15.5 9.5M9.2019 20.6009C9.52965 20.5575 9.86073 20.6464 10.1218 20.8475L11.3251 21.7708C11.7228 22.0764 12.2761 22.0764 12.6727 21.7708L13.9215 20.812C14.1548 20.6331 14.4492 20.5542 14.7403 20.5931L16.3024 20.7986C16.799 20.8642 17.2779 20.5875 17.4701 20.1242L18.0712 18.6709C18.1834 18.3987 18.3989 18.1832 18.6711 18.0709L20.1243 17.4698C20.5876 17.2787 20.8643 16.7988 20.7987 16.3021L20.601 14.7966C20.5576 14.4688 20.6465 14.1377 20.8476 13.8766L21.7709 12.6733C22.0764 12.2755 22.0764 11.7222 21.7709 11.3256L20.812 10.0767C20.6332 9.84339 20.5543 9.54896 20.5932 9.25785L20.7987 7.69568C20.8643 7.19902 20.5876 6.72015 20.1243 6.52793L18.6711 5.92684C18.3989 5.81462 18.1834 5.59907 18.0712 5.32685L17.4701 3.87356C17.279 3.41024 16.799 3.13358 16.3024 3.19913L14.7403 3.40468C14.4492 3.44468 14.1548 3.36579 13.9226 3.18802L12.6738 2.22916C12.2761 1.92361 11.7228 1.92361 11.3262 2.22916L10.0774 3.18802C9.84407 3.36579 9.54965 3.44468 9.25856 3.40691L7.69647 3.20136C7.19984 3.1358 6.721 3.41246 6.52879 3.87578L5.92884 5.32907C5.81552 5.60018 5.59998 5.81573 5.32889 5.92906L3.87568 6.52904C3.41238 6.72126 3.13574 7.20013 3.20129 7.69679L3.40683 9.25897C3.4446 9.55007 3.36572 9.8445 3.18796 10.0767L2.22915 11.3256C1.92362 11.7233 1.92362 12.2767 2.22915 12.6733L3.18796 13.9222C3.36683 14.1555 3.44571 14.4499 3.40683 14.741L3.20129 16.3032C3.13574 16.7999 3.41238 17.2787 3.87568 17.471L5.32889 18.0721C5.60109 18.1843 5.81663 18.3998 5.92884 18.672L6.5299 20.1253C6.721 20.5887 7.20096 20.8653 7.69758 20.7998L9.2019 20.6009Z" stroke="#70BE28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textDaChapThuan}>Được chấp thuận</p>
                            </Button>
                            <Button className={styles.buttonTuChoi} onClick={() => { setChapThuan(false), setCheckChapThuan(true), setIndexInfoChapNhan(0) }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textTuChoi}>Hủy duyệt</p>
                            </Button>
                            <Button className={styles.buttonXoaDeXuat}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textXoaDeXuat}>Xóa đề xuất</p>
                            </Button>
                        </div>
                    ) : (<></>)}
                    {/* trạng thái từ chối */}
                    {tuChoi ? (
                        <div className={styles.buttonxet}>
                            <Button className={styles.buttonDaTuChoi}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textDaTuChoi}>Đã từ chối</p>
                            </Button>
                            <Button className={styles.buttonXoaDeXuat}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textXoaDeXuat}>Xóa đề xuất</p>
                            </Button>
                        </div>
                    ) : (<></>)}
                    {/* trạng thái đã quá hạn */}
                    {hetHan ? (
                        <div>
                            <Button className={styles.buttonDaTuChoi}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="#DA302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textDaTuChoi}>Đề xuất quá hạn duyệt</p>
                            </Button>
                            <Button className={styles.buttonXoaDeXuatHetHan}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textXoaDeXuat}>Xóa đề xuất</p>
                            </Button>
                        </div>
                    ) : (<></>)}
                </div>
            )
        }
        return checkDuyet()
    }
    return (
        <Row gutter={24} className={styles.body}>
            <Col md={15} sm={24} xs={24} className={styles.col1}>
                <div className={styles.header1}>
                    <div className={styles.linkheader1}>
                        <div className={styles.iconlinkheader1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
                                <path d="M10.6001 1.66189L1.12635 11.1356L10.6001 20.6094" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <p className={styles.textheader1}>Trở lại danh sách</p>
                    </div>
                    <div className={styles.iconheader1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path d="M22.5 16.875H23.625C24.5678 16.875 25.0392 16.875 25.3321 16.5821C25.625 16.2892 25.625 15.8178 25.625 14.875V12.125C25.625 10.2394 25.625 9.29657 25.0392 8.71079C24.4534 8.125 23.5106 8.125 21.625 8.125H8.375C6.48938 8.125 5.54657 8.125 4.96079 8.71079C4.375 9.29657 4.375 10.2394 4.375 12.125V15.875C4.375 16.3464 4.375 16.5821 4.52145 16.7286C4.66789 16.875 4.9036 16.875 5.375 16.875H7.5" stroke="white" stroke-width="2" />
                            <path d="M8.125 24.9313L8.125 13.875C8.125 12.9322 8.125 12.4608 8.41789 12.1679C8.71079 11.875 9.18219 11.875 10.125 11.875L19.875 11.875C20.8178 11.875 21.2892 11.875 21.5821 12.1679C21.875 12.4608 21.875 12.9322 21.875 13.875L21.875 24.9313C21.875 25.2478 21.875 25.4061 21.7712 25.481C21.6674 25.5558 21.5172 25.5057 21.2169 25.4056L18.2988 24.4329C18.2128 24.4043 18.1698 24.3899 18.1255 24.3912C18.0811 24.3925 18.0391 24.4094 17.9549 24.443L15.1857 25.5507C15.094 25.5874 15.0481 25.6057 15 25.6057C14.9519 25.6057 14.906 25.5874 14.8143 25.5507L12.0451 24.443L12.0451 24.443C11.9609 24.4094 11.9189 24.3925 11.8745 24.3912C11.8302 24.3899 11.7872 24.4043 11.7012 24.4329L8.78311 25.4056C8.4828 25.5057 8.33264 25.5558 8.22882 25.481C8.125 25.4061 8.125 25.2478 8.125 24.9313Z" stroke="white" stroke-width="2" />
                            <path d="M11.875 16.875L16.875 16.875" stroke="white" stroke-width="2" stroke-linecap="round" />
                            <path d="M11.875 20.625L18.125 20.625" stroke="white" stroke-width="2" stroke-linecap="round" />
                            <path d="M21.875 8.125V6.725C21.875 5.02794 21.875 4.17942 21.3478 3.65221C20.8206 3.125 19.9721 3.125 18.275 3.125H11.725C10.0279 3.125 9.17942 3.125 8.65221 3.65221C8.125 4.17942 8.125 5.02794 8.125 6.725V8.125" stroke="white" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <div className={styles.body1}>
                    <div>
                        <div className={styles.title1}>
                            <p className={styles.texttitle1}>Đề xuất xin tăng ca</p>
                        </div>
                        <div className={styles.phanquyen2}>
                            {phanquyen()}
                        </div>
                        <div className={styles.infodexuat}>
                            <div className={styles.titleinfodexuat}>
                                <p className={styles.texttitleinfodexuat}>Thông tin đề xuất</p>
                            </div>
                            <div className={styles.ndinfodexuat}>
                                <p className={styles.textinfo}>Người tạo: {fakeData.name}</p>
                                <div className={styles.khungtextinfo}>
                                    <p className={styles.textinfo}>Nhóm đề xuất: </p><p className={styles.name}>{fakeData.nhomdexuat}</p>
                                </div>
                                <p className={styles.textinfo}>Thời gian tạo: {fakeData.time} {fakeData.date}</p>
                                <p className={styles.textinfo}>Cập nhật: {fakeData.capnhat}</p>
                            </div>
                        </div>
                        <div className={styles.infochung}>
                            <div className={styles.titleinfochung}>
                                <p className={styles.texttitleinfodexuat}>Thông tin chung</p>
                            </div>
                            <div className={styles.ndinfochung}>
                                <div className={styles.khungtextinfo}>
                                    <p className={styles.textinfo}>1. Họ và tên: </p>
                                    <p className={styles.name}>{fakeData.name}</p>
                                </div>
                                <p className={styles.textinfo}>2. Thời gian: {fakeData.timeOT}</p>
                                <p className={styles.textinfo}>3. Ca tăng: {fakeData.ca}</p>
                                <p className={styles.textinfo}>4. Lý do đề xuất xin tăng ca:</p>
                                <p className={styles.textinfo}>{fakeData.lydothamgia}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.phanquyen1}>
                        {phanquyen()}
                    </div>
                </div>
            </Col>
            <Col md={9} sm={24} xs={24} className={styles.col2}>
                <div className={styles.header2}>
                    <div className={styles.iconheader2}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 16L12 12M12 8H11.99M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <p className={styles.textheader2}>Thông tin đề xuất</p>
                </div>
                <div className={styles.body2}>
                    <div className={styles.the}>
                        <div className={styles.khung}>
                            <div style={{ marginTop: '-15px', }}>
                                <p className={styles.texttitleinfodexuat}>Lãnh đạo duyệt</p>
                                <div style={{ marginTop: '15px' }}>
                                    {
                                        lanhDaoDuyet.map((x, index) => {
                                            return (
                                                <div className={styles.infox} key={index}>
                                                    <Avatar src={x.url} className={styles.img} />
                                                    <div className={styles.khungtextx}>
                                                        <p className={styles.namex}>{x.name}</p>
                                                        <p className={styles.textinfox}>ID: {x.id}</p>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.khung}>
                            {
                                nguoiTheoDoi.map((x, index) => {
                                    return (
                                        <div key={index}>
                                            <p className={styles.texttitleinfodexuat}>Người theo dõi</p>
                                            <div className={styles.infox} style={{paddingTop:'10px'}}>
                                                <Avatar src={x.url} className={styles.img} />
                                                <div className={styles.khungtextx}>
                                                    <p className={styles.namex}>{x.name}</p>
                                                    <p className={styles.textinfox}>ID: {x.id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.trangthai}>
                            <p className={styles.texttitleinfodexuat}>Trạng thái đề xuất</p>
                            <div className={styles.nguoitao}>
                                <div className={styles.iconnguoitao}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M5.8335 10.0007L10.0002 10.0007M10.0002 10.0007L14.1668 10.0007M10.0002 10.0007V5.83398M10.0002 10.0007L10.0002 14.1673" stroke="#4C5BD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="10" cy="10" r="7.5" stroke="#4C5BD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <p className={styles.textinfo} style={{ marginBottom: '0' }}>{fakeData.time}, {fakeData.date} <span className={styles.name}>{fakeData.name}</span> vừa tạo đề xuất</p>
                            </div>
                            {
                                lanhDaoDuyet.map((x, index) => {
                                    return (
                                        <div className={styles.nguoitao} key={index}>
                                            <div className={styles.iconnguoitao}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M17.5 5H14.8333C13.4332 5 12.7331 5 12.1984 5.27248C11.728 5.51217 11.3455 5.89462 11.1058 6.36502C10.8333 6.8998 10.8333 7.59987 10.8333 9V10M17.5 5L15 2.5M17.5 5L15 7.5M8.33333 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V11.6667" stroke="#4C5BD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <p className={styles.textinfo} style={{ marginBottom: '0' }}>{x.time}, {x.date} <span className={styles.name}>{x.name}</span> vừa tiếp nhận đề xuất</p>
                                        </div>
                                    )
                                })
                            }
                            {infochapnhan()}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}