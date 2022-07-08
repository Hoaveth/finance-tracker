import { useEffect, useState } from "react";
import { projectAuth } from "../config/firebaseConfig";
import { useDispatch } from "react-redux";
import { user_logout } from "../features/user";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //sign out the user
      const response = await projectAuth.signOut();

      //dispatch
      dispatch(user_logout());
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
  return { logout, error, isPending };
};
