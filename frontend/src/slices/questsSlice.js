import { createSlice } from "@reduxjs/toolkit";
import quests from "../fakeDB/quests";

const initialState = {
  quests,
};

export const questsSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {
    // action.payload: {title, description, reward, applyDeadline, isEnded, heroTypes, categories}
    createQuest: (state, action) => {
      const id = state.quests.length;
      state.quests.push({
        id,
        lastUpdate: new Date().toISOString(),
        chatRooms: [],
        ...action.payload,
      });
      // console.log(state.quests);
    },

    updateQuest: (state, action) => {
      state.quests = [
        ...state.quests.filter((quest) => quest.id !== action.payload.id),
        {
          ...state.quests.find((quest) => quest.id === action.payload.id),
          ...action.payload,
        },
      ];
    },

    deleteQuest: (state, action) => {
      state.quests = state.quests.filter(
        (quest) => quest.id !== action.payload.id
      );
    },
  },
});

export const { createQuest, updateQuest, deleteQuest } = questsSlice.actions;

export default questsSlice.reducer;
