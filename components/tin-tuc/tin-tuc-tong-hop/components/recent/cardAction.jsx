import styles from './index.module.css'
import { PlusCircleOutlined } from '@ant-design/icons'

const CardAction = () => {
  return (
    <div className={styles.card_2}>
      <div className={styles.card_2_element}>
        <div className={styles.card_2_title}>Quản lý nhân lực</div>
        <div className={styles.card_2_options}>
          <div>
            <PlusCircleOutlined /> Phần mềm chấm công
          </div>
          <div>
            <PlusCircleOutlined /> Phần mềm tính lương
          </div>
          <div>
            <PlusCircleOutlined /> Phần mềm quản trị nhân sự
          </div>
          <div>
            <PlusCircleOutlined /> Đánh giá năng lực nhân viên
          </div>
          <div>
            <PlusCircleOutlined /> Quản lý cuộc họp
          </div>
        </div>
      </div>
      <div className={styles.card_2_element}>
        <div className={styles.card_2_title}>Quản lý công việc</div>
        <div className={styles.card_2_options}>
          <div>
            <PlusCircleOutlined /> Phần mềm lịch biểu
          </div>
          <div>
            <PlusCircleOutlined /> Giao việc
          </div>
        </div>
      </div>
      <div className={styles.card_2_element}>
        <div className={styles.card_2_title}>Quản lý nội bộ</div>
        <div className={styles.card_2_options}>
          <div>
            <PlusCircleOutlined /> Phần mềm văn thư lưu trữ
          </div>
          <div>
            <PlusCircleOutlined /> Truyền thông văn hóa
          </div>
          <div>
            <PlusCircleOutlined /> Phần mềm phiên dịch
          </div>
          <div>
            <PlusCircleOutlined /> Chuyển văn bản - giọng nói
          </div>
          <div>
            <PlusCircleOutlined /> Quản lý tài sản
          </div>
        </div>
      </div>
      <div className={styles.card_2_element}>
        <div className={styles.card_2_title}>Quản lý bán hàng</div>
        <div className={styles.card_2_options}>
          <div>
            <PlusCircleOutlined /> Phần mềm CRM
          </div>
          <div>
            <PlusCircleOutlined /> Phần mềm DMS
          </div>
          <div>
            <PlusCircleOutlined /> Quản lý bán hàng
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardAction
