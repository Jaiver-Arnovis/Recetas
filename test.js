import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5DlW2q4Hw4QvMfwB71CBEGI3i1ZLYiUA",
  authDomain: "likes-bb8fc.firebaseapp.com",
  projectId: "likes-bb8fc",
  storageBucket: "likes-bb8fc.appspot.com",
  messagingSenderId: "943357612702",
  appId: "1:943357612702:web:0ecc2e16a7e2861e30a18f",
  measurementId: "G-5PT135W0CL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "likes", "receta1");

updateDoc(docRef, { likes: increment(1) })
  .then(() => console.log("Like actualizado en Firestore"))
  .catch(error => console.error("Error:", error));
