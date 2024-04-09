'use client'
import { createSlice } from '@reduxjs/toolkit'

export const DeleteSlice = createSlice({
  name: 'Delete',
  initialState: {
    Threads: [],
    Comments: [],
    SingleThreadComments: []
  },
  reducers: {
    setAllThreads: (state, action) => {
      state.Threads = action.payload;
    },
    setAllComments: (state, action) => {
      state.Comments = action.payload;
    },
    setSingleThreadComments: (state, action) => {
      state.SingleThreadComments = action.payload;
    },
  },
});

export const { setAllThreads, setAllComments, setSingleThreadComments } = DeleteSlice.actions;
export default DeleteSlice.reducer;
