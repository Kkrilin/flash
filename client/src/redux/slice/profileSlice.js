import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state, action) {
      return action.payload;
    },
  },
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
