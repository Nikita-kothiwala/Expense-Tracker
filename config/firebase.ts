// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth,} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1KVGAE0YcHaVz040bmasLjmnueHrjaZE",
  authDomain: "expense-tracker-6f397.firebaseapp.com",
  projectId: "expense-tracker-6f397",
  storageBucket: "expense-tracker-6f397.firebasestorage.app",
  messagingSenderId: "655576955799",
  appId: "1:655576955799:web:ab4be47823b243812de2d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
   persistence : getReactNativePersistence(AsyncStorage)
})

//db
export const firestore = getFirestore(app)


