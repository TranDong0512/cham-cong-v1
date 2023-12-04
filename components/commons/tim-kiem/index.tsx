import { Button } from 'antd'
export default function SearchCustomize({ searchEmployee }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      <Button
        type='primary'
        onClick={searchEmployee}
        size='large'
        style={{
          fontSize: '14px',
          width: '100%',
          //   justifyContent: 'center',

          margin: 'auto',
          color: '#fff',
        }}
        icon={
          <img
            src='../img/Group.png'
            alt='Tìm việc 365'
            style={{
              width: '16px',
              height: '16px',
            }}
          />
        }>
        <span style={{ color: '#fff' }}> Tìm kiếm</span>
      </Button>
    </div>
  )
}
