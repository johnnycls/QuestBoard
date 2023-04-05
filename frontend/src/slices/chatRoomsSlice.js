import { createSlice } from "@reduxjs/toolkit";
import chatRooms from "../fakeDB/chatRooms";

const initialState = {
  chatRooms,
};

export const chatRoomsSlice = createSlice({
  name: "chatRooms",
  initialState,
  reducers: {
    createChatRoom: (state, action) => {
      const id = state.chatRooms.length;
      state.chatRooms.push({ id, ...action.payload });
    },

    updateChatRoom: (state, action) => {
      state.chatRooms = [
        ...state.chatRooms.filter(
          (chatRoom) => chatRoom.id !== action.payload.id
        ),
        action.payload,
      ];
    },

    deleteChatRoom: (state, action) => {
      state.chatRooms = state.chatRooms.filter(
        (chatRoom) => chatRoom.id !== action.payload.id
      );
    },
  },
});

export const { createChatRoom, updateChatRoom, deleteChatRoom } =
  chatRoomsSlice.actions;

export default chatRoomsSlice.reducer;
