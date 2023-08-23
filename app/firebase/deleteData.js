import firebase_app from "./config";
import { getFirestore, doc, deleteDoc, collection } from "firebase/firestore";
import { getCategoryCollectionRef } from "./getFirestoreRef";

import { userauth } from "./authUsers";
import { onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebase_app);

let userDoc;

onAuthStateChanged(userauth, (user) => user ? userDoc = doc(collection(db, 'users'), user.uid):null);

async function deleteCategory(trip_id, category_id){
    const categoryCollectionRef = getCategoryCollectionRef(trip_id, userDoc);

    try {
        await deleteDoc(doc(categoryCollectionRef, category_id));
    } catch (e) {
        console.log('failed to delete', e);
    }
}

export { deleteCategory }