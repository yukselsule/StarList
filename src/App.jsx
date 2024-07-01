import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MoviesProvider } from "./contexts/MoviesContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";
import { ListNamesProvider } from "./contexts/ListNamesContext";

import HomePage from "./pages/HomePage";
import Friends from "./pages/Friends";
import GoPremium from "./pages/GoPremium";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <SearchQueryProvider>
      <MoviesProvider>
        <ListNamesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="friends" element={<Friends />} />
              <Route path="gopremium" element={<GoPremium />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </ListNamesProvider>
      </MoviesProvider>
    </SearchQueryProvider>
  );
}
