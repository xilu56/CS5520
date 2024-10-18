import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
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


export async function deleteAllFromDB(collectionName) {
    try {
        //get all the documents in the collection
        const querySnapshot = await getDocs(collection(database, collectionName));
        querySnapshot.forEach((docSnapshot) => {
          deleteDoc(doc(database, collectionName, docSnapshot.id));
        });
    } catch (err) {
        console.log("delete all ", err);
    }
  }

// Function to add a "warning" field to a specific document in Firestore
export const addWarningToGoal = async (goalId) => {
  try {
    const goalRef = doc(database, "goals", goalId);
    await updateDoc(goalRef, { warning: true });
    console.log("Warning: true has been added to goal");
  } catch (err) {
    console.error("Error adding warning to goal: ", err);
  }
};