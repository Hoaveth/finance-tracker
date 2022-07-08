import React, { useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { TRANSACTIONS_COLLECTION } from "../../utils/constants";
import { toast } from "react-toastify";

import styles from "./Home.module.css";

export default function TransactionList({ transactions }) {
  const { deleteDocument, response } = useFirestore(TRANSACTIONS_COLLECTION);

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name} </p>
          <p className={styles.amount}>₱{transaction.amount} </p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
