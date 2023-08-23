import { useState } from "react"

export default function Form ({fields, handleSubmit}){
    const [data, setData] = useState((()=>fields.reduce((dataobj, field)=>{
        return {...dataobj, [field]:''}}
        ,{}))());
    console.log('form data', data);
    const fs = ['transaction', 'amount', 'currency']
    // props
    // handle submit
    // fields
    // header?

    // state manages user entry to submit

    return (
        <form>
            {fields.map((field, index)=>
            <input key={`forminput${index}`} name={field} placeholder={field} onChange={(e)=>{setData({...data, [e.target.getAttribute("name")]:e.target.value})}}></input>)}
            <button key={`submit${index}`} type="button" onClick={()=>{handleSubmit(data)}}>New Transaction</button>

        </form>
    )

}