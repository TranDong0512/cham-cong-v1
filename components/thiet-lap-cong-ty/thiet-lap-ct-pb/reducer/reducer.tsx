import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModalAdd: false,
  openModalDelete: false,
  openModalAddCoCau: false,
  updateOrganize: false,
  data: [],
  dataClick: null,
};

export const ThietLapCtReducer = createSlice({
  name: "tlct",
  initialState,
  reducers: {
    openModalAdd: (state, action) => {
      state.openModalAdd = action.payload;
    },
    openModalAddCoCau: (state, action) => {
      state.openModalAddCoCau = action.payload;
    },
    openModalDelete: (state, action) => {
      state.openModalDelete = action.payload;
    },
    updateOrganize: (state, action) => {
      state.updateOrganize = action.payload;
    },
    sendData: (state, action) => {
      state.data = action.payload;
    },
    dataClick: (state, action) => {
      state.dataClick = action.payload;
    },
  },
});

export const {
  openModalAdd,
  openModalDelete,
  sendData,
  openModalAddCoCau,
  updateOrganize,
  dataClick,
} = ThietLapCtReducer.actions;
