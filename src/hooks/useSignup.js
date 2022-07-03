import { useState } from "react";
import { projectAuth } from "../config/firebaseConfig";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

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

      setError(null);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, signup };
};
