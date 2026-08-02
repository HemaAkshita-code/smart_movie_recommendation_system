import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import reviewsReducer from "./reviews/reviewSlice";
import watchlistReducer from "./watchlist/watchlistSlice";
import onboardingReducer from "./onboarding/onboardingSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import discoverReducer from "./discover/discoverSlice";
import libraryReducer from "./library/librarySlice";
import profileReducer from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    dashboard: dashboardReducer,
    discover: discoverReducer,
    library: libraryReducer,
    profile: profileReducer,
    movies: (state = { list: [] }, action) => state,
    recommendations: (state = { list: [] }, action) => state,
    reviews: reviewsReducer,
    search: (state = { query: "", results: [] }, action) => state,
    watchlist: watchlistReducer,
    notifications: (state = { list: [] }, action) => state,
    ui: (state = { theme: "light" }, action) => state,
  },
});

export default store;