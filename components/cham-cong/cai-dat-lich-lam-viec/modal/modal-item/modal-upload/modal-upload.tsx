import { Modal, Button, Upload } from 'antd'
import Image from 'next/image'
import styles from './modal-upload.module.css'
import type { UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
export function UpLoadNV(
    open:boolean,
    setOpen:Function,
    setBack:Function
){
    const { Dragger } = Upload;
    const props: UploadProps = {
        name: 'file',
        multiple: false
      };

    return(
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            width={600}
            closable={false}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
        >
        <div className={styles.header}>
            <div></div>
            <div></div>
            <Image
                alt="/"
                src={"/cross.png"}
                width={14}
                height={14}
                onClick={() => {
                    setOpen(false)
                    setBack(true)}
                }
            />
        </div>
        <div className={styles.body}>
            <div style={{margin:'20px'}}>
                <Dragger {...props}>
                    <img src="/upload_light.png" alt="" />
                    
                    <p className="ant-upload-text" style={{fontSize:'16px'}}>Thả hoặc kéo vào đây  hoặc</p>
                    <Button className={styles.button}><p className={`${styles.font16} ${styles.txt}`}>Browe file</p></Button>
                </Dragger>
            </div>
            <div style={{display:'flex', alignItems:'center', color:'#4C5BD4',fontWeight:'bold'}}
                className={styles.font18}>
                Tải file mẫu 
                <img src="/quay_lai.png" alt="" style={{transform:'rotate(180deg)',marginLeft:'10px'}}/>
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button className={styles.button}><p className={`${styles.font18} ${styles.txt}`}>Thêm nhân viên</p></Button>
            </div>
            <div style={{marginTop:'20px'}}>
                <p className={styles.font16}>
                    Lưu ý: Những nhân viên đã được xét lịch làm việc sẽ không thể tạo thêm vào bất kỳ lịch làm việc nào khác.
                </p>
            </div>
        </div>
        </Modal>
    )
}
