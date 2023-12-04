import { Button, Form, Input, Select, Upload } from 'antd'
import styles from './de-xuat-cong-cong.module.css'
import Image from 'next/image'
import { Status } from '../../de-xuat-cua-toi/chi-tiet-de-xuat/chi-tiet-de-xuat'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { constant } from 'lodash'


export const MyInputMoney = (
    title: string,
    placeholder:string,
    required: boolean,
    hasLabel: boolean,
    name: string
)=>{
    return(
        <Form.Item
            name={name}
            rules={[
            {
                required: required,
                message: `Vui lòng nhập ${title} của bạn!`
            }
            ]}
            label={hasLabel && <p style={{fontWeight:'500'}}>{title}</p>}
            labelCol={{ span: 24 }}
        >
            <Input
                placeholder={placeholder}
                size='large'
                type='number'
                suffix={<p>VNĐ</p>}
            ></Input>
        </Form.Item>
    )
}

export const MyInputFile = (
    title: string,
    placeholder:string,
    required: boolean,
    hasLabel: boolean,
    name: string
) =>{
    return(
        <Form.Item
            name={name}
            rules={[
            {
                required: required,
                message: `Vui lòng nhập ${title} của bạn!`
            }
            ]}
            label={hasLabel && <p style={{fontWeight:'500'}}>{title}</p>}
            labelCol={{ span: 24 }}
        >
            <Upload
                className={styles.containerUpload}
                style={{width:'100%'}}
                showUploadList
            >
                <div className={styles.upload}>
                    <p>{placeholder}</p>
                    <Image alt="/" src={"/pon.png"} width={15} height={15} />
                </div>
            </Upload>
        </Form.Item>
    )
}
export const MyTime = (
    title: string,
    required: boolean,
    hasLabel: boolean,
    name: string
)=>{
    return(
        <Form.Item
            name={name}
            rules={[
            {
                required: required,
                message: `Vui lòng nhập ${title} của bạn!`
            }
            ]}
            label={hasLabel && <p style={{fontWeight:'500'}}>{title}</p>}
            labelCol={{ span: 24 }}
        >
            <Input
                size="large"
                type='time'
                style={{ border: "1px solid #9F9F9F", width: "100%" }}
            />
        </Form.Item>
    )
}
export const MyDate = (
    title: string,
    required: boolean,
    hasLabel: boolean,
    name: string
)=>{
    return(
        <Form.Item
            name={name}
            rules={[
            {
                required: required,
                message: `Vui lòng nhập ${title} của bạn!`
            }
            ]}
            label={hasLabel && <p style={{fontWeight:'500'}}>{title}</p>}
            labelCol={{ span: 24 }}
        >
            <Input
                size="large"
                type='date'
                style={{ border: "1px solid #9F9F9F", width: "100%" }}
            />
        </Form.Item>
    )
}



export const MySelectAcp = (
    title: string,
    placeholder: string,
    required: boolean,
    hasLabel: boolean,
    name: string = "",
    options: Array<any> = [],
    defaultValue?: any
) =>{
    return(
        <Form.Item
            name={name}
            rules={[
            {
                required: required,
                message: `Vui lòng nhập ${title} của bạn!`
            }
            ]}
            label={hasLabel && <p style={{fontWeight:'500'}}>{title}</p>}
            labelCol={{ span: 24 }}
        >
            <Select
                size="large"
                placeholder={placeholder}
                optionFilterProp="label"
                defaultValue={defaultValue}
                options={options}
                suffixIcon={
                    <Image alt="/" src={"/down-icon.png"} width={14} height={14} />
                  }
                mode="multiple"
                style={{width: "100%",border: "1px solid #9F9F9F",borderRadius: "10px"}}
            />
        </Form.Item>
    )
}
export function DeXuatCongCongFooter(
    creat:Function,
    cancel:Function
){
    return(
        <div className={styles.footer}>
            <Form.Item>
            <Button 
                className={styles.buttonLeft}
                onClick={()=>cancel()}
            >
                <p>Hủy</p>
            </Button>
            </Form.Item>
            <Form.Item>
            <Button 
                className={styles.buttonRight}
                onClick={()=>creat()}
            >
                <p>Tạo đề xuất</p>
            </Button>
            </Form.Item>
        </div>
    )
}
export const GroupButton = (
    admin:boolean,
    active:boolean,
    companyAcp:boolean,
    id1?:boolean,
    id2?:boolean,
    overtime?:boolean,
    typeRef?:any,
    dimensions?:any,
    className?:any,
    deny?:boolean,
    )=>{
    return(
        <>
        {!admin && active &&<div className={styles[`${className}`]}>
                <div className={styles.acceptText}>
                <Image src={'/approveNew.png'} alt='' width={20} height={20}></Image>
                <p>Đã chấp thuận</p>
            </div>
            {!companyAcp && <div className={styles.companyAcceptText}>
                <Image src={'/abortNew.png'} alt='' width={20} height={20}></Image>
                <p>Đang chờ công ty duyệt !</p>
            </div>}
        </div>}
        {admin && <div className={styles[`${className}`]}>
            {overtime || deny 
                ?
                    deny?
                    <div className={styles.overTimeText} style={{width:'100%'}}>
                        <Image src={'/clearCircle-red.png'} alt='' width={20} height={20}></Image>
                        <p>Đã từ chối</p>
                    </div>
                    :
                    <div className={styles.overTimeText}>
                        <Image src={'/clearCircle-red.png'} alt='' width={20} height={20}></Image>
                        <p>Đề xuất quá hạn duyệt</p>
                    </div>
                :   
                <>
                {id1 && id2 
                    ?
                    <>
                        <div className={styles.acceptText} ref={typeRef}>
                            <Image src={'/approveNew.png'} alt='' width={20} height={20}></Image>
                            <p>Đã chấp thuận</p>
                        </div>
                        {!companyAcp && <div className={styles.companyAcceptText}>
                            <Image src={'/abortNew.png'} alt='' width={20} height={20}></Image>
                            <p>Đang chờ công ty duyệt !</p>
                        </div>}
                        <Button className={styles.clearButton} style={{width:!companyAcp ?`${dimensions.width}px`:'100%'}}>
                            <Image src={'/clearCircle.png'} alt='' width={20} height={20}></Image>
                            <p>Hủy duyệt</p>
                        </Button>
                        
                    </>
                    :
                    <>
                    <Button className={styles.acceptButton}>
                        <Image src={'/checkCircle.png'} alt='' width={20} height={20}></Image>
                        <p>Chấp thuận</p>
                    </Button>
                    <Button className={styles.clearButton}>
                        <Image src={'/clearCircle.png'} alt='' width={20} height={20}></Image>
                        <p>Từ chối</p>
                    </Button>
                    </>
                }
                </>
            }
            <Button className={styles.clearButton} 
                style={{width: 
                    overtime || companyAcp ? 
                    !overtime ? '100%':'fit-content': 
                    dimensions.width==0?'100%':`${dimensions.width}px`
                }}>
                <Image src={'/clearCircle.png'} alt='' width={20} height={20}></Image>
                <p>Xóa đề xuất</p>
            </Button>
        </div>}
        </>
    )
}
export function ChiTietDeXuatCongCong(
    admin:boolean,
    active:boolean,
    companyAcp:boolean,
    id1?:boolean,
    id2?:boolean,
    overtime?:boolean,
    deny?:boolean,
){
    const targetRef:any = useRef();
    const targetRef414:any = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });
    useLayoutEffect(() => {
        if (targetRef.current) {
          setDimensions({
            width: targetRef?.current?.offsetWidth===0 ? targetRef414?.current?.offsetWidth : targetRef?.current?.offsetWidth,
            height: targetRef?.current?.offsetHeight
          });
        }
      }, [companyAcp]);
    return(
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <Image src={'/back-w.png'} alt='' width={24} height={24}></Image>
                        <p className={styles.headerText}>Trở lại danh sách</p>
                    </div>
                    <Image src={'/print.png'} alt='' width={30} height={30}></Image>
                </div>
                <div className={styles.body}>
                    <div className={styles.bodyLeft}>
                        <p className={styles.bodyHeader}>Đề xuất cộng công</p>
                        {GroupButton(admin,active,companyAcp,id1,id2,overtime,targetRef414,dimensions,'accept414',deny)}
                        <div className={styles.tab}>
                            <p className={styles.headerTab}>Thông tin đề xuất</p>
                            <p>Người tạo: Vũ Văn Khá</p>
                            <p>Nhóm đề xuất: <span style={{color:'#4c5bd4'}}>Đề xuất cộng công</span></p>
                            <p>Thời gian tạo: 07:27 AM 12-06-2023</p>
                            <p>Loại cộng công: Cộng công theo ca</p>
                            <p>Cập nhật: 2 ngày trước</p>
                        </div>
                        <div className={styles.tab}>
                            <p className={styles.headerTab}>Thông tin chung</p>
                            <p>1. Họ và tên: <span style={{color:'#4c5bd4'}}>Vũ Văn Khá</span></p>
                            <p>2. Ngày xác nhân: 13-06-2023</p>
                            <p>{'3. Ca làm việc: Ca sáng 7TR < LƯƠNG <= 10TR'}</p>
                            <p>Thời gian bắt đầu: 7:55 SA</p>
                            <p>Thời gian kết thúc: 11:40 SA</p>
                            <p>4. Lý do đề xuất xác nhận công:</p>
                            <p>Không chấm được máy chấm công Công ty</p>
                        </div>
                        {GroupButton(admin,active,companyAcp,id1,id2,overtime,targetRef,dimensions,'accept',deny)}
                        {/* {!admin && active &&<div className={styles.accept}>
                             <div className={styles.acceptText}>
                                <Image src={'/approveNew.png'} alt='' width={20} height={20}></Image>
                                <p>Đã chấp thuận</p>
                            </div>
                            {companyAcp && <div className={styles.companyAcceptText}>
                                <Image src={'/abortNew.png'} alt='' width={20} height={20}></Image>
                                <p>Đang chờ công ty duyệt !</p>
                            </div>}
                        </div>}
                        {admin && <div className={styles.accept}>
                            {overtime 
                                ?
                                <div className={styles.overTimeText}>
                                        <Image src={'/clearCircle-red.png'} alt='' width={20} height={20}></Image>
                                        <p>Đề xuất quá hạn duyệt</p>
                                    </div>
                                :   
                                <>
                                {id1 && id2 
                                    ?
                                    <>
                                        <div className={styles.acceptText} ref={targetRef}>
                                            <Image src={'/approveNew.png'} alt='' width={20} height={20}></Image>
                                            <p>Đã chấp thuận</p>
                                        </div>
                                        {!companyAcp && <div className={styles.companyAcceptText}>
                                            <Image src={'/abortNew.png'} alt='' width={20} height={20}></Image>
                                            <p>Đang chờ công ty duyệt !</p>
                                        </div>}
                                        <Button className={styles.clearButton} style={{width:!companyAcp ?`${dimensions.width}px`:'100%'}}>
                                            <Image src={'/clearCircle.png'} alt='' width={20} height={20}></Image>
                                            <p>Hủy duyệt</p>
                                        </Button>
                                        
                                    </>
                                    :
                                    <>
                                    <Button className={styles.acceptButton}>
                                        <Image src={'/checkCircle.png'} alt='' width={20} height={20}></Image>
                                        <p>Chấp thuận</p>
                                    </Button>
                                    <Button className={styles.clearButton}>
                                        <Image src={'/clearCircle.png'} alt='' width={20} height={20}></Image>
                                        <p>Từ chối</p>
                                    </Button>
                                    </>
                                }
                                </>
                            }
                            <Button className={styles.clearButton} style={{width:overtime || !companyAcp ?`${dimensions.width}px`:'100%'}}>
                                <Image src={'/clearCircle.png'} alt='' width={20} height={20}></Image>
                                <p>Xóa đề xuất</p>
                            </Button>
                        </div>} */}
                    </div>
                    
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={`${styles.header} ${styles.header2}`}>
                    <Image src={'/info.png'} alt='' width={24} height={24}></Image>
                    <p className={styles.headerText}>Thông tin đề xuất</p>
                </div>
                <div className={styles.body2}>
                    <div className={styles.bodyRight}>
                        <p className={styles.headerTab}>Lãnh đạo duyệt</p>
                        <div className={styles.itemPeople}>
                            <Image src={'/anhnhanvien.png'} alt='' width={60} height={60}></Image>
                            <div className={styles.infor}>
                                <p style={{color:'#4c5bd4'}}>Lại Thị Trang</p>
                                <p>ID: 5713</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bodyRight}>
                        <p className={styles.headerTab}>Người theo dõi</p>
                        <div className={styles.itemPeople}>
                            <Image src={'/anhnhanvien.png'} alt='' width={60} height={60}></Image>
                            <div className={styles.infor}>
                                <p style={{color:'#4c5bd4'}}>Nguyễn Thu Trang</p>
                                <p>ID: 5744</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bodyRight}>
                        <p className={styles.headerTab}>Trạng thái đề xuất</p>
                        <div className={styles.status}>
                            {/* {Status('Vũ Văn Khá','1')}
                            {Status('Lại Thị Trang','2')}
                            {Status('Lại Thị Trang','3')} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}