import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: 1,
  update: false,
  openModalCompany: true,
  openModalDepartment: false,
  openDrawer: false,
  openModalUser: false,
  openModal: false,
  openModalChangePosition: false,
  openModalChangeOrganize: false,
  openModalDelete: false,
  sendData: {},
  listPm: [],
  arr: [],
  dataOld: null,
  openNVDLState: false,
  openNVKDLState: false,
  dataState: null,
};

export const setUpCompanySlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    update: (state, action) => {
      state.update = action.payload;
    },
    sendData: (state, action) => {
      state.sendData = action.payload;
    },
    setOpenModalCompany: (state, action) => {
      state.openModalCompany = action.payload;
    },
    setOpenModalDepartments: (state, action) => {
      state.openModalDepartment = action.payload;
    },
    setOpenModalUser: (state, action) => {
      state.openModalUser = action.payload;
    },
    setOpenModal: (state, action) => {
      state.openModalUser = action.payload;
    },
    setOpenDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
    setOpenModalOrganize: (state, action) => {
      state.openModalChangeOrganize = action.payload;
    },
    setOpenModalPosition: (state, action) => {
      state.openModalChangePosition = action.payload;
    },
    setOpenModalDelete: (state, action) => {
      state.openModalDelete = action.payload;
    },
    setListPm: (state, action) => {
      state.listPm = action.payload;
    },
    setArr: (state, action) => {
      state.arr = action.payload;
    },
    dataOld: (state, action) => {
      state.dataOld = action.payload;
    },
    openNVDLState: (state, action) => {
      state.openNVDLState = action.payload;
    },
    openNVKDLState: (state, action) => {
      state.openNVKDLState = action.payload;
    },
    dataState: (state, action) => {
      state.dataState = action.payload;
    },
  },
});

export const {
  setDetail,
  setOpenModalDepartments,
  setOpenModalUser,
  sendData,
  setOpenModalCompany,
  setListPm,
  update,
  setOpenDrawer,
  setOpenModalPosition,
  setOpenModalOrganize,
  setOpenModal,
  setOpenModalDelete,
  setArr,
  dataOld,
  openNVDLState,
  dataState,
  openNVKDLState,
} = setUpCompanySlice.actions;
