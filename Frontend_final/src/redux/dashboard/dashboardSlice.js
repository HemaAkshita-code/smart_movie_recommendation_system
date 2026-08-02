import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Ria",
    recommendationCount: 3,
  },
  movieOfTheDay: {
    id: 13,
    title: "Blade Runner 2049",
    releaseYear: 2017,
    duration: "2h 44m",
    rating: 4.8,
    genres: ["Sci-Fi", "Mystery"],
    matchScore: 97,
    backdropPath: null,
    aiExplanation: "Because it perfectly matches your love for contemplative science fiction and breathtaking cinematography.",
  },
  continueWatching: [
    {
      id: 51,
      title: "Arrival",
      releaseYear: 2016,
      duration: "1h 56m",
      progress: 65,
      remainingTime: "40m left",
      posterPath: null,
    },
    {
      id: 52,
      title: "In the Mood for Love",
      releaseYear: 2000,
      duration: "1h 38m",
      progress: 30,
      remainingTime: "1h 8m left",
      posterPath: null,
    },
  ],
  notifications: [
    { id: 1, text: "New recommendation available: Her (95% Match)", time: "2 hours ago", unread: true },
    { id: 2, text: "Alex compared tastes with you: 96% compatibility", time: "1 day ago", unread: true },
    { id: 3, text: "Watchlist reminder: Stalker is leaving streaming soon", time: "2 days ago", unread: false },
    { id: 4, text: "Taste DNA updated based on your rating of Arrival", time: "3 days ago", unread: false },
  ],
  recentActivity: [
    { id: 1, type: "rating", movieTitle: "Arrival", detail: "Rated 5.0", time: "Today" },
    { id: 2, type: "watchlist", movieTitle: "Her", detail: "Added to Watchlist", time: "Yesterday" },
    { id: 3, type: "onboarding", movieTitle: "Taste DNA Profile", detail: "Completed Taste DNA Setup", time: "2 days ago" },
  ],
  compatibilitySnapshot: {
    friendName: "Alex",
    compatibilityScore: 96,
    sharedFavorites: ["Interstellar", "Arrival", "Her"],
    biggestDifference: {
      userPref: "psychological thrillers",
      friendPref: "action adventures",
    },
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    markNotificationsRead: (state) => {
      state.notifications = state.notifications.map((n) => ({ ...n, unread: false }));
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addToContinueWatching: (state, action) => {
      state.continueWatching = [action.payload, ...state.continueWatching];
    },
  },
});

export const { markNotificationsRead, clearNotifications, addToContinueWatching } = dashboardSlice.actions;
export default dashboardSlice.reducer;
