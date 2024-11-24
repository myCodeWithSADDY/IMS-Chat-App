import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/misc";
import ChatSlice from "./reducers/chat";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [ChatSlice.name]: ChatSlice.reducer,
    // Add other slices here as needed
    [api.reducerPath]: api.reducer,
  },
  middleware: (defaultMiddleWare) => [...defaultMiddleWare(), api.middleware],
});

export default store;
