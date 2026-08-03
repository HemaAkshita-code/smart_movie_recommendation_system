📁 Complete Frontend Structure


cinecompass-frontend/
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── robots.txt
│   ├── manifest.json
│   └── images/
│
├── src/
│
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── config/
│   ├── lib/
│   ├── utils/
│   ├── styles/
│
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── README.md
├── package.json
├── vite.config.js
└── tailwind.config.js



📂 What goes inside src/

1. 📁 assets/

Static resources.

assets/
│
├── images/
├── icons/
├── fonts/
├── logos/
├── animations/
└── illustrations/


2. 📁 components/

Reusable UI only.

Never put complete pages here.

components/
│
├── ui/
├── common/
├── layout/
├── movie/
├── recommendation/
├── review/
├── search/
├── watchlist/
└── profile/

A. 📂 components/ui/

Since you're using shadcn/ui, keep all UI primitives here.

ui/
│
├── button.jsx
├── input.jsx
├── textarea.jsx
├── badge.jsx
├── avatar.jsx
├── card.jsx
├── dialog.jsx
├── dropdown-menu.jsx
├── sheet.jsx
├── tabs.jsx
├── toast.jsx
├── tooltip.jsx
├── separator.jsx
├── switch.jsx
├── skeleton.jsx
├── alert-dialog.jsx
└── spinner.jsx


B. 📂 components/common/

Reusable app components.

common/
│
├── Loader.jsx
├── EmptyState.jsx
├── ErrorBoundary.jsx
├── Pagination.jsx
├── InfiniteScroll.jsx
├── ThemeToggle.jsx
├── Logo.jsx
├── Breadcrumb.jsx
├── BackButton.jsx
└── ScrollToTop.jsx


C. 📂 components/layout/

layout/
│
├── Navbar.jsx
├── Sidebar.jsx
├── Footer.jsx
├── MainLayout.jsx
├── ProtectedLayout.jsx
└── AuthLayout.jsx


D. 📂 components/movie/

movie/
│
├── MovieCard.jsx
├── MovieGrid.jsx
├── MovieBanner.jsx
├── MoviePoster.jsx
├── CastCard.jsx
├── TrailerPlayer.jsx
├── GenreBadge.jsx
├── RatingStars.jsx
├── CompatibilityScore.jsx
└── MovieCarousel.jsx


E. 📂 components/recommendation/

recommendation/
│
├── RecommendationCard.jsx
├── RecommendationCarousel.jsx
├── TasteDNAChart.jsx
├── MatchReasons.jsx
├── CompatibilityMeter.jsx
└── AIRecommendationBox.jsx


F. 📂 components/review/

review/
│
├── ReviewCard.jsx
├── ReviewEditor.jsx
├── ReviewSummary.jsx
├── HelpfulVote.jsx
├── SpoilerTag.jsx
└── RatingDistribution.jsx


G. 📂 components/search/


search/
│
├── SearchBar.jsx
├── SearchFilters.jsx
├── SearchDropdown.jsx
├── SearchResultCard.jsx
└── FilterSidebar.jsx


H. 📂 components/watchlist/

watchlist/
│
├── WatchlistCard.jsx
├── WatchStatusTabs.jsx
├── WatchlistGrid.jsx
└── WatchlistActions.jsx


I. 📂 components/profile/

profile/
│
├── UserStats.jsx
├── TasteGraph.jsx
├── ActivityFeed.jsx
├── AchievementCard.jsx
├── FavoriteGenres.jsx
└── FavoriteMovies.jsx


3. 📂 pages/

Each folder represents one route.

pages/
│
├── Landing/
│
├── Home/
│
├── Discover/
│
├── MovieDetails/
│
├── Search/
│
├── Watchlist/
│
├── Recommendations/
│
├── TasteDNA/
│
├── Profile/
│
├── Login/
│
├── Register/
│
├── ForgotPassword/
│
├── Settings/
│
├── Admin/
│
└── NotFound/


4. 📂 redux/

redux/
│
├── store.js
│
├── auth/
│
├── movies/
│
├── recommendations/
│
├── reviews/
│
├── search/
│
├── watchlist/
│
├── notifications/
│
├── profile/
│
└── ui/


5. 📂 services/

API calls only.

services/
│
├── api.js
├── authService.js
├── movieService.js
├── reviewService.js
├── recommendationService.js
├── searchService.js
├── notificationService.js
└── userService.js


6. 📂 hooks/
hooks/
│
├── useAuth.js
├── useMovies.js
├── useRecommendations.js
├── useTheme.js
├── useInfiniteScroll.js
└── useDebounce.js


7. 📂 routes/
routes/
│
├── AppRoutes.jsx
├── ProtectedRoute.jsx
└── PublicRoute.jsx


8. 📂 context/
context/
│
├── ThemeContext.jsx
└── SocketContext.jsx


9. 📂 config/
config/
│
├── api.js
├── constants.js
├── routes.js
└── theme.js


10. 📂 lib/

Third-party library setup.

lib/
│
├── axios.js
├── socket.js
└── cloudinary.js


11. 📂 utils/
utils/
│
├── helpers.js
├── formatDate.js
├── calculateMatch.js
├── storage.js
└── validators.js


12. 📂 styles/
styles/
│
├── globals.css
├── variables.css
├── animations.css
└── typography.css





🏆 Final Folder Tree
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── movie/
│   │   ├── recommendation/
│   │   ├── review/
│   │   ├── search/
│   │   ├── watchlist/
│   │   └── profile/
│   │
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── config/
│   ├── lib/
│   ├── utils/
│   ├── styles/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── .env
├── .gitignore
├── README.md
├── package.json
└── vite.config.js