'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProfileState {
  username : string,
  fullname : string,
  bio : string,
  profilePicture : string,
  numberOfThreads : string,
  numberOfFollowers : string,
  numberOfFollowing : string,
  profileSkeletonLoading : boolean,
}

const initialState: ProfileState = {
  username : '',
  fullname : '',
  bio : '',
  profilePicture : '',
  numberOfThreads : '',
  numberOfFollowers : '',
  numberOfFollowing : '',
  profileSkeletonLoading : true
}

export const profileSlice = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setFullname: (state, action: PayloadAction<string>) => {
      state.fullname = action.payload
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload
    },
    setNumberOfThreads: (state, action: PayloadAction<string>) => {
      state.numberOfThreads = action.payload
    },
    setNumberOfFollowers: (state, action: PayloadAction<string>) => {
      state.numberOfFollowers = action.payload
    },
    setNumberOfFollowing: (state, action: PayloadAction<string>) => {
      state.numberOfFollowing = action.payload
    },
    setprofileSkeletonLoading: (state, action: PayloadAction<boolean>) => {
      state.profileSkeletonLoading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsername, setFullname, setProfilePicture, setBio, setNumberOfThreads, setNumberOfFollowers, setNumberOfFollowing, setprofileSkeletonLoading } = profileSlice.actions

export default profileSlice.reducer