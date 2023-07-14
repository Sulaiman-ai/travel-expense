import styles from './nav_budget.module.css';
import formStyles from '../../../../components/tripform/newtripform.module.css';
import { useState, useRef, useEffect } from 'react';
import { Modal } from '../../../../components/modal/modal';
import TransactionDisplay from '@/app/transactions/components/transactiondisplay/transactionDisplay';
import { getDoc } from 'firebase/firestore';

export default function BudgetBreakdownNavButton (props){
    // console.log('category id', props.id, 'category', props.category, 'budget', props.budget)
    const [expanded, setExpanded] = useState(false);
    const [newCategory, setNewCategory] = useState(props.category);
    const [newBudget, setNewBudget] = useState(props.budget);

    const [transactionsDocs, setTransactionsDocs] = useState();

    useEffect(() => {
            props.transactions ? Promise.all(props.transactions?.map(async (transaction)=> {
                let doc = await getDoc(transaction);
                return doc;
            })).then((docs) => {
                setTransactionsDocs(docs)}) : null;
    }, []);

    const categoryDiv = useRef();

    return (
        <div>
        <div ref={categoryDiv} className={styles.button_container}>
            <div className={styles.button_title}>{props.category ? props.category : "Accomodation"}</div>
            <div className={styles.button_budget}>{props.budget ? `£${props.budget}` : "£1000"}</div>
        </div>
        <Modal modalTrigger={categoryDiv}>
        {props.edit ? 
        <div className={formStyles.container}>
            <input className={formStyles.input} defaultValue = {props.category} onChange={(e) => {setNewCategory(e.target.value)}}/>
            <input className={formStyles.input} defaultValue = {props.budget} onChange={(e) => {setNewBudget(e.target.value)}}/>
            <button onClick={() => props.handleEdit(props.id, {name:newCategory, budget:newBudget})}>Save</button>
        </div> :
        <div>
            <h1>Transactions</h1>
            {transactionsDocs ? transactionsDocs.map((doc) => <TransactionDisplay {...doc.data()}/>):null}
            {/* {transactionsDocs ? transactionsDocs?.map((doc) => <p>{doc.data().transaction}</p>):null} */}
            {/* {props.transactions?.map(async (transaction) => <p>{await getDoc(transaction).data().name}</p>)} */}
        </div>}
        </Modal>
        {/* <button onClick={()=>props.handleDelete(props.id)}>Delete Category</button> */}
        </div>
    )
}