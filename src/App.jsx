import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MoviesProvider } from "./contexts/MoviesContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";
import { ListsProvider } from "./contexts/ListsContext";

import HomePage from "./pages/HomePage";
import Friends from "./pages/Friends";
import GoPremium from "./pages/GoPremium";
import ProfilePage from "./pages/ProfilePage";
import DetailedSummary from "./components/DetailedSummary";

export default function App() {
  return (
    <SearchQueryProvider>
      <MoviesProvider>
        <ListsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="friends" element={<Friends />} />
              <Route path="gopremium" element={<GoPremium />} />
              <Route path="/profile" element={<ProfilePage />}>
                <Route path="summary" element={<DetailedSummary />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ListsProvider>
      </MoviesProvider>
    </SearchQueryProvider>
  );
}
