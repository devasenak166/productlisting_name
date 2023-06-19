
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDuEyalyc0eGdn464NPts6HXF4KNXshoP0",
  authDomain: "productlisting-892ee.firebaseapp.com",
  projectId: "productlisting-892ee",
  storageBucket: "productlisting-892ee.appspot.com",
  messagingSenderId: "237511065564",
  appId: "1:237511065564:web:3cf631cd0ccb8d18739919"
};
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);


 