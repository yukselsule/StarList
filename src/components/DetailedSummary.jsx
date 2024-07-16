import { useLists } from "../contexts/ListsContext";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

import imageNotFound from "../assets/img/imageNotFound.png";

function DetailedSummary() {
  const { movieDetails, summary, topPicks } = useLists();

  return (
    <div>
      <ul>
        <li>
          <h3>
            Your movies:
            {movieDetails.map((movie, i) => {
              return (
                <img
                  key={i}
                  src={
                    movie?.poster_path
                      ? `${IMG_BASE_URL}${movie.poster_path}`
                      : imageNotFound
                  }
                  alt={`Poster of ${movie.title}`}
                />
              );
            })}
          </h3>
        </li>
        <li>
          <h3>
            Your movies made in:
            {summary.allCountries.map((country) => {
              return <p key={country}>{country}</p>;
            })}
          </h3>
        </li>
        <li>
          <h3>
            Your movies genres are:
            {summary.allGenres.map((genre) => {
              return <p key={genre}>{genre}</p>;
            })}
          </h3>
        </li>
        <li>
          <h3>
            Your watched your movies in these languages:
            {summary.allLanguages.map((language) => {
              return <p key={language}>{language}</p>;
            })}
          </h3>
        </li>
      </ul>
      <div>
        <h2>Top Picks from Your Movie Lists</h2>
        <ul>
          <li>
            <div>
              <span>Most Popular Movie</span>
              <img
                src={
                  topPicks.mostPopular.poster_path
                    ? `${IMG_BASE_URL}${topPicks.mostPopular.poster_path}`
                    : imageNotFound
                }
              />
              <span> {topPicks.mostPopular.popularity} </span>
            </div>
          </li>
          <li>
            <div>
              <span>Longest Movie</span>
              <img
                src={
                  topPicks.mostRuntime.poster_path
                    ? `${IMG_BASE_URL}${topPicks.mostRuntime.poster_path}`
                    : imageNotFound
                }
              />
              <span> {topPicks.mostRuntime.runtime} </span>
            </div>
          </li>
          <li>
            <div>
              <span>Most Budget</span>
              <img
                src={
                  topPicks.mostBudget.poster_path
                    ? `${IMG_BASE_URL}${topPicks.mostBudget.poster_path}`
                    : imageNotFound
                }
              />
              <span> {topPicks.mostBudget.budget} </span>
            </div>
          </li>
          <li>
            <div>
              <span>Oldest Movie</span>
              <img
                src={
                  topPicks.oldest.poster_path
                    ? `${IMG_BASE_URL}${topPicks.oldest.poster_path}`
                    : imageNotFound
                }
              />
              <span> {topPicks.oldest.release_date} </span>
            </div>
          </li>
          <li>
            <div>
              <span>Newest Movie</span>
              <img
                src={
                  topPicks.newest.poster_path
                    ? `${IMG_BASE_URL}${topPicks.newest.poster_path}`
                    : imageNotFound
                }
              />
              <span> {topPicks.newest.release_date} </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DetailedSummary;
