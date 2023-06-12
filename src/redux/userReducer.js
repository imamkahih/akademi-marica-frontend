import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: localStorage.getItem("role") ?? "",
  token: localStorage.getItem("token") ?? "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = "";
      state.token = "";
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
