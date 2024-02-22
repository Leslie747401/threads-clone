'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface ProfileState {
  username : string,
  fullname : string,
  bio : string,
  profile_picture : string
}

const initialState: ProfileState = {
  username : '',
  fullname : '',
  bio : '',
  profile_picture : ''
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
      state.profile_picture = action.payload
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsername, setFullname, setProfilePicture, setBio } = profileSlice.actions

export default profileSlice.reducer