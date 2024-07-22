import { useLists } from "../contexts/ListsContext";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Lists from "../components/Lists";
import Summary from "../components/Summary";

import styles from "./ProfilePage.module.scss";

function ProfilePage() {
  const { movieDetails } = useLists();
  return (
    <div>
      <Header />
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

      <Footer />
    </div>
  );
}

export default ProfilePage;
