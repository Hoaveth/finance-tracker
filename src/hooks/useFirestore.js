import { useReducer, useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../config/firebaseConfig";
import {
  ADDED_DOCUMENT,
  FIRESTORE_ERROR,
  IS_PENDING,
} from "../utils/constants";

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
    } catch (err) {
      dispatchIfNotCancelled({ type: FIRESTORE_ERROR, payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (doc) => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
