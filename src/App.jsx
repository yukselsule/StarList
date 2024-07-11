import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/base.scss";

import { MoviesProvider } from "./contexts/MoviesContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";
import { ListsProvider } from "./contexts/ListsContext";

import HomePage from "./pages/HomePage";
import GoPremium from "./pages/GoPremium";
import Friends from "./pages/Friends";
import ProfilePage from "./pages/ProfilePage";
import DetailedSummaryPage from "./pages/DetailedSummaryPage";
import ListPage from "./pages/ListPage";
import ResultsPage from "./pages/ResultsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [{ path: "search", element: <ResultsPage /> }],
  },
  { path: "profile", element: <ProfilePage /> },
  { path: "gopremium", element: <GoPremium /> },
  { path: "friends", element: <Friends /> },
  { path: "profile/detailed-summary", element: <DetailedSummaryPage /> },
  { path: "profile/:listId", element: <ListPage /> },
]);

export default function App() {
  return (
    <SearchQueryProvider>
      <MoviesProvider>
        <ListsProvider>
          <RouterProvider router={router} />
        </ListsProvider>
      </MoviesProvider>
    </SearchQueryProvider>
  );
}
