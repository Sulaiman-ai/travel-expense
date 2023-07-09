"use client";

import { useState } from "react";
import { getTransactionCollectionRef } from "../firebase/getFirestoreRef";
import useFirestoreRealtimeUpdate from "../firebase/useFirestoreRealtimeUpdate";
import TransactionDisplay from "./components/transactiondisplay/transactionDisplay";

export default function Transactions(){
    const transactions = useFirestoreRealtimeUpdate(getTransactionCollectionRef(), 'collection');
    transactions?.map((doc)=>{console.log(doc.data());})

    return (
        <>
        <h1>Transactions</h1>
        {transactions?.map((doc)=><TransactionDisplay transaction={doc.data().transaction} timestamp={doc.data().timestamp} amount={doc.data().amount}/>)}
        </>
    )
}