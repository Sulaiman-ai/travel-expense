"use client";

import Image from 'next/image'
import { useState } from 'react';
import NewTripForm from './newTripForm';
import TripCard from './tripCard';
import useFirestoreRealtimeUpdate from './firebase/useFirestoreRealtimeUpdate';
import { getJourneyCollectionRef } from './firebase/getFirestoreRef';
// import styles from './page.module.css'

export default function Home() {
  // const [trips, setTrips] = useState();
  const [showForm, setShowForm] = useState(false);

  const trips = useFirestoreRealtimeUpdate(getJourneyCollectionRef());

  return (
    // <main className={styles.main}>
      <main>
        {trips.map((doc, i)=><TripCard key={`trip${i}`} {...doc.data()} id={doc.id}/>)}
      <NewTripForm show={showForm}/>
      <button onClick={()=>{setShowForm(!showForm)}}>New Trip</button>
    </main>
  )
}
