import { useState } from "react";

export default function NewCategoryForm (props){
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState();
    const [data, setData] = useState();
    
    return (
        <>
        {showForm ? <>
            <input onChange={(e)=> setData({...data, name:e.target.value})} placeholder='Category'></input>
            <input onChange={(e)=>setData({...data, budget:e.target.value})} placeholder='Budget'></input>
            <button onClick={() => props.handleAddCategory(title, data)}>add</button>
        </> : <button onClick={() => setShowForm(true)}>+</button>}
        </>
    )
}