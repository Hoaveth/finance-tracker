import { useReducer, useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../config/firebaseConfig";
import {
  ADDED_DOCUMENT,
  DELETED_DOCUMENT,
  FIRESTORE_ERROR,
  IS_PENDING,
} from "../utils/constants";
import { toast } from "react-toastify";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { success: false, isPending: true, error: null, document: null };
    case FIRESTORE_ERROR:
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case ADDED_DOCUMENT:
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case DELETED_DOCUMENT:
      return {
        success: true,
        isPending: false,
        error: null,
        document: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: IS_PENDING });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: ADDED_DOCUMENT,
        payload: addedDocument,
      });
      toast.success("Transaction added successfully.");
    } catch (err) {
      dispatchIfNotCancelled({ type: FIRESTORE_ERROR, payload: err.message });
      toast.error("Transaction failed.");
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: IS_PENDING });

    try {
      const deletedDocument = await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: DELETED_DOCUMENT,
        payload: deletedDocument,
      });
      toast.success("Document deleted successfully.");
    } catch (err) {
      dispatchIfNotCancelled({ type: FIRESTORE_ERROR, payload: err.message });
      toast.error("Transaction failed.");
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
