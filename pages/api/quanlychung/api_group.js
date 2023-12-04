
/** @format */

import axios from 'axios';
import Cookies from 'js-cookie';
class apiGroup {

    static async getListGroup(comId) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_QLC + '/api/qlc/group/search', { com_id: comId });
            console.log("check call", call)
            response = call.data.data.data;
            console.log("response group", response)
        } catch (error) {
            response = error.response;
        }
        return response;
    }

}

export default apiGroup;