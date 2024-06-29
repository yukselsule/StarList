import { useSearchQuery } from "../contexts/SearchQueryContext";
import Button from "./Button";

function SearchBar() {
  const { query, setQuery } = useSearchQuery();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        placeholder="Search your movie"
        type="text"
        value={query}
        onChange={handleInputChange}
      />
      <Button>Search</Button>
    </div>
  );
}

export default SearchBar;
