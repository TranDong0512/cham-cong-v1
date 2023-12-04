import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    values: {},
    load: false,
};

export const gh_ipSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        search: (state, action) => {
            state.values = action.payload;
        },
    },
});

export const {  search } = gh_ipSlice.actions;
