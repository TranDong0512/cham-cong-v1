import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateUser: false,
    updateAcc: false,
    updateRole: false,
    updateVerify: false,
    updateAdmin: false,
};

export const updateSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.updateUser = action.payload;
        },
        updateAcc: (state, action) => {
            state.updateAcc = action.payload;
        },
        updateRole: (state, action) => {
            state.updateRole = action.payload;
        },
        updateVerify: (state, action) => {
            state.updateVerify = action.payload;
        },
        updateAdmin: (state, action) => {
            state.updateAdmin = action.payload;
        },
    },
});

export const { updateUser, updateAcc, updateRole, updateVerify, updateAdmin } =
    updateSlice.actions;
