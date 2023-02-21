import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

export const register: any = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
      });
    } catch (e: any) {
      if (e.message === "Network Error") {
        return Promise.reject("Network Lost!!");
      } else {
        return Promise.reject(e.response.data.message);
      }
    }
  }
);

interface RegisterTypes {
  status: string | null;
  data: PayloadAction | null | string | boolean;
}

const initialState: RegisterTypes = {
  data: null,
  status: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [register.rejected]: (state, action) => {
      state.data = action.error.message;
      state.status = "Error";
    },
  },
});

export default registerSlice.reducer;
