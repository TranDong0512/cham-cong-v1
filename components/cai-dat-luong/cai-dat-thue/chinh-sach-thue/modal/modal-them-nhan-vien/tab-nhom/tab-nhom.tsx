import { Avatar, List, Radio, Space, Card, Select, Input, Checkbox} from 'antd';
import React, { useState } from 'react';    
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ModalApDungNhom } from './modal-thoi-gian-ap-dung/modal-thoi-gian-ap-dung';
import styles from './tab-nhom.module.css'


const infoN = [
    {
        key:'1',
        name:'Nhóm 1',
        thanhvien:'(2 người)'
    },
    {
        key:'2',
        name:'Nhóm 1',
        thanhvien:'(2 người)'
    },
    {
        key:'3',
        name:'Nhóm 1',
        thanhvien:'(2 người)'
    },
    {
        key:'4',
        name:'Nhóm 1',
        thanhvien:'(2 người)'
    },
]
export const DanhSachNhom: React.FC =() =>{
    const [modalApDung, setModalApDung] = useState(false)
    const [modalKey, setModalKey] = useState(Array<String>)

    return (
        <div className={styles.khung}>
            <List
                className={styles.list}
                dataSource={infoN}
                rowKey={item => item?.key}
                renderItem={(item, index) =>(
                    <List.Item>
                        <div className={styles.the}>
                            <Checkbox className={styles.checkbox} onChange={ 
                                (e:CheckboxChangeEvent) =>{
                                
                                    if(e.target.checked === true){
                                        setModalKey([...modalKey, item.key])
                                    }
                                    else{
                                        setModalKey(modalKey.filter((x) => x !== item.key))
                                    }
                                }} ></Checkbox> 
                            <div className={styles.info}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.id}>{item.thanhvien}</p>
                            </div>
                        </div>
                    </List.Item>

                )}/>
            <div className={styles.khungbutton}>
                <button className={styles.button} onClick={() => setModalApDung(true)}>
                    <p className={styles.textbutton}>Tiếp tục</p>
                </button>
            </div>
            {ModalApDungNhom(modalApDung, setModalApDung, modalKey)}
        </div>
    )
}
