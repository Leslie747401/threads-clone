'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProfileState {
  username : string,
  fullname : string,
  bio : string,
  profilePicture : string
}

const initialState: ProfileState = {
  username : '',
  fullname : '',
  bio : '',
  profilePicture : ''
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
  },
})

// Action creators are generated for each case reducer function
export const { setUsername, setFullname, setProfilePicture, setBio } = profileSlice.actions

export default profileSlice.reducer