"use client";

import styles from '../dashboard.module.css';
import {getDocument, getDocumentsFromCollection} from '../../firebase/getData';
import { addCategory } from '../../firebase/setData';
import { useState, useEffect } from 'react';

import BudgetBreakdownNavButton from '../budgetBreakdownNavButton';
import useFirestoreRealtimeUpdate from '../../firebase/useFirestoreRealtimeUpdate';
import { getCategoryCollectionRef } from '@/app/firebase/getFirestoreRef';

export default function DashBoard({params}){
    console.log('params', params)

    const [budget, setBudget] = useState();
    const [destination, setDestination] = useState();
    const [addingCategory, setAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({title:'new', data:{budget:'100'}});
    
    const categoryDocs = useFirestoreRealtimeUpdate(getCategoryCollectionRef(params.id));

    useEffect(()=>{
        getDocument('journey', params.id)
        .then(res => {
            let data = res.result.data();
            setBudget(data.budget);
            setDestination(data.location);
        });
    }, []);

    const handleEdit = async (category, budget) => {
        addCategory(params.id, category, {budget})
    }
    
    const handleAddCategory = async (event) => {
        addCategory(params.id, newCategory.title, newCategory.data);
    }

    return (
        <div className={styles.dashboard}>
            <div>{newCategory.title}</div>
            <div>{newCategory.data.budget}</div>
            {/* <div className={styles.fraction}></div> */}
            <div>Budget: {budget}</div><button>Edit</button><input></input>
            <div>Destination: {destination}</div><button>Edit</button>
            {categoryDocs ? categoryDocs.map((doc, index)=> 
                <BudgetBreakdownNavButton key={`bbnb${index}`} category={doc.id} budget={doc.data().budget} handleEdit = {handleEdit}/>
            ) : console.log(categoryDocs)}
            {addingCategory ? <>
                <input onChange={(e)=> setNewCategory({...newCategory, title:e.target.value})} placeholder='Category'></input>
                <input onChange={(e)=>setNewCategory({...newCategory, data:{...newCategory.data, budget:e.target.value}})} placeholder='Budget'></input>
                <button onClick={() => handleAddCategory()}>add</button>
            </> : <button onClick={() => setAddingCategory(true)}>+</button>}
        </div>
    )
}