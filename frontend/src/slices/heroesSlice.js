import { createSlice } from "@reduxjs/toolkit";
import heroes from "../fakeDB/heroes";

const initialState = heroes;

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    addStarredHero: (state, action) => {
      state.starredHeroes.unshift(action.payload.id);
    },
  },
});

export const { addStarredHero } = heroesSlice.actions;

export default heroesSlice.reducer;
