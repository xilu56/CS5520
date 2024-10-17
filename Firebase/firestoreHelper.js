import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.log("write to db ", err);
  }
}

export async function deleteFromDB(deletedId, collectionName) {
    try {
      await deleteDoc(doc(database, collectionName, deletedId));
    } catch (err) {
      console.log("delete from DB ", err);
    }
  }