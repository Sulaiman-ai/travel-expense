import firebase_app from "./config";
import { getFirestore, doc, getDoc, collection, collectionGroup, getDocs, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app)
async function getDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

async function getDocumentsFromCollection() {
    let docs = null;
    let error = null;

    try {
        const snap = onSnapshot(collectionGroup(db, 'spending-categories'), (snapshot)=>{
            console.log(snapshot.docs[0].data());
        })
        // console.log("trying");
        // const categoriesRef = db.collection('trip1');
        // console.log("got the collection");
        // const snapshot = await categoriesRef.get();
        // console.log('snapshot', snapshot);
        // snapshot.forEach(doc=>{
        //     console.log(doc.id, "=>", doc.data());
        // })
        // console.log(collection(db, "journey"));
        // console.log(await getDocs(collection(db, 'journey')));
        docs = await getDocs(collectionGroup(db, 'spending-categories'));
        console.log(docs.docs)
        docs.forEach((doc)=>{
            console.log(doc.id, '=>', doc.data());
        })
    } catch (e) {
        error = e;
        console.log(error);
    }

    return {docs, error};
}

export {getDocument, getDocumentsFromCollection};