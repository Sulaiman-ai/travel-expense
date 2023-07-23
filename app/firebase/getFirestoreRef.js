import firebase_app from './config';
import { userauth } from './authUsers';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);

function getTripRef(trip_id, userDoc){
    let tripRef = doc(collection(userDoc, 'journey'), trip_id);
    return tripRef;
};

function getCategoryCollectionRef(trip_id, userDoc){
    let tripRef = getTripRef(trip_id, userDoc);
    let categoryCollectionRef = collection(tripRef, 'spending-categories');
    return categoryCollectionRef;
};

function getJourneyCollectionRef(userDoc){
    console.log(userDoc);
    let journeyCollectionRef = collection(userDoc, 'journey');
    return journeyCollectionRef;
};

function getTransactionCollectionRef(){
    return collection(db, 'transactions');
}

function getCategoryRef(trip_id, category_id) {
    return doc(getCategoryCollectionRef(trip_id), category_id);
}

function getUserDoc (uid){
    return doc(collection(db, 'users'), uid);
}

export { getJourneyCollectionRef, getTripRef, getCategoryCollectionRef, getTransactionCollectionRef, getCategoryRef, getUserDoc };