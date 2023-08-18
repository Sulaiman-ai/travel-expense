import firebase_app from './config';
import { userauth, getValidatedUser } from './authUsers';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection } from 'firebase/firestore';
import { cache } from 'react';

const db = getFirestore(firebase_app);

function getTripRef(trip_id, userDoc){
    let tripRef = doc(collection(userDoc, 'journey'), trip_id);
    return tripRef;
};

function getCategoryCollectionRef(trip_id, userDoc){
    let tripRef = getTripRef(trip_id, userDoc);
    let categoryCollectionRef = collection(tripRef, 'spending-categories');
    console.log('category collection', categoryCollectionRef)
    return categoryCollectionRef;
};

function getJourneyCollectionRef(userDoc){
    console.log(userDoc);
    let journeyCollectionRef = collection(userDoc, 'journey');
    return journeyCollectionRef;
};

function getTransactionCollectionRef(userDoc){
    return collection(userDoc, 'transactions');
}

function getCategoryRef(trip_id, category_id, userDoc) {
    return doc(getCategoryCollectionRef(trip_id, userDoc), category_id);
}

function getUserDoc (uid){
    return doc(collection(db, 'users'), uid);
}

const getUserID = cache(async () => {
    const user = await getValidatedUser();
    console.log('this user', user)
    if (user !== null){
        return user.uid;
    }
})

export { getJourneyCollectionRef, getTripRef, getCategoryCollectionRef, getTransactionCollectionRef, getCategoryRef, getUserDoc, getUserID };