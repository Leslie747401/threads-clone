'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CommentState {
  commentsCount : string,
}

const initialState: CommentState = {
  commentsCount : '0'
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentsCount : (state, action: PayloadAction<string>) => {
      state.commentsCount = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCommentsCount } = commentSlice.actions

export default commentSlice.reducer