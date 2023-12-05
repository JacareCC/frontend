"use client"
import { useState, useEffect} from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import Navbar from "@/components/Navbar";
import BusinessNavBar from "@/components/BusinessNavBar";
import BusinessEditForm from "@/components/formComponents/BusinessEditForm";
import OnlyOneOkButtonTier from "@/components/buttons/onlyOneOkButton/OnlyOneOkButtonTier";

const BusinessPageWithId: React.FC = () => {
    const [statusCode, setStatusCode] = useState<number|null>(0);
    const [pageData, setPageData] = useState<any>(null);
    const router = useRouter();
    const params = useSearchParams()
    const data = params.get("data");

    initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
  

    useEffect(() =>{
        if(data){
            setPageData(data);
        }
    }, [data])

    useEffect(() =>{
      console.log(pageData);
  }, [pageData]);

    useEffect(() =>{
       if(statusCode === 201){
        window.location.reload();
       }
    }, [statusCode])

    function handleClose(){
      router.push("/user/business")
    }
  
    return (
      <div className="w-screen h-screen overflow-hidden">
        <Navbar />
  
       
        <div className="mt-16 p-4 flex flex-col items-center">
  <BusinessNavBar />

  {pageData && (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="overflow-hidden bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="w-4/5 bg-white p-8 rounded-md shadow-md relative">
        <div className="sm:flex flex-col items-center justify-center md:flex flex-row items-center justify-center">
          <OnlyOneOkButtonTier
            id={pageData.owner_user_id_id}
            backgroundColor={'bronze'}
            text={'Bronze'}
            setStatusCode={setStatusCode}
          />
          <OnlyOneOkButtonTier
            id={pageData.owner_user_id_id}
            backgroundColor={'silver'}
            text={'Silver'}
            setStatusCode={setStatusCode}
          />
          <OnlyOneOkButtonTier
            backgroundColor={'gold'}
            id={pageData.owner_user_id_id}
            text={'Gold'}
            setStatusCode={setStatusCode}
          />
        </div>
        <BusinessEditForm
          email={pageData.email}
          contactPerson={pageData.contact_person}
          phoneNumber={pageData.phone_number}
          user_uid={user?.uid}
        />
        <div className="flex justify-center items-center">
          <button
            key={"CloseButton"}
            onClick={handleClose}
            className={`${
              'bg-jgreen'
            } text-white p-2 m-1 rounded`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>


      
    </div>


  );

  };

export default BusinessPageWithId;