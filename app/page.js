"use client";

import Image from 'next/image'
import { useState, useRef } from 'react';
import NewTripForm from './newTripForm';
import TripCard from './tripCard';
import TripCardGrid from './components/tripCardGrid';
import { Modal, ModalTrigger } from './components/modal';
import useFirestoreRealtimeUpdate from './firebase/useFirestoreRealtimeUpdate';
import { getJourneyCollectionRef } from './firebase/getFirestoreRef';
// import styles from './page.module.css'

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const openFormButton = useRef();

  const trips = useFirestoreRealtimeUpdate(getJourneyCollectionRef(), 'collection');

  return (
    // <main className={styles.main}>
      <main>
        <Modal modalTrigger={openFormButton}>
          <NewTripForm></NewTripForm>
        </Modal>
        <TripCardGrid trips={trips}/>
        <button ref={openFormButton}>New Trip</button>
      {/* <NewTripForm show={showForm}/>
      <button onClick={()=>{setShowForm(!showForm)}}>New Trip</button> */}
    </main>
  )
}
