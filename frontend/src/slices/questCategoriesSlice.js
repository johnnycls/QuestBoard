import { createSlice } from "@reduxjs/toolkit";
import questCategories from "../fakeDB/questsCategories";

const initialState = {
  questCategories,
};

export const questCategoriesSlice = createSlice({
  name: "questCategories",
  initialState,
  reducers: {
    createQuestCategory: (state, action) => {
      const id = state.questCategorys.length;
      state.questCategorys.push({ id, ...action.payload });
    },

    updateQuestCategory: (state, action) => {
      state.questCategorys = [
        ...state.questCategorys.filter(
          (questCategory) => questCategory.id !== action.payload.id
        ),
        action.payload,
      ];
    },

    deleteQuestCategory: (state, action) => {
      state.questCategorys = state.questCategorys.filter(
        (questCategory) => questCategory.id !== action.payload.id
      );
    },
  },
});

export const { createQuestCategory, updateQuestCategory, deleteQuestCategory } =
  questCategoriesSlice.actions;

export default questCategoriesSlice.reducer;
