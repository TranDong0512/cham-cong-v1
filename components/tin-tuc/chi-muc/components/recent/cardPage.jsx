import styles from './index.module.css'
import { Card, Pagination } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

const CardPage = () => {
  return (
    <div>
      <div className={styles.card_page}>
        <Card title='Quản Lý Nhân Lực' bordered={false}>
          <div className={styles.div_card}>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Phần mềm chấm công{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Phần mềm tính lương{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Phần mềm quản trị nhân sự{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Đánh giá năng lực nhân viên{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Quản lý cuộc họp{' '}
            </a>
          </div>
        </Card>
        <Card
          title='Quản Lý Công Việc'
          bordered={false}
          style={{ marginTop: '30px' }}>
          <div className={styles.div_card}>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined />
              Phần mềm lịch biểu
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Giao việc{' '}
            </a>
          </div>
        </Card>
        <Card
          title='Quản Lý Nội Bộ'
          bordered={false}
          style={{ marginTop: '30px' }}>
          <div className={styles.div_card}>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Phần mềm văn thư lưu trữ{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Truyền thông văn hóa{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Phần mềm phiên dịch{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Chuyển văn bản - giọng nói{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Quản lý tài sản{' '}
            </a>
          </div>
        </Card>
        <Card
          title='Quản Lý Bán Hàng'
          bordered={false}
          style={{ marginTop: '30px' }}>
          <div className={styles.div_card}>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Phần mềm CRM{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Phần mềm DMS{' '}
            </a>
            <a style={{ color: '#474747' }}>
              <PlusCircleOutlined /> Quản lý bán hàng{' '}
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default CardPage
