import { Row, Col, Modal, Input, Checkbox, Button, List, Divider, Skeleton, Tabs  } from "antd"
import styles from "./modal-them-nhan-vien-2.module.css"
import Image from "next/image"
import { SearchOutlined } from '@ant-design/icons';
import { useState } from "react";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface Staff {
  id: string;
  url: string;
  name: string;
}

const { Search } = Input;

export function ModalThemNhanVien2({
    openAddStaffGroupClick,
    setOpenAddStaffdGroupClick,
}: {
    openAddStaffGroupClick: boolean
    setOpenAddStaffdGroupClick: any
})  {

  const ListStaff = [
    {
      id:"504004",
      url: "/anhnhanvien.png",
      name:"Hồ Mạnh Hùng"
    },
    {
      id:"504005",
      url: "/anhnhanvien.png",
      name:"Hồ Mạnh Hùng"
    },
    {
      id:"504006",
      url: "/anhnhanvien.png",
      name:"Hồ Mạnh Hùng"
    },
    {
      id:"504007",
      url: "/anhnhanvien.png",
      name:"Hồ Mạnh Hùng"
    },
    {
      id:"504008",
      url: "/anhnhanvien.png",
      name:"Hồ Mạnh Hùng"
    },
  ]
  const [checkedList, setCheckedList] = useState<Staff[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onSearch = () => {
    // console.log("on search");
  }

  const handleCheckedList = (e: Staff) => {
    setCheckedList([...checkedList, e]);
  }

  const handleRemoveFromCheckedList = (e: Staff) => {
    const updatedList = checkedList.filter((staff) => staff.id !== e.id);
    setCheckedList(updatedList);
  };

  const onChange = (checkedValues) => {
    setCheckedList(checkedValues);
    setIndeterminate(!!checkedValues.length && checkedValues.length < ListStaff.length);
    setCheckAll(checkedValues.length === ListStaff.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? ListStaff : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  
  
  const LIST_TABS = [
    {
      key: "1",
      label: <div className={styles.labelTabs}>Nhân viên ({ListStaff.length})</div>,
      children: <div style={{ marginBottom: "20px" }}>
          <div className={styles.listStaff}>
          {ListStaff.map((item, index) => (
            <div key = {index} style={{ marginBottom: "0px", marginTop: "0px", width: "100%"}}>
              <Checkbox 
              key={index}
              value={item}
              style={{ width: '100%' }}
              checked={checkedList.some((staff) => staff.id === item.id)}
              onChange={(e) => {
                const checkedItem = e.target.checked ? item : null;
                onChange(
                  checkedItem
                    ? [...checkedList, checkedItem]
                    : checkedList.filter((staff) => staff.id !== item.id)
                );
              }}>
                <Row style={{ margin:"10px", width:"100%"}}>
                  <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}> 
                    <Image src={item.url} alt="" height={46} width={46}></Image> 
                  </Col>
                  <Col style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
                    <div style={{color: "#4C5BD4", fontSize:"18px"}}>
                      {item.name}
                    </div>
                    
                    <div style={{color: "#474747", fontSize:"16px"}}>
                      {item.id}
                    </div>
                  </Col>
                </Row>
              </Checkbox>
              <div style={{ width: "100%", height: "1px", borderBottom: '1px dashed rgba(0, 0, 0, 0.3)'}}></div>
            </div>
          ))}
          </div>
      </div>
    },
  ]


  const Save = () => {
    setOpenAddStaffdGroupClick(false)
  }

  const renderExtraButton = () => {
      return (
        <div>
            <span className={styles.textCheckbox}>Chọn tất cả</span><Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}></Checkbox>
        </div>
      );
  };

  return (
  <Modal
    open={openAddStaffGroupClick}
    width={700}
    closable={false}
    cancelButtonProps={{ style: { display: "none" } }}
    okButtonProps={{ style: { display: "none" } }}
    className={`modal_them_moi_phuc_loi`}
    >
      <div className={styles.header}>
        <div className={styles.textHead}>Thêm nhân viên nhóm bảo hiểm</div>
        <div className={styles.crossImage}>
          <Image
              alt="/"
              src={"/cross.png"}
              width={14}
              height={14}
              onClick={() => setOpenAddStaffdGroupClick(false)}
          />
        </div>  
      </div>
      <div className={styles.body}>
        <div className={styles.bodyItem}>
          <Input prefix={<SearchOutlined rev="" />} style={{ padding: "10px", fontSize: "16px"}} placeholder="Nhập từ cần tìm" onPressEnter={onSearch} />
        </div>

        <div className={styles.bodyItem}>
        <Tabs 
          defaultActiveKey="1"
          items={LIST_TABS}
          tabBarExtraContent={renderExtraButton()}
        />
        </div>
        <div className={styles.hasButton}>
            <Button className={styles.ButtonWhite} onClick={Save} style={{ marginRight:"20px"}}>
            <p className={styles.txt}>Hủy</p>
          </Button>
          <Button className={styles.Button} onClick={Save} style={{ width:"159px"}}>
            <p className={styles.txt}>Thêm nhân viên</p>
          </Button>
        </div>
      </div>
    </Modal>)
}