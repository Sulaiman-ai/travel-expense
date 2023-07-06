import BudgetBreakdownNavButton from './budgetbreakdownnavbutton/budgetBreakdownNavButton';
import { addCategory, editCategory } from '@/app/firebase/setData';
import { deleteCategory } from '@/app/firebase/deleteData';

import styles from '../components/budgetbreakdownnavbutton/nav_budget.module.css';

export default function BudgetBreakdown(props){

    const handleEdit = async (category_id, data) => {
        editCategory(props.trip_id, category_id, data)
    }

    const handleDelete = async (category_id) => {
        deleteCategory(props.trip_id, category_id);
    }

    return (
        <div className={styles.category_grid}>
        {props.categoryDocs ? props.categoryDocs.map((doc, index)=> 
            <BudgetBreakdownNavButton key={`bbnb${index}`} id={doc.id} category={doc.data().name} budget={doc.data().budget} handleEdit = {handleEdit} handleDelete={handleDelete}/>
        ) : console.log(props.categoryDocs)}
        </div>
    )
}