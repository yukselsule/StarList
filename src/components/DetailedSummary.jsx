import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useLists } from "../contexts/ListsContext";

import imageNotFound from "../assets/img/imageNotFound.webp";

import styles from "./DetailedSummary.module.scss";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, translateY: 20 },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

function DetailedSummary() {
  const navigate = useNavigate();
  const { summary, topPicks } = useLists();

  function handleImageClick(movie) {
    navigate(`/search/movie/${movie.id}`);
  }

  return (
    <motion.div
      className={styles["detailed-summary"]}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h2>Your watched movies in these</h2>
        <ul className={styles["detailed-summary__list"]}>
          <li className={styles["detailed-summary__list-item"]}>
            <h3>Genres:</h3>
            <ul>
              {summary.allGenres.map((genre) => {
                return <li key={genre}>{genre}</li>;
              })}
            </ul>
          </li>

          <li className={styles["detailed-summary__list-item"]}>
            <h3>Languages:</h3>
            <ul>
              {summary.allLanguages.map((language) => {
                return <li key={language}>{language}</li>;
              })}
            </ul>
          </li>

          <li className={styles["detailed-summary__list-item"]}>
            <h3>Countries:</h3>
            <ul>
              {summary.allCountries.map((country) => {
                return (
                  <li key={country}>
                    {country === "United States of America" ? "USA" : country}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </motion.div>

      <motion.div
        className={styles["detailed-summary__top-picks"]}
        variants={itemVariants}
      >
        <h2>Top Picks from Your Movie Lists</h2>
        <ul>
          <li>
            <h3>Most Popular Movie</h3>
            <div className={styles["detailed-summary__top-picks__poster"]}>
              <img
                onClick={() => handleImageClick(topPicks.mostPopular)}
                src={
                  topPicks.mostPopular.poster_path
                    ? `${IMG_BASE_URL}${topPicks.mostPopular.poster_path}`
                    : imageNotFound
                }
                alt={topPicks.mostPopular.title}
              />
            </div>

            <p>
              {topPicks.mostPopular.popularity} <span>votes</span>
            </p>
          </li>

          <li>
            <h3>Longest Movie</h3>
            <div className={styles["detailed-summary__top-picks__poster"]}>
              <img
                onClick={() => handleImageClick(topPicks.mostRuntime)}
                src={
                  topPicks.mostRuntime.poster_path
                    ? `${IMG_BASE_URL}${topPicks.mostRuntime.poster_path}`
                    : imageNotFound
                }
                alt={topPicks.mostRuntime.title}
              />
            </div>

            <p>
              {topPicks.mostRuntime.runtime} <span>minutes</span>
            </p>
          </li>

          <li>
            <h3>Shortest Movie</h3>
            <div className={styles["detailed-summary__top-picks__poster"]}>
              <img
                onClick={() => handleImageClick(topPicks.mostPopular)}
                src={
                  topPicks.leastRuntime.poster_path
                    ? `${IMG_BASE_URL}${topPicks.leastRuntime.poster_path}`
                    : imageNotFound
                }
                alt={topPicks.leastRuntime.title}
              />
            </div>

            <p>
              {topPicks.leastRuntime.runtime} <span>minutes</span>
            </p>
          </li>

          <li>
            <h3>Highest Budget</h3>
            <div className={styles["detailed-summary__top-picks__poster"]}>
              <img
                onClick={() => handleImageClick(topPicks.mostBudget)}
                src={
                  topPicks.mostBudget.poster_path
                    ? `${IMG_BASE_URL}${topPicks.mostBudget.poster_path}`
                    : imageNotFound
                }
                alt={topPicks.mostBudget.title}
              />
            </div>

            <p> ${topPicks.mostBudget.budget} </p>
          </li>

          <li>
            <h3>Oldest Movie</h3>
            <div className={styles["detailed-summary__top-picks__poster"]}>
              <img
                onClick={() => handleImageClick(topPicks.oldest)}
                src={
                  topPicks.oldest.poster_path
                    ? `${IMG_BASE_URL}${topPicks.oldest.poster_path}`
                    : imageNotFound
                }
                alt={topPicks.oldest.title}
              />
            </div>

            <p> {topPicks.oldest.release_date} </p>
          </li>

          <li>
            <h3>Most Recent Movie</h3>
            <div className={styles["detailed-summary__top-picks__poster"]}>
              <img
                onClick={() => handleImageClick(topPicks.newest)}
                src={
                  topPicks.newest.poster_path
                    ? `${IMG_BASE_URL}${topPicks.newest.poster_path}`
                    : imageNotFound
                }
                alt={topPicks.newest.title}
              />
            </div>

            <p> {topPicks.newest.release_date} </p>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default DetailedSummary;
