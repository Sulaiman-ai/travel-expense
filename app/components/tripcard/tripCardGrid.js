import TripCard from "./tripCard";

import style from './tripcard.module.css';

export default function TripCardGrid (props){
    return (
        <div className={style.cardGrid}>
            {props.trips 
                ? props.trips.map((doc, i)=><TripCard key={`trip${i}`} {...doc.data()} id={doc.id}/>) 
                : null}
        </div>
    )
};