import { createContext, useContext, useState } from "react";

const ListsContext = createContext();

function ListsProvider({ children }) {
  const [listNames, setListNames] = useState([]);
  const [lists, setLists] = useState({});

  return (
    <ListsContext.Provider value={{ listNames, setListNames, lists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
}

function useLists() {
  const context = useContext(ListsContext);
  return context;
}

export { ListsProvider, useLists };
