import { CSVLink } from 'react-csv'
import * as XLSX from 'xlsx'

const ExcelDataExport = (data: any[][], fileName: string) => {
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data)
  const wb: XLSX.WorkBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, fileName)
  const wbout: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob: Blob = new Blob([wbout], { type: 'application/octet-stream' })
  const url: string = URL.createObjectURL(blob)
  const a: HTMLAnchorElement = document.createElement('a')
  a.href = url
  a.download = `${fileName || 'exported_data'}.xlsx`
  a.click()
  URL.revokeObjectURL(url)
}

export const ExportExcellButton = ({
  fileName,
  fileHeaders,
  data,
  component,
  listkeys,
}) => {
  const listHeader = [
    [
      'CÔNG TY CỔ PHẦN THANH TOÁN HƯNG HÀ',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    ...fileHeaders.map((item) => [
      item,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ]),
  ]

  return (
    <CSVLink data={[...listHeader, listkeys, ...data]} filename={fileName}>
      {component}
    </CSVLink>
  )
}

export default ExcelDataExport
