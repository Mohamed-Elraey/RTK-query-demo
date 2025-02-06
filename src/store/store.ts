import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonPlaceHolderApi } from "../services/jsonPlaceHolderApi";
import { getByIdSliceReducer } from "../redux-slice/getByIdSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    id: getByIdSliceReducer,
    [jsonPlaceHolderApi.reducerPath]: jsonPlaceHolderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceHolderApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
