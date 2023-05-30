"use client";

import Image from 'next/image'
import { useState } from 'react';
import NewTripForm from './newTripForm';
import TripCard from './tripCard';
import TripCardGrid from './components/tripCardGrid';
import useFirestoreRealtimeUpdate from './firebase/useFirestoreRealtimeUpdate';
import { getJourneyCollectionRef } from './firebase/getFirestoreRef';
// import styles from './page.module.css'

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const trips = useFirestoreRealtimeUpdate(getJourneyCollectionRef(), 'collection');

  return (
    // <main className={styles.main}>
      <main>
        <TripCardGrid trips={trips}/>
      <NewTripForm show={showForm}/>
      <button onClick={()=>{setShowForm(!showForm)}}>New Trip</button>
    </main>
  )
}
