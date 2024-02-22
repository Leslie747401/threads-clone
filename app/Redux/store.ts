'use client'

import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './States/ProfileState/ProfileSlice'

export const store = configureStore({
  reducer: {
    profileData : profileReducer 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch