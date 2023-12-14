// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
//import { FirebaseError, SDK_VERSION, _DEFAULT_ENTRY_NAME, _addComponent, _addOrOverwriteComponent, _apps, _clearComponents, _components, _getProvider, _registerComponent, _removeServiceInstance, deleteApp, getApp, getApps, initializeApp as initializeAppInternal, onLog, registerVersion, setLogLevel } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOs1heJ9-gDHJ8ADcIFaNQevzmUWwV90g",
    authDomain: "cs1281proj.firebaseapp.com",
    databaseURL: "https://cs1281proj-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cs1281proj",
    storageBucket: "cs1281proj.appspot.com",
    messagingSenderId: "944552147998",
    appId: "1:944552147998:web:e666876bc612bd4728820f",
    measurementId: "G-7BXB6CVR48"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const firestore = getFirestore(app);

const firestore = getFirestore(app);

export const db = getFirestore();

//export { FirebaseError, SDK_VERSION, _DEFAULT_ENTRY_NAME, _addComponent, _addOrOverwriteComponent, _apps, _clearComponents, _components, _getProvider, _registerComponent, _removeServiceInstance, deleteApp, getApp, getApps, initializeAppInternal as initializeApp, onLog, registerVersion, setLogLevel, firestore };