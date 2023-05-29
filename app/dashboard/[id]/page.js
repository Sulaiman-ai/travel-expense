"use client";

import styles from '../dashboard.module.css';
import {getDocument, getDocumentsFromCollection} from '../../firebase/getData';
import { addCategory } from '../../firebase/setData';
import { useState, useEffect } from 'react';

import BudgetBreakdownNavButton from '../budgetBreakdownNavButton';
import NewCategoryForm from './components/newCategoryForm';
import useFirestoreRealtimeUpdate from '../../firebase/useFirestoreRealtimeUpdate';
import { getCategoryCollectionRef, getTripRef } from '@/app/firebase/getFirestoreRef';

export default function DashBoard({params}){
    console.log('params', params)

    const [budget, setBudget] = useState();
    const [remainingBudget, setRemainingBudget] = useState();
    const [destination, setDestination] = useState();
    
    const categoryDocs = useFirestoreRealtimeUpdate(getCategoryCollectionRef(params.id));
    // const tripData = useFirestoreRealtimeUpdate(getTripRef(params.id));

    useEffect(()=>{
        getDocument('journey', params.id)
        .then(res => {
            let data = res.result.data();
            setBudget(data.budget);
            setDestination(data.location);
        });
    }, []);

    // useEffect(() => {
    //     setRemainingBudget(categoryDocs.map(doc => doc.data().budget).reduce((a,b)=>{
    //         return parseFloat(a)+parseFloat(b)}, 0));
    //     console.log('remainingbudget', remainingBudget);
    //     console.log(tripData);
    // }, [tripData])

    const handleEdit = async (category, budget) => {
        addCategory(params.id, category, {budget})
    }
    
    const handleAddCategory = async (title, data) => {
        addCategory(params.id, title, data);
    }

    return (
        <div className={styles.dashboard}>
            {/* <div>{`Remaining budget ${remainingBudget}`}</div> */}
            {/* <div className={styles.fraction}></div> */}
            <div>Budget: {budget}</div><button>Edit</button><input></input>
            <div>Destination: {destination}</div><button>Edit</button>
            {categoryDocs ? categoryDocs.map((doc, index)=> 
                <BudgetBreakdownNavButton key={`bbnb${index}`} category={doc.id} budget={doc.data().budget} handleEdit = {handleEdit}/>
            ) : console.log(categoryDocs)}
            <NewCategoryForm handleAddCategory={handleAddCategory}/>
        </div>
    )
}