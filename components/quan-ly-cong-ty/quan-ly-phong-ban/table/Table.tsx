import { Table } from 'antd'
import styles from './Table.module.css'
import { JsxElement } from 'typescript'
import { ReactNode } from 'react'

export function MyTable({
  colunms,
  data,
  onRowClick,
  hasRowSelect,
  selectedRowKeys,
  onSelectChange,
  rowKey,
  Footer,
  pagination,
}: {
  colunms: Array<any>
  data: Array<any>
  onRowClick: (record: any, index: number | undefined) => void
  hasRowSelect: boolean
  selectedRowKeys: any
  onSelectChange: (newSelectedRowKeys: any) => void
  rowKey: string
  Footer: ReactNode
  pagination?: {}
}) {
  return (
    <Table
      style={{ marginTop: '20px' }}
      columns={colunms}
      dataSource={data}
      className={`green-table ${styles.table}`}
      rowClassName={styles.row}
      rowKey={rowKey}
      pagination={{ position: ['bottomCenter'], ...pagination }}
      scroll={{ x: 'max-content' }}
      rowSelection={
        hasRowSelect
          ? {
              selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: '60px',
            }
          : undefined
      }
      onRow={(record, index) => {
        return {
          onClick: () => onRowClick(record, index),
        }
      }}
      footer={() => <div style={{ backgroundColor: '#fff' }}>{Footer}</div>}
    />
  )
}
