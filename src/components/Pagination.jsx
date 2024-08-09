import { useMovies } from "../contexts/MoviesContext";

import styles from "./Pagination.module.scss";

function getPaginationPages(currentPage, totalPages) {
  const delta = 5;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push("...", totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
}

function Pagination({ totalPages }) {
  const { page, setPage } = useMovies();

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
      {getPaginationPages(page, totalPages).map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => setPage(pageNumber)}
          disabled={pageNumber === "..." || pageNumber === page}
        >
          {pageNumber === "..." ? (
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          ) : (
            pageNumber
          )}
        </button>
      ))}
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    </div>
  );
}

export default Pagination;
