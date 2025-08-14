// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyAkTngslonyv0L0e2CQ9FtqYjFUcQZMP8M",
    authDomain: "miniblog-3a632.firebaseapp.com",
    projectId: "miniblog-3a632",
    storageBucket: "miniblog-3a632.firebasestorage.app",
    messagingSenderId: "1056938649440",
    appId: "1:1056938649440:web:b0d32f1c6732d0b94c6005"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app)

export { db, auth, app }; // Export the Firestore database instance