// Context replaces prop drilling.  Allows you to set global varible states accessible to all the functions in the hierarchy.
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// Initial state set to a user or null.  Otherwise, get the user record from localStorage
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


//Create a new context object with with the initial null state argument.
export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  // add a user record to localStorage.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
