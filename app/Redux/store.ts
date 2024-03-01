'use client'

import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './States/ProfileState/ProfileSlice'
import editProfileReducer from './States/EditProfileState/EditProfileSlice'

export const store = configureStore({
  reducer: {
    profileData : profileReducer,
    editProfileData : editProfileReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch