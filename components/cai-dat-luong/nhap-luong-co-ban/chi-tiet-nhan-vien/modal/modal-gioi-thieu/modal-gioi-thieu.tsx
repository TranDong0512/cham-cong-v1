import { Modal, Input, Select, Button, Form } from 'antd';
import styles from './modal-gioi-thieu.module.css';
import { useState } from 'react';
const { TextArea } = Input;
export function ModalGioiThieu(open: boolean, setOpen: Function, nhanxet: any) {
  const [ND, setND] = useState(nhanxet);
  const handleInputChange = (event: any) => {
    setND(event.target.value);
  };
  return (
    <Modal
      className="bannerQLC"
      open={open}
      onCancel={() => setOpen(false)}
      width={1140}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <div className={styles.body}>
        <div className={styles.khungtitle}>
          <p className={styles.title}>Giới thiệu</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3.9979H7.1875C5.42709 3.9979 4 5.42499 4 7.1854V16.8104C4 18.5708 5.42709 19.9979 7.1875 19.9979H16.8125C18.5729 19.9979 20 18.5708 20 16.8104V11.9979M18.4142 8.4121L19.5 7.32634C20.281 6.54529 20.281 5.27897 19.5 4.49792C18.7189 3.71687 17.4526 3.71688 16.6715 4.49794L15.5858 5.58367M18.4142 8.4121L12.3779 14.4485C12.0987 14.7277 11.7431 14.918 11.356 14.9954L8.41422 15.5838L9.00257 12.642C9.08001 12.2548 9.27032 11.8992 9.54951 11.62L15.5858 5.58367M18.4142 8.4121L15.5858 5.58367"
                stroke="#4C5BD4"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <TextArea
          style={{ resize: 'none' }}
          className={styles.input}
          rows={5}
          onChange={handleInputChange}
          value={ND}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            <p className={styles.text1}>Huỷ</p>
          </button>
          <button className={styles.button2}>
            <p className={styles.text2}>Lưu thông tin</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}
