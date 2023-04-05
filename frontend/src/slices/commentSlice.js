import { createSlice } from "@reduxjs/toolkit";
import comments from "../fakeDB/comments";

const initialState = {
  comments: comments,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createComment: (state, action) => {
      state.comments.push({ ...action.payload });
    },
    // getComment: (state, action) => {
    //   state.comment = comments.find(
    //     (comment) => comment.id === action.payload.id
    //   );
    // },
    updateComment: (state, action) => {
      const updateId = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments[updateId] = { ...action.payload };
      // console.log(state.comments);
    },
  },
});

export const { createComment, getComment, updateComment } =
  commentSlice.actions;

export default commentSlice.reducer;
