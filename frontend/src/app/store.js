import { configureStore } from "@reduxjs/toolkit";
import chatRoomsReducer from "../slices/chatRoomsSlice";
import commentReducer from "../slices/commentSlice";
import contractReducer from "../slices/contractSlice";
import dispatcherReducer from "../slices/dispatcherSlice";
import dispatchersReducer from "../slices/dispatchersSlice";
import heroesReducer from "../slices/heroesSlice";
import heroReducer from "../slices/heroSlice";
import heroTypesReducer from "../slices/heroTypesSlice";
import msgsReducer from "../slices/msgsSlice";
import questCategoriesReducer from "../slices/questCategoriesSlice";
import questsReducer from "../slices/questsSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    chatRooms: chatRoomsReducer,
    comment: commentReducer,
    contract: contractReducer,
    dispatcher: dispatcherReducer,
    dispatchers: dispatchersReducer,
    hero: heroReducer,
    heroes: heroesReducer,
    heroTypes: heroTypesReducer,
    msgs: msgsReducer,
    questCategories: questCategoriesReducer,
    quests: questsReducer,
    user: userReducer,
  },
});
