import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from 'antd';
export const ExportExcel = ({title, columns, data, name, nameFile}) => {
    const exportToExcel = async () => {
        // Tạo một workbook và một worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        worksheet.mergeCells(`A1:${String.fromCharCode(65 + columns.length - 1)}1`);
        const nameCty = worksheet.getCell('A1');
        nameCty.value = name;
        nameCty.font = { bold: true, size: 16 };
        nameCty.alignment = { horizontal: 'center' };
        worksheet.mergeCells(`A2:${String.fromCharCode(65 + columns.length - 1)}2`);

        const titleCell = worksheet.getCell('A2');
        titleCell.value = title;
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { horizontal: 'center' };

        worksheet.addRow([]);

        const headerRow = worksheet.addRow([]);
        columns.forEach((column, index) => {
            const headerCell = headerRow.getCell(index + 1); // Sử dụng số thứ tự cột (index + 1)
            headerCell.value = column.header;
            headerCell.font = { bold: true }; // Đặt chữ đậm cho tiêu đề cột
        });

        data.map((item) => worksheet.addRow(item))
        
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
            <Button
                    //   className={styles.button2}
                      size="large"
                      type="primary"
                    //   style={{ marginTop: 8 }}
                      onClick={exportToExcel}
                    >
                      <p >Xuất file Excel</p>
                    </Button>
            {/* <button onClick={exportToExcel}>Export</button> */}
        </div>
    );
};


