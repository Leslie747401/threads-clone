'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface editProfileState {
  newFullname : string,
  newBio : string,
  newProfilePicture : string
}

const initialState: editProfileState = {
  newFullname : '',
  newBio : '',
  newProfilePicture : ''
}

export const editProfileSlice = createSlice({
  name: 'editProfileData',
  initialState,
  reducers: {
    setNewFullname: (state, action: PayloadAction<string>) => {
      state.newFullname = action.payload
    },
    setNewProfilePicture: (state, action: PayloadAction<string>) => {
      state.newProfilePicture = action.payload
    },
    setNewBio: (state, action: PayloadAction<string>) => {
      state.newBio = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNewFullname, setNewProfilePicture, setNewBio } = editProfileSlice.actions

export default editProfileSlice.reducer