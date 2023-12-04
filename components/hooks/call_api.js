import instance from "./axios.config";
import useSWR from "swr";

export function getCompanyInfo() {
    const fetcher = async () => {
        return await instance.post("/api/qlc/company/info", {});
    };
    const { data } = useSWR("/api/qlc/company/info", fetcher);
    return data?.data?.data?.data;
}
export const getListIP = async (value) => {
    const fetcher = async () => {
        return await instance.post("/api/qlc/setIp/listNew", value);
    };
    let options = [];
    try {
        const data = await fetcher();
        options = data?.data?.data?.data;
    } catch (e) {
        options = e.response;
        alert(e.message);
    }
    return options;
};
export function getListOptionsCompany() {
    const fetcher = async () => {
        return await instance.post("/api/qlc/company/info", {});
    };
    const { data } = useSWR("/api/qlc/company/info", fetcher);
    const com = data?.data?.data?.data;
    const options = {
        key: com?.com_id,
        label: com?.com_name,
        value: com?.com_id,
    };
    return options;
}

export function getListChildCompany() {
    const fetcher = async () => {
        return await instance.post("/api/qlc/company/child/list", {});
    };
    const { data } = useSWR("/api/qlc/company/child/list", fetcher);
    const options = data?.data?.data?.items?.map((item) => ({
        key: item.com_id,
        label: item?.com_name,
        value: item?.com_id,
    }));
    return options;
}

export const getListDepartment = async (com_child_id) => {
    const fetcher = async () => {
        return await instance.post("/api/qlc/department/list", {
            com_id: com_child_id,
        });
    };
    let options = [];
    try {
        const data = await fetcher();

        const option = data?.data?.data?.items?.map((item) => ({
            key: item.dep_id,
            label: item?.dep_name,
            value: item?.dep_id,
        }));
        options = option;
    } catch (e) {
        options = e.response;

        alert(e.message);
    }
    return options;
};

export const getListTeam = async (dep_id, com_id) => {
    const fetcher = async () => {
        return await instance.post("/api/qlc/team/list", {
            dep_id: dep_id,
            com_id: com_id,
        });
    };
    let options = [];
    try {
        const data = await fetcher();
        const option = data?.data?.data?.data?.map((item) => ({
            key: item.team_id,
            label: item?.team_name,
            value: item?.team_id,
        }));
        options = option;
    } catch (e) {
        options = e.response;

        alert(e.message);
    }
    return options;
};

export const getListGroup = async (team_id, dep_id, com_id) => {
    const fetcher = async () => {
        return await instance.post("/api/qlc/group/search", {
            team_id: team_id,
            com_id: com_id,
            dep_id: dep_id,
        });
    };
    let options = [];
    try {
        const data = await fetcher();
        const option = data?.data?.data?.data?.map((item) => ({
            key: item.gr_id,
            label: item?.gr_name,
            value: item?.gr_id,
        }));
        options = option;
    } catch (e) {
        options = e.response;

        alert(e.message);
    }
    return options;
};
