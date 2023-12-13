const Constant = Object.freeze({
    settingOrganize_listAll: "api/qlc/settingOrganize/listAll",
    settingOrganize_list: "api/qlc/settingOrganize/list",
    settingOrganize_create: "api/qlc/settingOrganize/create",
    organizeDetail_create: "api/qlc/organizeDetail/create",
    organizeDetail_listAll: "api/qlc/organizeDetail/listAll",
    organizeDetail_list: "api/qlc/organizeDetail/list",
    organizeDetail_addListUser: "api/qlc/organizeDetail/addListUser",
    positions_createUsersPositions: "api/qlc/positions/createUsersPositions",
    positions_listAll:"api/qlc/positions/listAll",
    positions_list:"api/qlc/positions/list",
    managerUser_list: "api/qlc/managerUser/list",
});
export const settingOrganize = Object.freeze({
    listAll: "api/qlc/settingOrganize/listAll",
    list: "api/qlc/settingOrganize/list",
    create: "api/qlc/settingOrganize/create",
    delete:"api/qlc/settingOrganize/delete",
});
export const organizeDetail = Object.freeze({
    create: "api/qlc/organizeDetail/create",
    listAll: "api/qlc/organizeDetail/listAll",
    list: "api/qlc/organizeDetail/list",
    addListUser: "api/qlc/organizeDetail/addListUser",
    delete:"api/qlc/organizeDetail/delete",
});
export const positions = Object.freeze({
    createUsersPositions: "api/qlc/positions/createUsersPositions",
    listAll:"api/qlc/positions/listAll",
    list:"api/qlc/positions/list",
});
export const managerUser = Object.freeze({
    list: "api/qlc/managerUser/list",
    listUser:"api/qlc/managerUser/listUser",
    changeOrganizeDetail:"api/qlc/managerUser/changeOrganizeDetail",

})

export default Constant;
