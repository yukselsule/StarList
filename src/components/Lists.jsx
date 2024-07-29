import { useLists } from "../contexts/ListsContext.jsx";

import ListBox from "./ListBox.jsx";

import styles from "./Lists.module.scss";

function Lists() {
  const { listNames } = useLists();

  return (
    <div className={styles["lists"]}>
      <h3>Your lists</h3>
      <div className={styles["lists-container"]}>
        <ul>
          {listNames.map((listName, index) => (
            <ListBox listName={listName} key={index} listId={listName} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Lists;
