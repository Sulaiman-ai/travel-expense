import BudgetBreakdownNavButton from '../../budgetBreakdownNavButton';
import { addCategory, editCategory } from '@/app/firebase/setData';
import { deleteCategory } from '@/app/firebase/deleteData';

export default function BudgetBreakdown(props){

    const handleEdit = async (category_id, data) => {
        editCategory(props.trip_id, category_id, data)
    }

    const handleDelete = async (category_id) => {
        deleteCategory(props.trip_id, category_id);
    }

    return (
        <>
        {props.categoryDocs ? props.categoryDocs.map((doc, index)=> 
            <BudgetBreakdownNavButton key={`bbnb${index}`} id={doc.id} category={doc.data().name} budget={doc.data().budget} handleEdit = {handleEdit} handleDelete={handleDelete}/>
        ) : console.log(props.categoryDocs)}
        </>
    )
}