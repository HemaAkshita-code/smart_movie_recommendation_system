import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import reviewsReducer from "./reviews/reviewSlice";
import watchlistReducer from "./watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: (state = { list: [] }, action) => state,
    recommendations: (state = { list: [] }, action) => state,
    reviews: reviewsReducer,
    search: (state = { query: "", results: [] }, action) => state,
    watchlist: watchlistReducer,
    notifications: (state = { list: [] }, action) => state,
    profile: (state = { data: null }, action) => state,
    ui: (state = { theme: "light" }, action) => state,
  },
});

export default store;