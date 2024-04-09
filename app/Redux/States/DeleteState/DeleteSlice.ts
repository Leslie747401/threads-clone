'use client'
import { createSlice } from '@reduxjs/toolkit'

export const DeleteSlice = createSlice({
  name: 'Delete',
  initialState: {
    Threads: [],
    Comments: []
  },
  reducers: {
    setAllThreads: (state, action) => {
      state.Threads = action.payload;
    },
    setAllComments: (state, action) => {
      state.Comments = action.payload;
    },
  },
});

export const { setAllThreads, setAllComments } = DeleteSlice.actions;
export default DeleteSlice.reducer;
