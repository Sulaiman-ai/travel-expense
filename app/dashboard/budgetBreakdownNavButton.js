import styles from './nav_budget.module.css';
import { useState } from 'react';

export default function BudgetBreakdownNavButton (props){
    const [expanded, setExpanded] = useState(false);
    const [newCategory, setNewCategory] = useState(props.category);
    const [newBudget, setNewBudget] = useState(props.budget);

    return (
        <div>
        <div className={styles.button_container}>
            <div className={styles.button_title}>{props.category ? props.category : "Accomodation"}</div>
            <div className={styles.button_budget}>{props.budget ? `£${props.budget}` : "£1000"}</div>
        </div>
        <div>
            <input defaultValue = {props.category} onChange={(e) => {setNewCategory(e.target.value)}}/>
            <input defaultValue = {props.budget} onChange={(e) => {setNewBudget(e.target.value)}}/>
            <button onClick={() => props.handleEdit(newCategory, newBudget)}>Save</button>
        </div>
        </div>
    )
}