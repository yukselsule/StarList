import { useEffect, useState } from "react";
import { useLists } from "../contexts/ListsContext";
import { useMovies } from "../contexts/MoviesContext";

function DetailedSummary() {
  const { lists } = useLists();
  const { getMovieDetails } = useMovies();

  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async function () {
      const uniqueMovieIds = [
        ...new Set(
          Object.values(lists)
            .flat()
            .map((movie) => movie.id)
        ),
      ];
      const detailsPromises = uniqueMovieIds.map((id) => getMovieDetails(id));
      const details = await Promise.all(detailsPromises);
      setMovieDetails(details);
    };
    fetchMovieDetails();
  }, []);

  console.log(movieDetails);

  return <div>detailed summary</div>;
}

export default DetailedSummary;
