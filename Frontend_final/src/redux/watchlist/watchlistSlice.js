import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/watchlist/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load watchlist");
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async ({ userId, movieId, status }, { rejectWithValue }) => {
    try {
      const res = await api.post("/watchlist", {
        user: userId,
        movie: movieId,
        status,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to add");
    }
  }
);

export const updateWatchlistStatus = createAsyncThunk(
  "watchlist/updateStatus",
  async ({ entryId, status }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/watchlist/${entryId}`, { status });
      return res.data;
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
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default watchlistSlice.reducer;