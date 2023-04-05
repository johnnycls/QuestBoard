import { createSlice } from "@reduxjs/toolkit";
import dispatchers from "../fakeDB/dispatchers";

const initialState = {
  id: -1,
  name: "",
  gender: "",
  dob: "",
  description: "",
  image: "",
};

export const dispatcherSlice = createSlice({
  name: "dispatcher",
  initialState,
  reducers: {
    getDispatcher: (state, action) => {
      dispatcher = dispatchers.find(
        (dispatcher) => dispatcher.id === action.payload.id
      );

      dispatcher &&
        Object.keys(dispatcher).forEach((key) => {
          state[key] = dispatcher[key];
        });
    },

    modifyDispatcher: (state, action) => {
      Object.keys(action.payload).forEach(
        (key) => (state[key] = action.payload[key])
      );
    },
  },
});

export const { getDispatcher, modifyDispatcher } = dispatcherSlice.actions;

export default dispatcherSlice.reducer;
