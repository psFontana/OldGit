// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASbbETDWimNDSuceJfppN9ctIOzB7IhaY",
  authDomain: "mobileutf.firebaseapp.com",
  databaseURL: "https://mobileutf-default-rtdb.firebaseio.com",
  projectId: "mobileutf",
  storageBucket: "mobileutf.firebasestorage.app",
  messagingSenderId: "1075976482949",
  appId: "1:1075976482949:web:8914bf013b5984fb6139ec",
  measurementId: "G-WE5N8S6DLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);