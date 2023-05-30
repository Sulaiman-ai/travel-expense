import { useEffect, useState } from 'react';
import firebase_app from "./config";
import { getFirestore, doc, getDoc, collection, collectionGroup, getDocs, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app);
const useFirestoreRealtimeUpdate = (collectionRef, type) => {
    const [data, setData] = useState();

    useEffect(() => {
        const snap = onSnapshot(collectionRef, (snapshot)=>{
            switch (type) {
                case 'collection':
                    setData(snapshot.docs);
                    break;
                case 'doc':
                    setData(snapshot);
            }
            console.log('Database updated')        
            // console.log(snapshot.docs);
            // setData(snapshot.docs);
        });
    }, []);

    return data;
    
};

export default useFirestoreRealtimeUpdate;
