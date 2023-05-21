import styles from './nav_budget.module.css';

export default function BudgetBreakdownNavButton (props){
    return (
        <div className={styles.button_container}>
            <div className={styles.button_title}>{props.category ? props.category : "Accomodation"}</div>
            <div className={styles.button_budget}>{props.budget ? `£${props.budget}` : "£1000"}</div>
        </div>
    )
}