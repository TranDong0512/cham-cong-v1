
/** @format */

import axios from 'axios';
import Cookies from 'js-cookie';
class apiTeams {

    static async getListTeams(options) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_QLC + '/api/qlc/team/list', options);
            response = call.data.data.data;
            console.log("response Teams", response)
        } catch (error) {
            response = error.response;
        }
        return response;
    }

}

export default apiTeams;