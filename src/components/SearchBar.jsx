import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSearchQuery } from "../contexts/SearchQueryContext";

import styles from "./SearchBar.module.scss";

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

function SearchBar({ isSearchOpen, onSearchOpen }) {
  const [inputValue, setInputValue] = useState("");
  const { query, setQuery } = useSearchQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const searchBarRef = useRef();

  useEffect(() => setInputValue(query), [query]);

  const debouncedSetQuery = useCallback(
    debounce((newQuery) => {
      setQuery(newQuery);
      navigate(`/search?query=${newQuery}`);
    }, 1000),
    [setQuery, navigate]
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    debouncedSetQuery(e.target.value);
  };

  function handleSearchClose() {
    onSearchOpen(false);
  }

  useEffect(() => {
    if (isSearchOpen && searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (location.pathname === "/") {
      setInputValue("");
    }
  }, [location.pathname]);

  return (
    <div className={`${styles["search-box"]}`}>
      <input
        placeholder="Search your movie"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={styles["search-box__input"]}
        ref={searchBarRef}
      />
      <span className={styles["search-box__close"]}>
        {isSearchOpen && (
          <ion-icon onClick={handleSearchClose} name="close-outline"></ion-icon>
        )}
      </span>
    </div>
  );
}

export default SearchBar;
