import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [
    { id: 1, type: "rating", movieTitle: "Arrival", detail: "Rated 5.0 Stars", time: "Today", date: "2026-08-02", genre: "Sci-Fi" },
    { id: 2, type: "watchlist", movieTitle: "Her", detail: "Added to Watchlist", time: "Yesterday", date: "2026-08-01", genre: "Romance" },
    { id: 3, type: "onboarding", movieTitle: "Taste DNA Profile", detail: "Completed Taste DNA Setup", time: "2 days ago", date: "2026-07-31", genre: "Other" },
    { id: 4, type: "complete", movieTitle: "Blade Runner 2049", detail: "Finished Watching", time: "3 days ago", date: "2026-07-30", genre: "Sci-Fi" },
  ],
  collections: [
    { id: 101, title: "Weekend Watch", description: "Comfy selections for quiet weekend nights.", movieCount: 3 },
    { id: 102, title: "Comfort Movies", description: "Masterpieces you can watch again and again.", movieCount: 2 },
    { id: 103, title: "Oscar Winners", description: "Academy award winning visual and narrative spectacles.", movieCount: 4 },
    { id: 104, title: "Must Rewatch", description: "Films that demand a second viewing to fully grasp.", movieCount: 2 },
  ],
  notes: {
    1: "Loved the focus on communication and linear time. Denis Villeneuve's masterpiece.",
    3: "Roger Deakins' cinematography is stunning. Visually one of the greatest films of all time.",
  },
  ratings: {
    1: 5.0,
    3: 4.8,
  },
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addHistoryItem: (state, action) => {
      state.history.unshift({
        id: Date.now(),
        ...action.payload,
        time: "Just now",
      });
    },
    addCollection: (state, action) => {
      state.collections.push({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description || "",
        movieCount: 0,
      });
    },
    saveNote: (state, action) => {
      const { movieId, note } = action.payload;
      state.notes[movieId] = note;
    },
    saveRating: (state, action) => {
      const { movieId, rating } = action.payload;
      state.ratings[movieId] = rating;
    },
  },
});

export const { addHistoryItem, addCollection, saveNote, saveRating } = librarySlice.actions;
export default librarySlice.reducer;
