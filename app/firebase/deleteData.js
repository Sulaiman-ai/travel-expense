import { doc, deleteDoc } from "firebase/firestore";
import { getCategoryCollectionRef } from "./getFirestoreRef";

async function deleteCategory(trip_id, category_id){
    const categoryCollectionRef = getCategoryCollectionRef(trip_id);

    try {
        await deleteDoc(doc(categoryCollectionRef, category_id));
    } catch (e) {
        console.log('failed to delete', e);
    }
}

export { deleteCategory }