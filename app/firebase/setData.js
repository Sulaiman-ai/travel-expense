import firebase_app from "./config";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getTripRef, getCategoryCollectionRef } from "./getFirestoreRef";

const db = getFirestore(firebase_app);
async function addCategory (trip_id, title, data) {
    let result = null;
    let error = null;
    // const categoryCollectionRef = db.collection('journey').doc(trip).collection('spending-categories');
    const trip = doc(collection(db, 'journey'), trip_id);
    const categoryCollectionRef = collection(trip, 'spending-categories');

    try {
        // await addDoc(categoryCollectionRef, data);
        await setDoc(doc(categoryCollectionRef), data);
        // await categoryCollectionRef.add(data);
        console.log('data added');
        // result = await setDoc(doc(db, "spending-categories", title), data)
    } catch (e) {
        error = e;
        console.log('failed to add data', e);
    };

    // return {result, error}
};

async function editCategory(trip_id, category_id, data){
    // const tripRef = getTripRef(trip_id);
    const categoryCollectionRef = getCategoryCollectionRef(trip_id);

    try {
        await setDoc(doc(categoryCollectionRef, category_id), data)
    } catch (e) {
        console.log('failed to change data', e);
    }
}

async function addTrip(data) {
    try {
        await addDoc(collection(db, 'journey'), data);
        console.log('trip added');
    } catch (e) {
        let error = e;
        console.log('failed to add trip');
    }
}

export {addCategory, editCategory, addTrip}