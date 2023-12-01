import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider, getIdToken} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"

export default function VerifyToken(user:any){

const sendTokenToBackend = (idToken:string) => {
    // Use axios, fetch, or any other HTTP library to send the token to the backend
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}verify-id-token/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" , 
      },
      body : JSON.stringify({idToken: idToken})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error sending ID token to backend:', error);
      });
  };


if (user) {
  user.getIdToken().then((idToken:string) => {
    console.log(idToken);
    sendTokenToBackend(idToken);
  });
}

}