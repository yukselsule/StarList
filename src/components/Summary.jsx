import { useLists } from "../contexts/ListsContext";

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import SpinnerFullPage from "./SpinnerFullPage";

function Summary() {
  const navigate = useNavigate();

  const { lists, isLoading, movieDetails, summary } = useLists();

  const handleButtonClick = () => {
    navigate("/profile/detailed-summary");
  };

  if (Object.keys(lists).length > 0 && isLoading) return <SpinnerFullPage />;

  return (
    <div>
      <h2>You have watched</h2>
      <p> {movieDetails.length} movies</p>
      <p> {summary.totalRuntime} minutes </p>
      <p> {summary.allCountries.length} countries </p>
      <p> {summary.allGenres.length} genres </p>
      <p> {summary.allLanguages.length} languages </p>

      <Button type="details" onClick={handleButtonClick}>
        see details
      </Button>
    </div>
  );
}

export default Summary;
