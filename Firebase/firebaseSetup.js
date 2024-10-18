import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Your web app's Firebase configuration. 
//Copy this object from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyB6_55fM7883ettRTuLw_JA6ypT3FAQW-Q",
  authDomain: "fall2024-b735c.firebaseapp.com",
  projectId: "fall2024-b735c",
  storageBucket: "fall2024-b735c.appspot.com",
  messagingSenderId: "310777735312",
  appId: "1:310777735312:web:3c6cd5576d13e2841ad015",
  measurementId: "G-Z6QC679VE6"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);