import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGenres: [],
  selectedMovies: [],
  selectedDirectors: [],
  selectedPlatforms: [],
  preferenceAnswers: [],
  isOnboardingCompleted: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    setMovies: (state, action) => {
      state.selectedMovies = action.payload;
    },
    setDirectors: (state, action) => {
      state.selectedDirectors = action.payload;
    },
    setPlatforms: (state, action) => {
      state.selectedPlatforms = action.payload;
    },
    setPreferenceAnswers: (state, action) => {
      state.preferenceAnswers = action.payload;
    },
    completeOnboarding: (state) => {
      state.isOnboardingCompleted = true;
    },
    resetOnboarding: (state) => {
      return initialState;
    },
  },
});

export const {
  setGenres,
  setMovies,
  setDirectors,
  setPlatforms,
  setPreferenceAnswers,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
