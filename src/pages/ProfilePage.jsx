import { useLists } from "../contexts/ListsContext";

import Lists from "../components/Lists";
import Summary from "../components/Summary";

import styles from "./ProfilePage.module.scss";

function ProfilePage() {
  const { movieDetails } = useLists();
  return (
    <div>
      <main className={styles["profile-page"]}>
        {movieDetails.length === 0 && (
          <h2 className={styles["profile-page__empty"]}>
            {" "}
            Go watch some movies to make lists!{" "}
          </h2>
        )}

        {movieDetails.length > 0 && (
          <div className={styles["profile-page__full"]}>
            <Summary />
            <Lists />
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
