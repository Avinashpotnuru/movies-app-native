# 🎬 Movies Explorer App (React Native + Expo)

A modern **Movies & TV Shows Explorer App** built using **React Native
(Expo)** and **TMDB API**.\
Users can discover trending and upcoming movies, search for movies or TV
shows, view detailed information, watch trailers, and manage favorite
movies.

------------------------------------------------------------------------

## 🚀 Features

### 🔎 Search

-   Search for **Movies and TV Shows**
-   Instant results display

### 🎬 Movies Discovery

-   View **Trending Movies**
-   View **Upcoming Movies**
-   Browse popular movies

### 🎛 Filters & Sorting

-   Sort movies by:
    -   Popularity (Ascending / Descending)
    -   Rating / Vote Average (Ascending / Descending)
    -   Release Date (Ascending / Descending)
    -   Revenue (Ascending / Descending)
    -   Original Title (Ascending / Descending)
    -   Title (Ascending / Descending)
    -   Vote Count (Ascending / Descending)

-   Filter movies by **language**

### 📄 Movie Details Page

Each movie has a **dynamic details page** with:

-   Movie Title & Poster
-   Backdrop Images
-   Movie Overview
-   Cast Details
-   Movie Trailer (YouTube)
-   Recommended Movies
-   Similar Movies

### 🎭 Cast Details

-   View cast member details
-   Biography
-   Social media links
-   Movies & TV Shows they have appeared in

### ⭐ Favorites

-   Add movies to **Favorites**
-   View all saved movies in a **Favorites Page**
-   Quick access to favorite movies

------------------------------------------------------------------------

## 🛠 Tech Stack

-   React Native
-   Expo
-   Expo Router
-   Axios
-   TMDB API
-   TypeScript
-   React Hooks
-   Custom Hooks
-   Reusable Components
-   Responsive Design



------------------------------------------------------------------------

## 📁 Project Structure

   ```
movies-app-native
├─ .env
├─ .qodo
├─ app
│  ├─ (tabs)
│  │  ├─ favorites.tsx
│  │  ├─ index.tsx
│  │  ├─ movies.tsx
│  │  ├─ tvshows.tsx
│  │  └─ _layout.tsx
│  ├─ cast-details
│  │  └─ [id].tsx
│  ├─ login.tsx
│  ├─ movie-details
│  │  └─ [id].tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  └─ images
│     ├─ favicon.png
│     ├─ female.jpg
│     ├─ icon.png
│     ├─ loading.gif
│     ├─ male.jpg
│     ├─ partial-react-logo.png
│     ├─ placeholder.jpg
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ data
│  └─ index.ts
├─ es.json
├─ eslint.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ api
│  │  ├─ axios-interceptors.ts
│  │  ├─ endpoints.ts
│  │  └─ movies.service.ts
│  ├─ components
│  │  ├─ backdrop-images-container.tsx
│  │  ├─ biography-section.tsx
│  │  ├─ cast-container.tsx
│  │  ├─ cast-display-card.tsx
│  │  ├─ custom-dropdown.tsx
│  │  ├─ display-modal.tsx
│  │  ├─ index.ts
│  │  ├─ loading.tsx
│  │  ├─ movie-list-container.tsx
│  │  ├─ movie-overview.tsx
│  │  ├─ movie-title-card.tsx
│  │  ├─ movies-card.tsx
│  │  ├─ movies-carousel.tsx
│  │  ├─ movies-list-wrapper.tsx
│  │  ├─ no-data-found.tsx
│  │  ├─ recommendation-card.tsx
│  │  ├─ recommendation-section.tsx
│  │  ├─ section-heading.tsx
│  │  ├─ social-media-section.tsx
│  │  ├─ tabs-container.tsx
│  │  └─ trailer-video.tsx
│  ├─ hooks
│  │  ├─ useDebounce.tsx
│  │  ├─ useDimensions.tsx
│  │  └─ useFetch.tsx
│  ├─ screens
│  │  ├─ cast-overview.tsx
│  │  ├─ favorites-container.tsx
│  │  ├─ home-container.tsx
│  │  ├─ index.ts
│  │  ├─ movies-details-container.tsx
│  │  ├─ movies-filter-container.tsx
│  │  └─ tv-shows-filter-container.tsx
│  ├─ theme
│  │  ├─ colors.ts
│  │  └─ index.ts
│  ├─ types
│  │  ├─ index.ts
│  │  └─ movie.types.ts
│  └─ utils
│     ├─ getImage.ts
│     └─ responsive.ts
└─ tsconfig.json

```

------------------------------------------------------------------------

## 📦 Installation

Clone the repository:

    git clone https://github.com/Avinashpotnuru/movies-app-native.git

Go to the project folder:

    cd movies-app-native

Install dependencies:

    npm install

------------------------------------------------------------------------

## ▶ Run the Project

Start the development server:

    npx expo start

Run on Android:

    npx expo start --android

Run on iOS:

    npx expo start --ios

------------------------------------------------------------------------

## 🔑 Environment Variables

Create a `.env` file in the root folder.

    EXPO_PUBLIC_TMDB_API_KEY=your_api_key
    EXPO_PUBLIC_BASE_URL=https://api.themoviedb.org/3
    EXPO_PUBLIC_ACCESS_TOKEN=your_access_token

------------------------------------------------------------------------

## 🌐 API

This project uses the **TMDB API**.

https://www.themoviedb.org/documentation/api

------------------------------------------------------------------------

## 📱 Screens

-   Home Screen
-   Movies Page
-   Movie Details Page
-   Cast Details Page
-   Favorites Page
-   Search Page

------------------------------------------------------------------------

## ⭐ Future Improvements

-   Authentication
-   Watchlist
-   Offline Favorites
-   Pagination
-   Better animations
-   Dark / Light theme support

------------------------------------------------------------------------
## 🚀 Live Demo

- Expo Build: https://expo.dev/accounts/avinash343/projects/movies-app-native/builds/25a9e72c-1202-4846-9281-86a768d459d6

------------------------------------------------------------------------------

## 👨‍💻 Author

**Avinash Potnuru**

- GitHub: https://github.com/Avinashpotnuru

Built with ❤️ using **React Native + Expo**.*React Native + Expo**.

