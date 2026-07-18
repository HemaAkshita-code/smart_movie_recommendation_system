import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/watchlist");
      return res.data; // expected: array of { id, movie, status }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load watchlist");
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async ({ movieId, status }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/watchlist/${movieId}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add");
    }
  }
);

export const updateWatchlistStatus = createAsyncThunk(
  "watchlist/updateStatus",
  async ({ movieId, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/watchlist/${movieId}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async (movieId, { rejectWithValue }) => {
    try {
      await api.delete(`/watchlist/${movieId}`);
      return movieId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to remove");
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.movie !== action.payload);
      });
  },
});

export default watchlistSlice.reducer;