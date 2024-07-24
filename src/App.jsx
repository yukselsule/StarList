import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorProvider } from "./contexts/ErrorContext";
import { MoviesProvider } from "./contexts/MoviesContext";
import { ListsProvider } from "./contexts/ListsContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";

import AppLayout from "./pages/AppLayout";
import DetailedSummaryPage from "./pages/DetailedSummaryPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import MoviePage from "./pages/MoviePage";
import ProfilePage from "./pages/ProfilePage";
import ResultsPage from "./pages/ResultsPage";

import "./styles/base.scss";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "search", element: <ResultsPage /> },
      { path: "search/movie/:id", element: <MoviePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/detailed-summary", element: <DetailedSummaryPage /> },
      { path: "profile/:listId", element: <ListPage /> },
    ],
  },
]);

export default function App() {
  return (
    <ErrorProvider>
      <SearchQueryProvider>
        <MoviesProvider>
          <ListsProvider>
            <RouterProvider router={router} />
          </ListsProvider>
        </MoviesProvider>
      </SearchQueryProvider>
    </ErrorProvider>
  );
}
