import { projectAuth } from "../config/firebaseConfig";
import { LOGOUT_ACTION } from "../utils/constants";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //sign out the user
      const response = await projectAuth.signOut();

      //dispatch
      dispatch({ type: LOGOUT_ACTION });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err);
      setIsPending(false);
    }
  };
  return { logout, error, isPending };
};
