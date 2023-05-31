import { useState } from "react";
import styles from './newtripform.module.css';
import { addTrip } from "./firebase/setData";

export default function NewTripForm (props){
    const [location, setLocation] = useState();
    const [budget, setBudget] = useState();

    const visibility = props.show ? styles.show : styles.hide;

    const handleNewTrip = async (location, budget) => {
        addTrip({location, budget});

    }
    
    return (
        <div>
            <button onClick={props.handleClose}>Close Modal</button>
            <h2>New Trip</h2>
            <input onChange={(e)=>{setLocation(e.target.value)}} placeholder="Location"/>
            <input onChange={(e)=>{setBudget(e.target.value)}} placeholder="Budget"/>
            <button onClick={() => handleNewTrip(location, budget)}>Add new trip</button>
        </div>
    )
}