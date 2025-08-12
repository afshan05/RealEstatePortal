// src/features/auth/authSlice.ts
import type { Logout } from "@mui/icons-material";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setCredentials, clearToken,logout } = authSlice.actions;
export default authSlice.reducer;
