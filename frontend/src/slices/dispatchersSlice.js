import { createSlice } from "@reduxjs/toolkit";
import dispatchers from "../fakeDB/dispatchers";

const initialState = { dispatchers };

export const dispatchersSlice = createSlice({
  name: "dispatchers",
  initialState,
  reducers: {},
});

export const {} = dispatchersSlice.actions;

export default dispatchersSlice.reducer;
