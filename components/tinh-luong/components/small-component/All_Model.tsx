import { Modal, Input, DatePicker, Button, Radio, Table } from "antd";
import { useState } from "react";
import styles from "./All_Model.module.css";
export function YearSelection({
  isModalDeteleOpen,
  handleDeleteCancel,
  handleConfirmDelete,
}: {
  isModalDeteleOpen: boolean;
  handleDeleteCancel: any;
  handleConfirmDelete: any;
}) {
  return (
    <Modal
      className={styles.modal_delete}
      title="Bạn chắc chắn muốn xóa ?"
      open={isModalDeteleOpen}
      onCancel={handleDeleteCancel}
      footer={null}
    >
      <div className={styles.modal_delete_body}>
        <Button
          type="primary"
          onClick={handleDeleteCancel}
          className={styles.btn_cancer}
        >
          Hủy
        </Button>
        <Button
          type="primary"
          onClick={handleConfirmDelete}
          className={styles.btn_delete}
        >
          Xóa
        </Button>
      </div>
    </Modal>
  );
}

export function ModalThemNhanVien({
  isModalAddOpen,
  handleModalAddCancer,
  searchText,
  onSearchChange,
  setSearchText,
  setFilteredData,
  allEmp,
  setSelectionType,
  rowSelection,
  columnsAdd,
  filteredData,
  dateFormat,
  policyTime,
  setPolicyTime,
  policyTimeEnd,
  setPolicyTimeEnd,
  handleAddEmp,
}: {
  isModalAddOpen: boolean;
  handleModalAddCancer: any;
  searchText: string;
  onSearchChange: Function;
  setSearchText: any;
  setFilteredData: any;
  allEmp: any[];
  setSelectionType: any;
  rowSelection: any;
  columnsAdd: any[];
  filteredData: any[];
  dateFormat: any;
  policyTime: any;
  setPolicyTime: any;
  policyTimeEnd: any;
  setPolicyTimeEnd: any;
  handleAddEmp: any;
}) {
  const { Search } = Input;
  return (
    <Modal
      title="Thêm nhân viên"
      className={`modal_add1 ${styles.modal_add}`}
      open={isModalAddOpen}
      onCancel={handleModalAddCancer}
      footer={null}
    >
      <div className={styles.modal_add_body}>
        <div className={styles.modal_add_content}>
          <Search
            className={`customSearch1`}
            placeholder="Nhập tên nhân viên cần tìm kiếm"
            allowClear
            enterButton="Search"
            value={searchText}
            onChange={(e) =>
              onSearchChange(
                e,
                setSearchText,
                setFilteredData,
                allEmp,
                "userName"
              )
            }
          />
        </div>
        <div>
          <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value);
            }}
            defaultValue="checkbox"
          />
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            className={`table_add ${styles.table_add}`}
            columns={columnsAdd}
            dataSource={filteredData.length > 0 ? filteredData : allEmp}
            pagination={false}
            scroll={{
              y: 200,
            }}
            rowKey="idQLC"
          />
        </div>
        <div>
          <div className={styles.time_element}>
            <p className={styles.p}>Áp dụng từ ngày</p>
            <DatePicker
              defaultValue={dateFormat}
              className={styles.times_month}
              value={policyTime}
              onChange={(date) => setPolicyTime(date)}
            />
          </div>
          <div>
            <p className={styles.p}>Đến hết ngày(không bắt buộc)</p>
            <DatePicker
              defaultValue={dateFormat}
              className={styles.times_month}
              value={policyTimeEnd}
              onChange={(date) => setPolicyTimeEnd(date)}
            />
          </div>
        </div>
        <div className={styles.modal_add_content}>
          <Button
            type="primary"
            className={`btn_add_cancer ${styles.btn_add_cancer}`}
            onClick={handleModalAddCancer}
          >
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            className={`btn_add ${styles.btn_add}`}
            onClick={handleAddEmp}
          >
            Thêm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// function choModalThemNhanVien() {
//   const [isModalAddOpen, setIsModalAddOpen] = useState(false);
//   const [allEmp, setAllEmp] = useState([]);
//   const hanleModalAddCancer = () => {
//     setSelectedEmpAdd([]);
//     setIsModalAddOpen(false);
//   };
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState(allEmp);
//   const dateFormat = "YYYY-MM-DD";
//   const [policyTime, setPolicyTime] = useState(dayjs);
//   const [policyTimeEnd, setPolicyTimeEnd] = useState(dayjs);
//   const handleAddEmp = () => {
//     selectedEmpAdd.map((item) => {
//       axios
//         .post(`${domain}/api/tinhluong/congty/them_nv_nhom`, {
//           cls_id_cl: selectedPhuCap,
//           token: token,
//           cls_id_com: cp,
//           cls_id_user: item,
//           cls_day: policyTime.format("YYYY-MM-DDT00:00:00.000+00:00"),
//           cls_day_end: policyTimeEnd.format("YYYY-MM-DDT00:00:00.000+00:00"),
//         })
//         .then((res) => {
//           if (res) {
//             alert("Thêm nhân viên thành công");
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             alert("Thêm nhân viên thất bại");
//           }
//         });
//     });

//     setSelectedPhuCap(0);
//     setPolicyTime(dayjs);
//     setSelectedEmpAdd([]);
//     setPolicyTimeEnd(dayjs);
//     setIsModalAddOpen(false);
//   };

//   //*useState phu
//   const [allEmp, setAllEmp] = useState([]);
//   const [selectedEmpAdd, setSelectedEmpAdd] = useState([]);
//   const [selectedPhucLoi, setSelectedPhucLoi] = useState(0);
//   return null;
// }
