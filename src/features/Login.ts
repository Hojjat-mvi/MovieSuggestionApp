import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import type { PayloadAction } from "@reduxjs/toolkit";

interface loginInterface {
  status: string | null;
  data: PayloadAction | null | string | boolean;
}

export const login: any = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      const decodedToken: {
        email: string;
        iat: string | bigint;
        exp: string | bigint;
      } = jwtDecode(result.data.access_token);

      localStorage.setItem("token", result.data.access_token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("iat", decodedToken.iat.toString());
      localStorage.setItem("exp", decodedToken.exp.toString());
    } catch (e: any) {
      console.log("E: ", e);
      if (e.message === "Network Error") {
        return Promise.reject("Network Lost!!");
      } else {
        return Promise.reject(e.response.data.message);
      }
    }
  }
);

const initialState: loginInterface = {
  data: null,
  status: null,
};

const loginSLice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state, logoutType) => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("exp");
      localStorage.removeItem("iat");

      state.status = "logout";
      state.data = null;
      if (logoutType.payload === "normal") {
        toast.error("You were Logged Out !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading..";
    },
    [login.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [login.rejected]: (state, action) => {
      state.data = action.error.message;
      state.status = "Error";
    },
  },
});

export const { logout } = loginSLice.actions;

export const checkAuth = () => (dispatch: Dispatch<PayloadAction>) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout(""));
  } else {
    const expire = localStorage.getItem("expire") || "";
    const expireTime = new Date(parseInt(expire) * 1000);
    if (expireTime <= new Date()) {
      dispatch(logout(""));
    } else {
      dispatch(login.fulfilled());
    }
  }
};


export default loginSLice.reducer;
