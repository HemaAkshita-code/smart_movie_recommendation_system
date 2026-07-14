import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Boilerplate reducers for the slices defined in the architecture
    auth: (state = { user: null }, action) => state,
    movies: (state = { list: [] }, action) => state,
    recommendations: (state = { list: [] }, action) => state,
    reviews: (state = { list: [] }, action) => state,
    search: (state = { query: "", results: [] }, action) => state,
    watchlist: (state = { items: [] }, action) => state,
    notifications: (state = { list: [] }, action) => state,
    profile: (state = { data: null }, action) => state,
    ui: (state = { theme: "light" }, action) => state,
  },
});

export default store;
