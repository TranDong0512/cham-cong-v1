/** @format */

import axios from "axios";
import Cookies from "js-cookie";
class CallApi {
    static async callAPI(url, data, token) {
        let configHeader = {
            headers: {},
        };
        if (token) {
            configHeader.headers["Authorization"] = `Bearer ${token}`;
        }

        let configData = {};
        if (data) {
            configData = data;
        }

        let response = "";

        try {
            const call = await axios.post(url, configData, configHeader);
            response = call.data.data.data;
        } catch (error) {
            response = error.response;
        }

        return response;
    }

    // api check vip
    static async checkVip(idCom) {
        let response = "";
        const call = await axios.post(
            "https://chamcong.24hpay.vn/service/verify_vip.php",
            { idCom: idCom }
        );
        response = call;
        return response;
    }

    //  ????
    static async quen_mat_khau(data) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API +
                    "/api/qlcemployee/forgotPassword ",
                data
            );
            response = call;
        } catch (error) {
            response = error.message;
        }
        return response;
    }

    // update info employee
    static async updateEp(token) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API +
                    "/api/qlc/employee/updateInfoEmployee",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }
    // get company info
    static async getCompanyInfo() {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC + "/api/qlc/company/info",
                {},
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
    //get list child company
    static async getListChildCompany() {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC +
                    "/api/qlc/company/child/list",
                {},
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
    //get list department
    static async getListDepartment(com_id) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC +
                    "/api/qlc/department/list",
                { com_id: com_id }
            );
            response = call.data.data.items;
        } catch (error) {
            response = error.response;
        }
        return response;
    }
    //get list team
    static async getListTeam(com_id, dep_id) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC + "/api/qlc/team/list",
                { com_id: com_id, dep_id: dep_id }
            );
            response = call.data.data.data;
        } catch (error) {
            response = error.response;
        }
        return response;
    }
    //get list group
    static async getListGroup(com_id, dep_id) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC + "/api/qlc/group/search",
                { com_id: com_id, dep_id: dep_id }
            );
            response = call.data.data.data;
        } catch (error) {
            response = error.response;
        }
        return response;
    }
    // api phòng ban
    static async listDepartments(idCom) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/department/get",
                { com_id: idCom }
            );
            response = call.data.data.data;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }

    // api tổ
    static async listGroups(idCom, idDep) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/team/search",
                { com_id: idCom, dep_id: idDep }
            );
            response = call.data.data.data;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }

    // api nhóm
    static async listTeams(idCom, idDep, idGroup) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/group/search",
                { com_id: idCom, dep_id: idDep, team_id: idGroup }
            );
            response = call.data.data.data;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }

    // api admin
    // api get list feedback
    static async listFeedback(currentPage) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/admin/getListFeedback",
                { page: currentPage }
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }

    // api get list company
    static async listCom(data) {
        let response = "";
        console.log(data);
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/admin/listCom",
                data
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }

    // api update vip
    static async updateVip(data) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/admin/vip",
                data
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }

    // api change pw admin
    static async updatePwAdmin(data) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/admin/updatePassword",
                data
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }

    // api lay danh sach bao loi
    static async dsBaoLoi(data) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/admin/getListReportErr",
                data
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }

        return response;
    }

    //api lay danh sach cong ty dang ky loi
    static async dsDangKyLoi(data) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/admin/listComErr",
                data
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }

        return response;
    }

    //Api cap nhat trang thai vip + kich hoat tai khoan
    static async updateVipAuth(data) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/admin/put",
                data
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }
    // api create ip new
    static async createIPNew(data) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC + "/api/qlc/SetIp/create",
                data
            );
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
        }
        return response;
    }
    //get list
    static async getListIP(com_id, dep_id, team_id, gr_id, token) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC +
                    "/api/qlc/SetIp/getListChildCom",
                {
                    com_id: com_id,
                    dep_id: dep_id,
                    team_id: team_id,
                    gr_id: gr_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            response = call.data.data.data;
            return response;
        } catch (error) {
            response = error.response;
        }
    }

    // Danh sách vị trí
    static async getListLocations(data, token) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL_QLC + "/api/qlc/location/list",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            response = call;
        } catch (error) {
            response = error.response.data.error;
        }
        return response;
    }




    // Thêm mới vị trí
    static async addNewLocation(data, token) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/location/add",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            response = call;
        } catch (error) {
            response = error.response.data.error;
        }
        return response;
    }

    // Cập nhật vị trí
    static async updateLocation(data, token) {
        let response = "";
        console.log(data);
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/location/update",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            response = call;
        } catch (error) {
            response = error.response.data.error;
        }
        return response;
    }

    // Xóa vị trí
    static async deleteLocation(data, token) {
        let response = "";
        try {
            const call = await axios.post(
                process.env.NEXT_PUBLIC_API + "/api/qlc/location/delete",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            response = call;
        } catch (error) {
            response = error.response.data.error;
        }
        return response;
    }
}

export default CallApi;
