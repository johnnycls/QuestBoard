import { createSlice } from "@reduxjs/toolkit";
import heroes from "../fakeDB/heroes";

const initialState = {
  id: -1,
  name: "",
  gender: "",
  dob: "",
  description: "",
  image: "",
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    getHero: (state, action) => {
      hero = heroes.heroes.find((hero) => hero.id === action.payload.id);

      hero &&
        Object.keys(initialState).forEach((key) => {
          state[key] = hero[key];
        });
    },
    modifyHero: (state, action) => {
      Object.keys(action.payload).forEach(
        (key) => (state[key] = action.payload[key])
      );
    },
  },
});

export const { getHero, modifyHero } = heroSlice.actions;

export default heroSlice.reducer;
