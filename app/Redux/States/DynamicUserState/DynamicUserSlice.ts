'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DynamicUserState {
  username : string,
  fullname : string,
  bio : string,
  profilePicture : string,
  numberOfThreads : string,
  numberOfFollowers : string,
  numberOfFollowing : string,
}

const initialState: DynamicUserState = {
  username : '',
  fullname : '',
  bio : '',
  profilePicture : '',
  numberOfThreads : '',
  numberOfFollowers : '',
  numberOfFollowing : '',
}

export const dynamicUserSlice = createSlice({
  name: 'dynamicUser',
  initialState,
  reducers: {
    setDynamicUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setDynamicFullname: (state, action: PayloadAction<string>) => {
      state.fullname = action.payload
    },
    setDynamicProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload
    },
    setDynamicBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload
    },
    setDynamicNumberOfThreads: (state, action: PayloadAction<string>) => {
      state.numberOfThreads = action.payload
    },
    setDynamicNumberOfFollowers: (state, action: PayloadAction<string>) => {
      state.numberOfFollowers = action.payload
    },
    setDynamicNumberOfFollowing: (state, action: PayloadAction<string>) => {
      state.numberOfFollowing = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDynamicUsername, setDynamicFullname, setDynamicProfilePicture, setDynamicBio, setDynamicNumberOfThreads, setDynamicNumberOfFollowers, setDynamicNumberOfFollowing } = dynamicUserSlice.actions

export default dynamicUserSlice.reducer