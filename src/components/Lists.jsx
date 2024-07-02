import { useLists } from "../contexts/ListsContext.jsx";
import List from "./List";

function Lists() {
  const { listNames } = useLists();

  return (
    <div>
      {listNames.map((listName, index) => (
        <List key={index} listName={listName} />
      ))}
    </div>
  );
}

export default Lists;
