import { Row, Col } from "antd"
import styles from "./ItemList.module.css"
import Image from "next/image"
export function ItemList(
{
    luong_co_ban,
    muc_luong_co_ban,
    handleSetFormula
}:{
    luong_co_ban: string
    muc_luong_co_ban: string
    handleSetFormula: (decreption: string) => void
}){
    return (
        <Row style={{ height:"44px", width:"181px", gap: "5px"}}>
            <Col>
                <Image src="/order_light.png" alt="" height={24} width={24} />
            </Col>
            <Col>
                <Row style={{color: "#4C5BD4", fontSize: "16px", cursor:"pointer" }} onClick={()=>handleSetFormula(luong_co_ban)}>{ luong_co_ban }</Row>
                <Row style={{color: "#ACACAC", fontSize: "16px"}}>{ muc_luong_co_ban }</Row>
            </Col>
        </Row>
    )
}