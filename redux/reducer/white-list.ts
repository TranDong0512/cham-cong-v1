import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabsPosition: "1",
    data:[]
};

export const WhiteListSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
        setTabsPosition: (state, action) => {
            state.tabsPosition = action.payload;
        },
        sendData:(state,action) => {
            state.data = action.payload
        }
    },
});

export const { setTabsPosition,sendData } = WhiteListSlice.actions;
