import { createSlice } from "@reduxjs/toolkit";
import heroTypes from "../fakeDB/heroTypes";

const initialState = {
  heroTypes,
};

export const heroTypesSlice = createSlice({
  name: "heroTypes",
  initialState,
  reducers: {},
});

// export const {} = heroTypesSlice.actions;

export default heroTypesSlice.reducer;
