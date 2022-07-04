import { Children, createContext, useReducer } from "react";
import { LOGIN_ACTION, LOGOUT_ACTION } from "../utils/constants";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, user: action.payload };
    case LOGOUT_ACTION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("Auth context", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
