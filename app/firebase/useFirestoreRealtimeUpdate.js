import { useEffect, useState } from 'react';
import firebase_app from "./config";
import { userauth } from './authUsers';
import useFirebaseAuth from './useFirebaseAuth';
import { getUserDoc } from './getFirestoreRef';
import { getFirestore, doc, getDoc, collection, collectionGroup, getDocs, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app);
const useFirestoreRealtimeUpdate = (getCollection, type) => {
    const [data, setData] = useState();
    const {authUser} = useFirebaseAuth(userauth)

    useEffect(() => {
        if (authUser) {
            const userDoc = getUserDoc(authUser.uid);
            const snap = onSnapshot(getCollection(userDoc), (snapshot)=>{
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
        }
    }, [authUser]);

    return data;
    
};

export default useFirestoreRealtimeUpdate;
