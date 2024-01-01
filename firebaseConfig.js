import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDXQeQa0imbTgPADQRyIIn-Bp2Bscwhkps",
    authDomain: "hotel-f7a51.firebaseapp.com",
    projectId: "hotel-f7a51",
    storageBucket: "hotel-f7a51.appspot.com",
    messagingSenderId: "59982776342",
    appId: "1:59982776342:web:895772f1bffa9f80200d37",
    measurementId: "G-TPQCKELMVT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

