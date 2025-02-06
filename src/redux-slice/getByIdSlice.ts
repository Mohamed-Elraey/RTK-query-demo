import { createSlice } from "@reduxjs/toolkit";

export interface passedId {
  value: number;
}

const initialState: passedId = {
  value: 1,
};

export const getByIdSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setId } = getByIdSlice.actions;

export const getByIdSliceReducer = getByIdSlice.reducer;
