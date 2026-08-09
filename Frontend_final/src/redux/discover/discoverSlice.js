import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

const MOCK_DB = [
  {
    id: 1,
    _id: "mock_1",
    title: "Arrival",
    releaseYear: 2016,
    duration: "1h 56m",
    rating: 4.8,
    genres: ["Sci-Fi", "Drama"],
    moods: ["Emotional", "Mind-Bending", "Hopeful"],
    matchScore: 98,
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner"],
    language: "English",
    country: "USA",
    platforms: ["Netflix", "Prime Video"],
    posterPath: null,
    synopsis: "A linguist is recruited by the military to assist in communicating with alien lifeforms who have arrived on Earth.",
    aiExplanation: "Recommended because you consistently enjoy emotionally driven science fiction with philosophical themes and visually immersive cinematography.",
  },
  {
    id: 2,
    _id: "mock_2",
    title: "In the Mood for Love",
    releaseYear: 2000,
    duration: "1h 38m",
    rating: 4.8,
    genres: ["Romance", "Drama"],
    moods: ["Emotional", "Dark", "Relaxing"],
    matchScore: 89,
    director: "Wong Kar-wai",
    cast: ["Tony Leung", "Maggie Cheung"],
    language: "Cantonese",
    country: "Hong Kong",
    platforms: ["MUBI", "Criterion Channel"],
    posterPath: null,
    synopsis: "Two neighbors form a strong bond after suspecting their respective spouses of extramarital activities.",
    aiExplanation: "Recommended for its melancholic atmosphere, poetic slow-burn pacing, and gorgeous frames mapping love and restraint.",
  },
  {
    id: 3,
    _id: "mock_3",
    title: "Blade Runner 2049",
    releaseYear: 2017,
    duration: "2h 44m",
    rating: 4.7,
    genres: ["Sci-Fi", "Mystery"],
    moods: ["Dark", "Mind-Bending", "Intense"],
    matchScore: 93,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford"],
    language: "English",
    country: "USA",
    platforms: ["Max", "Prime Video"],
    posterPath: null,
    synopsis: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
    aiExplanation: "Recommended because of your affinity for stunning visual spectacles, Roger Deakins' cinematography, and cerebral sci-fi.",
  },
  {
    id: 4,
    _id: "mock_4",
    title: "Portrait of a Lady on Fire",
    releaseYear: 2019,
    duration: "2h 2m",
    rating: 4.7,
    genres: ["Drama", "Romance"],
    moods: ["Emotional", "Hopeful"],
    matchScore: 87,
    director: "Celine Sciamma",
    cast: ["Noémie Merlant", "Adèle Haenel"],
    language: "French",
    country: "France",
    platforms: ["Hulu", "MUBI"],
    posterPath: null,
    synopsis: "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
    aiExplanation: "Matches your taste for visually rich, emotionally resonant romance films featuring strong female directions.",
  },
  {
    id: 5,
    _id: "mock_5",
    title: "Interstellar",
    releaseYear: 2014,
    duration: "2h 49m",
    rating: 4.8,
    genres: ["Sci-Fi", "Drama"],
    moods: ["Mind-Bending", "Hopeful", "Inspiring"],
    matchScore: 93,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    language: "English",
    country: "USA",
    platforms: ["Prime Video", "Max"],
    posterPath: null,
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    aiExplanation: "Matches your deep love for massive space voyages, Hans Zimmer scores, and emotional father-daughter stories.",
  },
  {
    id: 6,
    _id: "mock_6",
    title: "Her",
    releaseYear: 2013,
    duration: "2h 6m",
    rating: 4.6,
    genres: ["Romance", "Sci-Fi", "Drama"],
    moods: ["Emotional", "Hopeful", "Relaxing"],
    matchScore: 95,
    director: "Spike Jonze",
    cast: ["Joaquin Phoenix", "Scarlett Johansson"],
    language: "English",
    country: "USA",
    platforms: ["Max", "Hulu"],
    posterPath: null,
    synopsis: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    aiExplanation: "Recommended for its pastel color palette, soft visual layout, and exploration of human loneliness.",
  },
  {
    id: 7,
    _id: "mock_7",
    title: "Parasite",
    releaseYear: 2019,
    duration: "2h 12m",
    rating: 4.9,
    genres: ["Thriller", "Drama", "Crime"],
    moods: ["Intense", "Dark", "Suspenseful"],
    matchScore: 92,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun"],
    language: "Korean",
    country: "South Korea",
    platforms: ["Hulu", "Max"],
    posterPath: null,
    synopsis: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    aiExplanation: "Highly compatible with your appreciation for sharp social satire, genre-bending structures, and intense suspense.",
  },
  {
    id: 8,
    _id: "mock_8",
    title: "Spirited Away",
    releaseYear: 2001,
    duration: "2h 5m",
    rating: 4.8,
    genres: ["Animation", "Fantasy"],
    moods: ["Inspiring", "Hopeful", "Feel Good"],
    matchScore: 88,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino"],
    language: "Japanese",
    country: "Japan",
    platforms: ["Max"],
    posterPath: null,
    synopsis: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    aiExplanation: "Matches your taste for magical world-building, gorgeous hand-drawn animation, and nostalgic coming-of-age journeys.",
  },
];

export const mapMovieToFrontend = (m) => {
  if (!m) return null;
  return {
    id: m._id,
    _id: m._id,
    title: m.title,
    releaseYear: m.releaseYear,
    duration: typeof m.duration === "number" ? `${Math.floor(m.duration / 60)}h ${m.duration % 60}m` : m.duration,
    rating: m.avgRating || 0,
    genres: m.genre || [],
    cast: m.cast || [],
    director: m.director || "Unknown",
    posterPath: m.coverImage || null,
    synopsis: m.description || "",
    moods: m.moods || ["Mind-Bending", "Intense", "Hopeful"],
    platforms: m.platforms || ["Netflix", "Prime Video"],
    matchScore: m.matchScore || Math.floor(Math.random() * 15) + 85,
    aiExplanation: m.aiExplanation || `Matches your affinity for ${m.genre ? m.genre.join(" and ") : "fine cinema"}.`,
  };
};

export const fetchMovies = createAsyncThunk(
  "discover/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/movies");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch movies");
    }
  }
);

export const searchMovies = createAsyncThunk(
  "discover/searchMovies",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.get(`/movies/search?query=${encodeURIComponent(query)}`);
      return res.data.movie;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Search failed");
    }
  }
);

const initialState = {
  movies: MOCK_DB,
  selectedGenres: [],
  selectedMoods: [],
  activeFilters: {
    releaseYear: "All",
    runtime: "All",
    rating: 0,
    language: "All",
    platform: "All",
  },
  searchQuery: "",
  isSearchActive: false,
  selectedMovieForDrawer: null,
  recentSearches: ["Mind-bending Sci-Fi", "Denis Villeneuve", "Slow-burn dramas"],
};

const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    toggleGenreFilter: (state, action) => {
      const genre = action.payload;
      if (state.selectedGenres.includes(genre)) {
        state.selectedGenres = state.selectedGenres.filter((g) => g !== genre);
      } else {
        state.selectedGenres.push(genre);
      }
    },
    toggleMoodFilter: (state, action) => {
      const mood = action.payload;
      if (state.selectedMoods.includes(mood)) {
        state.selectedMoods = state.selectedMoods.filter((m) => m !== mood);
      } else {
        state.selectedMoods.push(mood);
      }
    },
    setAdvancedFilter: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
    },
    resetFilters: (state) => {
      state.selectedGenres = [];
      state.selectedMoods = [];
      state.activeFilters = initialState.activeFilters;
      state.searchQuery = "";
      state.isSearchActive = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.isSearchActive = !!action.payload.trim();
      if (state.isSearchActive && !state.recentSearches.includes(action.payload)) {
        state.recentSearches = [action.payload, ...state.recentSearches.slice(0, 4)];
      }
    },
    setSearchActiveState: (state, action) => {
      state.isSearchActive = action.payload;
    },
    openDrawer: (state, action) => {
      state.selectedMovieForDrawer = action.payload;
    },
    closeDrawer: (state) => {
      state.selectedMovieForDrawer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload && action.payload.length > 0) {
          state.movies = action.payload.map(mapMovieToFrontend);
        }
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        if (action.payload) {
          const mapped = mapMovieToFrontend(action.payload);
          const exists = state.movies.some((m) => m.id === mapped.id || m._id === mapped._id);
          if (!exists) {
            state.movies.unshift(mapped);
          }
          state.selectedMovieForDrawer = mapped;
        }
      });
  },
});

export const {
  toggleGenreFilter,
  toggleMoodFilter,
  setAdvancedFilter,
  resetFilters,
  setSearchQuery,
  setSearchActiveState,
  openDrawer,
  closeDrawer,
} = discoverSlice.actions;

export default discoverSlice.reducer;
export { MOCK_DB };
