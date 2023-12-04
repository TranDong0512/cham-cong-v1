import { Row, Col } from "antd"
import styles from "./ItemList.module.css"
import Image from "next/image"
export function ItemList(
    luong_co_ban: string,
    muc_luong_co_ban: string
){
    return (
        <Row style={{ height:"44px", width:"181px", gap: "5px"}}>
            <Col>
                <Image src="/order_light.png" alt="" height={24} width={24} />
            </Col>
            <Col>
                <Row style={{color: "#4C5BD4", fontSize: "16px"}}>{ luong_co_ban }</Row>
                <Row style={{color: "#ACACAC", fontSize: "16px"}}>{ muc_luong_co_ban }</Row>
            </Col>
        </Row>
    )
}