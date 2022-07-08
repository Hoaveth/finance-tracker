import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  userData: null,
  authIsReady: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {
    user_login: (state, action) => {
      state.userData = action.payload;
    },
    user_logout: (state, action) => {
      state.userData = null;
    },
    set_auth: (state, action) => {
      state.authIsReady = true;
    },
  },
});

export const { user_login, user_logout, set_auth } = userSlice.actions;
export default userSlice.reducer;
