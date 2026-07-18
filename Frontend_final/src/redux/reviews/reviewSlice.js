import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({ movieId, rating, text, isSpoiler }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/reviews/${movieId}`, { rating, text, isSpoiler });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to submit review");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;