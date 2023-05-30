"use client";

import styles from '../dashboard.module.css';
import {getDocument, getDocumentsFromCollection} from '../../firebase/getData';
import { addCategory, editCategory } from '../../firebase/setData';
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

    const handleEdit = async (category_id, data) => {
        editCategory(params.id, category_id, data)
    }
    
    const handleAddCategory = async (title, data) => {
        addCategory(params.id, title, data);
    }

    return (
        <div className={styles.dashboard}>
            <div>{`Remaining budget ${remainingBudget}`}</div>
            {/* <div className={styles.fraction}></div> */}
            <div>Budget: {budget}</div><button>Edit</button><input></input>
            <div>Destination: {destination}</div><button>Edit</button>
            {categoryDocs ? categoryDocs.map((doc, index)=> 
                <BudgetBreakdownNavButton key={`bbnb${index}`} id={doc.id} category={doc.data().name} budget={doc.data().budget} handleEdit = {handleEdit}/>
            ) : console.log(categoryDocs)}
            <NewCategoryForm handleAddCategory={handleAddCategory}/>
        </div>
    )
}