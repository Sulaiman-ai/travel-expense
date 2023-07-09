import { useState } from "react";
import style from "./transaction.module.css";

export default function TransactionDisplay({transaction, timestamp, amount}){
    const date_options = {month: 'long', day: 'numeric'};
    const [displayedCurrency, setDisplayedCurrency] = useState('GBP');

    const handleCurrencyChange = (event) => {
        setDisplayedCurrency(event.target.value);

    }

    return (
    <div className={style.container}>
        <p>{transaction}</p>
        {/* <p>{`${timestamp.toDate().getDate()} ${timestamp.toDate().getMonth()}`}</p> */}
        <p>{timestamp.toDate().toLocaleString("en-gb", date_options)}</p>
        <p>{amount[displayedCurrency]}</p>
        <select onChange={handleCurrencyChange}>
            <option>GBP</option>
            <option>USD</option>
        </select>
    </div>)
}