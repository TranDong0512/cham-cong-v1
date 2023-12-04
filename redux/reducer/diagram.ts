import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateDiagram:false,
};

export const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    updateDiagram: (state, action) => {
      state.updateDiagram = action.payload;
    },
  },
});

export const { updateDiagram } = diagramSlice.actions;
