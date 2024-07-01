import { createContext, useContext, useState } from "react";

const ListNamesContext = createContext();

function ListNamesProvider({ children }) {
  const [listNames, setListNames] = useState([]);

  return (
    <ListNamesContext.Provider value={{ listNames, setListNames }}>
      {children}
    </ListNamesContext.Provider>
  );
}

function useListNames() {
  const context = useContext(ListNamesContext);
  return context;
}

export { ListNamesProvider, useListNames };
