import PropTypes from "prop-types";

import styles from "./Error.module.scss";

function Error({ error }) {
  return (
    <div className={styles["error-container"]}>
      <h2>Error ⛔</h2>
      <p>{error}</p>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
