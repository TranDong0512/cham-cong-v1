/** @format */

import axios from 'axios';
import Cookies from 'js-cookie';

class apiEmployee {

    // danh sách phòng ban theo token
    static async getListEmployee(options) {
        let response = '';
        try {
            console.log("searchAPI", options)
            const call = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_QLC + '/api/qlc/managerUser/list', options,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token_base365')}`,
                    },
                },
            );
            response = call.data.data.items;

        } catch (error) {
            response = error.response;
        }
        return response;
    }
}

export default apiEmployee;