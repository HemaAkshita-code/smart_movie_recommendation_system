import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const fetchReviewsForMovie = createAsyncThunk(
  "reviews/fetchReviewsForMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reviews/movie/${movieId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load reviews");
    }
  }
);

export const fetchAverageRating = createAsyncThunk(
  "reviews/fetchAverageRating",
  async (movieId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reviews/movie/${movieId}/average-rating`);
      return res.data; // { averageRating, totalReviews }
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load rating");
    }
  }
);

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({ userId, movieId, rating, reviewText, isSpoiler }, { rejectWithValue }) => {
    try {
      const res = await api.post("/reviews", {
        user: userId,
        movie: movieId,
        rating,
        reviewText,
        isSpoiler,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to submit review");
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      return reviewId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to delete review");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    averageRating: 0,
    totalReviews: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsForMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsForMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchReviewsForMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAverageRating.fulfilled, (state, action) => {
        state.averageRating = action.payload.averageRating;
        state.totalReviews = action.payload.totalReviews;
      })
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
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;