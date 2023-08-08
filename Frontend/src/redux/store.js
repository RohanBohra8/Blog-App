import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    //login function jab call hoga toh humari initial state true ho jaygi
    login(state) {
      state.isLogin = true;
    },
    //logout jab call hoga toh initial state false ho jaygi
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions; //authActions me authSlice ke reducer functions store kar rhe he

//using configureStore we need to pass one function thats whay use reducer instead of reducers
export const store = configureStore({
  reducer: authSlice.reducer,
});