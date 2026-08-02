import { createSlice } from "@reduxjs/toolkit";

const MOCK_ITEMS = [
  {
    id: 1,
    movie: {
      id: 1,
      title: "Arrival",
      releaseYear: 2016,
      duration: "1h 56m",
      rating: 4.8,
      genres: ["Sci-Fi", "Drama"],
      matchScore: 98,
      posterPath: null,
    },
    status: "completed",
    dateAdded: "3 days ago",
  },
  {
    id: 2,
    movie: {
      id: 6,
      title: "Her",
      releaseYear: 2013,
      duration: "2h 6m",
      rating: 4.6,
      genres: ["Romance", "Sci-Fi", "Drama"],
      matchScore: 95,
      posterPath: null,
    },
    status: "want to watch",
    dateAdded: "Yesterday",
  },
  {
    id: 3,
    movie: {
      id: 3,
      title: "Blade Runner 2049",
      releaseYear: 2017,
      duration: "2h 44m",
      rating: 4.7,
      genres: ["Sci-Fi", "Mystery"],
      matchScore: 93,
      posterPath: null,
    },
    status: "watching",
    dateAdded: "2 days ago",
  },
];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: MOCK_ITEMS,
    status: "succeeded",
    error: null,
  },
  reducers: {
    localAddToWatchlist: (state, action) => {
      const exists = state.items.some((i) => i.movie.id === action.payload.id);
      if (!exists) {
        state.items.push({
          id: Date.now(),
          movie: action.payload,
          status: "want to watch",
          dateAdded: "Just now",
        });
      }
    },
    localRemoveFromWatchlist: (state, action) => {
      state.items = state.items.filter((i) => i.movie.id !== action.payload);
    },
    localUpdateWatchlistStatus: (state, action) => {
      const { movieId, status } = action.payload;
      const idx = state.items.findIndex((i) => i.movie.id === movieId);
      if (idx !== -1) {
        state.items[idx].status = status;
      }
    },
  },
});

export const {
  localAddToWatchlist,
  localRemoveFromWatchlist,
  localUpdateWatchlistStatus,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
export { MOCK_ITEMS };