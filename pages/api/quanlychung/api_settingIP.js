/** @format */

import axios from "axios";
import Cookies from "js-cookie";
class apiSettingIP {
    static async getListIP(conditions) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC + "/api/qlc/setIp/listNew",
                conditions,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token_base365")}`,
                    },
                }
            );
            response = call.data.data.data;
        } catch (error) {
            response = error.response;
        }
        return response;
    }
}

export default apiSettingIP;
