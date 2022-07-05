import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFirestore } from "../../hooks/useFirestore";
import { TRANSACTIONS_COLLECTION } from "../../utils/constants";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore(TRANSACTIONS_COLLECTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ uid, name, amount });
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      toast.success("Transaction added successfully.");
      setName("");
      setAmount("");
    } else {
      toast.error(response.error);
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount:</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button className="">Add Transaction</button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeButton={false}
      />
    </>
  );
}
