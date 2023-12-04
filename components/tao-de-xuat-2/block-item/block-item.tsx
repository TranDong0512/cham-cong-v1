import { Button, Select, Row, Col } from 'antd'
import styles from "./block-item.module.css"
import Image from "next/image"
import { useRouter } from 'next/router';


export function BlockItem(
    ten_de_xuat: string,
    url: string
){
    const router = useRouter()
    function mauDeXuat(chuoi) {
        var ketQua = chuoi.replace(/Đơn/g, "Mẫu đề xuất");
        return ketQua;
    }
    const HandleNavigation = (url: string) => {
        router.push(url)
    }
    return(
        <>
            <div className={styles.animation}>
                <div className={styles.header}> 
                    <Row gutter={10} className={styles.blockItemGutter}>
                        <Col lg={2} xs={4} className={styles.centerItem}>
                            <Image src="/list-clipboard.svg" alt="" width={24} height={24} ></Image>
                        </Col>
                        <Col lg={22} xs={20} className={styles.col1}>
                            <div className={styles.txt1}>{ten_de_xuat}</div>
                            <div className={styles.txt2}>{mauDeXuat(ten_de_xuat)}</div>
                        </Col>
                        {/* <Col lg={2} xs={4} className={styles.centerItem}> 
                            <Image className={styles.col2} src="/flag_finish_light.png" alt="" width={24} height={24}></Image>
                        </Col> */}
                    </Row>
                </div>

                <div className={`blockItemTaoDeXuat ${styles.fullDiv}`}> 
                    <Row gutter={10} className={styles.blockItemGutter}>
                        <Col lg={2} xs={4} className={styles.centerItem}>
                            <Image src="/list-clipboard.svg" alt="" width={24} height={24} ></Image>
                        </Col>
                        <Col lg={20} xs={16} className={styles.col1}>
                            <div className={styles.txt1}>{ten_de_xuat}</div>
                            <div className={styles.txt2}>{mauDeXuat(ten_de_xuat)}</div>
                        </Col>
                        <Col lg={2} xs={4} className={styles.centerItem}> 
                            <Image className={styles.col2} src="/flag_finish_light.png" alt="" width={24} height={24}></Image>
                        </Col>
                    </Row>
                    <div className={`${styles.body} ${styles.centerItem}`} >
                        <Image src="/add_round.png" alt="" height={24} width={24} style={{ cursor: "pointer" }} onClick={()=>{HandleNavigation(url)}}></Image>
                        <div className={styles.txt} onClick={()=>{HandleNavigation(url)}}>Tạo đề xuất</div>
                    </div>
                </div>
                
            </div>
        </>
    )
}