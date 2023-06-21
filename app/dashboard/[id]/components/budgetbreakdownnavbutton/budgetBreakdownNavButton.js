import styles from './nav_budget.module.css';
import { useState, useRef } from 'react';
import { Modal } from '../../../../components/modal/modal';

export default function BudgetBreakdownNavButton (props){
    console.log('category id', props.id, 'category', props.category, 'budget', props.budget)
    const [expanded, setExpanded] = useState(false);
    const [newCategory, setNewCategory] = useState(props.category);
    const [newBudget, setNewBudget] = useState(props.budget);

    const categoryDiv = useRef();

    return (
        <div>
        <div ref={categoryDiv} className={styles.button_container}>
            <div className={styles.button_title}>{props.category ? props.category : "Accomodation"}</div>
            <div className={styles.button_budget}>{props.budget ? `£${props.budget}` : "£1000"}</div>
        </div>
        <Modal modalTrigger={categoryDiv}>
        <div>
            <input defaultValue = {props.category} onChange={(e) => {setNewCategory(e.target.value)}}/>
            <input defaultValue = {props.budget} onChange={(e) => {setNewBudget(e.target.value)}}/>
            <button onClick={() => props.handleEdit(props.id, {name:newCategory, budget:newBudget})}>Save</button>
        </div>
        </Modal>
        <button onClick={()=>props.handleDelete(props.id)}>Delete Category</button>
        </div>
    )
}