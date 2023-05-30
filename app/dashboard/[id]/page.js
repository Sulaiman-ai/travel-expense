"use client";

import styles from '../dashboard.module.css';
import {getDocument, getDocumentsFromCollection} from '../../firebase/getData';
import { addCategory, editCategory } from '../../firebase/setData';
import { useState, useEffect } from 'react';

import BudgetBreakdown from './components/budgetBreakdown';
import NewCategoryForm from './components/newCategoryForm';
import useFirestoreRealtimeUpdate from '../../firebase/useFirestoreRealtimeUpdate';
import { getCategoryCollectionRef, getTripRef } from '@/app/firebase/getFirestoreRef';

export default function DashBoard({params}){
    console.log('params', params)

    const [budget, setBudget] = useState();
    const [remainingBudget, setRemainingBudget] = useState();
    const [destination, setDestination] = useState();
    
    const categoryDocs = useFirestoreRealtimeUpdate(getCategoryCollectionRef(params.id), 'collection');
    const tripDoc = useFirestoreRealtimeUpdate(getTripRef(params.id), 'doc');

    useEffect(()=>{
        getDocument('journey', params.id)
        .then(res => {
            let data = res.result.data();
            setBudget(data.budget);
            setDestination(data.location);
        });
    }, []);

    useEffect(() => {
        if(tripDoc){
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
            <div>{`Remaining budget ${remainingBudget}`}</div>
            {/* <div className={styles.fraction}></div> */}
            <div>Budget: {budget}</div><button>Edit</button><input></input>
            <div>Destination: {destination}</div><button>Edit</button>
            <BudgetBreakdown categoryDocs={categoryDocs} trip_id={params.id}/>
            <NewCategoryForm handleAddCategory={handleAddCategory}/>
        </div>
    )
}