"use client";

import Image from 'next/image'
import { useState, useRef } from 'react';
import NewTripForm from './components/tripform/newTripForm';
import TripCard from './components/tripcard/tripCard';
import TripCardGrid from './components/tripcard/tripCardGrid';
import { Modal, ModalTrigger } from './components/modal/modal';
import useFirestoreRealtimeUpdate from './firebase/useFirestoreRealtimeUpdate';
import { getJourneyCollectionRef } from './firebase/getFirestoreRef';
import Link from 'next/link';
// import styles from './page.module.css'

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const openFormButton = useRef();

  const trips = useFirestoreRealtimeUpdate(getJourneyCollectionRef, 'collection');

  return (
    // <main className={styles.main}>
      <main>
        <Modal modalTrigger={openFormButton}>
          <NewTripForm></NewTripForm>
        </Modal>
        <TripCardGrid trips={trips} newTripTriggerRef = {openFormButton}/>
      {/* <NewTripForm show={showForm}/>
      <button onClick={()=>{setShowForm(!showForm)}}>New Trip</button> */}
    </main>
  )
}
