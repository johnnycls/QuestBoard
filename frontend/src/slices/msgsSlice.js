import { createSlice } from "@reduxjs/toolkit";
import msgs from "../fakeDB/msgs";

const initialState = {
  msgs,
};

export const msgsSlice = createSlice({
  name: "msgs",
  initialState,
  reducers: {
    createMsg: (state, action) => {
      const { senderId, content, chatRoom } = action.payload;
      const id = state.msgs.length;
      const datetime = new Date().toISOString();
      state.msgs.push({ id, datetime, senderId, content, chatRoom });
    },

    updateMsg: (state, action) => {
      state.msgs = [
        ...state.msgs.filter((msg) => msg.id !== action.payload.id),
        action.payload,
      ];
    },

    deleteMsg: (state, action) => {
      state.msgs = state.msgs.filter((msg) => msg.id !== action.payload.id);
    },
  },
});

export const { createMsg, updateMsg, deleteMsg } = msgsSlice.actions;

export default msgsSlice.reducer;
