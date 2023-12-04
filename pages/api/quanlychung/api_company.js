/** @format */

import axios from 'axios';
import Cookies from 'js-cookie';
class apiDeparment {

    // get company info
    static async getCompanyInfo() {
        let response = '';
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC + '/api/qlc/company/info',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token_base365')}`,
                    },
                },
            );

            response = call.data.data.data;
        } catch (error) {
            response = error.response;
        }
        return response;
    }
    // danh sách vị trí 

    static async getListPosition() {
        let response;
        try {
            response = [
                {
                    "positionId": 1,
                    "positionName": "Sinh viên thực tập"
                },
                {
                    "positionId": 2,
                    "positionName": "Nhân viên thử việc"
                },
                {
                    "positionId": 3,
                    "positionName": "Nhân viên chính thức"
                },
                {
                    "positionId": 4,
                    "positionName": "Trưởng nhóm"
                },
                {
                    "positionId": 5,
                    "positionName": "Phó trưởng phòng"
                },
                {
                    "positionId": 6,
                    "positionName": "Trưởng phòng"
                },
                {
                    "positionId": 7,
                    "positionName": "Phó giám đốc"
                },
                {
                    "positionId": 8,
                    "positionName": "Giám đốc"
                },
                {
                    "positionId": 9,
                    "positionName": "Nhân viên Part time"
                },
                {
                    "positionId": 10,
                    "positionName": "Phó ban dự án"
                },
                {
                    "positionId": 11,
                    "positionName": "Trưởng ban dự án"
                },
                {
                    "positionId": 12,
                    "positionName": "Phó tổ trưởng"
                },
                {
                    "positionId": 13,
                    "positionName": "Tổ trưởng"
                },
                {
                    "positionId": 14,
                    "positionName": "Phó tổng giám đốc"
                },
                {
                    "positionId": 16,
                    "positionName": "Tổng giám đốc"
                },
                {
                    "positionId": 17,
                    "positionName": "Thành viên hội đồng quản trị"
                },
                {
                    "positionId": 18,
                    "positionName": "Phó chủ tịch hội đồng quản trị"
                },
                {
                    "positionId": 19,
                    "positionName": "Chủ tịch hội đồng quản trị"
                },
                {
                    "positionId": 20,
                    "positionName": "Nhóm Phó"
                },
                {
                    "positionId": 21,
                    "positionName": "Tổng giám đốc tập đoàn"
                },
                {
                    "positionId": 22,
                    "positionName": "Phó tổng giám đốc tập đoàn"
                }
            ];
        }
        catch (error) {
            response = error.response;
        }
        return response;
    }
}

export default apiDeparment;
