import { createContext, useState, useContext, useCallback } from "react";

const ErrorContext = createContext();

function ErrorProvider({ children }) {
  const [error, setError] = useState("");

  const handleError = useCallback((message) => {
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, handleError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("Error context was used ouside the movies provider");
  }
  return context;
}

export { ErrorProvider, useError };
