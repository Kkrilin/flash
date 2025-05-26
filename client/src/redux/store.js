import { configureStore } from "@reduxjs/toolkit";

// reducer
import profileReducer from "./slice/profileSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;
