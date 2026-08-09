import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

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

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/watchlist/user/${userId}`);
      return res.data.map(item => ({
        ...item,
        status: item.status ? item.status.toLowerCase() : "want to watch"
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load watchlist");
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async ({ userId, movieId, status }, { rejectWithValue }) => {
    try {
      const backendStatus = status === "completed" ? "Completed" : status === "watching" ? "Watching" : "Want to Watch";
      const res = await api.post("/watchlist", {
        user: userId,
        movie: movieId,
        status: backendStatus,
      });
      return {
        ...res.data,
        status: res.data.status ? res.data.status.toLowerCase() : "want to watch"
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to add");
    }
  }
);

export const updateWatchlistStatus = createAsyncThunk(
  "watchlist/updateStatus",
  async ({ entryId, status }, { rejectWithValue }) => {
    try {
      const backendStatus = status === "completed" ? "Completed" : status === "watching" ? "Watching" : "Want to Watch";
      const res = await api.put(`/watchlist/${entryId}`, { status: backendStatus });
      return {
        ...res.data,
        status: res.data.status ? res.data.status.toLowerCase() : "want to watch"
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to update");
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async (entryId, { rejectWithValue }) => {
    try {
      await api.delete(`/watchlist/${entryId}`);
      return entryId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to remove");
    }
  }
);


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
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateWatchlistStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  }
});

export const {
  localAddToWatchlist,
  localRemoveFromWatchlist,
  localUpdateWatchlistStatus,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
export { MOCK_ITEMS };