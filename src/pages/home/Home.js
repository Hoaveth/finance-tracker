import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

import TransactionForm from "./TransactionForm";
import { TRANSACTIONS_COLLECTION } from "../../utils/constants";

import styles from "./Home.module.css";
import TransactionList from "./TransactionList";

function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    TRANSACTIONS_COLLECTION,
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  const isEmpty = documents && documents.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {isEmpty && <p>No Transactions.</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

export default Home;
