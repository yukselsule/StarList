import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { useLists } from "../contexts/ListsContext";

import Button from "./Button";
import SpinnerFullPage from "./SpinnerFullPage";

import styles from "./Summary.module.scss";

function Summary() {
  const navigate = useNavigate();

  const { lists, isLoading, movieDetails, summary } = useLists();

  function handleButtonClick() {
    if (movieDetails.length === 0) {
      Swal.fire("Create lists to see the details :)");
      return;
    }
    navigate("/profile/detailed-summary");
  }

  const hours = Math.floor(summary.totalRuntime / 60);
  const minutes = summary.totalRuntime % 60;

  if (Object.keys(lists).length > 0 && isLoading) return <SpinnerFullPage />;

  return (
    <div className={styles["summary"]}>
      <h2 className={styles["summary__heading"]}>You have watched</h2>

      <ul className={styles["summary__list"]}>
        <li>
          {movieDetails.length}{" "}
          <span>{movieDetails.length > 1 ? "movies" : "movie"}</span>
        </li>
        <li>
          {hours} <span>{hours > 1 ? "hours" : "hour"}</span> {minutes}{" "}
          <span>{minutes > 1 ? "minutes" : "minute"}</span>
        </li>
        <li>
          {summary.allGenres.length}{" "}
          <span>{summary.allGenres.length > 1 ? "genres" : "genre"}</span>
        </li>
        <li>
          {summary.allLanguages.length}{" "}
          <span>
            {summary.allLanguages.length > 1 ? "languages" : "language"}
          </span>
        </li>
        <li>
          {summary.allCountries.length}{" "}
          <span>
            {summary.allCountries.length > 1 ? "countries" : "country"}
          </span>
        </li>
        <li>
          <div className={styles["summary__button"]}>
            <Button type="details" onClick={handleButtonClick}>
              see details
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Summary;
