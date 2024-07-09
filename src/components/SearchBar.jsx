import { useState, useCallback } from "react";
import { useSearchQuery } from "../contexts/SearchQueryContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

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
  const { setQuery } = useSearchQuery();
  const navigate = useNavigate();

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

  return (
    <div>
      <input
        placeholder="Search your movie"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button>Search</Button>
    </div>
  );
}

export default SearchBar;
