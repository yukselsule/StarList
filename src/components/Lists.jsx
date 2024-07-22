import { useLists } from "../contexts/ListsContext.jsx";

import ListBox from "./ListBox.jsx";

import styles from "./Lists.module.scss";

function Lists() {
  const { listNames } = useLists();

  return (
    <ul className={styles["lists"]}>
      {listNames.map((listName, index) => (
        <ListBox listName={listName} key={index} listId={listName} />
      ))}
    </ul>
  );
}

export default Lists;
