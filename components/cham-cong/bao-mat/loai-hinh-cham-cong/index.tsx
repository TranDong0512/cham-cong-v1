import React, { useEffect, useState } from "react";
import { Switch, Spin } from "antd";
import styles from "./styles.module.scss";


import { POST } from '@/pages/api/BaseApi'
const LoaiHinhChamCong = () => {
    const [checkType1, setCheckType1] = useState(false)
    const [checkType2, setCheckType2] = useState(false)
    const [isLoading, getIsLoading] = useState(false)

    const SWITCH_TYPE = {
        TYPE_1: 'type1',
        TYPE_2: 'type2',
    };

    useEffect(() => {
        const getData = async () => {
            getIsLoading(true)
            const fetchData = async () => {
                return await POST('api/qlc/settingTS/get_type_timesheet', {})
            }
            try {
                const response = await fetchData()
                console.log(response);
                const type_res = response?.data?.type_timesheet ? response?.data?.type_timesheet : 0
                if (type_res === 1) {
                    setCheckType1(true)
                } else if (type_res === 2) {
                    setCheckType2(true)
                } else if (type_res === 3) {
                    setCheckType1(true)
                    setCheckType2(true)
                } else alert('Lỗi')
                getIsLoading(false)
            } catch (error) {
                getIsLoading(false)
                console.log(error);
            }
        }

        getData()
    }, [])

    const onChange = async (checked: boolean, type: String) => {
        getIsLoading(true)
        const status = {
            type1: checkType1,
            type2: checkType2
        }
        let type_timesheet = 0
        const settingTS = async (type_timesheet: any) => {
            return await POST('api/qlc/settingTS/update_type_timesheet', type_timesheet)
        }
        if (type === SWITCH_TYPE.TYPE_1) {
            if (checked) {
                type_timesheet = typeTS(checked, checkType2)
                setCheckType1(checked)
            } else if (checkType2) {
                type_timesheet = typeTS(checked, checkType2)
                setCheckType1(checked)
            } else {
                setCheckType1(false)
                setCheckType2(true)
                type_timesheet = 2
            }
        }
        if (type === SWITCH_TYPE.TYPE_2) {
            if (checked) {
                type_timesheet = typeTS(checkType1, checked)
                setCheckType2(checked)
            } else if (checkType1) {
                type_timesheet = typeTS(checkType2, checked)
                setCheckType2(checked)
            } else {
                setCheckType1(true)
                setCheckType2(false)
                type_timesheet = 1
            }
        }
        console.log(type_timesheet);
        try {
            const response = await settingTS({ type_timesheet: type_timesheet })
            console.log(response);
            getIsLoading(false)
        } catch (error) {
            setCheckType1(status.type1)
            setCheckType2(status.type2)
            console.log(error);
            alert('Không thành công')
            getIsLoading(false)
        }

    }
    const typeTS = (check1: boolean, check2: boolean) => {
        if (check1 && check2) {
            return 3
        } else if (check1) {
            return 1
        } else if (check2) {
            return 2
        } else return 0
    }
    return (
        <>
            <div className={styles.header}>
                <strong><h2>Cài đặt loại hình chấm công : </h2></strong>
                <p>
                   - Chấm công có lịch làm việc, ca làm việc <em>(Bạn cần tạo lịch làm việc, ca làm việc để được phép chấm công)</em>
                </p>
                <p>
                   - Chấm công không có lịch làm vệc, ca làm việc <em>(Bạn không cần thiết tạo lịch làm việc, ca làm việc để được phép chấm công)</em>
                </p>
                <p>
                    <em><strong>Yêu cầu phải chọn 1 trong 2 loại hoặc cũng có thể chọn cả 2</strong></em>
                </p>
            </div>
            <div className={styles.button_switch}>
                <Switch disabled={isLoading} checked={checkType1} onChange={(checked => onChange(checked, SWITCH_TYPE.TYPE_1))} />
                <p>Chấm công không cần lịch làm việc, ca làm việc</p>
                {
                    isLoading ? <Spin style={{ marginLeft: '10px' }} /> : <></>
                }
            </div>
            <div className={styles.button_switch}>
                <Switch disabled={isLoading} checked={checkType2} onChange={(checked => onChange(checked, SWITCH_TYPE.TYPE_2))} />
                <p>Chấm công theo lịch làm việc, ca làm việc</p>
                {
                    isLoading ? <Spin style={{ marginLeft: '10px' }} /> : <></>
                }
            </div>

        </>
    );
};

export default LoaiHinhChamCong;
