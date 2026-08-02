import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    username: "ria_cinema",
    name: "Ria",
    bio: "Obsessed with slow-burn cinematography, atmospheric scores, and thought-provoking science fiction. Denis Villeneuve enthusiast.",
    joinDate: "Joined August 2026",
    favorites: {
      movies: ["Arrival", "Her", "Blade Runner 2049"],
      directors: ["Denis Villeneuve", "Wong Kar-wai", "Spike Jonze"],
      actors: ["Amy Adams", "Ryan Gosling", "Joaquin Phoenix"],
      genres: ["Sci-Fi", "Drama", "Romance", "Mystery"],
    },
  },
  achievements: [
    { id: 1, title: "First Movie Rated", description: "Rated your first film on CineCompass.", unlocked: true, icon: "🎬" },
    { id: 2, title: "Collector", description: "Added 10+ films to your watchlist.", unlocked: true, icon: "📚" },
    { id: 3, title: "Seven-Day Streak", description: "Checked in seven days in a row.", unlocked: false, icon: "🔥" },
    { id: 4, title: "Taste Explorer", description: "Explored 5+ different genres.", unlocked: true, icon: "🧠" },
    { id: 5, title: "Genre Enthusiast", description: "Rated 5+ films in a single genre.", unlocked: false, icon: "🎭" },
  ],
  friends: [
    { id: "alex", name: "Alex", username: "alex_films", compatibility: 96, avatar: "A", shared: ["Arrival", "Interstellar", "Her"] },
    { id: "emma", name: "Emma", username: "emma_reads", compatibility: 82, avatar: "E", shared: ["Spirited Away", "In the Mood for Love"] },
    { id: "chris", name: "Chris", username: "chris_c", compatibility: 74, avatar: "C", shared: ["Inception", "The Dark Knight"] },
  ],
  socialActivity: [
    { id: 1, author: "Alex", action: "rated Arrival ★★★★★", time: "2 hours ago" },
    { id: 2, author: "Emma", action: "added Dune to Watchlist", time: "Yesterday" },
    { id: 3, author: "Chris", action: "completed Blade Runner 2049", time: "3 days ago" },
  ],
  pendingRequests: [
    { id: "sam", name: "Sam", username: "sam_v" }
  ],
  suggestedFriends: [
    { id: "lucas", name: "Lucas", username: "lucas_cinema", compatibility: 89 }
  ],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    acceptFriendRequest: (state, action) => {
      const request = state.pendingRequests.find((r) => r.id === action.payload);
      if (request) {
        state.friends.push({
          id: request.id,
          name: request.name,
          username: request.username,
          compatibility: 85,
          avatar: request.name[0],
          shared: ["Inception"],
        });
        state.pendingRequests = state.pendingRequests.filter((r) => r.id !== action.payload);
      }
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter((f) => f.id !== action.payload);
    },
  },
});

export const { updateProfile, acceptFriendRequest, removeFriend } = profileSlice.actions;
export default profileSlice.reducer;
export { initialState as mockProfileInitialState };
