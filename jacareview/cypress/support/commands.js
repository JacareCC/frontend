import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyAmzWPMeTfPbz6BYOc8QoUcVnRYc_D80VA",
  authDomain: "jacareview.firebaseapp.com",
  projectId: "jacareview",
  storageBucket: "jacareview.appspot.com",
  messagingSenderId: "442408349281",
  appId: "1:442408349281:web:58526bc92231acc6c00420",
  measurementId: "G-77KV183TNS"
};


firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });