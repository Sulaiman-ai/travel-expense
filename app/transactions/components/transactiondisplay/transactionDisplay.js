import { useEffect, useState } from "react";
import style from "./transaction.module.css";
import { getDoc } from "firebase/firestore";
import Link from "next/link";

export default function TransactionDisplay({transaction, timestamp, amount, category}){
    const date_options = {month: 'long', day: 'numeric'};
    const [displayedCurrency, setDisplayedCurrency] = useState('GBP');
    const [categoryDoc, setCategoryDoc] = useState();
    const [tripDoc, setTripDoc] = useState();

    useEffect(() => {
        (async () => {
            setCategoryDoc(await getDoc(category))
            setTripDoc(await getDoc(category.parent.parent))
        })();
    }, [])

    

    const handleCurrencyChange = (event) => {
        setDisplayedCurrency(event.target.value);

    }

    return (
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
    </div>)
}