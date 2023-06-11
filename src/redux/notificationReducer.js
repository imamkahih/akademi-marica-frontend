import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  alert: {
    type: "info",
    message: "Pesan belum diatur",
    show: false,
  },
  confirm: {
    show: false,
    confirm: null,
    message: "",
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
    openConfirm: (state, action) => {
      state.confirm.show = true;
      state.confirm.confirm = action.payload.confirm;
      state.confirm.message = action.payload.message;
    },
    closeConfirm: (state) => {
      state.confirm.show = false;
      state.confirm.confirm = null;
      state.confirm.message = "";
    },
  },
});

export const { setAlert, setLoading, openConfirm, closeConfirm } =
  notificationSlice.actions;
export default notificationSlice.reducer;
