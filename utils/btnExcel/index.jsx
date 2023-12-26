import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "antd";
import { IconEX } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
export const ExportExcel = ({
  title,
  columns,
  data,
  name,
  nameFile,
  loading,
  type
}) => {
  const exportToExcel = async () => {
    // Tạo một workbook và một worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    if (type == 2) {
      worksheet.mergeCells(`A1:AJ1`)
      worksheet.mergeCells(`A2:AJ2`)
    }
    else {
      worksheet.mergeCells(`A1:${String.fromCharCode(65 + columns.length - 1)}1`);
      worksheet.mergeCells(`A2:${String.fromCharCode(65 + columns.length - 1)}2`);
    }
    const nameCty = worksheet.getCell("A1");
    nameCty.value = name;
    nameCty.font = { bold: true, size: 16 };
    nameCty.alignment = { horizontal: "center" };

    const titleCell = worksheet.getCell("A2");
    titleCell.value = title;
    titleCell.font = { bold: true, size: 14 };
    titleCell.alignment = { horizontal: "center" };

    worksheet.addRow([]);

    const headerRow = worksheet.addRow([]);
    columns.forEach((column, index) => {
      const headerCell = headerRow.getCell(index + 1); // Sử dụng số thứ tự cột (index + 1)
      headerCell.value = column.header;
      headerCell.font = { bold: true }; // Đặt chữ đậm cho tiêu đề cột
    });

    data.map((item) => worksheet.addRow(item));

    worksheet.addRow([]);
    columns.forEach((column, index) => {
      const col = worksheet.getColumn(index + 1);
      col.width = column.width; // Set the width from the column definition
    });

    // Xuất workbook ra blob
    const blob = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([blob]), `${nameFile}.xlsx`);
  };

  return (
    <div>
     {type != 2 ? (
       <Button
       size="large"
       type="primary"
       loading={loading}
       onClick={exportToExcel}
     >
       {!loading ? <p>Xuất file Excel</p> : <p style={{width:99.362}}></p>}
     </Button>
     ) : (
      <Button  onClick={exportToExcel} loading={loading} style={{ display: 'flex', padding: 20, justifyContent:'center', alignItems: 'center', background: '#34b171', width: '100%'}} icon={<IconEX />}>
                <p style={{color: '#FFF', fontSize: 16, fontWeight: '400', lineHeight: '136%'}}>Xuất file excel</p>
              </Button>
     )}
    </div>
  );
};
