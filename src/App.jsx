import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/base.scss";

import { MoviesProvider } from "./contexts/MoviesContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";
import { ListsProvider } from "./contexts/ListsContext";

import HomePage from "./pages/HomePage";
import GoPremium from "./pages/GoPremium";
import ProfilePage from "./pages/ProfilePage";
import DetailedSummaryPage from "./pages/DetailedSummaryPage";
import Listpage from "./pages/Listpage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  { path: "go-premium", element: <GoPremium /> },
  { path: "profile/detailed-summary", element: <DetailedSummaryPage /> },
  { path: "profile/:listId", element: <Listpage /> },
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
