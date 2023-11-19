// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnr1BKDT-093zbik35dZmo6PU6eqbONEM",
  authDomain: "jacareview.firebaseapp.com",
  projectId: "jacareview",
  storageBucket: "jacareview.appspot.com",
  messagingSenderId: "442408349281",
  appId: "1:442408349281:web:58526bc92231acc6c00420",
  measurementId: "G-77KV183TNS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export function initFirebase (){
  return app;
}