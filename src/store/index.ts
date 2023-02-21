import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../services/movieApi";
import registerReducer from "../features/Register";
import loginReducer from "../features/Login";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
