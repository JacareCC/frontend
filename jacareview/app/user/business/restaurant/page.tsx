"use client"
import { useState, useEffect} from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import Navbar from "@/components/Navbar";
import BusinessEditForm from "@/components/formComponents/BusinessEditForm";
import OnlyOneOkButtonTier from "@/components/buttons/onlyOneOkButton/OnlyOneOkButtonTier";
import "../../../../app/globals.css"
import BusinessNavBar from "@/components/BusinessNavBar";
import FetchBusinesses from "@/app/globalfunctions/FetchBusinesses";
import NewNav from "@/components/NewNav";

const BusinessPageWithId: React.FC = () => {
    const [statusCode, setStatusCode] = useState<number|null>(0);
    const [pageData, setPageData] = useState<any>(null);
    const [parsedId, setParsedId] = useState<any>(null);
    const [parsedPageData, setParsedPageData] = useState<any>(null);

    const router = useRouter();
    const params = useSearchParams()
    const id = params.get("id");

    initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
  

    useEffect(() =>{
        if(id && user){
            FetchBusinesses(user.uid, setPageData);
            const parse = JSON.parse(id);
            setParsedId(parse);
        }
    }, [id, user])

    useEffect(() =>{
      if(pageData){
        const filteredData = pageData.filter((element:any)=> element.id === parsedId);
        setParsedPageData(filteredData);
      }
      
  }, [pageData]);

  useEffect(() =>{
    if(parsedPageData){
    console.log(parsedPageData)
    }
    
}, [parsedPageData]);



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
               <div className="max-w-screen-md mx-auto">
                <NewNav />
            </div>
        <div className="mt-16 p-4 flex flex-col items-center bg-cover bg-center">
          {parsedPageData && (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
              <div className="overflow-hidden bg-black bg-center bg-opacity-50 absolute inset-0"  ></div>
              <div className="w-4/5 bg-gray p-8 rounded-md shadow-md relative bg-center bg-no-repeat" style={{ backgroundImage: 'url("../../../../business-gator.jpg")'}}>
                <div className="flex flex-col sm:flex-row items-center justify-center">
                  <OnlyOneOkButtonTier
                    id={parsedPageData[0]?.owner_user_id_id}
                    restaurant_id={parsedPageData[0]?.id}
                    backgroundColor={'bronze'}
                    text={'Bronze'}
                    setStatusCode={setStatusCode}
                  />
                  <OnlyOneOkButtonTier
                    id={parsedPageData[0]?.owner_user_id_id}
                    restaurant_id={parsedPageData[0]?.id}
                    backgroundColor={'silver'}
                    text={'Silver'}
                    setStatusCode={setStatusCode}
                  />
                  <OnlyOneOkButtonTier
                    backgroundColor={'gold'}
                    id={parsedPageData[0]?.owner_user_id_id}
                    restaurant_id={parsedPageData[0]?.id}
                    text={'Gold'}
                    setStatusCode={setStatusCode}
                  />
                </div>
                <BusinessEditForm
                  email={parsedPageData[0]?.email}
                  contactPerson={parsedPageData[0]?.contact_person}
                  phoneNumber={parsedPageData[0].phone_number}
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