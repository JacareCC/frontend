import { getAuth} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOut() {
    const [popUp, setPopUp] = useState<boolean>(false)

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    //helper
    function signOutClick(){
        auth.signOut();
        router.push("")
    }

    function areYouSure() {
        setPopUp((prev: boolean) => !prev);
    }
    return (
        <>
        <div onClick={areYouSure}>Sign Out</div>
        {popUp && (
            <div>
                <button onClick={signOutClick}>Yes, Sign Out</button>
                <button onClick={areYouSure}>Stay Signed In</button>
            </div>
        )}
        </>
    )
}