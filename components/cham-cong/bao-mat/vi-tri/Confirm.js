import { Button, Form, Input, Modal, Select, } from 'antd'
import styles from './Map.module.css'
import CallApi from '@/pages/api/call_api'
import Cookies from 'js-cookie'
import { TYPE_ADD, TYPE_UPDATE } from './GoogleMapComponent'
import { useState } from 'react'

export const TYPE_DELETE = 'delete'

const ConfirmModal = (open, setOpen, type, sendData, setData, setOpenMap) => {
    const [disabled, setDisable] = useState(false)
    if (open) {
        const getData = async () => {
            try {
                let response;
                let result = false; // Kết quả mặc định
        
                switch (type) {
                    case TYPE_ADD:
                        response = await CallApi.addNewLocation(sendData, Cookies.get('token_base365'));
                        break;
                    case TYPE_UPDATE:
                        response = await CallApi.updateLocation(sendData, Cookies.get('token_base365'));
                        break;
                    case TYPE_DELETE:
                        response = await CallApi.deleteLocation(sendData, Cookies.get('token_base365'));
                        break;
                    default:
                        break;
                }
        
                // Kiểm tra response và xử lý kết quả
                if (response && response.data && response.data.data && response.data.data.result) {
                    result = true;
                }
        
                return result;
            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu:', error);
                return false; // Xử lý lỗi khi gửi yêu cầu
            }
        }
        const onYes = async (event) => {
            setOpen(false)
            const data = await getData()
            console.log('-----------------');
            console.log(data);
            console.log('-----------------');
            if (!data) {
                alert('Không thành công'); // Hiển thị thông báo lỗi
                setOpen(false)
            } else {
                alert('Thành công'); // Hiển thị thông báo lỗi
                setOpen(false)
                if (setOpenMap) setOpenMap(false)
                const response = await CallApi.getListLocations({}, Cookies.get('token_base365'))
                setData([response.data.data.list])
            }
        }
        return (
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                width={450}
                closable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <div className={styles.confirmBody}>
                    {
                        type === TYPE_DELETE ? <>
                            <p className={styles.alertText}>Hành động không thể hoàn tác.</p>
                            <p>Bạn có chắc chắn muốn xóa?</p>
                            <div className={styles.btnGroup}>
                                <Button
                                    className={styles.abortBtn}
                                    size='large'
                                    onClick={() => setOpen(false)}>
                                    Hủy
                                </Button>
                                <Button className={styles.confirmBtn} size='large' onClick={onYes} disabled={disabled}>
                                    <p className={styles.text}>Đồng ý</p>
                                </Button>
                            </div>
                        </> : type === TYPE_ADD ? <>
                            <p className={styles.alertText}>Hành động không thể hoàn tác.</p>
                            <p>Bạn có chắc chắn muốn thêm?</p>
                            <div className={styles.btnGroup}>
                                <Button
                                    className={styles.abortBtn}
                                    size='large'
                                    onClick={() => setOpen(false)}>
                                    Hủy
                                </Button>
                                <Button className={styles.confirmBtn} size='large' onClick={onYes} disabled={disabled}>
                                    <p className={styles.text}>Đồng ý</p>
                                </Button>
                            </div>
                        </> : <>
                            <p className={styles.alertText}>Hành động không thể hoàn tác.</p>
                            <p>Bạn có chắc chắn muốn sửa?</p>
                            <div className={styles.btnGroup}>
                                <Button
                                    className={styles.abortBtn}
                                    size='large'
                                    onClick={() => setOpen(false)}>
                                    Hủy
                                </Button>
                                <Button className={styles.confirmBtn} size='large' onClick={onYes} disabled={disabled}>
                                    <p className={styles.text}>Đồng ý</p>
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </Modal>
        )
    } else return
}

export default ConfirmModal