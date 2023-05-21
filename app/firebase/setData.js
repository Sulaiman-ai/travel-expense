import firebase_app from "./config";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
async function addCategory (trip_id, title, data) {
    let result = null;
    let error = null;
    // const categoryCollectionRef = db.collection('journey').doc(trip).collection('spending-categories');
    const trip = doc(collection(db, 'journey'), trip_id);
    const categoryCollectionRef = collection(trip, 'spending-categories');

    try {
        // await addDoc(categoryCollectionRef, data);
        await setDoc(doc(categoryCollectionRef, title), data);
        // await categoryCollectionRef.add(data);
        console.log('data added');
        // result = await setDoc(doc(db, "spending-categories", title), data)
    } catch (e) {
        error = e;
        console.log('failed to add data');
    };

    // return {result, error}
}

export {addCategory}