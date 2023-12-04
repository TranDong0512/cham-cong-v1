import { Row, Col, Modal, Input, Checkbox, Button, List, Divider, Skeleton, Tabs  } from "antd"
import styles from "./staff-lable.module.css"
import Image from "next/image"
import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"

export function StaffLable(
{
    url,
    name
}: {
    url: string
    name: string
}) {
    return <div style={{ display:"flex", height:"34px", backgroundColor:"#DFEAFF", borderRadius:"15px", gap:"6px", alignItems:"center", padding:"5px 15px" }}>
        <Image src={url} alt="" width={24} height={24}></Image>
        <div style={{ fontSize:"16px" }}>{name}</div>
    </div>
}