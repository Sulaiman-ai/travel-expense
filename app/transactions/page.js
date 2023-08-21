"use client";

import { useEffect, useState } from "react";
import { getTransactionCollectionRef, getJourneyCollectionRef, getCategoryCollectionRef, getCategoryRef, getUserID, getUserDoc } from "../firebase/getFirestoreRef";
import { doc, addDoc, setDoc, getDocs, serverTimestamp, updateDoc, arrayUnion, FieldValue, increment } from "firebase/firestore";
import useFirestoreRealtimeUpdate from "../firebase/useFirestoreRealtimeUpdate";
import useFirebaseAuth from "../firebase/useFirebaseAuth";
import { userauth } from "../firebase/authUsers";
import TransactionDisplay from "./components/transactiondisplay/transactionDisplay";
import Form from "../components/form";
import useForm from "../hooks/useForm";

export default function Transactions(){
    // const userid = getUserID();
    // console.log('userid', userid);
    // const {authUser} = useFirebaseAuth(userauth);
    const [userid, setUserid] = useState();
    const [transactionCollectionRef, setTransactionCollectionRef] = useState();
    // const transactionCollectionRef = getTransactionCollectionRef();
    const transactions = useFirestoreRealtimeUpdate(getTransactionCollectionRef, 'collection');
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

    // const journeyCollectionRef = getJourneyCollectionRef();
    // const categoryCollectionRef = getCategoryCollectionRef(formData.trip?.id);

    const trips = useFirestoreRealtimeUpdate(getJourneyCollectionRef, 'collection');
    const [categories, setCategories] = useState();
    const [category, setCategory] = useState();
    const [trip, setTrip] = useState();

    // const {transaction, amount, currency, trip, category} = formData;

    useEffect(() => {(async () =>{
        console.log('cat affected', formData, userid);
        if (formData.trip_id && userid){
            const userDoc = getUserDoc(userid);
            formData.trip_id ? setCategories(await getDocs(getCategoryCollectionRef(formData.trip_id, userDoc))) : null;
        }
    })()}, [formData.trip_id, userid])

    useEffect(()=> {
        console.log('categories', categories?.docs[0]?.id);
        setCategory(categories?.docs[0]?.id);
        trips ? setTrip(trips[0].id) : null;
    }, [categories, trips]);

    useEffect(() => {
        getUserID().then(async(uid) => {
            console.log('trips', trips)
            setUserid(uid);
            const userDoc = getUserDoc(uid);
            setTransactionCollectionRef(getTransactionCollectionRef(userDoc));
            trips ? setCategories(await getDocs(getCategoryCollectionRef(trips[0].id, userDoc))) : null;
            console.log('current user', uid)
        })
        // const userid = getUserID();
        // setTransactionCollectionRef(getTransactionCollectionRef(userid))
    }, [userid, trips]);

    // useEffect(async ()=>{
    //     console.log('userid', userid);
    //     const userDoc = getUserDoc(userid);
    //     console.log('trips', trips);
    //     setCategories(await getDocs(getCategoryCollectionRef(trips?.docs[0].id, userDoc)))

    // }, [])

    const handleAddTransaction = async (event, id=null) => {
        // console.log('trans coll', transactionCollectionRef)
        event.preventDefault();
        // console.log('before catref', formData);
        const userDoc = getUserDoc(userid);
        // console.log('user', userDoc);
        const categoryRef = getCategoryRef(formData.trip_id || trip,
            formData.category_id || category, userDoc);
        // console.log('after catref');
        const transaction = {
            transaction: formData.transaction, 
            amount:{[formData.currency]:formData.amount},
            timestamp: new Date(),
            category: categoryRef
        }

        console.log('transaction assigned', transactionCollectionRef);

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