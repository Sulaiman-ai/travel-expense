"use client";

import styles from './dashboard.module.css';
import {getDocument, getDocumentsFromCollection} from '../firebase/getData';
import { addCategory } from '../firebase/setData';
import { useState, useEffect } from 'react';

import BudgetBreakdownNavButton from './[id]/components/budgetbreakdownnavbutton/budgetBreakdownNavButton';
import useFirestoreRealtimeUpdate from '../firebase/useFirestoreRealtimeUpdate';

export default function DashBoard(){

    const [budget, setBudget] = useState();
    const [destination, setDestination] = useState();
    // const [categoryDocs, setCategoryDocs] = useState();
    const [addingCategory, setAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({title:'new', data:{budget:'100'}});
    
    const categoryDocs = useFirestoreRealtimeUpdate('spending-categories');

    useEffect(()=>{
        getDocument('journey', 'trip1')
        .then(res=> {
            // console.log(res.result.collection('spending-categories'));
            let data = res.result.data();
            // console.log(data);
            // console.log(data.result.data());
            setBudget(data.Budget);
            setDestination(data.Location);

        });

        // getDocument('spending-categories', )

        // getDocumentsFromCollection()
        // .then(res => {
        //     setCategoryDocs(res.docs.docs)
        //     // console.log("Got the documents!", res.docs);
        //     // res.docs.forEach((doc) => {
        //     //     console.log(doc.data());
        //     // });
        //     // console.log(docs);
        // });
    }, []);

    const handleEdit = async (event) => {
        
    }
    
    const handleAddCategory = async (event) => {
        addCategory('trip1', newCategory.title, newCategory.data);
    }

    return (
        <div className={styles.dashboard}>
            <div>{newCategory.title}</div>
            <div>{newCategory.data.budget}</div>
            {/* <div className={styles.fraction}></div> */}
            <div>Budget: {budget}</div><button>Edit</button><input></input>
            <div>Destination: {destination}</div><button>Edit</button>
            {categoryDocs ? categoryDocs.map((doc, index)=> 
                <BudgetBreakdownNavButton key={`bbnb${index}`} category={doc.id} budget={doc.data().budget}/>
            ) : console.log(categoryDocs)}
            {addingCategory ? <>
                <input onChange={(e)=> setNewCategory({...newCategory, title:e.target.value})} placeholder='Category'></input>
                <input onChange={(e)=>setNewCategory({...newCategory, data:{...newCategory.data, budget:e.target.value}})} placeholder='Budget'></input>
                <button onClick={() => handleAddCategory()}>add</button>
            </> : <button onClick={() => setAddingCategory(true)}>+</button>}
        </div>
    )
}