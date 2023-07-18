import { useEffect, useState } from "react";
import style from "./transaction.module.css";
import { getDoc } from "firebase/firestore";
import Link from "next/link";
import Editable from "@/app/components/editable/editable";

export default function TransactionDisplay({transaction, timestamp, amount, category, Form, handleInputChange}){
    const date_options = {month: 'long', day: 'numeric'};
    const [displayedCurrency, setDisplayedCurrency] = useState('GBP');
    const [categoryDoc, setCategoryDoc] = useState();
    const [tripDoc, setTripDoc] = useState();
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        (async () => {
            setCategoryDoc(await getDoc(category))
            setTripDoc(await getDoc(category.parent.parent))
        })();
    }, [])

    

    const handleCurrencyChange = (event) => {
        setDisplayedCurrency(event.target.value);

    }

    const EditableField = (props) => <Editable editing={editing} {...props}/>

    return (
        <>
        {editing ? Form :
            <div className={style.container}>
            <p>{transaction}</p>
            {/* <p>{`${timestamp.toDate().getDate()} ${timestamp.toDate().getMonth()}`}</p> */}
            <p>{timestamp.toDate().toLocaleString("en-gb", date_options)}</p>
            <p>{categoryDoc?.data().name}</p>
            <Link href={`/dashboard/${tripDoc?.id}`}><p>{tripDoc?.data().location}</p></Link>
            <p>{amount[displayedCurrency]}</p>
            <select onChange={handleCurrencyChange}>
                <option>GBP</option>
                <option>USD</option>
            </select>
            </div>
        }
        <button onClick={()=>{setEditing(!editing)}}>Edit</button>
        </>
    // <div className={style.container}>
    //     <EditableField display={<p>{transaction}</p>} 
    //     input={<input name="transaction" onChange={handleInputChange} value={transaction}/>}/>
    //     {/* <p>{transaction}</p> */}
    //     {/* <p>{`${timestamp.toDate().getDate()} ${timestamp.toDate().getMonth()}`}</p> */}
    //     <p>{timestamp.toDate().toLocaleString("en-gb", date_options)}</p>
    //     <EditableField display={<p>{categoryDoc?.data().name}</p>} 
    //     input={<input value={categoryDoc?.data().name}/>}/>
    //     <EditableField display={<Link href={`/dashboard/${tripDoc?.id}`}><p>{tripDoc?.data().location}</p></Link>} input={<input value={tripDoc?.data().location}/>}/>
    //     <p>{amount[displayedCurrency]}</p>
    //     <select onChange={handleCurrencyChange}>
    //         <option>GBP</option>
    //         <option>USD</option>
    //     </select>
    // </div>
    )
}