import { useEffect, useState } from "react";
import { projectAuth } from "../config/firebaseConfig";
import { LOGIN_ACTION } from "../utils/constants";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //login the user
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      //dispatch the login action
      if (response.user) {
        dispatch({ type: LOGIN_ACTION, payload: response.user });
      } else {
        throw Error("There is a problem in signing in.");
      }

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, error, isPending };
};
