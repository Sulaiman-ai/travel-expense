"use client";

import styles from './css/dashboard.module.css';
import utilstyles from '../../css/util.module.css';

import {getDocument, getDocumentsFromCollection} from '../../firebase/getData';
import { addCategory, editCategory } from '../../firebase/setData';
import useFirestoreRealtimeUpdate from '../../firebase/useFirestoreRealtimeUpdate';
import { getCategoryCollectionRef, getTripRef } from '@/app/firebase/getFirestoreRef';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BudgetBreakdown from './components/budgetBreakdown';
import NewCategoryForm from './components/newCategoryForm';
import CircleProgressBar from './components/circleprogressbar/circleProgressBar';
import BasicCard from '../../components/basiccard/basicCard';

export default function DashBoard({params}){
    console.log('params', params)

    const [budget, setBudget] = useState();
    const [remainingBudget, setRemainingBudget] = useState();
    const [destination, setDestination] = useState();
    
    const categoryDocs = useFirestoreRealtimeUpdate((userDoc) => getCategoryCollectionRef(params.id, userDoc), 'collection');
    const tripDoc = useFirestoreRealtimeUpdate((userDoc) => getTripRef(params.id, userDoc), 'doc');

    useEffect(()=>{
        if(tripDoc) {
            setBudget(tripDoc.data().budget);
            setDestination(tripDoc.data().location);
        }
        // getDocument('journey', params.id)
        // .then(res => {
        //     let data = res.result.data();
        //     setBudget(data.budget);
        //     setDestination(data.location);
        // });
    }, [tripDoc]);

    useEffect(() => {
        if(tripDoc && categoryDocs){
        setRemainingBudget(parseFloat(tripDoc.data().budget) - categoryDocs.map(doc => doc.data().budget).reduce((a,b)=>{
            console.log('a', a, 'b', b);
            return parseFloat(a)+parseFloat(b)}, 0));
        console.log('remainingbudget', remainingBudget);
        console.log(tripDoc);}
    }, [tripDoc, categoryDocs])
    
    const handleAddCategory = async (title, data) => {
        addCategory(params.id, title, data);
    }

    return (
        <div className={styles.dashboard}>
            {/* <CircleProgressBar fraction={1-(remainingBudget/budget)}/> */}
            <div className={styles.tripsummarycontainer}>
                <BasicCard title='Destination' content={destination} className={utilstyles.spanrow}/>
                <BasicCard title='Budget' content={budget}/>
                <BasicCard title='Remaining' content={remainingBudget}/>
            </div>
            {/* <div>{`Remaining budget ${remainingBudget}`}</div> */}
            {/* <div className={styles.fraction}></div> */}
            {/* <div>Budget: {budget}</div> */}
            {/* <button>Edit</button><input></input> */}
            {/* <div>Destination: {destination}</div> */}
            {/* <button>Edit</button> */}
            <BudgetBreakdown categoryDocs={categoryDocs} trip_id={params.id}/>
            <NewCategoryForm handleAddCategory={handleAddCategory}/>
        </div>
    )
}