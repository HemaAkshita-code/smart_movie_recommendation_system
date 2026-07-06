# 🎬 CineCompass Frontend

> **"Never Waste Your Time on the Wrong Movie Again."**

CineCompass is an AI-powered movie recommendation platform that helps users discover movies based on their **Taste DNA**, watch history, ratings, and preferences rather than relying solely on public ratings.

This repository contains the **Frontend** built with **React + Vite + Tailwind CSS + shadcn/ui**, following a scalable and modular architecture for maintainability and future growth.

---

# 🚀 Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| UI Library | shadcn/ui |
| Routing | React Router DOM |
| State Management | Redux Toolkit |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Icons | React Icons |
| Notifications | React Hot Toast |
| Real-time | Socket.IO Client |

---

# 📂 Project Structure

```
frontend/
│
├── public/
│
├── src/
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
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

# 📁 Folder Architecture

## 📂 public/

Contains publicly accessible static assets.

```
public/
│
├── favicon.ico
├── logo.svg
├── robots.txt
├── manifest.json
└── images/
```

---

## 📂 src/

Contains all application source code.

---

## 📂 assets/

Stores static resources used throughout the application.

```
assets/
│
├── images/
├── icons/
├── fonts/
├── logos/
├── animations/
└── illustrations/
```

---

## 📂 components/

Reusable UI components shared across multiple pages.

```
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
```

---

### 📂 ui/

Reusable UI primitives from **shadcn/ui**.

Example components:

- Button
- Card
- Input
- Badge
- Avatar
- Dialog
- Tabs
- Toast
- Tooltip
- Sheet
- Skeleton
- Switch

---

### 📂 common/

Application-wide reusable components.

Examples:

- Loader
- Empty State
- Error Boundary
- Pagination
- Theme Toggle
- Scroll To Top
- Breadcrumb
- Logo

---

### 📂 layout/

Layout components used across pages.

Includes:

- Navbar
- Sidebar
- Footer
- Main Layout
- Protected Layout
- Authentication Layout

---

### 📂 movie/

Movie-related UI components.

Examples:

- Movie Card
- Movie Grid
- Movie Banner
- Poster
- Cast Card
- Rating Stars
- Compatibility Score
- Trailer Player

---

### 📂 recommendation/

Recommendation system components.

Examples:

- Recommendation Card
- Recommendation Carousel
- Taste DNA Chart
- Match Reasons
- Compatibility Meter
- AI Recommendation Box

---

### 📂 review/

Review-related components.

Examples:

- Review Card
- Review Editor
- Review Summary
- Helpful Vote
- Rating Distribution
- Spoiler Tag

---

### 📂 search/

Search interface components.

Examples:

- Search Bar
- Search Filters
- Search Dropdown
- Search Result Card
- Filter Sidebar

---

### 📂 watchlist/

Watchlist-related UI.

Examples:

- Watchlist Card
- Watch Status Tabs
- Watchlist Grid
- Watchlist Actions

---

### 📂 profile/

User profile components.

Examples:

- User Statistics
- Taste Graph
- Activity Feed
- Achievement Card
- Favorite Genres
- Favorite Movies

---

## 📂 pages/

Every folder represents a route in the application.

```
pages/
│
├── Landing/
├── Home/
├── Discover/
├── MovieDetails/
├── Search/
├── Watchlist/
├── Recommendations/
├── TasteDNA/
├── Profile/
├── Login/
├── Register/
├── ForgotPassword/
├── Settings/
├── Admin/
└── NotFound/
```

Each page should focus on composing reusable components rather than implementing business logic.

---

## 📂 redux/

Global application state management.

```
redux/
│
├── store.js
├── auth/
├── movies/
├── recommendations/
├── reviews/
├── search/
├── watchlist/
├── notifications/
├── profile/
└── ui/
```

---

## 📂 services/

Handles communication with backend APIs.

```
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
```

> Components should never make direct Axios calls.

---

## 📂 hooks/

Custom reusable React Hooks.

Examples:

- useAuth
- useMovies
- useRecommendations
- useTheme
- useInfiniteScroll
- useDebounce

---

## 📂 routes/

Application routing configuration.

```
routes/
│
├── AppRoutes.jsx
├── ProtectedRoute.jsx
└── PublicRoute.jsx
```

---

## 📂 context/

React Context Providers.

```
context/
│
├── ThemeContext.jsx
└── SocketContext.jsx
```

---

## 📂 config/

Stores project configuration files.

```
config/
│
├── api.js
├── constants.js
├── routes.js
└── theme.js
```

---

## 📂 lib/

Configuration for third-party libraries.

```
lib/
│
├── axios.js
├── socket.js
└── cloudinary.js
```

---

## 📂 utils/

Reusable helper functions.

```
utils/
│
├── helpers.js
├── formatDate.js
├── calculateMatch.js
├── storage.js
└── validators.js
```

---

## 📂 styles/

Global styling resources.

```
styles/
│
├── globals.css
├── variables.css
├── animations.css
└── typography.css
```

---

# 🏗 Frontend Architecture

```
Pages
   │
   ▼
Reusable Components
   │
   ▼
Redux / Context
   │
   ▼
Services
   │
   ▼
Axios
   │
   ▼
Backend APIs
```

This layered architecture ensures:

- Separation of concerns
- Reusable components
- Easier testing
- Better scalability
- Maintainable codebase

---

# 🎯 Development Workflow

### Phase 1 — Foundation

- Project setup
- Tailwind CSS
- shadcn/ui
- Folder architecture
- Routing
- Redux Toolkit
- Axios configuration
- Theme setup

---

### Phase 2 — Design System

Build reusable UI components:

- Button
- Input
- Card
- Badge
- Modal
- Avatar
- Loader
- Skeleton

---

### Phase 3 — Layout

Build application layouts:

- Navbar
- Sidebar
- Footer
- Main Layout
- Protected Layout

---

### Phase 4 — Landing Page

- Hero Section
- Features
- Taste DNA
- Compatibility Demo
- Testimonials
- Footer

---

### Phase 5 — Core Features

- Authentication
- Movie Library
- Search
- Filters
- Reviews
- Ratings
- Watchlists
- User Profile

---

### Phase 6 — Advanced Features

- AI Recommendations
- Taste DNA Visualization
- Friend Activity
- Notifications
- Analytics Dashboard

---

# 📌 Coding Guidelines

- Keep components small and reusable.
- Avoid duplicate UI.
- Pages should only compose components.
- API requests belong inside `services/`.
- Global state belongs in Redux.
- Local UI state stays inside components.
- Prefer Tailwind CSS over custom CSS.
- Follow consistent naming conventions.

---

# 👥 Frontend Responsibilities

- Project architecture
- Design system
- Responsive UI
- Authentication flow
- State management
- API integration
- Theme management
- Performance optimization
- Accessibility
- Deployment

---

# 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

# 🎯 Project Goal

Build a modern, scalable, responsive frontend that delivers a personalized movie discovery experience through AI-powered recommendations, intuitive design, and reusable architecture.