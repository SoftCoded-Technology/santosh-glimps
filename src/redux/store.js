import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { api } from "./apiSlice";

const rootReducer = combineReducers({
  [userSlice.name] : userSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),

});


