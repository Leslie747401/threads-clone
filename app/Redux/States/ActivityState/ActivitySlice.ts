'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Activity {
    activity_id : number;
    activity_image : string;
    activity_username : string;
    created_at : string;
    message : string;
    type : string;
    username : string;
}

interface ActivityState {
    allFollows : Activity[]
}

const initialState: ActivityState = {
    allFollows : []
}

export const ActivitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setFollows : (state, action: PayloadAction<Activity>) => {
        state.allFollows.push(action.payload);
    },
  }
})

// Action creators are generated for each case reducer function
export const { setFollows } = ActivitySlice.actions

export default ActivitySlice.reducer;