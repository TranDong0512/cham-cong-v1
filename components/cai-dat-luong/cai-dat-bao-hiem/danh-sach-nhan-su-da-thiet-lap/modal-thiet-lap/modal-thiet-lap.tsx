import { Row, Col, Modal, Input, Checkbox, Button, Form, Select, Skeleton  } from "antd"
const { Option } = Select;
import styles from "./modal-thiet-lap.module.css"
import Image from "next/image"
import type { SelectProps } from 'antd';
import { useEffect, useState } from "react";

export function ModalThietLapBaoHiemNhanVien(
    open: boolean,
    setOpen: Function,
    key: any,
  ) {
    // console.log(key)
    const [form] = Form.useForm();
    const Save = () => {
      setOpen(false)
    }

    const [ monthFrom, setMonthFrom ] = useState('')
    const [ monthTo, setMonthTo ] = useState('')
    const [ typeOfInsurance, setTypeOfInsurance ] = useState('')
    const [ url, setUrl ] = useState('/anhnhanvien.png')
    const [ name, setName ] = useState('NGUYỄN TIẾN LONG')
    const [ ID, setId ] = useState('131942')

    useEffect(() => {

    }, [key])

    const handleSubmit = () => {
      const isFieldsFilled1 = form.getFieldValue("monthFrom");
      const isFieldsFilled2 = form.getFieldValue("monthTo");
      const isFieldsFilled3 = form.getFieldValue("insurance");
      
      if( (isFieldsFilled1 !== undefined) && ( isFieldsFilled3 !== undefined ) )
      {
        setMonthFrom(isFieldsFilled1)
        setMonthTo(isFieldsFilled2)
        setTypeOfInsurance(isFieldsFilled3)
        setOpen(false)
      }
    }

    const handleInputMonthFromChange = (event) => {
      const inputValue = event.target.value;
    }

    const handleInputMonthToChange = (event) => {
      const inputValue = event.target.value;
    }

    const handleInputInsuranceChange = (value) => {
      const inputValue = value;
    }

    const selectInsurance = [
        {value:"Chọn loại bảo hiểm", label:"Chọn loại bảo hiểm"},
        {value:"BHXH tính theo lương cơ bản", label:"BHXH tính theo lương cơ bản"},
        {value:"BHXH tính theo lương nhập vào", label:"BHXH tính theo lương nhập vào"},
        {value:"BHXH mới", label:"BHXH mới"},
      ];
    return (
      <Modal
        open={open}
        closable={false}
        width={600}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        className={`modal_thiet_lap`}
      >
        <div className={styles.header}>
            <div className={styles.textHead}>Chỉnh sửa bảo hiểm nhân viên</div>
            <div className={styles.crossImage}>
                <Image
                    alt="/"
                    src={"/cross.png"}
                    width={14}
                    height={14}
                    onClick={() => setOpen(false)}
                />
            </div>  
        </div>

        <div className={styles.body}>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <div>
            <Row> 
              <Col>
                <Image src={key?.url} alt="" height={50} width={50} style={{ margin: "10px 10px 10px 10px" }} />
              </Col>
              <Col style={{ margin: "10px", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                <div style={{ color:"#4C5BD4", fontSize:"16px" }}>{key?.name}</div>
                <div style={{ fontSize:"16px" }}>ID: {key?.ID} </div>
              </Col>
            </Row>
          </div>
          <Form.Item
            rules={[{ required: true, message: 'Bắt buộc điền tháng áp dụng!' }]}
            name="monthFrom"
          >
            <div className={styles.bodyItem}>
              <span style={{ fontSize:"16px" }}>Áp dụng từ tháng <span style={{ color: "red" }}>*</span></span>
              <Input
                  required
                  type="month"
                  style={{ width: "100%", fontSize:"16px" }}
                  placeholder="Chọn tháng"
                  onChange={handleInputMonthFromChange}
                  defaultValue={'2023-06'}
              ></Input>
            </div>
          </Form.Item>

          <Form.Item name="monthTo">
            <div className={styles.bodyItem}>
              <span style={{ fontSize:"16px" }}>Đến tháng (Không bắt buộc)</span>
              <Input
                  type="month"
                  style={{ width: "100%", fontSize:"16px" }}
                  onChange={handleInputMonthToChange}
                  placeholder="Chọn tháng"
              ></Input>
            </div>
          </Form.Item>

          <div style={{ fontSize:"16px" }}>Loại bảo hiểm <span style={{ color: "red" }}>*</span></div>
          <Form.Item name="insurance" label="" rules={[{ required: true, message: 'Bắt buộc điền loại bảo hiểm!' }]}>
            <Select
              style={{ width: '100%', fontSize:"16px" }}
              placeholder="Chọn loại bảo hiểm"
              className={styles.selectYeah}
              options={selectInsurance}
              onChange={handleInputInsuranceChange}
              defaultValue={'BHXH tính theo lương cơ bản'}
              suffixIcon={<Image src="/suffixIcon_1.svg" alt="" width={14} height={14}/>}
            />
          </Form.Item>

          <Form.Item>
          <div className={styles.hasButton} style={{ marginTop:"20px" }}>
            <Button className={styles.ButtonWhite} onClick={Save}>
              <p style={{ color: '#4C5BD4', fontSize: '18px'}}>Hủy</p>
            </Button>
            <Button className={styles.Button} htmlType="submit" onClick={handleSubmit}>
              <p className={styles.txt}>Cập nhật</p>
            </Button>
          </div>
          </Form.Item>
        </Form>
        </div>
      </Modal>
    )
  }