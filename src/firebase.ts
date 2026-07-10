import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBI-S1iihjKyh4vfzcf-0fXNBXFlmyfvx4",
    authDomain: "authentication-8510d.firebaseapp.com",
    projectId: "authentication-8510d",
    storageBucket: "authentication-8510d.firebasestorage.app",
    messagingSenderId: "702880111614",
    appId: "1:702880111614:web:054fa40b416a78a740beaf",
    measurementId: "G-0ZMM8DXSK3"
};

// Проверяем, чтобы Firebase инициализировался только один раз
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
