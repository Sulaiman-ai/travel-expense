"use client";

import Image from 'next/image'
import { useState } from 'react';
import NewTripForm from './newTripForm';
import useFirestoreRealtimeUpdate from './firebase/useFirestoreRealtimeUpdate';
// import styles from './page.module.css'

export default function Home() {
  // const [trips, setTrips] = useState();
  const [showForm, setShowForm] = useState(false);

  const trips = useFirestoreRealtimeUpdate('journey');

  return (
    // <main className={styles.main}>
      <main>
        {trips.map((docs)=><div>{docs.data().location}</div>)}
      <NewTripForm show={showForm}/>
      <button onClick={()=>{setShowForm(!showForm)}}>New Trip</button>
    </main>
  )
}
