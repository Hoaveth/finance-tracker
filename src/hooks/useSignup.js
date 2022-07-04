import { useState } from "react";
import { projectAuth } from "../config/firebaseConfig";
import { LOGIN_ACTION } from "../utils/constants";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup the user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete the signing up process.");
      }

      //add display name to the user
      await response.user.updateProfile({ displayName });

      //dispatch login action
      dispatch({ type: LOGIN_ACTION, payload: response.user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, signup };
};
