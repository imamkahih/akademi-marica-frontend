import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  alert: {
    type: "info",
    message: "Pesan belum diatur",
    show: false,
  },
};

const notificationSlice = createSlice({
  name: "notificationReducer",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setAlert, setLoading } = notificationSlice.actions;
export default notificationSlice.reducer;
