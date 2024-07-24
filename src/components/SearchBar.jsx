import { useState, useCallback, useEffect } from "react";
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

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { setQuery, query } = useSearchQuery();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === "/") {
      setInputValue("");
    }
  }, [location.pathname]);

  return (
    <div
      className={`${styles["search-box"]} ${!query ? styles["homepage"] : ""}`}
    >
      <input
        placeholder="Search your movie"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={styles["search-box_input"]}
      />
    </div>
  );
}

export default SearchBar;
