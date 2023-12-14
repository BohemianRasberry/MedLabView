// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
//import { FirebaseError, SDK_VERSION, _DEFAULT_ENTRY_NAME, _addComponent, _addOrOverwriteComponent, _apps, _clearComponents, _components, _getProvider, _registerComponent, _removeServiceInstance, deleteApp, getApp, getApps, initializeApp as initializeAppInternal, onLog, registerVersion, setLogLevel } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcYLhEAxYcW-xq7OmTkC9JRUsAnYUzdgY",
  authDomain: "cs-128-1-updated.firebaseapp.com",
  projectId: "cs-128-1-updated",
  storageBucket: "cs-128-1-updated.appspot.com",
  messagingSenderId: "447902137794",
  appId: "1:447902137794:web:8cc9bb6f7d915794ef6a5b",
  measurementId: "G-WX7MY7FTP1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const firestore = getFirestore(app);

const firestore = getFirestore(app);

export const db = getFirestore();

//export { FirebaseError, SDK_VERSION, _DEFAULT_ENTRY_NAME, _addComponent, _addOrOverwriteComponent, _apps, _clearComponents, _components, _getProvider, _registerComponent, _removeServiceInstance, deleteApp, getApp, getApps, initializeAppInternal as initializeApp, onLog, registerVersion, setLogLevel, firestore };