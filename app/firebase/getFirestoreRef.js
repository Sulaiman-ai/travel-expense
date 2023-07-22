import firebase_app from './config';
import { userauth } from './authUsers';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);
let userDoc;

onAuthStateChanged(userauth, (user) => userDoc = doc(collection(db, 'users'), user.uid));

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
    let journeyCollectionRef = collection(userDoc, 'journey');
    return journeyCollectionRef;
};

function getTransactionCollectionRef(){
    return collection(db, 'transactions');
}

function getCategoryRef(trip_id, category_id) {
    return doc(getCategoryCollectionRef(trip_id), category_id);
}

export { getJourneyCollectionRef, getTripRef, getCategoryCollectionRef, getTransactionCollectionRef, getCategoryRef };