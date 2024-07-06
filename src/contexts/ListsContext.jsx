import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageHook";

const ListsContext = createContext();

function ListsProvider({ children }) {
  const [listNames, setListNames] = useLocalStorageState([], "listNames");
  const [lists, setLists] = useLocalStorageState({}, "lists");

  return (
    <ListsContext.Provider
      value={{
        listNames,
        setListNames,
        lists,
        setLists,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

function useLists() {
  const context = useContext(ListsContext);
  return context;
}

export { ListsProvider, useLists };
