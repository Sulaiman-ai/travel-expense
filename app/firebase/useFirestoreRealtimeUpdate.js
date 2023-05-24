import { useEffect, useState } from 'react';
import firebase_app from "./config";
import { getFirestore, doc, getDoc, collection, collectionGroup, getDocs, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app);
const useFirestoreRealtimeUpdate = (collectionRef) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const snap = onSnapshot(collectionRef, (snapshot)=>{
            console.log('Database updated')        
            console.log(snapshot.docs);
            setData(snapshot.docs);
        });
    }, []);

    return data;
    
};

export default useFirestoreRealtimeUpdate;
