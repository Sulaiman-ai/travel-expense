"use client";

import { useState } from "react";
import { getTransactionCollectionRef } from "../firebase/getFirestoreRef";
import { addDoc, serverTimestamp } from "firebase/firestore";
import useFirestoreRealtimeUpdate from "../firebase/useFirestoreRealtimeUpdate";
import TransactionDisplay from "./components/transactiondisplay/transactionDisplay";
import Form from "../components/form";

export default function Transactions(){
    const transactionCollectionRef = getTransactionCollectionRef();
    const transactions = useFirestoreRealtimeUpdate(transactionCollectionRef, 'collection');
    transactions?.map((doc)=>{console.log(doc.data());})
    const [newTransaction, setNewTransaction] = useState();

    const handleAddTransaction = async (data) => {
        const transaction = {
            transaction: data.transaction, 
            amount:{[data.currency]:data.amount},
            timestamp: new Date()
        }
        await addDoc(transactionCollectionRef, transaction);

    }

    return (
        <>
        <h1>Transactions</h1>
        {transactions?.map((doc)=>
        <TransactionDisplay transaction={doc.data().transaction} 
        timestamp={doc.data().timestamp} amount={doc.data().amount}/>)}
        <Form fields={["transaction", 'amount', 'currency']} handleSubmit={handleAddTransaction}/>

        <button>Add new transaction</button>
        </>
    )
}