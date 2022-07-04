import { Children, createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../config/firebaseConfig";
import { AUTH_IS_READY, LOGIN_ACTION, LOGOUT_ACTION } from "../utils/constants";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, user: action.payload };
    case LOGOUT_ACTION:
      return { ...state, user: null };
    case AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  /*Communicate with Firebase if 
  there are changes in the authentication*/
  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: AUTH_IS_READY, payload: user });
      unsubscribe();
    });
  }, []);

  console.log("Auth state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
