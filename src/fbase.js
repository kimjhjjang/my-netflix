import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  /* apiKey: process.env.REACT_APP_APP_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID */
  apiKey: "AIzaSyBynSDXMHdJWs_DGlfVVhTN8OCB64hbJ4Y",
  authDomain: "myflix-af163.firebaseapp.com",
  projectId: "myflix-af163",
  storageBucket: "myflix-af163.appspot.com",
  messagingSenderId: "258566120851",
  appId: "1:258566120851:web:b067c650da336554c17466"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const authService = getAuth();
/* export const firebaseInstance = firebase;
export const dbService = getFirestore();
export const storageService = getStorage(); */