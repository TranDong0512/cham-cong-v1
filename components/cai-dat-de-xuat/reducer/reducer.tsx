import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModalEdit: false,
  openModalDelete: false,
  updateSoCapDuyet: false,
  data: [],
  dataOld: null,
  openModalEditHTD: false,
  openModalDeleteHTD: false,
  updateHTD: false,
  dataSelectAdd: null,
  modalSettingSCD: false,
  modalSettingHTD: false,
};

export const ThoiGianDuyetReducer = createSlice({
  name: "tgd",
  initialState,
  reducers: {
    openModalEdit: (state, action) => {
      state.openModalEdit = action.payload;
    },
    openModalDelete: (state, action) => {
      state.openModalDelete = action.payload;
    },
    sendData: (state, action) => {
      state.data = action.payload;
    },
    updateSoCapDuyet: (state, action) => {
      state.updateSoCapDuyet = action.payload;
    },
    openModalEditHTD: (state, action) => {
      state.openModalEditHTD = action.payload;
    },
    openModalDeleteHTD: (state, action) => {
      state.openModalDeleteHTD = action.payload;
    },

    updateHTD: (state, action) => {
      state.updateHTD = action.payload;
    },
    dataOld: (state, action) => {
      state.dataOld = action.payload;
    },
    dataSelectAdd: (state, action) => {
      state.dataSelectAdd = action.payload;
    },
    modalSettingSCD: (state, action) => {
      state.modalSettingSCD = action.payload;
    },
    modalSettingHTDState: (state, action) => {
      state.modalSettingHTD = action.payload;
    },
  },
});

export const {
  openModalEdit,
  openModalDelete,
  sendData,
  updateSoCapDuyet,
  updateHTD,
  openModalEditHTD,
  openModalDeleteHTD,
  dataOld,
  dataSelectAdd,
  modalSettingSCD,
  modalSettingHTDState,
} = ThoiGianDuyetReducer.actions;
