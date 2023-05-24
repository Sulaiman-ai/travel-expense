import firebase_app from './config';
import { getFirestore, doc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);

function getTripRef(trip_id){
    let tripRef = doc(collection(db, 'journey'), trip_id);
    return tripRef;
};

function getCategoryCollectionRef(trip_id){
    let tripRef = getTripRef(trip_id);
    let categoryCollectionRef = collection(tripRef, 'spending-categories');
    return categoryCollectionRef;
};

function getJourneyCollectionRef(){
    let journeyCollectionRef = collection(db, 'journey');
    return journeyCollectionRef;
};

export { getJourneyCollectionRef, getTripRef, getCategoryCollectionRef };