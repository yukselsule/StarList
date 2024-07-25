import { useLists } from "../contexts/ListsContext";

import Lists from "../components/Lists";
import Summary from "../components/Summary";

import styles from "./ProfilePage.module.scss";

function ProfilePage() {
  const { lists } = useLists();

  if (Object.values(lists).length === 0)
    return (
      <div>
        <h2 className={styles["profile-page__empty"]}>
          {" "}
          Go watch some movies to make lists!{" "}
        </h2>
      </div>
    );

  return (
    <div className={`styles["profile-page"] container`}>
      <div className={styles["profile-page__full"]}>
        <Summary />
        <Lists />
      </div>
    </div>
  );
}

export default ProfilePage;
