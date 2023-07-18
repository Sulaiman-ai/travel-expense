"use client";

import { useEffect, useState } from "react";
import { getTransactionCollectionRef, getJourneyCollectionRef, getCategoryCollectionRef, getCategoryRef } from "../firebase/getFirestoreRef";
import { doc, addDoc, setDoc, getDocs, serverTimestamp, updateDoc, arrayUnion, FieldValue, increment } from "firebase/firestore";
import useFirestoreRealtimeUpdate from "../firebase/useFirestoreRealtimeUpdate";
import TransactionDisplay from "./components/transactiondisplay/transactionDisplay";
import Form from "../components/form";
import useForm from "../hooks/useForm";

export default function Transactions(){
    const transactionCollectionRef = getTransactionCollectionRef();
    const transactions = useFirestoreRealtimeUpdate(transactionCollectionRef, 'collection');
    transactions?.map((doc)=>{console.log(doc.ref.parent.path);})
    const [newTransaction, setNewTransaction] = useState();

    const [ formData, handleInputChange ] = useForm(
        {
            transaction: '',
            amount: '',
            currency: '',
            trip_id: null,
            category_id: ''
        }
    );

    const journeyCollectionRef = getJourneyCollectionRef();
    // const categoryCollectionRef = getCategoryCollectionRef(formData.trip?.id);

    const trips = useFirestoreRealtimeUpdate(journeyCollectionRef, 'collection');
    const [categories, setCategories] = useState();

    const {transaction, amount, currency, trip, category} = formData;

    useEffect(() => {(async () =>{
        formData.trip_id ? setCategories(await getDocs(getCategoryCollectionRef(formData.trip_id))) : null;
    })()}, [formData.trip_id])

    const handleAddTransaction = async (event, id=null) => {
        event.preventDefault();
        const categoryRef = getCategoryRef(formData.trip_id, formData.category_id);
        const transaction = {
            transaction: formData.transaction, 
            amount:{[formData.currency]:formData.amount},
            timestamp: new Date(),
            category: categoryRef
        }

        const transactionDoc = id ? doc(transactionCollectionRef, id) : doc(transactionCollectionRef);
        await setDoc(transactionDoc, transaction);

        // const transactionDoc = await addDoc(transactionCollectionRef, transaction);

        await updateDoc(categoryRef, {transactions: arrayUnion(transactionDoc), spent: increment(formData.amount)})
        // await categoryRef.update({transactions: FieldValue.arrayUnion(transactionCollectionRef)})

    }

    return (
        <>
        <h1>Transactions</h1>
        {transactions?.map((doc)=>
        <TransactionDisplay id={doc.id} {...doc.data()} 
        Form={<TransactionForm transactionID={doc.id} 
        {...{handleAddTransaction, handleInputChange, trips, categories}}/>} 
        handleInputChange={handleInputChange}/>)}
        <TransactionForm {...{handleAddTransaction, handleInputChange, trips, categories}}/>

        <button>Add new transaction</button>
        </>
    )
}

const TransactionForm = ({transactionID, handleAddTransaction, handleInputChange, trips, categories}) => 
        <form onSubmit={(e)=>handleAddTransaction(e, transactionID)}>
            <input name="transaction" placeholder="transaction" onChange={handleInputChange}/>
            <input name="amount" placeholder="amount" onChange={handleInputChange}/>
            <input name="currency" placeholder="currency" onChange={handleInputChange}/>
            {/* <input type="datetime-local" /> */}
            <select name="trip_id" onChange={handleInputChange}>
                {trips?.map((doc) => <option value={doc.id}>{doc.data().location}</option>)}
            </select>
            <select name="category_id" onChange={handleInputChange}>
                {categories?.docs?.map((doc) => <option value={doc.id}>{doc.data().name}</option>)}
            </select>
            <button type="submit">Save</button>
        </form>