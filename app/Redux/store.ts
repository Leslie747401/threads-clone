'use client'

import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './States/ProfileState/ProfileSlice'
import editProfileReducer from './States/EditProfileState/EditProfileSlice'
import dynamicUserReducer from './States/DynamicUserState/DynamicUserSlice'
import activityReducer from './States/ActivityState/ActivitySlice'
import commentReducer from './States/CommentState/CommentSlice'

export const store = configureStore({
  reducer: {
    profileData : profileReducer,
    editProfileData : editProfileReducer,
    dynamicUser : dynamicUserReducer,
    activity : activityReducer,
    comment : commentReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

