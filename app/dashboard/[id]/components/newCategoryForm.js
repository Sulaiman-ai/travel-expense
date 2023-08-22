import { useState } from "react";

export default function NewCategoryForm (props){
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState();
    const [data, setData] = useState();
    
    return (
        <>
        {showForm ? <form onSubmit={(event) => {
            event.preventDefault();
            props.handleAddCategory(title, data)
            event.target.reset();
            }}>
            <input required onChange={(e)=> setData({...data, name:e.target.value})} placeholder='Category'></input>
            <input required onChange={(e)=>setData({...data, budget:e.target.value})} placeholder='Budget'></input>
            <button type="submit">add</button>
        </form> : <button onClick={() => setShowForm(true)}>+</button>}
        </>
    )
}