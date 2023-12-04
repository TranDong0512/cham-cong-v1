/** @format */

import axios from "axios";
import Cookies from "js-cookie";

class apiDeparment {
    // danh sách phòng ban theo token
    static async getListDepartment(options) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC +
                    "/api/qlc/department/list",
                options,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token_base365")}`,
                    },
                }
            );
            response = call.data.data.items;
        } catch (error) {
            response = error.response;
        }
        return response;
    }
}

export default apiDeparment;
